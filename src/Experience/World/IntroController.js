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
        console.log("IntroController: check checalo :) .");
        console.log("IntroController: Iniciando animación de introducción.");
        const tl = gsap.timeline();
        this.experience.theme.setTheme('light', true);
        
        if (this.logo) {
            // Hacemos visible el contenedor principal del logo
            this.logo.logoGroup.visible = true;

            // Animamos la parte visual del logo (SVG y textura)
            // Hacemos que "crezca" desde el centro
            tl.fromTo(this.logo.logoGroup.scale, {
                x: 0,
                y: 0,
                z: 0
            }, {
                x: 15,
                y: 15,
                z: 15,
                duration: 3,
                ease: 'power3.out'
            });

            /*  tl.fromTo(this.logo.logoGroup.rotation, 
                { x: 0, z: 0 }, // 90 grados en radianes
                { x: Math.PI / 2, z: Math.PI, duration: 3, ease: 'power3.out' }, 
                "<" // Comienza al mismo tiempo que la escala
            ); */

            // Después de que el logo aparece, mostramos el texto
            // El '1' al final indica que esta animación empieza 1 segundo después del inicio de la timeline
            tl.call(() => {
/* 
                   gsap.to(this.logo.logoGroup.rotation, {
                    y: Math.PI,
                    duration: 1,
                    ease: 'power3.out'
                }); */
                /* this.letterManager.showText({
                    text: 'INTUITIVE HUMAN\nNEUROTHERAPY',
                    fontSize: 8, // Ajustamos el tamaño para que coincida con el logo
                    position: new THREE.Vector3(0, 0, 0) // Centrado con el logo
                }); */
            }, null, 3); // El null es para los parámetros, 1 es el tiempo
        }
        return tl; 
    }
}