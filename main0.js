import * as THREE from 'three';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.position.x = -30;
camera.position.y = 40;
camera.position.z = 30;
camera.lookAt(scene.position);

const spotLight = new THREE.DirectionalLight( 0xffffff, 1 );
spotLight.position.set( -40, 60, -10 );
scene.add(spotLight );

const planeGeometry = new THREE.PlaneGeometry(60,40,1,1);
const planeMaterial = new THREE.MeshLambertMaterial( { color: 0xffffff } );
const plane = new THREE.Mesh( planeGeometry, planeMaterial );
plane.rotation.x = -0.5*Math.PI;
plane.position.x = 15;
plane.position.y = 0;
plane.position.z = 0;
scene.add( plane );

const cubeGeometry = new THREE.BoxGeometry();
const cubeMaterial = new THREE.MeshLambertMaterial({color: 0xff0000});
const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
cube.position.x = -4;
cube.position.y = 3;
cube.position.z = 0;
scene.add(cube);

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.append( renderer.domElement );
renderer.render( scene, camera );
