import * as THREE from 'three';
import { gsap } from 'gsap';
import Face from './Face.js';

export default class BrainModel {
    constructor(world) { // Accept world instance
        this.experience = world.experience; // Use the provided experience
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;
        this.theme = this.experience.theme;
        this.time = this.experience.time;
        this.world = world; // Store the world instance

        // FIX: Initialize brainGroup immediately to prevent race conditions.
        this.brainGroup = new THREE.Group();
        // Escuchar cambios en el tema
        this.theme.on('update', () => {
            this.updateMaterials();
        });
        this.createModel();
    }
    updateMaterials() {
        for (const part in this.materials) {
            this.materials[part].uniforms.colorA.value = this.theme.liveColors[part].colorA;
            this.materials[part].uniforms.colorB.value = this.theme.liveColors[part].colorB;
        }
    }
    // 4. AÑADE un método update a BrainModel
    update() {
        if (this.face) {
            this.face.update(this.time.elapsed);
        }
    }
    createModel() {
        this.materials = {};

        const vertexShader = `
            varying vec3 vNormal;
            void main() {
                vNormal = normalize(normalMatrix * normal);
                gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
        `;

        const fragmentShader = `
            uniform vec3 colorA;
            uniform vec3 colorB;
            varying vec3 vNormal;
            void main() {
                float intensity = pow(0.5 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 0.4);
                gl_FragColor = vec4(mix(colorB, colorA, intensity), 1.0);
            }
        `;

        const createBrainMaterial = (part) => {
            const material = new THREE.ShaderMaterial({
                vertexShader,
                fragmentShader,
                uniforms: {
                    colorA: { value: this.theme.liveColors[part].colorA },
                    colorB: { value: this.theme.liveColors[part].colorB },
                },
            });
            this.materials[part] = material;
            return material;
        };

        const frontalMaterial = createBrainMaterial('frontal');
        const parietalMaterial = createBrainMaterial('parietal');
        const occipitalMaterial = createBrainMaterial('occipital');
        const temporalMaterial = createBrainMaterial('temporal');
        const cerebellumMaterial = createBrainMaterial('cerebellum');

        // Create the shapes for the brain //

        const BrainFrontalRight = new THREE.Shape();
        BrainFrontalRight.moveTo(0, -4);
        BrainFrontalRight.lineTo(6, 0);
        BrainFrontalRight.lineTo(14, 0);
        BrainFrontalRight.lineTo(13, -7);
        BrainFrontalRight.lineTo(5, -10);
        BrainFrontalRight.lineTo(5, -15);
        BrainFrontalRight.lineTo(1, -15);
        BrainFrontalRight.lineTo(-1, -8);
        BrainFrontalRight.lineTo(0, -4);

        const BrainFrontalLeft = new THREE.Shape();
        BrainFrontalLeft.moveTo(0, -4);
        BrainFrontalLeft.lineTo(-6, 0);
        BrainFrontalLeft.lineTo(-14, 0);
        BrainFrontalLeft.lineTo(-13, -7);
        BrainFrontalLeft.lineTo(-5, -10);
        BrainFrontalLeft.lineTo(-5, -15);
        BrainFrontalLeft.lineTo(-1, -15);
        BrainFrontalLeft.lineTo(1, -8);
        BrainFrontalLeft.lineTo(0, -4);

        const extrudeSettings = {
            steps: 1,
            depth: 8,
            bevelEnabled: true,
            bevelThickness: 1,
            bevelSize: 1,
            bevelOffset: -1,
            bevelSegments: 2
        };

        const geometryRight = new THREE.ExtrudeGeometry(BrainFrontalRight, extrudeSettings);
        const meshRight = new THREE.Mesh(geometryRight, frontalMaterial);

        const geometryLeft = new THREE.ExtrudeGeometry(BrainFrontalLeft, extrudeSettings);
        const meshLeft = new THREE.Mesh(geometryLeft, frontalMaterial);

        meshRight.rotation.y = Math.PI / 180 * 90;
        meshLeft.rotation.y = Math.PI / 180 * -90;

        meshRight.position.x = .5;
        meshRight.position.y = 0;
        meshRight.position.z = 0;

        meshLeft.position.x = -.5;
        meshLeft.position.y = 0;
        meshLeft.position.z = 0;

        const brainFrontalGroup = new THREE.Group();
        brainFrontalGroup.add(meshRight);
        brainFrontalGroup.add(meshLeft);

        const BrainParietalRight = new THREE.Shape();
        BrainParietalRight.moveTo(13, -7);
        BrainParietalRight.lineTo(14, 0);
        BrainParietalRight.lineTo(20, 0);
        BrainParietalRight.lineTo(27, -4);
        BrainParietalRight.lineTo(28, -9);
        BrainParietalRight.lineTo(23, -10);
        BrainParietalRight.lineTo(23, -11);
        BrainParietalRight.lineTo(13, -7);

        const BrainParietalLeft = new THREE.Shape();
        BrainParietalLeft.moveTo(-13, -7);
        BrainParietalLeft.lineTo(-14, 0);
        BrainParietalLeft.lineTo(-20, 0);
        BrainParietalLeft.lineTo(-27, -4);
        BrainParietalLeft.lineTo(-28, -9);
        BrainParietalLeft.lineTo(-23, -10);
        BrainParietalLeft.lineTo(-23, -11);
        BrainParietalLeft.lineTo(-13, -7);

        const geometryParietalRight = new THREE.ExtrudeGeometry(BrainParietalRight, extrudeSettings);
        const meshParietalRight = new THREE.Mesh(geometryParietalRight, parietalMaterial);

        const geometryParietalLeft = new THREE.ExtrudeGeometry(BrainParietalLeft, extrudeSettings);
        const meshParietalLeft = new THREE.Mesh(geometryParietalLeft, parietalMaterial);

        meshParietalRight.rotation.y = Math.PI / 180 * 90;
        meshParietalLeft.rotation.y = Math.PI / 180 * -90;

        meshParietalRight.position.x = .5;
        meshParietalRight.position.y = 0;
        meshParietalRight.position.z = 0;

        meshParietalLeft.position.x = -.5;
        meshParietalLeft.position.y = 0;
        meshParietalLeft.position.z = 0;

        const brainParietalGroup = new THREE.Group();
        brainParietalGroup.add(meshParietalRight);
        brainParietalGroup.add(meshParietalLeft);

        const brainOccipitalRight = new THREE.Shape();
        brainOccipitalRight.moveTo(28, -9);
        brainOccipitalRight.lineTo(28, -13);
        brainOccipitalRight.lineTo(25, -17);
        brainOccipitalRight.lineTo(20, -17);
        brainOccipitalRight.lineTo(23, -13);
        brainOccipitalRight.lineTo(23, -10);
        brainOccipitalRight.lineTo(28, -9);

        const brainOccipitalLeft = new THREE.Shape();
        brainOccipitalLeft.moveTo(-28, -9);
        brainOccipitalLeft.lineTo(-28, -13);
        brainOccipitalLeft.lineTo(-25, -17);
        brainOccipitalLeft.lineTo(-20, -17);
        brainOccipitalLeft.lineTo(-23, -13);
        brainOccipitalLeft.lineTo(-23, -10);
        brainOccipitalLeft.lineTo(-28, -9);

        const geometryOccipitalRight = new THREE.ExtrudeGeometry(brainOccipitalRight, extrudeSettings);
        const meshOccipitalRight = new THREE.Mesh(geometryOccipitalRight, occipitalMaterial);

        const geometryOccipitalLeft = new THREE.ExtrudeGeometry(brainOccipitalLeft, extrudeSettings);
        const meshOccipitalLeft = new THREE.Mesh(geometryOccipitalLeft, occipitalMaterial);

        meshOccipitalRight.rotation.y = Math.PI / 180 * 90;
        meshOccipitalLeft.rotation.y = Math.PI / 180 * -90;

        meshOccipitalRight.position.x = .5;
        meshOccipitalRight.position.y = 0;
        meshOccipitalRight.position.z = 0;

        meshOccipitalLeft.position.x = -.5;
        meshOccipitalLeft.position.y = 0;
        meshOccipitalLeft.position.z = 0;

        const brainOccipitalGroup = new THREE.Group();
        brainOccipitalGroup.add(meshOccipitalRight);
        brainOccipitalGroup.add(meshOccipitalLeft);

        const brainTemporalRight = new THREE.Shape();
        brainTemporalRight.moveTo(5, -15);
        brainTemporalRight.lineTo(5, -10);
        brainTemporalRight.lineTo(13, -7);
        brainTemporalRight.lineTo(23, -11);
        brainTemporalRight.lineTo(23, -13);
        brainTemporalRight.lineTo(20, -17);
        brainTemporalRight.lineTo(17, -17);
        brainTemporalRight.lineTo(15, -15);
        brainTemporalRight.lineTo(5, -15);


        const brainTemporalLeft = new THREE.Shape();
        brainTemporalLeft.moveTo(-5, -15);
        brainTemporalLeft.lineTo(-5, -10);
        brainTemporalLeft.lineTo(-13, -7);
        brainTemporalLeft.lineTo(-23, -11);
        brainTemporalLeft.lineTo(-23, -13);
        brainTemporalLeft.lineTo(-20, -17);
        brainTemporalLeft.lineTo(-17, -17);
        brainTemporalLeft.lineTo(-15, -15);
        brainTemporalLeft.lineTo(-5, -15);


        const geometryTemporalRight = new THREE.ExtrudeGeometry(brainTemporalRight, extrudeSettings);
        const meshTemporalRight = new THREE.Mesh(geometryTemporalRight, temporalMaterial);

        const geometryTemporalLeft = new THREE.ExtrudeGeometry(brainTemporalLeft, extrudeSettings);
        const meshTemporalLeft = new THREE.Mesh(geometryTemporalLeft, temporalMaterial);


        meshTemporalRight.rotation.y = Math.PI / 180 * 90;
        meshTemporalLeft.rotation.y = Math.PI / 180 * -90;

        meshTemporalRight.position.x = .5;
        meshTemporalRight.position.y = 0;
        meshTemporalRight.position.z = 0;

        meshTemporalLeft.position.x = -.5;
        meshTemporalLeft.position.y = 0;
        meshTemporalLeft.position.z = 0;

        const brainTemporalGroup = new THREE.Group();
        brainTemporalGroup.add(meshTemporalRight);
        brainTemporalGroup.add(meshTemporalLeft);

        const BrainCerebellumRight = new THREE.Shape();
        BrainCerebellumRight.moveTo(25, -17);
        BrainCerebellumRight.lineTo(23, -20);
        BrainCerebellumRight.lineTo(21, -21);
        BrainCerebellumRight.lineTo(15, -21);
        BrainCerebellumRight.lineTo(13, -20);
        BrainCerebellumRight.lineTo(11.5, -15);

        BrainCerebellumRight.lineTo(12, -14);
        BrainCerebellumRight.lineTo(16, -14);
        BrainCerebellumRight.lineTo(17, -15);

        BrainCerebellumRight.lineTo(25, -15);
        BrainCerebellumRight.moveTo(25, -17);

        const BrainCerebellumLeft = new THREE.Shape();
        BrainCerebellumLeft.moveTo(-25, -17);
        BrainCerebellumLeft.lineTo(-23, -20);
        BrainCerebellumLeft.lineTo(-21, -21);
        BrainCerebellumLeft.lineTo(-15, -21);
        BrainCerebellumLeft.lineTo(-13, -20);
        BrainCerebellumLeft.lineTo(-11.5, -15);

        BrainCerebellumLeft.lineTo(-12, -14);
        BrainCerebellumLeft.lineTo(-16, -14);
        BrainCerebellumLeft.lineTo(-17, -15);

        BrainCerebellumLeft.lineTo(-25, -15);
        BrainCerebellumLeft.moveTo(-25, -17);

        const cerebellumExtrudeSettings = {
            steps: 1,
            depth: 5.4, // 50% thinner
            bevelEnabled: true,
            bevelThickness: 1,
            bevelSize: 1,
            bevelOffset: -1,
            bevelSegments: 1
        };

        const geometryCerebellumRight = new THREE.ExtrudeGeometry(BrainCerebellumRight, cerebellumExtrudeSettings);
        const meshCerebellumRight = new THREE.Mesh(geometryCerebellumRight, cerebellumMaterial);

        const geometryCerebellumLeft = new THREE.ExtrudeGeometry(BrainCerebellumLeft, cerebellumExtrudeSettings);
        const meshCerebellumLeft = new THREE.Mesh(geometryCerebellumLeft, cerebellumMaterial);

        meshCerebellumRight.rotation.y = Math.PI / 180 * 90;
        meshCerebellumLeft.rotation.y = Math.PI / 180 * -90;

        meshCerebellumRight.position.x = 0;
        meshCerebellumRight.position.y = 0;
        meshCerebellumRight.position.z = 0;

        meshCerebellumLeft.position.x = 0;
        meshCerebellumLeft.position.y = 0;
        meshCerebellumLeft.position.z = 0;

        const brainCerebellumGroup = new THREE.Group();
        brainCerebellumGroup.add(meshCerebellumRight);
        brainCerebellumGroup.add(meshCerebellumLeft);

        brainParietalGroup.position.z = 14;
        brainParietalGroup.position.y = 10;
        brainFrontalGroup.position.z = 14;
        brainFrontalGroup.position.y = 10;
        brainOccipitalGroup.position.z = 14;
        brainOccipitalGroup.position.y = 10;
        brainTemporalGroup.position.z = 14;
        brainTemporalGroup.position.y = 10;
        brainCerebellumGroup.position.z = 14;
        brainCerebellumGroup.position.y = 10;

        this.brainGroup.add(brainParietalGroup);
        this.brainGroup.add(brainFrontalGroup);
        this.brainGroup.add(brainOccipitalGroup);
        this.brainGroup.add(brainTemporalGroup);
        this.brainGroup.add(brainCerebellumGroup);

        // Add Face Expressions
        this.face = new Face(this.experience); // <-- 2. Crea la nueva clase Face
        this.brainGroup.add(this.face.container); // <-- 3. Añade el contenedor de la cara // <-- Pasamos el tema

        // FIX: The model should not add itself to the scene.
        // The parent class (World.js) is responsible for this.
        // container.add(this.brainGroup);
    }
}
