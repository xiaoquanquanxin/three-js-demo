import { CSS2DRenderer } from "three/examples/jsm/renderers/CSS2DRenderer";

//  css 2d 渲染，把你的普通div渲染到场景

const css2DRenderer = new CSS2DRenderer();

css2DRenderer.setSize(window.innerWidth, window.innerHeight);
css2DRenderer.domElement.style.position = "absolute";
css2DRenderer.domElement.style.top = "0";
css2DRenderer.domElement.style.right = "0";
css2DRenderer.domElement.style.pointerEvents = "none";

document.body.appendChild(css2DRenderer.domElement);

//  导出 css2d渲染
export { css2DRenderer };
