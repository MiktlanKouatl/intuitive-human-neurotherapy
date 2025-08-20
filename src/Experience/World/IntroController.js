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

    prepareIntro() {
        console.log("IntroController: Preparando la introducción.");

        // --- Acto II: La Transformación (Estado Inicial) ---
        // Giramos el ContornoBase para que se vea como una línea y lo movemos hacia atrás
        if (this.logo && this.logo.pieces.contorno) {
            const contorno = this.logo.pieces.contorno;
            contorno.rotation.y = Math.PI / 2; // 90 grados
            contorno.scale.set(1, 1.2, 1); // Lo hacemos un poco más alto para el efecto dramático
        }
        
        if (this.logo) {
            console.log(this.logo.logoGroup);
            this.logo.logoGroup.position.z = 10;
            console.log(this.logo.logoGroup);
        }
    }
    play() {
        console.log("IntroController: Iniciando animación completa 'El Florecimiento'.");
        
        // Salida de seguridad
        if (!this.logo) {
            console.error("No se puede iniciar la animación, el logo no está listo.");
            return gsap.timeline(); // Devolvemos una timeline vacía para evitar errores
        }

        const tl = gsap.timeline();
        this.experience.theme.setTheme('light', true);
        this.logo.logoGroup.visible = true;
        this.logo.logoGroup.position.z = 40;

        // --- Acto II: La Transformación ---
        // Animamos el logo desde atrás y el contorno desde su estado inicial girado.
        tl.fromTo(this.logo.logoGroup.position,
            {   z: 99,
                y: 0,
             },
            {   z: 94,
                y: .6, //.6
                duration: 2,
                ease: 'power1.inOut' }
        );

        const contorno = this.logo.pieces.contorno;
        if (contorno) {
            tl.fromTo(contorno.rotation,
                { y: Math.PI / 2 },
                { y: 0, duration: 1.5, ease: 'power2.inOut' },
                "-=1.5" // Solapamos esta animación con la anterior
            );
            tl.fromTo(contorno.scale,
                { x: 1, y: 1.2, z: 1 },
                { y: 1, duration: 1.5, ease: 'power2.inOut' },
                "<" // Se ejecuta al mismo tiempo que la rotación
            );
        }

        // --- Acto III: El Florecimiento (con Stagger) ---
        // Preparamos los arrays de escalas y valores originales para cada grupo.
        const centerPositions = this.logo.pieces.center.map(p => p.position);
        const centerOriginals = this.logo.pieces.center.map(p => p.originalPosition);

        const redPositions = this.logo.pieces.red.map(p => p.position);
        const redOriginals = this.logo.pieces.red.map(p => p.originalPosition);

        const bluePositions = this.logo.pieces.blue.map(p => p.position);
        const blueOriginals = this.logo.pieces.blue.map(p => p.originalPosition);

        if (true) {

         // ✨ Animamos la posición Z de las piezas para que "vuelen" a su lugar
        tl.call(() => {
            this.logo.pieces.center.forEach(piece => {
                piece.visible = true
            });
        }, [], "-=1")

        .to(centerPositions, { // ✨ Animamos el array de .position
            z: (i) => centerOriginals[i].z, // ✨ Usamos el valor 'z' del original
            duration: 1.5,
            ease: 'power4.out', // Tu ease propuesto
            stagger: 0.1
        }, "-=0.8")

        tl.call (() => {
            this.logo.pieces.red.forEach(piece => {
                piece.visible = true
            });
        },[], "-=1.2")

        .to(redPositions, {
            z: (i) => redOriginals[i].z,
            duration: 1.2,
            ease: 'power4.out',
            stagger: 0.05
        }, "-=1.2")

        tl.call (() => {
            this.logo.pieces.blue.forEach(piece => {
                piece.visible = true
            });
        },[], "-=1.0")

        .to(bluePositions, {
            z: (i) => blueOriginals[i].z,
            duration: 1.2,
            ease: 'power4.out',
            stagger: 0.05
        }, "-=1.0");

        };

        tl.call(() => {

                this.letterManager.showText({
                    id: 'title1',
                    text: 'INTUITIVE HUMAN',
                    fontSize: 5,
                    position: new THREE.Vector3(0, -14, 0)
                });

                this.letterManager.showText({
                    id: 'title2',
                    text: 'NEUROTHERAPY',
                    color: '#ff0000',
                    fontSize: 5,
                    position: new THREE.Vector3(0, -20, 0)
                });

            }, null, 3); // El null es para los parámetros, 1 es el tiempo
        
        // Devolvemos la timeline completa para que StateManager la controle.
        return tl;
    }

}