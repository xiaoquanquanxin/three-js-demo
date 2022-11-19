import { BackSide, Color, DoubleSide, FrontSide, Mesh, MeshPhysicalMaterial, MeshStandardMaterial } from 'three'
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
        // color: 'rgba(52,96,230,0.8)',
        color: 'rgb(78,117,238)',
        // emissive: 'rgba(174,244,245,0.09)',
        // emissiveIntensity:2,
        transparent: true,
        opacity: 1,
        //  越低越光滑
        roughness: 0.23,
        specularIntensity: 0.7,
        transmission: 0.9,
        envMapIntensity: 1
    })
    material.color.convertSRGBToLinear()
    return material
}

//  外层
const outerSphereMaterial = (): MeshPhysicalMaterial => {
    const material: MeshPhysicalMaterial = new MeshPhysicalMaterial({
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
    material.color.convertSRGBToLinear()

    return material
}

//  底座
const pedestalMaterial = (): Material => {
    const material = new MeshPhysicalMaterial({
        color: 'rgb(232,232,232)',
        transparent: true,
        opacity: 1,
        //  越低越光滑
        roughness: 0.1,
        specularIntensity: 3,
        transmission: 0.6,
        reflectivity: 0.1
    })
    material.color.convertSRGBToLinear()
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
            // material = (() => {
            //     switch (materialTypeMap[i] as 0 | 1 | 2) {
            //         case 0:
            //             return coreMaterial()
            //         case 1:
            //             return outerSphereMaterial()
            //         case 2:
            //             //  底座
            //             return pedestalMaterial()
            //         default:
            //             throw i
            //     }
            // })()
            const material = new MeshPhysicalMaterial()
            material.shadowSide = DoubleSide
            material.transparent = false
            material.color = new Color(0.3, 0, 0)
            // material.colorWrite = true;
            material.opacity = 0.7
            material.roughness = 0.1
            material.specularIntensity = 0.7
            material.transmission = 0.2

            // console.log(material
            node.material = material
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
