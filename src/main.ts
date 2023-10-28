import * as THREE from 'three';
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import SpaceSphereObject from "./SpaceSphereObject";
import Camera from "./Camera";

const scene = new THREE.Scene();

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const camera = new Camera(renderer);

const sun = new SpaceSphereObject("/sun.jpg", 3, scene);
sun.setPosition(0, 0, 0);
const mercury = new SpaceSphereObject("/mercury.jpg", 0.25, scene);
mercury.setPosition(0, 0, 15);

const geometry = new THREE.RingGeometry( 20, 20.125, 32 );
const material = new THREE.MeshBasicMaterial( { color: 0xffffff, side: THREE.DoubleSide } );
const mesh = new THREE.Mesh( geometry, material );
mesh.rotation.set( Math.PI / 2, 0, 0 );
scene.add( mesh );


function animate() {
    requestAnimationFrame(animate);

    sun.update(false);
    mercury.update(true);
    camera.focusOnObject(mercury);

    camera.update();
    renderer.render(scene, camera.camera);
}

animate();
