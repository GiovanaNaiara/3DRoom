import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';
import { MTLLoader } from 'three/addons/loaders/MTLLoader.js';

//Configurações da parte Gráfica
//1- Criação da cena
const scene = new THREE.Scene();

//2 - Criação da Câmera (perspectiva) e posicionamento
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = -6;
camera.position.y = 4;
camera.position.x = 10;

//3 - Instanciação do Renderizador
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById("3dRoom").appendChild(renderer.domElement);

//Adição de Fontes de Luz:
//Luz Ambiente
const ambientLight = new THREE.AmbientLight({ color: 0xFFFEE0, intensity: 10 });
scene.add(ambientLight);

//Luz Pontual
const pointLight = new THREE.PointLight("white");
pointLight.power = 100;
pointLight.position.set(10, 10, 20);
scene.add(pointLight);

//Luz do interior do quarto (Direcional)
const directionalLightInterna = new THREE.DirectionalLight({ color: 0xFFFFFF, intensity: 15 });
directionalLightInterna.position.set(20, 10, 0);
scene.add(directionalLightInterna);

//CubeMap - Para Renderizar o céu
const loaderCube = new THREE.CubeTextureLoader();
const textureSky = loaderCube.load([
  '../sky.jpg',
  '../sky.jpg',
  '../upsky.jpg',
  '../sky.jpg',
  '../sky.jpg',
  '../sky.jpg',
]);
scene.background = textureSky;

//Orbit Controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.target.set(0, 0, 0);
controls.update();

//Carregamento de textura e objeto 3D do quarto
const objLoader = new OBJLoader();
const mtlLoader = new MTLLoader();
let room;
mtlLoader.load('../Another bedroom.mtl', (mtl) => {
  mtl.preload();
  objLoader.setMaterials(mtl);
  objLoader.load('../Another bedroom.obj', (root) => {
    room = root;
    scene.add(room);

  }, undefined, (error) => {
    console.error('Ocorreu um erro ao carregar um modelo OBJ:', error);
  });
}, undefined, (error) => {
  console.error('Ocorreu um erro ao carregar um material MTL:', error);
});

//Iluminar o avatar
const avLight = new THREE.PointLight({ color: 0xffffff, intensity: 150 });
avLight.position.set(5, 0, 0);
scene.add(avLight);

//Importação de texturas e modelo 3D avatar
const objLoaderAvatar = new OBJLoader();
const mtlLoaderAvatar = new MTLLoader();
let rootAv;
mtlLoaderAvatar.load('../girl OBJ.mtl', (mtlAv) => {
  mtlAv.preload();
  objLoaderAvatar.setMaterials(mtlAv);
  objLoaderAvatar.load('../girl OBJ.obj', (root) => {
    rootAv = root;
    rootAv.position.x = 5;
    rootAv.rotation.y = Math.PI;
    rootAv.rotation.y = -Math.PI / 2;
    rootAv.PointLight;
    scene.add(rootAv);

    //Movimentação do avatar ao pressionar uma das setas do teclado
    document.addEventListener('keydown', function (event) {
      const movimento = 0.01;
      event.preventDefault();

      console.log('Key pressed:', event.code);

      if (rootAv.position.x <= 4.2) {
        //subir degrau
        rootAv.position.y = 0.2;

      }

      if (rootAv.position.x > 4.2) {
        //descer degrau
        rootAv.position.y = 0;
      }

      if (rootAv.position.z < -4) {
        //descer degrau
        rootAv.position.y = 0;
      }

      if (rootAv.position.z === -4) {
        //subir degrau
        rootAv.position.y = 0.2;
      }


      switch (event.code) {

        case 'ArrowLeft':

          //Colisão com guarda-roupa
          if (rootAv.position.z >= 3 && rootAv.position.x <= 4.2) {

            rootAv.position.z = 2.7;
          }

          console.log(rootAv.position.z);
          rootAv.position.z += movimento;
          rootAv.rotation.y = Math.PI / 10;
          break;

        case 'ArrowUp':

          //Colisão com cama 
          if (rootAv.position.z >= 0.3 && rootAv.position.x <= -1) {

            rootAv.position.x = -0.9;
          }

          //Colisão com mesa de estudos (mas passa pelo espaço entre cama e mesa)
          if (rootAv.position.z <= -0.16 && rootAv.position.x <= -1) {

            rootAv.position.x = -0.9;
          }

          console.log(rootAv.position.x);
          rootAv.position.x -= movimento;
          rootAv.rotation.y = -(Math.PI / 2);
          break;
          
        case 'ArrowRight':
          console.log(rootAv.position.z);
          rootAv.position.z -= movimento;
          rootAv.rotation.y = (Math.PI);
          break;
        
        case 'ArrowDown':
          console.log(rootAv.position.x);
          rootAv.position.x += movimento;
          rootAv.rotation.y = Math.PI / 2;
          break;
      }
    });

    controls.update();


  }, undefined, (error) => {
    console.error('Ocorreu um erro ao carregar modelo OBJ:', error);
  });
}, undefined, (error) => {
  console.error('Ocorreu um erro ao carregar material MTL:', error);
});

//Importação de texturas e modelo 3D gato
const objLoaderCat = new OBJLoader();
const mtlLoaderCat = new MTLLoader();
let rootCat;

mtlLoaderCat.load('../12221_Cat_v1_l3.mtl', (mtlCat) => {
  mtlCat.preload();
  objLoaderCat.setMaterials(mtlCat);
  objLoaderCat.load('../12221_Cat_v1_l3.obj', (root) => {
    rootCat = root;
    rootCat.position.x = 4;
    rootCat.position.y = 0;
    rootCat.position.z = -6;
    rootCat.rotation.z = Math.PI;
    rootCat.rotation.y = Math.PI;
    rootCat.rotation.x = Math.PI / 2;
    //diminuir tamanho do gato
    rootCat.scale.set(0.02, 0.02, 0.02);
    scene.add(rootCat);

  }, undefined, (error) => {
    console.error('Ocorreu um erro ao carregar modelo OBJ:', error);
  });
}, undefined, (error) => {
  console.error('Ocorreu um erro ao carregar material MTL:', error);
});


//Inserção de grama como terreno (textura)
const planeSize = 100;
const loaderGrass = new THREE.TextureLoader();
const texture = loaderGrass.load('../grass.jpg');
texture.wrapS = THREE.RepeatWrapping;
texture.wrapT = THREE.RepeatWrapping;
texture.mapFilter = THREE.NearestFilter;
texture.colorSpace = THREE.SRGBColorSpace;
const repeats = planeSize / 2;
texture.repeat.set(repeats, repeats);

const planeGeo = new THREE.PlaneGeometry(planeSize, planeSize);
//Mesh Lambert para grama parecer natural
const planeMat = new THREE.MeshLambertMaterial({
  map: texture,
  side: THREE.DoubleSide
});
const mesh = new THREE.Mesh(planeGeo, planeMat);
mesh.rotation.x = -(Math.PI / 2);
scene.add(mesh);

//Animação
function animate() {

  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

animate();

//Mensagens de erro
renderer.domElement.addEventListener('webglerror', (event) => {
  console.error('WebGL Error:', event.message);
});