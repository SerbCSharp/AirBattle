import * as THREE from 'three';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 0.1, 1000 );
const renderer = new THREE.WebGLRenderer();
renderer.setClearColor(0xEEEEEE)
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

const planeGeometry = new THREE.PlaneGeometry(60,40,1,1);
const planeMaterial = new THREE.MeshLambertMaterial( { color: 0xffffff } );
const plane = new THREE.Mesh( planeGeometry, planeMaterial );
plane.rotation.x = -0.5*Math.PI;
plane.position.x = 15;
plane.position.y = 0;
plane.position.z = 0;
plane.receiveShadow = true;
scene.add( plane );

camera.position.x = -30;
camera.position.y = 40;
camera.position.z = 30;
camera.lookAt(scene.position);

//const ambientLight = new THREE.AmbientLight(0x0c0c0c);
//scene.add(ambientLight);

const spotLight = new THREE.DirectionalLight( 0xffffff, 1 );
spotLight.position.set( -40, 60, -10 );
spotLight.castShadow = true;
scene.add(spotLight );
scene.fog=new THREE.Fog( 0xffffff, 0.015, 100 );

document.body.append( renderer.domElement );
addCube1()


	renderer.render( scene, camera );
//renderer.setAnimationLoop( animate );

function addCube1() {
	const cubeSize = Math.ceil((Math.random() * 3));
	const cubeGeometry = new THREE.BoxGeometry(cubeSize,cubeSize,cubeSize);
	const cubeMaterial = new THREE.MeshLambertMaterial({color: 0xff0000});
	const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
	cube.position.x = -4;
	cube.position.y = 3;
	cube.position.z = 0;
	cube.castShadow = true;
	scene.add(cube);
};

//function animate() {


//}