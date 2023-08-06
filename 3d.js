
import * as THREE from 'js/three.module.js';

var camera, scene, renderer;
var geometry, material, mesh;

animate();
function init() {
  const camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, .01, 20 );
  camera.position.z = 1;

  const scene = new THREE.Scene();

  const geometry = new THREE.BoxGeometry( 0.5, 0.5, 0.5 );
  const material = new THREE.MeshNormalMaterial();

  const mesh = new THREE.Mesh( geometry, material );
  scene.add( mesh );

  const renderer = new THREE.WebGLRenderer( { antialias: true } );
  renderer.setSize( window.innerWidth, window.innerHeight );
  document.body.appendChild( renderer.domElement );
}
function animate() {
    init();
    requestAnimationFrame( animate );
    mesh.rotation.x += .01;
    mesh.rotation.y += .02;
    renderer.render( scene, camera );
}
animate();