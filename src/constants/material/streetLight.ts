//  路灯的位置参数

const basicSpace = 8

//  路灯1
const streetLightGroupPosition1: ParamsPositionInterType = {
    xStart: -1,
    xSpace: basicSpace,
    xCount: 1,
    yStart: 4.5,
    ySpace: 0,
    yCount: 1,
    zStart: basicSpace / 2,
    zSpace: basicSpace,
    zCount: 3
}

export { streetLightGroupPosition1 }

const streetLampXDiff = 2.3
const streetLampHeight = 5

//  路灯灯泡的聚光灯
const streetLampGroupPosition1: [PositionsType, PositionsType] = [
    [-streetLampXDiff, streetLampHeight, basicSpace / 2],
    [-streetLampXDiff, 0, basicSpace / 2]
]

const streetLampGroupPosition2: [PositionsType, PositionsType] = [
    [-streetLampXDiff, streetLampHeight, basicSpace / 2 + basicSpace],
    [-streetLampXDiff, 0, basicSpace / 2 + basicSpace]
]
const streetLampGroupPosition3: [PositionsType, PositionsType] = [
    [-streetLampXDiff, streetLampHeight, basicSpace / 2 + basicSpace * 2],
    [-streetLampXDiff, 0, basicSpace / 2 + basicSpace * 2]
]

export { streetLampGroupPosition1, streetLampGroupPosition2, streetLampGroupPosition3 }
