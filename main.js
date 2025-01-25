import * as THREE from 'three';
//import gsap from 'gsap';
//import { DragControls } from 'three/examples/jsm/controls/DragControls.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const cursor = {
    x: 0,
    y: 0
}
window.addEventListener('mousemove', (event) => {
    cursor.x = event.clientX / window.innerWidth - 0.5
    cursor.y = - (event.clientY / window.innerHeight - 0.5)
})

const scene = new THREE.Scene();

const texture = new THREE.TextureLoader().load( 'textures/plane.jpg' );
texture.colorSpace = THREE.SRGBColorSpace;

const camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 0.1, 1000 );
//camera.position.x = 0;
//camera.position.y = 0;
camera.position.z = 5;

const axes = new THREE.AxesHelper(5);
scene.add(axes);

const spotLight = new THREE.DirectionalLight( 0xffffff, 1 );
scene.add(spotLight );

const planeGeometry = new THREE.PlaneGeometry(26,46,13,23);
const planeMaterial = new THREE.MeshBasicMaterial( { color: 0xfcc742, wireframe: true } );
const plane = new THREE.Mesh( planeGeometry, planeMaterial );
plane.position.x = 0;
plane.position.y = 0;
plane.position.z = 0;
//plane.rotation.z = -0.5*Math.PI;
scene.add( plane );

const cubes = [];
const cubeGeometry = new THREE.BoxGeometry(1,1,1);
const cubeMaterial = new THREE.MeshBasicMaterial({ color: 0xfcc742 });
const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
cube.position.y = 0;
cube.position.x = 0;
cube.position.z = 0;
scene.add(cube);
cubes.push(cube);

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
document.body.append( renderer.domElement );

//const controls = new DragControls(cubes, camera, renderer.domElement);
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

//const clock = new THREE.Clock();
//gsap.to(cube.position, { duration: 5, delay: 1, x: 5, y: 2 });

const tick = () => {
    //const elapsedTime = clock.getElapsedTime();
    //plane.rotation.z = elapsedTime * Math.PI * 0.01;
    /*camera.position.x = Math.sin(cursor.x * Math.PI * 2) * 2
    camera.position.z = Math.cos(cursor.x * Math.PI * 2) * 2
    camera.position.y = cursor.y * 3;
    camera.lookAt(cube.position);*/
    orbitControls.update();
    renderer.render( scene, camera );

    window.requestAnimationFrame(tick)
}

/*controls.addEventListener( 'dragstart', function ( event ) {

	event.object.material.emissive.set( 0xaaaaaa );

} );

controls.addEventListener( 'dragend', function ( event ) {

	event.object.material.emissive.set( 0x000000 );

} );*/

tick();