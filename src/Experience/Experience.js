import * as THREE from 'three';
import Sizes from './Utils/Sizes.js';
import Time from './Utils/Time.js';
import Resources from './Utils/Resources.js';
import assets from './assets.js';
import Camera from './Camera.js';
import Renderer from './Renderer.js';
import World from './World/World.js';
import Theme from './Utils/Theme.js';
import StateManager from './Utils/StateManager.js';
import InputManager from './Utils/InputManager.js';
import LetterManager from './Utils/LetterManager.js';
import ScreenManager from './World/ScreenManager.js';
import HTMLManager from './Utils/HTMLManager.js';
import AnimationDirector from './Utils/AnimationDirector.js';
import states from './states.js';

export default class Experience {
    constructor(canvas) {
        console.log("El Director (Experience) ha sido creado.");

        this.canvas = canvas;
        window.experienceDebug = this;
        this.htmlContainer = document.querySelector('.html-container');


        // --- CONFIGURACIÓN INICIAL ---
        // Creamos los componentes base que no dependen de los assets.
        this.sizes = new Sizes();
        this.time = new Time();
        this.scene = new THREE.Scene();
        this.camera = new Camera(this);
        this.theme = new Theme();
        this.renderer = new Renderer(this); 
        this.inputManager = new InputManager();
        this.htmlManager = new HTMLManager(this, this.htmlContainer);
        
        // Creamos el gestor de recursos e iniciamos la carga
        this.resources = new Resources(assets);

        // --- ESPERAMOS A QUE TODO ESTÉ LISTO ---
        this.resources.on('ready', () => {
            console.log("Experience: Recursos listos. Construyendo el mundo y los gestores.");

            // --- CREACIÓN POST-CARGA ---
            // Ahora que los assets están disponibles, creamos los componentes que dependen de ellos.
            this.world = new World(this, this.htmlManager);
            this.world.onResourcesReady();
            this.letterManager = new LetterManager(this);
            this.screenManager = new ScreenManager(this, states);
            this.animationDirector = new AnimationDirector(this.world.worldGroup, states);
            this.stateManager = new StateManager(this);
            this.mouse = new THREE.Vector2();
            // --- 4. INICIAMOS LA EXPERIENCIA ---
            this.stateManager.startIntro();
            //this.animationDirector.connect(); // Conectamos el embrague al inicio

        });
        // AÑADE UN EVENT LISTENER PARA 'mousemove'
        window.addEventListener('mousemove', (event) => {
            // Normalizamos las coordenadas del mouse (de -1 a +1)
            this.mouse.x = (event.clientX / this.sizes.width) * 2 - 1;
            this.mouse.y = -(event.clientY / this.sizes.height) * 2 + 1;
        });

        // Event listeners
        this.sizes.on('resize', () => {
            this.resize();
        });

        this.time.on('tick', () => {
            this.update();
        });

        // Escuchamos el evento de nuestro nuevo InputManager
        this.inputManager.on('scrollUpdate', (normalizedDelta) => {
            //console.log('Scroll detectado, delta:', normalizedDelta);
            this.animationDirector.onScroll(normalizedDelta);
        });
        console.log("Utilidades de Sizes y Time inicializadas.");
    }

    resize() {
        console.log("Evento resize detectado");
        this.camera.resize();
        this.renderer.resize();
    }

    update() {
        // console.log("Evento tick detectado"); // Descomenta para ver el spam en la consola
        // La lógica de actualización irá aquí (animaciones, controles)
        if (this.world && this.world.brain && this.world.brain.face) {
            this.world.brain.face.lookAt(this.mouse);
        }
        if(this.camera){
            this.camera.update();
        }
        if (this.world){
            this.world.update();
        }
        if (this.htmlManager) {
            this.htmlManager.update();
        }
        if (this.renderer) {
            this.renderer.update(); // Dibuja la escena en cada frame
        }
    }
}