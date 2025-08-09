import * as THREE from 'three';

export default class CustomVector3 extends THREE.Vector3 {
    constructor(x, y, z, type = null, extrudeLine = null, index = null, sideLine = null) {
        super(x, y, z); // Llama al constructor de THREE.Vector3
        this.type = type;
        this.extrudeLine = extrudeLine; // Línea extrude a la que pertenece
        this.index = index; // Índice del punto en la línea
        this.sideLine = sideLine;
        this.occupied = false;
        this.locked = false;
        if (this.type === "extrudeLine") {
            console.log("pointype:", this.type);
        } else if (this.type === "side") {
            console.log("pointype:", this.type);
        }
    }
}