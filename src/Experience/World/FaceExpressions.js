import * as THREE from 'three';
import { Line2 } from 'three/addons/lines/Line2.js';
import { LineGeometry } from 'three/addons/lines/LineGeometry.js';
import { LineMaterial } from 'three/addons/lines/LineMaterial.js';

export default class FaceExpressions {
    constructor(container3d, theme) {
        this.container3d = container3d;
        this.theme = theme;
        this.expressions3d = {};
        this.expressions = {};
        this.expression = "calm";//"calm","talk";
        this.lastExpression = this.expression;
        this.createExpressions();
        this.createFaceLines();
        
        // Escuchar cambios en el tema
        this.theme.on('update', () => {
            this.updateLineColor();
        });
        //this.changeExpressionTimer ();
    }

    createFaceLines() {
        if (this.expressions3d[this.expression]) {
            this.container3d.add(this.expressions3d[this.expression]);
        } else {
            // Usa el color del tema en lugar de uno hardcodeado
            const material = new LineMaterial({
                color: this.theme.liveColors.line.getHex(), // <-- USA EL COLOR DEL TEMA
                linewidth: 3,
                dashed: false,
                transparent: false,
                resolution: new THREE.Vector2(window.innerWidth, window.innerHeight)
            });

            const pointsRE = this.expressions[this.expression].rightEye.map(p => [p.x, p.y, p.z]).flat();
            const geometryRE = new LineGeometry();
            geometryRE.setPositions(pointsRE);
            const rightEye = new Line2(geometryRE, material);

            const pointsLE = this.expressions[this.expression].leftEye.map(p => [p.x, p.y, p.z]).flat();
            const geometryLE = new LineGeometry();
            geometryLE.setPositions(pointsLE);
            const leftEye = new Line2(geometryLE, material);

            const pointsMouth = this.expressions[this.expression].mouth.map(p => [p.x, p.y, p.z]).flat();
            const geometryMouth = new LineGeometry();
            geometryMouth.setPositions(pointsMouth);
            const mouth = new Line2(geometryMouth, material);

            const face3d = new THREE.Group();
            face3d.position.x = 0;
            face3d.position.y = -7.6;
            face3d.position.z = 2;
            face3d.rotation.x = THREE.MathUtils.degToRad(17);

            face3d.add(rightEye);
            face3d.add(leftEye);
            face3d.add(mouth);

            this.expressions3d[this.expression] = face3d;
            this.container3d.add(face3d);
        }
    }

    updateLineColor() {
        for (const key in this.expressions3d) {
            const faceGroup = this.expressions3d[key];
            faceGroup.children.forEach(line => {
                line.material.color.set(this.theme.liveColors.line.getHex());
            });
        }
    }

    changeExpressionTimer (interval = Math.random() * 5000){
        if (this.expressionTimer) clearInterval(this.expressionTimer);
        const expressionNames = Object.keys(this.expressions);
        let currentIndex = expressionNames.indexOf(this.expression);
        this.expressionTimer = setInterval(() => {
            currentIndex = (currentIndex + 1) % expressionNames.length;
            this.changeExpression(expressionNames[currentIndex]);
        }, interval);
    }

