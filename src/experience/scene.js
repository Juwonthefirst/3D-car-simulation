import * as THREE from 'three';

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