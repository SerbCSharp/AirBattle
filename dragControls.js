import * as THREE from 'three';

import { DragControls } from 'three/addons/controls/DragControls.js';

let camera, scene, renderer;
let controls;

const objects = [];


    camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 0.1, 500 );
    camera.position.z = 25;

    scene = new THREE.Scene();
    scene.background = new THREE.Color( 0xf0f0f0 );

    scene.add( new THREE.AmbientLight( 0xaaaaaa ) );

    const light = new THREE.SpotLight( 0xffffff, 10000 );
    light.position.set( 0, 25, 50 );
    light.angle = Math.PI / 9;

    light.castShadow = true;
    light.shadow.camera.near = 10;
    light.shadow.camera.far = 100;
    light.shadow.mapSize.width = 1024;
    light.shadow.mapSize.height = 1024;

    scene.add( light );

    const geometry = new THREE.BoxGeometry();


        const object = new THREE.Mesh( geometry, new THREE.MeshLambertMaterial( { color: Math.random() * 0xffffff } ) );

        object.castShadow = true;
        object.receiveShadow = true;

        scene.add( object );

        objects.push( object );

    renderer = new THREE.WebGLRenderer( { antialias: true } );
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFShadowMap;

    document.body.append( renderer.domElement );

    controls = new DragControls( [ ... objects ], camera, renderer.domElement );
    controls.addEventListener( 'drag', render );

    render();



function render() {

    renderer.render( scene, camera );

}