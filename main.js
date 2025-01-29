import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const loadingManager = new THREE.LoadingManager();
const textureLoader = new THREE.TextureLoader(loadingManager);
const colorTexture = textureLoader.load('/static/textures/Door_Wood_001/Door_Wood_001_basecolor.jpg')
const opacityTexture = textureLoader.load('/static/textures/Door_Wood_001/Door_Wood_001_opacity.jpg')
const heightTexture = textureLoader.load('/static/textures/Door_Wood_001/Door_Wood_001_height.png')
const normalTexture = textureLoader.load('/static/textures/Door_Wood_001/Door_Wood_001_normal.jpg')
const ambientOcclusionTexture = textureLoader.load('/static/textures/Door_Wood_001/Door_Wood_001_ambientOcclusion.jpg')
const metallicTexture = textureLoader.load('/static/textures/Door_Wood_001/Door_Wood_001_metallic.jpg')
const roughnessTexture = textureLoader.load('/static/textures/Door_Wood_001/Door_Wood_001_roughness.jpg')

colorTexture.generateMipmaps = false;
colorTexture.minFilter = THREE.NearestFilter;
colorTexture.magFilter = THREE.NearestFilter;

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 100 );
camera.position.z = 3;
scene.add(camera);

const cubeGeometry = new THREE.BoxGeometry(1,1,1);
const cubeMaterial = new THREE.MeshBasicMaterial({ map: colorTexture });
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