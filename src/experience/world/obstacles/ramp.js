import * as THREE from 'three'
import { createPhysicalRamp } from '../../physics/obstacles/ramp.js'
import { obstaclesConfig } from "../../config.js"


const rampGeometry = new THREE.BoxGeometry(
    obstaclesConfig.ramp.width,
    obstaclesConfig.ramp.height,
    obstaclesConfig.ramp.depth,
)
const rampMaterial = new THREE.MeshStandardMaterial({color: "blue"})

export const createRamp = (position) => {
    const physicalRamp = createPhysicalRamp(position)
    const ramp = new THREE.Mesh(rampGeometry, rampMaterial)
    ramp.quaternion.copy(physicalRamp.quaternion)
    ramp.position.copy(physicalRamp.position)
    return ramp
}