import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader'
import { Group, Scene } from 'three'

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
): Array<Group> => {
    const list: Array<Group> = []
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
    return list
}

export { addMaterialToScene }
