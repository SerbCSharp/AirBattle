import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const image = new Image();
image.src = '/static/textures/Wood_024/Wood_024_basecolor.jpg';
const texture = new THREE.Texture(image);
image.onload = () => {
    texture.needsUpdate = true;
};

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 100 );
camera.position.z = 3;
scene.add(camera);

const cubeGeometry = new THREE.BoxGeometry(1,1,1,2,2,2);
const cubeMaterial = new THREE.MeshBasicMaterial({ map: texture });
const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
scene.add(cube);

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
document.body.append( renderer.domElement );

const orbitControls = new OrbitControls(camera, renderer.domElement);
orbitControls.enableDamping = true;

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

const clock = new THREE.Clock();

const tick = () => {
    const elapsedTime = clock.getElapsedTime();
    orbitControls.update();
    renderer.render( scene, camera );
    window.requestAnimationFrame(tick)
}

tick();