import { Mesh, MeshBasicMaterial, MeshLambertMaterial, MeshPhongMaterial, MeshPhysicalMaterial, MeshStandardMaterial, SphereGeometry } from 'three'
import { Material } from 'three/src/materials/Material'
import { Scene } from 'three/src/Three'

//  外层
const outerSphereMaterial = (): Material => {
    const material: Material = new MeshPhysicalMaterial({
        color: 'rgba(104,142,255,0.73)',
        emissive: '#7098ff',
        emissiveIntensity: 0.1,
        transmission: 0.7,
        //  越低越光滑
        roughness: 0.3,
        // clearcoat:.1,
        specularIntensity: 1
    })
    material.transparent = true
    material.opacity = 0.3
    return material
}

//  处理腾讯材质
const tencentMaterial1111 = (scene: Scene): void => {
    const geometry = new SphereGeometry(20, 64, 32)
    const mesh = new Mesh(geometry, outerSphereMaterial())
    scene.add(mesh)
}

export { tencentMaterial1111 }
