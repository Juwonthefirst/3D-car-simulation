import { Experience } from './experience/experience.js';

const canvas = document.querySelector('canvas.webgl')


console.time('experience')
const experience = new Experience(canvas)
console.timeEnd('experience')