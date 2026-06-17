// Import dei moduli locali
// import * as THREE from '../js/three.module.js';
// import { GLTFLoader } from '../js/GLTFLoader.js';

import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.164/build/three.module.js';
import { GLTFLoader } from 'https://cdn.jsdelivr.net/npm/three@0.164/examples/jsm/loaders/GLTFLoader.js';


// Inizializzazione scena, camera e renderer
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x111111);

const camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.1,
    100
);
camera.position.set(2, 2, 3);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Luci base
const light = new THREE.HemisphereLight(0xffffff, 0x444444, 1.2);
scene.add(light);

// Loader GLTF
const loader = new GLTFLoader();

// Caricamento modello
loader.load('./Lemans.tavolo.glb', (gltf) => {
    const model = gltf.scene;
    scene.add(model);
}, undefined, (error) => {
    console.error('Errore nel caricamento del modello:', error);
});

// Funzione di rendering
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}
animate();

// Adattamento finestra
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
