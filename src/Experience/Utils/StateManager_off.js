import gsap from 'gsap';
import EventEmitter from './EventEmitter.js';

export default class StateManager extends EventEmitter {
    constructor(states, worldGroup) {
        super();

        this.states = states;
        this.worldGroup = worldGroup; // El objeto que vamos a animar
        this.currentState = this.states[0];
    }

    goTo(stateName) {
        const targetState = this.states.find(s => s.name === stateName);

        if (!targetState || targetState === this.currentState) {
            return;
        }

        // Animar el worldGroup a las nuevas propiedades
        gsap.to(this.worldGroup.position, {
            ...targetState.worldGroup.position,
            duration: 2.5,
            ease: 'power2.inOut',
        });

        gsap.to(this.worldGroup.rotation, {
            ...targetState.worldGroup.rotation,
            duration: 2.5,
            ease: 'power2.inOut',
        });

        this.currentState = targetState;
        this.trigger('stateChanged', [this.currentState]);
    }
}