import { Color } from 'three/src/math/Color'
import { ColorRepresentation } from 'three/src/utils'

//  点光源初始信息
const pointLightInitParams: [ColorRepresentation, number, number] = [new Color(0x6666ff), 10, 10]
//  点光源初始位置
const pointLightInitPosition: PositionsType = [-2, 2, 4]

export { pointLightInitParams, pointLightInitPosition }
