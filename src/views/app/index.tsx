//  @ts-nocheck
import Stat from 'three/examples/jsm/libs/stats.module'
import React, { useEffect, useRef, useState } from 'react'
import { CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer'
import {
    Scene,
    Color,
    Group,
    Clock,
    Vector3,
    sRGBEncoding,
    SpotLight,
    SpotLightHelper,
    Object3D,
    CameraHelper,
    PCFShadowMap,
    PCFSoftShadowMap,
    WebGL1Renderer,
    WebGLRenderer,
    Texture
} from 'three'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { useDebouncedCallback } from 'use-debounce'
import { setAxesHelper } from 'src/utils/tools/axesHelper'
import { getCamera } from 'src/utils/tools/camera'
import { setDirectionalLight } from 'src/utils/tools/directionalLight'
import { setAmbientLight } from 'src/utils/tools/ambientLight'
import { Text } from 'src/components/text'
import { loadGltf } from 'src/utils/tools/loaders/gltfLoader'
import { alarmGroupAnimate, setAlarmGroup } from 'src/utils/convexGeometry/cylinderGeometry'
import { addMaterialToScene } from 'src/utils/tools/material/addMaterialToScene'
import { setPlaneMesh } from 'src/utils/convexGeometry/ground'
import { css2DRenderer } from 'src/utils/tools/css2render'
import { mytowerGroupPosition, towerGroupPosition1, towerGroupPosition2, towerGroupPosition3, towerGroupPosition4, towerGroupPosition5, towerGroupPosition6 } from 'src/constants/material/tower'
import { mediumHouseGroupPosition1, mediumHouseGroupPosition2, mediumHouseGroupPosition3, mediumHouseGroupPosition4 } from 'src/constants/material/mediumHouse'
import { setStreetLamp } from 'src/utils/tools/lights/spotLight/streetLamp'
import { setHemisphereLight } from 'src/utils/tools/hemisphereLight'
import { streetLampGroupPosition1, streetLampGroupPosition2, streetLightGroupPosition1, streetLightGroupPosition2 } from 'src/constants/material/streetLight'
import { FirstPersonControls } from 'three/examples/jsm/controls/FirstPersonControls'
import { randomFn } from 'src/utils/common'
import './index.css'
import { GLTF, GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

//  场景
const scene = new Scene()
scene.background = new Color(0x111133)

//  渲染器
const renderer = new WebGL1Renderer({
    //  消除锯齿
    antialias: true,
    alpha: true
})
//  防止输出模糊
renderer.setPixelRatio(window.devicePixelRatio)
//  渲染细节
renderer.outputEncoding = sRGBEncoding
renderer.shadowMap.type = PCFShadowMap
//  设置渲染器开启阴影
renderer.shadowMap.enabled = true

//  照摄像机
const camera = getCamera()
//  新建一个场景通道  为了覆盖到原理来的场景上
const renderPass = new RenderPass(scene, camera)
//  创建一个EffectComposer（效果组合器）对象，然后在该对象上添加后期处理通道。
const composer = new EffectComposer(renderer)
composer.addPass(renderPass)

//  定时器
const clock = new Clock()

//  坐标轴
setAxesHelper(scene)
//  设置点光源
//  setPointLight(scene)
//  设置平行光
setDirectionalLight(scene)
//  设置半球光
// setHemisphereLight(scene);
//  【平面光】光源
// areaLight
//  设置环境光
setAmbientLight(scene)
//  设置几何体 - 圆锥
const alarmGroup = setAlarmGroup(scene)
//  设置地面
setPlaneMesh(scene)
//  第一人称控件
let firstPersonControls = null
//  2d渲染，文字
let labelText: CSS2DObject = null

//  中等大小的房子的素材数组
let mediumHouseList: Array<Group> = []
//  报警位置
let alarmPosition: { x: number; y: number; z: number } = { x: 99999, y: 99999, z: 99999 }
const stat = new Stat()

window.onload = () => {
    // console.log('onload');
    window.document.body.appendChild(stat.domElement)

    //  第一人称控件
      firstPersonControls = new FirstPersonControls(camera, document.getElementById('mainRef'));
    firstPersonControls.heightSpeed = .01;
    firstPersonControls.movementSpeed = .1;
    firstPersonControls.lookSpeed = 0.001;
    firstPersonControls.lookVertical = true;
    firstPersonControls.constrainVertical = true;
    firstPersonControls.verticalMax = 2;
    firstPersonControls.verticalMin = 1;
    firstPersonControls.mouseDragOn = true;
    firstPersonControls.autoForward = false;
    firstPersonControls.update(1)
}

//  渲染
function animate() {
    //  距离上一次的时间
    // const spt = clock.getDelta() * 1000;
    //  经过的时间
    const spd = clock.getElapsedTime()
    ;(() => {
        //  移动圆锥
        const { x, z } = alarmPosition
        const groupY = 9
        //  报警组动画
        alarmGroupAnimate(spd, x, groupY, z)
        //  2d渲染，文字
        if (labelText) {
            labelText.position.set(x, groupY + Math.cos(spd * 4) + 2 + 3, z)
        }
    })()
    requestAnimationFrame(animate)
    //  重置摄像头
    // camera.setViewOffset(window.innerWidth, window.innerHeight, 0, 0, window.innerWidth, window.innerHeight)
    renderer.setSize(window.innerWidth, window.innerHeight)
    //  普通场景渲染
    renderer.render(scene, camera)
    css2DRenderer.setSize(window.innerWidth, window.innerHeight)
    //  渲染2d文字场景
    css2DRenderer.render(scene, camera)

    //  帧率监测
    stat.update()
    // if (firstPersonControls) {
    //     firstPersonControls.update(1)
    // }
}

function Index() {
    //  text标签
    const textRef = useRef(null)
    const mainRef = useRef<HTMLDivElement | null>(null)
    //  初始化
    const [initKey] = useState('initKey')
    const initList = useDebouncedCallback(async () => {
        //  控制摄像机的位置
        const orbitControls = new OrbitControls(camera, document.getElementById('mainRef'))
        //  摄像机看到的初始位置
        // debugger;
        orbitControls.target = new Vector3(0,0,0)
        orbitControls.update()
        ;(mainRef.current as HTMLDivElement).innerHTML = ''
        ;(mainRef.current as HTMLDivElement).appendChild(renderer.domElement)
        console.log('%c只执行一次', 'color:green;')
        //  加载素材 - 塔楼
        const tower = await loadGltf('materialModels/tower/scene.gltf')
        const myTower = await loadGltf('materialModels/test.gltf')


        console.log('加载素材 - 塔楼', myTower)
        //  添加素材 到场景
        addMaterialToScene(myTower, scene, mytowerGroupPosition)
        // addMaterialToScene(tower, scene, towerGroupPosition1)
        // addMaterialToScene(tower, scene, towerGroupPosition2)
        // addMaterialToScene(tower, scene, towerGroupPosition3)
        // addMaterialToScene(tower, scene, towerGroupPosition4)
        // addMaterialToScene(tower, scene, towerGroupPosition5)
        // addMaterialToScene(tower, scene, towerGroupPosition6)
        // console.log('mediumHouseList', mediumHouseList)

        //  加载素材 - 中等的房子
        // const mediumHouse = await loadGltf('materialModels/mediumHouse/scene.gltf')
        // console.log('加载素材 - 中等的房子', mediumHouse)
        //  添加素材 到场景
        // mediumHouseList.push(...addMaterialToScene(mediumHouse, scene, mediumHouseGroupPosition1))
        // mediumHouseList.push(...addMaterialToScene(mediumHouse, scene, mediumHouseGroupPosition2))
        // mediumHouseList.push(...addMaterialToScene(mediumHouse, scene, mediumHouseGroupPosition3))
        // mediumHouseList.push(...addMaterialToScene(mediumHouse, scene, mediumHouseGroupPosition4))

        // //  加载素材 - 路灯
        // const streetLight = await loadGltf('materialModels/streetlight/scene.gltf')
        // streetLight.scene.rotation.set(0, -(1 / 4.5) * Math.PI, 0)
        // // console.log('加载素材 - 路灯', mediumHouse)
        // addMaterialToScene(streetLight, scene, streetLightGroupPosition1)
        // //  添加路灯灯泡的光源
        // streetLampGroupPosition1.forEach(item => {
        //     setStreetLamp(scene, ...item)
        // })

        // //  另一侧的路灯
        // const otherStreetLights = addMaterialToScene(streetLight, scene, streetLightGroupPosition2)
        // otherStreetLights.forEach(streetLight => {
        //     streetLight.rotateY(1 * Math.PI)
        // })
        //  添加路灯灯泡的光源
        // streetLampGroupPosition2.forEach(item => {
        //     setStreetLamp(scene, ...item)
        // })
        // //  加载素材 - 我的世界
        // const cubeHouseDemo = await loadGltf('materialModels/cubeHouseDemo/cubeHouseDemo.glb')
        // console.log('加载素材 - 我的世界', cubeHouseDemo)
        // console.log(cubeHouseDemo)
        // addMaterialToScene(cubeHouseDemo, scene, {
        //     ...towerGroupPosition1,
        //     xCount: 1,
        //     zStart: -25,
        //     yStart: 6
        // })

        //  文本标签
        labelText = new CSS2DObject(textRef.current)
        labelText.position.set(-10, 10, -10)
        scene.add(labelText)

        //  渲染
        animate()

        return () => {}
    }, 0)
    useEffect(() => {
        initList()
    }, [initKey, initList])

    //  报警
    const alarmClick = () => {
        const alarmIndex = randomFn(0, mediumHouseList.length - 1) | 0
        // console.log(mediumHouseList[alarmIndex].position)
        //  赋值
        Object.assign(alarmPosition, mediumHouseList[alarmIndex].position)
        console.log('报警的位置', alarmPosition)
    }
    return (
        <div className="App">
            <div onClick={alarmClick} className={'alarm-button'}>
                报警
            </div>
            <Text text={'报警！！'} childRef={textRef} />
            <div ref={mainRef} id="mainRef" />
        </div>
    )
}

export default Index
