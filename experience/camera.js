import * as THREE from '../modules/three.module.js';
import { size } from './utils/sizes.js';
import { scene } from './scene.js';
import { OrbitControls } from '../modules/orbit_controls.js';
import { car } from './world/car.js';


class Camera {
    constructor() {
        this.createCamera()
        this.createControls()
    }
    
    createCamera() {
        this.instance = new THREE.PerspectiveCamera(
            60,
            size.width / size.height,
            0.1,
            100
        )
        
        this.instance.position.set(0, 1, 7)
        scene.add(this.instance)
    }
    
    createControls() {
        this.controls = new OrbitControls(this.instance, document.querySelector('.webgl'))
        this.controls.enableDamping = true
    }
    
    resize() {
        this.instance.aspect = size.width / size.height
        if (size.width > size.height) this.instance.fov = 30
        this.instance.updateProjectionMatrix()
    }
    
    positionCameraOnPlayer() {
        const cameraOffset = new THREE.Vector3(2, 1, 0)
        const carBaseCurrentPosition = car.carBase.position.clone()
        const cameraWorldOffset = car.carBase.localToWorld(cameraOffset)
        
        this.instance.position.lerp(cameraWorldOffset, 0.2)
        this.instance.lookAt(carBaseCurrentPosition)
    }
    
    update() {
        this.controls.update()
        this.positionCameraOnPlayer()
    }
    
}

const camera = new Camera()

export { camera }