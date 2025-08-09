import * as THREE from 'three';
import Mouth from './FaceParts/Mouth.js';
import Eye from './FaceParts/Eye.js';
import Eyebrow from './FaceParts/Eyebrow.js';
import Cheek from './FaceParts/Cheek.js'; 

export default class Face {
    constructor(experience) {
        this.experience = experience;

        // --- 1. CREACIÓN DE COMPONENTES ---
        // Primero, creamos una instancia de cada parte de la cara.
        this.leftEye = new Eye(this.experience);
        this.rightEye = new Eye(this.experience);
        this.leftEyebrow = new Eyebrow(this.experience);
        this.rightEyebrow = new Eyebrow(this.experience);
        this.leftCheek = new Cheek(this.experience);
        this.rightCheek = new Cheek(this.experience);
        this.mouth = new Mouth(this.experience);

        // --- CREACIÓN DE CONTENEDOR ---
        // Creamos el contenedor principal de la cara.
        this.container = new THREE.Group();

        // --- POSICIONAMIENTO ---
        // Ahora que todos los objetos existen, podemos posicionarlos y anidarlos.

        // Posicionamos el contenedor principal de la cara.
        this.container.position.set(0, -7.6, 2);
        this.container.rotation.x = THREE.MathUtils.degToRad(17);

        // Posicionamos los ojos.
        this.leftEye.container.position.set(-3.2, 0.2, 0);
        this.rightEye.container.position.set(3.2, 0.2, 0);

        // Posicionamos las cejas.
        this.leftEyebrow.container.position.set(-3.2, 0.2, 0);
        this.rightEyebrow.container.position.set(3.2, 0.2, 0);
        // Espejamos la ceja derecha
        this.leftEyebrow.container.scale.x = -1;

        // Posicionamos las mejillas.
        this.leftCheek.container.position.set(-4.6, -1, -0.1);
        this.rightCheek.container.position.set(4.6, -1, -0.1);

        // Posicionamos la boca.
        this.mouth.container.position.set(0, -.5, 0); 

        // Finalmente, añadimos todos los contenedores al contenedor principal de la cara.
        this.container.add(
            this.leftEye.container, this.rightEye.container,
            this.leftEyebrow.container, this.rightEyebrow.container,
            this.leftCheek.container, this.rightCheek.container,
            this.mouth.container
        );
  
       
    }

    setExpression(name) {
        // El orquestador le dice a cada parte que cambie su expresión
        this.mouth.setExpression(name);
        // this.leftEye.setExpression(name); // (en el futuro)
    }

    lookAt(target) {
        this.leftEye.lookAt(target);
        this.rightEye.lookAt(target);
    }

    update() {
        // El orquestador le dice a cada parte que se actualice
        this.mouth.update();
        this.leftEye.update();
        this.rightEye.update();
        this.leftEyebrow.update();
        this.rightEyebrow.update();
        this.leftCheek.update();
        this.rightCheek.update();
    }
}