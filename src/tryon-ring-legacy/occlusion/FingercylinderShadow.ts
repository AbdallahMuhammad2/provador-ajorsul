import {
  BloomPlugin,
  CylinderGeometry,
  MaterialExtension,
  Mesh,
  MeshStandardMaterial2,
  Object3D,
  shaderReplaceString, VelocityBufferPlugin,
  ViewerApp,
} from "webgi";

/**
 * For shadow of ring on the finger, assuming it a cylinder.
 * todo: make a flag in the tryon plugin to allow disable dynamic shadow and use a custom one.
 */
export class FingerCylinderShadow {
  public shadowMaterial: MeshStandardMaterial2 | null = null;

  ext: MaterialExtension = { // todo maybe we should make a parameter for opacity/color
    uuid: "shadowSSAO",
    isCompatible: () => true,
    computeCacheKey: () => "1",
    shaderExtender: (shader) => {
      if (!shader.defines.SSAO_ENABLED) return;
      const ssaoPatch = `
        gl_FragColor.rgb = vec3(ambientOcclusion) * diffuseColor.rgb;
        gl_FragColor.a = 1.;
        `;
      shader.fragmentShader = shaderReplaceString(shader.fragmentShader, "#include <output_fragment>", ssaoPatch, {
        append: true,
      });
    },
  };

  fingerCylinder = new CylinderGeometry(1, 1, 1, 32).rotateX(Math.PI / 2);
  shadowRoot = new Object3D();

  init(viewer: ViewerApp) {
    const material = viewer.createPhysicalMaterial()!
    material.userData.renderToDepth = true;
    material.userData.postTonemap = false;
    material.userData[VelocityBufferPlugin.PluginType] = { disabled: true }
    material.userData[BloomPlugin.PluginType] = { disabled: true }
    material.userData.ssaoCastDisabled = true;
    material.colorWrite = true;
    this.shadowMaterial = material;
    this.shadowMaterial.registerMaterialExtensions([this.ext]);

    const mesh = new Mesh(this.fingerCylinder, this.shadowMaterial);
    this.shadowRoot.add(mesh);
  }

  dispose() {
    this.shadowMaterial?.dispose();
    this.shadowRoot.children.forEach((c) => {
      if (c instanceof Mesh) {
        c.geometry.dispose()
        c.material.dispose()
        c.removeFromParent()
      }
    });

    this.shadowRoot.removeFromParent()
    this.fingerCylinder.dispose()
  }
}