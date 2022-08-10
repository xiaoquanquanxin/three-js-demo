import { AxesHelper, Scene } from "three";
import { Color } from "three/src/math/Color";

//  坐标轴
const axesHelper = new AxesHelper(30);
axesHelper.position.set(-10, 0, -10);
axesHelper.setColors(
  new Color(0xff0000),
  new Color(0x00ff00),
  new Color(0x0000ff)
);

//  设置坐标轴
const setAxesHelper = (scene: Scene) => {
  scene.add(axesHelper);
};
export { setAxesHelper };
