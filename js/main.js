//Basic init
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

//Setup renderer
const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector("#background"),
});
renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

//Custom scene setup
scene.background = new THREE.Color( 'lightgrey' );
camera.position.z = 5;

//Create ambient light
const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(ambientLight);

//Create point light
const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5,5,5);
scene.add(pointLight);

//Create cube primitives
const cubeGeometry = new THREE.BoxGeometry( 1, 1, 1 );
const purpleMat = new THREE.MeshStandardMaterial( { color: "darkmagenta" } );
const greenMat = new THREE.MeshStandardMaterial( { color: "green" } );

const purpleCube = new THREE.Mesh( cubeGeometry, purpleMat );
const greenCube = new THREE.Mesh( cubeGeometry, greenMat );

purpleCube.position.set((-0.0035 * window.innerWidth), 2, 0);
greenCube.position.set((0.0035 * window.innerWidth), -2, 0);

scene.add( purpleCube );
scene.add( greenCube );

function animate() {
    requestAnimationFrame( animate );

    purpleCube.rotation.x += 0.01;
    purpleCube.rotation.y += 0.01;

    greenCube.rotation.x += 0.01;
    greenCube.rotation.y += 0.01;

    renderer.render( scene, camera );
};

animate();

function onScroll() {

    const t = document.body.getBoundingClientRect().top;

    purpleCube.rotation.x += 0.05;
    purpleCube.rotation.y += 0.05;
    purpleCube.position.y = (t * 0.0025) + 2;

    greenCube.rotation.x += 0.05;
    greenCube.rotation.y += 0.05;
    greenCube.position.y = (t * -0.0025) - 2;
}

document.body.onscroll = onScroll

//On Window Resize event
window.addEventListener( 'resize', function() {
    renderer.setSize( window.innerWidth, window.innerHeight );
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    //Place cubes in appropriate positions
    purpleCube.position.x = (-0.0035 * window.innerWidth);
    greenCube.position.x = (0.0035 * window.innerWidth);
});