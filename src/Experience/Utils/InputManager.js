import EventEmitter from './EventEmitter.js';

export default class InputManager extends EventEmitter {
    constructor() {
        super();

        this.sensitivity = 0.005; // Ajusta este valor para cambiar la sensibilidad

        // LISTENERS PARA WHEEL
        window.addEventListener('wheel', (event) => this.onWheel(event), { passive: false });
        // LISTENERS PARA TOUCH
        window.addEventListener('touchstart', (event) => this.onTouchStart(event), { passive: false });
        window.addEventListener('touchmove', (event) => this.onTouchMove(event), { passive: false });
    }

    onWheel(event) {
        // Prevenimos el comportamiento por defecto del scroll (que la página se mueva)
        event.preventDefault();

        // Normalizamos el valor de deltaY para que sea pequeño y consistente
        const normalizedDelta = event.deltaY * this.sensitivity;

        // Emitimos nuestro evento personalizado con el valor normalizado
        this.trigger('scrollUpdate', [normalizedDelta]);
    }
    
    onTouchStart(event) {
        event.preventDefault();
        this.lastTouchY = event.touches[0].clientY;
    }

    onTouchMove(event) {
        event.preventDefault();
        const currentTouchY = event.touches[0].clientY;
        const deltaY = (currentTouchY - this.lastTouchY) * -1; // Invertimos para que sea natural
        this.lastTouchY = currentTouchY;

        const normalizedDelta = deltaY * this.touchSensitivity;
        this.trigger('scrollUpdate', [normalizedDelta]);
    }
}