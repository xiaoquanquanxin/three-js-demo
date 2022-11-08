import { DoubleSide, Float32BufferAttribute, Mesh, PlaneGeometry, RawShaderMaterial, Uint8BufferAttribute } from 'three'

const material = new RawShaderMaterial({
    uniforms: {
        time: { value: 1.0 }
    },
    vertexShader: `precision mediump float;
precision mediump int;

uniform mat4 modelViewMatrix; // optional
uniform mat4 projectionMatrix; // optional

attribute vec3 position;
attribute vec4 color;

varying vec3 vPosition;
varying vec4 vColor;

void main(){
	vPosition = position;
	vColor = color;
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,
    fragmentShader: `precision mediump float;
precision mediump int;

uniform float time;

varying vec3 vPosition;
varying vec4 vColor;

void main()	{
	vec4 color = vec4( vColor );
	gl_FragColor = color;
}`,
    side: DoubleSide,
    transparent: true
})

const vertexCount = 4
const geometry = new PlaneGeometry()
const positions = []
const colors = []
for (let i = 0; i < vertexCount; i++) {
    switch (i) {
        case 0:
        case 1:
            colors.push(255, 0, 0, 255)
            break
        case 2:
        case 3:
            colors.push(255, 0, 0, 0)
            break
    }
}
positions.push(...[10, 20, 0, -10, 20, 0, 10, 0, 0, -10, 0, 0])
console.log('colors', colors)
console.log('positions', positions)
const positionAttribute = new Float32BufferAttribute(positions, 3)
const colorAttribute = new Uint8BufferAttribute(colors, 4)
colorAttribute.normalized = true
geometry.setAttribute('position', positionAttribute)
geometry.setAttribute('color', colorAttribute)
const mesh = new Mesh(geometry, material)

const getMesh = () => {
    return mesh
}
export { getMesh }
