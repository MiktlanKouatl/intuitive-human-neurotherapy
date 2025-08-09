import * as THREE from "three";
import Experience from "../Experience.js";
import CustomVector3 from "../Utils/CustomVector3.js";

export default class BrainGrid {
    constructor(world) {
        this.world = world; // Acepta la instancia de World
        this.experience = this.world.experience;
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;
        this.theme = this.experience.theme;

        // 1. Inicializa el array donde se guardarán los puntos.
        this.gridPoints = [];

        // 2. Inicializa el objeto para los puntos que se desactivarán.
        this.disablePointsScreen02 = {};

        // 3. Crea el contenedor 3D para la rejilla.
        this.container3d = new THREE.Object3D();
        this.container3d.name = "BrainGrid";
        
        // 4. Llama a initGrid() para llenar el array this.gridPoints.
        this.initGrid();
        this.createVisualPoints();
        this.scene.add(this.container3d);

        this.theme.on('update', () => {
            this.updatePointsColor();
        });

    }
    createVisualPoints() {
        // 1. Crear una única geometría que contendrá todos los puntos.
        const geometry = new THREE.BufferGeometry();
        // 2. Establecer los vértices de la geometría a partir de nuestro array de puntos.
        geometry.setFromPoints(this.gridPoints);
        // 3. Crear un único material para todos los puntos.
        this.pointsMaterial = new THREE.PointsMaterial({
            color: this.theme.liveColors.line,
            size: 1.5, // Puedes ajustar el tamaño de los puntos
            sizeAttenuation: false, // Hace que los puntos lejanos se vean más pequeños
        });
        // 4. Crear el objeto THREE.Points.
        this.points = new THREE.Points(geometry, this.pointsMaterial);
        // 5. Añadir el objeto único al contenedor.
        this.container3d.add(this.points);
    }

    updatePointsColor() {
        // Simplemente actualizamos el color del material único.
        this.pointsMaterial.color.set(this.theme.liveColors.line);
    }

