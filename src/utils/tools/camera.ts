import { PerspectiveCamera } from 'three'
import { Vector3 } from 'three/src/math/Vector3'

//  摄像机
const camera = new PerspectiveCamera(
    //  角度
    45,
    //  宽高比
    window.innerWidth / window.innerHeight,
    //  最近
    5,
    //  最远
    1000
)
//  摄像机的位置
camera.position.set(-60, 30, 20)
//  看的位置，这是不起作用的，因为使用了 orbitControls [https://blog.csdn.net/WoZhiMoMing/article/details/114629008]
// camera.lookAt(new Vector3(-10,0,-20));

const getCamera = () => {
    return camera
}

export { getCamera }
