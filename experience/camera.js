import * as THREE from '../modules/three.module.js';
import { size } from './utils/sizes.js';
import { scene } from './scene.js';

class Camera {
    constructor() {
        this.createCamera()
    }
    
    createCamera(){
        this.instance = new THREE.PerspectiveCamera(
            60,
            size.width / size.height,
            0.01,
            1000
        )
        
        this.instance.position.set(3, 1, -30)
        scene.add(this.instance)
    }
    
    resize(){
        this.instance.aspect = size.width / size.height
        this.instance.updateProjectionMatrix()
    }
    
}

const camera = new Camera()

export { camera }