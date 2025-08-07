import * as THREE from 'three';
import { resources } from "./utils/resources.js"

class Scene {
    constructor() {
        this.instance = new THREE.Scene()
        this.instance.enviroment = resources.items.enviromentMap
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