import { size } from './utils/sizes.js';
import { camera } from './camera.js';

export class Controls {
    constructor(body) {
        this.body = body
        //this.addAccelerateControls()
        this.addTiltControls()
    }
    
    addAccelerateControls() {
        const handleMouseOrTouchEnter = (event) => {
            const touchCoordinate = event.clientX || event.touches[0].clientX
            if (touchCoordinate > size.width / 2) this.body.accelerate()
            
            else this.body.reverseAcceleration()
        }
        
        const handleMouseOrTouchLeave = () => this.body.decelerate()
        
        window.addEventListener('mousedown', (event) => { handleMouseOrTouchEnter(event) })
        window.addEventListener('touchstart', (event) => { handleMouseOrTouchEnter(event) })
        
        window.addEventListener('touchend', () => { handleMouseOrTouchLeave() })
        window.addEventListener('mouseup', () => { handleMouseOrTouchLeave() })
    }
    
    addTiltControls() {
        
        //DeviceOrientationEvent.requestPermission()
        
        let tilt = 0;
        
        window.addEventListener("devicemotion", (event) => {
            const yAxisTilt = event.accelerationIncludingGravity.y;
            const xAxisTilt = event.accelerationIncludingGravity.x;
            const zAxisTilt = event.accelerationIncludingGravity.z;
            
            console.log(xAxisTilt)
            
            const rawTilt = Math.atan2(yAxisTilt, xAxisTilt) * (180 / Math.PI);
            tilt = 0.9 * tilt + 0.1 * rawTilt;
            tilt = Math.max(-90, Math.min(90, tilt));
            //if (Math.abs(tilt) < 3) tilt = 0;
            
            document.querySelector(".tilt").textContent = `tilt: ${tilt}`
            // Use tilt to control something
            //player.steer(tilt); // e.g. rotate car, move paddle, etc.
        });
    }
}