import * as THREE from "three";
import {OrbitControls} from 'three/addons/controls/OrbitControls.js';
import SpaceSphereObject from "./SpaceSphereObject";
import {Vector3} from "three";

class Camera {
    private controls;
    public readonly camera;

    constructor(renderer) {
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100000);
        this.controls = new OrbitControls(this.camera, renderer.domElement);
        this.controls.maxZoom = 0.01;

        this.camera.position.set(0, 20, 100);
        this.controls.update();
    }

    focusOnObject(object: SpaceSphereObject) {
        if (this.camera.parent && this.camera.parent.uuid !== object.parent.uuid) {
            const distance = object.radius * 2;
            this.controls.zoomSpeed = distance / 10;
            this.camera.position.set(distance, distance, distance);
        }

        this.controls.object.parent = object.parent;

        const pos = new Vector3();
        object.parent.getWorldPosition(pos);
        this.controls.target.copy(pos);
    }

    update() {
        this.controls.update();
    }
}

export default Camera;