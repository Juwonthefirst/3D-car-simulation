import * as THREE from '../../modules/three.module.js';

class Tree {
    constructor() {
        this.treeHeadGeometry = new THREE.SphereGeometry(1)
        this.treeTrunkGeometry = new THREE.CylinderGeometry(0.3, 0.3, 3)
        this.treeHeadMaterial = new THREE.MeshStandardMaterial({color: 'black'})
        this.treeTrunkMaterial = new THREE.MeshStandardMaterial({color: '#CF885C'})
    }
    
    createTree(scale, position){
        const newTree = new THREE.Group
        const newTreeHead = new THREE.Mesh(this.treeHeadGeometry, this.treeHeadMaterial)
        const newTreeTrunk = new THREE.Mesh(this.treeTrunkGeometry, this.treeTrunkMaterial)
        newTreeHead.position.y = 2.5
        //newTree.position.set(position)
        newTree.scale.set(scale, scale, scale)
        newTree.add(newTreeHead, newTreeTrunk)
        return newTree
    }
}

export { Tree }