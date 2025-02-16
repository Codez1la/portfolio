import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

export function loadModel(scene) {
    return new Promise((resolve, reject) => {
        const loader = new GLTFLoader();
        loader.load(
            "/models/modelweb.glb",
            (gltf) => {
                const model = gltf.scene;
                model.position.set(1.5, -0.75, 0);
                model.scale.set(.35, .35, .35);

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
