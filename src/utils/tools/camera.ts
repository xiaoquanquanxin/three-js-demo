//  相机
import { PerspectiveCamera } from "three";

//  角度
//  宽高比
//  最仅
//  最远
const camera = new PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  20,
  1000
);
//  摄像机的位置
camera.position.set(30, 50, 30);
//  看的位置，这是不起作用的，因为使用了 orbitControls [https://blog.csdn.net/WoZhiMoMing/article/details/114629008]
camera.lookAt(0, 0, 0);

const getCamera = () => {
  return camera;
};

export { getCamera };
