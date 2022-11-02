import { PointLightHelper, Scene } from 'three'
import { getPointLight } from 'src/utils/tools/pointLight'

//  点光源
const pointLight = getPointLight()
//  可视化点光源
const lightHelper = new PointLightHelper(pointLight, 3)
const getLightHelper = () => lightHelper

//  设置可视化点光源
const setLightHelper = (scene: Scene) => {
    scene.add(pointLight)
    scene.add(lightHelper)
}
export { getLightHelper, setLightHelper }
