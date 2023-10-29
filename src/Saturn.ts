import * as THREE from "three";
import SpaceSphereObject from "./SpaceSphereObject";
import {Vector3} from "three";

class Saturn extends SpaceSphereObject {
    private ring;
    private isRingIncreasing = true;

    constructor(scene) {
        super("/saturn.jpg", 2.5, new Vector3(3, 0, 900), scene);

        const geometry = new THREE.RingGeometry(3, 5, 64);
        const pos = geometry.attributes.position;
        const v3 = new THREE.Vector3();
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
        this.ring = new THREE.Mesh(geometry, material);
        this.ring.castShadow = true;
        this.ring.receiveShadow = true;
        this.ring.rotation.set(-Math.PI / 2, 0, 0);
        this.object.add(this.ring);
    }

    update(isOrbit) {
        super.update(isOrbit);

        if (this.ring.rotation.y > 0.3 && this.isRingIncreasing) {
            this.isRingIncreasing = false;
        } else if (this.ring.rotation.y < -0.3 && !this.isRingIncreasing) {
            this.isRingIncreasing = true;
        }

        this.ring.rotation.y += (this.isRingIncreasing ? 0.0005 : -0.005);
        this.ring.rotation.z += 0.01;
    }
}

export default Saturn;