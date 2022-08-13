import { Mesh, MeshPhongMaterial, PlaneGeometry, Scene } from 'three'

//  地面
const ground = new PlaneGeometry(100, 100)
const materialPlane = new MeshPhongMaterial({
    color: 0xffffff,
    shininess: 150,
    specular: 0xffffff
})

const groundMesh = new Mesh(ground, materialPlane)
//  沿x轴翻转90°，即为展平效果
groundMesh.rotation.set(-0.5 * Math.PI, 0, 0)
groundMesh.position.set(0, 0, 0)
//  地面产生投影
groundMesh.castShadow = false
//  地面接受阴影
groundMesh.receiveShadow = true

//  设置地面
const setPlaneMesh = (scene: Scene) => {
    scene.add(groundMesh)
}

export { setPlaneMesh }
