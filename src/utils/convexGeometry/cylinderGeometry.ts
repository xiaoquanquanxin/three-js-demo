import { ConvexGeometry } from 'three/examples/jsm/geometries/ConvexGeometry'
import { CylinderGeometry, Mesh, MeshLambertMaterial, Scene } from 'three'
import { cylinderGeometryPosition } from 'src/constants/initConfig/cylinderGeometry'

//  圆锥体
const geometry = new ConvexGeometry()
//  得是感光材质
const material = new MeshLambertMaterial({
    color: 0xff7c7c,
    transparent: true,
    opacity: 0.4
})
const mesh = new Mesh(geometry, material)

const cylinderGeometry = new Mesh(new CylinderGeometry(0, 1, 2, 10000, 1), material)
cylinderGeometry.position.set(...cylinderGeometryPosition)
//  上下颠倒
cylinderGeometry.scale.set(1, -1, 1)
//  设置圆锥投影
cylinderGeometry.castShadow = true

//  获取圆锥体
const getGeometry = (): ConvexGeometry => geometry
//  设置圆锥体
const setGeometry = (scene: Scene): ConvexGeometry => {
    scene.add(mesh)
    scene.add(cylinderGeometry)
    return getGeometry()
}

export { setGeometry, getGeometry }
