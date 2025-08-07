import { clock } from './utils/clock.js';
import { size } from './utils/sizes.js';
import { Renderer } from './renderer.js';
import { camera } from './camera.js';
import { world } from './world/world.js';
import { physicsWorld } from './physics/world.js';
import { resources } from './utils/resources.js'

class Experience {
    constructor(canvas) {
        this.renderer = new Renderer(canvas)
        resources.on("loaded", () => {
            alert("loaded")
        })
        clock.on('tick', () => {
            this.renderer.update()
            world.update()
            physicsWorld.update()
            camera.update()
        })
        
        size.on('resize', () => {
            this.renderer.resize()
            camera.resize()
        })
    }
    
}

export { Experience }