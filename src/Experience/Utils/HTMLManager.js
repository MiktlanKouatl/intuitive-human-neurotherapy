import * as THREE from 'three';

export default class HTMLManager {
    constructor(experience, container) {
        this.experience = experience;
        this.camera = this.experience.camera.instance;
        this.sizes = this.experience.sizes;
        
        // El contenedor donde se añadirán los elementos HTML
        this.container = container; 
        
        // Un array para guardar los objetos que estamos rastreando
        this.trackedElements = [];
    }

    // El método principal para empezar a rastrear un objeto
    track({ htmlElement, threeObject }) {
        this.trackedElements.push({ htmlElement, threeObject });
        this.container.appendChild(htmlElement);
    }

    // Este método se llamará en cada frame
    update() {
        if (this.trackedElements.length === 0) return;

        for (const item of this.trackedElements) {
            const { htmlElement, threeObject } = item;

            // 1. Obtenemos la posición del objeto 3D en el mundo
            const worldPosition = new THREE.Vector3();
            threeObject.getWorldPosition(worldPosition);

            // 2. Proyectamos esa posición 3D a coordenadas de pantalla 2D
            const screenPosition = worldPosition.clone().project(this.camera);

            // 3. Convertimos las coordenadas (-1 a +1) a píxeles
            const translateX = (screenPosition.x * this.sizes.width * 0.5);
            const translateY = (-screenPosition.y * this.sizes.height * 0.5);

            // 4. Aplicamos la transformación al elemento HTML
            htmlElement.style.transform = `translate(${translateX}px, ${translateY}px)`;
        }
    }
}