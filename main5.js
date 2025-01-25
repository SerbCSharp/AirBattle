import * as THREE from 'three';
import { DragControls } from 'three/examples/jsm/controls/DragControls.js';
 
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.position.x = -45;
camera.position.y = 45;
camera.position.z = 20;
camera.lookAt(scene.position);

const axes = new THREE.AxesHelper(5,5,5);
scene.add(axes);

const spotLight = new THREE.DirectionalLight( 0xffffff, 1 );
scene.add(spotLight );

const planeGeometry = new THREE.PlaneGeometry(50,30,25,15);
const planeMaterial = new THREE.MeshBasicMaterial( { color: "wite", wireframe: true } );
const plane = new THREE.Mesh( planeGeometry, planeMaterial );
plane.position.x = 0;
plane.position.y = 0;
plane.position.z = 0;
plane.rotation.x = -0.5*Math.PI;
scene.add( plane );

const cubes = [];
const cubeGeometry = new THREE.BoxGeometry(1,1,1);
const cubeMaterial = new THREE.MeshBasicMaterial({ color: 0xfcc742, wireframe: true });
const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
cube.position.x = -23;
cube.position.y = 0;
cube.position.z = 13;
scene.add(cube);
cubes.push(cube);

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.append( renderer.domElement );
renderer.setAnimationLoop( animate );

let dragControls = new DragControls(cubes, camera, renderer.domElement);

function animate() {
    renderer.render( scene, camera );
}