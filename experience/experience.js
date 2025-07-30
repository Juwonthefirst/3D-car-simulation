import { clock } from './utils/clock.js';
import { size } from './utils/sizes.js';
import { Renderer } from './renderer.js';
import { camera } from './camera.js';
import { world } from './world/world.js';


class Experience {
    constructor(canvas) {
        
        this.renderer = new Renderer(canvas)
        
        clock.on('tick', () => {
            this.renderer.update()
            world.update()
            
        })
        
        size.on('resize', () => {
            this.renderer.resize()
            camera.resize()
        })
    }
    
    play(canvas) {
        
        
    }
    
}

export { Experience }