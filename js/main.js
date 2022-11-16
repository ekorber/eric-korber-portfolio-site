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
const cubeMat = new THREE.MeshStandardMaterial( { color: "#4d4dff" } );

const cubeLeft = new THREE.Mesh( cubeGeometry, cubeMat );
const cubeRight = new THREE.Mesh( cubeGeometry, cubeMat );

cubeLeft.position.set((-0.0035 * window.innerWidth), 2, 0);
cubeRight.position.set((0.0035 * window.innerWidth), -2, 0);

scene.add( cubeLeft );
scene.add( cubeRight );

function animate() {
    requestAnimationFrame( animate );

    cubeLeft.rotation.x += 0.01;
    cubeLeft.rotation.y += 0.01;

    cubeRight.rotation.x += 0.01;
    cubeRight.rotation.y += 0.01;

    renderer.render( scene, camera );
};

animate();

function onScroll() {

    const t = document.body.getBoundingClientRect().top;

    cubeLeft.rotation.x += 0.06;
    cubeLeft.rotation.y += 0.06;
    cubeLeft.position.y = (t * 0.0025) + 2;

    cubeRight.rotation.x += 0.06;
    cubeRight.rotation.y += 0.06;
    cubeRight.position.y = (t * -0.0025) - 2;
}

document.body.onscroll = onScroll

//On Window Resize event
window.addEventListener( 'resize', function() {
    renderer.setSize( window.innerWidth, window.innerHeight );
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    //Place cubes in appropriate positions
    cubeLeft.position.x = (-0.0035 * window.innerWidth);
    cubeRight.position.x = (0.0035 * window.innerWidth);
});