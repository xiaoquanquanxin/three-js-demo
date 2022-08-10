//  相机
import { PerspectiveCamera } from "three";

const camera = new PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  20,
  1000
);
//  摄像机的位置
camera.position.set(33, 15, 23);
camera.lookAt(0, 0, 0);

const getCamera = () => {
  return camera;
};

export { getCamera };