    /*
    startExpressionTimer(interval = 2000) {
        if (this.expressionTimer) clearInterval(this.expressionTimer);
        const expressionNames = Object.keys(this.expressions);
        let currentIndex = expressionNames.indexOf(this.expression);

        this.expressionTimer = setInterval(() => {
            currentIndex = (currentIndex + 1) % expressionNames.length;
            this.changeExpression(expressionNames[currentIndex]);
        }, interval);
    }

    stopExpressionTimer() {
        if (this.expressionTimer) {
            clearInterval(this.expressionTimer);
            this.expressionTimer = null;
        }
    }

    blink(duration = 200) {
        const currentExpression = this.expressions[this.expression];
        if (!currentExpression) return;

        const originalRightEye = currentExpression.rightEye;
        const originalLeftEye = currentExpression.leftEye;

        // Temporarily remove eyes
        currentExpression.rightEye = [];
        currentExpression.leftEye = [];
        this.changeExpression(this.expression);

        setTimeout(() => {
            // Restore eyes
            currentExpression.rightEye = originalRightEye;
            currentExpression.leftEye = originalLeftEye;
            this.changeExpression(this.expression);
        }, duration);
    }
*/
    createExpressions() {
        // Ojos como cuadros centrados en y=1
        // Ojos como círculos
        function createCirclePoints(centerX, centerY, radius, segments = 10) {
            const points = [];
            for (let i = 0; i <= segments; i++) {
            const theta = (i / segments) * Math.PI * 2;
            points.push(new THREE.Vector3(
                centerX + Math.cos(theta) * radius,
                centerY + Math.sin(theta) * radius,
                0
            ));
            }
            return points;
        }

        const eyeRadius = 0.6;
        const eyeCenterY = 0.9;
        const eyeCenterX = 2.7;

        const rightEye = createCirclePoints(eyeCenterX, eyeCenterY, eyeRadius);
        const leftEye = createCirclePoints(-eyeCenterX, eyeCenterY, eyeRadius);

        const calm = {
            rightEye,
            leftEye,
            mouth: [
            new THREE.Vector3(-1.1, -.7, 0),
            new THREE.Vector3(-1, -1, 0),
            new THREE.Vector3(1, -1, 0),
            new THREE.Vector3(1.1, -.7, 0)
        ]
        };
        this.addExpression("calm", calm);
        const talk = {
            rightEye: [
                new THREE.Vector3(1.5, .8, 0),
                new THREE.Vector3(2.2, 1.3, 0),
                new THREE.Vector3(3, .8, 0)
            ],
            leftEye: [
                new THREE.Vector3(-1.5, .8, 0),
                new THREE.Vector3(-2.2, 1.3, 0),
                new THREE.Vector3(-3, .8, 0)
            ],
            mouth: [
                new THREE.Vector3(-1, -.8, 0),
                new THREE.Vector3(1, -.8, 0),
                new THREE.Vector3(0, -1.3, 0),
                new THREE.Vector3(-1, -.8, 0),
            ]
        };
        this.addExpression("talk", talk);
        const smile = {
            rightEye: [
                new THREE.Vector3(1.5, .8, 0),
                new THREE.Vector3(2, 1.3, 0),
                new THREE.Vector3(3, 1.3, 0)
            ],
            leftEye: [
                new THREE.Vector3(-1.5, .8, 0),
                new THREE.Vector3(-2, 1.3, 0),
                new THREE.Vector3(-3, 1.3, 0)
            ],
            mouth: [
                new THREE.Vector3(-.7, -.8, 0),
                new THREE.Vector3(.7, -.8, 0),
                new THREE.Vector3(1, -.5, 0),
            ]
        };
        this.addExpression("smile", smile);
        const uuh = {
            rightEye: [
                new THREE.Vector3(1.5, 1.3, 0),
                new THREE.Vector3(3, 1.3, 0)
            ],
            leftEye: [
                new THREE.Vector3(-1.5, 1.3, 0),
                new THREE.Vector3(-3, 1.3, 0)
            ],
            mouth: [
                new THREE.Vector3(-.1, -.8, 0),
                new THREE.Vector3(0, -.8, 0)
            ]
        };
        this.addExpression("uuh", uuh);
        const error = {
            rightEye: [
                new THREE.Vector3(1.5, 1.8, 0),
                new THREE.Vector3(3, .8, 0),
                new THREE.Vector3(2.25, 1.4, 0),
                new THREE.Vector3(1.5, .8, 0),
                new THREE.Vector3(3, 1.8, 0)
            ],
            leftEye: [
                new THREE.Vector3(-1.5, 1.8, 0),
                new THREE.Vector3(-3, .8, 0),
                new THREE.Vector3(-2.25, 1.4, 0),
                new THREE.Vector3(-1.5, .8, 0),
                new THREE.Vector3(-3, 1.8, 0)
            ],
            mouth: [
                new THREE.Vector3(-.7, -.8, 0),
                new THREE.Vector3(.7, -.8, 0),
                new THREE.Vector3(1, -1.1, 0),
            ]
        };
        this.addExpression("error", error);
    }
    returnToLastExpression() {
        if (this.lastExpression) {
            this.changeExpression(this.lastExpression);
        } else {
            console.warn("No last expression to return to.");
        }
    }
    changeExpression(expressionName) {
        this.lastExpression = this.expression;
        if (this.expressions[expressionName]) {
            this.expression = expressionName;
            this.container3d.clear(); // Remove existing face lines
            this.createFaceLines(); // Recreate face lines with the new expression
        } else {
            console.warn(`Expression "${expressionName}" does not exist.`);
        }
    }

    addExpression(name, data) {
        this.expressions[name] = data;
    }
    
}