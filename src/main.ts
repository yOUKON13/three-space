import * as THREE from 'three';
import SpaceSphereObject from "./SpaceSphereObject";
import Camera from "./Camera";
import SpaceOrbit from "./SpaceOrbit";
import {Vector3} from "three";

const scene = new THREE.Scene();

const background = new THREE.TextureLoader().load("/background.jpg");
scene.background = background;
scene.backgroundIntensity = 0.05;

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const camera = new Camera(renderer);
const objects: Array<SpaceSphereObject> = [];

objects.push(new SpaceSphereObject("/sun.jpg", 30, new Vector3(0, 0, 0), scene));
objects.push(new SpaceSphereObject("/mercury.jpg", 0.1, new Vector3(3, 0, 150), scene));
const mercuryOrbit = new SpaceOrbit(scene, 150);

objects.push(new SpaceSphereObject("/venus.jpg", 0.25, new Vector3(3, 0, 300), scene));
const venusOrbit = new SpaceOrbit(scene, 300);

objects.push(new SpaceSphereObject("/earth.jpg", 0.2625, new Vector3(3, 0, 450), scene));
const earthOrbit = new SpaceOrbit(scene, 450);

objects.push(new SpaceSphereObject("/mars.jpg", 0.1389, new Vector3(3, 0, 600), scene));
const marsOrbit = new SpaceOrbit(scene, 600);

objects.push(new SpaceSphereObject("/mars.jpg", 3, new Vector3(3, 0, 750), scene));
const jupiterOrbit = new SpaceOrbit(scene, 750);

const saturnPosition = new Vector3(3, 0, 900);
objects.push(new SpaceSphereObject("/saturn.jpg", 2.5, saturnPosition, scene));
const saturnOrbit = new SpaceOrbit(scene, 900);

const geometry = new THREE.RingGeometry(3, 5, 64);
var pos = geometry.attributes.position;
var v3 = new THREE.Vector3();
for (let i = 0; i < pos.count; i++) {
    v3.fromBufferAttribute(pos, i);
    geometry.attributes.uv.setXY(i, v3.length() < 4 ? 0 : 1, 1);
}
const texture = new THREE.TextureLoader().load("/saturn-ring.png");
const material = new THREE.MeshBasicMaterial({
    map: texture,
    side: THREE.DoubleSide,
    color: 0xffffff,
    transparent: true
});
const mesh = new THREE.Mesh(geometry, material);
mesh.castShadow = true;
mesh.receiveShadow = true;
mesh.position.copy(saturnPosition);
mesh.rotation.set(-Math.PI / 2, 0, 0);
scene.add(mesh);

objects.push(new SpaceSphereObject("/uranus.jpg", 1.1, new Vector3(3, 0, 1050), scene));
const uranusOrbit = new SpaceOrbit(scene, 1050);

objects.push(new SpaceSphereObject("/neptune.jpg", 0.105, new Vector3(3, 0, 1200), scene));
const neptuneOrbit = new SpaceOrbit(scene, 1200);

let focusedObject = objects[0];
document.querySelectorAll("button").forEach((btn, i) => {
    btn.addEventListener("click", () => {
        focusedObject = objects[i];
    },)
})

function animate() {
    requestAnimationFrame(animate);

    objects.forEach(obj => obj.update(true));
    camera.focusOnObject(focusedObject);

    camera.update();

    renderer.render(scene, camera.camera);
}

animate();
