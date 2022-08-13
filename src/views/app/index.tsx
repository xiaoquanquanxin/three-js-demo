//  @ts-nocheck
import React, { useEffect, useRef, useState } from 'react'
import { CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer'
import { Scene, WebGLRenderer, Color, Group, Clock, Vector3, sRGBEncoding, SpotLight, SpotLightHelper, Object3D, CameraHelper } from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { useDebouncedCallback } from 'use-debounce'
import { setAxesHelper } from 'src/utils/tools/axesHelper'
import { getCamera } from 'src/utils/tools/camera'
import { setDirectionalLight } from 'src/utils/tools/directionalLight'
import { setAmbientLight } from 'src/utils/tools/ambientLight'
import { Text } from 'src/components/text'
import { loadGltf } from 'src/utils/tools/loaders/gltfLoader'
import { setGeometry } from 'src/utils/convexGeometry/cylinderGeometry'
import { addMaterialToScene } from 'src/utils/tools/material/addMaterialToScene'
import { setPlaneMesh } from 'src/utils/convexGeometry/ground'
import { setPointLight } from 'src/utils/tools/pointLight'
import { css2DRenderer } from 'src/utils/tools/css2render'
import { orbitControlsPosition } from 'src/constants/initConfig/positions'
import { towerGroupPosition1, towerGroupPosition2, towerGroupPosition3, towerGroupPosition4, towerGroupPosition5, towerGroupPosition6 } from 'src/constants/material/tower'
import { mediumHouseGroupPosition1, mediumHouseGroupPosition2, mediumHouseGroupPosition3, mediumHouseGroupPosition4 } from 'src/constants/material/mediumHouse'
import './index.css'
import { streetLampGroupPosition1, streetLampGroupPosition2, streetLightGroupPosition1, streetLightGroupPosition2 } from 'src/constants/material/streetLight'
import { setStreetLamp } from 'src/utils/tools/lights/spotLight/streetLamp'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer'

//  场景
const scene = new Scene()
scene.background = new Color(0xbbbbbb)

//  渲染器
const renderer = new WebGLRenderer({
    //  消除锯齿
    antialias: true
})
//  防止输出模糊
renderer.setPixelRatio(window.devicePixelRatio)
//  渲染细节
renderer.outputEncoding = sRGBEncoding

//  照摄像机
const camera = getCamera()
//  新建一个场景通道  为了覆盖到原理来的场景上
const renderPass = new RenderPass(scene, camera)
//  创建一个EffectComposer（效果组合器）对象，然后在该对象上添加后期处理通道。
const composer = new EffectComposer(renderer)
composer.addPass(renderPass)

//  坐标轴
setAxesHelper(scene)
//  设置点光源
//  setPointLight(scene)
//  设置平行光
setDirectionalLight(scene)
//  设置环境光
setAmbientLight(scene)
//  设置几何体 - 圆锥
setGeometry(scene)
//  设置地面
setPlaneMesh(scene)

window.onload = () => {
    console.log('onload')
    //  控制摄像机的位置
    const orbitControls = new OrbitControls(camera, document.getElementById('mainRef'))
    //  摄像机看到的初始位置
    orbitControls.target = new Vector3(...orbitControlsPosition)
    orbitControls.update()
}

//  定时器
const clock = new Clock()

//  渲染
function animate() {
    const spt = clock.getDelta() * 1000
    const frameValue = (1000 / spt) | 0
    if (frameValue < 30) {
        console.log(`%c帧率过低:${frameValue}`, 'color:red')
    }
    frameDiv.innerText = frameValue
    requestAnimationFrame(animate)
    //  2d渲染
    css2DRenderer.render(scene, camera)
    camera.setViewOffset(window.innerWidth, window.innerHeight, 0, 0, window.innerWidth, window.innerHeight)
    renderer.setSize(window.innerWidth, window.innerHeight)
    //  设置渲染器开启阴影
    renderer.shadowMap.enabled = true
    //  普通场景渲染
    renderer.render(scene, camera)
}

function Index() {
    //  text标签
    const textRef = useRef(null)
    const mainRef = useRef<HTMLDivElement | null>(null)
    //  初始化
    const [initKey] = useState('initKey')
    const initList = useDebouncedCallback(async () => {
        ;(mainRef.current as HTMLDivElement).innerHTML = ''
        ;(mainRef.current as HTMLDivElement).appendChild(renderer.domElement)
        console.log('只执行一次')

        //  加载素材 - 塔楼
        const tower = await loadGltf('materialModels/tower/scene.gltf')
        console.log('加载素材 - 塔楼', tower)
        //  添加素材 到场景
        addMaterialToScene(tower, scene, towerGroupPosition1)
        addMaterialToScene(tower, scene, towerGroupPosition2)
        addMaterialToScene(tower, scene, towerGroupPosition3)
        addMaterialToScene(tower, scene, towerGroupPosition4)
        addMaterialToScene(tower, scene, towerGroupPosition5)
        addMaterialToScene(tower, scene, towerGroupPosition6)

        //  加载素材 - 中等的房子
        const mediumHouse = await loadGltf('materialModels/mediumHouse/scene.gltf')
        console.log('加载素材 - 中等的房子', mediumHouse)
        //  添加素材 到场景
        addMaterialToScene(mediumHouse, scene, mediumHouseGroupPosition1)
        addMaterialToScene(mediumHouse, scene, mediumHouseGroupPosition2)
        addMaterialToScene(mediumHouse, scene, mediumHouseGroupPosition3)
        addMaterialToScene(mediumHouse, scene, mediumHouseGroupPosition4)

        //  加载素材 - 路灯
        const streetLight = await loadGltf('materialModels/streetlight/scene.gltf')
        streetLight.scene.rotation.set(0, -(1 / 4.5) * Math.PI, 0)
        console.log('加载素材 - 路灯', mediumHouse)
        addMaterialToScene(streetLight, scene, streetLightGroupPosition1)
        //  添加路灯灯泡的光源
        streetLampGroupPosition1.forEach(item => {
            setStreetLamp(scene, ...item)
        })

        //  另一侧的路灯
        const otherStreetLights = addMaterialToScene(streetLight, scene, streetLightGroupPosition2)
        otherStreetLights.forEach(streetLight => {
            streetLight.rotateY(1 * Math.PI)
        })
        //  添加路灯灯泡的光源
        streetLampGroupPosition2.forEach(item => {
            setStreetLamp(scene, ...item)
        })

        //  文本标签
        const label = new CSS2DObject(textRef.current)
        label.position.set(-10, 10, -10)
        scene.add(label)

        //  渲染
        animate()

        return () => {}
    }, 0)
    useEffect(() => {
        initList()
    }, [initKey, initList])

    //  报警
    const alarmClick = () => {}
    return (
        <div className="App">
            <div className={'frameDiv'} id={'frameDiv'} />
            <div onClick={alarmClick} className={'alarm-button'}>
                报警
            </div>
            <Text text={'我是权鑫'} childRef={textRef} />
            <div ref={mainRef} id="mainRef" />
        </div>
    )
}

export default Index
