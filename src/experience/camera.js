import * as THREE from 'three';
import { size } from './utils/sizes.js';
import { scene } from './scene.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { car } from './world/car.js';


class PlayerCamera {
    constructor(player) {
        this.player = player
        this.playerCameraOffset = new THREE.Vector3(2.5, 0.5, 0)
        this.createCamera()
        this.createControls()
    }
    
    set playerCameraDirection(direction){
        if(direction !== "front" && direction !== "back") return 
        this.playerCameraOffset.x = (direction === "front")? -2.5 : 2.5
    }
    
    createCamera() {
        const fov = (size.width > size.height)? 30 : 60
        const aspect = size.width / size.height
        
        this.instance = new THREE.PerspectiveCamera(fov, aspect, 0.1, 100)
        this.instance.position.set(3, 7, 1)
        scene.add(this.instance)
    }
    
    createControls() {
        this.controls = new OrbitControls(this.instance, document.querySelector('.webgl'))
        this.controls.enableDamping = true
    }
    
    resize() {
        this.instance.aspect = size.width / size.height
        this.instance.fov = (size.width > size.height)? 30 : 60
        this.instance.updateProjectionMatrix()
    }
    
    positionCameraToPlayer() {
        const carBaseCurrentPosition = car.carBase.position.clone()
        const cameraWorldOffset = car.carBase.localToWorld(this.playerCameraOffset.clone())
        cameraWorldOffset.y = Math.abs(cameraWorldOffset.y)
        //cameraWorldOffset.z = Math.abs(cameraWorldOffset.z)
        this.instance.position.lerp(cameraWorldOffset, 0.2)
        this.instance.lookAt(carBaseCurrentPosition)
    }
    
    update() {
        this.controls?.update()
        //this.positionCameraToPlayer()
    }
    
}

const camera = new PlayerCamera()

export { camera }