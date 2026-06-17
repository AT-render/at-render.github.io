import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.164/build/three.module.js';
import { GLTFLoader } from 'https://cdn.jsdelivr.net/npm/three@0.164/examples/jsm/loaders/GLTFLoader.js';


let scene, camera, renderer, modello;
let legsMat, topMat;

init();
caricaModello();

function init() {
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x111111);

    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.set(2, 2, 3);

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    const light = new THREE.HemisphereLight(0xffffff, 0x444444, 1.2);
    scene.add(light);

    animate();
}

function caricaModello() {
    const loader = new GLTFLoader();
    loader.load('Lemans.tavolo.glb', (gltf) => {
        modello = gltf.scene;

        modello.traverse((n) => {
            if (n.isMesh) {
                // Estraggo i materiali
                legsMat = n.material[0]; // Legs_MAT
                topMat = n.material[1];  // Top_MAT
            }
        });

        scene.add(modello);
    });
}

function cambiaGambe(tipo) {
    if (!legsMat) return;

    if (tipo === 'nero') {
        legsMat.color.set('#111111');
        legsMat.metalness = 0.8;
        legsMat.roughness = 0.3;
    }

    if (tipo === 'metallo') {
        legsMat.color.set('#aaaaaa');
        legsMat.metalness = 1;
        legsMat.roughness = 0.2;
    }
}

function cambiaPiano(tipo) {
    if (!topMat) return;

    if (tipo === 'chiaro') {
        topMat.color.set('#d8c3a5');
        topMat.metalness = 0.1;
        topMat.roughness = 0.8;
    }

    if (tipo === 'scuro') {
        topMat.color.set('#5a4632');
        topMat.metalness = 0.1;
        topMat.roughness = 0.9;
    }
}

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}
