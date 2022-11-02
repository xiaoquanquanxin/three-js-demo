import { Color } from 'three/src/math/Color'
import { ColorRepresentation } from 'three/src/utils'

//  点光源初始信息
const pointLightInitParams: [ColorRepresentation, number?, number?, number?] = [
    new Color(0x6666ff),
    //  强度
    1
    //  影响范围
    // 10,
    //  衰减
    // 0.1
]
//  点光源初始位置
const pointLightInitPosition: PositionsType = [-2, 2, 4]

export { pointLightInitParams, pointLightInitPosition }
