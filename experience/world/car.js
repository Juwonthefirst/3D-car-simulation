import * as THREE from '../../modules/three.module.js';

class Car {
    constructor() {
        this.carGeometry = new THREE.BoxGeometry(0.5, 0.1, 1)
        this.carMaterial = new THREE.MeshStandardMaterial()
        this.body = new THREE.Mesh(this.carGeometry, this.carMaterial)
    }
    
    addControls(){
        window.addEventListener('touchstart', (event) => {
            const touch = event.touches[0]
            touch.clientX
        })
    }
}