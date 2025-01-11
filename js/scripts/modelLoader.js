import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

export function loadModel(scene) {
    return new Promise((resolve, reject) => {
        const loader = new GLTFLoader();
        loader.load(
            "/models/laptopmodelEXTRA1.glb",
            (gltf) => {
                const model = gltf.scene;
                model.position.set(0, -0.5, 0);
                model.scale.set(1, 1, 1);

                model.traverse((node) => {
                    if (node.isMesh) {
                        node.castShadow = true;
                        node.receiveShadow = true;
                    }
                });

                scene.add(model);
                resolve(model);
            },
            undefined,
            (error) => reject(error)
        );
    });
}
