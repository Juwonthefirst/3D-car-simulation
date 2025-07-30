import { EventEmitter } from './event-emitter.js';

class Size extends EventEmitter {
    constructor() {
        super()
        this.width = window.innerWidth
        this.height = window.innerHeight
        this.pixelRatio = window.devicePixelRatio
        
        window.addEventListener('resize', () => {
            this.width = window.innerWidth
            this.height = window.innerHeight
            this.pixelRatio = window.devicePixelRatio
            this.trigger('resize')
        })
    }
}

const size = new Size()

export { size }