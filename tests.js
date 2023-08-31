import './style.css'

import * as THREE from 'three';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// ## SETUP ##
// create a new scene - this is where everything will go.
const scene = new THREE.Scene();

// create a new camera - this allows us to see the objects made by the renderer and mimics human vision
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

// create a new renderer - this RENDERS objects into the scene
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

// set the pixel ratio of the screen based on the window's pixel ratio
renderer.setPixelRatio( window.devicePixelRatio );
// set the size of the renderer to match the devices window size
renderer.setSize( window.innerWidth, window.innerHeight );
// set the position of the camera along the z axis
camera.position.setZ(30);
camera.position.setX(-3);

// render the scene from the view of the camera
renderer.render( scene, camera );


// ## TORUS ##
// create some geometry for our shape (torus)
const geometry = new THREE.TorusGeometry( 10, 3, 16, 100 );
// create a material for our torus
// const material = new THREE.MeshBasicMaterial( { color: 0xFF6347, wireframe: true } ); // basic materials don't require light sources (easy mode)
const material = new THREE.MeshStandardMaterial( { color: 0xFF6347 } ); // basic materials requre light sources
// put the two together to make our torus object
const torus = new THREE.Mesh( geometry, material );

// add the torus to our scene
scene.add(torus);


// ## LIGHTING ##
const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5, 5, 5);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);


// ## HELPERS & CONTROLS ##
// const lightHelper = new THREE.PointLightHelper(pointLight);
// const gridHelper = new THREE.GridHelper(200, 50);
// scene.add(lightHelper, gridHelper);

// const controls = new OrbitControls(camera, renderer.domElement);

// ## STARS ##
const starGeometry = new THREE.SphereGeometry(0.25, 24, 24);
const starMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff });
function addStar() {
  const star = new THREE.Mesh(starGeometry, starMaterial);

  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(100));

  star.position.set(x, y, z);
  scene.add(star);
}

Array(200).fill().forEach(addStar);


// ## BACKGROUND ##
const spaceTexture = new THREE.TextureLoader().load('/space.jpg'); // can use callback to check when done loading (if wanted loading bar in bigger scenes)
scene.bacgkround = spaceTexture;

// ## TEXTURED MESH ## ( AVATAR ) 
const hexTexture = new THREE.TextureLoader().load('/hex.png');
const hex = new THREE.Mesh(
  new THREE.BoxGeometry(3, 3, 3),
  new THREE.MeshStandardMaterial( { map: hexTexture } )
);
scene.add(hex);

// ## TEXTURED MESH 2 ## ( MOON )
const moonTexture = new THREE.TextureLoader().load('/moon.jpg');
const normalTexture = new THREE.TextureLoader().load('/normal.jpg');

const moon = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial({
    map: moonTexture,
    normalMap: normalTexture,
  })
);

scene.add(moon);

// both of these work and do the same thing
moon.position.z = 30;
moon.position.setX(-10);

// ## MOVE ON SCROLL
function moveCamera() {
  const t = document.body.getBoundingClientRect().top; // gets how far we are from the top of the webpage (always negative)

  moon.rotation.x += 0.05;
  moon.rotation.y += 0.075;
  moon.rotation.z += 0.05;

  hex.rotation.x += 0.01;
  hex.rotation.y += 0.01;

  camera.position.z = t * -0.01;
  camera.position.x = t * -0.0002;
  camera.position.y = t * -0.0002;
}

document.body.onscroll = moveCamera;
moveCamera();


// ## ANIMATION LOOP ##
// make a function that acts as a loop to make our scene update
function animate() {
  requestAnimationFrame( animate );

  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.y += 0.01;

  // controls.update();

  renderer.render( scene, camera );
}

animate();