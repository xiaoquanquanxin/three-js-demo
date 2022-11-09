import { Color, SpotLight, SpotLightHelper, Scene } from 'three'

//  聚光灯的影响的范围、影响的距离
const pointLight = new SpotLight(   new Color('#ff00ff'),
    //  强度
    10,
    //  影响范围
    50,
    //  衰减
    Math.PI/10,
)
pointLight.position.set(30, 6, 30)
//  让光源产生阴影效果
pointLight.castShadow = true


//  聚光灯
const getSpotLight = (): SpotLight => pointLight

//  设置聚光灯
const setSpotLight = (scene: Scene): SpotLight => {
    scene.add(pointLight)
    const pointLightHelper = new  SpotLightHelper(pointLight,'#ff0000');
    scene.add(pointLightHelper);
    return getSpotLight()
}

export { getSpotLight, setSpotLight }
