import * as CANNON from "cannon-es"
import { obstaclesConfig } from "../../config.js"
import { physicsWorld } from "../world.js"


const rampShape = new CANNON.Box(new CANNON.Vec3(
    obstaclesConfig.ramp.width * 0.5,
    obstaclesConfig.ramp.height * 0.5,
    obstaclesConfig.ramp.depth * 0.5
    )
)

export const createPhysicalRamp = (position) => {
    const ramp = new CANNON.Body({
        mass: 0,
        shape: rampShape
    })
    position.y = 0
    ramp.position.copy(position)
    ramp.quaternion.setFromAxisAngle(new CANNON.Vec3(0, 0, -1), Math.PI * 0.1)
    physicsWorld.addBody(ramp)
    return ramp
}