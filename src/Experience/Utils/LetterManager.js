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
            letter.extrusion = 30;
            letter.visible = true;
            
            this.letterPool.push(letter);
            this.worldGroup.add(letter);
        }
        console.log(`LetterManager: ${this.maxLetters} letras pre-cargadas.`);
    }

    // --- CATÁLOGO DE "RECETAS" DE ANIMACIÓN DE ENTRADA ---

    _getAnimation(config) {
        const { type = 'elasticIn' } = config;

        switch (type) {
            case 'introReveal':
                // Esta receta ahora acepta un ARRAY de letras
                return (letters, animConfig) => {
                    const { stagger = 0.05, duration = 1.0 } = animConfig;
                    // 1. Preparamos el estado inicial de TODAS las letras
                    letters.forEach(letter => {
                        letter.visible = true;
                        //letter.material.opacity = 0;
                    });
                    // Animamos la posición de todas las letras
                    gsap.from(letters.map(l => l.position), {
                        z: (i) => letters[i].position.z + 80, // Empiezan 30 unidades más atrás
                        duration: duration / 2,
                        ease: 'power2.out(2)',
                        stagger // GSAP aplica el escalonamiento aquí
                    });

                    // Animamos la rotación de todas las letras
                    gsap.from(letters.map(l => l.rotation), {
                        y: -Math.PI / 2, // Empiezan giradas -90 grados
                        duration: duration / 2,
                        ease: 'power2.out(2)',
                        stagger, // El mismo stagger para sincronizar
                        delay: duration / 2
                    });

                    // Animamos la opacidad de todas las letras
                    /* gsap.to(letters.map(l => l.material), {
                        opacity: 1,
                        duration: duration * 0.8,
                        ease: 'power2.out',
                        stagger // Y de nuevo aquí
                    }); */
                };
            
            case 'elasticIn':
                // La receta elástica, ahora también para un array
                return (letters, animConfig) => {
                    const { stagger = 0.05, duration = 1.0 } = animConfig;
                    
                    letters.forEach(l => l.visible = true);
                    
                    gsap.from(letters.map(l => l.scale), {
                        x: 0, y: 0, z: 0,
                        duration,
                        ease: 'elastic.out(1, 0.5)',
                        stagger
                    });
                };

            default:
                return (letters, animConfig) => {
                    const { stagger = 0.05, duration = 1.0 } = animConfig;
                    letters.forEach(l => l.visible = true);
                    gsap.from(letters.map(l => l.scale), { x: 0, y: 0, z: 0, duration, stagger });
                };
        }
    }
    /// CATÁLOGO DE "RECETAS" DE ANIMACIÓN DE SALIDA ---
    _getExitAnimation(config) {
        const { type = 'simpleFadeOut' } = config;

        switch (type) {
            case 'transformToPoints':
                return (letters, animConfig) => {
                    const { targets = [], onComplete = () => {} } = animConfig;
                    const tl = gsap.timeline({ onComplete });

                    // Fase 1: Transformar cada letra en una línea vertical
                    tl.to(letters.map(l => l.scale), {
                        x: 0.05, // Muy delgada
                        z: 0.05, // Muy delgada
                        y: 1.2,  // Ligeramente más alta
                        duration: 0.7,
                        ease: 'power3.in',
                        stagger: 0.03
                    });

                    // Fase 2: Mover cada línea a su punto de destino
                    // Usamos un solo .to() con stagger para un control perfecto
                    tl.to(letters.map(l => l.position), {
                        x: (i) => targets[i % targets.length].x,
                        y: (i) => targets[i % targets.length].y,
                        z: (i) => targets[i % targets.length].z,
                        duration: 1.5,
                        ease: 'power2.inOut',
                        stagger: 0.02 // Un stagger muy rápido para el efecto de "enjambre"
                    }, "<0.2"); // Empezar 0.2s después del inicio de la animación anterior

                    return tl;
                };

            case 'simpleFadeOut':
            default:
                return (letters, animConfig) => {
                    const { onComplete = () => {} } = animConfig;
                    return gsap.to(letters.map(l => l.material), {
                        opacity: 0,
                        duration: 0.5,
                        stagger: 0.02,
                        onComplete
                    });
                };
        }
    }

    showText(config) {
        // Extraemos toda la configuración necesaria de config
        const {
            id = 'default',
            text = '',
            fontSize = 1,
            font = '/fonts/ubuntuBold.ttf',
            color = this.theme.liveColors.line,
            position = new THREE.Vector3(0, 0, 0),
            animation = {} // Objeto para la configuración de la animación
        } = config;
        // Si ya existe un texto con este ID, lo ocultamos para actualizarlo
        if (this.activeTexts.has(id)) {
            this.hideText({ id });
        }

        const lettersToShow = text.split('');
        const kerning = fontSize * 0.8;
        const totalWidth = lettersToShow.reduce((width, char) => width + (char === ' ' ? kerning * 0.5 : kerning), 0);
        let currentX = position.x - totalWidth / 2;
        
        const lettersForThisBlock = [];
        const syncPromises = []; // Array para guardar las promesas de cada .sync()

        // Recorremos las letras para configurarlas y preparar las promesas de sincronización
        for (const char of lettersToShow) {
            if (char === ' ') {
                currentX += kerning * 0.5;
                continue;
            }

            if (this.nextAvailableLetterIndex >= this.letterPool.length) {
                console.warn("LetterManager: Pool de letras agotado.");
                break;
            }
            
            const letter = this.letterPool[this.nextAvailableLetterIndex];
            this.nextAvailableLetterIndex++;

            // Configuramos la letra con sus propiedades
            letter.text = char;
            letter.fontSize = fontSize;
            letter.color = color;
            letter.font = font;
            letter.position.set(currentX, position.y, position.z);
            
            lettersForThisBlock.push(letter);

            // Creamos una promesa para cada .sync() y la guardamos
            syncPromises.push(new Promise(resolve => letter.sync(resolve)));
            
            currentX += kerning;
        }

        // Guardamos las letras en nuestro Map para poder controlarlas después
        this.activeTexts.set(id, lettersForThisBlock);

        // Esperamos a que TODAS las letras estén listas (sincronizadas)
        Promise.all(syncPromises).then(() => {
            // Obtenemos la "receta" de la animación que vamos a usar
            const animationFunction = this._getAnimation(animation);
            
            // Ejecutamos UNA SOLA animación sobre el ARRAY completo de letras
            animationFunction(lettersForThisBlock, animation);
        });
    }

    hideText(config) {
        const { id, animation = {} } = config;

        if (!this.activeTexts.has(id)) {
            console.warn(`LetterManager: No se encontró texto con el id "${id}".`);
            return;
        }

        const lettersToHide = this.activeTexts.get(id);
        
        // Obtenemos y ejecutamos la función de animación de salida
        const exitAnimationFunction = this._getExitAnimation(animation);
        exitAnimationFunction(lettersToHide, animation);

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
    // --- FUNCIÓN PARA LA TRANSICIÓN DE SALIDA ---
    transformTextToPoints({ id, targetPoints, onComplete = () => {} }) {
        if (!this.activeTexts.has(id)) {
            console.warn(`LetterManager: No se encontró texto con el id "${id}".`);
            return;
        }

        const lettersToTransform = this.activeTexts.get(id);
        const tl = gsap.timeline({ onComplete });

        // Fase 1: Transformar cada letra en una línea vertical
        tl.to(lettersToTransform.map(l => l.scale), {
            x: 0.05, // Muy delgada
            z: 0.05, // Muy delgada
            y: 1.2,  // Ligeramente más alta
            duration: 0.7,
            ease: 'power3.in',
            stagger: 0.03
        });

        // Fase 2: Mover cada línea a su punto de destino
        lettersToTransform.forEach((letter, i) => {
            // Aseguramos que haya un punto de destino para cada letra
            const targetPoint = targetPoints[i % targetPoints.length];
            
            tl.to(letter.position, {
                x: targetPoint.x,
                y: targetPoint.y,
                z: targetPoint.z,
                duration: 1.5,
                ease: 'power2.inOut'
            }, `-=${0.7 - i * 0.02}`); // Solapamos las animaciones para un efecto fluido
        });
    }
}