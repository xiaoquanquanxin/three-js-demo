import { Color, SpotLight, SpotLightHelper, Scene, Vector2, Vector3 } from 'three'
import { side_length } from '../trigonometryFunctions'

//  聚光灯的影响的范围、影响的距离
const spotLight = new SpotLight(
    new Color('#abf7ff'),
    //  强度
    1,
    //  影响范围
    120,
    //  角度
    Math.PI / 6
)
spotLight.position.set(10, 50, 0)
//  让光源产生阴影效果
spotLight.castShadow = true

const mapSize = 1024 * 4
spotLight.shadow.mapSize.set(mapSize, mapSize)

//  辅助
const spotLightHelper = new SpotLightHelper(spotLight, '#ff0000')

let n = 0
const pointLightAnimation = () => {
    const side = side_length(n, 20)
    n += 0.1
    spotLight.position.set(side.adjacent_side, 50, side.opposite_side)
    spotLightHelper.update()
    requestAnimationFrame(() => {
        pointLightAnimation()
    })
}
pointLightAnimation()

//  设置聚光灯
const setSpotLight = (scene: Scene): { spotLight: SpotLight; spotLightHelper: SpotLightHelper } => {
    scene.add(spotLight)
    scene.add(spotLightHelper)
    return {
        spotLightHelper,
        spotLight
    }
}

export { setSpotLight }
