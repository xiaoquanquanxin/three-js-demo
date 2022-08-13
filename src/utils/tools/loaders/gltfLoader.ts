//  @ts-nocheck

import { GLTF, GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { addToMaterialPool, getFromMaterialPool } from 'src/utils/tools/material/materialPool'
import { DoubleSide, Mesh } from 'three'

//  添加素材
const loader = new GLTFLoader()

//  添加 gltf 到 scene
const loadGltf = async (url: string): Promise<GLTF> => {
    const gltf_package = getFromMaterialPool(url)
    //  取得缓存
    if (gltf_package) {
        return gltf_package
    }
    //  取得最新的
    const gltf_origin = await new Promise<GLTF>((resolve, reject) => {
        loader.load(url, resolve, undefined, reject)
    })

    console.log('loadGltf--', gltf_origin)

    //  让model产生投影
    gltf_origin.scene.traverse(function (node) {
        if (node instanceof Mesh) {
            console.log(node)

            //  FIX
            node.geometry.computeVertexNormals()
            //  产生投影
            node.castShadow = true
            //  接受投影
            node.receiveShadow = true
            //  任何时候都渲染
            // node.frustumCulled = false;
            node.material.roughness = 1
            node.material.shadowSide = DoubleSide
            node.material.side = DoubleSide
            //  模型自发光
            // return
            node.material.emissive = node.material.color
            node.material.emissiveMap = node.material.map
            node.material.flatShading = false
        }
    })

    //  添加到素材池
    addToMaterialPool(url, gltf_origin)

    return gltf_origin
}

export { loadGltf }
