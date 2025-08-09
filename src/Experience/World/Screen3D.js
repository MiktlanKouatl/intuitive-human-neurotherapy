import * as THREE from 'three';
import { Text } from 'troika-three-text';

export default class Screen3D extends THREE.Group {
    constructor() {
        super();
        this.textElements = {}; // Un objeto para guardar nuestros campos de texto
    }

    // Método para crear un campo de texto dinámico
    createText(key, initialProperties) {
        const text = new Text();
        
        // Asignar propiedades iniciales
        text.text = initialProperties.text;
        text.font = initialProperties.font; // Troika puede necesitar una ruta a un .ttf o .woff
        text.fontSize = initialProperties.fontSize;
        text.color = initialProperties.color;
        text.anchorX = 'center';
        text.anchorY = 'middle';
        text.position.copy(initialProperties.position);

        this.add(text); // Añadimos el texto al grupo de la pantalla
        this.textElements[key] = text; // Guardamos una referencia

        text.sync(); // Sincronizamos para que se renderice
    }

    // Método para actualizar un campo de texto existente
    updateText(key, newText) {
        if (this.textElements[key]) {
            this.textElements[key].text = newText;
            this.textElements[key].sync();
        }
    }
}