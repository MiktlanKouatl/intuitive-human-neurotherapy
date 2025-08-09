import * as THREE from 'three';
import gsap from 'gsap';
import { Line2 } from 'three/examples/jsm/lines/Line2.js';
import { LineGeometry } from 'three/examples/jsm/lines/LineGeometry.js';
import { LineMaterial } from 'three/examples/jsm/lines/LineMaterial.js';

export default class Mouth {
    constructor(experience) {
        this.experience = experience;
        this.theme = this.experience.theme;
        this.color = 0x000000;

        this.expressions = {
            calm: {
                linewidth: 7,
                points: [
                    new THREE.Vector3(-1.1, -0.7, 0), new THREE.Vector3(-1, -1, 0),
                    new THREE.Vector3(1, -1, 0), new THREE.Vector3(1.1, -0.7, 0)
                ]
            },
            smile: {
                linewidth: 7,
                points: [
                    new THREE.Vector3(-1.5, -0.8, 0),
                    new THREE.Vector3(-1.2, -1.2, 0),
                    new THREE.Vector3(-0.5, -1.4, 0),
                    new THREE.Vector3(0.5, -1.4, 0),
                    new THREE.Vector3(1.2, -1.2, 0),
                    new THREE.Vector3(1.5, -0.8, 0)
                ]
            }
        };
        
        this.container = new THREE.Group();
        this.linePool = [];
        this.activeLines = [];
        this.maxSegments = 20;

        this.initLinePool();
        this.drawExpression(this.expressions.calm); // Dibuja la expresión inicial
    }

    initLinePool() {
        for (let i = 0; i < this.maxSegments; i++) {
            const geometry = new LineGeometry();
            const material = new LineMaterial({
                color: this.color,//this.theme.liveColors.line.getHex(),
                linewidth: 3,
                resolution: new THREE.Vector2(window.innerWidth, window.innerHeight),
                transparent: true,
                opacity: 1,
            });
            const line = new Line2(geometry, material);
            line.visible = false;
            this.linePool.push(line);
            this.container.add(line);
        }
    }

    setExpression(name, duration = 0.5) {
    const targetExpression = this.expressions[name];
    if (!targetExpression) return;

    // Guardamos una referencia a las líneas que se van a desvanecer
    const linesToFadeOut = [...this.activeLines];

    // 1. Animación de salida para las líneas actuales
    gsap.to(linesToFadeOut.map(line => line.material), {
        opacity: 0,
        duration: duration / 2,
        ease: 'power2.in',
        // 2. Cuando termina la animación de salida...
        onComplete: () => {
            this.releaseAllLines();
            this.drawExpression(targetExpression);

            // 3. Animación de entrada para las nuevas líneas
            // Primero nos aseguramos de que su opacidad inicial sea 0
            this.activeLines.forEach(line => line.material.opacity = 0);
            
            gsap.to(this.activeLines.map(line => line.material), {
                opacity: 1,
                duration: duration / 2,
                ease: 'power2.out'
            });
        }
    });
}

    drawExpression(expression) {
        const points = expression.points;
        if (points.length < 2) return;

        for (let i = 0; i < points.length - 1; i++) {
            const lineSegment = this.getLineFromPool();
            if (lineSegment) {
                const p1 = points[i];
                const p2 = points[i + 1];
                lineSegment.geometry.setPositions([p1.x, p1.y, p1.z, p2.x, p2.y, p2.z]);
                lineSegment.computeLineDistances();
                lineSegment.material.linewidth = expression.linewidth;
                lineSegment.material.color.set(this.color);//this.theme.liveColors.line.getHex()
                lineSegment.visible = true;
                this.activeLines.push(lineSegment);
            }
        }
    }

    getLineFromPool() {
        return this.linePool.find(line => !line.visible);
    }

    releaseAllLines() {
        this.activeLines.forEach(line => line.visible = false);
        this.activeLines = [];
    }

    update() {
        // ...
    }
}