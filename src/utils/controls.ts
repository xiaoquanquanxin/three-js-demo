import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { Camera, Vector3 } from 'three'

//  控制摄像机的位置
const getControls = (camera: Camera, domElement: HTMLElement) => {
    const orbitControls = new OrbitControls(camera, domElement)
    //  摄像机看到的初始位置
    orbitControls.target = new Vector3(0, 0, 0)
    // orbitControls.maxPolarAngle = Math.PI * 0.495
    // orbitControls.minDistance = 40.0
    // orbitControls.maxDistance = 200.0
    orbitControls.update()
}
export { getControls }
