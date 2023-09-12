//npx vite to run
import * as THREE from 'three';
import {
    helicopter,
   //airplane,
    objectsInit,
} from './Game/objects.js';
import {
    world,
    groundBody,
    sphereBody,
    createPhysicsWorld,
    moveBody,
} from './Physics/physicsWorld.js';
import CannonDebugger from 'cannon-es-debugger';
export const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const light = new THREE.AmbientLight( 0xffffff, 10); 
scene.add( light );

camera.position.z = 80;
camera.position.y = 30;
camera.position.x = 5;

objectsInit();
createPhysicsWorld();
const cannonDebugger = new CannonDebugger(scene, world);

function syncPhysics(){
    world.fixedStep();
    cannonDebugger.update();

    helicopter.position.copy(sphereBody.position);
    helicopter.position.y-=2
    helicopter.quaternion.copy(sphereBody.quaternion);
}

function animate() {

	requestAnimationFrame( animate );
    syncPhysics();
    moveBody();
    camera.lookAt(helicopter.position);
	renderer.render( scene, camera );
}

animate();