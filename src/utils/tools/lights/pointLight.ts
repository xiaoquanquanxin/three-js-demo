import { Color, PointLight, PointLightHelper, Scene } from 'three'

//  点光源的影响的范围、影响的距离
const pointLight = new PointLight(
    new Color('#ffffff'),
    //  强度
    1,
    //  影响范围
    300,
    //  衰减
    0.1
)
pointLight.position.set(30, 6, 30)
//  让光源产生阴影效果
pointLight.castShadow = true

//  点光源
const getPointLight = (): PointLight => pointLight

//  设置点光源
const setPointLight = (scene: Scene): PointLight => {
    scene.add(pointLight)
    const pointLightHelper = new PointLightHelper(pointLight, 10, '#ff0000')
    scene.add(pointLightHelper)
    return getPointLight()
}

export { getPointLight, setPointLight }
