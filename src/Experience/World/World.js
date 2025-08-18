import * as THREE from "three";
import BrainModel from "./BrainModel.js";
import BrainGrid from './BrainGrid.js';
import SynapseSystem from './SynapseSystem.js';
import ScreenManager from './ScreenManager.js';
import Logo from './Logo.js';


export default class World {
  constructor(experience) {
    this.experience = experience;
    console.log("El mundo ha sido creado.");
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;

    this.worldGroup = new THREE.Group();
    this.scene.add(this.worldGroup);
   
  }
  onResourcesReady() {
    this.setLights();
    this.setLogo();
    this.setBrain();
  }
  setLogo() {
    this.logo = new Logo(this);
    this.logo.logoGroup.visible = false; // Aseguramos que el logo sea visible
    this.worldGroup.add(this.logo.logoGroup);
  }

  setLights() {
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    this.scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.5);
    directionalLight.position.set(1, 2, 3);
    this.scene.add(directionalLight);
  }

  setBrain() {
    this.brain = new BrainModel(this); // Pasamos World
    this.brainGrid = new BrainGrid(this);

    // Creamos el sistema de líneas y le pasamos lo que necesita del BrainGrid
    this.synapseSystem = new SynapseSystem(
      this.brainGrid.gridPoints,
      this.experience,
      this.brainGrid.container3d
    );

    // Añadimos los contenedores a la escena
    this.worldGroup.add(this.brain.brainGroup);
    this.worldGroup.add(this.brainGrid.container3d); // El contenedor ahora tiene las líneas

    this.brain.brainGroup.visible = false; // Aseguramos que el cerebro sea visible
    this.brainGrid.container3d.visible = false; // Aseguramos que el

    // Activamos la animación de las líneas
    //this.synapseSystem.activateLines(true);
    //this.synapseSystem.startTimer();
  }

  update() {
    if (this.brain) {
        this.brain.update();
    }
    // Aquí animaremos los objetos del mundo en el futuro
  }
}
