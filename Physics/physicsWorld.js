import * as CANNON from 'cannon-es';
import * as THREE from 'three';

export const world = new CANNON.World({
    gravity: new CANNON.Vec3(0,-9.82,0)
})

export const groundBody = new CANNON.Body({
    type: CANNON.Body.STATIC,
    shape: new CANNON.Plane(),
})

export const sphereBody = new CANNON.Body({
    mass: 7,
    shape: new CANNON.Sphere(5),
    fixedRotation: true,
})

var cloudBodyArray = []

var bodyControls = {
    wKey: false,
    aKey: false,
    sKey: false,
    dKey: false,
}

function initClouds(){
    for(var i = 0; i < 2; i++){
        cloudBodyArray.push(new CANNON.Body({
            mass: 1,
            shape: new CANNON.Sphere(4),
            fixedRotation: false,
            position: new CANNON.Vec3(10*i,4,10)
            
        }))
        world.addBody(cloudBodyArray[i])
    }
}

export function createPhysicsWorld(){
    groundBody.quaternion.setFromEuler(-Math.PI/2,0,0)
    world.addBody(sphereBody)
    sphereBody.position.y = 10
    world.addBody(groundBody)
    initClouds()
}

export function moveBody(){
    if(bodyControls.wKey){
        sphereBody.position.z -= 0.1;
    }
    if(bodyControls.sKey){
        sphereBody.position.z += 0.1;
    }
    if(bodyControls.aKey){
        sphereBody.position.x -= 0.1;
    }
    if(bodyControls.dKey){
        sphereBody.position.x += 0.1;
    }
}

document.addEventListener("keydown", onDocumentKeyDown, false);
document.addEventListener("keyup", onDocumentKeyUp, false);
function onDocumentKeyDown(event) {
    var keyCode = event.which;
    if (keyCode == 87) {
        bodyControls.wKey = true;
    } else if (keyCode == 83) {
        bodyControls.sKey = true;
    } else if (keyCode == 65) {
        bodyControls.aKey = true;
    } else if (keyCode == 68) {
        bodyControls.dKey = true;
    }
    moveBody();
}

function onDocumentKeyUp(event) {
    var keyCode = event.which;
    if (keyCode == 87) {
        bodyControls.wKey = false;
    } else if (keyCode == 83) {
        bodyControls.sKey = false;
    } else if (keyCode == 65) {
        bodyControls.aKey = false;
    } else if (keyCode == 68) {
        bodyControls.dKey = false;
    } 
    moveBody();
}

