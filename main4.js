import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.position.x = -20;
camera.position.y = 20;
camera.position.z = 15;
camera.lookAt(scene.position);

const spotLight = new THREE.DirectionalLight( 0xffffff, 1 );
scene.add(spotLight );

const planeGeometry = new THREE.PlaneGeometry(50,30,1,1);
const planeMaterial = new THREE.MeshPhongMaterial( { color: 0xffffff } );
const plane = new THREE.Mesh( planeGeometry, planeMaterial );
plane.rotation.x = -0.5*Math.PI;
plane.position.x = 15;
plane.position.y = 0;
plane.position.z = 0;
scene.add( plane );

const cubeGeometry = new THREE.BoxGeometry(2,2,2);
const cubeMaterial = new THREE.MeshPhongMaterial({ color: 0xfcc742 });
const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
cube.position.x = 0;
cube.position.y = 3;
cube.position.z = 0;
scene.add(cube);

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.append( renderer.domElement );
renderer.setAnimationLoop( animate );

let controls = new OrbitControls(camera, renderer.domElement);

function animate() {
    cube.rotation.x += 0.005;
    cube.rotation.y += 0.005;
    cube.rotation.z += 0.005;
    controls.update();
    renderer.render( scene, camera );
}