import * as THREE from "three";
import {Vector3} from "three";

class SpaceOrbit {
    constructor(scene, radius, position = new Vector3()) {
        const geometry = new THREE.RingGeometry(radius, radius + 0.005, 64);
        const material = new THREE.MeshBasicMaterial({color: 0xffffff, side: THREE.DoubleSide});
        const mesh = new THREE.Mesh(geometry, material);
        mesh.position.copy(position);
        mesh.rotation.set(Math.PI / 2, 0, 0);
        scene.add(mesh);
    }
}

export default SpaceOrbit;