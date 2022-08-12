import { Mesh, MeshLambertMaterial, PlaneGeometry, Scene } from 'three'

//  地面
const ground = new PlaneGeometry(1000, 1000)
const materialPlane = new MeshLambertMaterial({
    color: 0xffffff
})
const groundMesh = new Mesh(ground, materialPlane)
//  沿x轴翻转90°，即为展平效果
groundMesh.rotation.x = -0.5 * Math.PI
groundMesh.position.set(0, 0, 0)
//  物体接受阴影
groundMesh.receiveShadow = true

//  设置地面
const setPlaneMesh = (scene: Scene) => {
    scene.add(groundMesh)
}

export { setPlaneMesh }
