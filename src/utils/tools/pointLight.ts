import { PointLight } from 'three'
import { pointLightInitParams, pointLightInitPosition } from 'src/constants/initConfig/pointLight'

//  点光源的影响的范围、影响的距离
const pointLight = new PointLight(...pointLightInitParams)
pointLight.position.set(...pointLightInitPosition)
//  点光源
const getPointLight = () => pointLight

export { getPointLight }
