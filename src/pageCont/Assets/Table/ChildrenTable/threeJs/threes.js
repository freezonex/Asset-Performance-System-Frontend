import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import TWEEN from '@tweenjs/tween.js';
import styles from './index.module.scss';

import { Loading } from '@carbon/react';

function ThreeContainer({ glbUrl, ...args }) {
  const containerRef = useRef(null);
  const isUserInteracting = useRef(false);
  const mixer = useRef(null);
  const clock = useRef(new THREE.Clock());
  const [isLoading, setIsLoading] = useState(false); //false 展示loading
  useEffect(() => {
    const fileUrl = glbUrl;
    const container = containerRef.current;

    let camera, scene, renderer;

    function init() {
      const containerWidth = container.clientWidth;
      const containerHeight = container.clientHeight;

      camera = new THREE.PerspectiveCamera(
        50,
        containerWidth / containerHeight,
        1,
        2000,
      );
      camera.position.set(450, 250, 350);

      scene = new THREE.Scene();
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
      scene.add(ambientLight);

      const directionalLight = new THREE.DirectionalLight(0xffffff, 1.5);
      directionalLight.position.set(0, 100, 200);
      directionalLight.target.position.set(0, 0, 0);
      scene.add(directionalLight);
      scene.add(directionalLight.target);

      // 使用示例
      loadModel(fileUrl, scene)
        .then((loadedObject) => {
          // 执行其他操作，因为现在加载已经完成
          console.log('3D 模型加载完成');
          setIsLoading(true);
          // 调整相机位置，使其位于模型上方
          const boundingBox = new THREE.Box3().setFromObject(loadedObject);
          const center = boundingBox.getCenter(new THREE.Vector3());
          const size = boundingBox.getSize(new THREE.Vector3());
          const maxDim = Math.max(size.x, size.y, size.z);
          const fov = camera.fov * (Math.PI / 180);
          let cameraZ = Math.abs(maxDim / 2 / Math.tan(fov / 2)) * 1.2; // 放置在模型的上方
          camera.position.set(
            center.x,
            center.y + maxDim / 2,
            center.z + cameraZ,
          );
          camera.lookAt(center);
       
        })
        .catch((error) => {
          console.error('加载模型出错:', error);
        });

      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.gammaOutput = true;
      renderer.gammaFactor = 2.2;
      renderer.physicallyCorrectLights = true;
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setSize(containerWidth, containerHeight);
      renderer.shadowMap.enabled = true;
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 2;

      const controls = new OrbitControls(camera, renderer.domElement);
      controls.target.set(0, 100, 0);
      controls.update();

      controls.addEventListener('start', () => {
        isUserInteracting.current = true;
      });

      controls.addEventListener('end', () => {
        isUserInteracting.current = false;
      });

      const initAnimation = () => {
        const originalPosition = new THREE.Vector3().copy(camera.position);
        const originalLookAt = new THREE.Vector3(0, 0, 0);
        let initialAngle = 0;
        const radius = 450;

        const orbitTween = new TWEEN.Tween({
          angle: initialAngle,
          y: camera.position.y,
        })
          .to({ angle: Math.PI * 2, y: originalPosition.y }, 6000)
          .easing(TWEEN.Easing.Cubic.InOut)
          .onUpdate((obj) => {
            camera.position.x = radius * Math.cos(obj.angle);
            camera.position.z = radius * Math.sin(obj.angle) + 100;
            camera.position.y = obj.y;
            camera.lookAt(scene.position);
          })
          .onComplete(() => {
            const returnTween = new TWEEN.Tween(camera.position)
              .to(
                {
                  x: originalPosition.x,
                  y: originalPosition.y,
                  z: originalPosition.z
                },
                3000,
              )
              .easing(TWEEN.Easing.Cubic.InOut)
              // .onUpdate(() => {
              //   camera.lookAt(originalLookAt);
              // })
              .start();
          });

        orbitTween.start();
      };

      initAnimation();

      renderer.domElement.style.cursor = 'grab';
      renderer.domElement.addEventListener('mousedown', () => {
        renderer.domElement.style.cursor = 'grabbing';
      });
      renderer.domElement.addEventListener('mouseup', () => {
        renderer.domElement.style.cursor = 'grab';
      });

      container.appendChild(renderer.domElement);
    }

    function animate() {
      requestAnimationFrame(animate);
      const delta = clock.current.getDelta();
      if (mixer.current) {
        mixer.current.update(delta);
      }
      if (!isUserInteracting.current) {
        scene.rotation.y += 0.2 * delta;
      }
      TWEEN.update();
      renderer.render(scene, camera);
    }

    init();
    animate();

    return () => {
      isUserInteracting.current = false;
      mixer.current = null;
    };
  }, []);

  const loadModel = (fileUrl, scene) => {
    return new Promise((resolve, reject) => {
      const loader = new GLTFLoader();
      loader.load(
        fileUrl,
        (gltf) => {
          const object = gltf.scene;
          object.position.y -= 10;
          if (gltf.animations.length > 0) {
            mixer.current = new THREE.AnimationMixer(object);
            const action = mixer.current.clipAction(gltf.animations[0]);
            action.play();
          }

          object.traverse(function (child) {
            if (child.isMesh) {
              child.castShadow = true;
              child.receiveShadow = true;
            }
          });

          adjustScaleBasedOnDevice(object);
          scene.add(object);

          // 模型加载完成，执行 resolve
          resolve(object);
        },
        undefined,
        (error) => {
          console.error('An error occurred while loading the model:', error);
          reject(error); // 加载出错时执行 reject
        },
      );
    });
  };
  const adjustScaleBasedOnDevice = (object) => {
    const isMobile = window.innerWidth < 768;
    if (isMobile) {
      object.scale.set(100, 120, 100);
    } else {
      object.scale.set(170, 120, 170);
    }
  };

  return (
    <div className={styles.threePage}>
      <div ref={containerRef} style={{ width: '300px', height: '300px' }} />
      {!isLoading && (
        <div className={styles.loadingDiv}>
          <Loading className={'some-class'} withOverlay={false} />
        </div>
      )}
    </div>
  );
}

export default React.memo(ThreeContainer);
