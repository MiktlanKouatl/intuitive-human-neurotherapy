import * as THREE from 'three';
import IntroController from '../World/IntroController.js';
export default class StateManager {
    constructor(experience) {
        this.experience = experience;
        this.animationDirector = this.experience.animationDirector;
        this.world = this.experience.world;
        this.screenManager = this.experience.screenManager;
        this.htmlManager = this.experience.htmlManager; // Obtenemos el HTMLManager

        
        // Escuchamos los eventos y le decimos al ScreenManager qué pantalla mostrar
        this.animationDirector.on('enterState:logo', (state) => {
            console.log("2. StateManager: Evento 'enterState:logo' recibido.");
            this.animationDirector.disconnect(); // Desconectamos el control por scroll

            // Creamos y ejecutamos la introducción
            const intro = new IntroController(this.experience);
            intro.play();
            /*this.screenManager.showScreen(state.name);
            // --- CÓDIGO DE PRUEBA EN EL LUGAR CORRECTO ---
            // Creamos un ancla en el mundo
            const textAnchor = new THREE.Object3D();
             textAnchor.position.set(0, -15, 0);
            this.world.worldGroup.add(textAnchor);

            // Creamos el elemento HTML
            const paragraphElement = document.createElement('p');
            paragraphElement.classList.add('html-element');
            paragraphElement.textContent = 'Este es el texto de prueba para la sección del logo.';

            // Le decimos al HTMLManager que los conecte
            this.htmlManager.track({
                htmlElement: paragraphElement,
                threeObject: textAnchor
            }); */

        });

        this.animationDirector.on('enterState:brainReveal', (state) => {
            console.log("2. StateManager: Evento 'enterState:brainReveal' recibido.");
            this.animationDirector.disconnect();

            this.screenManager.showScreen(state.name);
            // Ejemplo de animación específica: hacer que el rostro sonría.
            // this.world.brain.face.changeExpression('smile');
            setTimeout(() => {
                console.log('StateManager: Reconectando el embrague...');

                this.animationDirector.connect();
            }, 2000);
        });
    }
}