import { size } from './utils/sizes.js';
import { camera } from './camera.js';

export class Controls {
    constructor(body) {
        this.body = body
        this.turnTo = null
        //this.body.accelerate()
        //this.addWindowInteractionsListeners()
        //this.addTiltControls()
    }
    addWindowInteractionsListeners(){
        const onInteractionEventHandler = (event) => {
            const clickCoordinateX = event.clientX || event.touches[0].clientX 
            const clickCoordinateY = event.clientY || event.touches[0].clientY
            if((clickCoordinateY > size.height * 0.9 && clickCoordinateX > size.width * 0.9) || 
               (clickCoordinateY < size.height * 0.1 && clickCoordinateX < size.width * 0.1)) alert("braking")
            else this.onTurning(clickCoordinateX)
        }
        
        const onInteractionEndEventHandler = () => {
            this.onTurningEnd()
        }
        
        window.addEventListener('mousedown', (event) => { onInteractionEventHandler(event) })
        window.addEventListener('touchstart', (event) => { onInteractionEventHandler(event) })
        window.addEventListener('touchend', () => { onInteractionEndEventHandler() })
        window.addEventListener('mouseup', () => { onInteractionEndEventHandler() })
    }
    
    onTurning(clickCoordinateX) { 
        if (clickCoordinateX > size.width / 2) this.turnTo = () => this.body.turnRight()
        else this.turnTo = () => this.body.turnLeft()
    }
    
    onTurningEnd(){
        this.turnTo = () => this.body.reCenter()
    }
    
    onBrake(){
        this.body.reverseAcceleration()
    }
    
    addTiltControls() {
        
        let tilt = 0;
        
        window.addEventListener("devicemotion", (event) => {
            const yAxisTilt = event.accelerationIncludingGravity.y;
            const xAxisTilt = event.accelerationIncludingGravity.x;
            const zAxisTilt = event.accelerationIncludingGravity.z;
            
            const rawTilt = Math.atan2(yAxisTilt, xAxisTilt) * (180 / Math.PI);
            tilt = 0.9 * tilt + 0.1 * rawTilt;
            tilt = Math.max(-90, Math.min(90, tilt));
            //if (Math.abs(tilt) < 3) tilt = 0;
            // Use tilt to control something
            //player.steer(tilt); // e.g. rotate car, move paddle, etc.
        });
    }
    
    update(){
        this.turnTo?.()
    }
}
