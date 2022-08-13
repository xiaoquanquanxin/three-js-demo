//  塔的位置参数

const basicSpace = 3
//  基础x轴偏移
const basicXStart = 10

//  塔组1
const towerGroupPosition1: ParamsPositionInterType = {
    xStart: basicXStart,
    xSpace: basicSpace,
    xCount: 3,
    yStart: 0,
    ySpace: 0,
    yCount: 1,
    zStart: 0,
    zSpace: basicSpace,
    zCount: 1
}

const towerGroupPosition2: ParamsPositionInterType = {
    xStart: basicXStart,
    xSpace: basicSpace,
    xCount: 3,
    yStart: 0,
    ySpace: 0,
    yCount: 1,
    zStart: -1 * (basicSpace * 1.5),
    zSpace: basicSpace,
    zCount: 1
}

const towerGroupPosition3: ParamsPositionInterType = {
    xStart: basicXStart,
    xSpace: basicSpace,
    xCount: 3,
    yStart: 0,
    ySpace: 0,
    yCount: 1,
    zStart: -2 * (basicSpace * 1.5),
    zSpace: basicSpace,
    zCount: 1
}
const towerGroupPosition4: ParamsPositionInterType = {
    xStart: basicXStart,
    xSpace: basicSpace,
    xCount: 3,
    yStart: 0,
    ySpace: 0,
    yCount: 1,
    zStart: -3 * (basicSpace * 1.5),
    zSpace: basicSpace,
    zCount: 1
}

const towerGroupPosition5: ParamsPositionInterType = {
    xStart: basicXStart + basicSpace * 3 + basicSpace,
    xSpace: basicSpace,
    xCount: 4,
    yStart: 0,
    ySpace: 0,
    yCount: 1,
    zStart: 0,
    zSpace: basicSpace,
    zCount: 1
}

const towerGroupPosition6: ParamsPositionInterType = {
    xStart: basicXStart + basicSpace * 3 + basicSpace,
    xSpace: basicSpace,
    xCount: 4,
    yStart: 0,
    ySpace: 0,
    yCount: 1,
    zStart: -1 * (basicSpace * 1.5),
    zSpace: basicSpace,
    zCount: 1
}

export { towerGroupPosition1, towerGroupPosition2, towerGroupPosition3, towerGroupPosition4, towerGroupPosition5, towerGroupPosition6 }
