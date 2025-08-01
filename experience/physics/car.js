import * as CANNON from '../../modules/cannon-es.js';
import { physicsWorld } from './world.js';
import { carPartsSizes } from '../config.js';

const carTyreConfig = carPartsSizes.carTyre
const carTyreJointsConfig = carPartsSizes.carTyreJoint
const carBaseConfig = carPartsSizes.carBase


export class PhysicsCar {
    constructor() {
        this.createCarBody()
        this.createCarTyre()
        //this.createCarTyreJoints()
        this.applyConstraints()
    }
    
    createCarBody() {
        this.carBase = new CANNON.Body({
            mass: carBaseConfig.mass,
            shape: new CANNON.Box(new CANNON.Vec3(
                carBaseConfig.width * 0.5,
                carBaseConfig.height * 0.5,
                carBaseConfig.depth * 0.5,
            ))
        })
        
        this.carBase.position.set(0, carTyreConfig.radius * 3, 0)
        physicsWorld.addBody(this.carBase)
    }
    
    createCarTyreJoints() {
        const tyreJointProperties = {
            mass: 0.2,
            shape: new CANNON.Cylinder(
                carTyreJointsConfig.radius,
                carTyreJointsConfig.radius,
                carTyreJointsConfig.height,
                carTyreJointsConfig.radiusSegments
            )
        }
        
        this.frontTyreJoint1 = new CANNON.Body(tyreJointProperties)
        this.frontTyreJoint2 = new CANNON.Body(tyreJointProperties)
        
        this.backTyreJoint1 = new CANNON.Body(tyreJointProperties)
        this.backTyreJoint2 = new CANNON.Body(tyreJointProperties)
        
        this.frontTyreJoint1.quaternion.setFromAxisAngle(new CANNON.Vec3(-1, 0, 0), Math.PI * 0.5)
        this.frontTyreJoint2.quaternion.setFromAxisAngle(new CANNON.Vec3(-1, 0, 0), Math.PI * 0.5)
        this.backTyreJoint1.quaternion.setFromAxisAngle(new CANNON.Vec3(-1, 0, 0), Math.PI * 0.5)
        this.backTyreJoint2.quaternion.setFromAxisAngle(new CANNON.Vec3(-1, 0, 0), Math.PI * 0.5)
        
        this.frontTyreJoint1.position.set(-2, 0, 0)
        this.frontTyreJoint2.position.set(-2, 0, 0)
        this.backTyreJoint1.position.set(2, 0, 0)
        this.backTyreJoint2.position.set(2, 0, 0)
        
        physicsWorld.addBody(this.frontTyreJoint1, this.frontTyreJoint2, this.backTyreJoint1, this.backTyreJoint2)
    }
    
    createCarTyre() {
        const tyreProperties = {
            mass: carTyreConfig.mass,
            shape: new CANNON.Cylinder(
                carTyreConfig.radius,
                carTyreConfig.radius,
                carTyreConfig.height,
                carTyreConfig.radiusSegments
            )
        }
        
        this.carTyre1 = new CANNON.Body(tyreProperties)
        this.carTyre2 = new CANNON.Body(tyreProperties)
        this.carTyre3 = new CANNON.Body(tyreProperties)
        this.carTyre4 = new CANNON.Body(tyreProperties)
        
        const tyres = [this.carTyre1, this.carTyre2, this.carTyre3, this.carTyre4]
        tyres.forEach((tyre, index) => {
            
            tyre.quaternion.setFromAxisAngle(new CANNON.Vec3(-1, 0, 0), Math.PI * 0.5)
            tyre.position.x = (index > 1) ? 0.4 : -0.4
            tyre.position.y = 0.3
            tyre.position.z = (index % 2 === 0) ? 0.4 : -0.4
            
        })
        
        physicsWorld.addBody(...tyres)
    }
    
    applyConstraints() {
        
        this.frontTyreHinge1 = new CANNON.HingeConstraint(
            this.carBase, this.carTyre1, {
                pivotA: new CANNON.Vec3(-0.4, 0, 0.5),
                pivotB: new CANNON.Vec3(0, 0, 0),
                axisA: new CANNON.Vec3(0, 0, 1),
                axisB: new CANNON.Vec3(0, 1, 0),
            }
        )
        
        this.frontTyreHinge2 = new CANNON.HingeConstraint(
            this.carBase, this.carTyre2, {
                pivotA: new CANNON.Vec3(-0.4, 0, -0.5),
                pivotB: new CANNON.Vec3(0, 0, 0),
                axisA: new CANNON.Vec3(0, 0, 1),
                axisB: new CANNON.Vec3(0, 1, 0),
            }
        )
        
        this.backTyreHinge1 = new CANNON.HingeConstraint(
            this.carBase, this.carTyre3, {
                pivotA: new CANNON.Vec3(0.4, 0, 0.5),
                pivotB: new CANNON.Vec3(0, 0, 0),
                axisA: new CANNON.Vec3(0, 0, 1),
                axisB: new CANNON.Vec3(0, 1, 0),
            }
        )
        
        this.backTyreHinge2 = new CANNON.HingeConstraint(
            this.carBase, this.carTyre4, {
                pivotA: new CANNON.Vec3(0.4, 0, -0.5),
                pivotB: new CANNON.Vec3(0, 0, 0),
                axisA: new CANNON.Vec3(0, 0, 1),
                axisB: new CANNON.Vec3(0, 1, 0),
            }
        )
        
        this.backTyreHinges = [this.backTyreHinge1, this.backTyreHinge2]
        this.backTyreHinges.forEach((hinge) => {
            hinge.enableMotor()
            hinge.setMotorMaxForce(10)
            hinge.setMotorSpeed(30)
        })
        
        physicsWorld.addConstraint(this.frontTyreHinge1, this.frontTyreHinge2, this.backTyreHinge1, this.backTyreHinge2)
    }
    
    
}