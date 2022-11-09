import { Color, DirectionalLight, Scene } from 'three'

//  平行光 黄色
const directionalLight = new DirectionalLight(new Color(0xffffff), 1)
directionalLight.position.set(300, 100, 100)
//  让光源产生阴影效果
directionalLight.castShadow = true
directionalLight.shadow.camera.near = 1
directionalLight.shadow.camera.far = 2000

const d = 0
directionalLight.shadow.camera.left = -d
directionalLight.shadow.camera.right = d
directionalLight.shadow.camera.top = d
directionalLight.shadow.camera.bottom = -d / 2
// directionalLight.shadow.radius = 1
//  这个值必须为零
directionalLight.shadow.bias = 0
// directionalLight.shadow.blurSamples =

directionalLight.shadow.mapSize.height = 128
directionalLight.shadow.mapSize.width = 128
const mapSize = 1024 * 4
directionalLight.shadow.mapSize.set(mapSize, mapSize)

//  获取平行光
const getDirectionalLight = (): DirectionalLight => directionalLight

//  设置平行光
const setDirectionalLight = (scene: Scene): DirectionalLight => {
    scene.add(directionalLight)
    return getDirectionalLight()
}

export { setDirectionalLight, getDirectionalLight }
