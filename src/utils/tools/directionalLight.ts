import { DirectionalLight, Scene } from 'three'
import { directionalLightInitParams, directionalLightInitPosition } from 'src/constants/initConfig/directionalLight'

//  平行光 黄色
const directionalLight = new DirectionalLight(...directionalLightInitParams)
directionalLight.position.set(...directionalLightInitPosition)
//  让光源产生阴影效果
directionalLight.castShadow = true

//  设置平行光
const setDirectionalLight = (scene: Scene) => {
    scene.add(directionalLight)
}

export { setDirectionalLight }
