import { Mesh, MeshPhongMaterial, PlaneBufferGeometry, PlaneGeometry, Scene } from 'three'
import { Reflector } from 'three/examples/jsm/objects/Reflector'

//  地面
const ground = new PlaneGeometry(1000, 1000)
const materialPlane = new MeshPhongMaterial({
    color: 0xffffff,
    shininess: 1,
    specular: 0xffffff
})

const groundMesh = new Mesh(ground, materialPlane)
//  沿x轴翻转90°，即为展平效果
groundMesh.rotation.set(-0.5 * Math.PI, 0, 0)
groundMesh.position.set(0, -20, 0)
//  地面产生投影
groundMesh.castShadow = false
//  地面接受阴影
groundMesh.receiveShadow = true

//  平面几何
const planeGeometry = new PlaneBufferGeometry(10, 10)

//  参数
const options = {
    clipBias: 0.03,
    textureWidth: window.innerWidth * window.devicePixelRatio,
    textureHeight: window.innerHeight * window.devicePixelRatio,
    color: 0x889999,
    recursion: 1
}

//  反射
// const mirror = new Reflector(planeGeometry, options)

//  设置地面
const setPlaneMesh = (scene: Scene) => {
    // scene.add(mirror)
    scene.add(groundMesh)
}

export { setPlaneMesh }
