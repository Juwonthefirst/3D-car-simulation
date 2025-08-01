import * as THREE from '../modules/three.module.js';
import { size } from './utils/sizes.js';
import { scene } from './scene.js';
import { OrbitControls } from '../modules/orbit_controls.js';

class Camera {
    constructor() {
        this.createCamera()
        this.createControls()
    }
    
    createCamera(){
        this.instance = new THREE.PerspectiveCamera(
            60,
            size.width / size.height,
            0.1,
            100
        )
        
        this.instance.position.set(0, 1, 7)
        scene.add(this.instance)
    }
    
    createControls(){
        this.controls = new OrbitControls(this.instance, document.querySelector('.webgl'))
        this.controls.enableDamping = true
    }
    
    resize(){
        this.instance.aspect = size.width / size.height
        this.instance.updateProjectionMatrix()
    }
    
    update(){
        this.controls.update()
    }
    
}

const camera = new Camera()

export { camera }