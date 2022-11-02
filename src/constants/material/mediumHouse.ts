//  房子的位置参数

const basicSpace = 7
//  基础x轴偏移
const basicXStart = -5 + basicSpace * -3

//  房子1
const mediumHouseGroupPosition1: ParamsPositionInterType = {
    xStart: basicXStart,
    xSpace: basicSpace,
    xCount: 3,
    yStart: 0,
    ySpace: 0,
    yCount: 1,
    zStart: basicSpace * 0,
    zSpace: basicSpace,
    zCount: 1
}

//  房子2
const mediumHouseGroupPosition2: ParamsPositionInterType = {
    xStart: basicXStart,
    xSpace: basicSpace,
    xCount: 3,
    yStart: 0,
    ySpace: 0,
    yCount: 1,
    zStart: basicSpace * -1,
    zSpace: basicSpace,
    zCount: 1
}
//  房子3
const mediumHouseGroupPosition3: ParamsPositionInterType = {
    xStart: basicXStart,
    xSpace: basicSpace,
    xCount: 3,
    yStart: 0,
    ySpace: 0,
    yCount: 1,
    zStart: basicSpace * -2,
    zSpace: basicSpace,
    zCount: 1
}
//  房子4
const mediumHouseGroupPosition4: ParamsPositionInterType = {
    xStart: basicXStart,
    xSpace: basicSpace,
    xCount: 3,
    yStart: 0,
    ySpace: 0,
    yCount: 1,
    zStart: basicSpace * -3,
    zSpace: basicSpace,
    zCount: 1
}

export { mediumHouseGroupPosition1, mediumHouseGroupPosition2, mediumHouseGroupPosition3, mediumHouseGroupPosition4 }
