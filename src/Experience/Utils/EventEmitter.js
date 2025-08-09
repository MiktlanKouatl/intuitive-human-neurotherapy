export default class EventEmitter {
    constructor() {
        this.callbacks = {};
        this.callbacks.base = {};
    }

    on(_names, callback) {
        const names = _names.split(' ');
        names.forEach(name => {
            if (!this.callbacks[name]) {
                this.callbacks[name] = [];
            }
            this.callbacks[name].push(callback);
        });
        return this;
    }

    off(_names) {
        const names = _names.split(' ');
        names.forEach(name => {
            if (this.callbacks[name]) {
                this.callbacks[name] = [];
            }
        });
    }

    trigger(_name, _args) {
        const name = _name;
        const args = _args;

        if (this.callbacks[name]) {
            this.callbacks[name].forEach(callback => {
                callback.apply(this, args);
            });
        }
    }
}
