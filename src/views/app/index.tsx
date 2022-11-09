//  @ts-nocheck
import Stat from 'three/examples/jsm/libs/stats.module'
import React, { useEffect, useRef, useState } from 'react'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer'
import { Scene, Color, sRGBEncoding, PCFShadowMap, WebGLRenderer } from 'three'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass'
import { useDebouncedCallback } from 'use-debounce'
import { setAxesHelper } from 'src/utils/tools/axesHelper'
import { getCamera } from 'src/utils/tools/camera'
import { setDirectionalLight } from 'src/utils/tools/lights/directionalLight'
import { loadGltf } from 'src/utils/tools/loaders/gltfLoader'
import { addMaterialToScene } from 'src/utils/tools/material/addMaterialToScene'
import { getBokehPass } from 'src/utils/tools/depthOfField'
import { getControls } from 'src/utils/controls'
import { tencentMaterial } from 'src/utils/tools/handleMaterial/tencent'
import { mytowerGroupPosition } from 'src/constants/material/tower'
import './index.css'
import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader'
import { setAmbientLight } from 'src/utils/tools/ambientLight'
import { setSpotLight } from '../../utils/tools/spotLight'

//  我的模型
let myModel: GLTF

//  场景
const scene = new Scene()
scene.background = new Color(0xffffff)

//  渲染器
const renderer = new WebGLRenderer({
    //  抗锯齿
    antialias: true,
    alpha: false
})
const width = 1000
const height = 800
//  防止输出模糊
renderer.setPixelRatio(window.devicePixelRatio)
renderer.setSize(width, height)
//  渲染细节
renderer.outputEncoding = sRGBEncoding
renderer.shadowMap.type = PCFShadowMap
//  设置渲染器开启阴影
renderer.shadowMap.enabled = true

//  照摄像机
const camera = getCamera()
camera.setViewOffset(width, height, 0, 0, width, height)
camera.lookAt(scene.position)

//  新建一个场景通道  为了覆盖到原理来的场景上
const renderPass = new RenderPass(scene, camera)
//  创建一个EffectComposer（效果组合器）对象，然后在该对象上添加后期处理通道。
const composer = new EffectComposer(renderer)
composer.addPass(renderPass)

//  加入辉光
// const bloomPass = getBloomPass()
// composer.addPass(bloomPass)

//  加入景深
const bokehPass = getBokehPass(scene, camera)
// composer.addPass(bokehPass)

//  坐标轴
setAxesHelper(scene)
//  设置点光源
//  setPointLight(scene)
//  设置平行光
setDirectionalLight(scene)
//  设置半球光
// setHemisphereLight(scene);
//  设置手电筒
setSpotLight(scene);

//  设置环境光
setAmbientLight(scene)
//  设置几何体 - 圆锥
// const alarmGroup = setAlarmGroup(scene)
//  设置地面
// setPlaneMesh(scene)

//  报警位置
const stat = new Stat()

//  星光
// const points = getPoints()
// scene.add(points)

window.onload = () => {
    // console.log('onload');
    window.document.body.appendChild(stat.domElement)
}

//  渲染
function animate() {
    requestAnimationFrame(animate)
    //  普通场景渲染
    renderer.render(scene, camera)

    //  帧率监测
    stat.update()

    // console.log(myModel.scene.children);
    myModel.scene.children.forEach((mesh, index) => {
        const y = myModel.userData.rotateArr[index]
        if (y) {
            mesh.rotateZ(Math.PI / y / 180 / 6)
        }
    })

    composer.render(0)
}

function Index() {
    const mainRef = useRef<HTMLDivElement | null>(null)
    //  初始化
    const [initKey] = useState('initKey')
    const initList = useDebouncedCallback(async () => {
        const $mainRef = document.getElementById('mainRef')
        //   摄像机控制
        getControls(camera, $mainRef)
        ;(mainRef.current as HTMLDivElement).innerHTML = ''
        ;(mainRef.current as HTMLDivElement).appendChild(renderer.domElement)
        console.log('%c只执行一次', 'color:green;')

        // const myModel = await loadGltf('materialModels/111.glb')
        myModel = await loadGltf('materialModels/tencent/1.glb')
        //  处理素材
        const { rotateArr } = tencentMaterial(myModel.scene)
        // console.log(myModel.userData)
        myModel.userData.rotateArr = rotateArr
        //  添加素材到场景
        scene.add(myModel.scene)

        $mainRef.addEventListener('mousemove', e => {
            const { clientX, clientY } = e
            const x = (clientY - height / 2) / height / 2
            const y = (clientX - width / 2) / width / 2
            myModel.scene.rotation.x = x
            myModel.scene.rotation.y = y
        })

        //  渲染
        animate()

        return () => {}
    }, 0)
    useEffect(() => {
        initList()
    }, [initKey, initList])

    return (
        <div className="App">
            <div ref={mainRef} id="mainRef" />
        </div>
    )
}

export default Index