    activePointsScreen02(occupied) {
        for (const key in this.disablePointsScreen02) {
            if (Array.isArray(this.disablePointsScreen02[key])) {
                this.disablePointsScreen02[key].forEach(point => {
                    point.occupied = occupied;
                    point.locked = occupied;
                });
            }
        }
    }
    initGrid() {

        ///////////////////
        /* Borde Derecho Extrude Line 0*/
        ///////////////////

        //                                       x,     y,    z
        this.gridPoints.push(new CustomVector3(9.5, 1, -13.8, "ExtrudeLine", 0, 0)); // esquina amarilla atras rosa > amarillo
        this.gridPoints.push(new CustomVector3(9.5, 2.6, -13.5, "ExtrudeLine", 0, 1));
        this.gridPoints.push(new CustomVector3(9.5, 4.2, -13.2, "ExtrudeLine", 0, 2));
        this.gridPoints.push(new CustomVector3(9.5, 5.7, -12.8, "ExtrudeLine", 0, 3)); // esquina atras arriba amarilla
        this.gridPoints.push(new CustomVector3(9.5, 6.5, -11.6, "ExtrudeLine", 0, 4));
        this.gridPoints.push(new CustomVector3(9.5, 7.3, -10.2, "ExtrudeLine", 0, 5));
        this.gridPoints.push(new CustomVector3(9.5, 8.1, -8.8, "ExtrudeLine", 0, 6));
        this.gridPoints.push(new CustomVector3(9.5, 8.9, -7.5, "ExtrudeLine", 0, 7));
        this.gridPoints.push(new CustomVector3(9.5, 9.7, -6, "ExtrudeLine", 0, 8)); // esquina amarilla arriba
        this.gridPoints.push(new CustomVector3(9.5, 9.7, -4.4, "ExtrudeLine", 0, 9));
        this.gridPoints.push(new CustomVector3(9.5, 9.7, -2.8, "ExtrudeLine", 0, 10));
        this.gridPoints.push(new CustomVector3(9.5, 9.7, -1.2, "ExtrudeLine", 0, 11));
        this.gridPoints.push(new CustomVector3(9.5, 9.7, 0, "ExtrudeLine", 0, 12)); // borde amarillo > azul
        this.gridPoints.push(new CustomVector3(9.5, 9.7, 1.6, "ExtrudeLine", 0, 13));
        this.gridPoints.push(new CustomVector3(9.5, 9.7, 3.2, "ExtrudeLine", 0, 14));
        this.gridPoints.push(new CustomVector3(9.5, 9.7, 4.8, "ExtrudeLine", 0, 15));
        this.gridPoints.push(new CustomVector3(9.5, 9.7, 6.4, "ExtrudeLine", 0, 16));
        this.gridPoints.push(new CustomVector3(9.5, 9.7, 8, "ExtrudeLine", 0, 17)); // Esquina arriba azul
        this.gridPoints.push(new CustomVector3(9.5, 8.7, 9.6, "ExtrudeLine", 0, 18));
        this.gridPoints.push(new CustomVector3(9.5, 7.8, 11, "ExtrudeLine", 0, 19));
        this.gridPoints.push(new CustomVector3(9.5, 6.7, 12.5, "ExtrudeLine", 0, 20));
        this.gridPoints.push(new CustomVector3(9.5, 5.8, 13.7, "ExtrudeLine", 0, 21)); // Esquina frente arriba azul
        this.gridPoints.push(new CustomVector3(9.5, 4.6, 14, "ExtrudeLine", 0, 22));
        this.gridPoints.push(new CustomVector3(9.5, 3.3, 14.4, "ExtrudeLine", 0, 23));
        this.gridPoints.push(new CustomVector3(9.5, 2.1, 14.8, "ExtrudeLine", 0, 24)); // Esquina frente azul
        this.gridPoints.push(new CustomVector3(9.5, 0.7, 14.4, "ExtrudeLine", 0, 25));
        this.gridPoints.push(new CustomVector3(9.5, -0.7, 14, "ExtrudeLine", 0, 26));
        this.gridPoints.push(new CustomVector3(9.5, -2.1, 13.5, "ExtrudeLine", 0, 27));
        this.gridPoints.push(new CustomVector3(9.5, -3.5, 13.1, "ExtrudeLine", 0, 28));
        this.gridPoints.push(new CustomVector3(9.5, -4.7, 12.7, "ExtrudeLine", 0, 29)); // esquina abajo azul
        this.gridPoints.push(new CustomVector3(9.5, -4.7, 11.5, "ExtrudeLine", 0, 30));
        this.gridPoints.push(new CustomVector3(9.5, -4.7, 10.2, "ExtrudeLine", 0, 31));
        this.gridPoints.push(new CustomVector3(9.5, -4.7, 8.9, "ExtrudeLine", 0, 32)); // borde abajo azul > rojo
        this.gridPoints.push(new CustomVector3(9.5, -4.7, 7.2, "ExtrudeLine", 0, 33));
        this.gridPoints.push(new CustomVector3(9.5, -4.7, 5.6, "ExtrudeLine", 0, 34));
        this.gridPoints.push(new CustomVector3(9.5, -4.7, 4, "ExtrudeLine", 0, 35));
        this.gridPoints.push(new CustomVector3(9.5, -4.7, 2.4, "ExtrudeLine", 0, 36));
        this.gridPoints.push(new CustomVector3(9.5, -4.7, 0.7, "ExtrudeLine", 0, 37));
        this.gridPoints.push(new CustomVector3(9.5, -4.7, -1.2, "ExtrudeLine", 0, 38)); // esquina abajo rojo
        this.gridPoints.push(new CustomVector3(9.5, -5.7, -2.2, "ExtrudeLine", 0, 39));
        this.gridPoints.push(new CustomVector3(9.5, -6.7, -3.1, "ExtrudeLine", 0, 40)); // esquina abajo rojo
        this.gridPoints.push(new CustomVector3(9.5, -6.7, -4.5, "ExtrudeLine", 0, 41));
        this.gridPoints.push(new CustomVector3(9.5, -6.7, -6, "ExtrudeLine", 0, 42)); // esquina abajo atras rojo > rosa
        this.gridPoints.push(new CustomVector3(9.5, -6.7, -7.7, "ExtrudeLine", 0, 43));
        this.gridPoints.push(new CustomVector3(9.5, -6.7, -9.4, "ExtrudeLine", 0, 44));
        this.gridPoints.push(new CustomVector3(9.5, -6.7, -10.8, "ExtrudeLine", 0, 45)); // esquina abajo atras rosa
        this.gridPoints.push(new CustomVector3(9.5, -5.5, -11.8, "ExtrudeLine", 0, 46));
        this.gridPoints.push(new CustomVector3(9.5, -4.2, -12.8, "ExtrudeLine", 0, 47));
        this.gridPoints.push(new CustomVector3(9.5, -3, -13.6, "ExtrudeLine", 0, 48)); // esquina atras rosa
        this.gridPoints.push(new CustomVector3(9.5, -1.5, -13.8, "ExtrudeLine", 0, 49));
        this.gridPoints.push(new CustomVector3(9.5, 0, -13.8, "ExtrudeLine", 0, 50));

        /////////////////////
        /* extrude Line 1 */
        /////////////////////

        //                                  x,     y,    z
        this.gridPoints.push(new CustomVector3(8.5, 1, -14.1, "ExtrudeLine", 1, 0)); //esquina amarilla atras rosa > amarillo
        this.gridPoints.push(new CustomVector3(8.5, 2.7, -13.8, "ExtrudeLine", 1, 1));
        this.gridPoints.push(new CustomVector3(8.5, 4.3, -13.5, "ExtrudeLine", 1, 2));
        this.gridPoints.push(new CustomVector3(8.5, 5.9, -13.1, "ExtrudeLine", 1, 3)); //esquina atras arriba amarilla
        this.gridPoints.push(new CustomVector3(8.5, 6.8, -11.9, "ExtrudeLine", 1, 4));
        this.gridPoints.push(new CustomVector3(8.5, 7.6, -10.5, "ExtrudeLine", 1, 5));
        this.gridPoints.push(new CustomVector3(8.5, 8.5, -8.9, "ExtrudeLine", 1, 6));
        this.gridPoints.push(new CustomVector3(8.5, 9.3, -7.5, "ExtrudeLine", 1, 7));
        this.gridPoints.push(new CustomVector3(8.5, 10.1, -6, "ExtrudeLine", 1, 8)); // esquina amarilla arriba
        this.gridPoints.push(new CustomVector3(8.5, 10.1, -4.4, "ExtrudeLine", 1, 9));
        this.gridPoints.push(new CustomVector3(8.5, 10.1, -2.8, "ExtrudeLine", 1, 10));
        this.gridPoints.push(new CustomVector3(8.5, 10.1, -1.2, "ExtrudeLine", 1, 11));
        this.gridPoints.push(new CustomVector3(8.5, 10.1, 0, "ExtrudeLine", 1, 12)); /// borde amarillo > azul
        this.gridPoints.push(new CustomVector3(8.5, 10.1, 1.6, "ExtrudeLine", 1, 13));
        this.gridPoints.push(new CustomVector3(8.5, 10.1, 3.2, "ExtrudeLine", 1, 14));
        this.gridPoints.push(new CustomVector3(8.5, 10.1, 4.8, "ExtrudeLine", 1, 15));
        this.gridPoints.push(new CustomVector3(8.5, 10.1, 6.4, "ExtrudeLine", 1, 16));
        this.gridPoints.push(new CustomVector3(8.5, 10.1, 8, "ExtrudeLine", 1, 17)); /// Esquina arriba azul
        this.gridPoints.push(new CustomVector3(8.5, 9.1, 9.6, "ExtrudeLine", 1, 18));
        this.gridPoints.push(new CustomVector3(8.5, 8, 11.2, "ExtrudeLine", 1, 19));
        this.gridPoints.push(new CustomVector3(8.5, 7, 12.7, "ExtrudeLine", 1, 20));
        this.gridPoints.push(new CustomVector3(8.5, 6, 14.1, "ExtrudeLine", 1, 21)); /// Esquina frente arriba azul
        this.gridPoints.push(new CustomVector3(8.5, 4.8, 14.4, "ExtrudeLine", 1, 22));
        this.gridPoints.push(new CustomVector3(8.5, 3.1, 14.8, "ExtrudeLine", 1, 23));
        this.gridPoints.push(new CustomVector3(8.5, 2, 15.1, "ExtrudeLine", 1, 24)); /// Esquina frente azul
        this.gridPoints.push(new CustomVector3(8.5, 0.6, 14.8, "ExtrudeLine", 1, 25));
        this.gridPoints.push(new CustomVector3(8.5, -0.8, 14.4, "ExtrudeLine", 1, 26));
        this.gridPoints.push(new CustomVector3(8.5, -2.3, 13.9, "ExtrudeLine", 1, 27));
        this.gridPoints.push(new CustomVector3(8.5, -3.7, 13.5, "ExtrudeLine", 1, 28));
        this.gridPoints.push(new CustomVector3(8.5, -5, 13.1, "ExtrudeLine", 1, 29)); // esquina abajo azul
        this.gridPoints.push(new CustomVector3(8.5, -5.1, 11.5, "ExtrudeLine", 1, 30));
        this.gridPoints.push(new CustomVector3(8.5, -5.1, 10.2, "ExtrudeLine", 1, 31));
        this.gridPoints.push(new CustomVector3(8.5, -5.1, 8.9, "ExtrudeLine", 1, 32)); // borde abajo azul > rojo
        this.gridPoints.push(new CustomVector3(8.5, -5.1, 7.3, "ExtrudeLine", 1, 33));
        this.gridPoints.push(new CustomVector3(8.5, -5.1, 5.7, "ExtrudeLine", 1, 34));
        this.gridPoints.push(new CustomVector3(8.5, -5.1, 4.1, "ExtrudeLine", 1, 35));
        this.gridPoints.push(new CustomVector3(8.5, -5.1, 2.5, "ExtrudeLine", 1, 36));
        this.gridPoints.push(new CustomVector3(8.5, -5.1, 0.8, "ExtrudeLine", 1, 37));
        this.gridPoints.push(new CustomVector3(8.5, -5.1, -0.9, "ExtrudeLine", 1, 38)); // esquina abajo rojo
        this.gridPoints.push(new CustomVector3(8.5, -6.1, -1.9, "ExtrudeLine", 1, 39));
        this.gridPoints.push(new CustomVector3(8.5, -7.1, -3, "ExtrudeLine", 1, 40)); // esquina abajo rojo
        this.gridPoints.push(new CustomVector3(8.5, -7.1, -4.5, "ExtrudeLine", 1, 41));
        this.gridPoints.push(new CustomVector3(8.5, -7.1, -6, "ExtrudeLine", 1, 42)); // esquina abajo atras rojo > rosa
        this.gridPoints.push(new CustomVector3(8.5, -7.1, -7.7, "ExtrudeLine", 1, 43));
        this.gridPoints.push(new CustomVector3(8.5, -7.1, -9.4, "ExtrudeLine", 1, 44));
        this.gridPoints.push(new CustomVector3(8.5, -7.1, -10.8, "ExtrudeLine", 1, 45)); // esquina abajo atras rosa
        this.gridPoints.push(new CustomVector3(8.5, -5.7, -12.1, "ExtrudeLine", 1, 46));
        this.gridPoints.push(new CustomVector3(8.5, -4.3, -13.2, "ExtrudeLine", 1, 47));
        this.gridPoints.push(new CustomVector3(8.5, -3, -14.1, "ExtrudeLine", 1, 48)); // esquina atras rosa
        this.gridPoints.push(new CustomVector3(8.5, -1.5, -14.1, "ExtrudeLine", 1, 49));
        this.gridPoints.push(new CustomVector3(8.5, 0, -14.1, "ExtrudeLine", 1, 50));

        /////////////////////
        /* Linea 2 extrude */
        /////////////////////

        //                                  x,     y,    z
        this.gridPoints.push(new CustomVector3(7.5, 1, -14.1, "ExtrudeLine", 2, 0)); //esquina amarilla atras rosa > amarillo
        this.gridPoints.push(new CustomVector3(7.5, 2.7, -13.8, "ExtrudeLine", 2, 1));
        this.gridPoints.push(new CustomVector3(7.5, 4.3, -13.5, "ExtrudeLine", 2, 2));
        this.gridPoints.push(new CustomVector3(7.5, 5.9, -13.1, "ExtrudeLine", 2, 3)); //esquina atras arriba amarilla
        this.gridPoints.push(new CustomVector3(7.5, 6.8, -11.9, "ExtrudeLine", 2, 4));
        this.gridPoints.push(new CustomVector3(7.5, 7.6, -10.5, "ExtrudeLine", 2, 5));
        this.gridPoints.push(new CustomVector3(7.5, 8.5, -8.9, "ExtrudeLine", 2, 6));
        this.gridPoints.push(new CustomVector3(7.5, 9.3, -7.5, "ExtrudeLine", 2, 7));
        this.gridPoints.push(new CustomVector3(7.5, 10.1, -6, "ExtrudeLine", 2, 8)); // esquina amarilla arriba
        this.gridPoints.push(new CustomVector3(7.5, 10.1, -4.4, "ExtrudeLine", 2, 9));
        this.gridPoints.push(new CustomVector3(7.5, 10.1, -2.8, "ExtrudeLine", 2, 10));
        this.gridPoints.push(new CustomVector3(7.5, 10.1, -1.2, "ExtrudeLine", 2, 11));
        this.gridPoints.push(new CustomVector3(7.5, 10.1, 0, "ExtrudeLine", 2, 12)); /// borde amarillo > azul
        this.gridPoints.push(new CustomVector3(7.5, 10.1, 1.6, "ExtrudeLine", 2, 13));
        this.gridPoints.push(new CustomVector3(7.5, 10.1, 3.2, "ExtrudeLine", 2, 14));
        this.gridPoints.push(new CustomVector3(7.5, 10.1, 4.8, "ExtrudeLine", 2, 15));
        this.gridPoints.push(new CustomVector3(7.5, 10.1, 6.4, "ExtrudeLine", 2, 16));
        this.gridPoints.push(new CustomVector3(7.5, 10.1, 8, "ExtrudeLine", 2, 17)); /// Esquina arriba azul
        this.gridPoints.push(new CustomVector3(7.5, 9.1, 9.6, "ExtrudeLine", 2, 18));
        this.gridPoints.push(new CustomVector3(7.5, 8, 11.2, "ExtrudeLine", 2, 19));
        this.gridPoints.push(new CustomVector3(7.5, 7, 12.7, "ExtrudeLine", 2, 20));
        this.gridPoints.push(new CustomVector3(7.5, 6, 14.1, "ExtrudeLine", 2, 21)); /// Esquina frente arriba azul
        this.gridPoints.push(new CustomVector3(7.5, 4.8, 14.4, "ExtrudeLine", 2, 22));
        this.gridPoints.push(new CustomVector3(7.5, 3.1, 14.8, "ExtrudeLine", 2, 23));
        this.gridPoints.push(new CustomVector3(7.5, 2, 15.1, "ExtrudeLine", 2, 24)); /// Esquina frente azul
        this.gridPoints.push(new CustomVector3(7.5, 0.6, 14.8, "ExtrudeLine", 2, 25));
        this.gridPoints.push(new CustomVector3(7.5, -0.8, 14.4, "ExtrudeLine", 2, 26));
        this.gridPoints.push(new CustomVector3(7.5, -2.3, 13.9, "ExtrudeLine", 2, 27));
        this.gridPoints.push(new CustomVector3(7.5, -3.7, 13.5, "ExtrudeLine", 2, 28));
        this.gridPoints.push(new CustomVector3(7.5, -5, 13.1, "ExtrudeLine", 2, 29)); // esquina abajo azul
        this.gridPoints.push(new CustomVector3(7.5, -5.1, 11.5, "ExtrudeLine", 2, 30));
        this.gridPoints.push(new CustomVector3(7.5, -5.1, 10.2, "ExtrudeLine", 2, 31));
        this.gridPoints.push(new CustomVector3(7.5, -5.1, 8.9, "ExtrudeLine", 2, 32)); // borde abajo azul > rojo
        this.gridPoints.push(new CustomVector3(7.5, -5.1, 7.3, "ExtrudeLine", 2, 33));
        this.gridPoints.push(new CustomVector3(7.5, -5.1, 5.7, "ExtrudeLine", 2, 34));
        this.gridPoints.push(new CustomVector3(7.5, -5.1, 4.1, "ExtrudeLine", 2, 35));
        this.gridPoints.push(new CustomVector3(7.5, -5.1, 2.5, "ExtrudeLine", 2, 36));

        // Back UP
        /* this.gridPoints.push(new CustomVector3(7.5, -5.1, 0.8, "ExtrudeLine", 2, 37));
        this.gridPoints.push(new CustomVector3(7.5, -5.1, -0.9, "ExtrudeLine", 2, 38)); // esquina abajo rojo
        this.gridPoints.push(new CustomVector3(7.5, -6.1, -1.9, "ExtrudeLine", 2, 39));
        this.gridPoints.push(new CustomVector3(7.5, -7.1, -3, "ExtrudeLine", 2, 40)); // esquina abajo rojo
        this.gridPoints.push(new CustomVector3(7.5, -7.1, -4.5, "ExtrudeLine", 2, 41));
        this.gridPoints.push(new CustomVector3(7.5, -7.1, -6, "ExtrudeLine", 2, 42)); // esquina abajo atras rojo > rosa
        this.gridPoints.push(new CustomVector3(7.5, -7.1, -7.7, "ExtrudeLine", 2, 43));
        this.gridPoints.push(new CustomVector3(7.5, -7.1, -9.4, "ExtrudeLine", 2, 44));
        this.gridPoints.push(new CustomVector3(7.5, -7.1, -10.8, "ExtrudeLine", 2, 45)); // esquina abajo atras rosa */

        //////////////////////////////////
        // Puntos ajustados al cerebelo //
        //////////////////////////////////

        this.gridPoints.push(new CustomVector3(7.5, -5.1, 0.8, "ExtrudeLine", 2, 37));
        this.gridPoints.push(new CustomVector3(6.5, -5.1, -0.9, "ExtrudeLine", 2, 38)); // esquina abajo rojo
        this.gridPoints.push(new CustomVector3(6.5, -6.1, -1.9, "ExtrudeLine", 2, 39));
        this.gridPoints.push(new CustomVector3(6.5, -7.1, -3, "ExtrudeLine", 2, 40)); // esquina abajo rojo
        this.gridPoints.push(new CustomVector3(6.5, -7.1, -4.5, "ExtrudeLine", 2, 41));
        this.gridPoints.push(new CustomVector3(6.5, -7.1, -6, "ExtrudeLine", 2, 42)); // esquina abajo atras rojo > rosa
        this.gridPoints.push(new CustomVector3(6.5, -7.1, -7.2, "ExtrudeLine", 2, 43));
        this.gridPoints.push(new CustomVector3(7.5, -7.1, -8.4, "ExtrudeLine", 2, 44));
        this.gridPoints.push(new CustomVector3(7.5, -7.1, -10.8, "ExtrudeLine", 2, 45)); // esquina abajo atras rosa

        //////////////////////////////////
        // Puntos ajustados al cerebelo //
        //////////////////////////////////

        this.gridPoints.push(new CustomVector3(7.5, -5.7, -12.1, "ExtrudeLine", 2, 46));
        this.gridPoints.push(new CustomVector3(7.5, -4.3, -13.2, "ExtrudeLine", 2, 47));
        this.gridPoints.push(new CustomVector3(7.5, -3, -14.1, "ExtrudeLine", 2, 48)); // esquina atras rosa
        this.gridPoints.push(new CustomVector3(7.5, -1.5, -14.1, "ExtrudeLine", 2, 49));
        this.gridPoints.push(new CustomVector3(7.5, 0, -14.1, "ExtrudeLine", 2, 50));

        /////////////////////
        /* Linea 3 extrude */
        /////////////////////

        //                                  x,     y,    z
        this.gridPoints.push(new CustomVector3(6.5, 1, -14.1, "ExtrudeLine", 3, 0)); //esquina amarilla atras rosa > amarillo
        this.gridPoints.push(new CustomVector3(6.5, 2.7, -13.8, "ExtrudeLine", 3, 1));
        this.gridPoints.push(new CustomVector3(6.5, 4.3, -13.5, "ExtrudeLine", 3, 2));
        this.gridPoints.push(new CustomVector3(6.5, 5.9, -13.1, "ExtrudeLine", 3, 3)); //esquina atras arriba amarilla
        this.gridPoints.push(new CustomVector3(6.5, 6.8, -11.9, "ExtrudeLine", 3, 4));
        this.gridPoints.push(new CustomVector3(6.5, 7.6, -10.5, "ExtrudeLine", 3, 5));
        this.gridPoints.push(new CustomVector3(6.5, 8.5, -8.9, "ExtrudeLine", 3, 6));
        this.gridPoints.push(new CustomVector3(6.5, 9.3, -7.5, "ExtrudeLine", 3, 7));
        this.gridPoints.push(new CustomVector3(6.5, 10.1, -6, "ExtrudeLine", 3, 8)); // esquina amarilla arriba
        this.gridPoints.push(new CustomVector3(6.5, 10.1, -4.4, "ExtrudeLine", 3, 9));
        this.gridPoints.push(new CustomVector3(6.5, 10.1, -2.8, "ExtrudeLine", 3, 10));
        this.gridPoints.push(new CustomVector3(6.5, 10.1, -1.2, "ExtrudeLine", 3, 11));
        this.gridPoints.push(new CustomVector3(6.5, 10.1, 0, "ExtrudeLine", 3, 12)); /// borde amarillo > azul
        this.gridPoints.push(new CustomVector3(6.5, 10.1, 1.6, "ExtrudeLine", 3, 13));
        this.gridPoints.push(new CustomVector3(6.5, 10.1, 3.2, "ExtrudeLine", 3, 14));
        this.gridPoints.push(new CustomVector3(6.5, 10.1, 4.8, "ExtrudeLine", 3, 15));
        this.gridPoints.push(new CustomVector3(6.5, 10.1, 6.4, "ExtrudeLine", 3, 16));
        this.gridPoints.push(new CustomVector3(6.5, 10.1, 8, "ExtrudeLine", 3, 17)); /// Esquina arriba azul
        this.gridPoints.push(new CustomVector3(6.5, 9.1, 9.6, "ExtrudeLine", 3, 18));
        this.gridPoints.push(new CustomVector3(6.5, 8, 11.2, "ExtrudeLine", 3, 19));
        this.gridPoints.push(new CustomVector3(6.5, 7, 12.7, "ExtrudeLine", 3, 20));
        this.gridPoints.push(new CustomVector3(6.5, 6, 14.1, "ExtrudeLine", 3, 21)); /// Esquina frente arriba azul
        this.gridPoints.push(new CustomVector3(6.5, 4.8, 14.4, "ExtrudeLine", 3, 22));
        this.gridPoints.push(new CustomVector3(6.5, 3.1, 14.8, "ExtrudeLine", 3, 23));
        this.gridPoints.push(new CustomVector3(6.5, 2, 15.1, "ExtrudeLine", 3, 24)); /// Esquina frente azul
        this.gridPoints.push(new CustomVector3(6.5, 0.6, 14.8, "ExtrudeLine", 3, 25));
        this.gridPoints.push(new CustomVector3(6.5, -0.8, 14.4, "ExtrudeLine", 3, 26));
        this.gridPoints.push(new CustomVector3(6.5, -2.3, 13.9, "ExtrudeLine", 3, 27));
        this.gridPoints.push(new CustomVector3(6.5, -3.7, 13.5, "ExtrudeLine", 3, 28));
        this.gridPoints.push(new CustomVector3(6.5, -5, 13.1, "ExtrudeLine", 3, 29)); // esquina abajo azul
        this.gridPoints.push(new CustomVector3(6.5, -5.1, 11.5, "ExtrudeLine", 3, 30));
        this.gridPoints.push(new CustomVector3(6.5, -5.1, 10.2, "ExtrudeLine", 3, 31));
        this.gridPoints.push(new CustomVector3(6.5, -5.1, 8.9, "ExtrudeLine", 3, 32)); // borde abajo azul > rojo
        this.gridPoints.push(new CustomVector3(6.5, -5.1, 7.3, "ExtrudeLine", 3, 33));
        this.gridPoints.push(new CustomVector3(6.5, -5.1, 5.7, "ExtrudeLine", 3, 34));
        this.gridPoints.push(new CustomVector3(6.5, -5.1, 4.1, "ExtrudeLine", 3, 35));
        this.gridPoints.push(new CustomVector3(6.5, -5.1, 2.5, "ExtrudeLine", 3, 36));

        // backup
        /* this.gridPoints.push(new CustomVector3(6.5, -5.1, 0.8, "ExtrudeLine", 3, 37));  //                                       <<<<<<<<    Aquí comienza cerebelo
        this.gridPoints.push(new CustomVector3(6.5, -5.1, -0.9, "ExtrudeLine", 3, 38)); // esquina abajo rojo
        this.gridPoints.push(new CustomVector3(6.5, -6.1, -1.9, "ExtrudeLine", 3, 39));
        this.gridPoints.push(new CustomVector3(6.5, -7.1, -3, "ExtrudeLine", 3, 40)); // esquina abajo rojo
        this.gridPoints.push(new CustomVector3(6.5, -7.1, -4.5, "ExtrudeLine", 3, 41));
        this.gridPoints.push(new CustomVector3(6.5, -7.1, -6, "ExtrudeLine", 3, 42)); // esquina abajo atras rojo > rosa         <<<<<<<
        this.gridPoints.push(new CustomVector3(6.5, -7.1, -7.7, "ExtrudeLine", 3, 43));
        this.gridPoints.push(new CustomVector3(6.5, -7.1, -9.4, "ExtrudeLine", 3, 44));
        this.gridPoints.push(new CustomVector3(6.5, -7.1, -10.8, "ExtrudeLine", 3, 45)); // esquina abajo atras rosa             <<<<<<<<   Aquí termina cerebelo */

        //////////////////////////////////
        // Puntos ajustados al cerebelo //
        //////////////////////////////////

        this.gridPoints.push(new CustomVector3(6.5, -5.1, 1.4, "ExtrudeLine", 3, 37));  //                                       <<<<<<<<    Aquí comienza cerebelo
        this.gridPoints.push(new CustomVector3(6.5, -7, -0.4, "ExtrudeLine", 3, 38)); // esquina abajo rojo
        this.gridPoints.push(new CustomVector3(6.5, -8.4, -1.8, "ExtrudeLine", 3, 39));
        this.gridPoints.push(new CustomVector3(6.5, -8.4, -3.5, "ExtrudeLine", 3, 40)); // esquina abajo rojo
        this.gridPoints.push(new CustomVector3(6.5, -8.4, -5, "ExtrudeLine", 3, 41));
        this.gridPoints.push(new CustomVector3(6.5, -8.4, -6.3, "ExtrudeLine", 3, 42)); // esquina abajo atras rojo > rosa         <<<<<<<
        this.gridPoints.push(new CustomVector3(6.5, -8, -7.7, "ExtrudeLine", 3, 43));
        this.gridPoints.push(new CustomVector3(6.5, -7.1, -8.6, "ExtrudeLine", 3, 44));
        this.gridPoints.push(new CustomVector3(6.5, -7.1, -10.8, "ExtrudeLine", 3, 45)); // esquina abajo atras rosa             <<<<<<<<   Aquí termina cerebelo

        //////////////////////////////////
        // Puntos ajustados al cerebelo //
        //////////////////////////////////

        this.gridPoints.push(new CustomVector3(6.5, -5.7, -12.1, "ExtrudeLine", 3, 46));
        this.gridPoints.push(new CustomVector3(6.5, -4.3, -13.2, "ExtrudeLine", 3, 47));
        this.gridPoints.push(new CustomVector3(6.5, -3, -14.1, "ExtrudeLine", 3, 48)); // esquina atras rosa
        this.gridPoints.push(new CustomVector3(6.5, -1.5, -14.1, "ExtrudeLine", 3, 49));
        this.gridPoints.push(new CustomVector3(6.5, 0, -14.1, "ExtrudeLine", 3, 50));

        //////////////////////
        /* Linea 4 extrude */
        /////////////////////

        //                                  x,     y,    z
        this.gridPoints.push(new CustomVector3(5.5, 1, -14.1, "ExtrudeLine", 4, 0)); //esquina amarilla atras rosa > amarillo
        this.gridPoints.push(new CustomVector3(5.5, 2.7, -13.8, "ExtrudeLine", 4, 1));
        this.gridPoints.push(new CustomVector3(5.5, 4.3, -13.5, "ExtrudeLine", 4, 2));
        this.gridPoints.push(new CustomVector3(5.5, 5.9, -13.1, "ExtrudeLine", 4, 3)); //esquina atras arriba amarilla
        this.gridPoints.push(new CustomVector3(5.5, 6.8, -11.9, "ExtrudeLine", 4, 4));
        this.gridPoints.push(new CustomVector3(5.5, 7.6, -10.5, "ExtrudeLine", 4, 5));
        this.gridPoints.push(new CustomVector3(5.5, 8.5, -8.9, "ExtrudeLine", 4, 6));
        this.gridPoints.push(new CustomVector3(5.5, 9.3, -7.5, "ExtrudeLine", 4, 7));
        this.gridPoints.push(new CustomVector3(5.5, 10.1, -6, "ExtrudeLine", 4, 8)); // esquina amarilla arriba
        this.gridPoints.push(new CustomVector3(5.5, 10.1, -4.4, "ExtrudeLine", 4, 9));
        this.gridPoints.push(new CustomVector3(5.5, 10.1, -2.8, "ExtrudeLine", 4, 10));
        this.gridPoints.push(new CustomVector3(5.5, 10.1, -1.2, "ExtrudeLine", 4, 11));
        this.gridPoints.push(new CustomVector3(5.5, 10.1, 0, "ExtrudeLine", 4, 12)); /// borde amarillo > azul
        this.gridPoints.push(new CustomVector3(5.5, 10.1, 1.6, "ExtrudeLine", 4, 13));
        this.gridPoints.push(new CustomVector3(5.5, 10.1, 3.2, "ExtrudeLine", 4, 14));
        this.gridPoints.push(new CustomVector3(5.5, 10.1, 4.8, "ExtrudeLine", 4, 15));
        this.gridPoints.push(new CustomVector3(5.5, 10.1, 6.4, "ExtrudeLine", 4, 16));
        this.gridPoints.push(new CustomVector3(5.5, 10.1, 8, "ExtrudeLine", 4, 17)); /// Esquina arriba azul
        this.gridPoints.push(new CustomVector3(5.5, 9.1, 9.6, "ExtrudeLine", 4, 18));
        this.gridPoints.push(new CustomVector3(5.5, 8, 11.2, "ExtrudeLine", 4, 19));
        this.gridPoints.push(new CustomVector3(5.5, 7, 12.7, "ExtrudeLine", 4, 20));
        this.gridPoints.push(new CustomVector3(5.5, 6, 14.1, "ExtrudeLine", 4, 21)); /// Esquina frente arriba azul
        this.gridPoints.push(new CustomVector3(5.5, 4.8, 14.4, "ExtrudeLine", 4, 22));
        this.gridPoints.push(new CustomVector3(5.5, 3.1, 14.8, "ExtrudeLine", 4, 23));
        this.gridPoints.push(new CustomVector3(5.5, 2, 15.1, "ExtrudeLine", 4, 24)); /// Esquina frente azul
        this.gridPoints.push(new CustomVector3(5.5, 0.6, 14.8, "ExtrudeLine", 4, 25));
        this.gridPoints.push(new CustomVector3(5.5, -0.8, 14.4, "ExtrudeLine", 4, 26));
        this.gridPoints.push(new CustomVector3(5.5, -2.3, 13.9, "ExtrudeLine", 4, 27));
        this.gridPoints.push(new CustomVector3(5.5, -3.7, 13.5, "ExtrudeLine", 4, 28));
        this.gridPoints.push(new CustomVector3(5.5, -5, 13.1, "ExtrudeLine", 4, 29)); // esquina abajo azul
        this.gridPoints.push(new CustomVector3(5.5, -5.1, 11.5, "ExtrudeLine", 4, 30));
        this.gridPoints.push(new CustomVector3(5.5, -5.1, 10.2, "ExtrudeLine", 4, 31));
        this.gridPoints.push(new CustomVector3(5.5, -5.1, 8.9, "ExtrudeLine", 4, 32)); // borde abajo azul > rojo
        this.gridPoints.push(new CustomVector3(5.5, -5.1, 7.3, "ExtrudeLine", 4, 33));
        this.gridPoints.push(new CustomVector3(5.5, -5.1, 5.7, "ExtrudeLine", 4, 34));
        this.gridPoints.push(new CustomVector3(5.5, -5.1, 4.1, "ExtrudeLine", 4, 35));
        this.gridPoints.push(new CustomVector3(5.5, -5.1, 2.5, "ExtrudeLine", 4, 36));

        //backup
        /* this.gridPoints.push(new CustomVector3(5.5, -5.1, 0.8, "ExtrudeLine", 4, 37));
        this.gridPoints.push(new CustomVector3(5.5, -5.1, -0.9, "ExtrudeLine", 4, 38)); // esquina abajo rojo
        this.gridPoints.push(new CustomVector3(5.5, -6.1, -1.9, "ExtrudeLine", 4, 39));
        this.gridPoints.push(new CustomVector3(5.5, -7.1, -3, "ExtrudeLine", 4, 40)); // esquina abajo rojo
        this.gridPoints.push(new CustomVector3(5.5, -7.1, -4.5, "ExtrudeLine", 4, 41));
        this.gridPoints.push(new CustomVector3(5.5, -7.1, -6, "ExtrudeLine", 4, 42)); // esquina abajo atras rojo > rosa
        this.gridPoints.push(new CustomVector3(5.5, -7.1, -7.7, "ExtrudeLine", 4, 43));
        this.gridPoints.push(new CustomVector3(5.5, -7.1, -9.4, "ExtrudeLine", 4, 44));
        this.gridPoints.push(new CustomVector3(5.5, -7.1, -10.8, "ExtrudeLine", 4, 45)); // esquina abajo atras rosa */

        //////////////////////////////////
        // Puntos ajustados al cerebelo //
        //////////////////////////////////

        this.gridPoints.push(new CustomVector3(6.5, -5.1, 1.4, "ExtrudeLine", 4, 37));
        this.gridPoints.push(new CustomVector3(6.5, -9.3, 0.2, "ExtrudeLine", 4, 38)); // esquina abajo rojo
        this.gridPoints.push(new CustomVector3(6.5, -10, -1.3, "ExtrudeLine", 4, 39));
        this.gridPoints.push(new CustomVector3(6.5, -10, -3.3, "ExtrudeLine", 4, 40)); // esquina abajo rojo
        this.gridPoints.push(new CustomVector3(6.5, -10, -5.1, "ExtrudeLine", 4, 41));
        this.gridPoints.push(new CustomVector3(6.5, -10, -6.8, "ExtrudeLine", 4, 42)); // esquina abajo atras rojo > rosa
        this.gridPoints.push(new CustomVector3(6.5, -9.3, -8.3, "ExtrudeLine", 4, 43));
        this.gridPoints.push(new CustomVector3(6.5, -7.1, -9.8, "ExtrudeLine", 4, 44));
        this.gridPoints.push(new CustomVector3(5.4, -7.1, -11, "ExtrudeLine", 4, 45)); // esquina abajo atras rosa

        //////////////////////////////////
        // Puntos ajustados al cerebelo //
        //////////////////////////////////


        this.gridPoints.push(new CustomVector3(5.5, -5.7, -12.1, "ExtrudeLine", 4, 46));
        this.gridPoints.push(new CustomVector3(5.5, -4.3, -13.2, "ExtrudeLine", 4, 47));
        this.gridPoints.push(new CustomVector3(5.5, -3, -14.1, "ExtrudeLine", 4, 48)); // esquina atras rosa
        this.gridPoints.push(new CustomVector3(5.5, -1.5, -14.1, "ExtrudeLine", 4, 49));
        this.gridPoints.push(new CustomVector3(5.5, 0, -14.1, "ExtrudeLine", 4, 50));

        //////////////////////
        /* Linea 5 extrude */
        /////////////////////

        //                                  x,     y,    z
        this.gridPoints.push(new CustomVector3(4.5, 1, -14.1, "ExtrudeLine", 5, 0)); //esquina amarilla atras rosa > amarillo
        this.gridPoints.push(new CustomVector3(4.5, 2.7, -13.8, "ExtrudeLine", 5, 1));
        this.gridPoints.push(new CustomVector3(4.5, 4.3, -13.5, "ExtrudeLine", 5, 2));
        this.gridPoints.push(new CustomVector3(4.5, 5.9, -13.1, "ExtrudeLine", 5, 3)); //esquina atras arriba amarilla
        this.gridPoints.push(new CustomVector3(4.5, 6.8, -11.9, "ExtrudeLine", 5, 4));
        this.gridPoints.push(new CustomVector3(4.5, 7.6, -10.5, "ExtrudeLine", 5, 5));
        this.gridPoints.push(new CustomVector3(4.5, 8.5, -8.9, "ExtrudeLine", 5, 6));
        this.gridPoints.push(new CustomVector3(4.5, 9.3, -7.5, "ExtrudeLine", 5, 7));
        this.gridPoints.push(new CustomVector3(4.5, 10.1, -6, "ExtrudeLine", 5, 8)); // esquina amarilla arriba
        this.gridPoints.push(new CustomVector3(4.5, 10.1, -4.4, "ExtrudeLine", 5, 9));
        this.gridPoints.push(new CustomVector3(4.5, 10.1, -2.8, "ExtrudeLine", 5, 10));
        this.gridPoints.push(new CustomVector3(4.5, 10.1, -1.2, "ExtrudeLine", 5, 11));
        this.gridPoints.push(new CustomVector3(4.5, 10.1, 0, "ExtrudeLine", 5, 12)); /// borde amarillo > azul
        this.gridPoints.push(new CustomVector3(4.5, 10.1, 1.6, "ExtrudeLine", 5, 13));
        this.gridPoints.push(new CustomVector3(4.5, 10.1, 3.2, "ExtrudeLine", 5, 14));
        this.gridPoints.push(new CustomVector3(4.5, 10.1, 4.8, "ExtrudeLine", 5, 15));
        this.gridPoints.push(new CustomVector3(4.5, 10.1, 6.4, "ExtrudeLine", 5, 16));
        this.gridPoints.push(new CustomVector3(4.5, 10.1, 8, "ExtrudeLine", 5, 17)); /// Esquina arriba azul
        this.gridPoints.push(new CustomVector3(4.5, 9.1, 9.6, "ExtrudeLine", 5, 18));
        this.gridPoints.push(new CustomVector3(4.5, 8, 11.2, "ExtrudeLine", 5, 19));
        this.gridPoints.push(new CustomVector3(4.5, 7, 12.7, "ExtrudeLine", 5, 20));
        this.gridPoints.push(new CustomVector3(4.5, 6, 14.1, "ExtrudeLine", 5, 21)); /// Esquina frente arriba azul
        this.gridPoints.push(new CustomVector3(4.5, 4.8, 14.4, "ExtrudeLine", 5, 22));
        this.gridPoints.push(new CustomVector3(4.5, 3.1, 14.8, "ExtrudeLine", 5, 23));
        this.gridPoints.push(new CustomVector3(4.5, 2, 15.1, "ExtrudeLine", 5, 24)); /// Esquina frente azul
        this.gridPoints.push(new CustomVector3(4.5, 0.6, 14.8, "ExtrudeLine", 5, 25));
        this.gridPoints.push(new CustomVector3(4.5, -0.8, 14.4, "ExtrudeLine", 5, 26));
        this.gridPoints.push(new CustomVector3(4.5, -2.3, 13.9, "ExtrudeLine", 5, 27));
        this.gridPoints.push(new CustomVector3(4.5, -3.7, 13.5, "ExtrudeLine", 5, 28));
        this.gridPoints.push(new CustomVector3(4.5, -5, 13.1, "ExtrudeLine", 5, 29)); // esquina abajo azul
        this.gridPoints.push(new CustomVector3(4.5, -5.1, 11.5, "ExtrudeLine", 5, 30));
        this.gridPoints.push(new CustomVector3(4.5, -5.1, 10.2, "ExtrudeLine", 5, 31));
        this.gridPoints.push(new CustomVector3(4.5, -5.1, 8.9, "ExtrudeLine", 5, 32)); // borde abajo azul > rojo
        this.gridPoints.push(new CustomVector3(4.5, -5.1, 7.3, "ExtrudeLine", 5, 33));
        this.gridPoints.push(new CustomVector3(4.5, -5.1, 5.7, "ExtrudeLine", 5, 34));
        this.gridPoints.push(new CustomVector3(4.5, -5.1, 4.1, "ExtrudeLine", 5, 35));
        this.gridPoints.push(new CustomVector3(4.5, -5.1, 2.5, "ExtrudeLine", 5, 36));
        /*  BackUp
            this.gridPoints.push(new CustomVector3(4.5, -5.1, 0.8, "ExtrudeLine", 5, 37));
            this.gridPoints.push(new CustomVector3(4.5, -5.1, -0.9, "ExtrudeLine", 5, 38)); // esquina abajo rojo
            this.gridPoints.push(new CustomVector3(4.5, -6.1, -1.9, "ExtrudeLine", 5, 39));
            this.gridPoints.push(new CustomVector3(4.5, -7.1, -3, "ExtrudeLine", 5, 40)); // esquina abajo rojo
            this.gridPoints.push(new CustomVector3(4.5, -7.1, -4.5, "ExtrudeLine", 5, 41));
            this.gridPoints.push(new CustomVector3(4.5, -7.1, -6, "ExtrudeLine", 5, 42)); // esquina abajo atras rojo > rosa
            this.gridPoints.push(new CustomVector3(4.5, -7.1, -7.7, "ExtrudeLine", 5, 43));
            this.gridPoints.push(new CustomVector3(4.5, -7.1, -9.4, "ExtrudeLine", 5, 44));
            this.gridPoints.push(new CustomVector3(4.5, -7.1, -10.8, "ExtrudeLine", 5, 45)); // esquina abajo atras rosa
         */
        //////////////////////////////////
        // Puntos ajustados al cerebelo //
        //////////////////////////////////

        this.gridPoints.push(new CustomVector3(5.5, -5.1, 2.5, "ExtrudeLine", 5, 37));
        this.gridPoints.push(new CustomVector3(5.5, -10, 1.1, "ExtrudeLine", 5, 38)); // esquina abajo rojo
        this.gridPoints.push(new CustomVector3(5.5, -11.1, -1, "ExtrudeLine", 5, 39));
        this.gridPoints.push(new CustomVector3(5.5, -11.1, -3, "ExtrudeLine", 5, 40)); // esquina abajo rojo
        this.gridPoints.push(new CustomVector3(5.5, -11.1, -5, "ExtrudeLine", 5, 41));
        this.gridPoints.push(new CustomVector3(5.5, -11.1, -7, "ExtrudeLine", 5, 42)); // esquina abajo atras rojo > rosa
        this.gridPoints.push(new CustomVector3(5.5, -10.1, -9, "ExtrudeLine", 5, 43));
        this.gridPoints.push(new CustomVector3(5.5, -8.8, -9.9, "ExtrudeLine", 5, 44));
        this.gridPoints.push(new CustomVector3(5.5, -7.1, -11, "ExtrudeLine", 5, 45)); // esquina abajo atras rosa

        //////////////////////////////////
        // Puntos ajustados al cerebelo //
        //////////////////////////////////

        this.gridPoints.push(new CustomVector3(4.5, -5.7, -12.1, "ExtrudeLine", 5, 46));
        this.gridPoints.push(new CustomVector3(4.5, -4.3, -13.2, "ExtrudeLine", 5, 47));
        this.gridPoints.push(new CustomVector3(4.5, -3, -14.1, "ExtrudeLine", 5, 48)); // esquina atras rosa
        this.gridPoints.push(new CustomVector3(4.5, -1.5, -14.1, "ExtrudeLine", 5, 49));
        this.gridPoints.push(new CustomVector3(4.5, 0, -14.1, "ExtrudeLine", 5, 50));

        //////////////////////
        /* Linea 6 extrude */
        /////////////////////

        //                                  x,     y,    z
        this.gridPoints.push(new CustomVector3(3.5, 1, -14.1, "ExtrudeLine", 6, 0)); //esquina amarilla atras rosa > amarillo
        this.gridPoints.push(new CustomVector3(3.5, 2.7, -13.8, "ExtrudeLine", 6, 1));
        this.gridPoints.push(new CustomVector3(3.5, 4.3, -13.5, "ExtrudeLine", 6, 2));
        this.gridPoints.push(new CustomVector3(3.5, 5.9, -13.1, "ExtrudeLine", 6, 3)); //esquina atras arriba amarilla
        this.gridPoints.push(new CustomVector3(3.5, 6.8, -11.9, "ExtrudeLine", 6, 4));
        this.gridPoints.push(new CustomVector3(3.5, 7.6, -10.5, "ExtrudeLine", 6, 5));
        this.gridPoints.push(new CustomVector3(3.5, 8.5, -8.9, "ExtrudeLine", 6, 6));
        this.gridPoints.push(new CustomVector3(3.5, 9.3, -7.5, "ExtrudeLine", 6, 7));
        this.gridPoints.push(new CustomVector3(3.5, 10.1, -6, "ExtrudeLine", 6, 8)); // esquina amarilla arriba
        this.gridPoints.push(new CustomVector3(3.5, 10.1, -4.4, "ExtrudeLine", 6, 9));
        this.gridPoints.push(new CustomVector3(3.5, 10.1, -2.8, "ExtrudeLine", 6, 10));
        this.gridPoints.push(new CustomVector3(3.5, 10.1, -1.2, "ExtrudeLine", 6, 11));
        this.gridPoints.push(new CustomVector3(3.5, 10.1, 0, "ExtrudeLine", 6, 12));  /// borde amarillo > azul
        this.gridPoints.push(new CustomVector3(3.5, 10.1, 1.6, "ExtrudeLine", 6, 13));
        this.gridPoints.push(new CustomVector3(3.5, 10.1, 3.2, "ExtrudeLine", 6, 14));
        this.gridPoints.push(new CustomVector3(3.5, 10.1, 4.8, "ExtrudeLine", 6, 15));
        this.gridPoints.push(new CustomVector3(3.5, 10.1, 6.4, "ExtrudeLine", 6, 16));
        this.gridPoints.push(new CustomVector3(3.5, 10.1, 8, "ExtrudeLine", 6, 17)); /// Esquina arriba azul
        this.gridPoints.push(new CustomVector3(3.5, 9.1, 9.6, "ExtrudeLine", 6, 18));
        this.gridPoints.push(new CustomVector3(3.5, 8, 11.2, "ExtrudeLine", 6, 19));
        this.gridPoints.push(new CustomVector3(3.5, 7, 12.7, "ExtrudeLine", 6, 20));
        this.gridPoints.push(new CustomVector3(3.5, 6, 14.1, "ExtrudeLine", 6, 21)); /// Esquina frente arriba azul
        this.gridPoints.push(new CustomVector3(3.5, 4.8, 14.4, "ExtrudeLine", 6, 22));
        this.gridPoints.push(new CustomVector3(3.5, 3.1, 14.8, "ExtrudeLine", 6, 23));
        this.gridPoints.push(new CustomVector3(3.5, 2, 15.1, "ExtrudeLine", 6, 24)); /// Esquina frente azul
        this.gridPoints.push(new CustomVector3(3.5, 0.6, 14.8, "ExtrudeLine", 6, 25));
        this.gridPoints.push(new CustomVector3(3.5, -0.8, 14.4, "ExtrudeLine", 6, 26));
        this.gridPoints.push(new CustomVector3(3.5, -2.3, 13.9, "ExtrudeLine", 6, 27));
        this.gridPoints.push(new CustomVector3(3.5, -3.7, 13.5, "ExtrudeLine", 6, 28));
        this.gridPoints.push(new CustomVector3(3.5, -5, 13.1, "ExtrudeLine", 6, 29)); // esquina abajo azul
        this.gridPoints.push(new CustomVector3(3.5, -5.1, 11.5, "ExtrudeLine", 6, 30));
        this.gridPoints.push(new CustomVector3(3.5, -5.1, 10.2, "ExtrudeLine", 6, 31));
        this.gridPoints.push(new CustomVector3(3.5, -5.1, 8.9, "ExtrudeLine", 6, 32)); // borde abajo azul > rojo
        this.gridPoints.push(new CustomVector3(3.5, -5.1, 7.3, "ExtrudeLine", 6, 33));
        this.gridPoints.push(new CustomVector3(3.5, -5.1, 5.7, "ExtrudeLine", 6, 34));
        this.gridPoints.push(new CustomVector3(3.5, -5.1, 4.1, "ExtrudeLine", 6, 35));
        this.gridPoints.push(new CustomVector3(3.5, -5.1, 2.5, "ExtrudeLine", 6, 36));
        /* BackUp
        this.gridPoints.push(new CustomVector3(3.5, -5.1, 0.8, "ExtrudeLine", 6, 37));
        this.gridPoints.push(new CustomVector3(3.5, -5.1, -0.9, "ExtrudeLine", 6, 38)); // esquina abajo rojo
        this.gridPoints.push(new CustomVector3(3.5, -6.1, -1.9, "ExtrudeLine", 6, 39));
        this.gridPoints.push(new CustomVector3(3.5, -7.1, -3, "ExtrudeLine", 6, 40)); // esquina abajo rojo
        this.gridPoints.push(new CustomVector3(3.5, -7.1, -4.5, "ExtrudeLine", 6, 41));
        this.gridPoints.push(new CustomVector3(3.5, -7.1, -6, "ExtrudeLine", 6, 42)); // esquina abajo atras rojo > rosa
        this.gridPoints.push(new CustomVector3(3.5, -7.1, -7.7, "ExtrudeLine", 6, 43));
        this.gridPoints.push(new CustomVector3(3.5, -7.1, -9.4, "ExtrudeLine", 6, 44));
        this.gridPoints.push(new CustomVector3(3.5, -7.1, -10.8, "ExtrudeLine", 6, 45)); // esquina abajo atras rosa
     */
        //////////////////////////////////
        // Puntos ajustados al cerebelo //
        //////////////////////////////////
        this.gridPoints.push(new CustomVector3(4.2, -5.1, 0.8, "ExtrudeLine", 6, 37));
        this.gridPoints.push(new CustomVector3(4.2, -10, 1.1, "ExtrudeLine", 6, 38)); // esquina abajo rojo
        this.gridPoints.push(new CustomVector3(4.2, -11.1, -1, "ExtrudeLine", 6, 39));
        this.gridPoints.push(new CustomVector3(4.2, -11.1, -3, "ExtrudeLine", 6, 40)); // esquina abajo rojo
        this.gridPoints.push(new CustomVector3(4.2, -11.1, -5, "ExtrudeLine", 6, 41));
        this.gridPoints.push(new CustomVector3(4.2, -11.1, -7, "ExtrudeLine", 6, 42)); // esquina abajo atras rojo > rosa
        this.gridPoints.push(new CustomVector3(4.2, -10.1, -9, "ExtrudeLine", 6, 43));
        this.gridPoints.push(new CustomVector3(4.2, -8.8, -9.9, "ExtrudeLine", 6, 44));
        this.gridPoints.push(new CustomVector3(4.2, -7.1, -11, "ExtrudeLine", 6, 45)); // esquina abajo atras rosa
        //////////////////////////////////
        // Puntos ajustados al cerebelo //
        //////////////////////////////////

        this.gridPoints.push(new CustomVector3(3.5, -5.7, -12.1, "ExtrudeLine", 6, 46));
        this.gridPoints.push(new CustomVector3(3.5, -4.3, -13.2, "ExtrudeLine", 6, 47));
        this.gridPoints.push(new CustomVector3(3.5, -3, -14.1, "ExtrudeLine", 6, 48)); // esquina atras rosa
        this.gridPoints.push(new CustomVector3(3.5, -1.5, -14.1, "ExtrudeLine", 6, 49));
        this.gridPoints.push(new CustomVector3(3.5, 0, -14.1, "ExtrudeLine", 6, 50));

        //////////////////////
        /* Linea 7 extrude */
        /////////////////////

        //                                  x,     y,    z
        this.gridPoints.push(new CustomVector3(2.5, 1, -14.1, "ExtrudeLine", 7, 0)); //esquina amarilla atras rosa > amarillo
        this.gridPoints.push(new CustomVector3(2.5, 2.7, -13.8, "ExtrudeLine", 7, 1));
        this.gridPoints.push(new CustomVector3(2.5, 4.3, -13.5, "ExtrudeLine", 7, 2));
        this.gridPoints.push(new CustomVector3(2.5, 5.9, -13.1, "ExtrudeLine", 7, 3)); //esquina atras arriba amarilla
        this.gridPoints.push(new CustomVector3(2.5, 6.8, -11.9, "ExtrudeLine", 7, 4));
        this.gridPoints.push(new CustomVector3(2.5, 7.6, -10.5, "ExtrudeLine", 7, 5));
        this.gridPoints.push(new CustomVector3(2.5, 8.5, -8.9, "ExtrudeLine", 7, 6));
        this.gridPoints.push(new CustomVector3(2.5, 9.3, -7.5, "ExtrudeLine", 7, 7));
        this.gridPoints.push(new CustomVector3(2.5, 10.1, -6, "ExtrudeLine", 7, 8)); // esquina amarilla arriba
        this.gridPoints.push(new CustomVector3(2.5, 10.1, -4.4, "ExtrudeLine", 7, 9));
        this.gridPoints.push(new CustomVector3(2.5, 10.1, -2.8, "ExtrudeLine", 7, 10));
        this.gridPoints.push(new CustomVector3(2.5, 10.1, -1.2, "ExtrudeLine", 7, 11));
        this.gridPoints.push(new CustomVector3(2.5, 10.1, 0, "ExtrudeLine", 7, 12)); /// borde amarillo > azul
        this.gridPoints.push(new CustomVector3(2.5, 10.1, 1.6, "ExtrudeLine", 7, 13));
        this.gridPoints.push(new CustomVector3(2.5, 10.1, 3.2, "ExtrudeLine", 7, 14));
        this.gridPoints.push(new CustomVector3(2.5, 10.1, 4.8, "ExtrudeLine", 7, 15));
        this.gridPoints.push(new CustomVector3(2.5, 10.1, 6.4, "ExtrudeLine", 7, 16));
        this.gridPoints.push(new CustomVector3(2.5, 10.1, 8, "ExtrudeLine", 7, 17)); /// Esquina arriba azul
        this.gridPoints.push(new CustomVector3(2.5, 9.1, 9.6, "ExtrudeLine", 7, 18));
        this.gridPoints.push(new CustomVector3(2.5, 8, 11.2, "ExtrudeLine", 7, 19));
        this.gridPoints.push(new CustomVector3(2.5, 7, 12.7, "ExtrudeLine", 7, 20));
        this.gridPoints.push(new CustomVector3(2.5, 6, 14.1, "ExtrudeLine", 7, 21)); /// Esquina frente arriba azul
        this.gridPoints.push(new CustomVector3(2.5, 4.8, 14.4, "ExtrudeLine", 7, 22));
        this.gridPoints.push(new CustomVector3(2.5, 3.1, 14.8, "ExtrudeLine", 7, 23));
        this.gridPoints.push(new CustomVector3(2.5, 2, 15.1, "ExtrudeLine", 7, 24)); /// Esquina frente azul
        this.gridPoints.push(new CustomVector3(2.5, 0.6, 14.8, "ExtrudeLine", 7, 25));
        this.gridPoints.push(new CustomVector3(2.5, -0.8, 14.4, "ExtrudeLine", 7, 26));
        this.gridPoints.push(new CustomVector3(2.5, -2.3, 13.9, "ExtrudeLine", 7, 27));
        this.gridPoints.push(new CustomVector3(2.5, -3.7, 13.5, "ExtrudeLine", 7, 28));
        this.gridPoints.push(new CustomVector3(2.5, -5, 13.1, "ExtrudeLine", 7, 29)); // esquina abajo azul
        this.gridPoints.push(new CustomVector3(2.5, -5.1, 11.5, "ExtrudeLine", 7, 30));
        this.gridPoints.push(new CustomVector3(2.5, -5.1, 10.2, "ExtrudeLine", 7, 31));
        this.gridPoints.push(new CustomVector3(2.5, -5.1, 8.9, "ExtrudeLine", 7, 32)); // borde abajo azul > rojo
        this.gridPoints.push(new CustomVector3(2.5, -5.1, 7.3, "ExtrudeLine", 7, 33));
        this.gridPoints.push(new CustomVector3(2.5, -5.1, 5.7, "ExtrudeLine", 7, 34));
        this.gridPoints.push(new CustomVector3(2.5, -5.1, 4.1, "ExtrudeLine", 7, 35));
        this.gridPoints.push(new CustomVector3(2.5, -5.1, 2.5, "ExtrudeLine", 7, 36));
        /* BackUp
            this.gridPoints.push(new CustomVector3(2.5, -5.1, 0.8, "ExtrudeLine", 7, 37));
            this.gridPoints.push(new CustomVector3(2.5, -5.1, -0.9, "ExtrudeLine", 7, 38)); // esquina abajo rojo
            this.gridPoints.push(new CustomVector3(2.5, -6.1, -1.9, "ExtrudeLine", 7, 39));
            this.gridPoints.push(new CustomVector3(2.5, -7.1, -3, "ExtrudeLine", 7, 40)); // esquina abajo rojo
            this.gridPoints.push(new CustomVector3(2.5, -7.1, -4.5, "ExtrudeLine", 7, 41));
            this.gridPoints.push(new CustomVector3(2.5, -7.1, -6, "ExtrudeLine", 7, 42)); // esquina abajo atras rojo > rosa
            this.gridPoints.push(new CustomVector3(2.5, -7.1, -7.7, "ExtrudeLine", 7, 43));
            this.gridPoints.push(new CustomVector3(2.5, -7.1, -9.4, "ExtrudeLine", 7, 44));
            this.gridPoints.push(new CustomVector3(2.5, -7.1, -10.8, "ExtrudeLine", 7, 45)); // esquina abajo atras rosa
         */
        //////////////////////////////////
        // Puntos ajustados al cerebelo //
        //////////////////////////////////
        this.gridPoints.push(new CustomVector3(3, -5.1, 0.8, "ExtrudeLine", 7, 37));
        this.gridPoints.push(new CustomVector3(3, -10, 1.1, "ExtrudeLine", 7, 38)); // esquina abajo rojo
        this.gridPoints.push(new CustomVector3(3, -11.1, -1, "ExtrudeLine", 7, 39));
        this.gridPoints.push(new CustomVector3(3, -11.1, -3, "ExtrudeLine", 7, 40)); // esquina abajo rojo
        this.gridPoints.push(new CustomVector3(3, -11.1, -5, "ExtrudeLine", 7, 41));
        this.gridPoints.push(new CustomVector3(3, -11.1, -7, "ExtrudeLine", 7, 42)); // esquina abajo atras rojo > rosa
        this.gridPoints.push(new CustomVector3(3, -10.1, -9, "ExtrudeLine", 7, 43));
        this.gridPoints.push(new CustomVector3(3, -8.8, -9.9, "ExtrudeLine", 7, 44));
        this.gridPoints.push(new CustomVector3(3, -7.1, -11, "ExtrudeLine", 7, 45)); // esquina abajo atras rosa
        //////////////////////////////////
        // Puntos ajustados al cerebelo //
        //////////////////////////////////
        this.gridPoints.push(new CustomVector3(2.5, -5.7, -12.1, "ExtrudeLine", 7, 46));
        this.gridPoints.push(new CustomVector3(2.5, -4.3, -13.2, "ExtrudeLine", 7, 47));
        this.gridPoints.push(new CustomVector3(2.5, -3, -14.1, "ExtrudeLine", 7, 48)); // esquina atras rosa
        this.gridPoints.push(new CustomVector3(2.5, -1.5, -14.1, "ExtrudeLine", 7, 49));
        this.gridPoints.push(new CustomVector3(2.5, 0, -14.1, "ExtrudeLine", 7, 50));

        //////////////////////
        /* Linea 8 extrude */
        /////////////////////

        //                                  x,     y,    z
        this.gridPoints.push(new CustomVector3(1.5, 1, -14.1, "ExtrudeLine", 8, 0)); //esquina amarilla atras rosa > amarillo
        this.gridPoints.push(new CustomVector3(1.5, 2.7, -13.8, "ExtrudeLine", 8, 1));
        this.gridPoints.push(new CustomVector3(1.5, 4.3, -13.5, "ExtrudeLine", 8, 2));
        this.gridPoints.push(new CustomVector3(1.5, 5.9, -13.1, "ExtrudeLine", 8, 3)); //esquina atras arriba amarilla
        this.gridPoints.push(new CustomVector3(1.5, 6.8, -11.9, "ExtrudeLine", 8, 4));
        this.gridPoints.push(new CustomVector3(1.5, 7.6, -10.5, "ExtrudeLine", 8, 5));
        this.gridPoints.push(new CustomVector3(1.5, 8.5, -8.9, "ExtrudeLine", 8, 6));
        this.gridPoints.push(new CustomVector3(1.5, 9.3, -7.5, "ExtrudeLine", 8, 7));
        this.gridPoints.push(new CustomVector3(1.5, 10.1, -6, "ExtrudeLine", 8, 8)); // esquina amarilla arriba
        this.gridPoints.push(new CustomVector3(1.5, 10.1, -4.4, "ExtrudeLine", 8, 9));
        this.gridPoints.push(new CustomVector3(1.5, 10.1, -2.8, "ExtrudeLine", 8, 10));
        this.gridPoints.push(new CustomVector3(1.5, 10.1, -1.2, "ExtrudeLine", 8, 11));
        this.gridPoints.push(new CustomVector3(1.5, 10.1, 0, "ExtrudeLine", 8, 12)); /// borde amarillo > azul
        this.gridPoints.push(new CustomVector3(1.5, 10.1, 1.6, "ExtrudeLine", 8, 13));
        this.gridPoints.push(new CustomVector3(1.5, 10.1, 3.2, "ExtrudeLine", 8, 14));
        this.gridPoints.push(new CustomVector3(1.5, 10.1, 4.8, "ExtrudeLine", 8, 15));
        this.gridPoints.push(new CustomVector3(1.5, 10.1, 6.4, "ExtrudeLine", 8, 16));
        this.gridPoints.push(new CustomVector3(1.5, 10.1, 8, "ExtrudeLine", 8, 17)); /// Esquina arriba azul
        this.gridPoints.push(new CustomVector3(1.5, 9.1, 9.6, "ExtrudeLine", 8, 18));
        this.gridPoints.push(new CustomVector3(1.5, 8, 11.2, "ExtrudeLine", 8, 19));
        this.gridPoints.push(new CustomVector3(1.5, 7, 12.7, "ExtrudeLine", 8, 20));
        this.gridPoints.push(new CustomVector3(1.5, 6, 14.1, "ExtrudeLine", 8, 21)); /// Esquina frente arriba azul
        this.gridPoints.push(new CustomVector3(1.5, 4.8, 14.4, "ExtrudeLine", 8, 22));
        this.gridPoints.push(new CustomVector3(1.5, 3.1, 14.8, "ExtrudeLine", 8, 23));
        this.gridPoints.push(new CustomVector3(1.5, 2, 15.1, "ExtrudeLine", 8, 24)); /// Esquina frente azul
        this.gridPoints.push(new CustomVector3(1.5, 0.6, 14.8, "ExtrudeLine", 8, 25));
        this.gridPoints.push(new CustomVector3(1.5, -0.8, 14.4, "ExtrudeLine", 8, 26));
        this.gridPoints.push(new CustomVector3(1.5, -2.3, 13.9, "ExtrudeLine", 8, 27));
        this.gridPoints.push(new CustomVector3(1.5, -3.7, 13.5, "ExtrudeLine", 8, 28));
        this.gridPoints.push(new CustomVector3(1.5, -5, 13.1, "ExtrudeLine", 8, 29)); // esquina abajo azul
        this.gridPoints.push(new CustomVector3(1.5, -5.1, 11.5, "ExtrudeLine", 8, 30));
        this.gridPoints.push(new CustomVector3(1.5, -5.1, 10.2, "ExtrudeLine", 8, 31));
        this.gridPoints.push(new CustomVector3(1.5, -5.1, 8.9, "ExtrudeLine", 8, 32)); // borde abajo azul > rojo
        this.gridPoints.push(new CustomVector3(1.5, -5.1, 7.3, "ExtrudeLine", 8, 33));
        this.gridPoints.push(new CustomVector3(1.5, -5.1, 5.7, "ExtrudeLine", 8, 34));
        this.gridPoints.push(new CustomVector3(1.5, -5.1, 4.1, "ExtrudeLine", 8, 35));
        this.gridPoints.push(new CustomVector3(1.5, -5.1, 2.5, "ExtrudeLine", 8, 36));
        /* BackUp
        this.gridPoints.push(new CustomVector3(1.5, -5.1, -0.9, "ExtrudeLine", 8, 38)); // esquina abajo rojo
        this.gridPoints.push(new CustomVector3(1.5, -6.1, -1.9, "ExtrudeLine", 8, 39));
        this.gridPoints.push(new CustomVector3(1.5, -7.1, -3, "ExtrudeLine", 8, 40)); // esquina abajo rojo
        this.gridPoints.push(new CustomVector3(1.5, -7.1, -4.5, "ExtrudeLine", 8, 41));
        this.gridPoints.push(new CustomVector3(1.5, -7.1, -6, "ExtrudeLine", 8, 42)); // esquina abajo atras rojo > rosa
        this.gridPoints.push(new CustomVector3(1.5, -7.1, -7.7, "ExtrudeLine", 8, 43));
        this.gridPoints.push(new CustomVector3(1.5, -7.1, -9.4, "ExtrudeLine", 8, 44));
        this.gridPoints.push(new CustomVector3(1.5, -7.1, -10.8, "ExtrudeLine", 8, 45)); // esquina abajo atras rosa
        */
        //////////////////////////////////
        // Puntos ajustados al cerebelo //
        //////////////////////////////////
        this.gridPoints.push(new CustomVector3(1.8, -5.1, 0.8, "ExtrudeLine", 8, 37));
        this.gridPoints.push(new CustomVector3(1.8, -10, 1.1, "ExtrudeLine", 8, 38)); // esquina abajo rojo
        this.gridPoints.push(new CustomVector3(1.8, -11.1, -1, "ExtrudeLine", 8, 39));
        this.gridPoints.push(new CustomVector3(1.8, -11.1, -3, "ExtrudeLine", 8, 40)); // esquina abajo rojo
        this.gridPoints.push(new CustomVector3(1.8, -11.1, -5, "ExtrudeLine", 8, 41));
        this.gridPoints.push(new CustomVector3(1.8, -11.1, -7, "ExtrudeLine", 8, 42)); // esquina abajo atras rojo > rosa
        this.gridPoints.push(new CustomVector3(1.8, -10.1, -9, "ExtrudeLine", 8, 43));
        this.gridPoints.push(new CustomVector3(1.8, -8.8, -9.9, "ExtrudeLine", 8, 44));
        this.gridPoints.push(new CustomVector3(1.8, -7.1, -11, "ExtrudeLine", 8, 45)); // esquina abajo atras rosa
        //////////////////////////////////
        // Puntos ajustados al cerebelo //
        //////////////////////////////////
        this.gridPoints.push(new CustomVector3(1.5, -5.7, -12.1, "ExtrudeLine", 8, 46));
        this.gridPoints.push(new CustomVector3(1.5, -4.3, -13.2, "ExtrudeLine", 8, 47));
        this.gridPoints.push(new CustomVector3(1.5, -3, -14.1, "ExtrudeLine", 8, 48)); // esquina atras rosa
        this.gridPoints.push(new CustomVector3(1.5, -1.5, -14.1, "ExtrudeLine", 8, 49));
        this.gridPoints.push(new CustomVector3(1.5, 0, -14.1, "ExtrudeLine", 8, 50));

        //////////////////////
        /* Linea 9 extrude */
        ///////////////////

        //                                  x,     y,    z
        this.gridPoints.push(new CustomVector3(0.5, 1, -14.1, "ExtrudeLine", 9, 0)); //esquina amarilla atras rosa > amarillo
        this.gridPoints.push(new CustomVector3(0.5, 2.7, -13.8, "ExtrudeLine", 9, 1));
        this.gridPoints.push(new CustomVector3(0.5, 4.3, -13.5, "ExtrudeLine", 9, 2));
        this.gridPoints.push(new CustomVector3(0.5, 5.9, -13.1, "ExtrudeLine", 9, 3)); //esquina atras arriba amarilla
        this.gridPoints.push(new CustomVector3(0.5, 6.8, -11.9, "ExtrudeLine", 9, 4));
        this.gridPoints.push(new CustomVector3(0.5, 7.6, -10.5, "ExtrudeLine", 9, 5));
        this.gridPoints.push(new CustomVector3(0.5, 8.5, -8.9, "ExtrudeLine", 9, 6));
        this.gridPoints.push(new CustomVector3(0.5, 9.3, -7.5, "ExtrudeLine", 9, 7));
        this.gridPoints.push(new CustomVector3(0.5, 10.1, -6, "ExtrudeLine", 9, 8)); // esquina amarilla arriba
        this.gridPoints.push(new CustomVector3(0.5, 10.1, -4.4, "ExtrudeLine", 9, 9));
        this.gridPoints.push(new CustomVector3(0.5, 10.1, -2.8, "ExtrudeLine", 9, 10));
        this.gridPoints.push(new CustomVector3(0.5, 10.1, -1.2, "ExtrudeLine", 9, 11));
        this.gridPoints.push(new CustomVector3(0.5, 10.1, 0, "ExtrudeLine", 9, 12)); /// borde amarillo > azul
        this.gridPoints.push(new CustomVector3(0.5, 10.1, 1.6, "ExtrudeLine", 9, 13));
        this.gridPoints.push(new CustomVector3(0.5, 10.1, 3.2, "ExtrudeLine", 9, 14));
        this.gridPoints.push(new CustomVector3(0.5, 10.1, 4.8, "ExtrudeLine", 9, 15));
        this.gridPoints.push(new CustomVector3(0.5, 10.1, 6.4, "ExtrudeLine", 9, 16));
        this.gridPoints.push(new CustomVector3(0.5, 10.1, 8, "ExtrudeLine", 9, 17)); /// Esquina arriba azul
        this.gridPoints.push(new CustomVector3(0.5, 9.1, 9.6, "ExtrudeLine", 9, 18));
        this.gridPoints.push(new CustomVector3(0.5, 8, 11.2, "ExtrudeLine", 9, 19));
        this.gridPoints.push(new CustomVector3(0.5, 7, 12.7, "ExtrudeLine", 9, 20));
        this.gridPoints.push(new CustomVector3(0.5, 6, 14.1, "ExtrudeLine", 9, 21)); /// Esquina frente arriba azul
        this.gridPoints.push(new CustomVector3(0.5, 4.8, 14.4, "ExtrudeLine", 9, 22));
        this.gridPoints.push(new CustomVector3(0.5, 3.1, 14.8, "ExtrudeLine", 9, 23));
        this.gridPoints.push(new CustomVector3(0.5, 2, 15.1, "ExtrudeLine", 9, 24)); /// Esquina frente azul
        this.gridPoints.push(new CustomVector3(0.5, 0.6, 14.8, "ExtrudeLine", 9, 25));
        this.gridPoints.push(new CustomVector3(0.5, -0.8, 14.4, "ExtrudeLine", 9, 26));
        this.gridPoints.push(new CustomVector3(0.5, -2.3, 13.9, "ExtrudeLine", 9, 27));
        this.gridPoints.push(new CustomVector3(0.5, -3.7, 13.5, "ExtrudeLine", 9, 28));
        this.gridPoints.push(new CustomVector3(0.5, -5, 13.1, "ExtrudeLine", 9, 29)); // esquina abajo azul
        this.gridPoints.push(new CustomVector3(0.5, -5.1, 11.5, "ExtrudeLine", 9, 30));
        this.gridPoints.push(new CustomVector3(0.5, -5.1, 10.2, "ExtrudeLine", 9, 31));
        this.gridPoints.push(new CustomVector3(0.5, -5.1, 8.9, "ExtrudeLine", 9, 32)); // borde abajo azul > rojo
        this.gridPoints.push(new CustomVector3(0.5, -5.1, 7.3, "ExtrudeLine", 9, 33));
        this.gridPoints.push(new CustomVector3(0.5, -5.1, 5.7, "ExtrudeLine", 9, 34));
        this.gridPoints.push(new CustomVector3(0.5, -5.1, 4.1, "ExtrudeLine", 9, 35));
        this.gridPoints.push(new CustomVector3(0.5, -5.1, 2.5, "ExtrudeLine", 9, 36));
        /* BackUp
        this.gridPoints.push(new CustomVector3(0.5, -5.1, 0.8, "ExtrudeLine", 9, 37));
        this.gridPoints.push(new CustomVector3(0.5, -5.1, -0.9, "ExtrudeLine", 9, 38)); // esquina abajo rojo
        this.gridPoints.push(new CustomVector3(0.5, -6.1, -1.9, "ExtrudeLine", 9, 39));
        this.gridPoints.push(new CustomVector3(0.5, -7.1, -3, "ExtrudeLine", 9, 40)); // esquina abajo rojo
        this.gridPoints.push(new CustomVector3(0.5, -7.1, -4.5, "ExtrudeLine", 9, 41));
        this.gridPoints.push(new CustomVector3(0.5, -7.1, -6, "ExtrudeLine", 9, 42)); // esquina abajo atras rojo > rosa
        this.gridPoints.push(new CustomVector3(0.5, -7.1, -7.7, "ExtrudeLine", 9, 43));
        this.gridPoints.push(new CustomVector3(0.5, -7.1, -9.4, "ExtrudeLine", 9, 44));
        this.gridPoints.push(new CustomVector3(0.5, -7.1, -10.8, "ExtrudeLine", 9, 45)); // esquina abajo atras rosa
        */
        //////////////////////////////////
        // Puntos ajustados al cerebelo //
        //////////////////////////////////
        this.gridPoints.push(new CustomVector3(0.6, -5.1, 0.8, "ExtrudeLine", 9, 37));
        this.gridPoints.push(new CustomVector3(0.6, -10, 1.1, "ExtrudeLine", 9, 38)); // esquina abajo rojo
        this.gridPoints.push(new CustomVector3(0.6, -11.1, -1, "ExtrudeLine", 9, 39));
        this.gridPoints.push(new CustomVector3(0.6, -11.1, -3, "ExtrudeLine", 9, 40)); // esquina abajo rojo
        this.gridPoints.push(new CustomVector3(0.6, -11.1, -5, "ExtrudeLine", 9, 41));
        this.gridPoints.push(new CustomVector3(0.6, -11.1, -7, "ExtrudeLine", 9, 42)); // esquina abajo atras rojo > rosa
        this.gridPoints.push(new CustomVector3(0.6, -10.1, -9, "ExtrudeLine", 9, 43));
        this.gridPoints.push(new CustomVector3(0.6, -8.8, -9.9, "ExtrudeLine", 9, 44));
        this.gridPoints.push(new CustomVector3(0.6, -7.1, -11, "ExtrudeLine", 9, 45)); // esquina abajo atras rosa
        //////////////////////////////////
        // Puntos ajustados al cerebelo //
        //////////////////////////////////
        this.gridPoints.push(new CustomVector3(0.5, -5.7, -12.1, "ExtrudeLine", 9, 46));
        this.gridPoints.push(new CustomVector3(0.5, -4.3, -13.2, "ExtrudeLine", 9, 47));
        this.gridPoints.push(new CustomVector3(0.5, -3, -14.1, "ExtrudeLine", 9, 48)); // esquina atras rosa
        this.gridPoints.push(new CustomVector3(0.5, -1.5, -14.1, "ExtrudeLine", 9, 49));
        this.gridPoints.push(new CustomVector3(0.5, 0, -14.1, "ExtrudeLine", 9, 50));


        /////////////////////
        /* Linea 1 extrude */
        /////////////////////

        this.gridPoints.push(new CustomVector3(-0.5, 1, -14.1, "ExtrudeLine", 10, 0)); //esquina amarilla atras rosa > amarillo
        this.gridPoints.push(new CustomVector3(-0.5, 2.7, -13.8, "ExtrudeLine", 10, 1));
        this.gridPoints.push(new CustomVector3(-0.5, 4.3, -13.5, "ExtrudeLine", 10, 2));
        this.gridPoints.push(new CustomVector3(-0.5, 5.9, -13.1, "ExtrudeLine", 10, 3)); //esquina atras arriba amarilla
        this.gridPoints.push(new CustomVector3(-0.5, 6.8, -11.9, "ExtrudeLine", 10, 4));
        this.gridPoints.push(new CustomVector3(-0.5, 7.6, -10.5, "ExtrudeLine", 10, 5));
        this.gridPoints.push(new CustomVector3(-0.5, 8.5, -8.9, "ExtrudeLine", 10, 6));
        this.gridPoints.push(new CustomVector3(-0.5, 9.3, -7.5, "ExtrudeLine", 10, 7));
        this.gridPoints.push(new CustomVector3(-0.5, 10.1, -6, "ExtrudeLine", 10, 8)); // esquina amarilla arriba
        this.gridPoints.push(new CustomVector3(-0.5, 10.1, -4.4, "ExtrudeLine", 10, 9));
        this.gridPoints.push(new CustomVector3(-0.5, 10.1, -2.8, "ExtrudeLine", 10, 10));
        this.gridPoints.push(new CustomVector3(-0.5, 10.1, -1.2, "ExtrudeLine", 10, 11));
        this.gridPoints.push(new CustomVector3(-0.5, 10.1, 0, "ExtrudeLine", 10, 12));  /// borde amarillo > azul
        this.gridPoints.push(new CustomVector3(-0.5, 10.1, 1.6, "ExtrudeLine", 10, 13));
        this.gridPoints.push(new CustomVector3(-0.5, 10.1, 3.2, "ExtrudeLine", 10, 14));
        this.gridPoints.push(new CustomVector3(-0.5, 10.1, 4.8, "ExtrudeLine", 10, 15));
        this.gridPoints.push(new CustomVector3(-0.5, 10.1, 6.4, "ExtrudeLine", 10, 16));
        this.gridPoints.push(new CustomVector3(-0.5, 10.1, 8, "ExtrudeLine", 10, 17)); /// Esquina arriba azul
        this.gridPoints.push(new CustomVector3(-0.5, 9.1, 9.6, "ExtrudeLine", 10, 18));
        this.gridPoints.push(new CustomVector3(-0.5, 8, 11.2, "ExtrudeLine", 10, 19));
        this.gridPoints.push(new CustomVector3(-0.5, 7, 12.7, "ExtrudeLine", 10, 20));
        this.gridPoints.push(new CustomVector3(-0.5, 6, 14.1, "ExtrudeLine", 10, 21)); /// Esquina frente arriba azul
        this.gridPoints.push(new CustomVector3(-0.5, 4.8, 14.4, "ExtrudeLine", 10, 22));
        this.gridPoints.push(new CustomVector3(-0.5, 3.1, 14.8, "ExtrudeLine", 10, 23));
        this.gridPoints.push(new CustomVector3(-0.5, 2, 15.1, "ExtrudeLine", 10, 24)); /// Esquina frente azul
        this.gridPoints.push(new CustomVector3(-0.5, 0.6, 14.8, "ExtrudeLine", 10, 25));
        this.gridPoints.push(new CustomVector3(-0.5, -0.8, 14.4, "ExtrudeLine", 10, 26));
        this.gridPoints.push(new CustomVector3(-0.5, -2.3, 13.9, "ExtrudeLine", 10, 27));
        this.gridPoints.push(new CustomVector3(-0.5, -3.7, 13.5, "ExtrudeLine", 10, 28));
        this.gridPoints.push(new CustomVector3(-0.5, -5, 13.1, "ExtrudeLine", 10, 29)); // esquina abajo azul
        this.gridPoints.push(new CustomVector3(-0.5, -5.1, 11.5, "ExtrudeLine", 10, 30));
        this.gridPoints.push(new CustomVector3(-0.5, -5.1, 10.2, "ExtrudeLine", 10, 31));
        this.gridPoints.push(new CustomVector3(-0.5, -5.1, 8.9, "ExtrudeLine", 10, 32)); // borde abajo azul > rojo
        this.gridPoints.push(new CustomVector3(-0.5, -5.1, 7.3, "ExtrudeLine", 10, 33));
        this.gridPoints.push(new CustomVector3(-0.5, -5.1, 5.7, "ExtrudeLine", 10, 34));
        this.gridPoints.push(new CustomVector3(-0.5, -5.1, 4.1, "ExtrudeLine", 10, 35));
        this.gridPoints.push(new CustomVector3(-0.5, -5.1, 2.5, "ExtrudeLine", 10, 36));
        //////////////////////////////////
        // Puntos ajustados al cerebelo //
        //////////////////////////////////
        this.gridPoints.push(new CustomVector3(-0.6, -5.1, 0.8, "ExtrudeLine", 10, 37));
        this.gridPoints.push(new CustomVector3(-0.6, -10, 1.1, "ExtrudeLine", 10, 38)); // esquina abajo rojo
        this.gridPoints.push(new CustomVector3(-0.6, -11.1, -1, "ExtrudeLine", 10, 39));
        this.gridPoints.push(new CustomVector3(-0.6, -11.1, -3, "ExtrudeLine", 10, 40)); // esquina abajo rojo
        this.gridPoints.push(new CustomVector3(-0.6, -11.1, -5, "ExtrudeLine", 10, 41));
        this.gridPoints.push(new CustomVector3(-0.6, -11.1, -7, "ExtrudeLine", 10, 42)); // esquina abajo atras rojo > rosa
        this.gridPoints.push(new CustomVector3(-0.6, -10.1, -9, "ExtrudeLine", 10, 43));
        this.gridPoints.push(new CustomVector3(-0.6, -8.8, -9.9, "ExtrudeLine", 10, 44));
        this.gridPoints.push(new CustomVector3(-0.6, -7.1, -11, "ExtrudeLine", 10, 45)); // esquina abajo atras rosa
        //////////////////////////////////
        // Puntos ajustados al cerebelo //
        //////////////////////////////////
        this.gridPoints.push(new CustomVector3(-0.5, -5.7, -12.1, "ExtrudeLine", 10, 46));
        this.gridPoints.push(new CustomVector3(-0.5, -4.3, -13.2, "ExtrudeLine", 10, 47));
        this.gridPoints.push(new CustomVector3(-0.5, -3, -14.1, "ExtrudeLine", 10, 48)); // esquina atras rosa
        this.gridPoints.push(new CustomVector3(-0.5, -1.5, -14.1, "ExtrudeLine", 10, 49));
        this.gridPoints.push(new CustomVector3(-0.5, 0, -14.1, "ExtrudeLine", 10, 50));

        /////////////////////
        /* Linea 11 extrude */
        /////////////////////

        this.gridPoints.push(new CustomVector3(-1.5, 1, -14.1, "ExtrudeLine", 11, 0)); //esquina amarilla atras rosa > amarillo
        this.gridPoints.push(new CustomVector3(-1.5, 2.7, -13.8, "ExtrudeLine", 11, 1));
        this.gridPoints.push(new CustomVector3(-1.5, 4.3, -13.5, "ExtrudeLine", 11, 2));
        this.gridPoints.push(new CustomVector3(-1.5, 5.9, -13.1, "ExtrudeLine", 11, 3)); //esquina atras arriba amarilla
        this.gridPoints.push(new CustomVector3(-1.5, 6.8, -11.9, "ExtrudeLine", 11, 4));
        this.gridPoints.push(new CustomVector3(-1.5, 7.6, -10.5, "ExtrudeLine", 11, 5));
        this.gridPoints.push(new CustomVector3(-1.5, 8.5, -8.9, "ExtrudeLine", 11, 6));
        this.gridPoints.push(new CustomVector3(-1.5, 9.3, -7.5, "ExtrudeLine", 11, 7));
        this.gridPoints.push(new CustomVector3(-1.5, 10.1, -6, "ExtrudeLine", 11, 8)); // esquina amarilla arriba
        this.gridPoints.push(new CustomVector3(-1.5, 10.1, -4.4, "ExtrudeLine", 11, 9));
        this.gridPoints.push(new CustomVector3(-1.5, 10.1, -2.8, "ExtrudeLine", 11, 10));
        this.gridPoints.push(new CustomVector3(-1.5, 10.1, -1.2, "ExtrudeLine", 11, 11));
        this.gridPoints.push(new CustomVector3(-1.5, 10.1, 0, "ExtrudeLine", 11, 12));  /// borde amarillo > azul
        this.gridPoints.push(new CustomVector3(-1.5, 10.1, 1.6, "ExtrudeLine", 11, 13));
        this.gridPoints.push(new CustomVector3(-1.5, 10.1, 3.2, "ExtrudeLine", 11, 14));
        this.gridPoints.push(new CustomVector3(-1.5, 10.1, 4.8, "ExtrudeLine", 11, 15));
        this.gridPoints.push(new CustomVector3(-1.5, 10.1, 6.4, "ExtrudeLine", 11, 16));
        this.gridPoints.push(new CustomVector3(-1.5, 10.1, 8, "ExtrudeLine", 11, 17)); /// Esquina arriba azul
        this.gridPoints.push(new CustomVector3(-1.5, 9.1, 9.6, "ExtrudeLine", 11, 18));
        this.gridPoints.push(new CustomVector3(-1.5, 8, 11.2, "ExtrudeLine", 11, 19));
        this.gridPoints.push(new CustomVector3(-1.5, 7, 12.7, "ExtrudeLine", 11, 20));
        this.gridPoints.push(new CustomVector3(-1.5, 6, 14.1, "ExtrudeLine", 11, 21)); /// Esquina frente arriba azul
        this.gridPoints.push(new CustomVector3(-1.5, 4.8, 14.4, "ExtrudeLine", 11, 22));
        this.gridPoints.push(new CustomVector3(-1.5, 3.1, 14.8, "ExtrudeLine", 11, 23));
        this.gridPoints.push(new CustomVector3(-1.5, 2, 15.1, "ExtrudeLine", 11, 24)); /// Esquina frente azul
        this.gridPoints.push(new CustomVector3(-1.5, 0.6, 14.8, "ExtrudeLine", 11, 25));
        this.gridPoints.push(new CustomVector3(-1.5, -0.8, 14.4, "ExtrudeLine", 11, 26));
        this.gridPoints.push(new CustomVector3(-1.5, -2.3, 13.9, "ExtrudeLine", 11, 27));
        this.gridPoints.push(new CustomVector3(-1.5, -3.7, 13.5, "ExtrudeLine", 11, 28));
        this.gridPoints.push(new CustomVector3(-1.5, -5, 13.1, "ExtrudeLine", 11, 29)); // esquina abajo azul
        this.gridPoints.push(new CustomVector3(-1.5, -5.1, 11.5, "ExtrudeLine", 11, 30));
        this.gridPoints.push(new CustomVector3(-1.5, -5.1, 10.2, "ExtrudeLine", 11, 31));
        this.gridPoints.push(new CustomVector3(-1.5, -5.1, 8.9, "ExtrudeLine", 11, 32)); // borde abajo azul > rojo
        this.gridPoints.push(new CustomVector3(-1.5, -5.1, 7.3, "ExtrudeLine", 11, 33));
        this.gridPoints.push(new CustomVector3(-1.5, -5.1, 5.7, "ExtrudeLine", 11, 34));
        this.gridPoints.push(new CustomVector3(-1.5, -5.1, 4.1, "ExtrudeLine", 11, 35));
        this.gridPoints.push(new CustomVector3(-1.5, -5.1, 2.5, "ExtrudeLine", 11, 36));
        //////////////////////////////////
        // Puntos ajustados al cerebelo //
        //////////////////////////////////
        this.gridPoints.push(new CustomVector3(-1.8, -5.1, 0.8, "ExtrudeLine", 11, 37));
        this.gridPoints.push(new CustomVector3(-1.8, -10, 1.1, "ExtrudeLine", 11, 38)); // esquina abajo rojo
        this.gridPoints.push(new CustomVector3(-1.8, -11.1, -1, "ExtrudeLine", 11, 39));
        this.gridPoints.push(new CustomVector3(-1.8, -11.1, -3, "ExtrudeLine", 11, 40)); // esquina abajo rojo
        this.gridPoints.push(new CustomVector3(-1.8, -11.1, -5, "ExtrudeLine", 11, 41));
        this.gridPoints.push(new CustomVector3(-1.8, -11.1, -7, "ExtrudeLine", 11, 42)); // esquina abajo atras rojo > rosa
        this.gridPoints.push(new CustomVector3(-1.8, -10.1, -9, "ExtrudeLine", 11, 43));
        this.gridPoints.push(new CustomVector3(-1.8, -8.8, -9.9, "ExtrudeLine", 11, 44));
        this.gridPoints.push(new CustomVector3(-1.8, -7.1, -11, "ExtrudeLine", 11, 45)); // esquina abajo atras rosa
        //////////////////////////////////
        // Puntos ajustados al cerebelo //
        //////////////////////////////////
        this.gridPoints.push(new CustomVector3(-1.5, -5.7, -12.1, "ExtrudeLine", 11, 46));
        this.gridPoints.push(new CustomVector3(-1.5, -4.3, -13.2, "ExtrudeLine", 11, 47));
        this.gridPoints.push(new CustomVector3(-1.5, -3, -14.1, "ExtrudeLine", 11, 48)); // esquina atras rosa
        this.gridPoints.push(new CustomVector3(-1.5, -1.5, -14.1, "ExtrudeLine", 11, 49));
        this.gridPoints.push(new CustomVector3(-1.5, 0, -14.1, "ExtrudeLine", 11, 50));

        /////////////////////
        /* Linea 12 extrude */
        /////////////////////

        this.gridPoints.push(new CustomVector3(-2.5, 1, -14.1, "ExtrudeLine", 12, 0)); //esquina amarilla atras rosa > amarillo
        this.gridPoints.push(new CustomVector3(-2.5, 2.7, -13.8, "ExtrudeLine", 12, 1));
        this.gridPoints.push(new CustomVector3(-2.5, 4.3, -13.5, "ExtrudeLine", 12, 2));
        this.gridPoints.push(new CustomVector3(-2.5, 5.9, -13.1, "ExtrudeLine", 12, 3)); //esquina atras arriba amarilla
        this.gridPoints.push(new CustomVector3(-2.5, 6.8, -11.9, "ExtrudeLine", 12, 4));
        this.gridPoints.push(new CustomVector3(-2.5, 7.6, -10.5, "ExtrudeLine", 12, 5));
        this.gridPoints.push(new CustomVector3(-2.5, 8.5, -8.9, "ExtrudeLine", 12, 6));
        this.gridPoints.push(new CustomVector3(-2.5, 9.3, -7.5, "ExtrudeLine", 12, 7));
        this.gridPoints.push(new CustomVector3(-2.5, 10.1, -6, "ExtrudeLine", 12, 8)); // esquina amarilla arriba
        this.gridPoints.push(new CustomVector3(-2.5, 10.1, -4.4, "ExtrudeLine", 12, 9));
        this.gridPoints.push(new CustomVector3(-2.5, 10.1, -2.8, "ExtrudeLine", 12, 10));
        this.gridPoints.push(new CustomVector3(-2.5, 10.1, -1.2, "ExtrudeLine", 12, 11));
        this.gridPoints.push(new CustomVector3(-2.5, 10.1, 0, "ExtrudeLine", 12, 12));  /// borde amarillo > azul
        this.gridPoints.push(new CustomVector3(-2.5, 10.1, 1.6, "ExtrudeLine", 12, 13));
        this.gridPoints.push(new CustomVector3(-2.5, 10.1, 3.2, "ExtrudeLine", 12, 14));
        this.gridPoints.push(new CustomVector3(-2.5, 10.1, 4.8, "ExtrudeLine", 12, 15));
        this.gridPoints.push(new CustomVector3(-2.5, 10.1, 6.4, "ExtrudeLine", 12, 16));
        this.gridPoints.push(new CustomVector3(-2.5, 10.1, 8, "ExtrudeLine", 12, 17)); /// Esquina arriba azul
        this.gridPoints.push(new CustomVector3(-2.5, 9.1, 9.6, "ExtrudeLine", 12, 18));
        this.gridPoints.push(new CustomVector3(-2.5, 8, 11.2, "ExtrudeLine", 12, 19));
        this.gridPoints.push(new CustomVector3(-2.5, 7, 12.7, "ExtrudeLine", 12, 20));
        this.gridPoints.push(new CustomVector3(-2.5, 6, 14.1, "ExtrudeLine", 12, 21)); /// Esquina frente arriba azul
        this.gridPoints.push(new CustomVector3(-2.5, 4.8, 14.4, "ExtrudeLine", 12, 22));
        this.gridPoints.push(new CustomVector3(-2.5, 3.1, 14.8, "ExtrudeLine", 12, 23));
        this.gridPoints.push(new CustomVector3(-2.5, 2, 15.1, "ExtrudeLine", 12, 24)); /// Esquina frente azul
        this.gridPoints.push(new CustomVector3(-2.5, 0.6, 14.8, "ExtrudeLine", 12, 25));
        this.gridPoints.push(new CustomVector3(-2.5, -0.8, 14.4, "ExtrudeLine", 12, 26));
        this.gridPoints.push(new CustomVector3(-2.5, -2.3, 13.9, "ExtrudeLine", 12, 27));
        this.gridPoints.push(new CustomVector3(-2.5, -3.7, 13.5, "ExtrudeLine", 12, 28));
        this.gridPoints.push(new CustomVector3(-2.5, -5, 13.1, "ExtrudeLine", 12, 29)); // esquina abajo azul
        this.gridPoints.push(new CustomVector3(-2.5, -5.1, 11.5, "ExtrudeLine", 12, 30));
        this.gridPoints.push(new CustomVector3(-2.5, -5.1, 10.2, "ExtrudeLine", 12, 31));
        this.gridPoints.push(new CustomVector3(-2.5, -5.1, 8.9, "ExtrudeLine", 12, 32)); // borde abajo azul > rojo
        this.gridPoints.push(new CustomVector3(-2.5, -5.1, 7.3, "ExtrudeLine", 12, 33));
        this.gridPoints.push(new CustomVector3(-2.5, -5.1, 5.7, "ExtrudeLine", 12, 34));
        this.gridPoints.push(new CustomVector3(-2.5, -5.1, 4.1, "ExtrudeLine", 12, 35));
        this.gridPoints.push(new CustomVector3(-2.5, -5.1, 2.5, "ExtrudeLine", 12, 36));
        //////////////////////////////////
        // Puntos ajustados al cerebelo //
        //////////////////////////////////
        this.gridPoints.push(new CustomVector3(-3, -5.1, 0.8, "ExtrudeLine", 12, 37));
        this.gridPoints.push(new CustomVector3(-3, -10, 1.1, "ExtrudeLine", 12, 38)); // esquina abajo rojo
        this.gridPoints.push(new CustomVector3(-3, -11.1, -1, "ExtrudeLine", 12, 39));
        this.gridPoints.push(new CustomVector3(-3, -11.1, -3, "ExtrudeLine", 12, 40)); // esquina abajo rojo
        this.gridPoints.push(new CustomVector3(-3, -11.1, -5, "ExtrudeLine", 12, 41));
        this.gridPoints.push(new CustomVector3(-3, -11.1, -7, "ExtrudeLine", 12, 42)); // esquina abajo atras rojo > rosa
        this.gridPoints.push(new CustomVector3(-3, -10.1, -9, "ExtrudeLine", 12, 43));
        this.gridPoints.push(new CustomVector3(-3, -8.8, -9.9, "ExtrudeLine", 12, 44));
        this.gridPoints.push(new CustomVector3(-3, -7.1, -11, "ExtrudeLine", 12, 45)); // esquina abajo atras rosa
        //////////////////////////////////
        // Puntos ajustados al cerebelo //
        //////////////////////////////////
        this.gridPoints.push(new CustomVector3(-2.5, -5.7, -12.1, "ExtrudeLine", 12, 46));
        this.gridPoints.push(new CustomVector3(-2.5, -4.3, -13.2, "ExtrudeLine", 12, 47));
        this.gridPoints.push(new CustomVector3(-2.5, -3, -14.1, "ExtrudeLine", 12, 48)); // esquina atras rosa
        this.gridPoints.push(new CustomVector3(-2.5, -1.5, -14.1, "ExtrudeLine", 12, 49));
        this.gridPoints.push(new CustomVector3(-2.5, 0, -14.1, "ExtrudeLine", 12, 50));

        /////////////////////
        /* Linea 13 extrude */
        /////////////////////

        this.gridPoints.push(new CustomVector3(-3.5, 1, -14.1, "ExtrudeLine", 13, 0)); //esquina amarilla atras rosa > amarillo
        this.gridPoints.push(new CustomVector3(-3.5, 2.7, -13.8, "ExtrudeLine", 13, 1));
        this.gridPoints.push(new CustomVector3(-3.5, 4.3, -13.5, "ExtrudeLine", 13, 2));
        this.gridPoints.push(new CustomVector3(-3.5, 5.9, -13.1, "ExtrudeLine", 13, 3)); //esquina atras arriba amarilla
        this.gridPoints.push(new CustomVector3(-3.5, 6.8, -11.9, "ExtrudeLine", 13, 4));
        this.gridPoints.push(new CustomVector3(-3.5, 7.6, -10.5, "ExtrudeLine", 13, 5));
        this.gridPoints.push(new CustomVector3(-3.5, 8.5, -8.9, "ExtrudeLine", 13, 6));
        this.gridPoints.push(new CustomVector3(-3.5, 9.3, -7.5, "ExtrudeLine", 13, 7));
        this.gridPoints.push(new CustomVector3(-3.5, 10.1, -6, "ExtrudeLine", 13, 8)); // esquina amarilla arriba
        this.gridPoints.push(new CustomVector3(-3.5, 10.1, -4.4, "ExtrudeLine", 13, 9));
        this.gridPoints.push(new CustomVector3(-3.5, 10.1, -2.8, "ExtrudeLine", 13, 10));
        this.gridPoints.push(new CustomVector3(-3.5, 10.1, -1.2, "ExtrudeLine", 13, 11));
        this.gridPoints.push(new CustomVector3(-3.5, 10.1, 0, "ExtrudeLine", 13, 12));  /// borde amarillo > azul
        this.gridPoints.push(new CustomVector3(-3.5, 10.1, 1.6, "ExtrudeLine", 13, 13));
        this.gridPoints.push(new CustomVector3(-3.5, 10.1, 3.2, "ExtrudeLine", 13, 14));
        this.gridPoints.push(new CustomVector3(-3.5, 10.1, 4.8, "ExtrudeLine", 13, 15));
        this.gridPoints.push(new CustomVector3(-3.5, 10.1, 6.4, "ExtrudeLine", 13, 16));
        this.gridPoints.push(new CustomVector3(-3.5, 10.1, 8, "ExtrudeLine", 13, 17)); /// Esquina arriba azul
        this.gridPoints.push(new CustomVector3(-3.5, 9.1, 9.6, "ExtrudeLine", 13, 18));
        this.gridPoints.push(new CustomVector3(-3.5, 8, 11.2, "ExtrudeLine", 13, 19));
        this.gridPoints.push(new CustomVector3(-3.5, 7, 12.7, "ExtrudeLine", 13, 20));
        this.gridPoints.push(new CustomVector3(-3.5, 6, 14.1, "ExtrudeLine", 13, 21)); /// Esquina frente arriba azul
        this.gridPoints.push(new CustomVector3(-3.5, 4.8, 14.4, "ExtrudeLine", 13, 22));
        this.gridPoints.push(new CustomVector3(-3.5, 3.1, 14.8, "ExtrudeLine", 13, 23));
        this.gridPoints.push(new CustomVector3(-3.5, 2, 15.1, "ExtrudeLine", 13, 24)); /// Esquina frente azul
        this.gridPoints.push(new CustomVector3(-3.5, 0.6, 14.8, "ExtrudeLine", 13, 25));
        this.gridPoints.push(new CustomVector3(-3.5, -0.8, 14.4, "ExtrudeLine", 13, 26));
        this.gridPoints.push(new CustomVector3(-3.5, -2.3, 13.9, "ExtrudeLine", 13, 27));
        this.gridPoints.push(new CustomVector3(-3.5, -3.7, 13.5, "ExtrudeLine", 13, 28));
        this.gridPoints.push(new CustomVector3(-3.5, -5, 13.1, "ExtrudeLine", 13, 29)); // esquina abajo azul
        this.gridPoints.push(new CustomVector3(-3.5, -5.1, 11.5, "ExtrudeLine", 13, 30));
        this.gridPoints.push(new CustomVector3(-3.5, -5.1, 10.2, "ExtrudeLine", 13, 31));
        this.gridPoints.push(new CustomVector3(-3.5, -5.1, 8.9, "ExtrudeLine", 13, 32)); // borde abajo azul > rojo
        this.gridPoints.push(new CustomVector3(-3.5, -5.1, 7.3, "ExtrudeLine", 13, 33));
        this.gridPoints.push(new CustomVector3(-3.5, -5.1, 5.7, "ExtrudeLine", 13, 34));
        this.gridPoints.push(new CustomVector3(-3.5, -5.1, 4.1, "ExtrudeLine", 13, 35));
        this.gridPoints.push(new CustomVector3(-3.5, -5.1, 2.5, "ExtrudeLine", 13, 36));
        //////////////////////////////////
        // Puntos ajustados al cerebelo //
        //////////////////////////////////
        this.gridPoints.push(new CustomVector3(-4.2, -5.1, 0.8, "ExtrudeLine", 13, 37));
        this.gridPoints.push(new CustomVector3(-4.2, -10, 1.1, "ExtrudeLine", 13, 38)); // esquina abajo rojo
        this.gridPoints.push(new CustomVector3(-4.2, -11.1, -1, "ExtrudeLine", 13, 39));
        this.gridPoints.push(new CustomVector3(-4.2, -11.1, -3, "ExtrudeLine", 13, 40)); // esquina abajo rojo
        this.gridPoints.push(new CustomVector3(-4.2, -11.1, -5, "ExtrudeLine", 13, 41));
        this.gridPoints.push(new CustomVector3(-4.2, -11.1, -7, "ExtrudeLine", 13, 42)); // esquina abajo atras rojo > rosa
        this.gridPoints.push(new CustomVector3(-4.2, -10.1, -9, "ExtrudeLine", 13, 43));
        this.gridPoints.push(new CustomVector3(-4.2, -8.8, -9.9, "ExtrudeLine", 13, 44));
        this.gridPoints.push(new CustomVector3(-4.2, -7.1, -11, "ExtrudeLine", 13, 45)); // esquina abajo atras rosa
        //////////////////////////////////
        // Puntos ajustados al cerebelo //
        //////////////////////////////////
        this.gridPoints.push(new CustomVector3(-3.5, -5.7, -12.1, "ExtrudeLine", 13, 46));
        this.gridPoints.push(new CustomVector3(-3.5, -4.3, -13.2, "ExtrudeLine", 13, 47));
        this.gridPoints.push(new CustomVector3(-3.5, -3, -14.1, "ExtrudeLine", 13, 48)); // esquina atras rosa
        this.gridPoints.push(new CustomVector3(-3.5, -1.5, -14.1, "ExtrudeLine", 13, 49));
        this.gridPoints.push(new CustomVector3(-3.5, 0, -14.1, "ExtrudeLine", 13, 50));

        /////////////////////
        /* Linea 14 extrude */
        /////////////////////

        this.gridPoints.push(new CustomVector3(-4.5, 1, -14.1, "ExtrudeLine", 14, 0)); //esquina amarilla atras rosa > amarillo
        this.gridPoints.push(new CustomVector3(-4.5, 2.7, -13.8, "ExtrudeLine", 14, 1));
        this.gridPoints.push(new CustomVector3(-4.5, 4.3, -13.5, "ExtrudeLine", 14, 2));
        this.gridPoints.push(new CustomVector3(-4.5, 5.9, -13.1, "ExtrudeLine", 14, 3)); //esquina atras arriba amarilla
        this.gridPoints.push(new CustomVector3(-4.5, 6.8, -11.9, "ExtrudeLine", 14, 4));
        this.gridPoints.push(new CustomVector3(-4.5, 7.6, -10.5, "ExtrudeLine", 14, 5));
        this.gridPoints.push(new CustomVector3(-4.5, 8.5, -8.9, "ExtrudeLine", 14, 6));
        this.gridPoints.push(new CustomVector3(-4.5, 9.3, -7.5, "ExtrudeLine", 14, 7));
        this.gridPoints.push(new CustomVector3(-4.5, 10.1, -6, "ExtrudeLine", 14, 8)); // esquina amarilla arriba
        this.gridPoints.push(new CustomVector3(-4.5, 10.1, -4.4, "ExtrudeLine", 14, 9));
        this.gridPoints.push(new CustomVector3(-4.5, 10.1, -2.8, "ExtrudeLine", 14, 10));
        this.gridPoints.push(new CustomVector3(-4.5, 10.1, -1.2, "ExtrudeLine", 14, 11));
        this.gridPoints.push(new CustomVector3(-4.5, 10.1, 0, "ExtrudeLine", 14, 12));  /// borde amarillo > azul
        this.gridPoints.push(new CustomVector3(-4.5, 10.1, 1.6, "ExtrudeLine", 14, 13));
        this.gridPoints.push(new CustomVector3(-4.5, 10.1, 3.2, "ExtrudeLine", 14, 14));
        this.gridPoints.push(new CustomVector3(-4.5, 10.1, 4.8, "ExtrudeLine", 14, 15));
        this.gridPoints.push(new CustomVector3(-4.5, 10.1, 6.4, "ExtrudeLine", 14, 16));
        this.gridPoints.push(new CustomVector3(-4.5, 10.1, 8, "ExtrudeLine", 14, 17)); /// Esquina arriba azul
        this.gridPoints.push(new CustomVector3(-4.5, 9.1, 9.6, "ExtrudeLine", 14, 18));
        this.gridPoints.push(new CustomVector3(-4.5, 8, 11.2, "ExtrudeLine", 14, 19));
        this.gridPoints.push(new CustomVector3(-4.5, 7, 12.7, "ExtrudeLine", 14, 20));
        this.gridPoints.push(new CustomVector3(-4.5, 6, 14.1, "ExtrudeLine", 14, 21)); /// Esquina frente arriba azul
        this.gridPoints.push(new CustomVector3(-4.5, 4.8, 14.4, "ExtrudeLine", 14, 22));
        this.gridPoints.push(new CustomVector3(-4.5, 3.1, 14.8, "ExtrudeLine", 14, 23));
        this.gridPoints.push(new CustomVector3(-4.5, 2, 15.1, "ExtrudeLine", 14, 24)); /// Esquina frente azul
        this.gridPoints.push(new CustomVector3(-4.5, 0.6, 14.8, "ExtrudeLine", 14, 25));
        this.gridPoints.push(new CustomVector3(-4.5, -0.8, 14.4, "ExtrudeLine", 14, 26));
        this.gridPoints.push(new CustomVector3(-4.5, -2.3, 13.9, "ExtrudeLine", 14, 27));
        this.gridPoints.push(new CustomVector3(-4.5, -3.7, 13.5, "ExtrudeLine", 14, 28));
        this.gridPoints.push(new CustomVector3(-4.5, -5, 13.1, "ExtrudeLine", 14, 29)); // esquina abajo azul
        this.gridPoints.push(new CustomVector3(-4.5, -5.1, 11.5, "ExtrudeLine", 14, 30));
        this.gridPoints.push(new CustomVector3(-4.5, -5.1, 10.2, "ExtrudeLine", 14, 31));
        this.gridPoints.push(new CustomVector3(-4.5, -5.1, 8.9, "ExtrudeLine", 14, 32)); // borde abajo azul > rojo
        this.gridPoints.push(new CustomVector3(-4.5, -5.1, 7.3, "ExtrudeLine", 14, 33));
        this.gridPoints.push(new CustomVector3(-4.5, -5.1, 5.7, "ExtrudeLine", 14, 34));
        this.gridPoints.push(new CustomVector3(-4.5, -5.1, 4.1, "ExtrudeLine", 14, 35));
        this.gridPoints.push(new CustomVector3(-4.5, -5.1, 2.5, "ExtrudeLine", 14, 36));
        //////////////////////////////////
        // Puntos ajustados al cerebelo //
        //////////////////////////////////

        this.gridPoints.push(new CustomVector3(-5.5, -5.1, 2.5, "ExtrudeLine", 14, 37));
        this.gridPoints.push(new CustomVector3(-5.5, -10, 1.1, "ExtrudeLine", 14, 38)); // esquina abajo rojo
        this.gridPoints.push(new CustomVector3(-5.5, -11.1, -1, "ExtrudeLine", 14, 39));
        this.gridPoints.push(new CustomVector3(-5.5, -11.1, -3, "ExtrudeLine", 14, 40)); // esquina abajo rojo
        this.gridPoints.push(new CustomVector3(-5.5, -11.1, -5, "ExtrudeLine", 14, 41));
        this.gridPoints.push(new CustomVector3(-5.5, -11.1, -7, "ExtrudeLine", 14, 42)); // esquina abajo atras rojo > rosa
        this.gridPoints.push(new CustomVector3(-5.5, -10.1, -9, "ExtrudeLine", 14, 43));
        this.gridPoints.push(new CustomVector3(-5.5, -8.8, -9.9, "ExtrudeLine", 14, 44));
        this.gridPoints.push(new CustomVector3(-5.5, -7.1, -11, "ExtrudeLine", 14, 45)); // esquina abajo atras rosa

        //////////////////////////////////
        // Puntos ajustados al cerebelo //
        //////////////////////////////////
        this.gridPoints.push(new CustomVector3(-4.5, -5.7, -12.1, "ExtrudeLine", 14, 46));
        this.gridPoints.push(new CustomVector3(-4.5, -4.3, -13.2, "ExtrudeLine", 14, 47));
        this.gridPoints.push(new CustomVector3(-4.5, -3, -14.1, "ExtrudeLine", 14, 48)); // esquina atras rosa
        this.gridPoints.push(new CustomVector3(-4.5, -1.5, -14.1, "ExtrudeLine", 14, 49));
        this.gridPoints.push(new CustomVector3(-4.5, 0, -14.1, "ExtrudeLine", 14, 50));


        /////////////////////
        /* Linea 15 extrude */
        /////////////////////

        this.gridPoints.push(new CustomVector3(-5.5, 1, -14.1, "ExtrudeLine", 15, 0)); //esquina amarilla atras rosa > amarillo
        this.gridPoints.push(new CustomVector3(-5.5, 2.7, -13.8, "ExtrudeLine", 15, 1));
        this.gridPoints.push(new CustomVector3(-5.5, 4.3, -13.5, "ExtrudeLine", 15, 2));
        this.gridPoints.push(new CustomVector3(-5.5, 5.9, -13.1, "ExtrudeLine", 15, 3)); //esquina atras arriba amarilla
        this.gridPoints.push(new CustomVector3(-5.5, 6.8, -11.9, "ExtrudeLine", 15, 4));
        this.gridPoints.push(new CustomVector3(-5.5, 7.6, -10.5, "ExtrudeLine", 15, 5));
        this.gridPoints.push(new CustomVector3(-5.5, 8.5, -8.9, "ExtrudeLine", 15, 6));
        this.gridPoints.push(new CustomVector3(-5.5, 9.3, -7.5, "ExtrudeLine", 15, 7));
        this.gridPoints.push(new CustomVector3(-5.5, 10.1, -6, "ExtrudeLine", 15, 8)); // esquina amarilla arriba
        this.gridPoints.push(new CustomVector3(-5.5, 10.1, -4.4, "ExtrudeLine", 15, 9));
        this.gridPoints.push(new CustomVector3(-5.5, 10.1, -2.8, "ExtrudeLine", 15, 10));
        this.gridPoints.push(new CustomVector3(-5.5, 10.1, -1.2, "ExtrudeLine", 15, 11));
        this.gridPoints.push(new CustomVector3(-5.5, 10.1, 0, "ExtrudeLine", 15, 12));  /// borde amarillo > azul
        this.gridPoints.push(new CustomVector3(-5.5, 10.1, 1.6, "ExtrudeLine", 15, 13));
        this.gridPoints.push(new CustomVector3(-5.5, 10.1, 3.2, "ExtrudeLine", 15, 14));
        this.gridPoints.push(new CustomVector3(-5.5, 10.1, 4.8, "ExtrudeLine", 15, 15));
        this.gridPoints.push(new CustomVector3(-5.5, 10.1, 6.4, "ExtrudeLine", 15, 16));
        this.gridPoints.push(new CustomVector3(-5.5, 10.1, 8, "ExtrudeLine", 15, 17)); /// Esquina arriba azul
        this.gridPoints.push(new CustomVector3(-5.5, 9.1, 9.6, "ExtrudeLine", 15, 18));
        this.gridPoints.push(new CustomVector3(-5.5, 8, 11.2, "ExtrudeLine", 15, 19));
        this.gridPoints.push(new CustomVector3(-5.5, 7, 12.7, "ExtrudeLine", 15, 20));
        this.gridPoints.push(new CustomVector3(-5.5, 6, 14.1, "ExtrudeLine", 15, 21)); /// Esquina frente arriba azul
        this.gridPoints.push(new CustomVector3(-5.5, 4.8, 14.4, "ExtrudeLine", 15, 22));
        this.gridPoints.push(new CustomVector3(-5.5, 3.1, 14.8, "ExtrudeLine", 15, 23));
        this.gridPoints.push(new CustomVector3(-5.5, 2, 15.1, "ExtrudeLine", 15, 24)); /// Esquina frente azul
        this.gridPoints.push(new CustomVector3(-5.5, 0.6, 14.8, "ExtrudeLine", 15, 25));
        this.gridPoints.push(new CustomVector3(-5.5, -0.8, 14.4, "ExtrudeLine", 15, 26));
        this.gridPoints.push(new CustomVector3(-5.5, -2.3, 13.9, "ExtrudeLine", 15, 27));
        this.gridPoints.push(new CustomVector3(-5.5, -3.7, 13.5, "ExtrudeLine", 15, 28));
        this.gridPoints.push(new CustomVector3(-5.5, -5, 13.1, "ExtrudeLine", 15, 29)); // esquina abajo azul
        this.gridPoints.push(new CustomVector3(-5.5, -5.1, 11.5, "ExtrudeLine", 15, 30));
        this.gridPoints.push(new CustomVector3(-5.5, -5.1, 10.2, "ExtrudeLine", 15, 31));
        this.gridPoints.push(new CustomVector3(-5.5, -5.1, 8.9, "ExtrudeLine", 15, 32)); // borde abajo azul > rojo
        this.gridPoints.push(new CustomVector3(-5.5, -5.1, 7.3, "ExtrudeLine", 15, 33));
        this.gridPoints.push(new CustomVector3(-5.5, -5.1, 5.7, "ExtrudeLine", 15, 34));
        this.gridPoints.push(new CustomVector3(-5.5, -5.1, 4.1, "ExtrudeLine", 15, 35));
        this.gridPoints.push(new CustomVector3(-5.5, -5.1, 2.5, "ExtrudeLine", 15, 36));
        //////////////////////////////////
        // Puntos ajustados al cerebelo //
        //////////////////////////////////

        this.gridPoints.push(new CustomVector3(-6.5, -5.1, 1.4, "ExtrudeLine", 15, 37));
        this.gridPoints.push(new CustomVector3(-6.5, -9.3, 0.2, "ExtrudeLine", 15, 38)); // esquina abajo rojo
        this.gridPoints.push(new CustomVector3(-6.5, -10, -1.3, "ExtrudeLine", 15, 39));
        this.gridPoints.push(new CustomVector3(-6.5, -10, -3.3, "ExtrudeLine", 15, 40)); // esquina abajo rojo
        this.gridPoints.push(new CustomVector3(-6.5, -10, -5.1, "ExtrudeLine", 15, 41));
        this.gridPoints.push(new CustomVector3(-6.5, -10, -6.8, "ExtrudeLine", 15, 42)); // esquina abajo atras rojo > rosa
        this.gridPoints.push(new CustomVector3(-6.5, -9.3, -8.3, "ExtrudeLine", 15, 43));
        this.gridPoints.push(new CustomVector3(-6.5, -7.1, -9.8, "ExtrudeLine", 15, 44));
        this.gridPoints.push(new CustomVector3(-5.4, -7.1, -11, "ExtrudeLine", 15, 45)); // esquina abajo atras rosa

        //////////////////////////////////
        // Puntos ajustados al cerebelo //
        //////////////////////////////////
        this.gridPoints.push(new CustomVector3(-5.5, -5.7, -12.1, "ExtrudeLine", 15, 46));
        this.gridPoints.push(new CustomVector3(-5.5, -4.3, -13.2, "ExtrudeLine", 15, 47));
        this.gridPoints.push(new CustomVector3(-5.5, -3, -14.1, "ExtrudeLine", 15, 48)); // esquina atras rosa
        this.gridPoints.push(new CustomVector3(-5.5, -1.5, -14.1, "ExtrudeLine", 15, 49));
        this.gridPoints.push(new CustomVector3(-5.5, 0, -14.1, "ExtrudeLine", 15, 50));

        /////////////////////
        /* Linea 16 extrude */
        /////////////////////

        this.gridPoints.push(new CustomVector3(-6.5, 1, -14.1, "ExtrudeLine", 16, 0)); //esquina amarilla atras rosa > amarillo
        this.gridPoints.push(new CustomVector3(-6.5, 2.7, -13.8, "ExtrudeLine", 16, 1));
        this.gridPoints.push(new CustomVector3(-6.5, 4.3, -13.5, "ExtrudeLine", 16, 2));
        this.gridPoints.push(new CustomVector3(-6.5, 5.9, -13.1, "ExtrudeLine", 16, 3)); //esquina atras arriba amarilla
        this.gridPoints.push(new CustomVector3(-6.5, 6.8, -11.9, "ExtrudeLine", 16, 4));
        this.gridPoints.push(new CustomVector3(-6.5, 7.6, -10.5, "ExtrudeLine", 16, 5));
        this.gridPoints.push(new CustomVector3(-6.5, 8.5, -8.9, "ExtrudeLine", 16, 6));
        this.gridPoints.push(new CustomVector3(-6.5, 9.3, -7.5, "ExtrudeLine", 16, 7));
        this.gridPoints.push(new CustomVector3(-6.5, 10.1, -6, "ExtrudeLine", 16, 8)); // esquina amarilla arriba
        this.gridPoints.push(new CustomVector3(-6.5, 10.1, -4.4, "ExtrudeLine", 16, 9));
        this.gridPoints.push(new CustomVector3(-6.5, 10.1, -2.8, "ExtrudeLine", 16, 10));
        this.gridPoints.push(new CustomVector3(-6.5, 10.1, -1.2, "ExtrudeLine", 16, 11));
        this.gridPoints.push(new CustomVector3(-6.5, 10.1, 0, "ExtrudeLine", 16, 12));  /// borde amarillo > azul
        this.gridPoints.push(new CustomVector3(-6.5, 10.1, 1.6, "ExtrudeLine", 16, 13));
        this.gridPoints.push(new CustomVector3(-6.5, 10.1, 3.2, "ExtrudeLine", 16, 14));
        this.gridPoints.push(new CustomVector3(-6.5, 10.1, 4.8, "ExtrudeLine", 16, 15));
        this.gridPoints.push(new CustomVector3(-6.5, 10.1, 6.4, "ExtrudeLine", 16, 16));
        this.gridPoints.push(new CustomVector3(-6.5, 10.1, 8, "ExtrudeLine", 16, 17)); /// Esquina arriba azul
        this.gridPoints.push(new CustomVector3(-6.5, 9.1, 9.6, "ExtrudeLine", 16, 18));
        this.gridPoints.push(new CustomVector3(-6.5, 8, 11.2, "ExtrudeLine", 16, 19));
        this.gridPoints.push(new CustomVector3(-6.5, 7, 12.7, "ExtrudeLine", 16, 20));
        this.gridPoints.push(new CustomVector3(-6.5, 6, 14.1, "ExtrudeLine", 16, 21)); /// Esquina frente arriba azul
        this.gridPoints.push(new CustomVector3(-6.5, 4.8, 14.4, "ExtrudeLine", 16, 22));
        this.gridPoints.push(new CustomVector3(-6.5, 3.1, 14.8, "ExtrudeLine", 16, 23));
        this.gridPoints.push(new CustomVector3(-6.5, 2, 15.1, "ExtrudeLine", 16, 24)); /// Esquina frente azul
        this.gridPoints.push(new CustomVector3(-6.5, 0.6, 14.8, "ExtrudeLine", 16, 25));
        this.gridPoints.push(new CustomVector3(-6.5, -0.8, 14.4, "ExtrudeLine", 16, 26));
        this.gridPoints.push(new CustomVector3(-6.5, -2.3, 13.9, "ExtrudeLine", 16, 27));
        this.gridPoints.push(new CustomVector3(-6.5, -3.7, 13.5, "ExtrudeLine", 16, 28));
        this.gridPoints.push(new CustomVector3(-6.5, -5, 13.1, "ExtrudeLine", 16, 29)); // esquina abajo azul
        this.gridPoints.push(new CustomVector3(-6.5, -5.1, 11.5, "ExtrudeLine", 16, 30));
        this.gridPoints.push(new CustomVector3(-6.5, -5.1, 10.2, "ExtrudeLine", 16, 31));
        this.gridPoints.push(new CustomVector3(-6.5, -5.1, 8.9, "ExtrudeLine", 16, 32)); // borde abajo azul > rojo
        this.gridPoints.push(new CustomVector3(-6.5, -5.1, 7.3, "ExtrudeLine", 16, 33));
        this.gridPoints.push(new CustomVector3(-6.5, -5.1, 5.7, "ExtrudeLine", 16, 34));
        this.gridPoints.push(new CustomVector3(-6.5, -5.1, 4.1, "ExtrudeLine", 16, 35));
        this.gridPoints.push(new CustomVector3(-6.5, -5.1, 2.5, "ExtrudeLine", 16, 36));
        //////////////////////////////////
        // Puntos ajustados al cerebelo //
        //////////////////////////////////

        this.gridPoints.push(new CustomVector3(-6.5, -5.1, 1.4, "ExtrudeLine", 16, 37));  //                                       <<<<<<<<    Aquí comienza cerebelo
        this.gridPoints.push(new CustomVector3(-6.5, -7, -0.4, "ExtrudeLine", 16, 38)); // esquina abajo rojo
        this.gridPoints.push(new CustomVector3(-6.5, -8.4, -1.8, "ExtrudeLine", 16, 39));
        this.gridPoints.push(new CustomVector3(-6.5, -8.4, -3.5, "ExtrudeLine", 16, 40)); // esquina abajo rojo
        this.gridPoints.push(new CustomVector3(-6.5, -8.4, -5, "ExtrudeLine", 16, 41));
        this.gridPoints.push(new CustomVector3(-6.5, -8.4, -6.3, "ExtrudeLine", 16, 42)); // esquina abajo atras rojo > rosa         <<<<<<<
        this.gridPoints.push(new CustomVector3(-6.5, -8, -7.7, "ExtrudeLine", 16, 43));
        this.gridPoints.push(new CustomVector3(-6.5, -7.1, -8.6, "ExtrudeLine", 16, 44));
        this.gridPoints.push(new CustomVector3(-6.5, -7.1, -10.8, "ExtrudeLine", 16, 45)); // esquina abajo atras rosa             <<<<<<<<   Aquí termina cerebelo

        //////////////////////////////////
        // Puntos ajustados al cerebelo //
        //////////////////////////////////
        this.gridPoints.push(new CustomVector3(-6.5, -5.7, -12.1, "ExtrudeLine", 16, 46));
        this.gridPoints.push(new CustomVector3(-6.5, -4.3, -13.2, "ExtrudeLine", 16, 47));
        this.gridPoints.push(new CustomVector3(-6.5, -3, -14.1, "ExtrudeLine", 16, 48)); // esquina atras rosa
        this.gridPoints.push(new CustomVector3(-6.5, -1.5, -14.1, "ExtrudeLine", 16, 49));
        this.gridPoints.push(new CustomVector3(-6.5, 0, -14.1, "ExtrudeLine", 16, 50));

        /////////////////////
        /* Linea 17 extrude */
        //////////////////////

        this.gridPoints.push(new CustomVector3(-7.5, 1, -14.1, "ExtrudeLine", 17, 0)); //esquina amarilla atras rosa > amarillo
        this.gridPoints.push(new CustomVector3(-7.5, 2.7, -13.8, "ExtrudeLine", 17, 1));
        this.gridPoints.push(new CustomVector3(-7.5, 4.3, -13.5, "ExtrudeLine", 17, 2));
        this.gridPoints.push(new CustomVector3(-7.5, 5.9, -13.1, "ExtrudeLine", 17, 3)); //esquina atras arriba amarilla
        this.gridPoints.push(new CustomVector3(-7.5, 6.8, -11.9, "ExtrudeLine", 17, 4));
        this.gridPoints.push(new CustomVector3(-7.5, 7.6, -10.5, "ExtrudeLine", 17, 5));
        this.gridPoints.push(new CustomVector3(-7.5, 8.5, -8.9, "ExtrudeLine", 17, 6));
        this.gridPoints.push(new CustomVector3(-7.5, 9.3, -7.5, "ExtrudeLine", 17, 7));
        this.gridPoints.push(new CustomVector3(-7.5, 10.1, -6, "ExtrudeLine", 17, 8)); // esquina amarilla arriba
        this.gridPoints.push(new CustomVector3(-7.5, 10.1, -4.4, "ExtrudeLine", 17, 9));
        this.gridPoints.push(new CustomVector3(-7.5, 10.1, -2.8, "ExtrudeLine", 17, 10));
        this.gridPoints.push(new CustomVector3(-7.5, 10.1, -1.2, "ExtrudeLine", 17, 11));
        this.gridPoints.push(new CustomVector3(-7.5, 10.1, 0, "ExtrudeLine", 17, 12));  /// borde amarillo > azul
        this.gridPoints.push(new CustomVector3(-7.5, 10.1, 1.6, "ExtrudeLine", 17, 13));
        this.gridPoints.push(new CustomVector3(-7.5, 10.1, 3.2, "ExtrudeLine", 17, 14));
        this.gridPoints.push(new CustomVector3(-7.5, 10.1, 4.8, "ExtrudeLine", 17, 15));
        this.gridPoints.push(new CustomVector3(-7.5, 10.1, 6.4, "ExtrudeLine", 17, 16));
        this.gridPoints.push(new CustomVector3(-7.5, 10.1, 8, "ExtrudeLine", 17, 17)); /// Esquina arriba azul
        this.gridPoints.push(new CustomVector3(-7.5, 9.1, 9.6, "ExtrudeLine", 17, 18));
        this.gridPoints.push(new CustomVector3(-7.5, 8, 11.2, "ExtrudeLine", 17, 19));
        this.gridPoints.push(new CustomVector3(-7.5, 7, 12.7, "ExtrudeLine", 17, 20));
        this.gridPoints.push(new CustomVector3(-7.5, 6, 14.1, "ExtrudeLine", 17, 21)); /// Esquina frente arriba azul
        this.gridPoints.push(new CustomVector3(-7.5, 4.8, 14.4, "ExtrudeLine", 17, 22));
        this.gridPoints.push(new CustomVector3(-7.5, 3.1, 14.8, "ExtrudeLine", 17, 23));
        this.gridPoints.push(new CustomVector3(-7.5, 2, 15.1, "ExtrudeLine", 17, 24)); /// Esquina frente azul
        this.gridPoints.push(new CustomVector3(-7.5, 0.6, 14.8, "ExtrudeLine", 17, 25));
        this.gridPoints.push(new CustomVector3(-7.5, -0.8, 14.4, "ExtrudeLine", 17, 26));
        this.gridPoints.push(new CustomVector3(-7.5, -2.3, 13.9, "ExtrudeLine", 17, 27));
        this.gridPoints.push(new CustomVector3(-7.5, -3.7, 13.5, "ExtrudeLine", 17, 28));
        this.gridPoints.push(new CustomVector3(-7.5, -5, 13.1, "ExtrudeLine", 17, 29)); // esquina abajo azul
        this.gridPoints.push(new CustomVector3(-7.5, -5.1, 11.5, "ExtrudeLine", 17, 30));
        this.gridPoints.push(new CustomVector3(-7.5, -5.1, 10.2, "ExtrudeLine", 17, 31));
        this.gridPoints.push(new CustomVector3(-7.5, -5.1, 8.9, "ExtrudeLine", 17, 32)); // borde abajo azul > rojo
        this.gridPoints.push(new CustomVector3(-7.5, -5.1, 7.3, "ExtrudeLine", 17, 33));
        this.gridPoints.push(new CustomVector3(-7.5, -5.1, 5.7, "ExtrudeLine", 17, 34));
        this.gridPoints.push(new CustomVector3(-7.5, -5.1, 4.1, "ExtrudeLine", 17, 35));
        this.gridPoints.push(new CustomVector3(-7.5, -5.1, 2.5, "ExtrudeLine", 17, 36));
        //////////////////////////////////
        // Puntos ajustados al cerebelo //
        //////////////////////////////////

        this.gridPoints.push(new CustomVector3(-7.5, -5.1, 0.8, "ExtrudeLine", 17, 37));
        this.gridPoints.push(new CustomVector3(-6.5, -5.1, -0.9, "ExtrudeLine", 17, 38)); // esquina abajo rojo
        this.gridPoints.push(new CustomVector3(-6.5, -6.1, -1.9, "ExtrudeLine", 17, 39));
        this.gridPoints.push(new CustomVector3(-6.5, -7.1, -3, "ExtrudeLine", 17, 40)); // esquina abajo rojo
        this.gridPoints.push(new CustomVector3(-6.5, -7.1, -4.5, "ExtrudeLine", 17, 41));
        this.gridPoints.push(new CustomVector3(-6.5, -7.1, -6, "ExtrudeLine", 17, 42)); // esquina abajo atras rojo > rosa
        this.gridPoints.push(new CustomVector3(-6.5, -7.1, -7.2, "ExtrudeLine", 17, 43));
        this.gridPoints.push(new CustomVector3(-7.5, -7.1, -8.4, "ExtrudeLine", 17, 44));
        this.gridPoints.push(new CustomVector3(-7.5, -7.1, -10.8, "ExtrudeLine", 17, 45)); // esquina abajo atras rosa

        //////////////////////////////////
        // Puntos ajustados al cerebelo //
        //////////////////////////////////
        this.gridPoints.push(new CustomVector3(-7.5, -5.7, -12.1, "ExtrudeLine", 17, 46));
        this.gridPoints.push(new CustomVector3(-7.5, -4.3, -13.2, "ExtrudeLine", 17, 47));
        this.gridPoints.push(new CustomVector3(-7.5, -3, -14.1, "ExtrudeLine", 17, 48)); // esquina atras rosa
        this.gridPoints.push(new CustomVector3(-7.5, -1.5, -14.1, "ExtrudeLine", 17, 49));
        this.gridPoints.push(new CustomVector3(-7.5, 0, -14.1, "ExtrudeLine", 17, 50));

        /////////////////////
        /* Linea 18 extrude */
        //////////////////////

        this.gridPoints.push(new CustomVector3(-8.5, 1, -14.1, "ExtrudeLine", 18, 0)); //esquina amarilla atras rosa > amarillo
        this.gridPoints.push(new CustomVector3(-8.5, 2.7, -13.8, "ExtrudeLine", 18, 1));
        this.gridPoints.push(new CustomVector3(-8.5, 4.3, -13.5, "ExtrudeLine", 18, 2));
        this.gridPoints.push(new CustomVector3(-8.5, 5.9, -13.1, "ExtrudeLine", 18, 3)); //esquina atras arriba amarilla
        this.gridPoints.push(new CustomVector3(-8.5, 6.8, -11.9, "ExtrudeLine", 18, 4));
        this.gridPoints.push(new CustomVector3(-8.5, 7.6, -10.5, "ExtrudeLine", 18, 5));
        this.gridPoints.push(new CustomVector3(-8.5, 8.5, -8.9, "ExtrudeLine", 18, 6));
        this.gridPoints.push(new CustomVector3(-8.5, 9.3, -7.5, "ExtrudeLine", 18, 7));
        this.gridPoints.push(new CustomVector3(-8.5, 10.1, -6, "ExtrudeLine", 18, 8)); // esquina amarilla arriba
        this.gridPoints.push(new CustomVector3(-8.5, 10.1, -4.4, "ExtrudeLine", 18, 9));
        this.gridPoints.push(new CustomVector3(-8.5, 10.1, -2.8, "ExtrudeLine", 18, 10));
        this.gridPoints.push(new CustomVector3(-8.5, 10.1, -1.2, "ExtrudeLine", 18, 11));
        this.gridPoints.push(new CustomVector3(-8.5, 10.1, 0, "ExtrudeLine", 18, 12));  /// borde amarillo > azul
        this.gridPoints.push(new CustomVector3(-8.5, 10.1, 1.6, "ExtrudeLine", 18, 13));
        this.gridPoints.push(new CustomVector3(-8.5, 10.1, 3.2, "ExtrudeLine", 18, 14));
        this.gridPoints.push(new CustomVector3(-8.5, 10.1, 4.8, "ExtrudeLine", 18, 15));
        this.gridPoints.push(new CustomVector3(-8.5, 10.1, 6.4, "ExtrudeLine", 18, 16));
        this.gridPoints.push(new CustomVector3(-8.5, 10.1, 8, "ExtrudeLine", 18, 17)); /// Esquina arriba azul
        this.gridPoints.push(new CustomVector3(-8.5, 9.1, 9.6, "ExtrudeLine", 18, 18));
        this.gridPoints.push(new CustomVector3(-8.5, 8, 11.2, "ExtrudeLine", 18, 19));
        this.gridPoints.push(new CustomVector3(-8.5, 7, 12.7, "ExtrudeLine", 18, 20));
        this.gridPoints.push(new CustomVector3(-8.5, 6, 14.1, "ExtrudeLine", 18, 21)); /// Esquina frente arriba azul
        this.gridPoints.push(new CustomVector3(-8.5, 4.8, 14.4, "ExtrudeLine", 18, 22));
        this.gridPoints.push(new CustomVector3(-8.5, 3.1, 14.8, "ExtrudeLine", 18, 23));
        this.gridPoints.push(new CustomVector3(-8.5, 2, 15.1, "ExtrudeLine", 18, 24)); /// Esquina frente azul
        this.gridPoints.push(new CustomVector3(-8.5, 0.6, 14.8, "ExtrudeLine", 18, 25));
        this.gridPoints.push(new CustomVector3(-8.5, -0.8, 14.4, "ExtrudeLine", 18, 26));
        this.gridPoints.push(new CustomVector3(-8.5, -2.3, 13.9, "ExtrudeLine", 18, 27));
        this.gridPoints.push(new CustomVector3(-8.5, -3.7, 13.5, "ExtrudeLine", 18, 28));
        this.gridPoints.push(new CustomVector3(-8.5, -5, 13.1, "ExtrudeLine", 18, 29)); // esquina abajo azul
        this.gridPoints.push(new CustomVector3(-8.5, -5.1, 11.5, "ExtrudeLine", 18, 30));
        this.gridPoints.push(new CustomVector3(-8.5, -5.1, 10.2, "ExtrudeLine", 18, 31));
        this.gridPoints.push(new CustomVector3(-8.5, -5.1, 8.9, "ExtrudeLine", 18, 32)); // borde abajo azul > rojo
        this.gridPoints.push(new CustomVector3(-8.5, -5.1, 7.3, "ExtrudeLine", 18, 33));
        this.gridPoints.push(new CustomVector3(-8.5, -5.1, 5.7, "ExtrudeLine", 18, 34));
        this.gridPoints.push(new CustomVector3(-8.5, -5.1, 4.1, "ExtrudeLine", 18, 35));
        this.gridPoints.push(new CustomVector3(-8.5, -5.1, 2.5, "ExtrudeLine", 18, 36));
        this.gridPoints.push(new CustomVector3(-8.5, -5.1, 0.8, "ExtrudeLine", 18, 37));
        this.gridPoints.push(new CustomVector3(-8.5, -5.1, -0.9, "ExtrudeLine", 18, 38)); // esquina abajo rojo
        this.gridPoints.push(new CustomVector3(-8.5, -6.1, -1.9, "ExtrudeLine", 18, 39));
        this.gridPoints.push(new CustomVector3(-8.5, -7.1, -3, "ExtrudeLine", 18, 40)); // esquina abajo rojo
        this.gridPoints.push(new CustomVector3(-8.5, -7.1, -4.5, "ExtrudeLine", 18, 41));
        this.gridPoints.push(new CustomVector3(-8.5, -7.1, -6, "ExtrudeLine", 18, 42)); // esquina abajo atras rojo > rosa
        this.gridPoints.push(new CustomVector3(-8.5, -7.1, -7.7, "ExtrudeLine", 18, 43));
        this.gridPoints.push(new CustomVector3(-8.5, -7.1, -9.4, "ExtrudeLine", 18, 44));
        this.gridPoints.push(new CustomVector3(-8.5, -7.1, -10.8, "ExtrudeLine", 18, 45)); // esquina abajo atras rosa
        this.gridPoints.push(new CustomVector3(-8.5, -5.7, -12.1, "ExtrudeLine", 18, 46));
        this.gridPoints.push(new CustomVector3(-8.5, -4.3, -13.2, "ExtrudeLine", 18, 47));
        this.gridPoints.push(new CustomVector3(-8.5, -3, -14.1, "ExtrudeLine", 18, 48)); // esquina atras rosa
        this.gridPoints.push(new CustomVector3(-8.5, -1.5, -14.1, "ExtrudeLine", 18, 49));
        this.gridPoints.push(new CustomVector3(-8.5, 0, -14.1, "ExtrudeLine", 18, 50));

        /////////////////////
        /* Borde Izquierdo Linea 19 Extrude */
        /////////////////////

        this.gridPoints.push(new CustomVector3(-9.5, 1, -13.8, "ExtrudeLine", 19, 0)); // esquina amarilla atras rosa > amarillo
        this.gridPoints.push(new CustomVector3(-9.5, 2.6, -13.5, "ExtrudeLine", 19, 1));
        this.gridPoints.push(new CustomVector3(-9.5, 4.2, -13.2, "ExtrudeLine", 19, 2));
        this.gridPoints.push(new CustomVector3(-9.5, 5.7, -12.8, "ExtrudeLine", 19, 3)); // esquina atras arriba amarilla
        this.gridPoints.push(new CustomVector3(-9.5, 6.5, -11.6, "ExtrudeLine", 19, 4));
        this.gridPoints.push(new CustomVector3(-9.5, 7.3, -10.2, "ExtrudeLine", 19, 5));
        this.gridPoints.push(new CustomVector3(-9.5, 8.1, -8.8, "ExtrudeLine", 19, 6));
        this.gridPoints.push(new CustomVector3(-9.5, 8.9, -7.5, "ExtrudeLine", 19, 7));
        this.gridPoints.push(new CustomVector3(-9.5, 9.7, -6, "ExtrudeLine", 19, 8)); // esquina amarilla arriba
        this.gridPoints.push(new CustomVector3(-9.5, 9.7, -4.4, "ExtrudeLine", 19, 9));
        this.gridPoints.push(new CustomVector3(-9.5, 9.7, -2.8, "ExtrudeLine", 19, 10));
        this.gridPoints.push(new CustomVector3(-9.5, 9.7, -1.2, "ExtrudeLine", 19, 11));
        this.gridPoints.push(new CustomVector3(-9.5, 9.7, 0, "ExtrudeLine", 19, 12)); // borde amarillo > azul
        this.gridPoints.push(new CustomVector3(-9.5, 9.7, 1.6, "ExtrudeLine", 19, 13));
        this.gridPoints.push(new CustomVector3(-9.5, 9.7, 3.2, "ExtrudeLine", 19, 14));
        this.gridPoints.push(new CustomVector3(-9.5, 9.7, 4.8, "ExtrudeLine", 19, 15));
        this.gridPoints.push(new CustomVector3(-9.5, 9.7, 6.4, "ExtrudeLine", 19, 16));
        this.gridPoints.push(new CustomVector3(-9.5, 9.7, 8, "ExtrudeLine", 19, 17)); // Esquina arriba azul
        this.gridPoints.push(new CustomVector3(-9.5, 8.7, 9.6, "ExtrudeLine", 19, 18));
        this.gridPoints.push(new CustomVector3(-9.5, 7.8, 11, "ExtrudeLine", 19, 19));
        this.gridPoints.push(new CustomVector3(-9.5, 6.7, 12.5, "ExtrudeLine", 19, 20));
        this.gridPoints.push(new CustomVector3(-9.5, 5.8, 13.7, "ExtrudeLine", 19, 21)); // Esquina frente arriba azul
        this.gridPoints.push(new CustomVector3(-9.5, 4.6, 14, "ExtrudeLine", 19, 22));
        this.gridPoints.push(new CustomVector3(-9.5, 3.3, 14.4, "ExtrudeLine", 19, 23));
        this.gridPoints.push(new CustomVector3(-9.5, 2.1, 14.8, "ExtrudeLine", 19, 24)); // Esquina frente azul
        this.gridPoints.push(new CustomVector3(-9.5, 0.7, 14.4, "ExtrudeLine", 19, 25));
        this.gridPoints.push(new CustomVector3(-9.5, -0.7, 14, "ExtrudeLine", 19, 26));
        this.gridPoints.push(new CustomVector3(-9.5, -2.1, 13.5, "ExtrudeLine", 19, 27));
        this.gridPoints.push(new CustomVector3(-9.5, -3.5, 13.1, "ExtrudeLine", 19, 28));
        this.gridPoints.push(new CustomVector3(-9.5, -4.7, 12.7, "ExtrudeLine", 19, 29)); // esquina abajo azul
        this.gridPoints.push(new CustomVector3(-9.5, -4.7, 11.5, "ExtrudeLine", 19, 30));
        this.gridPoints.push(new CustomVector3(-9.5, -4.7, 10.2, "ExtrudeLine", 19, 31));
        this.gridPoints.push(new CustomVector3(-9.5, -4.7, 8.9, "ExtrudeLine", 19, 32)); // borde abajo azul > rojo
        this.gridPoints.push(new CustomVector3(-9.5, -4.7, 7.2, "ExtrudeLine", 19, 33));
        this.gridPoints.push(new CustomVector3(-9.5, -4.7, 5.6, "ExtrudeLine", 19, 34));
        this.gridPoints.push(new CustomVector3(-9.5, -4.7, 4, "ExtrudeLine", 19, 35));
        this.gridPoints.push(new CustomVector3(-9.5, -4.7, 2.4, "ExtrudeLine", 19, 36));
        this.gridPoints.push(new CustomVector3(-9.5, -4.7, 0.7, "ExtrudeLine", 19, 37));
        this.gridPoints.push(new CustomVector3(-9.5, -4.7, -1.2, "ExtrudeLine", 19, 38)); // esquina abajo rojo
        this.gridPoints.push(new CustomVector3(-9.5, -5.7, -2.2, "ExtrudeLine", 19, 39));
        this.gridPoints.push(new CustomVector3(-9.5, -6.7, -3.1, "ExtrudeLine", 19, 40)); // esquina abajo rojo
        this.gridPoints.push(new CustomVector3(-9.5, -6.7, -4.5, "ExtrudeLine", 19, 41));
        this.gridPoints.push(new CustomVector3(-9.5, -6.7, -6, "ExtrudeLine", 19, 42)); // esquina abajo atras rojo > rosa
        this.gridPoints.push(new CustomVector3(-9.5, -6.7, -7.7, "ExtrudeLine", 19, 43));
        this.gridPoints.push(new CustomVector3(-9.5, -6.7, -9.4, "ExtrudeLine", 19, 44));
        this.gridPoints.push(new CustomVector3(-9.5, -6.7, -10.8, "ExtrudeLine", 19, 45)); // esquina abajo atras rosa
        this.gridPoints.push(new CustomVector3(-9.5, -5.5, -11.8, "ExtrudeLine", 19, 46));
        this.gridPoints.push(new CustomVector3(-9.5, -4.2, -12.8, "ExtrudeLine", 19, 47));
        this.gridPoints.push(new CustomVector3(-9.5, -3, -13.6, "ExtrudeLine", 19, 48)); // esquina atras rosa
        this.gridPoints.push(new CustomVector3(-9.5, -1.5, -13.8, "ExtrudeLine", 19, 49));
        this.gridPoints.push(new CustomVector3(-9.5, 0, -13.8, "ExtrudeLine", 19, 50));
        //console.log ("indice al final de Extrude Lines ", gridPoints.length - 1);

        ////////////////////
        /* lado Izquierdo */
        ////////////////////

        // linea 0 lado izquierdo
        this.gridPoints.push(new CustomVector3(-9.7, 2.5, -12.7, "LeftSide", null, 0, 0));
        this.gridPoints.push(new CustomVector3(-9.7, 4, -12.4, "LeftSide", null, 1, 0));
        this.gridPoints.push(new CustomVector3(-9.7, 5.4, -12.1, "LeftSide", null, 2, 0));
        this.gridPoints.push(new CustomVector3(-9.7, 6, -10.9, "LeftSide", null, 3, 0));
        this.gridPoints.push(new CustomVector3(-9.7, 6.7, -9.7, "LeftSide", null, 4, 0));
        this.gridPoints.push(new CustomVector3(-9.7, 7.5, -8.3, "LeftSide", null, 5, 0));
        this.gridPoints.push(new CustomVector3(-9.7, 8.2, -7, "LeftSide", null, 6, 0));
        this.gridPoints.push(new CustomVector3(-9.7, 8.9, -5.8, "LeftSide", null, 7, 0));
        this.gridPoints.push(new CustomVector3(-9.7, 9, -4.4, "LeftSide", null, 8, 0));
        this.gridPoints.push(new CustomVector3(-9.7, 9, -2.8, "LeftSide", null, 9, 0));
        this.gridPoints.push(new CustomVector3(-9.7, 9, -1.2, "LeftSide", null, 10, 0));
        this.gridPoints.push(new CustomVector3(-9.7, 9, 0.1, "LeftSide", null, 11, 0)); // frontera Amarillo > azul
        this.gridPoints.push(new CustomVector3(-9.7, 9, 1.7, "LeftSide", null, 12, 0));
        this.gridPoints.push(new CustomVector3(-9.7, 9, 3.2, "LeftSide", null, 13, 0));
        this.gridPoints.push(new CustomVector3(-9.7, 9, 4.9, "LeftSide", null, 14, 0));
        this.gridPoints.push(new CustomVector3(-9.7, 9, 6.5, "LeftSide", null, 15, 0));
        this.gridPoints.push(new CustomVector3(-9.7, 9, 7.8, "LeftSide", null, 16, 0));
        this.gridPoints.push(new CustomVector3(-9.7, 8.1, 9.2, "LeftSide", null, 17, 0));
        this.gridPoints.push(new CustomVector3(-9.7, 7.2, 10.6, "LeftSide", null, 18, 0));
        this.gridPoints.push(new CustomVector3(-9.7, 6.1, 12.1, "LeftSide", null, 19, 0));
        this.gridPoints.push(new CustomVector3(-9.7, 5.3, 13.1, "LeftSide", null, 20, 0));
        this.gridPoints.push(new CustomVector3(-9.7, 4.4, 13.4, "LeftSide", null, 21, 0));
        this.gridPoints.push(new CustomVector3(-9.7, 3.2, 13.7, "LeftSide", null, 22, 0));
        this.gridPoints.push(new CustomVector3(-9.7, 2.1, 14, "LeftSide", null, 23, 0));
        this.gridPoints.push(new CustomVector3(-9.7, 1, 13.7, "LeftSide", null, 24, 0));
        this.gridPoints.push(new CustomVector3(-9.7, -0.4, 13.3, "LeftSide", null, 25, 0));
        this.gridPoints.push(new CustomVector3(-9.7, -1.8, 12.9, "LeftSide", null, 26, 0));
        this.gridPoints.push(new CustomVector3(-9.7, -3.2, 12.5, "LeftSide", null, 27, 0));
        this.gridPoints.push(new CustomVector3(-9.7, -4, 12.2, "LeftSide", null, 28, 0));
        this.gridPoints.push(new CustomVector3(-9.7, -4, 11.1, "LeftSide", null, 29, 0));
        this.gridPoints.push(new CustomVector3(-9.7, -4, 10, "LeftSide", null, 30, 0));
        this.gridPoints.push(new CustomVector3(-9.7, -4, 8.9, "LeftSide", null, 31, 0));
        this.gridPoints.push(new CustomVector3(-9.7, -4, 7.2, "LeftSide", null, 32, 0));
        this.gridPoints.push(new CustomVector3(-9.7, -4, 5.6, "LeftSide", null, 33, 0));
        this.gridPoints.push(new CustomVector3(-9.7, -4, 3.9, "LeftSide", null, 34, 0));
        this.gridPoints.push(new CustomVector3(-9.7, -4, 2.3, "LeftSide", null, 35, 0));
        this.gridPoints.push(new CustomVector3(-9.7, -4, 0.6, "LeftSide", null, 36, 0));
        this.gridPoints.push(new CustomVector3(-9.7, -4, -1.3, "LeftSide", null, 37, 0));
        this.gridPoints.push(new CustomVector3(-9.7, -5.1, -2.5, "LeftSide", null, 38, 0));
        this.gridPoints.push(new CustomVector3(-9.7, -6.1, -3.5, "LeftSide", null, 39, 0));
        this.gridPoints.push(new CustomVector3(-9.7, -6.1, -4.8, "LeftSide", null, 40, 0));
        this.gridPoints.push(new CustomVector3(-9.7, -6.1, -6.4, "LeftSide", null, 41, 0));
        this.gridPoints.push(new CustomVector3(-9.7, -6.1, -8, "LeftSide", null, 42, 0));
        this.gridPoints.push(new CustomVector3(-9.7, -6.1, -9.8, "LeftSide", null, 43, 0));
        this.gridPoints.push(new CustomVector3(-9.7, -5.1, -10.9, "LeftSide", null, 44, 0));
        this.gridPoints.push(new CustomVector3(-9.7, -4, -11.8, "LeftSide", null, 45, 0));
        this.gridPoints.push(new CustomVector3(-9.7, -2.9, -12.6, "LeftSide", null, 46, 0));
        this.gridPoints.push(new CustomVector3(-9.7, -1.5, -12.7, "LeftSide", null, 47, 0));
        this.gridPoints.push(new CustomVector3(-9.7, -0.2, -12.7, "LeftSide", null, 48, 0));
        this.gridPoints.push(new CustomVector3(-9.7, 0.9, -12.7, "LeftSide", null, 49, 0));
        // linea 1 lado izquierdo            x,     y,    z
        this.gridPoints.push(new CustomVector3(-9.7, 2.2, -11.6, "LeftSide", null, 0, 1));
        this.gridPoints.push(new CustomVector3(-9.7, 3.7, -11.4, "LeftSide", null, 1, 1));
        this.gridPoints.push(new CustomVector3(-9.7, 4.9, -11, "LeftSide", null, 2, 1));
        this.gridPoints.push(new CustomVector3(-9.7, 5.4, -10, "LeftSide", null, 3, 1));
        this.gridPoints.push(new CustomVector3(-9.7, 6, -9, "LeftSide", null, 4, 1));
        this.gridPoints.push(new CustomVector3(-9.7, 6.6, -7.8, "LeftSide", null, 5, 1));
        this.gridPoints.push(new CustomVector3(-9.7, 7.3, -6.6, "LeftSide", null, 6, 1));
        this.gridPoints.push(new CustomVector3(-9.7, 7.7, -5.5, "LeftSide", null, 7, 1));
        this.gridPoints.push(new CustomVector3(-9.7, 7.8, -4.3, "LeftSide", null, 8, 1));
        this.gridPoints.push(new CustomVector3(-9.7, 7.8, -2.8, "LeftSide", null, 9, 1));
        this.gridPoints.push(new CustomVector3(-9.7, 7.8, -1.1, "LeftSide", null, 10, 1));
        this.gridPoints.push(new CustomVector3(-9.7, 7.8, 0.3, "LeftSide", null, 11, 1));
        this.gridPoints.push(new CustomVector3(-9.7, 7.8, 1.8, "LeftSide", null, 12, 1));
        this.gridPoints.push(new CustomVector3(-9.7, 7.8, 3.3, "LeftSide", null, 13, 1));
        this.gridPoints.push(new CustomVector3(-9.7, 7.8, 5, "LeftSide", null, 14, 1));
        this.gridPoints.push(new CustomVector3(-9.7, 7.8, 6.5, "LeftSide", null, 15, 1));
        this.gridPoints.push(new CustomVector3(-9.7, 7.8, 7.7, "LeftSide", null, 16, 1));
        this.gridPoints.push(new CustomVector3(-9.7, 7.3, 8.8, "LeftSide", null, 17, 1));
        this.gridPoints.push(new CustomVector3(-9.7, 6.4, 10.1, "LeftSide", null, 18, 1));
        this.gridPoints.push(new CustomVector3(-9.7, 5.4, 11.5, "LeftSide", null, 19, 1));
        this.gridPoints.push(new CustomVector3(-9.7, 4.6, 12.4, "LeftSide", null, 20, 1));
        this.gridPoints.push(new CustomVector3(-9.7, 3.3, 12.7, "LeftSide", null, 21, 1));
        this.gridPoints.push(new CustomVector3(-9.7, 2.1, 12.9, "LeftSide", null, 22, 1));
        this.gridPoints.push(new CustomVector3(-9.7, 1, 12.7, "LeftSide", null, 23, 1));
        this.gridPoints.push(new CustomVector3(-9.7, -0.3, 12.3, "LeftSide", null, 24, 1));
        this.gridPoints.push(new CustomVector3(-9.7, -1.6, 11.9, "LeftSide", null, 25, 1));
        this.gridPoints.push(new CustomVector3(-9.7, -2.7, 11.5, "LeftSide", null, 26, 1));
        this.gridPoints.push(new CustomVector3(-9.7, -2.8, 10.3, "LeftSide", null, 27, 1));
        this.gridPoints.push(new CustomVector3(-9.7, -2.8, 8.8, "LeftSide", null, 28, 1));
        this.gridPoints.push(new CustomVector3(-9.7, -2.8, 7.2, "LeftSide", null, 29, 1));
        this.gridPoints.push(new CustomVector3(-9.7, -2.8, 5.6, "LeftSide", null, 30, 1));
        this.gridPoints.push(new CustomVector3(-9.7, -2.8, 3.9, "LeftSide", null, 31, 1));
        this.gridPoints.push(new CustomVector3(-9.7, -2.8, 2.3, "LeftSide", null, 32, 1));
        this.gridPoints.push(new CustomVector3(-9.7, -2.8, 0.5, "LeftSide", null, 33, 1));
        this.gridPoints.push(new CustomVector3(-9.7, -2.8, -1.5, "LeftSide", null, 34, 1));
        this.gridPoints.push(new CustomVector3(-9.7, -3.9, -2.7, "LeftSide", null, 35, 1));
        this.gridPoints.push(new CustomVector3(-9.7, -4.9, -3.7, "LeftSide", null, 36, 1));
        this.gridPoints.push(new CustomVector3(-9.7, -4.9, -5.2, "LeftSide", null, 37, 1));
        this.gridPoints.push(new CustomVector3(-9.7, -4.9, -7.1, "LeftSide", null, 38, 1));
        this.gridPoints.push(new CustomVector3(-9.7, -4.9, -8.6, "LeftSide", null, 39, 1));
        this.gridPoints.push(new CustomVector3(-9.7, -4.9, -9.8, "LeftSide", null, 40, 1));
        this.gridPoints.push(new CustomVector3(-9.7, -3.8, -10.7, "LeftSide", null, 41, 1));
        this.gridPoints.push(new CustomVector3(-9.7, -2.5, -11.4, "LeftSide", null, 42, 1));
        this.gridPoints.push(new CustomVector3(-9.7, -1, -11.5, "LeftSide", null, 43, 1));
        this.gridPoints.push(new CustomVector3(-9.7, 0.6, -11.6, "LeftSide", null, 44, 1));

        // linea 2 lado izquierdo
        this.gridPoints.push(new CustomVector3(-9.7, 1.9, -10.3, "LeftSide", null, 0, 2));
        this.gridPoints.push(new CustomVector3(-9.7, 3.3, -10.2, "LeftSide", null, 1, 2));
        this.gridPoints.push(new CustomVector3(-9.7, 4.3, -10, "LeftSide", null, 2, 2));
        this.gridPoints.push(new CustomVector3(-9.7, 4.8, -9.2, "LeftSide", null, 3, 2));
        this.gridPoints.push(new CustomVector3(-9.7, 5.2, -8.4, "LeftSide", null, 4, 2));
        this.gridPoints.push(new CustomVector3(-9.7, 5.7, -7.3, "LeftSide", null, 5, 2));
        this.gridPoints.push(new CustomVector3(-9.7, 6.2, -6.2, "LeftSide", null, 6, 2));
        this.gridPoints.push(new CustomVector3(-9.7, 6.5, -5.2, "LeftSide", null, 7, 2));
        this.gridPoints.push(new CustomVector3(-9.7, 6.7, -4.2, "LeftSide", null, 8, 2));
        this.gridPoints.push(new CustomVector3(-9.7, 6.7, -2.8, "LeftSide", null, 9, 2));
        this.gridPoints.push(new CustomVector3(-9.7, 6.7, -1, "LeftSide", null, 10, 2));
        this.gridPoints.push(new CustomVector3(-9.7, 6.7, 0.5, "LeftSide", null, 11, 2));
        this.gridPoints.push(new CustomVector3(-9.7, 6.7, 1.9, "LeftSide", null, 12, 2));
        this.gridPoints.push(new CustomVector3(-9.7, 6.7, 3.4, "LeftSide", null, 13, 2));
        this.gridPoints.push(new CustomVector3(-9.7, 6.7, 5.1, "LeftSide", null, 14, 2));
        this.gridPoints.push(new CustomVector3(-9.7, 6.7, 6.5, "LeftSide", null, 15, 2));
        this.gridPoints.push(new CustomVector3(-9.7, 6.7, 7.6, "LeftSide", null, 16, 2));
        this.gridPoints.push(new CustomVector3(-9.7, 6.3, 8.5, "LeftSide", null, 17, 2));
        this.gridPoints.push(new CustomVector3(-9.7, 5.7, 9.6, "LeftSide", null, 18, 2));
        this.gridPoints.push(new CustomVector3(-9.7, 4.7, 10.8, "LeftSide", null, 19, 2));
        this.gridPoints.push(new CustomVector3(-9.7, 4, 11.5, "LeftSide", null, 20, 2));
        this.gridPoints.push(new CustomVector3(-9.7, 3.2, 11.7, "LeftSide", null, 21, 2));
        this.gridPoints.push(new CustomVector3(-9.7, 2.2, 11.8, "LeftSide", null, 22, 2));
        this.gridPoints.push(new CustomVector3(-9.7, 1.2, 11.7, "LeftSide", null, 23, 2));
        this.gridPoints.push(new CustomVector3(-9.7, -0.1, 11.3, "LeftSide", null, 24, 2));
        this.gridPoints.push(new CustomVector3(-9.7, -1.4, 10.7, "LeftSide", null, 25, 2));
        this.gridPoints.push(new CustomVector3(-9.7, -1.5, 9.6, "LeftSide", null, 26, 2));
        this.gridPoints.push(new CustomVector3(-9.7, -1.5, 8.3, "LeftSide", null, 27, 2));
        this.gridPoints.push(new CustomVector3(-9.7, -1.5, 7, "LeftSide", null, 28, 2));
        this.gridPoints.push(new CustomVector3(-9.7, -1.5, 5.5, "LeftSide", null, 29, 2));
        this.gridPoints.push(new CustomVector3(-9.7, -1.5, 3.8, "LeftSide", null, 30, 2));
        this.gridPoints.push(new CustomVector3(-9.7, -1.5, 2.2, "LeftSide", null, 31, 2));
        this.gridPoints.push(new CustomVector3(-9.7, -1.5, 0.5, "LeftSide", null, 32, 2));
        this.gridPoints.push(new CustomVector3(-9.7, -1.5, -1.2, "LeftSide", null, 33, 2));
        this.gridPoints.push(new CustomVector3(-9.7, -1.9, -2.8, "LeftSide", null, 34, 2));
        this.gridPoints.push(new CustomVector3(-9.7, -3, -4, "LeftSide", null, 35, 2));
        this.gridPoints.push(new CustomVector3(-9.7, -3.5, -5.4, "LeftSide", null, 36, 2));
        this.gridPoints.push(new CustomVector3(-9.7, -3.5, -6.8, "LeftSide", null, 37, 2));
        this.gridPoints.push(new CustomVector3(-9.7, -3.5, -8.4, "LeftSide", null, 38, 2));
        this.gridPoints.push(new CustomVector3(-9.7, -3.1, -9.7, "LeftSide", null, 39, 2));
        this.gridPoints.push(new CustomVector3(-9.7, -2, -10.1, "LeftSide", null, 40, 2));
        this.gridPoints.push(new CustomVector3(-9.7, -0.7, -10.3, "LeftSide", null, 41, 2));
        this.gridPoints.push(new CustomVector3(-9.7, 0.3, -10.3, "LeftSide", null, 42, 2));


        // linea 3 lado izquierdo
        this.gridPoints.push(new CustomVector3(-9.7, 1.7, -9, "LeftSide", null, 0, 3));
        this.gridPoints.push(new CustomVector3(-9.7, 3, -8.9, "LeftSide", null, 1, 3));
        this.gridPoints.push(new CustomVector3(-9.7, 4, -8, "LeftSide", null, 2, 3));
        this.gridPoints.push(new CustomVector3(-9.7, 4.7, -6.8, "LeftSide", null, 3, 3));
        this.gridPoints.push(new CustomVector3(-9.7, 5.1, -5.6, "LeftSide", null, 4, 3));
        this.gridPoints.push(new CustomVector3(-9.7, 5.4, -4.3, "LeftSide", null, 5, 3));
        this.gridPoints.push(new CustomVector3(-9.7, 5.4, -2.8, "LeftSide", null, 6, 3));
        this.gridPoints.push(new CustomVector3(-9.7, 5.4, -1, "LeftSide", null, 7, 3));
        this.gridPoints.push(new CustomVector3(-9.7, 5.4, 0.7, "LeftSide", null, 8, 3));
        this.gridPoints.push(new CustomVector3(-9.7, 5.4, 2, "LeftSide", null, 9, 3));
        this.gridPoints.push(new CustomVector3(-9.7, 5.4, 3.5, "LeftSide", null, 10, 3));
        this.gridPoints.push(new CustomVector3(-9.7, 5.4, 5.1, "LeftSide", null, 11, 3));
        this.gridPoints.push(new CustomVector3(-9.7, 5.4, 6.5, "LeftSide", null, 12, 3));
        this.gridPoints.push(new CustomVector3(-9.7, 5.1, 7.9, "LeftSide", null, 13, 3));
        this.gridPoints.push(new CustomVector3(-9.7, 4.7, 9, "LeftSide", null, 14, 3));
        this.gridPoints.push(new CustomVector3(-9.7, 4, 10, "LeftSide", null, 15, 3));
        this.gridPoints.push(new CustomVector3(-9.7, 3, 10.6, "LeftSide", null, 16, 3));
        this.gridPoints.push(new CustomVector3(-9.7, 1.8, 10.6, "LeftSide", null, 17, 3));
        this.gridPoints.push(new CustomVector3(-9.7, 0.4, 10.2, "LeftSide", null, 18, 3));
        this.gridPoints.push(new CustomVector3(-9.7, -0.1, 8.9, "LeftSide", null, 19, 3));
        this.gridPoints.push(new CustomVector3(-9.7, -0.1, 7.1, "LeftSide", null, 20, 3));
        this.gridPoints.push(new CustomVector3(-9.7, -0.1, 5.4, "LeftSide", null, 21, 3));
        this.gridPoints.push(new CustomVector3(-9.7, -0.1, 3.7, "LeftSide", null, 22, 3));
        this.gridPoints.push(new CustomVector3(-9.7, -0.1, 2.1, "LeftSide", null, 23, 3));
        this.gridPoints.push(new CustomVector3(-9.7, -0.1, 0.4, "LeftSide", null, 24, 3));
        this.gridPoints.push(new CustomVector3(-9.7, -0.1, -1.2, "LeftSide", null, 25, 3));
        this.gridPoints.push(new CustomVector3(-9.7, -0.5, -2.7, "LeftSide", null, 26, 3));
        this.gridPoints.push(new CustomVector3(-9.7, -1.5, -4.2, "LeftSide", null, 27, 3));
        this.gridPoints.push(new CustomVector3(-9.7, -2.1, -5.7, "LeftSide", null, 28, 3));
        this.gridPoints.push(new CustomVector3(-9.7, -2.1, -7.2, "LeftSide", null, 29, 3));
        this.gridPoints.push(new CustomVector3(-9.7, -1.9, -8.6, "LeftSide", null, 30, 3));
        this.gridPoints.push(new CustomVector3(-9.7, -0.7, -8.9, "LeftSide", null, 31, 3));
        this.gridPoints.push(new CustomVector3(-9.7, 0.2, -9.1, "LeftSide", null, 32, 3));
        // linea 4 lado izquierdo
        this.gridPoints.push(new CustomVector3(-9.7, 1.5, -7.6, "LeftSide", null, 0, 4));
        this.gridPoints.push(new CustomVector3(-9.7, 2.7, -7.4, "LeftSide", null, 1, 4));
        this.gridPoints.push(new CustomVector3(-9.7, 3.5, -6.4, "LeftSide", null, 2, 4));
        this.gridPoints.push(new CustomVector3(-9.7, 3.9, -5.2, "LeftSide", null, 3, 4));
        this.gridPoints.push(new CustomVector3(-9.7, 4.1, -4.1, "LeftSide", null, 4, 4));
        this.gridPoints.push(new CustomVector3(-9.7, 4.1, -2.8, "LeftSide", null, 5, 4));
        this.gridPoints.push(new CustomVector3(-9.7, 4.1, -0.9, "LeftSide", null, 6, 4));
        this.gridPoints.push(new CustomVector3(-9.7, 4.1, 0.9, "LeftSide", null, 7, 4));
        this.gridPoints.push(new CustomVector3(-9.7, 4.1, 2.2, "LeftSide", null, 8, 4));
        this.gridPoints.push(new CustomVector3(-9.7, 4.1, 3.6, "LeftSide", null, 9, 4));
        this.gridPoints.push(new CustomVector3(-9.7, 4.1, 5.1, "LeftSide", null, 10, 4));
        this.gridPoints.push(new CustomVector3(-9.7, 4.1, 6.4, "LeftSide", null, 11, 4));
        this.gridPoints.push(new CustomVector3(-9.7, 3.9, 7.7, "LeftSide", null, 12, 4));
        this.gridPoints.push(new CustomVector3(-9.7, 3.2, 8.9, "LeftSide", null, 13, 4));
        this.gridPoints.push(new CustomVector3(-9.7, 2.1, 9.3, "LeftSide", null, 14, 4));
        this.gridPoints.push(new CustomVector3(-9.7, 1.1, 8.9, "LeftSide", null, 15, 4));
        this.gridPoints.push(new CustomVector3(-9.7, 1.1, 7.6, "LeftSide", null, 16, 4));
        this.gridPoints.push(new CustomVector3(-9.7, 0.8, 6.3, "LeftSide", null, 17, 4));
        this.gridPoints.push(new CustomVector3(-9.7, 1.1, 4.8, "LeftSide", null, 18, 4));
        this.gridPoints.push(new CustomVector3(-9.7, 1.1, 3.3, "LeftSide", null, 19, 4));
        this.gridPoints.push(new CustomVector3(-9.7, 1.1, 1.8, "LeftSide", null, 20, 4));
        this.gridPoints.push(new CustomVector3(-9.7, 1.1, 0.2, "LeftSide", null, 21, 4));
        this.gridPoints.push(new CustomVector3(-9.7, 1.1, -1.4, "LeftSide", null, 22, 4));
        this.gridPoints.push(new CustomVector3(-9.7, 0.7, -2.9, "LeftSide", null, 23, 4));
        this.gridPoints.push(new CustomVector3(-9.7, -0.2, -4.4, "LeftSide", null, 24, 4));
        this.gridPoints.push(new CustomVector3(-9.7, -0.8, -5.8, "LeftSide", null, 25, 4));
        this.gridPoints.push(new CustomVector3(-9.7, -0.8, -7.3, "LeftSide", null, 26, 4));
        this.gridPoints.push(new CustomVector3(-9.7, 0.5, -7.5, "LeftSide", null, 27, 4));

        // Centro
        this.gridPoints.push(new CustomVector3(-9.7, 1, -6.2, "LeftSide", null, 0, 5));
        this.gridPoints.push(new CustomVector3(-9.7, 2.3, -6, "LeftSide", null, 1, 5));
        this.gridPoints.push(new CustomVector3(-9.7, 2.9, -4.5, "LeftSide", null, 2, 5));
        this.gridPoints.push(new CustomVector3(-9.7, 3.2, -2.6, "LeftSide", null, 3, 5));
        //
        this.gridPoints.push(new CustomVector3(-9.7, 3.2, -0.6, "LeftSide", null, 4, 5));
        this.gridPoints.push(new CustomVector3(-9.7, 3.1, 1, "LeftSide", null, 5, 5));

        this.gridPoints.push(new CustomVector3(-9.7, 3.1, 2.3, "LeftSide", null, 6, 5));
        this.gridPoints.push(new CustomVector3(-9.7, 3.1, 3.6, "LeftSide", null, 7, 5));
        this.gridPoints.push(new CustomVector3(-9.7, 3.1, 4.9, "LeftSide", null, 8, 5));
        this.gridPoints.push(new CustomVector3(-9.7, 2.9, 6.3, "LeftSide", null, 9, 5));
        this.gridPoints.push(new CustomVector3(-9.7, 2.4, 7.7, "LeftSide", null, 10, 5));

        this.gridPoints.push(new CustomVector3(-9.7, 2, 6.3, "LeftSide", null, 11, 5));
        this.gridPoints.push(new CustomVector3(-9.7, 2.1, 4.9, "LeftSide", null, 12, 5));
        this.gridPoints.push(new CustomVector3(-9.7, 2.1, 3.3, "LeftSide", null, 13, 5));
        this.gridPoints.push(new CustomVector3(-9.7, 2.1, 1.8, "LeftSide", null, 14, 5));
        this.gridPoints.push(new CustomVector3(-9.7, 2.1, .2, "LeftSide", null, 15, 5));

        this.gridPoints.push(new CustomVector3(-9.7, 2.1, -1.6, "LeftSide", null, 16, 5));
        this.gridPoints.push(new CustomVector3(-9.7, 1.8, -3.2, "LeftSide", null, 17, 5));
        this.gridPoints.push(new CustomVector3(-9.7, 1.3, -4.8, "LeftSide", null, 18, 5));



        ///////////////////
        /* lado Izquierdo */
        ////////////////////

        ///////////////////
        /* lado Derecho */
        ///////////////////

        // linea 0 Ladoderecho            (x, y, z, type = null, extrudeLine = null, index = null, sideLine = null)
        this.gridPoints.push(new CustomVector3(9.7, 2.5, -12.7, "RightSide", null, 0, 0));
        this.gridPoints.push(new CustomVector3(9.7, 4, -12.4, "RightSide", null, 1, 0));
        this.gridPoints.push(new CustomVector3(9.7, 5.4, -12.1, "RightSide", null, 2, 0));
        this.gridPoints.push(new CustomVector3(9.7, 6, -10.9, "RightSide", null, 3, 0));
        this.gridPoints.push(new CustomVector3(9.7, 6.7, -9.7, "RightSide", null, 4, 0));
        this.gridPoints.push(new CustomVector3(9.7, 7.5, -8.3, "RightSide", null, 5, 0));
        this.gridPoints.push(new CustomVector3(9.7, 8.2, -7, "RightSide", null, 6, 0));
        this.gridPoints.push(new CustomVector3(9.7, 8.9, -5.8, "RightSide", null, 7, 0));
        this.gridPoints.push(new CustomVector3(9.7, 9, -4.4, "RightSide", null, 8, 0));
        this.gridPoints.push(new CustomVector3(9.7, 9, -2.8, "RightSide", null, 9, 0));
        this.gridPoints.push(new CustomVector3(9.7, 9, -1.2, "RightSide", null, 10, 0));
        this.gridPoints.push(new CustomVector3(9.7, 9, 0.1, "RightSide", null, 11, 0)); // frontera Amarillo > azul
        this.gridPoints.push(new CustomVector3(9.7, 9, 1.7, "RightSide", null, 12, 0));
        this.gridPoints.push(new CustomVector3(9.7, 9, 3.2, "RightSide", null, 13, 0));
        this.gridPoints.push(new CustomVector3(9.7, 9, 4.9, "RightSide", null, 14, 0));
        this.gridPoints.push(new CustomVector3(9.7, 9, 6.5, "RightSide", null, 15, 0));
        this.gridPoints.push(new CustomVector3(9.7, 9, 7.8, "RightSide", null, 16, 0));
        this.gridPoints.push(new CustomVector3(9.7, 8.1, 9.2, "RightSide", null, 17, 0));
        this.gridPoints.push(new CustomVector3(9.7, 7.2, 10.6, "RightSide", null, 18, 0));
        this.gridPoints.push(new CustomVector3(9.7, 6.1, 12.1, "RightSide", null, 19, 0));
        this.gridPoints.push(new CustomVector3(9.7, 5.3, 13.1, "RightSide", null, 20, 0));
        this.gridPoints.push(new CustomVector3(9.7, 4.4, 13.4, "RightSide", null, 21, 0));
        this.gridPoints.push(new CustomVector3(9.7, 3.2, 13.7, "RightSide", null, 22, 0));
        this.gridPoints.push(new CustomVector3(9.7, 2.1, 14, "RightSide", null, 23, 0));
        this.gridPoints.push(new CustomVector3(9.7, 1, 13.7, "RightSide", null, 24, 0));
        this.gridPoints.push(new CustomVector3(9.7, -0.4, 13.3, "RightSide", null, 25, 0));
        this.gridPoints.push(new CustomVector3(9.7, -1.8, 12.9, "RightSide", null, 26, 0));
        this.gridPoints.push(new CustomVector3(9.7, -3.2, 12.5, "RightSide", null, 27, 0));
        this.gridPoints.push(new CustomVector3(9.7, -4, 12.2, "RightSide", null, 28, 0));
        this.gridPoints.push(new CustomVector3(9.7, -4, 11.1, "RightSide", null, 29, 0));
        this.gridPoints.push(new CustomVector3(9.7, -4, 10, "RightSide", null, 30, 0));
        this.gridPoints.push(new CustomVector3(9.7, -4, 8.9, "RightSide", null, 31, 0));
        this.gridPoints.push(new CustomVector3(9.7, -4, 7.2, "RightSide", null, 32, 0));
        this.gridPoints.push(new CustomVector3(9.7, -4, 5.6, "RightSide", null, 33, 0));
        this.gridPoints.push(new CustomVector3(9.7, -4, 3.9, "RightSide", null, 34, 0));
        this.gridPoints.push(new CustomVector3(9.7, -4, 2.3, "RightSide", null, 35, 0));
        this.gridPoints.push(new CustomVector3(9.7, -4, 0.6, "RightSide", null, 36, 0));
        this.gridPoints.push(new CustomVector3(9.7, -4, -1.3, "RightSide", null, 37, 0));
        this.gridPoints.push(new CustomVector3(9.7, -5.1, -2.5, "RightSide", null, 38, 0));
        this.gridPoints.push(new CustomVector3(9.7, -6.1, -3.5, "RightSide", null, 39, 0));
        this.gridPoints.push(new CustomVector3(9.7, -6.1, -4.8, "RightSide", null, 40, 0));
        this.gridPoints.push(new CustomVector3(9.7, -6.1, -6.4, "RightSide", null, 41, 0));
        this.gridPoints.push(new CustomVector3(9.7, -6.1, -8, "RightSide", null, 42, 0));
        this.gridPoints.push(new CustomVector3(9.7, -6.1, -9.8, "RightSide", null, 43, 0));
        this.gridPoints.push(new CustomVector3(9.7, -5.1, -10.9, "RightSide", null, 44, 0));
        this.gridPoints.push(new CustomVector3(9.7, -4, -11.8, "RightSide", null, 45, 0));
        this.gridPoints.push(new CustomVector3(9.7, -2.9, -12.6, "RightSide", null, 46, 0));
        this.gridPoints.push(new CustomVector3(9.7, -1.5, -12.7, "RightSide", null, 47, 0));
        this.gridPoints.push(new CustomVector3(9.7, -0.2, -12.7, "RightSide", null, 48, 0));
        this.gridPoints.push(new CustomVector3(9.7, 0.9, -12.7, "RightSide", null, 49, 0));

        // linea 1 lado derecho 

        this.gridPoints.push(new CustomVector3(9.7, 2.2, -11.6, "RightSide", null, 0, 1));
        this.gridPoints.push(new CustomVector3(9.7, 3.7, -11.4, "RightSide", null, 1, 1));
        this.gridPoints.push(new CustomVector3(9.7, 4.9, -11, "RightSide", null, 2, 1));
        this.gridPoints.push(new CustomVector3(9.7, 5.4, -10, "RightSide", null, 3, 1));
        this.gridPoints.push(new CustomVector3(9.7, 6, -9, "RightSide", null, 4, 1));
        this.gridPoints.push(new CustomVector3(9.7, 6.6, -7.8, "RightSide", null, 5, 1));
        this.gridPoints.push(new CustomVector3(9.7, 7.3, -6.6, "RightSide", null, 6, 1));
        this.gridPoints.push(new CustomVector3(9.7, 7.7, -5.5, "RightSide", null, 7, 1));
        this.gridPoints.push(new CustomVector3(9.7, 7.8, -4.3, "RightSide", null, 8, 1));
        this.gridPoints.push(new CustomVector3(9.7, 7.8, -2.8, "RightSide", null, 9, 1));
        this.gridPoints.push(new CustomVector3(9.7, 7.8, -1.1, "RightSide", null, 10, 1));
        this.gridPoints.push(new CustomVector3(9.7, 7.8, 0.3, "RightSide", null, 11, 1));
        this.gridPoints.push(new CustomVector3(9.7, 7.8, 1.8, "RightSide", null, 12, 1));
        this.gridPoints.push(new CustomVector3(9.7, 7.8, 3.3, "RightSide", null, 13, 1));
        this.gridPoints.push(new CustomVector3(9.7, 7.8, 5, "RightSide", null, 14, 1));
        this.gridPoints.push(new CustomVector3(9.7, 7.8, 6.5, "RightSide", null, 15, 1));
        this.gridPoints.push(new CustomVector3(9.7, 7.8, 7.7, "RightSide", null, 16, 1));
        this.gridPoints.push(new CustomVector3(9.7, 7.3, 8.8, "RightSide", null, 17, 1));
        this.gridPoints.push(new CustomVector3(9.7, 6.4, 10.1, "RightSide", null, 18, 1));
        this.gridPoints.push(new CustomVector3(9.7, 5.4, 11.5, "RightSide", null, 19, 1));
        this.gridPoints.push(new CustomVector3(9.7, 4.6, 12.4, "RightSide", null, 20, 1));
        this.gridPoints.push(new CustomVector3(9.7, 3.3, 12.7, "RightSide", null, 21, 1));
        this.gridPoints.push(new CustomVector3(9.7, 2.1, 12.9, "RightSide", null, 22, 1));
        this.gridPoints.push(new CustomVector3(9.7, 1, 12.7, "RightSide", null, 23, 1));
        this.gridPoints.push(new CustomVector3(9.7, -0.3, 12.3, "RightSide", null, 24, 1));
        this.gridPoints.push(new CustomVector3(9.7, -1.6, 11.9, "RightSide", null, 25, 1));
        this.gridPoints.push(new CustomVector3(9.7, -2.7, 11.5, "RightSide", null, 26, 1));
        this.gridPoints.push(new CustomVector3(9.7, -2.8, 10.3, "RightSide", null, 27, 1));
        this.gridPoints.push(new CustomVector3(9.7, -2.8, 8.8, "RightSide", null, 28, 1));
        this.gridPoints.push(new CustomVector3(9.7, -2.8, 7.2, "RightSide", null, 29, 1));
        this.gridPoints.push(new CustomVector3(9.7, -2.8, 5.6, "RightSide", null, 30, 1));
        this.gridPoints.push(new CustomVector3(9.7, -2.8, 3.9, "RightSide", null, 31, 1));
        this.gridPoints.push(new CustomVector3(9.7, -2.8, 2.3, "RightSide", null, 32, 1));
        this.gridPoints.push(new CustomVector3(9.7, -2.8, 0.5, "RightSide", null, 33, 1));
        this.gridPoints.push(new CustomVector3(9.7, -2.8, -1.5, "RightSide", null, 34, 1));
        this.gridPoints.push(new CustomVector3(9.7, -3.9, -2.7, "RightSide", null, 35, 1));
        this.gridPoints.push(new CustomVector3(9.7, -4.9, -3.7, "RightSide", null, 36, 1));
        this.gridPoints.push(new CustomVector3(9.7, -4.9, -5.2, "RightSide", null, 37, 1));
        this.gridPoints.push(new CustomVector3(9.7, -4.9, -7.1, "RightSide", null, 38, 1));
        this.gridPoints.push(new CustomVector3(9.7, -4.9, -8.6, "RightSide", null, 39, 1));
        this.gridPoints.push(new CustomVector3(9.7, -4.9, -9.8, "RightSide", null, 40, 1));
        this.gridPoints.push(new CustomVector3(9.7, -3.8, -10.7, "RightSide", null, 41, 1));
        this.gridPoints.push(new CustomVector3(9.7, -2.5, -11.4, "RightSide", null, 42, 1));
        this.gridPoints.push(new CustomVector3(9.7, -1, -11.5, "RightSide", null, 43, 1));
        this.gridPoints.push(new CustomVector3(9.7, 0.6, -11.6, "RightSide", null, 44, 1));

        // linea 2 lado derecho       

        this.gridPoints.push(new CustomVector3(9.7, 1.9, -10.3, "RightSide", null, 0, 2));
        this.gridPoints.push(new CustomVector3(9.7, 3.3, -10.2, "RightSide", null, 1, 2));
        this.gridPoints.push(new CustomVector3(9.7, 4.3, -10, "RightSide", null, 2, 2));
        this.gridPoints.push(new CustomVector3(9.7, 4.8, -9.2, "RightSide", null, 3, 2));
        this.gridPoints.push(new CustomVector3(9.7, 5.2, -8.4, "RightSide", null, 4, 2));
        this.gridPoints.push(new CustomVector3(9.7, 5.7, -7.3, "RightSide", null, 5, 2));
        this.gridPoints.push(new CustomVector3(9.7, 6.2, -6.2, "RightSide", null, 6, 2));
        this.gridPoints.push(new CustomVector3(9.7, 6.5, -5.2, "RightSide", null, 7, 2));
        this.gridPoints.push(new CustomVector3(9.7, 6.7, -4.2, "RightSide", null, 8, 2));
        this.gridPoints.push(new CustomVector3(9.7, 6.7, -2.8, "RightSide", null, 9, 2));
        this.gridPoints.push(new CustomVector3(9.7, 6.7, -1, "RightSide", null, 10, 2));
        this.gridPoints.push(new CustomVector3(9.7, 6.7, 0.5, "RightSide", null, 11, 2));
        this.gridPoints.push(new CustomVector3(9.7, 6.7, 1.9, "RightSide", null, 12, 2));
        this.gridPoints.push(new CustomVector3(9.7, 6.7, 3.4, "RightSide", null, 13, 2));
        this.gridPoints.push(new CustomVector3(9.7, 6.7, 5.1, "RightSide", null, 14, 2));
        this.gridPoints.push(new CustomVector3(9.7, 6.7, 6.5, "RightSide", null, 15, 2));
        this.gridPoints.push(new CustomVector3(9.7, 6.7, 7.6, "RightSide", null, 16, 2));
        this.gridPoints.push(new CustomVector3(9.7, 6.3, 8.5, "RightSide", null, 17, 2));
        this.gridPoints.push(new CustomVector3(9.7, 5.7, 9.6, "RightSide", null, 18, 2));
        this.gridPoints.push(new CustomVector3(9.7, 4.7, 10.8, "RightSide", null, 19, 2));
        this.gridPoints.push(new CustomVector3(9.7, 4, 11.5, "RightSide", null, 20, 2));
        this.gridPoints.push(new CustomVector3(9.7, 3.2, 11.7, "RightSide", null, 21, 2));
        this.gridPoints.push(new CustomVector3(9.7, 2.2, 11.8, "RightSide", null, 22, 2));
        this.gridPoints.push(new CustomVector3(9.7, 1.2, 11.7, "RightSide", null, 23, 2));
        this.gridPoints.push(new CustomVector3(9.7, -0.1, 11.3, "RightSide", null, 24, 2));
        this.gridPoints.push(new CustomVector3(9.7, -1.4, 10.7, "RightSide", null, 25, 2));
        this.gridPoints.push(new CustomVector3(9.7, -1.5, 9.6, "RightSide", null, 26, 2));
        this.gridPoints.push(new CustomVector3(9.7, -1.5, 8.3, "RightSide", null, 27, 2));
        this.gridPoints.push(new CustomVector3(9.7, -1.5, 7, "RightSide", null, 28, 2));
        this.gridPoints.push(new CustomVector3(9.7, -1.5, 5.5, "RightSide", null, 29, 2));
        this.gridPoints.push(new CustomVector3(9.7, -1.5, 3.8, "RightSide", null, 30, 2));
        this.gridPoints.push(new CustomVector3(9.7, -1.5, 2.2, "RightSide", null, 31, 2));
        this.gridPoints.push(new CustomVector3(9.7, -1.5, 0.5, "RightSide", null, 32, 2));
        this.gridPoints.push(new CustomVector3(9.7, -1.5, -1.2, "RightSide", null, 33, 2));
        this.gridPoints.push(new CustomVector3(9.7, -1.9, -2.8, "RightSide", null, 34, 2));
        this.gridPoints.push(new CustomVector3(9.7, -3, -4, "RightSide", null, 35, 2));
        this.gridPoints.push(new CustomVector3(9.7, -3.5, -5.4, "RightSide", null, 36, 2));
        this.gridPoints.push(new CustomVector3(9.7, -3.5, -6.8, "RightSide", null, 37, 2));
        this.gridPoints.push(new CustomVector3(9.7, -3.5, -8.4, "RightSide", null, 38, 2));
        this.gridPoints.push(new CustomVector3(9.7, -3.1, -9.7, "RightSide", null, 39, 2));
        this.gridPoints.push(new CustomVector3(9.7, -2, -10.1, "RightSide", null, 40, 2));
        this.gridPoints.push(new CustomVector3(9.7, -0.7, -10.3, "RightSide", null, 41, 2));
        this.gridPoints.push(new CustomVector3(9.7, 0.3, -10.3, "RightSide", null, 42, 2));

        // linea 3 lado derecho           

        this.gridPoints.push(new CustomVector3(9.7, 1.7, -9, "RightSide", null, 0, 3));
        this.gridPoints.push(new CustomVector3(9.7, 3, -8.9, "RightSide", null, 1, 3));
        this.gridPoints.push(new CustomVector3(9.7, 4, -8, "RightSide", null, 2, 3));
        this.gridPoints.push(new CustomVector3(9.7, 4.7, -6.8, "RightSide", null, 3, 3));
        this.gridPoints.push(new CustomVector3(9.7, 5.1, -5.6, "RightSide", null, 4, 3));
        this.gridPoints.push(new CustomVector3(9.7, 5.4, -4.3, "RightSide", null, 5, 3));
        this.gridPoints.push(new CustomVector3(9.7, 5.4, -2.8, "RightSide", null, 6, 3));
        this.gridPoints.push(new CustomVector3(9.7, 5.4, -1, "RightSide", null, 7, 3));
        this.gridPoints.push(new CustomVector3(9.7, 5.4, 0.7, "RightSide", null, 8, 3));
        this.gridPoints.push(new CustomVector3(9.7, 5.4, 2, "RightSide", null, 9, 3));
        this.gridPoints.push(new CustomVector3(9.7, 5.4, 3.5, "RightSide", null, 10, 3));
        this.gridPoints.push(new CustomVector3(9.7, 5.4, 5.1, "RightSide", null, 11, 3));
        this.gridPoints.push(new CustomVector3(9.7, 5.4, 6.5, "RightSide", null, 12, 3));
        this.gridPoints.push(new CustomVector3(9.7, 5.1, 7.9, "RightSide", null, 13, 3));
        this.gridPoints.push(new CustomVector3(9.7, 4.7, 9, "RightSide", null, 14, 3));
        this.gridPoints.push(new CustomVector3(9.7, 4, 10, "RightSide", null, 15, 3));
        this.gridPoints.push(new CustomVector3(9.7, 3, 10.6, "RightSide", null, 16, 3));
        this.gridPoints.push(new CustomVector3(9.7, 1.8, 10.6, "RightSide", null, 17, 3));
        this.gridPoints.push(new CustomVector3(9.7, 0.4, 10.2, "RightSide", null, 18, 3));
        this.gridPoints.push(new CustomVector3(9.7, -0.1, 8.9, "RightSide", null, 19, 3));
        this.gridPoints.push(new CustomVector3(9.7, -0.1, 7.1, "RightSide", null, 20, 3));
        this.gridPoints.push(new CustomVector3(9.7, -0.1, 5.4, "RightSide", null, 21, 3));
        this.gridPoints.push(new CustomVector3(9.7, -0.1, 3.7, "RightSide", null, 22, 3));
        this.gridPoints.push(new CustomVector3(9.7, -0.1, 2.1, "RightSide", null, 23, 3));
        this.gridPoints.push(new CustomVector3(9.7, -0.1, 0.4, "RightSide", null, 24, 3));
        this.gridPoints.push(new CustomVector3(9.7, -0.1, -1.2, "RightSide", null, 25, 3));
        this.gridPoints.push(new CustomVector3(9.7, -0.5, -2.7, "RightSide", null, 26, 3));
        this.gridPoints.push(new CustomVector3(9.7, -1.5, -4.2, "RightSide", null, 27, 3));
        this.gridPoints.push(new CustomVector3(9.7, -2.1, -5.7, "RightSide", null, 28, 3));
        this.gridPoints.push(new CustomVector3(9.7, -2.1, -7.2, "RightSide", null, 29, 3));
        this.gridPoints.push(new CustomVector3(9.7, -1.9, -8.6, "RightSide", null, 30, 3));
        this.gridPoints.push(new CustomVector3(9.7, -0.7, -8.9, "RightSide", null, 31, 3));
        this.gridPoints.push(new CustomVector3(9.7, 0.2, -9.1, "RightSide", null, 32, 3));

        // linea 4 lado derecho

        this.gridPoints.push(new CustomVector3(9.7, 1.5, -7.6, "RightSide", null, 0, 4));
        this.gridPoints.push(new CustomVector3(9.7, 2.7, -7.4, "RightSide", null, 1, 4));
        this.gridPoints.push(new CustomVector3(9.7, 3.5, -6.4, "RightSide", null, 2, 4));
        this.gridPoints.push(new CustomVector3(9.7, 3.9, -5.2, "RightSide", null, 3, 4));
        this.gridPoints.push(new CustomVector3(9.7, 4.1, -4.1, "RightSide", null, 4, 4));
        this.gridPoints.push(new CustomVector3(9.7, 4.1, -2.8, "RightSide", null, 5, 4));
        this.gridPoints.push(new CustomVector3(9.7, 4.1, -0.9, "RightSide", null, 6, 4));
        this.gridPoints.push(new CustomVector3(9.7, 4.1, 0.9, "RightSide", null, 7, 4));
        this.gridPoints.push(new CustomVector3(9.7, 4.1, 2.2, "RightSide", null, 8, 4));
        this.gridPoints.push(new CustomVector3(9.7, 4.1, 3.6, "RightSide", null, 9, 4));
        this.gridPoints.push(new CustomVector3(9.7, 4.1, 5.1, "RightSide", null, 10, 4));
        this.gridPoints.push(new CustomVector3(9.7, 4.1, 6.4, "RightSide", null, 11, 4));
        this.gridPoints.push(new CustomVector3(9.7, 3.9, 7.7, "RightSide", null, 12, 4));
        this.gridPoints.push(new CustomVector3(9.7, 3.2, 8.9, "RightSide", null, 13, 4));
        this.gridPoints.push(new CustomVector3(9.7, 2.1, 9.3, "RightSide", null, 14, 4));
        this.gridPoints.push(new CustomVector3(9.7, 1.1, 8.9, "RightSide", null, 15, 4));
        this.gridPoints.push(new CustomVector3(9.7, 1.1, 7.6, "RightSide", null, 16, 4));
        this.gridPoints.push(new CustomVector3(9.7, 0.8, 6.3, "RightSide", null, 17, 4));
        this.gridPoints.push(new CustomVector3(9.7, 1.1, 4.8, "RightSide", null, 18, 4));
        this.gridPoints.push(new CustomVector3(9.7, 1.1, 3.3, "RightSide", null, 19, 4));
        this.gridPoints.push(new CustomVector3(9.7, 1.1, 1.8, "RightSide", null, 20, 4));
        this.gridPoints.push(new CustomVector3(9.7, 1.1, 0.2, "RightSide", null, 21, 4));
        this.gridPoints.push(new CustomVector3(9.7, 1.1, -1.4, "RightSide", null, 22, 4));
        this.gridPoints.push(new CustomVector3(9.7, 0.7, -2.9, "RightSide", null, 23, 4));
        this.gridPoints.push(new CustomVector3(9.7, -0.2, -4.4, "RightSide", null, 24, 4));
        this.gridPoints.push(new CustomVector3(9.7, -0.8, -5.8, "RightSide", null, 25, 4));
        this.gridPoints.push(new CustomVector3(9.7, -0.8, -7.3, "RightSide", null, 26, 4));
        this.gridPoints.push(new CustomVector3(9.7, 0.5, -7.5, "RightSide", null, 27, 4));

        //// Centro Linea 5 lado derecho

        // Centro
        this.gridPoints.push(new CustomVector3(9.7, 1, -6.2, "RightSide", null, 0, 5));
        this.gridPoints.push(new CustomVector3(9.7, 2.3, -6, "RightSide", null, 1, 5));
        this.gridPoints.push(new CustomVector3(9.7, 2.9, -4.5, "RightSide", null, 2, 5));
        this.gridPoints.push(new CustomVector3(9.7, 3.2, -2.6, "RightSide", null, 3, 5));
        //
        this.gridPoints.push(new CustomVector3(9.7, 3.2, -0.6, "RightSide", null, 4, 5));
        this.gridPoints.push(new CustomVector3(9.7, 3.1, 1, "RightSide", null, 5, 5));

        this.gridPoints.push(new CustomVector3(9.7, 3.1, 2.3, "RightSide", null, 6, 5));
        this.gridPoints.push(new CustomVector3(9.7, 3.1, 3.6, "RightSide", null, 7, 5));
        this.gridPoints.push(new CustomVector3(9.7, 3.1, 4.9, "RightSide", null, 8, 5));
        this.gridPoints.push(new CustomVector3(9.7, 2.9, 6.3, "RightSide", null, 9, 5));
        this.gridPoints.push(new CustomVector3(9.7, 2.4, 7.7, "RightSide", null, 10, 5));

        this.gridPoints.push(new CustomVector3(9.7, 2, 6.3, "RightSide", null, 11, 5));
        this.gridPoints.push(new CustomVector3(9.7, 2.1, 4.9, "RightSide", null, 12, 5));
        this.gridPoints.push(new CustomVector3(9.7, 2.1, 3.3, "RightSide", null, 13, 5));
        this.gridPoints.push(new CustomVector3(9.7, 2.1, 1.8, "RightSide", null, 14, 5));
        this.gridPoints.push(new CustomVector3(9.7, 2.1, .2, "RightSide", null, 15, 5));

        this.gridPoints.push(new CustomVector3(9.7, 2.1, -1.6, "RightSide", null, 16, 5));
        this.gridPoints.push(new CustomVector3(9.7, 1.8, -3.2, "RightSide", null, 17, 5));
        this.gridPoints.push(new CustomVector3(9.7, 1.3, -4.8, "RightSide", null, 18, 5));

        //console.log ("indice al final de lado derecho ", gridPoints.length - 1);
        ///////////////////
        /* lado Derecho */
        ///////////////////
    }
}