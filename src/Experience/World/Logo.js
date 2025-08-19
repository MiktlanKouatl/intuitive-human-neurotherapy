import * as THREE from "three";
import gsap from "gsap";
import Experience from "../Experience.js";

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
    //this.playDirectionAnimation();
    this.playGradientAnimation();

    // Escucharemos los cambios de tema para actualizar los shaders
    this.theme.on("update", () => this.updateMaterials());
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
            `,
    };

    // Solo necesitamos un material de gradiente, ya que la inversión la hacemos en los UVs
    this.materials = {
      blackMat: new THREE.MeshBasicMaterial({ color: 0x000000 }),
      blueGradient: new THREE.ShaderMaterial({
        vertexShader: finalGradientShader.vertexShader,
        fragmentShader: finalGradientShader.fragmentShader,
        uniforms: {
          colorA: { value: new THREE.Color("#3366CC") },
          colorB: { value: new THREE.Color("#50E3C2") },
          direction: { value: new THREE.Vector2(1, 0) },
          offset: { value: -0.2 },
        },
      }),
      fuchsiaGradient: new THREE.ShaderMaterial({
        vertexShader: finalGradientShader.vertexShader,
        fragmentShader: finalGradientShader.fragmentShader,
        uniforms: {
          colorA: { value: new THREE.Color("#E4007C") }, // Naranja
          colorB: { value: new THREE.Color("#FF8C00") }, // Fucsia/Rosa
          direction: { value: new THREE.Vector2(1.2, 0) }, // Gradiente vertical por defecto
          offset: { value: -0.5 }, // Control de offset
        },
      }),
      fuchsiaGradientVertical: new THREE.ShaderMaterial({
        vertexShader: finalGradientShader.vertexShader,
        fragmentShader: finalGradientShader.fragmentShader,
        uniforms: {
          colorA: { value: new THREE.Color("#E4007C") },
          colorB: { value: new THREE.Color("#FF8C00") },
          direction: { value: new THREE.Vector2(0, 1) }, // Dirección Vertical
          offset: { value: 0 },
        },
      }),
      radialGradient: new THREE.ShaderMaterial({
        vertexShader: finalGradientShader.vertexShader, // Reutilizamos el mismo vertex shader
        fragmentShader: `
                uniform vec3 colorA;
                uniform vec3 colorB;
                uniform vec2 uCenter; // Uniform para controlar el centro del círculo
                uniform float offset;
                varying vec2 vUv;

                void main() {
                    // Calculamos la distancia desde el píxel actual (vUv) al centro (uCenter)
                    float dist = distance(vUv, uCenter) - offset;

                    // Usamos smoothstep para un control más suave del borde del gradiente
                    // Mapea la distancia (de 0.0 a 0.5) al rango de mezcla (0.0 a 1.0)
                    float mixValue = smoothstep(0.0, 0.5, dist);

                    vec3 finalColor = mix(colorA, colorB, mixValue);
                    gl_FragColor = vec4(finalColor, 1.0);
                }
            `,
        uniforms: {
          colorA: { value: new THREE.Color("#f5f4c9") }, // Color del centro (blanco).  f5f4c9
          colorB: { value: new THREE.Color("#fff200") }, // Color del borde (amarillo). fff200
          uCenter: { value: new THREE.Vector2(0.5, 0.5) }, // Centro del gradiente
          offset: { value: 0 },
        },
      }),
    };
    this.materials.blueGradient.animationBounds = { start: -0.2, end: 0 };
    this.materials.fuchsiaGradient.animationBounds = { start: -0.5, end: 0.2 };
    this.materials.fuchsiaGradientVertical.animationBounds = {
      start: -0.3,
      end: 0.3,
    };
    this.materials.radialGradient.animationBounds = { start: 0.1, end: -0.3 };
  }

  setModelMaterials() {
    this.logoGroup.traverse((child) => {
      if (child.isMesh) {
        console.log(child.name);
        // --- ASIGNAMOS LOS MATERIALES PRIMERO ---
        if (child.name === "ContornoBase") {
          child.material = this.materials.blackMat;
          //child.material.transparent = true;
          //child.material.opacity = 0; // Ajustamos la opacidad
        } else if (child.name.includes("Azul")) {
          child.material = this.materials.blueGradient;
        } else if (
          child.name === "RojoAbajo" ||
          child.name === "Antenas" ||
          child.name === "RojoCentro" ||
          child.name === "Plane017" ||
          child.name === "Plane017_1"
        ) {
          console.log("rojos verticales ", child.name);
          child.material = this.materials.fuchsiaGradientVertical;
        } else if (child.name.includes("Rojo")) {
          child.material = this.materials.fuchsiaGradient;
        } else if (
          child.name === "AmarilloCentro" ||
          child.name == "Plane003" ||
          child.name == "Plane003_1" ||
          child.name == "Ojos"
        ) {
          child.material = this.materials.radialGradient;
        }

        // --- GENERAMOS EL MAPA DE COORDENADAS (UVs) DE FORMA MÁS ROBUSTA ---
        child.geometry.computeBoundingBox();
        child.geometry.computeVertexNormals(); // Asegurarnos de que las normales estén calculadas

        const boundingBox = child.geometry.boundingBox;
        const size = new THREE.Vector3();
        boundingBox.getSize(size);

        const positions = child.geometry.attributes.position.array;
        const normals = child.geometry.attributes.normal.array; // Obtenemos las normales
        const uvs = [];

        for (let i = 0; i < positions.length; i += 3) {
          const nx = Math.abs(normals[i]);
          const ny = Math.abs(normals[i + 1]);
          const nz = Math.abs(normals[i + 2]);

          let u, v;

          // Proyectamos según la dirección principal de la normal de la cara
          // Esto es mucho más robusto para las paredes de los huecos
          if (nz > nx && nz > ny) {
            // La cara mira principalmente hacia adelante/atrás (eje Z)
            u = (positions[i] - boundingBox.min.x) / size.x;
            v = (positions[i + 1] - boundingBox.min.y) / size.y;
          } else if (nx > ny && nx > nz) {
            // La cara mira principalmente hacia los lados (eje X)
            u = (positions[i + 2] - boundingBox.min.z) / size.z;
            v = (positions[i + 1] - boundingBox.min.y) / size.y;
          } else {
            // La cara mira principalmente hacia arriba/abajo (eje Y)
            u = (positions[i] - boundingBox.min.x) / size.x;
            v = (positions[i + 2] - boundingBox.min.z) / size.z;
          }

          // Lógica de espejo (se mantiene igual)
          if (child.name.includes("Der")) {
            u = 1.0 - u;
          }

          uvs.push(u, v);
        }
        child.geometry.setAttribute(
          "uv",
          new THREE.Float32BufferAttribute(uvs, 2)
        );
      }
    });
  }

  playDirectionAnimation() {
    // Obtenemos todos los materiales que queremos animar
    const materialsToAnimate = [
      this.materials.blueGradient,
      this.materials.fuchsiaGradient,
      //this.materials.fuchsiaGradientVertical
    ];

    if (materialsToAnimate.some((m) => !m)) return; // Salir si alguno no existe

    // Usamos el primer material como referencia para los valores iniciales
    const animationProxy = {
      x: materialsToAnimate[0].uniforms.direction.value.x,
      y: materialsToAnimate[0].uniforms.direction.value.y,
    };

    gsap.to(animationProxy, {
      x: 0.6,
      y: 0.6,
      duration: 2,
      ease: "sine.inOut",
      yoyo: true,
      repeat: -1,
      onUpdate: () => {
        // Actualizamos la dirección en TODOS los materiales a la vez
        materialsToAnimate.forEach((material) => {
          material.uniforms.direction.value.x = animationProxy.x;
          material.uniforms.direction.value.y = animationProxy.y;
        });
      },
    });
  }

  playGradientAnimation() {
    // Ahora podemos incluir todos los materiales, ¡incluso el vertical!
    const materialsToAnimate = [
      this.materials.blueGradient,
      this.materials.fuchsiaGradient,
      this.materials.fuchsiaGradientVertical,
      this.materials.radialGradient,
    ];
    materialsToAnimate.forEach((material) => {
      if (!material || !material.animationBounds) return; // Salir si el material o sus límites no existen

      // Creamos un proxy para CADA animación
      const animationProxy = {
        value: material.animationBounds.start,
      };

      gsap.to(animationProxy, {
        value: material.animationBounds.end, // Animar hacia su valor final único
        duration: 1, //Math.random() * 2 + 2, // Duración aleatoria para un efecto más orgánico
        ease: "power1.inOut",
        yoyo: true,
        repeat: -1,
        onUpdate: () => {
          // El onUpdate solo afecta al 'offset' de su propio material
          material.uniforms.offset.value = animationProxy.value;
        },
      });
    });
  }

  updateMaterials() {
    // Lógica futura para actualizar los colores del shader con el tema
  }
}
