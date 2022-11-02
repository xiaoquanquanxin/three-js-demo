import { CylinderGeometry, DoubleSide, Group, Material, Mesh, MeshBasicMaterial, MeshLambertMaterial, RingGeometry, Scene } from 'three'

//  得是感光材质
const material = new MeshLambertMaterial({
    color: 0xff1111,
    transparent: true,
    opacity: 0.6
})

//  圆锥体
const cylinderGeometry = new Mesh(new CylinderGeometry(0, 1, 2, 1024, 1), material)
//  上下颠倒
cylinderGeometry.scale.set(1, -1, 1)
//  设置圆锥投影
cylinderGeometry.castShadow = true

//  创建环形
const generateAnnularMesh = (): Mesh => {
    const annularMesh = new Mesh(
        new RingGeometry(
            //  内半径
            0.5,
            //  外半径
            0.6,
            //  θ长度
            1024
        ),
        new MeshBasicMaterial({
            color: 0xff1111,
            transparent: true,
            side: DoubleSide
            // opacity: 0.6
        })
    )
    annularMesh.rotateX((90 / 180) * Math.PI)
    return annularMesh
}
//  第一个环形
const annularMesh1 = generateAnnularMesh()
const annularMesh2 = generateAnnularMesh()
const annularMesh3 = generateAnnularMesh()

//  报警组合
const alarmGroup = new Group()

//  获取圆锥体
const getAlarmGroup = (): Group => alarmGroup
//  设置圆锥体
const setAlarmGroup = (scene: Scene): Group => {
    //  圆锥
    alarmGroup.add(cylinderGeometry)
    //  圆环
    alarmGroup.add(annularMesh1)
    alarmGroup.add(annularMesh2)
    alarmGroup.add(annularMesh3)
    // console.log(annularMesh1)
    scene.add(alarmGroup)
    return getAlarmGroup()
}

//  报警组动画
const alarmGroupAnimate = (spd: number, x: number, y: number, z: number) => {
    //  圆锥
    cylinderGeometry.position.set(0, Math.cos(spd * 4) + 2, 0)
    const groupY = 9
    alarmGroup.position.set(x, groupY, z)

    //  环形
    annularAnimate(annularMesh1, spd, 2)
    annularAnimate(annularMesh2, spd, 0)
    annularAnimate(annularMesh3, spd, -2)
}

//  动画
const annularAnimate = (mesh: Mesh, spd: number, offset: number) => {
    //  半径
    const radius = (spd * 5 + offset) % 6
    //  第一个环形
    mesh.scale.set(radius, radius, 1)
    //  设置不透明度
    ;(mesh.material as MeshBasicMaterial).opacity = 1 - radius / 7
}
export { setAlarmGroup, getAlarmGroup, alarmGroupAnimate }
