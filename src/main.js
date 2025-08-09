import Experience from './Experience/Experience.js';

// Le decimos al navegador: "Espera a que todo el HTML esté cargado, y solo entonces, crea la experiencia".
window.addEventListener('DOMContentLoaded', () => {
    const experience = new Experience(document.querySelector('canvas.webgl'));
});