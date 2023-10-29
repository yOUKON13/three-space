import * as THREE from "three";

class SpaceSphereObject {
    public rotateX = 0;
    public rotateY = 0.01;
    public readonly object;
    public readonly parent;
    private basePosition;
    private t = 0;

    constructor(texturePath, public readonly radius, position, scene) {
        this.parent = new THREE.Object3D();
        scene.add(this.parent);

        const texture = new THREE.TextureLoader().load(texturePath);
        const material = new THREE.MeshBasicMaterial({map: texture});

        const geometry = new THREE.SphereGeometry(this.radius, 36, 16);
        const object = new THREE.Mesh(geometry, material);
        this.object = object;
        this.basePosition = position;
        this.setPosition(...position);
        this.parent.add(object);
    }

    setPosition(x, y, z) {
        this.parent.position.set(x, y, z);
    }

    update(velocity=-1) {
        if(velocity === -1){
            velocity = this.basePosition.z;
        }

        this.t += 0.01;
        this.parent.position.x = velocity * Math.cos(this.t);
        this.parent.position.z = velocity * Math.sin(this.t);

        this.object.rotation.x += this.rotateX;
        this.object.rotation.y += this.rotateY;
    }
}

export default SpaceSphereObject;