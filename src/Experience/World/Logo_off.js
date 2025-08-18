import * as THREE from 'three';
import gsap from 'gsap';
import Experience from '../Experience.js';

export default class Logo {
    constructor(world) {
        this.experience = world.experience;
        this.resources = this.experience.resources;
        this.theme = this.experience.theme;
        
        // Obtenemos el modelo cargado desde el archivo .glb
        const loadedModel = this.resources.items.logoModel;

        // 1. Creamos un grupo limpio para nuestro logo
        this.logoGroup = new THREE.Group();

        // 2. Usamos traverse() para encontrar todas las mallas y transferirlas
        loadedModel.scene.traverse((child) => {
            if (child.isMesh) {
                this.logoGroup.add(child.clone());
            }
        });
        
        this.createCustomMaterials();
        this.setModelMaterials();
        this.playDirectionAnimation();
        
        // Escucharemos los cambios de tema para actualizar los shaders
        this.theme.on('update', () => this.updateMaterials());
    }

    createCustomMaterials() {
        // Definimos el shader que usaremos para todas las piezas con gradiente
        const finalGradientShader = {
            vertexShader: `
                varying vec2 vUv;
                void main() {
                    vUv = uv; // Pasamos las coordenadas UV al fragment shader
                    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                }
            `,
            fragmentShader: `
                uniform vec3 colorA;
                uniform vec3 colorB;
                uniform vec2 direction; // La "brújula" para nuestro gradiente
                uniform float offset; // <-- NUESTRO CONTROL DE OFFSET
                varying vec2 vUv;

                void main() {
                    // Proyectamos la coordenada UV sobre el vector de dirección
                    float mixValue = dot(vUv - offset, direction); 
                    vec3 finalColor = mix(colorA, colorB, mixValue);
                    gl_FragColor = vec4(finalColor, 1.0);
                }
            `
        };

        // Solo necesitamos un material de gradiente, ya que la inversión la hacemos en los UVs
        this.materials = {
            blackMat: new THREE.MeshBasicMaterial({ color: 0x000000 }),
            blueGradient: new THREE.ShaderMaterial({
                vertexShader: finalGradientShader.vertexShader,
                fragmentShader: finalGradientShader.fragmentShader,
                uniforms: {
                    colorA: { value: new THREE.Color('#3366CC') },
                    colorB: { value: new THREE.Color('#50E3C2') },
                    direction: { value: new THREE.Vector2(1, 1) },
                    offset: { value: -0.3 } 
                }
            }),
            fuchsiaGradient: new THREE.ShaderMaterial({
                vertexShader: finalGradientShader.vertexShader,
                fragmentShader: finalGradientShader.fragmentShader,
                uniforms: {
                    colorA: { value: new THREE.Color('#E4007C') }, // Naranja
                    colorB: { value: new THREE.Color('#FF8C00') }, // Fucsia/Rosa
                    direction: { value: new THREE.Vector2(1.2, 0) },  // Gradiente vertical por defecto
                    offset: { value: -0.5 }  // Control de offset
                }
            }),
            fuchsiaGradientVertical: new THREE.ShaderMaterial({
                vertexShader: finalGradientShader.vertexShader,
                fragmentShader: finalGradientShader.fragmentShader,
                uniforms: {
                    colorA: { value: new THREE.Color('#E4007C') },
                    colorB: { value: new THREE.Color('#FF8C00') },
                    direction: { value: new THREE.Vector2(0, 1) }, // Dirección Vertical
                    offset: { value: -0.5 }
                }
            })
        };
    }

    setModelMaterials() {
        this.logoGroup.traverse((child) => {
            if (child.isMesh) {
                console.log(child.name);
                // --- ASIGNAMOS LOS MATERIALES PRIMERO ---
                if (child.name === 'ContornoBase') {
                    child.material = this.materials.blackMat;
                } else if (child.name.includes('Azul')) {
                    child.material = this.materials.blueGradient;
                } else if (child.name === "RojoAbajo" || child.name === "Antenas" || child.name === "RojoCentro" || child.name === "Plane001") {
                    console.log("rojos verticales ", child.name);
                    child.material = this.materials.fuchsiaGradientVertical;
                } else if (child.name.includes('Rojo')) {
                    child.material = this.materials.fuchsiaGradient;
                } 

                // --- GENERAMOS EL MAPA DE COORDENADAS (UVs) CON LA LÓGICA DE ESPEJO ---
                child.geometry.computeBoundingBox();
                const boundingBox = child.geometry.boundingBox;
                const size = new THREE.Vector3();
                boundingBox.getSize(size);
                
                const uvs = [];
                const positions = child.geometry.attributes.position.array;
                for (let i = 0; i < positions.length; i += 3) {
                    let u = (positions[i] - boundingBox.min.x) / size.x;
                    const v = (positions[i + 1] - boundingBox.min.y) / size.y;

                    // Si la pieza es del lado derecho (contiene "Der"), volteamos la coordenada 'u'
                    if (child.name.includes('Der')) {
                        u = 1.0 - u;
                    }
                    
                    uvs.push(u, v);
                }
                child.geometry.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
            }
        });
    }

    playDirectionAnimation() {
        // Obtenemos todos los materiales que queremos animar
        const materialsToAnimate = [
            this.materials.blueGradient,
            this.materials.fuchsiaGradient,
            this.materials.fuchsiaGradientVertical
        ];

        if (materialsToAnimate.some(m => !m)) return; // Salir si alguno no existe

        // Usamos el primer material como referencia para los valores iniciales
        const animationProxy = {
            x: materialsToAnimate[0].uniforms.direction.value.x,
            y: materialsToAnimate[0].uniforms.direction.value.y
        };

        gsap.to(animationProxy, {
            x: 0.6,
            y: 0.6,
            duration: 2,
            ease: 'sine.inOut',
            yoyo: true,
            repeat: -1,
            onUpdate: () => {
                // Actualizamos la dirección en TODOS los materiales a la vez
                materialsToAnimate.forEach(material => {
                    material.uniforms.direction.value.x = animationProxy.x;
                    material.uniforms.direction.value.y = animationProxy.y;
                });
            }
        });
    }

    updateMaterials() {
        // Lógica futura para actualizar los colores del shader con el tema
    }
}