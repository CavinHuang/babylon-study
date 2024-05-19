import * as BABYLON from 'babylonjs';


let myCar
/**
 * 创建一个场景
 * @param {*} engine
 * @param {*} canvas
 */
const createScene = (engine, canvas) => {
  // 创建一个场景
  const scene = new BABYLON.Scene(engine)

  // 创建一个视角相机
  const camera = new BABYLON.ArcRotateCamera('camera1', Math.PI / 2, 1.0, 110, BABYLON.Vector3.Zero(), scene)

  // 设置相机的目标为场景的原点
  camera.setTarget(BABYLON.Vector3.Zero())

  // 启用相机到canvas的控制
  camera.attachControl(canvas, false)

  var light = new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(0, 1, 0), scene);


  // 创建单实线
  const line11 = [
    new BABYLON.Vector3(0, 0, 0),
    new BABYLON.Vector3(50, 0, 0),
  ]
  const line12 = [
    new BABYLON.Vector3(0, 0, 10),
    new BABYLON.Vector3(50, 0, 10),
  ]
  const line21 = [
    new BABYLON.Vector3(0, 0, 10),
    new BABYLON.Vector3(0, 0, 60),
  ]
  const line22 = [
    new BABYLON.Vector3(-10, 0, 10),
    new BABYLON.Vector3(-10, 0, 60),
  ]
  const line33 = []

  for (let i = 180; i <= 270; i++) {
    line33.push(new BABYLON.Vector3(10 * Math.sin(i / 180 * Math.PI), 0, 10 + 10 * Math.cos(i / 180 * Math.PI)));
  }

  const singleSolidLineOption = {
    lines: [line11, line12, line21, line22, line33],
    useVertexAlpha: false,
  }
  BABYLON.MeshBuilder.CreateLineSystem('singleSolidLine', singleSolidLineOption, scene)

  const computeOffsetPoint = (targetPoint, referencePoint, changeSide = false) => {
    const offsetDirection = referencePoint.subtract(targetPoint).cross(new BABYLON.Vector3(0, 1, 0)).normalize()
    const offsetDimension = 0.3

    if (changeSide) {
        offsetDirection.scaleInPlace(-1.0)
    }

    const offsetPoint = targetPoint.add(offsetDirection.scale(offsetDimension))

    return offsetPoint
}

  // 创建双黄线
  const line51 = [
    computeOffsetPoint(new BABYLON.Vector3(0, 0, 5), new BABYLON.Vector3(50, 0, 5)),
    computeOffsetPoint(new BABYLON.Vector3(50, 0, 5), new BABYLON.Vector3(100, 0, 5)),
  ]

  const line52 = [
    computeOffsetPoint(new BABYLON.Vector3(-5, 0, 10), new BABYLON.Vector3(-5, 0, 60)),
    computeOffsetPoint(new BABYLON.Vector3(-5, 0, 60), new BABYLON.Vector3(-5, 0, 110)),
  ]

  var line53 = []
  for (let i = 180; i <= 270; i++) {
    line53.push(new BABYLON.Vector3(5 * Math.sin(i / 180 * Math.PI), 0, 10 + 5 * Math.cos(i / 180 * Math.PI)));
  }

  const line54 = []
  for (let i = 0; i < line53.length - 1; i++) {
    line54.push(computeOffsetPoint(line53[i], line53[i + 1]))
  }

  const line511 = [
    computeOffsetPoint(new BABYLON.Vector3(0, 0, 5), new BABYLON.Vector3(50, 0, 5), true),
    computeOffsetPoint(new BABYLON.Vector3(50, 0, 5), new BABYLON.Vector3(100, 0, 5), true),
  ]
  const line521 = [
      computeOffsetPoint(new BABYLON.Vector3(-5, 0, 10), new BABYLON.Vector3(-5, 0, 60), true),
      computeOffsetPoint(new BABYLON.Vector3(-5, 0, 60), new BABYLON.Vector3(-5, 0, 110), true),
  ]
  var line541 = []
  for (let i = 0; i < line53.length - 1; i++) {
      line541.push(computeOffsetPoint(line53[i], line53[i + 1], true))
  }

  const options22 = {
      lines: [line51, line52, line54, line511, line521, line541],
      useVertexAlpha: false
  }
  var line = BABYLON.MeshBuilder.CreateLineSystem('', options22, scene)
  line.color = new BABYLON.Color3(1, 1, 0)

  // 测试车
  BABYLON.SceneLoader.ImportMesh("", "/", "testee.stl", scene, function (meshes) {
    myCar = meshes[0]
    var mat2 = new BABYLON.StandardMaterial("texture3", scene);

    myCar.material = mat2
    myCar.rotation.x = Math.PI / 2
    myCar.rotation.y = Math.PI
    myCar.position.y = 0.5
    myCar.position.x = 45
    myCar.position.z = 5
  })

  const options = {
    width: 500,
    height: 500,
    subdivisions: 50
  }
  var ground = BABYLON.MeshBuilder.CreateGround('ground', options, scene)

  var groundMaterial = new BABYLON.StandardMaterial('groundMat', scene)
  groundMaterial.emissiveTexture = new BABYLON.Texture("/background.png", scene);
  groundMaterial.emissiveTexture.scale(100)
  groundMaterial.disableLighting = true
  ground.material = groundMaterial

  return scene
}

export const initBabylong = (canvas) => {
  // babylong engine
  const engine = new BABYLON.Engine(canvas, true)

  // 创建一个场景
  const scene = createScene(engine, canvas)

  // 渲染场景
  engine.runRenderLoop(() => {
    scene.render()
  })
}