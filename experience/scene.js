import * as THREE from '../modules/three.module.js';

class Scene {
    constructor() {
        this.instance = new THREE.Scene()
    }
    
    add(...objects){
        this.instance.add(...objects)
    }
    
    remove(...objects){
        this.instance.remove(...objects)
    }
}

const scene = new Scene()

export { scene }