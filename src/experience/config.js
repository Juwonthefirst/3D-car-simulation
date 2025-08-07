export const carPartsSizes = {
    carBase: {
        mass: 50,
        width: 1,
        height: 0.25,
        depth: 0.5,
    },
    
    carTyreJoint: {
        radius: 0.01,
        height: 0.35,
        radiusSegments: 8,
    },
    
    carTyre: {
        mass: 5,
        radius: 0.25,
        height: 0.25,
        radiusSegments: 64,
    }
    
}

export const carSpeedConfig = {
    maxAngularVelocity: 500,
    maxMotorForce: 1.25
}

export const turningConfig = {
    sensitivity: 0.7,
    reCenterSensitivity: 0.009,
    maxTurnAngle: 20,
}

export const obstaclesConfig = {
    ramp: {
        width: 3,
        height: 1,
        depth: 3
    }
}
