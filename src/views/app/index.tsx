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
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass";
import { setAxesHelper } from "src/utils/tools/axesHelper";
import { getCamera } from "src/utils/tools/camera";
import { setLightHelper } from "src/utils/tools/visualPointLightSource";
import { setDirectionalLight } from "src/utils/tools/directionalLight";
import { setAmbientLight } from "src/utils/tools/ambientLight";
import "./App.css";

//  间距
const space = 4;
const scene = new Scene();
scene.background = new Color(0xbbbbbb);

//  渲染器
const renderer = new WebGLRenderer();

//  添加素材
const loader = new GLTFLoader();

// 创建一个EffectComposer（效果组合器）对象，然后在该对象上添加后期处理通道。
// const composer = new EffectComposer(renderer);

//  照相机
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
  const [frame, setFrame] = useState(0);
  const mainRef = useRef<HTMLDivElement | null>(null);
  //  塔组
  const [towerList, setTowerList] = useState<Array<Group>>([]);
  //  初始化
  const [initKey] = useState("initKey");
  const initList = useDebouncedCallback(() => {
    function animate() {
      const spt = clock.getDelta() * 1000;
      const frame = (1000 / spt) | 0;
      setFrame(frame);
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    }

    //  控制相机的位置
    const orbitControls = new OrbitControls(camera, mainRef.current);
    console.log(orbitControls);
    orbitControls.target = new Vector3(-10, 0, -10);
    orbitControls.update();

    renderer.setSize(window.innerWidth, window.innerHeight);
    (mainRef.current as HTMLDivElement).innerHTML = "";
    (mainRef.current as HTMLDivElement).appendChild(renderer.domElement);
    console.log("只执行一次");

    loader.load(
      "materialModels/tower/scene.gltf",
      function (gltf) {
        const list = [];
        for (let i = -5; i < 6; i++) {
          for (let j = -5; j < 6; j++) {
            const tower = gltf.scene.clone();
            tower.position.set(i * space, 0, j * space);
            list.push(tower);
            scene.add(tower);
          }
        }
        //  存 state
        setTowerList(list);
      },
      undefined,
      function (error) {
        console.error(error);
      }
    );

    //  渲染
    animate();
  }, 0);
  useEffect(initList, [initKey, initList]);

  //  报警
  const alarmClick = () => {
    loader.load(
      "materialModels/crystle/scene.gltf",
      function (gltf) {
        // const index = (Math.random() * towerList.length) | 0;
        const index = 8;
        const deletedItem = towerList[index];
        console.log("deletedItem", deletedItem);
        // outlineObj(scene);
        return;
        const deletedIndex = scene.children.indexOf(deletedItem);
        const spotLight = new SpotLight(0xffffff);
        spotLight.castShadow = true; //开启阴影效果
        spotLight.shadow = 30; //投影视场，聚光的角度大小
        const { x, y, z } = deletedItem.position;
        console.log("deletedItem", deletedItem);
        console.log("x,y,z", x, y, z);
        //  位置
        spotLight.position.set(x, y, z);

        //  光照的方向。 plane： 地面
        spotLight.target = scene;
        //  光照距离，默认为0.
        spotLight.distance = 0;
        //  光源发射的宽度（弧度）
        spotLight.angle = 0.4;

        scene.add(spotLight);
        renderer.render(scene, camera);
      },
      undefined,
      function (error) {
        console.error(error);
      }
    );
  };
  return (
    <div className="App">
      <div onClick={alarmClick} className={"alarm-button"}>
        报警
      </div>
      <div className={"frame"}>帧率：{frame}</div>
      <div ref={mainRef} />
    </div>
  );
}

export default Index;
