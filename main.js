import * as THREE from 'three';
import gsap from 'gsap';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import GUI from 'lil-gui'

const gui = new GUI({
    width: 300,
    title: 'Nice debug UI'
});
//gui.close();
gui.hide();
window.addEventListener('keydown', (event) => {
    if(event.key == 'h')
        gui.show(gui._hidden);
})

const debugObject = {};

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 100 );
camera.position.z = 3;
scene.add(camera);

debugObject.color = '#3a6ea6'

const cubeGeometry = new THREE.BoxGeometry(1,1,1,2,2,2);
const cubeMaterial = new THREE.MeshBasicMaterial({ color: debugObject.color, wireframe: true });
const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
scene.add(cube);

const cubeTweaks = gui.addFolder('Awesome cube');
cubeTweaks.add(cube.position, 'y').min(-3).max(3).step(0.01).name('elevation');
cubeTweaks.add(cube, 'visible');
cubeTweaks.add(cubeMaterial, 'wireframe');
cubeTweaks.addColor(debugObject, 'color').onChange(() => {
    cubeMaterial.color.set(debugObject.color)
});
debugObject.spin = () => {
    gsap.to(cube.rotation, { y: cube.rotation.y + Math.PI * 2 })
};
cubeTweaks.add(debugObject, 'spin');
debugObject.subdivision = 2;
cubeTweaks.add(debugObject, 'subdivision').min(1).max(20).step(1).onFinishChange(() => {
    cube.geometry.dispose();
    cube.geometry = new THREE.BoxGeometry(
        1, 1, 1,
        debugObject.subdivision, debugObject.subdivision, debugObject.subdivision);
});

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