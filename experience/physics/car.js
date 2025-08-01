import * as CANNON from '../../modules/cannon-es.js';
import { createPhysicsShapeFromGeometry } from './utils/CreatePhysicsShape.js';
import { physicsWorld } from './world.js';

export class PhysicsCar {
    constructor(tyreGeometry, jointGeometry) {
        this.tyreGeometry = tyreGeometry
        this.jointGeometry = jointGeometry
        this.createCarBody()
        this.createCarTyre()
        this.createCarTyreJoints()
    }
    
    createCarBody() {
        
    }
    
    createCarTyreJoints() {
        this.frontTyreJoint = new CANNON.Body({
            mass: 0.1,
            shape: createPhysicsShapeFromGeometry(this.jointGeometry)
        })
        
        this.backTyreJoint = new CANNON.Body({
            mass: 0.1,
            shape: createPhysicsShapeFromGeometry(this.jointGeometry)
        })
        
        this.frontTyreJoint.quaternion.setFromAxisAngle(new CANNON.Vec3(-1, 0, 0), Math.PI * 0.5)
        this.backTyreJoint.quaternion.setFromAxisAngle(new CANNON.Vec3(-1, 0, 0), Math.PI * 0.5)
        
        this.frontTyreJoint.position.set(-0.4, 0, 0)
        this.backTyreJoint.position.set(0.4, 0, 0)
        
        physicsWorld.addBody(this.frontTyreJoint, this.backTyreJoint)
    }
    
    createCarTyre() {
        this.carTyre1 = new CANNON.Body({
            mass: 1,
            shape: createPhysicsShapeFromGeometry(this.tyreGeometry)
        })
        
        this.carTyre2 = new CANNON.Body({
            mass: 1,
            shape: createPhysicsShapeFromGeometry(this.tyreGeometry)
        })
        
        this.carTyre3 = new CANNON.Body({
            mass: 1,
            shape: createPhysicsShapeFromGeometry(this.tyreGeometry)
        })
        
        this.carTyre4 = new CANNON.Body({
            mass: 1,
            shape: createPhysicsShapeFromGeometry(this.tyreGeometry)
        })
        
        const tyres = [this.carTyre1, this.carTyre2, this.carTyre3, this.carTyre4]
        tyres.forEach((tyre, index) => {
            
            tyre.quaternion.setFromAxisAngle(new CANNON.Vec3(-1, 0, 0), Math.PI * 0.5)
            tyre.position.x = (index > 1) ? 0.4 : -0.4
            tyre.position.z = (index % 2 === 0) ? 0.5 : -0.5
            
        })
        
        physicsWorld.addBody(...tyres)
    }
}