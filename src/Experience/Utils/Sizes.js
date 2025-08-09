import EventEmitter from './EventEmitter.js';

export default class Sizes extends EventEmitter {
    constructor() {
        super();

        this.setSizes();
        // Resize event
        window.addEventListener('resize', () => {
            this.setSizes();
            this.trigger('resize');
        });
        
    }
    setSizes() {
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.pixelRatio = Math.min(window.devicePixelRatio, 2);

        // AÑADIMOS ESTA LÓGICA
        if (this.width < 768) {
            this.device = 'mobile';
        } else {
            this.device = 'desktop';
        }
    }
}
