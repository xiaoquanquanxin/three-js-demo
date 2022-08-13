//  路灯的位置参数
const basicSpace = 8
//  基础x轴偏移
const basicXStart = 7
//  基础z轴偏移
const basicZStart = -basicSpace * 2

//  路灯组1
const streetLightGroupPosition1: ParamsPositionInterType = {
    xStart: basicXStart,
    xSpace: basicSpace,
    xCount: 1,
    yStart: 4.5,
    ySpace: 0,
    yCount: 1,
    zStart: basicZStart,
    zSpace: basicSpace,
    zCount: 3
}

//  路灯组2
const streetLightGroupPosition2: ParamsPositionInterType = {
    xStart: -basicXStart,
    xSpace: basicSpace,
    xCount: 1,
    yStart: 4.5,
    ySpace: 0,
    yCount: 1,
    zStart: basicZStart + basicSpace / 2,
    zSpace: basicSpace,
    zCount: 3
}
//  x轴相对偏移值，因为灯泡和灯柱不一样的位置
const streetLampXDiff = 2.3 - basicXStart
//  灯泡的高度
const streetLampHeight = 5

type streetLampGroupPositionType = [[PositionsType, PositionsType], [PositionsType, PositionsType], [PositionsType, PositionsType]]

//  路灯灯泡的聚光灯
const streetLampGroupPosition1: streetLampGroupPositionType = [] as unknown as streetLampGroupPositionType
for (let i = 0; i < streetLightGroupPosition1.zCount; i++) {
    streetLampGroupPosition1.push([
        [-streetLampXDiff, streetLampHeight, basicZStart + basicSpace * i],
        [-streetLampXDiff, 0, basicZStart + basicSpace * i]
    ])
}

//  另一侧路灯灯泡的聚光灯
const streetLampGroupPosition2: streetLampGroupPositionType = [] as unknown as streetLampGroupPositionType
for (let i = 0; i < streetLightGroupPosition1.zCount; i++) {
    streetLampGroupPosition2.push([
        [streetLampXDiff, streetLampHeight, basicZStart + basicSpace * i + basicSpace / 2],
        [streetLampXDiff, 0, basicZStart + basicSpace * i + basicSpace / 2]
    ])
}

export { streetLampGroupPosition1, streetLightGroupPosition1, streetLampGroupPosition2, streetLightGroupPosition2 }
