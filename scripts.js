import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import starsT from "../../static/stars.jpg";
import sunT from "../../static/sun.jpg";
import mercuryT from "../../static/mercury.jpg";
import saturnT from "../../static/saturn.jpg";
import saturnR from "../../static/saturn ring.png";
import venusT from "../../static/venus.jpg";
import earthT from "../../static/earth.jpg";
import marsT from "../../static/mars.jpg";
import jupiterT from "../../static/jupiter.jpg";
import uranusT from "../../static/uranus.jpg"
import uranusR from "../../static/uranus ring.png";
import neptuneT from "../../static/neptune.jpg";
import plutoT from "../../static/pluto.jpg"

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);


const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  0.1,
  1000000
);

// Sets orbit control to move the camera around
const orbit = new OrbitControls(camera, renderer.domElement);

// Camera positioning
camera.position.set(-90, 140, 140);
orbit.update();

const ambientLight = new THREE.AmbientLight(0x33333333);
scene.add(ambientLight);

const cubeTextureLoader = new THREE.CubeTextureLoader();
scene.background = cubeTextureLoader.load([
  starsT,
  starsT,
  starsT,
  starsT,
  starsT,
  starsT,
]);

const textureLoader = new THREE.TextureLoader();

const sunGo = new THREE.SphereGeometry(20, 64, 64);
const sunMat = new THREE.MeshBasicMaterial({
  map: textureLoader.load(sunT),
});

const sun = new THREE.Mesh(sunGo, sunMat);
scene.add(sun);

function createplanet(size, texture, position, ring) {
  const geo = new THREE.SphereGeometry(size, 30, 30);
  const mat = new THREE.MeshStandardMaterial({
    map: textureLoader.load(texture),
  });
  const mesh = new THREE.Mesh(geo, mat);
  const obj = new THREE.Object3D();
  obj.add(mesh);
  if (ring) {
    const ringGeo = new THREE.RingGeometry(
        ring.innerRadius,
        ring.outerRadius,
        32
    );
    const ringMat = new THREE.MeshBasicMaterial({
      map: textureLoader.load(ring.texture),
      side: THREE.DoubleSide,
    });

    const ringMesh = new THREE.Mesh(ringGeo, ringMat);
    obj.add(ringMesh);
    ringMesh.position.x = position;
    ringMesh.rotation.x = -0.5 * Math.PI;
  }
  scene.add(obj);
  mesh.position.x = position;
  return { mesh, obj };
}

const mercury = createplanet(3.2, mercuryT, 35);
const venus = createplanet(5.8, venusT, 55);
const earth = createplanet(6, earthT, 77);
const mars = createplanet(4, marsT, 93);
const jupiter = createplanet(12, jupiterT, 120);
const saturn = createplanet(10 , saturnT, 160, {
    innerRadius: 10,
    outerRadius: 20,
    texture: saturnR,
});
const uranus = createplanet(7 , uranusT, 193, {
  innerRadius: 7,
  outerRadius: 12,
  texture: uranusR,
});
const neptune = createplanet(7, neptuneT, 230);
const pluto = createplanet(12, plutoT, 250);


const light = new THREE.PointLight(0xffffff, 30000, 100000000000);
scene.add(light);

// Sets a 12 by 12 gird helper
// const gridHelper = new THREE.GridHelper(12, 12);
// scene.add(gridHelper);

// // Sets the x, y, and z axes with each having a length of 4
// const axesHelper = new THREE.AxesHelper(4);
// scene.add(axesHelper);

function animate() {
  
  // self rotation
  sun.rotateY(0.004);
  mercury.mesh.rotateY(0.002);
  venus.mesh.rotateY(0.002);
  earth.mesh.rotateY(0.02);
  mars.mesh.rotateY(0.018);
  jupiter.mesh.rotateY(0.04);
  saturn.mesh.rotateY(0.038);
  uranus.mesh.rotateY(0.03);
  neptune.mesh.rotateY(0.032);
  pluto.mesh.rotateY(0.008);

  // Around-sun rotation
  mercury.obj.rotateY(0.04);
  venus.obj.rotateY(0.015);
  earth.obj.rotateY(0.01);
  mars.obj.rotateY(0.008);
  jupiter.obj.rotateY(0.002);
  saturn.obj.rotateY(0.0009);
  uranus.obj.rotateY(0.0004);
  neptune.obj.rotateY(0.0001);
  pluto.obj.rotateY(0.0007);

  renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);

window.addEventListener("resize", function () {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
