import * as THREE from 'three';
import SpaceSphereObject from "./SpaceSphereObject";
import Camera from "./Camera";
import SpaceOrbit from "./SpaceOrbit";
import {Vector3} from "three";
import Saturn from "./Saturn";

window.onresize = onResize;
onResize();

function onResize(){
    if (window.innerWidth < 768) {
        document.querySelectorAll(".accordion.active").forEach(acc => {
            const btn = acc.querySelector("button.active");

            btn.classList.remove("active");
            acc.classList.remove("active");
        });
    }
}


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

const earth = new SpaceSphereObject("/earth.jpg", 0.2625, new Vector3(3, 0, 450), scene);
objects.push(earth);
const earthOrbit = new SpaceOrbit(scene, 450);

const moon = new SpaceSphereObject("/moon.jpg", 0.07, new Vector3(2, 0, 2), scene);
moon.parent.parent = earth.parent;
objects.push(moon);
const moonOrbit = new SpaceOrbit(scene, 2, new Vector3(0, 0, 0));
moonOrbit.line.parent = earth.parent;

objects.push(new SpaceSphereObject("/mars.jpg", 0.1389, new Vector3(3, 0, 600), scene));
const marsOrbit = new SpaceOrbit(scene, 600);

objects.push(new SpaceSphereObject("/mars.jpg", 3, new Vector3(3, 0, 750), scene));
const jupiterOrbit = new SpaceOrbit(scene, 750);

objects.push(new Saturn(scene));
const saturnOrbit = new SpaceOrbit(scene, 900);

objects.push(new SpaceSphereObject("/uranus.jpg", 1.1, new Vector3(3, 0, 1050), scene));
const uranusOrbit = new SpaceOrbit(scene, 1050);

objects.push(new SpaceSphereObject("/neptune.jpg", 0.105, new Vector3(3, 0, 1200), scene));
const neptuneOrbit = new SpaceOrbit(scene, 1200);

const buttons = document.querySelectorAll("button");
let focusedObject = objects[0];
let activeBtn: HTMLButtonElement = buttons[1];

document.querySelectorAll(".accordion").forEach((accordion) => {
    const button = accordion.querySelector("button");

    button.addEventListener("click", () => {
        console.log(accordion);
        accordion.classList.toggle("active");
    })
})

document.querySelectorAll(".panel__button").forEach((btn: HTMLButtonElement) => {
    btn.addEventListener("click", () => {
        focusedObject = objects[+btn.getAttribute("data-idx")];

        if (activeBtn && btn.hasAttribute("data-idx")) {
            activeBtn.classList.remove("active");
            if (activeBtn !== btn) {
                activeBtn.parentElement.classList.remove("active");
            }
            activeBtn = btn;
            activeBtn.classList.add("active");
        }
    },)
})

function animate() {
    requestAnimationFrame(animate);

    objects[0].update(10);
    objects.slice(1).forEach(obj => obj.update(-1));

    camera.focusOnObject(focusedObject);

    camera.update();

    renderer.render(scene, camera.camera);
}

animate();
