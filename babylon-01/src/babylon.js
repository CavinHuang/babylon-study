import * as BABYLON from 'babylonjs';
import 'babylonjs-loaders';

/**
 * 创建一个场景
 * @param {*} engine
 * @param {*} canvas
 */
const createScene = (engine, canvas) => {

  const scene = new BABYLON.Scene(engine)

  // 创建一个视角相机
  const camera = new BABYLON.ArcRotateCamera(
    'camera1',
    BABYLON.Tools.ToRadians(45),
    BABYLON.Tools.ToRadians(45),
    10,
    BABYLON.Vector3.Zero(),
    scene
   )

  // 设置相机的目标为场景的原点
  camera.setTarget(BABYLON.Vector3.Zero())
  camera.attachControl(canvas, true)

  // 创建一个光源
  const light = new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(0, 1, 0), scene)
  light.intensity = 1

  // 创建一个地面
  const ground = BABYLON.MeshBuilder.CreateGround('ground', { width: 10, height: 10 }, scene)
  let groundMaterial = new BABYLON.StandardMaterial('groundMaterial', scene)
  ground.material = groundMaterial

  let groundTexture = new BABYLON.Texture('https://assets.babylonjs.com/textures/checkerboard_basecolor.png', scene)
  groundMaterial.diffuseColor = BABYLON.Color3.Gray()
  groundMaterial.diffuseTexture = groundTexture

  BABYLON.SceneLoader.ImportMesh("", '/', 'Yeti.gltf', scene, function (newMeshes) {
    newMeshes[0].scaling = new BABYLON.Vector3(0.1, 0.1, 0.1);
  })

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

