import * as THREE from 'three';
import IntroController from '../World/IntroController.js';
export default class StateManager {
    constructor(experience) {
        this.experience = experience;
        this.animationDirector = this.experience.animationDirector;
        this.world = this.experience.world;
        this.screenManager = this.experience.screenManager;
        this.htmlManager = this.experience.htmlManager; // Obtenemos el HTMLManager
        this.introController = null;
        this.introHasPlayed = false;
        this.setupScrollListeners();
        
    }
    startIntro() {
        if (!this.introHasPlayed) {
            this.animationDirector.disconnect(); // Desconectamos el scroll
            console.log("StateManager: Ejecutando intro.");

            this.introController = new IntroController(this.experience);
            // Obtenemos la timeline de la animación del IntroController
            const introTimeline = this.introController.play();

            // 2. CUANDO LA INTRO TERMINE, CONECTAMOS EL SCROLL
            introTimeline.eventCallback('onComplete', () => {
                console.log("StateManager: Intro terminada. Conectando scroll.");
                this.animationDirector.connect();
                this.introHasPlayed = true;
            });
        }
    }
    setupScrollListeners() {
        // El listener para 'logo' ya no es necesario aquí.
        // La intro se maneja por separado.

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