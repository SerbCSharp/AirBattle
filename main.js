import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const scene = new THREE.Scene();

const cubeGeometry = new THREE.BoxGeometry(1,1,1);
const cubeMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
scene.add(cube);

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
})

window.addEventListener('dblclick', () => {
    if(!document.fullscreenElement) {
        renderer.domElement.requestFullscreen()
    }
    else {
        document.exitFullscreen();
    }
})

const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 100 );
camera.position.z = 3;
scene.add(camera);

const orbitControls = new OrbitControls(camera, renderer.domElement);
orbitControls.enableDamping = true;

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
document.body.append( renderer.domElement );

const clock = new THREE.Clock();

const tick = () => {
    const elapsedTime = clock.getElapsedTime();
    orbitControls.update();
    renderer.render( scene, camera );
    window.requestAnimationFrame(tick)
}

tick();