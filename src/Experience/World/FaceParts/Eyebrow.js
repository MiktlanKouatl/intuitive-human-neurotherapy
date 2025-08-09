import * as THREE from 'three';
import Experience from '../../Experience.js';

export default class Eyebrow {
    constructor(experience, options = {}) {
        this.experience = experience;
        this.theme = this.experience.theme;

        const startRadius = options.startRadius || 0.28;
        const endRadius = options.endRadius || 0.2;
        const length = options.length || 1;

        this.container = new THREE.Group();
        this.setEyebrow(startRadius, endRadius, length);
    }
    // Método de ayuda para crear los puntos de depuración que pediste
    createDebugPoints(pointsToDraw, size = 0.3, color = 0xffffff) {
        const geometry = new THREE.BufferGeometry().setFromPoints(pointsToDraw);
        const material = new THREE.PointsMaterial({ color: color, size: size });
        const points = new THREE.Points(geometry, material);
        return points;
    }
    setEyebrow(startRadius, endRadius, length) {
        // Definimos la forma 2D (Shape)
        //const points = [];
        const shape = new THREE.Shape();
        const startCenter = new THREE.Vector3(0, 0, 0);
        const endCenter = new THREE.Vector3(0, 0, 0);

        /*
        points.push(startCenter, endCenter);
        points.push(new THREE.Vector3(startCenter.x, startCenter.y + (startRadius), 0));
        points.push(new THREE.Vector3(startCenter.x, startCenter.y - (startRadius), 0));

        points.push(new THREE.Vector3(endCenter.x + length, endCenter.y + (endRadius), 0));
        points.push(new THREE.Vector3(endCenter.x + length, endCenter.y - (endRadius), 0));
        */
        shape.arc(startCenter.x, startCenter.y, startRadius, Math.PI * 1.5, Math.PI * 0.5, true);
        shape.lineTo(endCenter.x + length, startCenter.y + endRadius);
        shape.arc(endCenter.x, -endRadius, endRadius, Math.PI * 0.5, Math.PI * 1.5, true);
        shape.lineTo(startCenter.x, startCenter.y - startRadius);

        // Creamos la geometría plana a partir de la forma
        const geometry = new THREE.ShapeGeometry(shape);
        geometry.center(); // Centramos la geometría para que el pivote funcione bien

        this.material = new THREE.MeshBasicMaterial({ 
            color: this.theme.liveColors.line,
            transparent: true,
            opacity: 0.4
        });
        //const debugPoints = this.createDebugPoints(points);
        this.mesh = new THREE.Mesh(geometry, this.material);
        this.mesh.position.set(0, 1.6, 0); // Posicionamos la ceja en el pivote
        this.container.add(this.mesh);
        //this.container.add(debugPoints);
    }

    setExpression(name) { /* Futura lógica de animación */ }
    update() { /* Futura lógica de animación */ }
}