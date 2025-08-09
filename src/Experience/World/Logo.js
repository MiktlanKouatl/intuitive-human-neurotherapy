import * as THREE from 'three';
import { SVGLoader } from 'three/examples/jsm/loaders/SVGLoader.js';
import { Text } from 'troika-three-text';

export default class Logo {
    constructor(world) {
        this.experience = world.experience;
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;
        this.theme = this.experience.theme;

        // Assets necesarios: el SVG para la extrusión y la textura
        this.logoSvgData = this.resources.items.logoSVG;
        this.logoTexture = this.resources.items.logoTexture;

        this.logoGroup = new THREE.Group();
        
        this.setModel(); // Crea la parte visual del SVG
        this.createText(); // Crea el texto con Troika

        this.theme.on("update", () => this.updateColor());
    }

    setModel() {
        const visualsGroup = new THREE.Group();
        const paths = this.logoSvgData.paths;
        const extrudeSettings = { depth: 20, bevelEnabled: false };
        this.material = new THREE.MeshBasicMaterial({ color: this.theme.liveColors.line });

        for (const path of paths) {
            const shapes = SVGLoader.createShapes(path);
            for (const shape of shapes) {
                const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
                geometry.center();
                const mesh = new THREE.Mesh(geometry, this.material);
                visualsGroup.add(mesh);
            }
        }

        // Aplicamos la textura por separado
        const texturePlane = new THREE.Mesh(
            new THREE.PlaneGeometry(800, 800),
            new THREE.MeshBasicMaterial({ map: this.logoTexture, transparent: true })
        );
        texturePlane.position.z = 10.5;
        texturePlane.scale.y = -0.85;
        visualsGroup.add(texturePlane);

        visualsGroup.rotation.z = Math.PI;
        visualsGroup.scale.set(0.1, 0.1, 0.2);
        this.logoGroup.add(visualsGroup);
        this.logoGroup.position.set(0, 10, 0);
        this.logoGroup.rotation.set(0, 0, 0);
    }

    createText() {
        this.textGroup = new THREE.Group();
        
        // --- Creamos el texto con Troika ---
        this.text1 = new Text();
        this.text1.text = "INTUITIVE HUMAN";
        this.text1.font = '/fonts/skia.ttf'; // Ruta a la fuente TTF/WOFF
        this.text1.fontSize = 8;
        this.text1.anchorX = 'center';
        this.text1.position.y = -35;
        this.text1.color = this.theme.liveColors.logoTextColor;
        
        this.text2 = new Text();
        this.text2.text = "NEUROTHERAPY";
        this.text2.font = '/fonts/skia.ttf';
        this.text2.fontSize = 8;
        this.text2.anchorX = 'center';
        this.text2.position.y = -43;
        this.text2.color = this.theme.liveColors.logoTextColor;

        this.textGroup.add(this.text1, this.text2);
        this.logoGroup.add(this.textGroup);
        
        // Sincronizamos ambos textos para que se rendericen
        this.text1.sync();
        this.text2.sync();
    }

    updateColor() {
        const newColor = this.theme.liveColors.line;
        const newTextColor = this.theme.liveColors.logoTextColor;
        if (this.material) {
            this.material.color.set(newColor);
        }
        // Actualizamos el color de los textos de Troika
        if (this.text1) this.text1.color = newTextColor;
        if (this.text2) this.text2.color = newTextColor;
    }

    update() {
        // ...
    }
}