//  @ts-nocheck
import { addToMaterialPool, getFromMaterialPool } from 'src/utils/tools/material/materialPool'
import { DoubleSide, Mesh, Object3D } from 'three'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'

//  添加素材
const objLoader = new OBJLoader()

//  添加 obj 到 scene
const loadObj = async (url: string): Promise<Object3D> => {
    const obj_package = getFromMaterialPool(url)
    //  取得缓存
    if (obj_package) {
        return obj_package
    }
    //  取得最新的
    const obj_origin = await new Promise<Object3D>((resolve, reject) => {
        objLoader.load(url, resolve, undefined, reject)
    })

    console.log('loadObj--', obj_origin)
    return
    //  让model产生投影
    obj_origin.scene.traverse(function (node) {
        if (node instanceof Mesh) {
        }
    })

    //  添加到素材池
    addToMaterialPool(url, obj_origin)

    return obj_origin
}

export { loadObj }
