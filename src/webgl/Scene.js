import * as THREE from "three";
import { gsap } from "gsap";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import Stats from "three/examples/jsm/libs/stats.module.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import Line from "./objects/Line";
import Logoiut from "./objects/Logoiut";
import Board from "./objects/Board";



import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass";
import pane from "../utils/Pane";
import Cube from "./objects/Cube";
import Cover from "./objects/Cover";
class SCENE {
    setup(canvas) {
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.canvas = canvas;

        this.setupScene();
        this.setupCamera();
        this.setupControls();
        this.setupStats();
        this.setupRenderer();
        this.setupPostProcessing();
        this.setupGLTFLoader();
        this.setupTextureLoader();

        this.addObjects();
        this.addEvents();
    }

    setupGLTFLoader() {
        this.gltfLoader = new GLTFLoader();

    }
    setupTextureLoader() {
        this.textureLoader = new THREE.TextureLoader();
    }

    setupScene() {
        this.scene = new THREE.Scene();
    }

    setupStats() {
        this.stats = new Stats();
        // this.stats.showPanel(0);
        document.body.appendChild(this.stats.dom);
    }

    setupCamera() {
        this.camera = new THREE.PerspectiveCamera(
            28,
            this.width / this.height,
            0.1,
            10000
        );

        this.camera.position.z = 50;
    }

    setupControls() {
        this.controls = new OrbitControls(this.camera, this.canvas);
    }

    setupRenderer() {
        this.renderer = new THREE.WebGLRenderer({
            canvas: this.canvas,
            antialias: false,
            powerPreference: "high-performance",
            stencil: false,
            depth: false,
            // alpha: true
        });

        this.renderer.toneMapping = THREE.NoToneMapping;
        this.renderer.outputColorSpace = THREE.SRGBColorSpace;

        this.renderer.setClearColor(0x000000);
        this.renderer.setSize(this.width, this.height);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    }

    setupPostProcessing() {
        this.BLOOM_PARAMS = {
            strenght: 1,
            radius: 1,
            threshold: 0
        }
        this.composer = new EffectComposer(this.renderer)
        this.scenePass = new RenderPass(this.scene, this.camera)
        this.bloomPass = new UnrealBloomPass(new THREE.Vector2(this.width / this.height), this.BLOOM_PARAMS.strenght, this.BLOOM_PARAMS.radius, this.BLOOM_PARAMS.threshold);
        this.composer.addPass(this.scenePass)
        this.composer.addPass(this.bloomPass)

        this.postProcessfolder = pane.addFolder({
            title: "Bloom",

        });

        this.postProcessfolder.addBinding(this.BLOOM_PARAMS, "strenght", {
            min: 0,
            max: 1,
            step: 0.1,
        }).on('change', (e) => {
            console.log(e)
            this.bloomPass.strength = e.value;
        })
        this.postProcessfolder.addBinding(this.BLOOM_PARAMS, "radius", {
            min: 0,
            max: 10,
            step: 0.01,
        }).on('change', (e) => {
            console.log(e)
            this.bloomPass.radius = e.value;
        })

        this.postProcessfolder.addBinding(this.BLOOM_PARAMS, "threshold", {
            min: 0,
            max: 1,
            step: 0.01,
        }).on('change', (e) => {
            console.log(e)
            this.bloomPass.threshold = e.value;
        })



    }

    addEvents() {
        // gsap.ticker.add((time, deltaTime, frame) =>
        //   this.tick(time, deltaTime, frame)
        // );

        gsap.ticker.add(this.tick);
        gsap.ticker.fps(120);
        window.addEventListener("resize", () => this.resize());
    }

    resize() {
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.renderer.setSize(this.width, this.height);
        this.camera.aspect = this.width / this.height;
        this.camera.updateProjectionMatrix();
    }


    addObjects() {
        this.cube = new Cube();
        this.logo = new Logoiut();
        this.line = new Line()
        this.board = new Board()
        this.cover = new Cover();
        this.selectedObject = this.cover;
        this.scene.add(this.selectedObject.group);
    }


    changeVisualizer(index) {
        this.scene.remove(this.selectedObject.group);
        switch (index) {
            case 0:
                this.selectedObject = this.cube;
                this.camera.position.z = 10;

                break;
            case 1:
                this.selectedObject = this.line;
                this.camera.position.z = 1000;
                break;
            case 2:
                this.selectedObject = this.logo;
                this.camera.position.z = 20;

                break;
            case 3:
                this.selectedObject = this.board;
                this.camera.position.z = 200;
                this.bloomPass.strength = 0.5;
                break;
            case 4:
                this.selectedObject = this.cover;
                this.camera.position.z = 50;
                this.bloomPass.strength = 0;
            default:
                break;
        }
        this.scene.add(this.selectedObject.group);
    }

    tick = (time, deltaTime, frame) => {
        this.stats.begin();
        this.selectedObject.tick(deltaTime)
        this.line.tick();
        this.composer.render();
        this.stats.end();


        // console.log("allo");
    };
}


const Scene = new SCENE();
export default Scene;