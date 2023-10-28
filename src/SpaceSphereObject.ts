import * as THREE from "three";

class SpaceSphereObject {
    public rotateX = 0;
    public rotateY = 0.01;
    private readonly object;
    private t = 0;

    constructor(texturePath, radius, scene) {
        const texture = new THREE.TextureLoader().load(texturePath);
        const material = new THREE.MeshBasicMaterial({map: texture});

        const geometry = new THREE.SphereGeometry(radius, 36, 16);
        const object = new THREE.Mesh(geometry, material);
        this.object = object;
        scene.add(object);
    }

    setPosition(x, y, z) {
        this.object.position.set(x, y, z);
    }

    getPosition(){
        return this.object.position;
    }

    update(isOrbit) {
        this.t += 0.01;
        if(isOrbit){
            this.object.position.x = 20*Math.cos(this.t);
            this.object.position.z = 20*Math.sin(this.t);
        }

        this.object.rotation.x += this.rotateX;
        this.object.rotation.y += this.rotateY;
    }
}

export default SpaceSphereObject;