import { BokehPass } from 'three/examples/jsm/postprocessing/BokehPass'
import { Camera } from 'three'
import { Scene } from 'three/src/Three'

// 创建景深参数
const params = {
    // 聚焦
    focus: 1,
    aspect: window.innerWidth / window.innerHeight,
    // 孔径
    aperture: 0.025,
    maxblur: 1.0,
    width: window.innerWidth,
    height: window.innerHeight
}
//  获取景深
const getBokehPass = (scene: Scene, camera: Camera) => {
    return new BokehPass(scene, camera, params)
}

export { getBokehPass }
