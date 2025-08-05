import { EventEmitter } from './event-emitter.js';

class Clock extends EventEmitter{
    #deltaTime
    constructor() {
        super()
        this.start = Date.now()
        this.elapsedTime = 0
        this.#deltaTime = 16
        this.current = this.start
        this.tick()
    }
    
    get deltaTime(){
        return this.#deltaTime * 0.001
    }
    
    tick(){
        const currentTime = Date.now()
        this.#deltaTime = currentTime - this.current
        this.current = currentTime
        this.elapsedTime = this.current - this.start
        this.trigger('tick')
        requestAnimationFrame(() => this.tick())
    }
}

 const clock = new Clock()
 
 export { clock }