//import { Object3D } from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import * as THREE from 'three';
import { scene } from "../main.js";
import { Object3D } from "three";
//loader
const loader = new GLTFLoader();


//objectGLTFs
const skyGeometry = new THREE.SphereGeometry(100, 100, 100);
const skyMaterial = new THREE.MeshBasicMaterial({ color: 0x77b5fe });
const helicopterGLTF = 'Textures/Helicopter/Helicopter.gltf';

//objects
export var helicopter = new Object3D();
export const sky = new THREE.Mesh(skyGeometry, skyMaterial);

export const objectsInit = async () => {

    loader.load(helicopterGLTF, (gltf)=>{
        helicopter = gltf.scene;
        helicopter.scale.set(0.3,0.3,0.3);
        scene.add(gltf.scene);
    })
    sky.material.side = THREE.BackSide;
    //scene.add(sky)
}