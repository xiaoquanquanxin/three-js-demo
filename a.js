import * as THREE from './_snowpack/pkg/three.js';
import {GLTFLoader} from './_snowpack/pkg/three/examples/jsm/loaders/GLTFLoader.js';
import {OrbitControls} from './_snowpack/pkg/three/examples/jsm/controls/OrbitControls.js';
import Stats from './_snowpack/pkg/statsjs.js';

/* Stats.js */
var stats = new Stats();
stats.showPanel(0);
document.body.appendChild(stats.dom);

/* Three.js */
const canvasContainer = document.getElementById('canvas-container');
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xcce0ff);
//scene.fog = new THREE.Fog( 0xcce0ff, 500, 10000 );

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 8;
camera.position.y = 6;

const renderer = new THREE.WebGL1Renderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
renderer.outputEncoding = THREE.sRGBEncoding;
//renderer.gammaOutput = true;

canvasContainer.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.maxPolarAngle = Math.PI * 0.45;
controls.minDistance = 5;
controls.maxDistance = 20;

const color = 0xFFFFFF;
const intensity = 0.2;
const light = new THREE.AmbientLight(color, intensity);
scene.add(light);

const sunColor = 0xFF8833;
const sunIntensity = 1.9;
const sunLight = new THREE.DirectionalLight(sunColor, sunIntensity);
sunLight.position.set(-50, 40, 10);
sunLight.target.position.set(0, 0, 0);

sunLight.castShadow = true;
//sunLight.shadow.mapSize.width = 8192;
//sunLight.shadow.mapSize.height = 8192;
sunLight.shadow.camera.left = -100;
sunLight.shadow.camera.bottom = -100;
sunLight.shadow.camera.right = 100;
sunLight.shadow.camera.top = 100;

const helper = new THREE.CameraHelper(sunLight.shadow.camera);
scene.add(helper);
scene.add(sunLight);
scene.add(sunLight.target);

/* Extra Models To Show Lights Work */
const sphereGeometry = new THREE.SphereGeometry(1, 32, 32);
const sphereMaterial = new THREE.MeshStandardMaterial({color: 0xff0000});
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
sphere.translateY(7);
sphere.castShadow = true;
sphere.receiveShadow = false;
scene.add(sphere);

const planeGeometry = new THREE.PlaneGeometry(20, 20, 32, 32);
const planeMaterial = new THREE.MeshStandardMaterial({color: 0x00ff00});
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.rotateY(-Math.PI / 2);
plane.translateZ(-8.5);
plane.receiveShadow = true;
scene.add(plane);

/* Model Loading */
const loader = new GLTFLoader();

loader.load('models/CubeHouseDemo.glb',
	//This doesn't recieve shadows :/
	//CubeHouseExported.gltf does! But the textures are messed up by blender. :(
	function (gltf) {

		gltf.scene.traverse(function (node) {

			if (node.isMesh) {
				node.castShadow = true;
				node.receiveShadow = true;

				node.geometry.computeVertexNormals(); // FIX

				/*
				//Changing these doesn't make a difference.
				node.material.roughness = 1;
				node.material.shadowSide = THREE.DoubleSide;
				node.material.side = THREE.DoubleSide;
				*/
			}
		});

		scene.add(gltf.scene);
	},
	function (xhr) {
		console.log((xhr.loaded / xhr.total * 100) + '% loaded');
	},
	function (error) {
		console.log('An error happened');
	}
);

/* Resize the Window */
window.addEventListener('resize', onWindowResize);

function onWindowResize() {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();

	renderer.setSize(window.innerWidth, window.innerHeight);
}

/* Click to Find Object */
// Used for debugging.
const raycaster = new THREE.Raycaster();

function onClick(event) {
	event.preventDefault();

	raycaster.setFromCamera({x: 0, y: 0}, camera);

	let intersects = raycaster.intersectObjects(scene.children, true);

	if (intersects.length > 0) {
		console.log(intersects[0].object);
	}
}

renderer.domElement.addEventListener('click', onClick, false);


const animate = function () {
	stats.begin();
	renderer.render(scene, camera);
	stats.end();

	requestAnimationFrame(animate);
};

animate();


