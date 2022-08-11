import {GLTF, GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader';
import {addToMaterialPool, getFromMaterialPool} from 'src/utils/tools/material/materialPool';

//  添加素材
const loader = new GLTFLoader();

//  添加 gltf 到 scene
const loadGltf = async (url: string): Promise<GLTF> => {
	const gltf_package = getFromMaterialPool(url);
	//  取得缓存
	if (gltf_package) {
		return gltf_package
	}
	//  取得最新的
	const gltf_origin = await new Promise<GLTF>((resolve, reject) => {
		loader.load(
			url,
			resolve,
			undefined,
			reject,
		);
	});
	//  添加到素材池
	addToMaterialPool(url, gltf_origin);

	return gltf_origin;
};

export {
	loadGltf
};
