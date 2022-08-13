import { HemisphereLight, Scene } from 'three'

//  半球光 黄色
const hemisphereLight = new HemisphereLight(0x6666aa, 0x333333, 0.3)
hemisphereLight.position.set(0, 100, 0)

//  获取半球光
const getHemisphereLight = (): HemisphereLight => hemisphereLight

//  设置半球光
const setHemisphereLight = (scene: Scene): HemisphereLight => {
    scene.add(hemisphereLight)
    return getHemisphereLight()
}

export { setHemisphereLight, getHemisphereLight }
