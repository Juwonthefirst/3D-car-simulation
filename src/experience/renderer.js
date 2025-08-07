import * as THREE from 'three';
import { size } from './utils/sizes.js';
import { camera } from './camera.js';
import { scene } from './scene.js';

export class Renderer {
    constructor(canvas) {
        this.canvas = canvas
        this.#createRenderer()
        
    }
    
    #createRenderer(){
        this.instance = new THREE.WebGLRenderer({
            canvas: this.canvas,
            antialias: true
        })
        this.instance.setSize(size.width, size.height)
        this.instance.setPixelRatio(size.pixelRatio)
        this.instance.shadowMap.enabled = true
        this.instance.shadowMap.type = THREE.PCFSoftShadowMap
    }
    
    resize(){
        this.instance.setSize(size.width, size.height)
        this.instance.setPixelRatio(size.pixelRatio)
    }
    
    update(){
        this.instance.render(scene.instance, camera.instance)
    }
    
}