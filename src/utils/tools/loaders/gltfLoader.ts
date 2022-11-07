//  @ts-nocheck

import { GLTF, GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { addToMaterialPool, getFromMaterialPool } from 'src/utils/tools/material/materialPool'
import { AdditiveBlending, DoubleSide, EdgesGeometry, LineBasicMaterial, LineSegments, Mesh, MeshBasicMaterial, MeshLambertMaterial, Vector2 } from 'three'
import { OutlinePass } from 'three/examples/jsm/postprocessing/OutlinePass'
import { Material } from 'three/src/materials/Material'
import { LineMaterial } from 'three/examples/jsm/lines/LineMaterial'

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

    // console.log('loadGltf--', gltf_origin);
    //  让model产生投影
    gltf_origin.scene.traverse(function (node) {
        if (node instanceof Mesh) {
            // console.log(node);ta
            // console.log(node.material);
            const material: Material = new MeshLambertMaterial({
                color: 'rgba(128,128,128,0.3)',
                emissive: 'rgba(21,24,217,0.3)',
                emissiveIntensity: 0.7
            })
            //  不透明度
            material.transparent = true
            material.opacity = 0.8
            //  赋值
            node.material = material

            const cubeEdges = new EdgesGeometry(node.geometry)
            // const edgesMtl = new LineBasicMaterial({
            //     linewidth: 32,
            //     color: 0x00ff00
            // })
            const edgesMtl = new MeshBasicMaterial({
                linewidth: 32,
                color: 0x00ff00
            })
            const cubeLine = new LineSegments(cubeEdges, edgesMtl)
            // console.log(cubeEdges)
            // console.log(cubeLine)
            // node.add(cubeLine);

            //  产生投影
            node.castShadow = true
            //  接受投影
            node.receiveShadow = true
            //  FIX
            node.geometry.computeVertexNormals()
        }
    })

    //  添加到素材池
    addToMaterialPool(url, gltf_origin)

    return gltf_origin
}

export { loadGltf }
