import { ShaderMaterial } from 'three'

//  顶点着色器
const vertexShader = `varying vec3 vNormal;
varying vec3 vPosition;
void main() {
	//  将attributes的normal通过varying赋值给了向量vNormal
	vNormal = normal;
	vPosition = position;
	//  projectionMatrix是投影变换矩阵 modelViewMatrix是相机坐标系的变换矩阵
	gl_Position = projectionMatrix * modelViewMatrix * vec4(position.x, position.y, position.z, 1.0);
}`

//  片元着色器
const fragmentShader = `varying vec3 vNormal;
varying vec3 vPosition;
void main() {
	float cy = (fract((vPosition.y - 10.0) / 20.0) + 0.7) * 0.7;
	if(vNormal.x==0.0&&vNormal.y==1.0&&vNormal.z==0.0){
		cy = 1.0;
	}
	gl_FragColor = vec4(0.0, cy, cy, 1.0);
}`

//  盒子着色器
const boxShaderMaterial = new ShaderMaterial({
    vertexShader,
    fragmentShader
})

export { boxShaderMaterial }
