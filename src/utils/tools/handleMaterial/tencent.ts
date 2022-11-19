import { BackSide, Color, DoubleSide, FrontSide, Mesh, MeshPhysicalMaterial, MeshStandardMaterial } from 'three'
import { Material } from 'three/src/materials/Material'
import { Scene } from 'three/src/Three'

//  素材类型表
const materialTypeMap = [
    //  内
    {
        color: '#5ea4f6',
        opacity: 0.83
    },
    //  外
    {
        color: '#d8dbff',
        opacity: 0.3
    },
    //  下4个
    {
        color: '#d8dbff',
        opacity: 0.3
    },
    //  底盘银灰色
    {
        color: '#888888',
        opacity: 1
    },
    //  螺母银灰色
    {
        color: '#888888',
        opacity: 1
    },
    {
        color: '#d8dbff',
        opacity: 0.3
    },
    //  hot
    {
        color: '#5ea4f6',
        opacity: 0.83
    }
]

let index = 0
//  处理腾讯材质
const tencentMaterial = (scene: Scene): { rotateArr: Array<number> } => {
    //  旋转数据
    const rotateArr = [1, -1, 3, -1, 1, 0, 0]

    //  让model产生投影
    scene.traverse(function (node) {
        if (node instanceof Mesh) {
            //  赋值
            const material = new MeshPhysicalMaterial()
            material.shadowSide = DoubleSide
            material.transparent = true
            material.color = new Color(materialTypeMap[index].color)
            // material.colorWrite = true;
            material.opacity = materialTypeMap[index].opacity
            material.roughness = 0.3
            material.specularIntensity = 0.7
            material.transmission = 0.2
            material.color.convertSRGBToLinear()

            // console.log(material
            node.material = material
            //  产生投影
            node.castShadow = true
            //  接受投影
            node.receiveShadow = true
            //  FIX
            node.geometry.computeVertexNormals()

            //  旋转速度
            rotateArr.push()
            index++
        }
    })
    // scene.rotateX(Math.PI/4);
    console.log('总共的素材有{n}个', index)
    return {
        rotateArr
    }
}

export { tencentMaterial }
