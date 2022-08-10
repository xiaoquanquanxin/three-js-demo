import { PointLight } from "three";
import { Color } from "three/src/math/Color";

//  点光源的影响的范围、影响的距离
const pointLight = new PointLight(new Color(0xffffff), 10, 10);
pointLight.position.set(-8, 2, -10);
//  点光源
const getPointLight = () => pointLight;

export { getPointLight };
