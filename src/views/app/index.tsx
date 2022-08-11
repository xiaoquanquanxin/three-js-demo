// @ts-nocheck
import React, { useEffect, useRef, useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import {
  Scene,
  WebGLRenderer,
  Color,
  Group,
  SpotLight,
  Clock,
  Vector3,
} from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { setAxesHelper } from "src/utils/tools/axesHelper";
import { getCamera } from "src/utils/tools/camera";
import { setLightHelper } from "src/utils/tools/visualPointLightSource";
import { setDirectionalLight } from "src/utils/tools/directionalLight";
import { setAmbientLight } from "src/utils/tools/ambientLight";
import { Text } from "src/components/text";
import { CSS2DObject } from "three/examples/jsm/renderers/CSS2DRenderer";
import { css2DRenderer } from "src/utils/tools/css2render";
import "./App.css";
import { loadGltf } from "src/utils/tools/loaders/gltfLoader";
import { addMaterialToScene } from "src/utils/tools/material/addMaterialToScene";
import { orbitControlsPosition } from "src/constants/initConfig/positions";

//  场景
const scene = new Scene();
scene.background = new Color(0xbbbbbb);

//  渲染器
const renderer = new WebGLRenderer();

// 创建一个EffectComposer（效果组合器）对象，然后在该对象上添加后期处理通道。
// const composer = new EffectComposer(renderer);

//  照摄像机
const camera = getCamera();
// 新建一个场景通道  为了覆盖到原理来的场景上
// const renderPass = new RenderPass(scene, camera);
// composer.addPass(renderPass);

//  坐标轴
setAxesHelper(scene);

//  可视化点光源
setLightHelper(scene);
//  设置平行光
setDirectionalLight(scene);
//  设置环境光
setAmbientLight(scene);

//  定时器
const clock = new Clock();

function Index() {
  //  text标签
  const textRef = useRef(null);
  const [frame, setFrame] = useState(0);
  const mainRef = useRef<HTMLDivElement | null>(null);
  //  塔组
  const [towerList, setTowerList] = useState<Array<Group>>([]);
  //  初始化
  const [initKey] = useState("initKey");
  const initList = useDebouncedCallback(async () => {
    //  渲染
    function animate() {
      const spt = clock.getDelta() * 1000;
      const frame = (1000 / spt) | 0;
      setFrame(frame);
      requestAnimationFrame(animate);
      //  2d渲染
      css2DRenderer.render(scene, camera);
      //  普通场景渲染
      renderer.render(scene, camera);
    }

    //  控制摄像机的位置
    const orbitControls = new OrbitControls(camera, mainRef.current);
    //  摄像机看到的初始位置
    orbitControls.target = new Vector3(...orbitControlsPosition);
    orbitControls.update();

    renderer.setSize(window.innerWidth, window.innerHeight);
    (mainRef.current as HTMLDivElement).innerHTML = "";
    (mainRef.current as HTMLDivElement).appendChild(renderer.domElement);
    console.log("只执行一次");

    //  加载素材 - 塔楼
    const tower = await loadGltf("materialModels/tower/scene.gltf");
    console.log("tower", tower);
    //  添加素材 到场景
    addMaterialToScene(
      tower,
      scene,
      {
        xStart: 0,
        xSpace: 3,
        xCount: 3,
        yStart: 0,
        ySpace: 0,
        yCount: 1,
        zStart: 0,
        zSpace: 3,
        zCount: 3,
      },
      setTowerList
    );

    //  文本标签
    const label = new CSS2DObject(textRef.current);
    label.position.set(-10, 10, -10);
    scene.add(label);

    //  渲染
    animate();

    return () => {};
  }, 0);
  useEffect(() => {
    initList();
  }, [initKey, initList]);

  //  报警
  const alarmClick = () => {};
  return (
    <div className="App">
      <div onClick={alarmClick} className={"alarm-button"}>
        报警
      </div>
      <div className={"frame"}>帧率：{frame}</div>
      <div ref={mainRef} />
      <Text text={"我是权鑫"} childRef={textRef} />
    </div>
  );
}

export default Index;
