import * as THREE from "three";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import SpaceSphereObject from "./SpaceSphereObject";
import {Vector3} from "three";

class Camera {
    private controls;
    public readonly camera;
    private vec3 = new Vector3();

    constructor(renderer) {
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.controls = new OrbitControls(this.camera, renderer.domElement);

        this.camera.position.set(0, 0, 100);
        this.controls.update();
    }

    focusOnObject(object: SpaceSphereObject) {
        const objectPos = object.getPosition();
        this.vec3.subVectors(this.camera.position, objectPos);

        this.controls.object.position.copy(objectPos).add(this.vec3);
        this.controls.target.copy(objectPos);
    }

    update() {
        this.controls.update();
    }
}

export default Camera;