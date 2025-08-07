import * as THREE from "three"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js"
import { EventEmitter } from "./event-emitter.js"
import { sources } from "./sources.js"


class Resources extends EventEmitter{
    constructor(sources){
        super()
        this.sources = sources
        this.toLoad = this.sources.length
        this.loaded = 0
        this.items = {}
        this.setLoaders()
        this.loadResourses()
    }
    
    setLoaders(){
        this.loaders = {}
        this.loaders.textureLoader = new THREE.TextureLoader()
        this.loaders.cubeTextureLoader = new THREE.CubeTextureLoader()
        this.loaders.gltfLoader = new GLTFLoader()
    }
    
    loadResourses(){
        for(let source of this.sources){
            let loader
            if(source.type === "cubeTexture") loader = this.loaders.cubeTextureLoader
            else if(source.type === "texture") loader = this.loaders.textureLoader
            else if(source.type === "gltfModel") loader = this.loaders.gltfLoader
            
            loader?.load(
                source.path,
                (file) => {
                    this.onSourceLoaded(source, file)
                }
            )
        }
    }
    
    onSourceLoaded(source, file){
        this.items[source.name] = file
        
        this.loaded++
        
        if(this.loaded === this.toLoad){
            this.trigger("loaded")
        }
    }
}
export const resources = new Resources(sources)