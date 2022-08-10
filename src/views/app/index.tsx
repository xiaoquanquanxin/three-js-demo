// @ts-nocheck
import React, { useEffect, useRef, useState } from "react";
import {
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  Color,
  AmbientLight,
  DirectionalLight,
  PointLight,
  Group,
  SpotLight,
  Vector2,
  Raycaster,
  MOUSE,
} from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass";
import { useDebouncedCallback } from "use-debounce";
import "./App.css";

const scene = new Scene();
scene.background = new Color(0xdddddd);
const renderer = new WebGLRenderer();
const camera = new PerspectiveCamera(
  50,
  window.innerWidth / window.innerHeight,
  1,
  1000
);
camera.position.z = 10;
camera.position.x = 30;
camera.position.y = 20;
//  添加素材
const loader = new GLTFLoader();

// 创建一个EffectComposer（效果组合器）对象，然后在该对象上添加后期处理通道。
const composer = new EffectComposer(renderer);
// 新建一个场景通道  为了覆盖到原理来的场景上
const renderPass = new RenderPass(scene, camera);
composer.addPass(renderPass);

// //  射线
// const raycaster = new Raycaster();
// raycaster.setFromCamera({x: 1, y: 4}, camera);
//
// const intersects = raycaster.intersectObject(scene, true);
//
// if (intersects.length > 0) {
// 	const selectedObject = intersects[0].object;
// 	addSelectedObject(selectedObject);
// 	outlinePass.selectedObjects = selectedObjects;
// } else {
// 	// outlinePass.selectedObjects = [];
// }

function Index() {
  const mainRef = useRef<HTMLDivElement | null>(null);

  //  塔组
  const [towerList, setTowerList] = useState<Array<Group>>([]);

  //  初始化
  const [initKey] = useState("initKey");
  const initList = useDebouncedCallback(() => {
    //  环境光
    const ambientLight1 = new AmbientLight(0xffffff, 0.4);
    // const ambientLight2 = new AmbientLight(0xffffff, 0.4);
    // const ambientLight3 = new AmbientLight(0xffffff, 0.4);
    ambientLight1.position.set(0, 0, 0);
    // ambientLight2.position.set(0, 0, 0);
    // ambientLight3.position.set(0, 0, 0);
    scene.add(ambientLight1);
    // scene.add(ambientLight2);
    // scene.add(ambientLight3);

    //  平行光 黄色
    const directionalLight = new DirectionalLight(0xffffff, 0.9);
    directionalLight.position.set(40, 40, 100);
    directionalLight.castShadow = true;
    scene.add(directionalLight);

    //  控制
    const controls = new OrbitControls(camera, mainRef.current);

    function animate() {
      renderer.render(scene, camera);
    }

    controls.addEventListener("change", animate);

    renderer.setSize(window.innerWidth, window.innerHeight);
    (mainRef.current as HTMLDivElement).innerHTML = "";
    (mainRef.current as HTMLDivElement).appendChild(renderer.domElement);
    console.log("只执行一次");

    loader.load(
      "materialModels/tower/scene.gltf",
      function (gltf) {
        const list = [];
        for (let i = -2; i < 3; i++) {
          for (let j = -2; j < 3; j++) {
            const tower = gltf.scene.clone();
            tower.position.set(i * 4, 0, j * 4);
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
  }, 0);
  useEffect(initList, [initKey, initList]);

  //  渲染塔
  const towerListRender = useDebouncedCallback(() => {
    if (!towerList.length) {
      return;
    }
    console.log("渲染", scene.children);
    renderer.render(scene, camera);
  }, 0);
  //  渲染
  useEffect(towerListRender, [towerList, towerListRender]);

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

        return;

        (() => {
          console.log("deletedIndex", deletedIndex);
          console.log("deletedItem", ...deletedItem);
          // console.log(scene.children.length);
          scene.children.splice(deletedIndex, 1);
          // console.log(scene.children.length);
          scene.add(gltf.scene);
          console.log(deletedItem[0].position);
          const { x, y, z } = deletedItem[0].position;
          gltf.scene.position.set(x, y, z);
          renderer.render(scene, camera);
        })();
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
      <div ref={mainRef} />
    </div>
  );
}

export default Index;
