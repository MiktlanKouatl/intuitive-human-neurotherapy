import * as THREE from 'three';
import Experience from './Experience.js';

export default class Renderer {
    constructor(experience) {
        this.experience = experience;
        this.canvas = this.experience.canvas;
        this.sizes = this.experience.sizes;
        this.scene = this.experience.scene;
        this.camera = this.experience.camera;
        this.theme = this.experience.theme;

        this.setInstance();

        this.theme.on("update", () => {
            this.updateBackgroundColor();
        });
    }

    setInstance() {
        this.instance = new THREE.WebGLRenderer({
            canvas: this.canvas,
            antialias: true,
        });
        this.instance.physicallyCorrectLights = true;
        this.instance.outputEncoding = THREE.sRGBEncoding;
        this.instance.toneMapping = THREE.CineonToneMapping;
        this.instance.toneMappingExposure = 1.75;
        this.instance.shadowMap.enabled = true;
        this.instance.shadowMap.type = THREE.PCFSoftShadowMap;
        this.instance.setClearColor('#211d20');//211d20
        this.instance.setSize(this.sizes.width, this.sizes.height);
        this.instance.setPixelRatio(this.sizes.pixelRatio);
    }
    updateBackgroundColor() {
        this.instance.setClearColor(this.theme.liveColors.background);
    }
    resize() {
        this.instance.setSize(this.sizes.width, this.sizes.height);
        this.instance.setPixelRatio(this.sizes.pixelRatio);
    }

    update() {
        //console.log('Renderer update');
        this.instance.render(this.scene, this.camera.instance);
    }
}
