import { Color } from 'three/src/math/Color'
import { ColorRepresentation } from 'three/src/utils'

//  平行光源初始信息
const directionalLightInitParams: [ColorRepresentation, number] = [new Color(0x888888), 2]
//  平行光源初始位置
const directionalLightInitPosition: PositionsType = [2, 1, 6]

export { directionalLightInitParams, directionalLightInitPosition }
