import * as THREE from '../../modules/three.module.js';
import { scene } from '../scene.js';
import { Tree } from './tree.js';

class World {
    constructor() {
        this.forest = new Tree()
        this.createFloor()
        this.createSunLight()
        this.addTrees()
        scene.add(
            new THREE.Mesh(
                new THREE.BoxGeometry(),
                new THREE.MeshBasicMaterial({color: 'black'})
            )
        )
    }
    
    createFloor() {
        this.floorShape = new THREE.PlaneGeometry(200, 200)
        this.floorMaterial = new THREE.MeshStandardMaterial()
        this.floor = new THREE.Mesh(this.floorShape, this.floorMaterial)
        this.floor.rotation.x = Math.PI * -0.5
        scene.add(this.floor)
    }
    
    createSunLight() {
        this.sunlight = new THREE.DirectionalLight(0xffffff, 2)
        scene.add(this.sunlight)
    }
    
    addTrees() {
        for (let i = 0; i < 10; i++) {
            const treeSize = Math.random() * 3
            console.log(treeSize)
            
            const tree = this.forest.createTree(
                treeSize,
                {
                    x: Math.random() * 3,
                    y: treeSize / 2,
                    z: Math.random() * 3
                }
            )
            console.log(tree)
            scene.add(tree)
        }
    }
    
    update() {
        
        
    }
}

const world = new World()
export { world }