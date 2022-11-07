import { BokehPass } from 'three/examples/jsm/postprocessing/BokehPass'
import { Camera } from 'three'
import { Scene } from 'three/src/Three'
//  @ts-ignore
import { GUI } from 'three/examples/jsm/libs/lil-gui.module.min.js'

// 创建景深参数
const effectController = {
    focus: 30.0,
    aperture: 0.00005,
    maxblur: 0.1,
    width: window.innerWidth,
    height: window.innerHeight
}

let bokeh: any
const matChanger = function () {
    bokeh.uniforms['focus'].value = effectController.focus
    bokeh.uniforms['aperture'].value = effectController.aperture
    bokeh.uniforms['maxblur'].value = effectController.maxblur
}

//  景深
const getBokehPass = (scene: Scene, camera: Camera): BokehPass => {
    bokeh = new BokehPass(scene, camera, {})
    const gui = new GUI()
    gui.add(effectController, 'focus', -100.0, 100.0, 1).onChange(matChanger)
    gui.add(effectController, 'aperture', 0, 0.0001, 0.000001).onChange(matChanger)
    gui.add(effectController, 'maxblur', 0.0, 5, 0.01).onChange(matChanger)
    gui.close()

    matChanger()
    return bokeh
}

export { getBokehPass }
