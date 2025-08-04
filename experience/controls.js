import { size } from './utils/sizes.js';
import {camera} from './camera.js';

export class Controls {
    constructor(body) {
       this.body = body
       //this.addAccelerateControls()
       this.addTiltControls()
    }
    
    addAccelerateControls(){
        const handleMouseOrTouchEnter = (event) => {
            const touchCoordinate = event.clientX || event.touches[0].clientX
            if (touchCoordinate > size.width / 2) this.body.accelerate()
            
            else this.body.reverseAcceleration()
        }
        
        const handleMouseOrTouchLeave = () => this.body.decelerate()
        
        window.addEventListener('mousedown', (event) => {handleMouseOrTouchEnter(event)})
        window.addEventListener('touchstart', (event) => {handleMouseOrTouchEnter(event)})
        
        window.addEventListener('touchend', () => {handleMouseOrTouchLeave()})
        window.addEventListener('mouseup', () => {handleMouseOrTouchLeave()})
    }
    
    addTiltControls(){
        
        //DeviceOrientationEvent.requestPermission()
       
       window.addEventListener('deviceorientation', (event) => {
           console.log(event.gamma)
           //camera.instance.rotateY(event.gamma)
           document.querySelector('.tilt').textContent = `y tilt: ${event.gamma}`
           //alert(event.gamma)
       }, true)
    }
}