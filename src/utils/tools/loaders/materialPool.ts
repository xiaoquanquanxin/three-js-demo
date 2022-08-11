import {GLTF} from 'three/examples/jsm/loaders/GLTFLoader';

//  素材池，这是一个全局缓存
const materialPool = new Map<string, GLTF>();

//  添加到素材池
const addToMaterialPool = (url: string, gltf: GLTF): GLTF => {
	const _gltf = getFromMaterialPool(url);
	if (_gltf) {
		return _gltf;
	}
	materialPool.set(url, gltf);
	return gltf;
};

//  获取素材
const getFromMaterialPool = (url: string): GLTF | null => {
	return materialPool.get(url) || null;
};

export {
	addToMaterialPool
};
