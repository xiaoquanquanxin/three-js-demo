import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader'
import { Mesh, Object3D, Scene } from 'three'
// import {Dispatch, SetStateAction} from 'react';
// import {Group} from 'three/src/Three';

//  递归
const traverseCallback = (child: Object3D | Mesh) => {
    if (child instanceof Mesh) {
        debugger
        //  @ts-ignore
        child.material.emissive = child.material.color
        //  @ts-ignore
        child.material.emissiveMap = child.material.map
    }
    child.children.forEach(item => {
        item.traverse(traverseCallback)
    })
}
//  添加素材到场景
const addMaterialToScene = (
    gltf: GLTF,
    scene: Scene,
    {
        //  x轴初始位置
        xStart,
        //  x轴数量
        xCount,
        //  x轴间距
        xSpace,
        //  y轴初始位置
        yStart,
        //  y轴数量
        yCount,
        //  y轴间距
        ySpace,
        //  z轴初始位置
        zStart,
        //  z轴数量
        zCount,
        //  z轴间距
        zSpace
    }: ParamsPositionInterType
) =>
    //  存储数据
    // setList: Dispatch<SetStateAction<Array<Group>>>
    {
        const list = []
        for (let x = 0; x < xCount; x++) {
            for (let y = 0; y < yCount; y++) {
                for (let z = 0; z < zCount; z++) {
                    const tower = gltf.scene.clone()
                    // gltf.scene.traverse(traverseCallback);
                    tower.position.set(xStart + x * xSpace, yStart + y * ySpace, zStart + z * zSpace)
                    list.push(tower)
                    scene.add(tower)
                }
            }
        }
        //  存 state
        // setList(list);
    }

export { addMaterialToScene }
