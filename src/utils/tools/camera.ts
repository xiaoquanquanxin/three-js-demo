import { PerspectiveCamera } from "three";
import {
  cameraInitRange,
  cameraPosition,
} from "src/constants/initConfig/positions";

//  摄像机
const camera = new PerspectiveCamera(...cameraInitRange);
//  摄像机的位置
camera.position.set(...cameraPosition);
//  看的位置，这是不起作用的，因为使用了 orbitControls [https://blog.csdn.net/WoZhiMoMing/article/details/114629008]
// camera.lookAt(0, 0, 0);

const getCamera = () => {
  return camera;
};

export { getCamera };
