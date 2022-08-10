import { DirectionalLight, Scene } from "three";

//  平行光 黄色
const directionalLight = new DirectionalLight(0x00f0f0, 1);
directionalLight.position.set(10, 0, 10);
directionalLight.castShadow = true;

//  设置平行光
const setDirectionalLight = (scene: Scene) => {
  scene.add(directionalLight);
};

export { setDirectionalLight };
