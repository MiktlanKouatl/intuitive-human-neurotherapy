import * as THREE from 'three';

export default class SynapseSystem {
    constructor(pointsArray, experience, container) {
        this.experience = experience;
        this.scene = this.experience.scene;
        this.theme = this.experience.theme;
        this.pointsArray = pointsArray;
        this.container = container; // Store the container

        this.linePool = [];
        this.maxPoolSize = 600;
        this.initPoolLines3d();
        this.active = false;
        this.timerMS = 200;

        this.theme.on("update", () => {
            this.updateTheme();
        });
    }

    updateTheme() {
        for (let i = 0; i < this.linePool.length; i++) {
            this.linePool[i].material.color.copy(this.theme.liveColors.line);
        }
    }

    initPoolLines3d() {
        for (let i = 0; i < this.maxPoolSize; i++) {
            const points = [new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, 0)];
            const geometry = new THREE.BufferGeometry().setFromPoints(points);
            const material = new THREE.LineBasicMaterial({ color: this.theme.liveColors.line });
            const line3d = new THREE.Line(geometry, material);

            line3d.visible = false;
            this.linePool.push(line3d);
            this.container.add(line3d); // Add to the container, not the scene
        }
    }

    getLineFromPool() {
        for (let i = 0; i < this.linePool.length; i++) {
            if (!this.linePool[i].visible) {
                this.linePool[i].visible = true;
                return this.linePool[i];
            }
        }
    }

    releaseLineToPool(line) {
        line.points.forEach(point => {
            const index = this.pointsArray.indexOf(point);
            if (index !== -1) {
                if (this.pointsArray[index].locked == false) {
                    this.pointsArray[index].occupied = false;
                }
            }
        });

        line.segmentsArr.forEach(line3d => {
            const positions = line3d.geometry.attributes.position.array;
            positions.fill(0);
            line3d.geometry.attributes.position.needsUpdate = true;
            line3d.visible = false;
        });

        line.segmentsArr = [];
    }

    releasePoint(point) {
        const index = this.pointsArray.indexOf(point);
        if (index !== -1) {
            if (this.pointsArray[index].locked == false) {
                this.pointsArray[index].occupied = false;
            }
        }
    }

    updateLine(line, newStart, newEnd) {
        const positions = line.geometry.attributes.position.array;
        positions[0] = newStart.x;
        positions[1] = newStart.y;
        positions[2] = newStart.z;
        positions[3] = newEnd.x;
        positions[4] = newEnd.y;
        positions[5] = newEnd.z;
        line.geometry.attributes.position.needsUpdate = true;
    }

    checkAndCreateLines() {
        const availableLines = this.linePool.filter(line3d => !line3d.visible);
        if (availableLines.length >= 9) {
            this.createLine();
        }
    }

    createLine() {
        const startPoint = this.getNewRandomPoint();
        if (startPoint) {
            const endPoint = this.getNewRandomPoint(startPoint);
            if (endPoint) {
                const line = {
                    points: [startPoint, endPoint],
                    segments: Math.ceil(Math.random() * 10),
                    segmentsArr: []
                };

                for (let i = 1; i < line.segments; i++) {
                    const nextPoint = this.getNewRandomPoint(line.points[line.points.length - 1]);
                    if (nextPoint) {
                        line.points.push(nextPoint);
                    } else {
                        line.segments = line.points.length;
                        break;
                    }
                }

                for (let i = 0; i < line.points.length - 1; i++) {
                    const line3d = this.getLineFromPool();
                    if (line3d) {
                        const sPoint = line.points[i];
                        const ePoint = line.points[i + 1];
                        this.updateLine(line3d, sPoint, ePoint);
                        line.segmentsArr.push(line3d);
                    }
                }

                setTimeout(() => {
                    this.releaseLineToPool(line);
                    this.checkAndCreateLines();
                }, 1000);
            } else {
                this.releasePoint(startPoint);
            }
        }
    }

    getNewRandomPoint(startPoint) {
        if (startPoint) {
            if (startPoint.type == "ExtrudeLine") {
                let extrudeDirections = ["left", "right", "front", "back"];
                while (extrudeDirections.length > 0) {
                    const direction = extrudeDirections[Math.floor(Math.random() * extrudeDirections.length)];
                    const startIndex = this.pointsArray.indexOf(startPoint);
                    let endPointIndex = 0;

                    switch (direction) {
                        case "left":
                            endPointIndex = startPoint.extrudeLine == 0
                                ? 51 + startPoint.index
                                : (startPoint.extrudeLine - 1) * 51 + startPoint.index;
                            break;
                        case "right":
                            endPointIndex = startPoint.extrudeLine == 19
                                ? 918 + startPoint.index + 1
                                : (startPoint.extrudeLine + 1) * 51 + startPoint.index;
                            break;
                        case "front":
                            endPointIndex = startPoint.index == 50
                                ? startIndex - 51
                                : startIndex + 1;
                            break;
                        case "back":
                            endPointIndex = startPoint.index == 0
                                ? startIndex + 51
                                : startIndex - 1;
                            break;
                    }

                    if (endPointIndex >= 0 && endPointIndex < this.pointsArray.length) {
                        const endPoint = this.pointsArray[endPointIndex];
                        if (!endPoint.occupied) {
                            endPoint.occupied = true;
                            return endPoint;
                        }
                    }

                    extrudeDirections = extrudeDirections.filter(dir => dir !== direction);
                }

                return null;
            } else if (startPoint.type == "RightSide" || startPoint.type == "LeftSide") {
                let sideDirections = ["front", "back", "up"];
                while (sideDirections.length > 0) {
                    const direction = sideDirections[Math.floor(Math.random() * sideDirections.length)];
                    const startIndex = this.pointsArray.indexOf(startPoint);
                    let endPointIndex = startPoint.type == "LeftSide" ? 1019 : 1237;

                    switch (direction) {
                        case "front":
                            switch (startPoint.sideLine) {
                                case 0:
                                    endPointIndex = startPoint.index == 49 ? startIndex - 49 : startIndex + 1;
                                    break;
                                case 1:
                                    endPointIndex = startPoint.index == 44 ? startIndex - 44 : startIndex + 1;
                                    break;
                                case 2:
                                    endPointIndex = startPoint.index == 42 ? startIndex - 42 : startIndex + 1;
                                    break;
                                case 3:
                                    endPointIndex = startPoint.index == 32 ? startIndex - 32 : startIndex + 1;
                                    break;
                                case 4:
                                    endPointIndex = startPoint.index == 27 ? startIndex - 27 : startIndex + 1;
                                    break;
                                case 5:
                                    endPointIndex = startPoint.index == 18 ? startIndex - 18 : startIndex + 1;
                                    break;
                            }
                            break;
                        case "back":
                            switch (startPoint.sideLine) {
                                case 0:
                                    endPointIndex = startPoint.index == 0 ? startIndex + 49 : startIndex - 1;
                                    break;
                                case 1:
                                    endPointIndex = startPoint.index == 0 ? startIndex + 44 : startIndex - 1;
                                    break;
                                case 2:
                                    endPointIndex = startPoint.index == 0 ? startIndex + 42 : startIndex - 1;
                                    break;
                                case 3:
                                    endPointIndex = startPoint.index == 0 ? startIndex + 32 : startIndex - 1;
                                    break;
                                case 4:
                                    endPointIndex = startPoint.index == 0 ? startIndex + 27 : startIndex - 1;
                                    break;
                                case 5:
                                    endPointIndex = startPoint.index == 0 ? startIndex + 18 : startIndex - 1;
                                    break;
                            }
                            break;
                        case "up":
                            switch (startPoint.sideLine) {
                                case 0:
                                    endPointIndex -= startPoint.type == "LeftSide" ? 49 : 1236;
                                    if (startPoint.index <= 43) {
                                        endPointIndex += startPoint.index;
                                    } else if (startPoint.index >= 44 && startPoint.index <= 49) {
                                        endPointIndex += startPoint.index + 1;
                                    }
                                    break;
                                case 1:
                                    endPointIndex += 1;
                                    if (startPoint.index <= 20) {
                                        endPointIndex += startPoint.index;
                                    } else if (startPoint.index >= 21 && startPoint.index <= 26) {
                                        endPointIndex += startPoint.index + 1;
                                    } else if (startPoint.index == 27) {
                                        endPointIndex += startPoint.index + 2;
                                    } else if (startPoint.index >= 28 && startPoint.index <= 40) {
                                        endPointIndex += startPoint.index + 3;
                                    } else if (startPoint.index >= 41 && startPoint.index <= 44) {
                                        endPointIndex += startPoint.index + 4;
                                    } else if (startPoint.index == 44) {
                                        endPointIndex += startPoint.index + 5;
                                    }
                                    break;
                                case 2:
                                    endPointIndex += 51;
                                    if (startPoint.index <= 25) {
                                        endPointIndex += startPoint.index;
                                    } else if (startPoint.index >= 26 && startPoint.index <= 38) {
                                        endPointIndex += startPoint.index + 1;
                                    } else if (startPoint.index >= 39 && startPoint.index <= 42) {
                                        endPointIndex += startPoint.index + 2;
                                    }
                                    break;
                                case 3:
                                    endPointIndex += 96;
                                    if (startPoint.index <= 1) {
                                        endPointIndex += startPoint.index;
                                    } else if (startPoint.index == 2) {
                                        endPointIndex += startPoint.index + 1;
                                    } else if (startPoint.index >= 3 && startPoint.index <= 4) {
                                        endPointIndex += startPoint.index + 2;
                                    } else if (startPoint.index >= 5 && startPoint.index <= 12) {
                                        endPointIndex += startPoint.index + 3;
                                    } else if (startPoint.index >= 13 && startPoint.index <= 15) {
                                        endPointIndex += startPoint.index + 4;
                                    } else if (startPoint.index == 16) {
                                        endPointIndex += startPoint.index + 5;
                                    } else if (startPoint.index >= 17 && startPoint.index <= 18) {
                                        endPointIndex += startPoint.index + 6;
                                    } else if (startPoint.index == 19) {
                                        endPointIndex += startPoint.index + 7;
                                    } else if (startPoint.index >= 20 && startPoint.index <= 30) {
                                        endPointIndex += startPoint.index + 8;
                                    } else if (startPoint.index == 31) {
                                        endPointIndex += startPoint.index + 9;
                                    } else if (startPoint.index == 32) {
                                        endPointIndex += startPoint.index + 10;
                                    }
                                    break;
                                case 4:
                                    endPointIndex += 139;
                                    if (startPoint.index <= 2) {
                                        endPointIndex += startPoint.index;
                                    } else if (startPoint.index >= 3 && startPoint.index <= 12) {
                                        endPointIndex += startPoint.index + 1;
                                    } else if (startPoint.index == 13) {
                                        endPointIndex += startPoint.index + 2;
                                    } else if (startPoint.index >= 14 && startPoint.index <= 15) {
                                        endPointIndex += startPoint.index + 3;
                                    } else if (startPoint.index >= 16 && startPoint.index <= 17) {
                                        endPointIndex += startPoint.index + 4;
                                    } else if (startPoint.index >= 18 && startPoint.index <= 26) {
                                        endPointIndex += startPoint.index + 3;
                                    } else if (startPoint.index == 27) {
                                        endPointIndex += startPoint.index + 4;
                                    }
                                    break;
                                case 5:
                                    endPointIndex += 172;
                                    if (startPoint.index <= 1) {
                                        endPointIndex += startPoint.index;
                                    } else if (startPoint.index == 2) {
                                        endPointIndex += startPoint.index + 1;
                                    } else if (startPoint.index >= 3 && startPoint.index <= 9) {
                                        endPointIndex += startPoint.index + 2;
                                    } else if (startPoint.index == 10) {
                                        endPointIndex += startPoint.index + 3;
                                    } else if (startPoint.index >= 11 && startPoint.index <= 18) {
                                        endPointIndex += startPoint.index + 6;
                                    }
                                    break;
                            }
                            break;
                    }

                    if (endPointIndex >= 0 && endPointIndex < this.pointsArray.length) {
                        const endPoint = this.pointsArray[endPointIndex];
                        if (!endPoint.occupied) {
                            endPoint.occupied = true;
                            return endPoint;
                        }
                    }

                    sideDirections = sideDirections.filter(dir => dir !== direction);
                }
            }
        } else {
            for (let i = 0; i < this.pointsArray.length; i++) {
                const point = this.pointsArray[Math.floor(Math.random() * this.pointsArray.length)];
                if (!point.occupied) {
                    point.occupied = true;
                    return point;
                }
            }
            return null;
        }
    }

    activateLines(state = true) {
        this.active = state;
    }

    startTimer() {
        if (this._timer) return;
        this._timer = setInterval(() => this.animate(), this.timerMS);
    }

    stopTimer() {
        if (this._timer) {
            clearInterval(this._timer);
            this._timer = null;
        }
    }

    animate() {
        if (!this.active) return;
        this.checkAndCreateLines();
    }

    // Crea líneas solo entre vecinos ortogonales inmediatos (±1 en X, Y, Z), sin diagonales ni bordes
    createGridNeighborLines() {
        // Asume que cada punto tiene gridX, gridY, gridZ y que el grid es regular
        const linesCreated = new Set();
        const { pointsArray } = this;
        // Determinar dimensiones del grid
        let maxX = 0, maxY = 0, maxZ = 0;
        for (const p of pointsArray) {
            if (p.gridX > maxX) maxX = p.gridX;
            if (p.gridY > maxY) maxY = p.gridY;
            if (p.gridZ > maxZ) maxZ = p.gridZ;
        }
        // Para cada punto, conecta con vecinos ortogonales
        for (const point of pointsArray) {
            const { gridX, gridY, gridZ } = point;
            // Vecinos en X
            if (gridX < maxX) {
                const neighbor = pointsArray.find(p => p.gridX === gridX + 1 && p.gridY === gridY && p.gridZ === gridZ);
                if (neighbor) this._createUniqueLine(point, neighbor, linesCreated);
            }
            // Vecinos en Y
            if (gridY < maxY) {
                const neighbor = pointsArray.find(p => p.gridX === gridX && p.gridY === gridY + 1 && p.gridZ === gridZ);
                if (neighbor) this._createUniqueLine(point, neighbor, linesCreated);
            }
            // Vecinos en Z
            if (gridZ < maxZ) {
                const neighbor = pointsArray.find(p => p.gridX === gridX && p.gridY === gridY && p.gridZ === gridZ + 1);
                if (neighbor) this._createUniqueLine(point, neighbor, linesCreated);
            }
        }
    }

    // Crea una línea entre dos puntos si no existe ya
    _createUniqueLine(p1, p2, linesCreated) {
        // Crea un id único para la línea (ordenado)
        const id = p1.index < p2.index ? `${p1.index}_${p2.index}` : `${p2.index}_${p1.index}`;
        if (linesCreated.has(id)) return;
        linesCreated.add(id);
        const line3d = this.getLineFromPool();
        if (line3d) {
            this.updateLine(line3d, p1, p2);
            // Opcional: puedes guardar referencias si necesitas reciclar después
        }
    }

    update() {
        // Lógica de actualización irá aquí
    }
}
