import * as THREE from 'three';
import { scene } from '../scene.js';
import { car } from './car.js';
import { camera } from '../camera.js';
import { createRamp } from './obstacles/ramp.js'

class World {
    constructor() {
        this.createFloor()
        this.createSunLight()
        this.createCar()
        
    }
    
    createFloor() {
        this.floorShape = new THREE.PlaneGeometry(20000, 20000)
        this.floorMaterial = new THREE.MeshStandardMaterial({
            "roughness": 0.4,
            "metalness": 0.3
        })
        this.floor = new THREE.Mesh(this.floorShape, this.floorMaterial)
        this.floor.name = 'world_floor'
        this.floor.rotation.x = Math.PI * -0.5
        this.floor.position.y = -0.08
        scene.add(this.floor)
    }
    
    createSunLight() {
        scene.add(new THREE.AxesHelper(10))
        this.sunlight = new THREE.DirectionalLight(0xffffff, 2)
        scene.add(this.sunlight)
    }
    
    createCar(){
        scene.add(car.mesh)
    }
    
    update() {
        car.update()
    }
}

const world = new World()
export { world }