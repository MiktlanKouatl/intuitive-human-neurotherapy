import * as THREE from 'three';
import gsap from 'gsap';

export default class Eye {
    constructor(experience) {
        this.experience = experience;
        this.theme = this.experience.theme;
        this.pupilMaxRadius = 0.4; // El radio máximo que la pupila puede recorrer
        // Contenedor principal para todas las partes del ojo
        this.container = new THREE.Group();
        

        this.setEye();
        this.startRandomBlinking();
    }

    setEye() {
        // Para la esclera, usaremos un círculo.
        const scleraGeometry = new THREE.CircleGeometry(1, 20); // Radio de 0.8, 20 segmentos
        this.scleraMaterial = new THREE.MeshBasicMaterial({
            color: 0xffffff,
            transparent: true,
            opacity: 0.4 // Un poco transparente para un efecto más suave
        }); // Color blanco por ahora
        this.sclera = new THREE.Mesh(scleraGeometry, this.scleraMaterial);

        // Para la pupila, un círculo más pequeño.
        const pupilGeometry = new THREE.CircleGeometry(0.6, 20);
        this.pupilMaterial = new THREE.MeshBasicMaterial({ color: 0x111111 }); // Color negro
        this.pupil = new THREE.Mesh(pupilGeometry, this.pupilMaterial);
        this.pupil.position.z = 0.1; // La ponemos ligeramente enfrente para que no haya z-fighting

        this.container.add(this.sclera, this.pupil);
    }

    blink() {
        // Usamos una timeline de GSAP para animar la escala en el eje Y
        const tl = gsap.timeline();
        tl.to(this.container.scale, { y: 0.1, duration: 0.05, ease: 'power2.out' });
        tl.to(this.container.scale, { y: 1, duration: 0.05, ease: 'power2.inOut', delay: 0.05 });
    }

    // AÑADIMOS el método que gestiona el parpadeo aleatorio
    startRandomBlinking() {
        const randomDelay = 2000 + Math.random() * 5000; // Parpadea entre 2 y 7 segundos

        setTimeout(() => {
            console.log('Blinking');
            this.blink();
            this.startRandomBlinking(); // Llama a la función de nuevo para el siguiente parpadeo
        }, randomDelay);
    }

    lookAt(target) {
        // Usamos GSAP para mover la pupila suavemente
        gsap.to(this.pupil.position, {
            x: target.x * this.pupilMaxRadius,
            y: target.y * this.pupilMaxRadius,
            duration: 0.5, // Duración suave del movimiento
            ease: 'power2.out'
        });
    }
    
    update() {
        // Lógica de animación sutil y 'look-at' irá aquí.
    }

    setExpression(name) {
        // Lógica para animar a 'feliz', 'triste', 'parpadeo' irá aquí.
    }
}