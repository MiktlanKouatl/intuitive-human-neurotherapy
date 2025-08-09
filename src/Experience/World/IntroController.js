import gsap from "gsap";
import * as THREE from 'three';
import Experience from "../Experience.js";

export default class IntroController {
    constructor(experience ) {
        this.experience = experience;
        this.world = this.experience.world;
        this.letterManager = this.experience.letterManager;
        
        // Aquí guardaremos las referencias a los objetos que animamos
        this.logo = this.world.logo;
    }

    play() {
        console.log("IntroController: Iniciando animación de introducción.");
        
        // Por ahora, solo tendrá la animación de aparición de las letras.
        // La devolveremos en una timeline de GSAP para que StateManager la controle.
        const tl = gsap.timeline();
        
        // Usamos el letterManager para mostrar el título del logo
        this.letterManager.showText({
            text: 'INTUITIVE HUMAN\nNEUROTHERAPY',
            fontSize: 2.5,
            position: new THREE.Vector3(0, 0, 0)
        });

        return tl;
    }
}