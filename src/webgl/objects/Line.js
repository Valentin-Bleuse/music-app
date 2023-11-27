import * as THREE from 'three';
import audioController from '../../utils/audioController';

export default class Line {
    constructor() {
        this.colors = [0x00ff00, 0x0000ff, 0xff0000, 0x00ffff, 0xff00ff, 0xffff00, 0xffffff, 0x000000]
        this.group = new THREE.Group();
        this.geometry = new THREE.BoxGeometry(1, 1, 1);
        this.material = new THREE.MeshNormalMaterial();
        this.materials = [];

        this.colors.forEach(color => {
            const material = new THREE.MeshBasicMaterial({ color: color });
            this.materials.push(material);
        })

        let n = -1;
        const MODULO = Math.round(256 / this.colors.length);

        this.SPACING = 3;

        for (let i = 0; i < 256; i++) {

            if (i % MODULO === 0) {
                console.log(i)
                n++;
            }

            const mesh = new THREE.Mesh(this.geometry, this.materials[n]);
            mesh.position.x = i * this.SPACING;

            this.group.add(mesh);
        }

        this.group.position.set((-256 * this.SPACING) / 2, 0, 0);
    }




    tick(deltaTime) {
        for (let i = 0; i < this.group.children.length; i++) {
            this.group.children[i].scale.y = audioController.fdata[i];

        }

    }
}