import { Experience } from './experience/experience.js';
import './style.css'

const canvas = document.querySelector('canvas.webgl')

window.addEventListener('dblclick', () => {
    if (document.fullscreenElement) {
        document.exitFullscreen()
        return 
    }
    
    canvas.requestFullscreen()
})
console.time('experience')
const experience = new Experience(canvas)
console.timeEnd('experience')