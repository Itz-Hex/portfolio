import './style.css'

import * as THREE from 'three';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// Setup

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000)

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( window.innerWidth, window.innerHeight );
camera.position.setZ(50);

renderer.render( scene, camera );

// Planets

const planetTexture1 = new THREE.TextureLoader().load('/hex.png');
const planetTexture2 = new THREE.TextureLoader().load('/planet1.jpg');
const planetTexture3 = new THREE.TextureLoader().load('/planet2.jpg');
const planetTexture4 = new THREE.TextureLoader().load('/planet3.jpg');

const planet1 = new THREE.Mesh(
  new THREE.BoxGeometry(10, 10, 10),
  new THREE.MeshStandardMaterial( { map: planetTexture1 } )
);
const planet2 = new THREE.Mesh(
  new THREE.SphereGeometry(4, 32, 16),
  new THREE.MeshStandardMaterial( { map: planetTexture2 } )
);
const planet3 = new THREE.Mesh(
  new THREE.SphereGeometry(6, 32, 16),
  new THREE.MeshStandardMaterial( { map: planetTexture3 } )
);
const planet4 = new THREE.Mesh(
  new THREE.SphereGeometry(5, 32, 16),
  new THREE.MeshStandardMaterial( { map: planetTexture4 } )
);

planet1.position.set(-35, 17.5, 10);
planet1.rotation.set(0.25,0.5,0);
planet2.position.set(-32, -15, 13);
planet3.position.set(42, 19, 0);
planet4.position.set(46, -14, 5);

scene.add(planet1, planet2, planet3, planet4);


// ## STARS ##
const starGeometry = new THREE.SphereGeometry(0.25, 24, 24);
const starMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff });
const stars = Array();
function addStar() {
  const star = new THREE.Mesh(starGeometry, starMaterial);

  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(200));

  star.position.set(x, y, z-75);
  scene.add(star);
  stars.push(star);
}

Array(350).fill().forEach(addStar);


// Lighting

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5, 5, 5);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);

// Helpers and controls
const gridHelper = new THREE.GridHelper(200, 50);
scene.add(gridHelper);

const controls = new OrbitControls(camera, renderer.domElement);

// Animation loop
function animate() {
  requestAnimationFrame( animate );

  controls.update();

  renderer.render( scene, camera );
}

animate();