import { PointLight, Scene } from 'three'
import { pointLightInitParams, pointLightInitPosition } from 'src/constants/initConfig/pointLight'

//  点光源的影响的范围、影响的距离
const pointLight = new PointLight(...pointLightInitParams)
pointLight.position.set(...pointLightInitPosition)
//  让光源产生阴影效果
pointLight.castShadow = true

//  点光源
const getPointLight = (): PointLight => pointLight

//  设置点光源
const setPointLight = (scene: Scene): PointLight => {
    scene.add(pointLight)
    return getPointLight()
}

export { getPointLight, setPointLight }
