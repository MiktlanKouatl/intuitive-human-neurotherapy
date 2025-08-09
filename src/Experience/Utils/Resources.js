import * as THREE from 'three';
import { SVGLoader } from 'three/examples/jsm/loaders/SVGLoader.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import EventEmitter from './EventEmitter.js';

export default class Resources extends EventEmitter {
    constructor(sources) {
        super();

        this.sources = sources;

        this.items = {};
        this.toLoad = this.sources.length;
        this.loaded = 0;

        this.setLoaders();
        this.startLoading();
    }

    setLoaders() {
        this.loaders = {};
        this.loaders.gltfLoader = new GLTFLoader();
        this.loaders.textureLoader = new THREE.TextureLoader();
        this.loaders.cubeTextureLoader = new THREE.CubeTextureLoader();

        this.loaders.svgLoader = new SVGLoader(); 
    }

    startLoading() {
        if(this.toLoad === 0) {
            setTimeout(() => {
                this.trigger('ready');
            }, 0);
            return;
        }
        
        for (const source of this.sources) {
            if (source.type === 'gltfModel') {
                this.loaders.gltfLoader.load(
                    source.path,
                    (file) => {
                        this.sourceLoaded(source, file);
                    }
                );
            } else if (source.type === 'texture') {
                this.loaders.textureLoader.load(
                    source.path,
                    (file) => {
                        this.sourceLoaded(source, file);
                    }
                );
            }
            if (source.type === 'svg') {
                this.loaders.svgLoader.load(source.path, (data) => {
                    this.sourceLoaded(source, data);
                });
            }
        }
    }

    sourceLoaded(source, file) {
        this.items[source.name] = file;
        this.loaded++;

        const progressRatio = this.loaded / this.toLoad;
        this.trigger('progress', [progressRatio]);

        if (this.loaded === this.toLoad) {
            this.trigger('ready');
        }
    }
}
