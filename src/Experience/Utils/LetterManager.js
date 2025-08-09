import * as THREE from 'three';
import { Text } from 'troika-three-text';
import gsap from 'gsap';
import Experience from '../Experience.js';

export default class LetterManager {
    constructor(experience) {
        this.experience = experience;
        this.worldGroup = this.experience.world.worldGroup;
        this.theme = this.experience.theme;
        
        this.letterPool = [];
        this.activeLetters = [];
        this.maxLetters = 50; // Cantidad máxima de letras que podemos mostrar a la vez

        this.preloadLetters();
    }

    preloadLetters() {
        for (let i = 0; i < this.maxLetters; i++) {
            const letter = new Text();
            letter.text = '';
            letter.anchorX = 'center';
            letter.anchorY = 'middle';
            letter.material.transparent = false; // Permite animar la opacidad
            letter.scale.set (0,0,0);
            letter.visible = false;
            
            this.letterPool.push(letter);
            this.worldGroup.add(letter);
        }
        console.log(`LetterManager: ${this.maxLetters} letras pre-cargadas.`);
    }

    // en src/Experience/Utils/LetterManager.js

showText(config) {
    this.hideText().then(() => {
        const text = config.text.replace(/\n/g, ' ');
        const lettersToShow = text.split('');
        const kerning = (config.fontSize || 1) * 0.8;
        const totalWidth = lettersToShow.reduce((width, char) => width + (char === ' ' ? kerning * 0.5 : kerning), 0);
        let currentX = -totalWidth / 2;

        for (let i = 0; i < lettersToShow.length; i++) {
            if (i >= this.letterPool.length) break;
            const char = lettersToShow[i];
            if (char === ' ') {
                currentX += kerning * 0.5;
                continue;
            }
            
            const letter = this.letterPool[i];
            
            // --- LÓGICA CORREGIDA ---
            // 1. CONFIGURAMOS COMPLETAMENTE LA LETRA
            letter.text = char;
            letter.fontSize = config.fontSize || 1;
            letter.color = this.theme.liveColors.line;
            letter.font = '/fonts/ubuntuBold.ttf';
            
            // 2. LA COLOCAMOS EN SU POSICIÓN FINAL (SIN ANIMACIÓN)
            letter.position.set(
                config.position.x + currentX,
                config.position.y,
                config.position.z
            );
            
            // 3. SINCRONIZAMOS PARA QUE TROIKA LA CONSTRUYA
            letter.sync(() => {
                // 4. UNA VEZ SINCRONIZADA, LA HACEMOS VISIBLE Y LA ANIMAMOS
                letter.visible = true;
                gsap.to(letter.scale, {
                    x: 1, y: 1, z: 1,
                    duration: 1.0,
                    ease: 'elastic.out(1, 0.5)',
                    delay: i * 0.05
                });
            });

            this.activeLetters.push(letter);
            currentX += kerning;
        }
    });
}

    hideText() {
        return new Promise ((resolve) => {
            if (this.activeLetters.length === 0) {
                resolve();
                return;
            }
            const tl = gsap.timeline({ onComplete: resolve });
            this.activeLetters.forEach((letter, i) => {
                tl.to(letter.scale, {
                    x:0,
                    y:0,
                    z:0,
                    duration:0.5,
                    ease: 'power3.in',
                    onComplete: () => {
                        letter.visible = false;
                        letter.text = '';
                    }
                }, i * 0.02);
            });
        });
        this.activeLetters = []; // Limpiamos el array de letras activas
    }
}