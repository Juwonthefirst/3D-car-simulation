import * as CANNON from 'cannon-es';
import { Vector3 } from 'three'
import { physicsWorld } from './world.js';
import { carPartsSizes, carSpeedConfig, turningConfig } from '../config.js';


const carTyreConfig = carPartsSizes.carTyre
const carTyreJointsConfig = carPartsSizes.carTyreJoint
const carBaseConfig = carPartsSizes.carBase


export class PhysicsCar {
    #velocity
    constructor() {
        this.maxAngularVelocity = carSpeedConfig.maxAngularVelocity
        this.maxMotorForce = carSpeedConfig.maxMotorForce
        this.maxVelocity = this.maxAngularVelocity * carTyreConfig.radius
        this.turningAngle = 0
        this.#createCarBody()
        this.#createCarTyre()
        this.#applyConstraints()
        this.#velocity = 0
    }
    
    get velocity() {
        return this.carBase.velocity.length().toFixed(2)
    }
    
    
    #createCarBody() {
        this.carBase = new CANNON.Body({
            mass: carBaseConfig.mass,
            shape: new CANNON.Box(new CANNON.Vec3(
                carBaseConfig.width * 0.5,
                carBaseConfig.height * 0.5,
                carBaseConfig.depth * 0.5,
            ))
        })
        this.carBase.angularDamping = 0.5
        this.carBase.linearDamping = 0.1
        this.carBase.position.set(0, carTyreConfig.radius * 2, 0)
        
        physicsWorld.addBody(this.carBase)
    }
    
    #createCarTyre() {
        const tyreProperties = {
            mass: carTyreConfig.mass,
            shape: new CANNON.Sphere(
                carTyreConfig.radius
            )
        }
        
        const createCarTyreBody = (xPosition, zPosition) => {
            const carTyreBody = new CANNON.Body(tyreProperties)
            carTyreBody.quaternion.setFromAxisAngle(new CANNON.Vec3(-1, 0, 0), Math.PI * 0.5)
            carTyreBody.position.set(xPosition, carTyreConfig.radius, zPosition)
            carTyreBody.angularDamping = 0.5
            return carTyreBody
        }
        
        this.carTyre1 = createCarTyreBody(-0.4, 0.5)
        this.carTyre2 = createCarTyreBody(-0.4, -0.5)
        this.carTyre3 = createCarTyreBody(0.4, 0.5)
        this.carTyre4 = createCarTyreBody(0.4, -0.5)
        
        this.tyres = [this.carTyre1, this.carTyre2, this.carTyre3, this.carTyre4]
        
        physicsWorld.addBody(...this.tyres)
    }
    
    #applyConstraints() {
        
        const createHingeConstraintOnCarBase = (object, xPosition, zPosition) => {
            const constraint = new CANNON.HingeConstraint(
                this.carBase, object, {
                    pivotA: new CANNON.Vec3(xPosition, 0, zPosition),
                    pivotB: new CANNON.Vec3(0, 0, 0),
                    axisA: new CANNON.Vec3(0, 0, 1),
                    axisB: new CANNON.Vec3(0, 1, 0),
                }
            )
            return constraint
        }
        
        this.frontTyreHinge1 = createHingeConstraintOnCarBase(this.carTyre1, -0.4, 0.5)
        this.frontTyreHinge2 = createHingeConstraintOnCarBase(this.carTyre2, -0.4, -0.5)
        //this.frontTyreHinge1.pivotB.y = -1
        this.backTyreHinge1 = createHingeConstraintOnCarBase(this.carTyre3, 0.4, 0.5)
        this.backTyreHinge2 = createHingeConstraintOnCarBase(this.carTyre4, 0.4, -0.5)
        //this.backTyreHinge1.pivotB.y = -1
        
        this.backTyreHinges = [this.backTyreHinge1, this.backTyreHinge2]
        physicsWorld.addConstraint(this.frontTyreHinge1, this.frontTyreHinge2, this.backTyreHinge1, this.backTyreHinge2)
    }
    
    wakeUpCar() {
        this.carBase.wakeUp()
        this.tyres.forEach((tyre) => tyre.wakeUp())
    }
    
    accelerate() {
        this.wakeUpCar()
        this.backTyreHinges.forEach((hinge) => {
            hinge.enableMotor()
            hinge.setMotorMaxForce(this.maxMotorForce)
            hinge.setMotorSpeed(this.maxAngularVelocity)
        })
    }
    
    decelerate() {
        this.backTyreHinges.forEach((hinge) => {
            hinge.disableMotor()
        })
    }
    
    reverseAcceleration() {
        this.wakeUpCar()
        this.backTyreHinges.forEach((hinge) => {
            hinge.enableMotor()
            hinge.setMotorMaxForce(-this.maxMotorForce)
            hinge.setMotorSpeed(this.maxAngularVelocity)
        })
    }
    
    turnTyres(turningAngle){
        this.wakeUpCar()
        console.log(turningAngle)
        const axisAngle = turningAngle * (Math.PI / 180)
        const turningVector = new Vector3(0, 0, 0)
        
        const axis = turningVector.copy(new CANNON.Vec3(0, 0, -1)).applyAxisAngle(new CANNON.Vec3(0, 1, 0), axisAngle)
        this.frontTyreHinge1.axisA.copy(axis)
        this.frontTyreHinge2.axisA.copy(axis)
    }
    
    reCenter(){
        // if (Math.round(this.turningAngle) === 0) return
//         this.turningAngle *= turningConfig.reCenterSensitivity
//         this.turnTyres(this.turningAngle)
    }
    
    turnLeft(){
        // if (this.turningAngle > turningConfig.maxTurnAngle) return
//         this.turningAngle += turningConfig.sensitivity
//         this.turnTyres(this.turningAngle)
    }
   
    turnRight(){
        // if (this.turningAngle < -turningConfig.maxTurnAngle) return
//         this.turningAngle -= turningConfig.sensitivity
//         this.turnTyres(this.turningAngle)
    }
    
}