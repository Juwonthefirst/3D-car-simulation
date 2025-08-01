import * as THREE from '../../modules/three.module.js';
import { PhysicsCar } from '../physics/car.js';
class Car {
    constructor() {
        this.mesh = new THREE.Group()
        this.mesh.position.set(0, 1, 0)
        this.carTyreGeometry = new THREE.CylinderGeometry(0.3, 0.3, 0.2, 32)
        this.carTyreMaterial = new THREE.MeshStandardMaterial({color: 'black', wireframe: true})
        this.tyreJointGeometry = new THREE.CylinderGeometry(0.01, 0.01, 1.2)
        this.createCarTyreModel()
        this.createCarBodyModel()
        this.carPhysics = new PhysicsCar(this.carTyreGeometry, this.tyreJointGeometry)
    }
    
    createCarBodyModel(){
        this.carBase = new THREE.Mesh(
            new THREE.BoxGeometry(1, 0.25, 0.5),
            this.carTyreMaterial
        )
        this.carBase.position.y = 0.125
        
        this.carHead = new THREE.Mesh(
            new THREE.BoxGeometry(0.1, 0.25, 0.5),
            this.carTyreMaterial
        )
        this.carHead.position.y = 0.375
        
        this.mesh.add(this.carBase)
    }
    
    createCarTyreModel(){
        this.frontTyreJoint = new THREE.Mesh(this.tyreJointGeometry, this.carTyreMaterial)
        this.backTyreJoint = new THREE.Mesh(this.tyreJointGeometry, this.carTyreMaterial)
        
        this.carTyre1 = new THREE.Mesh(this.carTyreGeometry, this.carTyreMaterial)
        this.carTyre2 = new THREE.Mesh(this.carTyreGeometry, this.carTyreMaterial)
        this.carTyre3 = new THREE.Mesh(this.carTyreGeometry, this.carTyreMaterial)
        this.carTyre4 = new THREE.Mesh(this.carTyreGeometry, this.carTyreMaterial)
        
        this.frontTyreJoint.rotation.x = Math.PI * 0.5
        this.backTyreJoint.rotation.x = Math.PI * 0.5
        
        this.carTyre1.rotation.x = Math.PI * 0.5
        this.carTyre2.rotation.x = Math.PI * 0.5
        this.carTyre3.rotation.x = Math.PI * 0.5
        this.carTyre4.rotation.x = Math.PI * 0.5
        
        this.frontTyreJoint.position.set(-0.4, 0, 0)
        this.backTyreJoint.position.set(0.4, 0, 0)

        this.carTyre1.position.set(-0.4, 0, 0.5)
        this.carTyre2.position.set(-0.4, 0, -0.5)
        this.carTyre3.position.set(0.4, 0, 0.5)
        this.carTyre4.position.set(0.4, 0, -0.5)

        this.mesh.add(this.carTyre1, this.carTyre2, this.carTyre3, this.carTyre4, this.frontTyreJoint, this.backTyreJoint)
    }
    
    update(){
        console.log('juwon')
    }
}

const car = new Car()

export { car }