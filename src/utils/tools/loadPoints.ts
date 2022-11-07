import { BufferGeometry, Float32BufferAttribute, MathUtils, Points, PointsMaterial } from 'three'

const vertices = []

for (let i = 0; i < 10000; i++) {
    const x = MathUtils.randFloatSpread(2000)
    const y = MathUtils.randFloatSpread(2000)
    const z = MathUtils.randFloatSpread(2000)

    vertices.push(x, y, z)
}

const geometry = new BufferGeometry()
geometry.setAttribute('position', new Float32BufferAttribute(vertices, 3))

const material = new PointsMaterial({ color: 0x888888 })

const points = new Points(geometry, material)

//  点材质
const getPoints = () => {
    return points
}

export { getPoints }
