# Intuitive Human - Experiencia Web Interactiva

## 🌟 Visión del Proyecto

Este proyecto es una experiencia web inmersiva y poética diseñada para presentar los servicios de Intuitive Human Neurotherapy. A través de una narrativa visual guiada por un cerebro digital interactivo, el usuario recorrerá un viaje que explora el potencial de la mente y los beneficios de la neuroterapia.

La experiencia se construye como un "one-page" que se navega a través del scroll, utilizando animaciones 3D fluidas para transicionar entre secciones en lugar de saltos de página tradicionales.

## 💻 Tecnologías Principales

* **Motor de Renderizado**: Three.js
* **Motor de Animación**: GSAP (GreenSock Animation Platform)
* **Renderizado de Texto 3D**: troika-three-text
* **Entorno de Desarrollo**: Vite

## 🏛️ Principios de Arquitectura

Este proyecto está construido sobre una base de software sólida, siguiendo principios de diseño modernos para garantizar que sea escalable, mantenible y performante.

1.  **Programación Orientada a Objetos (OOP) y Modularidad**: Cada elemento de la experiencia (la cámara, el renderizador, el cerebro, la cara, etc.) es una clase autocontenida con una única responsabilidad.
2.  **Inyección de Dependencias**: No se utilizan singletons ni variables globales. La clase principal `Experience.js` crea todas las instancias de los componentes y les "inyecta" las dependencias que necesitan a través de sus constructores.
3.  **Sistema de "Engranajes" para la Navegación**: La navegación por scroll se basa en una arquitectura desacoplada de tres componentes:
    * **`InputManager` (El Engrane Principal)**: Escucha y normaliza la entrada del usuario (scroll, touch) y emite eventos.
    * **`AnimationDirector` (El Recorrido)**: Contiene una línea de tiempo maestra de GSAP que representa todo el viaje del sitio. Se mueve en respuesta a los eventos del `InputManager`.
    * **`StateManager` (El Embrague y Orquestador)**: Escucha eventos clave en la línea de tiempo para ejecutar animaciones cinemáticas especiales, desconectando temporalmente el control del usuario para asegurar que se completen.
4.  **Componentes Reactivos**: Los componentes visuales (como `Theme.js`) utilizan un sistema de eventos (`EventEmitter`) para notificar a otras partes de la aplicación cuando ocurren cambios.

## 🚀 Instalación y Uso

1.  Clona el repositorio.
2.  Instala las dependencias:
    ```bash
    npm install
    ```
3.  Inicia el servidor de desarrollo:
    ```bash
    npm run dev
    ```
4.  Para depurar desde la consola del navegador, puedes acceder a la instancia principal de la aplicación a través de `window.experienceDebug`.

## 🗺️ Roadmap del Proyecto

Esta es nuestra hoja de ruta. Iremos marcando las casillas a medida que completemos cada objetivo.

### ✅ Fase 1: Arquitectura y Cimientos
- [x] Setup inicial del proyecto con Vite y Three.js.
- [x] Creación del `Experience.js` (Director Principal).
- [x] Implementación de Utilitarios Base (`Sizes.js`, `Time.js`, `EventEmitter.js`).
- [x] Implementación del Sistema de Temas (`Theme.js`).
- [x] Refactorización final a Inyección de Dependencias (Sin Singleton).

### ✅ Fase 2: Componentes Visuales Base
- [x] Creación del `BrainModel.js` (Geometría procedural).
- [x] Creación del `BrainGrid.js` y `SynapseSystem.js`.
- [x] Creación de la `Face.js` y sus componentes modulares (Ojos, Boca, Cejas).
- [x] Implementación de animaciones faciales (parpadeo, mirada, expresiones básicas).

### 🚧 Fase 3: Sistema de Navegación y Contenido
- [x] Implementación del `InputManager.js` (scroll y touch).
- [x] Implementación del `AnimationDirector.js` (Línea de Tiempo).
- [x] Implementación del `StateManager.js` (Embrague y Eventos).
- [x] Diseño del `LetterManager.js` para texto dinámico y reutilizable.
- [x] Implementación del `ScreenManager.js` para gestionar el contenido de cada sección.
- [x] Implementación del `HTMLManager.js` para párrafos de texto anclados.

### ⏳ Fase 4: Contenido y Pulido Final
- [ ] Poblar `states.js` con todas las secciones finales del sitio.
- [ ] Construir el contenido visual para cada pantalla en `ScreenManager`.
- [ ] Implementar la animación de introducción "De Letras a Neuronas".
- [ ] Implementar el Sistema de Partículas de fondo.
- [ ] Integrar UI final (Menú, Logo 2D).
- [ ] Integrar Sonido y Música de ambiente.
- [ ] Pruebas de Rendimiento y Optimización Final en múltiples dispositivos.