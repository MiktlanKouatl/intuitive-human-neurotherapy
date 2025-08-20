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
        this.activeTexts = new Map(); // Usamos un Map para gestionar textos por ID
        this.activeLetters = [];
        this.maxLetters = 100; // Cantidad máxima de letras que podemos mostrar a la vez
        this.nextAvailableLetterIndex = 0; // Puntero a la siguiente letra libre


        this.preloadLetters();
    }

    preloadLetters() {
        for (let i = 0; i < this.maxLetters; i++) {
            const letter = new Text();
            letter.text = '';
            letter.anchorX = 'center';
            letter.anchorY = 'middle';
            letter.material.transparent = false; // Permite animar la opacidad
            letter.scale.set (1,1,1);
            letter.visible = true;
            
            this.letterPool.push(letter);
            this.worldGroup.add(letter);
        }
        console.log(`LetterManager: ${this.maxLetters} letras pre-cargadas.`);
    }

    // en src/Experience/Utils/LetterManager.js

    showText(config) {
        // 1. CONFIRMAMOS QUE LA LLAMADA Y LA CONFIGURACIÓN LLEGAN BIEN
        console.log("--- [LetterManager] Iniciando showText ---", config);

        // Extraemos las propiedades con valores por defecto
        const {
            id = 'default',
            text = '',
            fontSize = 1,
            font = '/fonts/ubuntuBold.ttf', // Asegúrate que esta ruta es correcta
            color = this.theme.liveColors.line,
            position = new THREE.Vector3(0, 0, 0)
        } = config;

        // Si ya existe un texto con este ID, lo ocultamos primero
        /* if (this.activeTexts.has(id)) {
            this.hideText({ id });
        } */

        const lettersToShow = text.split('');
        const kerning = fontSize * 0.8;
        const totalWidth = lettersToShow.reduce((width, char) => width + (char === ' ' ? kerning * 0.5 : kerning), 0);
        let currentX = position.x - totalWidth / 2;
        const lettersForThisBlock = [];

        console.log(`[${id}] -> Mostrando texto: "${text}"`); // 2. VERIFICAMOS EL TEXTO A PROCESAR

        for (let i = 0; i < lettersToShow.length; i++) {
            const char = lettersToShow[i];
            if (char === ' ') {
                currentX += kerning * 0.5;
                continue;
            }

            if (this.nextAvailableLetterIndex >= this.letterPool.length) {
                console.warn("LetterManager: No hay más letras pre-cargadas.");
                break;
            }
            
            const letter = this.letterPool[this.nextAvailableLetterIndex];
            this.nextAvailableLetterIndex++;

            // 3. VERIFICAMOS QUE ESTAMOS CONFIGURANDO LA LETRA
            console.log(`[${id} - ${char}] -> Configurando letra #${i} del pool.`);

            letter.text = char;
            letter.fontSize = fontSize;
            letter.color = color;
            letter.font = font;
            letter.position.set(currentX, position.y, position.z);
            
            // 4. EL PUNTO MÁS CRÍTICO: El callback de .sync()
            console.log(`[${id} - ${char}] -> Llamando a .sync()`);
            letter.sync(() => {
                // SI NO VES ESTE MENSAJE EN LA CONSOLA, EL PROBLEMA ESTÁ EN LA CARGA DE LA FUENTE
                console.log(`%c[${id} - ${char}] -> ¡CALLBACK DE SYNC EJECUTADO!`, 'color: lightgreen; font-weight: bold;');

                letter.visible = true;
                gsap.from(letter.position, {
                    y: letter.position.y - 3, z: 0,
                    duration: 1.0,
                    ease: 'back.out(3)',
                    delay: i * 0.05
                });
            });

            lettersForThisBlock.push(letter);
            currentX += kerning;
        }

        this.activeTexts.set(id, lettersForThisBlock);
    }

    hideText({ id }) {
        if (!this.activeTexts.has(id)) {
            return;
        }

        const lettersToHide = this.activeTexts.get(id);

        lettersToHide.forEach((letter, i) => {
            gsap.to(letter.scale, {
                x: 0, y: 0, z: 0,
                duration: 0.5,
                ease: 'power3.in',
                delay: i * 0.02,
                onComplete: () => {
                    letter.visible = false;
                }
            });
        });

        // Liberamos el ID, pero no reseteamos el pool todavía
        this.activeTexts.delete(id);
    }
    
    // Función para limpiar toda la pantalla
    hideAll() {
        for (const id of this.activeTexts.keys()) {
            this.hideText({ id });
        }
        // Reseteamos el puntero para que el pool pueda ser reutilizado desde el principio
        this.nextAvailableLetterIndex = 0;
    }
}