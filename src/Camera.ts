import * as THREE from "three";
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import SpaceSphereObject from "./SpaceSphereObject";

class Camera {
    private controls;
    public readonly camera;

    constructor(renderer) {
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100000);
        this.controls = new OrbitControls(this.camera, renderer.domElement);

        this.camera.position.set(0, 20, 100);
        this.controls.update();
    }

    focusOnObject(object: SpaceSphereObject) {
        const objectPos = object.getPosition();
        this.controls.target.copy(objectPos);
    }

    update() {
        this.controls.update();
    }
}

export default Camera;