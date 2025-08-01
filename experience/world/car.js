import * as THREE from '../../modules/three.module.js';
import { PhysicsCar } from '../physics/car.js';
import { carPartsSizes } from '../config.js';

const carTyreConfig = carPartsSizes.carTyre
const carTyreJointsConfig = carPartsSizes.carTyreJoint
const carBaseConfig = carPartsSizes.carBase


class Car {
    constructor() {
        
        this.mesh = new THREE.Group()
        this.carTyreGeometry = new THREE.CylinderGeometry(
            carTyreConfig.radius,
            carTyreConfig.radius,
            carTyreConfig.height,
            carTyreConfig.radiusSegments
        )
        
        this.carTyreMaterial = new THREE.MeshStandardMaterial({ color: 'black', wireframe: true })
        this.tyreJointGeometry = new THREE.CylinderGeometry(
            carTyreJointsConfig.radius,
            carTyreJointsConfig.radius,
            carTyreJointsConfig.height,
            carTyreJointsConfig.radiusSegments
        )
        
        this.createCarTyreModel()
        this.createCarBodyModel()
        this.carPhysics = new PhysicsCar()
    }
    
    createCarBodyModel() {
        this.carBase = new THREE.Mesh(
            new THREE.BoxGeometry(
                carBaseConfig.width,
                carBaseConfig.height,
                carBaseConfig.depth,
            ),
            this.carTyreMaterial
        )
        
        this.mesh.add(this.carBase)
    }
    
    createCarTyreModel() {
        this.frontTyreJoint = new THREE.Mesh(this.tyreJointGeometry, this.carTyreMaterial)
        this.backTyreJoint = new THREE.Mesh(this.tyreJointGeometry, this.carTyreMaterial)
        
        this.carTyre1 = new THREE.Mesh(this.carTyreGeometry, this.carTyreMaterial)
        this.carTyre2 = new THREE.Mesh(this.carTyreGeometry, this.carTyreMaterial)
        this.carTyre3 = new THREE.Mesh(this.carTyreGeometry, this.carTyreMaterial)
        this.carTyre4 = new THREE.Mesh(this.carTyreGeometry, this.carTyreMaterial)
        

        this.mesh.add(this.carTyre1, this.carTyre2, this.carTyre3, this.carTyre4,/* this.frontTyreJoint, this.backTyreJoint*/)
    }
    
    update() {
        const carPartsToUpdate = [/*'frontTyreJoint', 'backTyreJoint', */'carTyre1', 'carTyre2', 'carTyre3', 'carTyre4', 'carBase']
        for (let carPart of carPartsToUpdate) {
            this[carPart].position.copy(this.carPhysics[carPart].position)
            this[carPart].quaternion.copy(this.carPhysics[carPart].quaternion)
        }
        
        console.log(this.carPhysics.carBase.velocity)
    }
}

const car = new Car()

export { car }