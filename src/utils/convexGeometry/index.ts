import { ConvexGeometry } from 'three/examples/jsm/geometries/ConvexGeometry'
import { CylinderGeometry, Mesh, MeshBasicMaterial, Scene } from 'three'
import { Vector3 } from 'three/src/math/Vector3'

//  几何体
const geometry = new ConvexGeometry([new Vector3(2, 3, 5)])
const material = new MeshBasicMaterial({ color: 0xffff0000 })
const mesh = new Mesh(geometry, material)

const object = new Mesh(new CylinderGeometry(0, 3, 5, 10000, 4), material)
object.position.set(-13, 12, -3)

//  获取几何体
const getGeometry = () => mesh
//  设置几何体
const setGeometry = (scene: Scene) => {
    scene.add(mesh)
    scene.add(object)
}

export { setGeometry, getGeometry }
