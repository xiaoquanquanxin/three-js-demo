import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass'
import { Vector2 } from 'three'

//  辉光
const bloomPass = new UnrealBloomPass(new Vector2(window.innerWidth, window.innerHeight), 0.3, 0, 0)

//  获取辉光
const getBloomPass = () => {
    return bloomPass
}
export { getBloomPass }
