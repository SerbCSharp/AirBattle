import * as THREE from 'three';
import { DragControls } from 'three/examples/jsm/controls/DragControls.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const scene = new THREE.Scene();

const texture = new THREE.TextureLoader().load( 'textures/plane.jpg' );
texture.colorSpace = THREE.SRGBColorSpace;

const camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.position.x = 0;
camera.position.y = 0;
camera.position.z = 40;
//camera.lookAt(scene.position);

const axes = new THREE.AxesHelper(5);
scene.add(axes);

const spotLight = new THREE.DirectionalLight( 0xffffff, 1 );
scene.add(spotLight );

const planeGeometry = new THREE.PlaneGeometry(28.2,48.6);
const planeMaterial = new THREE.MeshBasicMaterial( { map: texture } );
const planeMaterial1 = new THREE.MeshBasicMaterial( { color: 0xfcc742, wireframe: true } );
const plane = new THREE.Mesh( planeGeometry, planeMaterial );
plane.position.x = 0
plane.position.y = 1;
plane.position.z = 0
plane.rotation.z = -0.5*Math.PI;



const planeGeometry1 = new THREE.PlaneGeometry(26,46,13,23);
const plane1 = new THREE.Mesh( planeGeometry1, planeMaterial1 );
plane1.position.x = 0;
plane1.position.y = 0;
plane1.position.z = 0;
plane1.rotation.z = -0.5*Math.PI;

scene.add( plane1 );

scene.add( plane );

const cubes = [];
const cubeGeometry = new THREE.BoxGeometry(1,1,1);
const cubeMaterial = new THREE.MeshBasicMaterial({ color: 0xfcc742 });
const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
cube.position.y = 0;
cube.position.x = 1;
cube.position.z = 1;
scene.add(cube);
cubes.push(cube);

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.append( renderer.domElement );

const controls = new DragControls(cubes, camera, renderer.domElement);
new OrbitControls(camera, renderer.domElement);

const tick = () => {
    renderer.render( scene, camera );
    window.requestAnimationFrame(tick)
}

controls.addEventListener( 'dragstart', function ( event ) {

	event.object.material.emissive.set( 0xaaaaaa );

} );

controls.addEventListener( 'dragend', function ( event ) {

	event.object.material.emissive.set( 0x000000 );

} );

tick();