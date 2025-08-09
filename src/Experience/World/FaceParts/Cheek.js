import * as THREE from 'three';
import Experience from '../../Experience.js';

export default class Cheek {
    constructor(experience) {
        this.experience = experience;
        this.theme = this.experience.theme;
        this.time = this.experience.time;

        this.container = new THREE.Group();
        this.setCheek();
    }

    setCheek() {
        const geometry = new THREE.CircleGeometry(0.5, 16);
        // Usaremos un color semi-transparente del tema
        this.material = new THREE.MeshBasicMaterial({ 
            color: this.theme.liveColors.line,
            transparent: true,
            opacity: 0.4
        });
        this.mesh = new THREE.Mesh(geometry, this.material);
        this.container.add(this.mesh);
    }

    update() {
        // Animación sutil de pulso o "respiración"
        const scale = .7 + Math.sin(this.time.elapsed * 0.008) * 0.1;
        this.container.scale.set(scale, scale, scale);
    }
}