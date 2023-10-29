import * as THREE from "three";
import {Vector3} from "three";

class SpaceOrbit {
    public readonly line;

    constructor(scene, radius, position = new Vector3()) {
        let g = new THREE.BufferGeometry().setFromPoints(
            new THREE.Path().absarc(0, 0, radius, 0, Math.PI * 2).getSpacedPoints(1024)
        );
        let m = new THREE.LineBasicMaterial({color: 0xffffff});
        this.line = new THREE.Line(g, m);
        this.line.position.copy(position);
        this.line.rotation.set(Math.PI / 2, 0, 0);
        scene.add(this.line);
    }
}

export default SpaceOrbit;