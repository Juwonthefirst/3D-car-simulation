import { EventEmitter } from './event-emitter.js';

export class Clock extends EventEmitter{
    constructor() {
        super()
        this.start = Date.now()
        this.elapsedTime = 0
        this.deltaTime = 16
        this.current = this.start
        this.tick()
    }
    
    tick(){
        const currentTime = Date.now()
        this.deltaTime = currentTime - this.current
        this.current = currentTime
        this.elapsedTime = this.current - this.start
        this.trigger('tick')
        requestAnimationFrame(() => this.tick())
    }
}

 const clock = new Clock()
 
 export { clock }