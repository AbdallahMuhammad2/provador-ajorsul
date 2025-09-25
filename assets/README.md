# Assets Directory

This directory contains the 3D models, textures, and HDRI files for the Perfect Corp Ring Try-On.

## Directory Structure

```
assets/
├── hdri/          # HDRI environment maps for IBL lighting
│   ├── studio.hdr
│   ├── jewelry-store.hdr
│   ├── daylight.hdr
│   └── luxury-interior.hdr
├── models/        # 3D ring models in glTF format
│   ├── gold-band.gltf
│   ├── diamond-solitaire.gltf
│   ├── silver-ring.gltf
│   └── vintage-ring.gltf
└── textures/      # Additional textures
    ├── materials/
    └── backgrounds/
```

## Adding Your Own Assets

### HDRI Files
- Place .hdr files in the `hdri/` directory
- Recommended resolution: 2048x1024 or 4096x2048
- Use for realistic lighting environments

### 3D Models
- Use glTF 2.0 format (.gltf + .bin + textures)
- Include PBR materials (metallic, roughness, normal maps)
- Optimize for web (keep under 5MB per model)

### Textures
- Use compressed formats (JPEG for color, PNG for alpha)
- Power-of-two dimensions (512x512, 1024x1024, etc.)
- Include proper PBR maps (albedo, metallic, roughness, normal, AO)

## Sample Assets

You can find sample assets at:
- [Poly Haven](https://polyhaven.com/) - Free HDRI environments
- [Sketchfab](https://sketchfab.com/) - 3D models
- [CGTrader](https://www.cgtrader.com/) - Professional jewelry models

## Notes

- All assets should be optimized for web delivery
- Consider using texture compression (KTX2, AVIF)
- Test on mobile devices for performance
- Ensure proper licensing for commercial use