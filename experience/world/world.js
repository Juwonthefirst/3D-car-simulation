import * as THREE from '../../modules/three.module.js';
import { scene } from '../scene.js';
import { car } from './car.js';
import { camera } from '../camera.js';


class World {
    constructor() {
        this.createFloor()
        this.createSunLight()
        this.createCar()
        
    }
    
    createFloor() {
        this.floorShape = new THREE.PlaneGeometry(200, 200)
        this.floorMaterial = new THREE.MeshStandardMaterial()
        this.floor = new THREE.Mesh(this.floorShape, this.floorMaterial)
        this.floor.name = 'world_floor'
        this.floor.rotation.x = Math.PI * -0.5
        scene.add(this.floor)
    }
    
    createSunLight() {
        scene.add(new THREE.AxesHelper(3))
        this.sunlight = new THREE.DirectionalLight(0xffffff, 2)
        this.ambientLight = new THREE.AmbientLight(0xffffff, 0.1)
        scene.add(this.ambientLight, this.sunlight)
    }
    
    createCar(){
        scene.add(car.mesh)
    }
    
    positionPlayerCamera(){
        const cameraOffset = new THREE.Vector3(1, 2, 0)
        car.position
    }
    
    update() {
        car.update()
    }
}

const world = new World()
export { world }