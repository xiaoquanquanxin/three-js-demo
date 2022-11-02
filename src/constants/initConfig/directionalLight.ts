import { Color } from 'three/src/math/Color'
import { ColorRepresentation } from 'three/src/utils'

//  平行光源初始信息
const directionalLightInitParams: [ColorRepresentation, number] = [new Color(0xffffff), 1]
//  平行光源初始位置
const directionalLightInitPosition: PositionsType = [100, 100, 300]

export { directionalLightInitParams, directionalLightInitPosition }
