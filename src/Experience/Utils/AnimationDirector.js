import gsap from 'gsap';
import EventEmitter from './EventEmitter.js'; 

export default class AnimationDirector extends EventEmitter {
    constructor(worldGroup, states) {
        super();
        this.worldGroup = worldGroup;
        this.states = states;
        this.progress = 0; // El progreso total del scroll (0 a 1)
        this.timeline = gsap.timeline({ paused: true });
        this.isConnected = false; // El "embrague", inicialmente desconectado

        this.buildTimeline();
    }

    buildTimeline() {
        // Recorremos los estados para crear las animaciones entre ellos
        for (let i = 0; i < this.states.length - 1; i++) {
            const currentState = this.states[i];
            const nextState = this.states[i + 1];


            // Añadimos una llamada que emite un evento al llegar a cada estado
            this.timeline.addLabel(currentState.name).call(() => {
                console.log(`1. AnimationDirector: Emitiendo evento 'enterState:${currentState.name}'`);
                this.trigger(`enterState:${currentState.name}`, [currentState]);
            });

            // Solo creamos animaciones si hay un estado siguiente
            if (nextState) {
                this.timeline.to(this.worldGroup.position, {
                    ...nextState.worldGroup.position,
                    ease: 'none',
                }, currentState.name); // Inicia en la etiqueta del estado actual

                this.timeline.to(this.worldGroup.rotation, {
                    ...nextState.worldGroup.rotation,
                    ease: 'none',
                }, currentState.name);
            }
        }
        // Necesitamos añadir manualmente la etiqueta y el evento para el último estado.
        const lastState = this.states[this.states.length - 1];
        this.timeline.addLabel(lastState.name).call(() => {
            console.log(`1. AnimationDirector: Emitiendo evento 'enterState:${lastState.name}'`);
            this.trigger(`enterState:${lastState.name}`, [lastState]);
        });
    }

    // El embrague para conectar el scroll a la animación
    connect() {
        this.isConnected = true;
    }

    // El embrague para desconectar el scroll
    disconnect() {
        this.isConnected = false;
    }

    // Este método será llamado por el InputManager
    onScroll(normalizedDelta) {
        if (!this.isConnected) return;

        // Actualizamos el progreso basado en la dirección del scroll
        this.progress += normalizedDelta;

        // Limitamos el progreso para que no se salga de 0 a 1
        this.progress = gsap.utils.clamp(0, 1, this.progress);

        // Actualizamos la línea de tiempo al progreso del scroll
        this.timeline.progress(this.progress);
    }
}