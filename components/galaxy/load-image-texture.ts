import * as THREE from 'three/webgpu';

export interface ImageTextureResult {
  texture: THREE.Texture;
  width: number;
  height: number;
}

export async function loadImageTexture(
  imagePath: string,
): Promise<ImageTextureResult> {
  return new Promise((resolve, reject) => {
    const textureLoader = new THREE.TextureLoader();
    textureLoader.load(
      imagePath,
      (texture) => {
        texture.colorSpace = THREE.SRGBColorSpace;
        texture.magFilter = THREE.LinearFilter;
        texture.minFilter = THREE.LinearFilter;
        resolve({
          texture,
          width: texture.image.width,
          height: texture.image.height,
        });
      },
      undefined,
      (error) => {
        reject(new Error(`Failed to load image: ${error}`));
      },
    );
  });
}
