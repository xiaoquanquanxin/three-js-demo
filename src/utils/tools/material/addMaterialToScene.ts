import {GLTF} from 'three/examples/jsm/loaders/GLTFLoader';
import {Dispatch, SetStateAction} from 'react';
import {Scene} from 'three';
import {Group} from 'three/src/Three';

//  添加素材到场景
const addMaterialToScene = (
	gltf: GLTF,
	scene: Scene,
	//  x轴初始位置
	xStart: number,
	//  x轴数量
	xLength: number,
	//  x轴间距
	xSpace: number,
	//  y轴初始位置
	yStart: number,
	//  y轴数量
	yLength: number,
	//  y轴间距
	ySpace: number,
	//  z轴初始位置
	zStart: number,
	//  z轴数量
	zLength: number,
	//  z轴间距
	zSpace: number,
	//  存储数据
	setList: Dispatch<SetStateAction<Array<Group>>>
) => {
	const list = [];
	for (let x = 0; x < xLength; x++) {
		for (let y = 0; y < yLength; y++) {
			for (let z = 0; z < zLength; z++) {
				const tower = gltf.scene.clone();
				tower.position.set(xStart + x * xSpace, yStart + y * ySpace, zStart + z * zSpace);
				list.push(tower);
				scene.add(tower);
			}
		}
	}
	//  存 state
	setList(list);
};


export {
	addMaterialToScene
};
