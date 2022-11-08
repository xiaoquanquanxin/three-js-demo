//  @ts-nocheck
import { GLTF, GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { addToMaterialPool, getFromMaterialPool } from 'src/utils/tools/material/materialPool'

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

    console.log('gltf_origin.scene', gltf_origin.scene.children)

    //  添加到素材池
    addToMaterialPool(url, gltf_origin)

    return gltf_origin
}

export { loadGltf }

// const cubeEdges = new EdgesGeometry(node.geometry)
// const edgesMtl = new LineBasicMaterial({
//     linewidth: 32,
//     color: 0x00ff00
// })
// const edgesMtl = new MeshBasicMaterial({
//     linewidth: 32,
//     color: 0x00ff00
// })
// const cubeLine = new LineSegments(cubeEdges, edgesMtl)
// console.log(cubeEdges)
// console.log(cubeLine)
// node.add(cubeLine);
