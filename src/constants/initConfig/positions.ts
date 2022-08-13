//  坐标轴工具的初始位置
const axesHelperPosition: PositionsType = [0, 0, 0]

//  摄像机的初始位置
const cameraPosition: PositionsType = [50, 30, 35]
//  摄像机的resize位置
// const cameraResizePosition = [
//   window.innerWidth,
//   window.innerHeight,
//   0,
//   0,
//   window.innerWidth,
//   window.innerHeight,
// ];

//  摄像机看的初始位置
const orbitControlsPosition: PositionsType = [0, 0, 10]

//  摄像机的观察范围
const cameraInitRange = [
    //  角度
    45,
    //  宽高比
    window.innerWidth / window.innerHeight,
    //  最近
    5,
    //  最远
    1000
]
export {
    // cameraResizePosition,
    cameraInitRange,
    orbitControlsPosition,
    cameraPosition,
    axesHelperPosition
}
