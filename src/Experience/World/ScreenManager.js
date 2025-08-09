import gsap from 'gsap';
import * as THREE from 'three';
import Screen3D from './Screen3D.js';

export default class ScreenManager {
    constructor(experience, states) {
        this.experience = experience;
        this.letterManager = this.experience.letterManager; // <-- Obtenemos la instancia
        this.worldGroup = this.experience.world.worldGroup;
        this.theme = this.experience.theme;
        
        this.states = states;
        
        this.screens = {}; // Caché para almacenar las pantallas
        this.currentScreen = null;
        
        // Asumimos que la fuente se cargará o estará disponible
        // ya que Troika maneja esto de forma más directa.
        this.preloadScreens();
    }

    preloadScreens() {
        for (const state of this.states) {
            if (state.screen && !this.screens[state.screen.name]) {
                const screenInstance = new Screen3D();

                if (state.screen.name === 'betterLife') {
                    screenInstance.createText('title', {
                        text: 'BETTER BRAIN,\nBETTER LIFE',
                        fontSize: 2,
                        color: this.theme.liveColors.line,
                        position: new THREE.Vector3(25, 0, 10),
                        font: '/fonts/ubuntuBold.ttf'
                    });
                } else if (state.screen.name === 'neurotherapyIntro') {
                    screenInstance.createText('title', {
                        text: 'ADVANCED\nNEUROTHERAPY',
                        fontSize: 2.5,
                        color: this.theme.liveColors.line,
                        position: new THREE.Vector3(0, -5, 0),
                        font: '/fonts/ubuntuBold.ttf'
                    });
                }
                
                screenInstance.visible = false;
                this.screens[state.screen.name] = screenInstance;
                this.worldGroup.add(screenInstance);
            }
        }
        //this.showScreen('initial');
    }

    showScreen(stateName) {
    console.log(`3. ScreenManager: Se llamó a showScreen con el estado '${stateName}'`);

    const targetState = this.states.find(s => s.name === stateName);
    console.log("4. ScreenManager: targetState encontrado:", targetState);

    this.letterManager.hideText();
    
    if (targetState && targetState.screen) {
        console.log("5. ScreenManager: El estado tiene una pantalla. Preparando para llamar a LetterManager.");

        // --- AÑADE ESTE BLOQUE ---
        setTimeout(() => {
            if (targetState.screen.name === 'logoScreen') {
                this.letterManager.showText({
                    text: 'INTUITIVE HUMAN\nNEUROTHERAPY',
                    fontSize: 2.5,
                    position: new THREE.Vector3(0, 0, 0)
                });
            } else if (targetState.screen.name === 'headlineScreen') {
                this.letterManager.showText({
                    text: 'HARNESS THE POWER\nOF YOUR BRAIN',
                    fontSize: 3,
                    position: new THREE.Vector3(0, 0, 0)
                });
            }
        }, 700);
    }
}
}