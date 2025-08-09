import * as THREE from 'three';

export default [
    {
        name: 'logo',
        worldGroup: {
            position: new THREE.Vector3(0, 5, 40), // Cámara cerca del logo
            rotation: new THREE.Euler(0, 0, 0),
        },
        screen: { name: 'logoScreen' }
    },
    {
        name: 'brainReveal', // El estado final de la transición de scroll
        worldGroup: {
            position: new THREE.Vector3(0, 0, 0),
            rotation: new THREE.Euler(0, 0, 0),
        },
        screen: { name: 'headlineScreen' }
    },
    {
        name: 'valueProp',
        worldGroup: {
            position: new THREE.Vector3(5, -2, 0),
            rotation: new THREE.Euler(0, -Math.PI / 8, 0),
        },
        screen: { name: 'valuePropScreen' }
    },
    {
        name: 'treatment',
        worldGroup: {
            position: new THREE.Vector3(-10, 0, -10),
            rotation: new THREE.Euler(0, Math.PI / 6, 0),
        },
        screen: { name: 'treatmentScreen' }
    },
    {
        name: 'intuitionMap',
        worldGroup: {
            position: new THREE.Vector3(15, 5, -20),
            rotation: new THREE.Euler(0, -Math.PI / 5, 0),
        },
        screen: { name: 'intuitionMapScreen' }
    },
    {
        name: 'testimonials',
        worldGroup: {
            position: new THREE.Vector3(0, -5, 0),
            rotation: new THREE.Euler(0.2, 0, 0),
        },
        screen: { name: 'testimonialsScreen' }
    },
    {
        name: 'technician',
        worldGroup: {
            position: new THREE.Vector3(-15, 0, -5),
            rotation: new THREE.Euler(0, Math.PI / 7, 0),
        },
        screen: { name: 'technicianScreen' }
    },
    {
        name: 'cta',
        worldGroup: {
            position: new THREE.Vector3(0, 0, 20),
            rotation: new THREE.Euler(0, 0, 0),
        },
        screen: { name: 'ctaScreen' }
    },
];