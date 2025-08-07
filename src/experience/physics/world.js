import * as CANNON from 'cannon-es';
import { clock } from '../utils/clock.js';


class PhysicsWorld {
    #gravity
    constructor() {
        this.createPhysicsWorld()
        this.createFloor()
    }
    
    set gravity(value) {
        this.#gravity = value
        this.world.gravity.set(0, -(this.#gravity), 0)
    }
    
    createPhysicsWorld(){
        this.world = new CANNON.World()
        this.#gravity = 9.82
        this.world.gravity.set(0, -(this.#gravity), 0)
        this.world.allowSleep = true
        this.world.broadphase = new CANNON.SAPBroadphase(this.world)
        this.world.defaultContactMaterial.restitution = 0
        this.world.defaultContactMaterial.friction = 0.7
        this.world.solver.iterations = 30
    }
    
    createFloor(){
        this.floorShape = new CANNON.Plane()
        this.floor = new CANNON.Body({
            mass: 0,
            shape: this.floorShape
        })
        this.floor.quaternion.setFromAxisAngle(new CANNON.Vec3(-1, 0, 0), Math.PI * 0.5)
        this.world.addBody(this.floor)
    }
    
    update() {
        this.world.step(1/60, clock.deltaTime, 3)
    }
    
    addBody(...bodys){
        for (let body of bodys) {
            this.world.addBody(body)
        }
        
    }
    
    addConstraint(...constraints){
        for (let constraint of constraints) {
            this.world.addConstraint(constraint)
        }
    }
}

const physicsWorld = new PhysicsWorld()
export { physicsWorld }