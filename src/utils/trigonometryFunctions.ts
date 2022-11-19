//  已知直角三角形的斜角度数和斜边长度，求邻边和对边的长度
function side_length(angle: number, long: number) {
    //获得弧度
    const radian = ((2 * Math.PI) / 360) * angle
    return {
        opposite_side: Math.sin(radian) * long, //斜角对边长度
        adjacent_side: Math.cos(radian) * long //斜角邻边长度
    }
}

export { side_length }
