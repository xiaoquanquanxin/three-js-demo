import { AmbientLight, Scene } from 'three'
import { Color } from 'three/src/math/Color'

//  环境光，白光
const ambientLight = new AmbientLight(new Color(0xffffff), 0.4)
ambientLight.position.set(10, 2, 1)

//  设置环境光
const setAmbientLight = (scene: Scene) => {
    scene.add(ambientLight)
}

export { setAmbientLight }
