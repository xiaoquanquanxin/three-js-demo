import { PointLight } from "three";
import { Color } from "three/src/math/Color";

const pointLight = new PointLight(new Color(0x00ffff), 1);
pointLight.position.set(10, 10, -10);
//  点光源
const getPointLight = () => pointLight;

export { getPointLight };
