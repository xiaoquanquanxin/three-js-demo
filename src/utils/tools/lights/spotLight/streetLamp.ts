import { CameraHelper, Object3D, Scene, SpotLight } from 'three'

//  设置路灯属性
const setStreetLampProperty = (spotLight: SpotLight) => {
    //  设置聚光光源发散角度
    spotLight.angle = Math.PI / 3
    //   可以制造阴影
    spotLight.castShadow = true
    spotLight.shadow.camera.near = 1
    spotLight.shadow.camera.far = 10
    spotLight.shadow.mapSize.width = 1024
    spotLight.shadow.mapSize.height = 1024
}

//  设置一个路灯
const setStreetLamp = (scene: Scene, lightSourcePosition: PositionsType, aimPosition: PositionsType) => {
    const spotLight = new SpotLight(0xffffcc, 0.6, 10, 100, 0.4)
    setStreetLampProperty(spotLight)
    //  设置聚光光源位置
    spotLight.position.set(...lightSourcePosition)
    //  目标
    const target = new Object3D()
    target.position.set(...aimPosition)
    //  聚光灯光源指向网格模型
    spotLight.target = target

    scene.add(target)
    //   光对象添加到scene场景中
    scene.add(spotLight)
    //   辅助线
    // scene.add(new CameraHelper(spotLight.shadow.camera));
}

export { setStreetLamp }
