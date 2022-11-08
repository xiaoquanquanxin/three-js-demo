import { Mesh, MeshPhysicalMaterial } from 'three'
import { Material } from 'three/src/materials/Material'
import { Scene } from 'three/src/Three'

//  素材类型表
const materialTypeMap = [
    //  内
    0,
    //  外
    1,
    //  下4个
    1,
    //  底盘银灰色
    2,
    //  螺母银灰色
    2, 1,
    //  hot
    0
]

//  核心、实心材质
const coreMaterial = (): Material => {
    const material = new MeshPhysicalMaterial({
        color: '#3460E6',
        transparent: true,
        opacity: 1,
        //  越低越光滑
        roughness: 0,
        specularIntensity: 1,
        transmission: 1,
        envMapIntensity: 1
    })
    return material
}

//  外层
const outerSphereMaterial = (): Material => {
    const material: Material = new MeshPhysicalMaterial({
        color: '#aab8e5',
        emissive: '#0a15e7',
        transparent: true,
        opacity: 0.3,
        //  越低越光滑
        roughness: 0,
        specularIntensity: 0.5,
        transmission: 1
    })
    material.transparent = true
    return material
}

//  底座
const pedestalMaterial = (): Material => {
    const material = new MeshPhysicalMaterial({
        color: '#a3a3a3',
        transparent: true,
        opacity: 0.8,
        //  越低越光滑
        roughness: 0.1,
        specularIntensity: 0.3,
        transmission: 0.3
    })
    return material
}

let i = 0
//  处理腾讯材质
const tencentMaterial = (scene: Scene): { rotateArr: Array<number> } => {
    //  旋转数据
    const rotateArr = [1, -1, 3, -1, 1, 0, 0]

    //  让model产生投影
    scene.traverse(function (node) {
        if (node instanceof Mesh) {
            //  赋值
            node.material = (() => {
                switch (materialTypeMap[i] as 0 | 1 | 2) {
                    case 0:
                        return coreMaterial()
                    case 1:
                        return outerSphereMaterial()
                    case 2:
                        //  底座
                        return pedestalMaterial()
                    default:
                        throw i
                }
            })()
            //  产生投影
            node.castShadow = true
            //  接受投影
            node.receiveShadow = true
            //  FIX
            node.geometry.computeVertexNormals()

            if (i === 4) {
                // node.rotation.z = -Math.PI/2
            }
            //  旋转速度
            rotateArr.push()
            i++
        }
    })
    // scene.rotateX(Math.PI/4);
    console.log('总共的素材有{n}个', i)
    return {
        rotateArr
    }
}

export { tencentMaterial }
