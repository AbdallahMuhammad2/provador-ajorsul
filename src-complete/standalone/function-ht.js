/* Standalone Function: ht */

function ht(St, At, Et, Pt) {
            const It = [];
            let Dt = 0;
            for (const Bt of St) {
                const kt = nt.createAccessorDef(Bt);
                kt.bufferView = b.bufferViews.length;
                const Ut = Bt.getArray()
                  , Ht = index_modern_BufferUtils.pad(index_modern_BufferUtils.toView(Ut));
                kt.byteOffset = Dt,
                Dt += Ht.byteLength,
                It.push(Ht),
                nt.accessorIndexMap.set(Bt, b.accessors.length),
                b.accessors.push(kt)
            }
            const Gt = {
                buffer: At,
                byteOffset: Et,
                byteLength: index_modern_BufferUtils.concat(It).byteLength
            };
            return Pt && (Gt.target = Pt),
            b.bufferViews.push(Gt),
            {
                buffers: It,
                byteLength: Dt
            }
        }
        function _t(St, At, Et) {
            const Pt = St[0].getCount();
            let It = 0;
            for (const Ut of St) {
                const Ht = nt.createAccessorDef(Ut);
                Ht.bufferView = b.bufferViews.length,
                Ht.byteOffset = It;
                const Kt = Ut.getElementSize()
                  , Jt = Ut.getComponentSize();
                It += index_modern_BufferUtils.padNumber(Kt * Jt),
                nt.accessorIndexMap.set(Ut, b.accessors.length),
                b.accessors.push(Ht)
            }
            const Dt = Pt * It
              , Gt = new ArrayBuffer(Dt)
              , Bt = new DataView(Gt);
            for (let Ut = 0; Ut < Pt; Ut++) {
                let Ht = 0;
                for (const Kt of St) {
                    const Jt = Kt.getElementSize()
                      , or = Kt.getComponentSize()
                      , ir = Kt.getComponentType()
                      , lr = Kt.getArray();
                    for (let ar = 0; ar < Jt; ar++) {
                        const hr = Ut * It + Ht + ar * or
                          , gr = lr[Ut * Jt + ar];
                        switch (ir) {
                        case index_modern_Accessor.ComponentType.FLOAT:
                            Bt.setFloat32(hr, gr, !0);
                            break;
                        case index_modern_Accessor.ComponentType.BYTE:
                            Bt.setInt8(hr, gr);
                            break;
                        case index_modern_Accessor.ComponentType.SHORT:
                            Bt.setInt16(hr, gr, !0);
                            break;
                        case index_modern_Accessor.ComponentType.UNSIGNED_BYTE:
                            Bt.setUint8(hr, gr);
                            break;
                        case index_modern_Accessor.ComponentType.UNSIGNED_SHORT:
                            Bt.setUint16(hr, gr, !0);
                            break;
                        case index_modern_Accessor.ComponentType.UNSIGNED_INT:
                            Bt.setUint32(hr, gr, !0);
                            break;
                        default:
                            throw new Error("Unexpected component type: " + ir)
                        }
                    }
                    Ht += index_modern_BufferUtils.padNumber(Jt * or)
                }
            }
            const kt = {
                buffer: At,
                byteOffset: Et,
                byteLength: Dt,
                byteStride: It,
                target: WriterContext.BufferViewTarget.ARRAY_BUFFER
            };
            return b.bufferViews.push(kt),
            {
                byteLength: Dt,
                buffers: [new Uint8Array(Gt)]
            }
        }
        function vt(St, At, Et) {
            const Pt = [];
            let It = 0;
            const Dt = new Map;
            let Gt = -1 / 0
              , Bt = !1;
            for (const ir of St) {
                const lr = nt.createAccessorDef(ir);
                b.accessors.push(lr),
                nt.accessorIndexMap.set(ir, b.accessors.length - 1);
                const ar = []
                  , hr = []
                  , gr = []
                  , dr = new Array(ir.getElementSize()).fill(0);
                for (let Rr = 0, Cr = ir.getCount(); Rr < Cr; Rr++)
                    if (ir.getElement(Rr, gr),
                    !index_modern_MathUtils.eq(gr, dr, 0)) {
                        Gt = Math.max(Rr, Gt),
                        ar.push(Rr);
                        for (let tr = 0; tr < gr.length; tr++)
                            hr.push(gr[tr])
                    }
                const cr = ar.length
                  , Ar = {
                    accessorDef: lr,
                    count: cr
                };
                if (Dt.set(ir, Ar),
                cr === 0)
                    continue;
                cr > ir.getCount() / 2 && (Bt = !0);
                const wr = index_modern_ComponentTypeToTypedArray[ir.getComponentType()];
                Ar.indices = ar,
                Ar.values = new wr(hr)
            }
            if (!Number.isFinite(Gt))
                return {
                    buffers: Pt,
                    byteLength: It
                };
            Bt && it.warn("Some sparse accessors have >50% non-zero elements, which may increase file size.");
            const kt = Gt < 255 ? Uint8Array : Gt < 65535 ? Uint16Array : Uint32Array
              , Ut = Gt < 255 ? UNSIGNED_BYTE : Gt < 65535 ? UNSIGNED_SHORT : UNSIGNED_INT
              , Ht = {
                buffer: At,
                byteOffset: Et + It,
                byteLength: 0
            };
            for (const ir of St) {
                const lr = Dt.get(ir);
                if (lr.count === 0)
                    continue;
                lr.indicesByteOffset = Ht.byteLength;
                const ar = index_modern_BufferUtils.pad(index_modern_BufferUtils.toView(new kt(lr.indices)));
                Pt.push(ar),
                It += ar.byteLength,
                Ht.byteLength += ar.byteLength
            }
            b.bufferViews.push(Ht);
            const Kt = b.bufferViews.length - 1
              , Jt = {
                buffer: At,
                byteOffset: Et + It,
                byteLength: 0
            };
            for (const ir of St) {
                const lr = Dt.get(ir);
                if (lr.count === 0)
                    continue;
                lr.valuesByteOffset = Jt.byteLength;
                const ar = index_modern_BufferUtils.pad(index_modern_BufferUtils.toView(lr.values));
                Pt.push(ar),
                It += ar.byteLength,
                Jt.byteLength += ar.byteLength
            }
            b.bufferViews.push(Jt);
            const or = b.bufferViews.length - 1;
            for (const ir of St) {
                const lr = Dt.get(ir);
                lr.count !== 0 && (lr.accessorDef.sparse = {
                    count: lr.count,
                    indices: {
                        bufferView: Kt,
                        byteOffset: lr.indicesByteOffset,
                        componentType: Ut
                    },
                    values: {
                        bufferView: or,
                        byteOffset: lr.valuesByteOffset
                    }
                })
            }
            return {
                buffers: Pt,
                byteLength: It
            }
        }
        if (b.accessors = [],
        b.bufferViews = [],
        b.samplers = [],
        b.textures = [],
        b.images = _.listTextures().map( (St, At) => {
            const Et = nt.createPropertyDef(St);
            St.getMimeType() && (Et.mimeType = St.getMimeType());
            const Pt = St.getImage();
            return Pt && nt.createImageData(Et, Pt, St),
            nt.imageIndexMap.set(St, At),
            Et
        }
        ),
        ut.filter(St => St.prewriteTypes.includes(index_modern_PropertyType.ACCESSOR)).forEach(St => St.prewrite(nt, index_modern_PropertyType.ACCESSOR)),
        _.listAccessors().forEach(St => {
            const At = nt.accessorUsageGroupedByParent
              , Et = nt.accessorParents;
            if (nt.accessorIndexMap.has(St))
                return;
            const Pt = nt.getAccessorUsage(St);
            if (nt.addAccessorToUsageGroup(St, Pt),
            At.has(Pt)) {
                const It = h.listParents(St).find(Dt => Dt.propertyType !== index_modern_PropertyType.ROOT);
                Et.set(St, It)
            }
        }
        ),
        ut.filter(St => St.prewriteTypes.includes(index_modern_PropertyType.BUFFER)).forEach(St => St.prewrite(nt, index_modern_PropertyType.BUFFER)),
        (_.listAccessors().length > 0 || nt.otherBufferViews.size > 0 || _.listTextures().length > 0 && c.format === Format.GLB) && _.listBuffers().length === 0)
            throw new Error("Buffer required for Document resources, but none was found.");
        b.buffers = [],
        _.listBuffers().forEach( (St, At) => {
            const Et = nt.createPropertyDef(St)
              , Pt = nt.accessorUsageGroupedByParent
              , It = St.listParents().filter(Jt => Jt instanceof index_modern_Accessor)
              , Dt = new Set(It.map(Jt => nt.accessorParents.get(Jt)))
              , Gt = new Map(Array.from(Dt).map( (Jt, or) => [Jt, or]))
              , Bt = {};
            for (const Jt of It) {
                var kt;
                if (nt.accessorIndexMap.has(Jt))
                    continue;
                const or = nt.getAccessorUsage(Jt);
                let ir = or;
                if (Pt.has(or)) {
                    const lr = nt.accessorParents.get(Jt);
                    ir += `:${Gt.get(lr)}`
                }
                Bt[kt = ir] || (Bt[kt] = {
                    usage: or,
                    accessors: []
                }),
                Bt[ir].accessors.push(Jt)
            }
            const Ut = []
              , Ht = b.buffers.length;
            let Kt = 0;
            for (const {usage: Jt, accessors: or} of Object.values(Bt))
                if (Jt === BufferViewUsage.ARRAY_BUFFER && c.vertexLayout === VertexLayout.INTERLEAVED) {
                    const ir = _t(or, Ht, Kt);
                    Kt += ir.byteLength;
                    for (const lr of ir.buffers)
                        Ut.push(lr)
                } else if (Jt === BufferViewUsage.ARRAY_BUFFER)
                    for (const ir of or) {
                        const lr = _t([ir], Ht, Kt);
                        Kt += lr.byteLength;
                        for (const ar of lr.buffers)
                            Ut.push(ar)
                    }
                else if (Jt === BufferViewUsage.SPARSE) {
                    const ir = vt(or, Ht, Kt);
                    Kt += ir.byteLength;
                    for (const lr of ir.buffers)
                        Ut.push(lr)
                } else if (Jt === BufferViewUsage.ELEMENT_ARRAY_BUFFER) {
                    const ir = ht(or, Ht, Kt, WriterContext.BufferViewTarget.ELEMENT_ARRAY_BUFFER);
                    Kt += ir.byteLength;
                    for (const lr of ir.buffers)
                        Ut.push(lr)
                } else {
                    const ir = ht(or, Ht, Kt);
                    Kt += ir.byteLength;
                    for (const lr of ir.buffers)
                        Ut.push(lr)
                }
            if (nt.imageBufferViews.length && At === 0) {
                for (let Jt = 0; Jt < nt.imageBufferViews.length; Jt++)
                    if (b.bufferViews[b.images[Jt].bufferView].byteOffset = Kt,
                    Kt += nt.imageBufferViews[Jt].byteLength,
                    Ut.push(nt.imageBufferViews[Jt]),
                    Kt % 8) {
                        const or = 8 - Kt % 8;
                        Kt += or,
                        Ut.push(new Uint8Array(or))
                    }
            }
            if (nt.otherBufferViews.has(St))
                for (const Jt of nt.otherBufferViews.get(St))
                    b.bufferViews.push({
                        buffer: Ht,
                        byteOffset: Kt,
                        byteLength: Jt.byteLength
                    }),
                    nt.otherBufferViewsIndexMap.set(Jt, b.bufferViews.length - 1),
                    Kt += Jt.byteLength,
                    Ut.push(Jt);
            if (Kt) {
                let Jt;
                c.format === Format.GLB ? Jt = GLB_BUFFER : (Jt = nt.bufferURIGenerator.createURI(St, "bin"),
                Et.uri = Jt),
                Et.byteLength = Kt,
                nt.assignResourceURI(Jt, index_modern_BufferUtils.concat(Ut), !0)
            }
            b.buffers.push(Et),
            nt.bufferIndexMap.set(St, At)
        }
        ),
        _.listAccessors().find(St => !St.getBuffer()) && it.warn("Skipped writing one or more Accessors: no Buffer assigned."),
        ut.filter(St => St.prewriteTypes.includes(index_modern_PropertyType.MATERIAL)).forEach(St => St.prewrite(nt, index_modern_PropertyType.MATERIAL)),
        b.materials = _.listMaterials().map( (St, At) => {
            const Et = nt.createPropertyDef(St);
            if (St.getAlphaMode() !== index_modern_Material.AlphaMode.OPAQUE && (Et.alphaMode = St.getAlphaMode()),
            St.getAlphaMode() === index_modern_Material.AlphaMode.MASK && (Et.alphaCutoff = St.getAlphaCutoff()),
            St.getDoubleSided() && (Et.doubleSided = !0),
            Et.pbrMetallicRoughness = {},
            index_modern_MathUtils.eq(St.getBaseColorFactor(), [1, 1, 1, 1]) || (Et.pbrMetallicRoughness.baseColorFactor = St.getBaseColorFactor()),
            index_modern_MathUtils.eq(St.getEmissiveFactor(), [0, 0, 0]) || (Et.emissiveFactor = St.getEmissiveFactor()),
            St.getRoughnessFactor() !== 1 && (Et.pbrMetallicRoughness.roughnessFactor = St.getRoughnessFactor()),
            St.getMetallicFactor() !== 1 && (Et.pbrMetallicRoughness.metallicFactor = St.getMetallicFactor()),
            St.getBaseColorTexture()) {
                const Pt = St.getBaseColorTexture()
                  , It = St.getBaseColorTextureInfo();
                Et.pbrMetallicRoughness.baseColorTexture = nt.createTextureInfoDef(Pt, It)
            }
            if (St.getEmissiveTexture()) {
                const Pt = St.getEmissiveTexture()
                  , It = St.getEmissiveTextureInfo();
                Et.emissiveTexture = nt.createTextureInfoDef(Pt, It)
            }
            if (St.getNormalTexture()) {
                const Pt = St.getNormalTexture()
                  , It = St.getNormalTextureInfo()
                  , Dt = nt.createTextureInfoDef(Pt, It);
                St.getNormalScale() !== 1 && (Dt.scale = St.getNormalScale()),
                Et.normalTexture = Dt
            }
            if (St.getOcclusionTexture()) {
                const Pt = St.getOcclusionTexture()
                  , It = St.getOcclusionTextureInfo()
                  , Dt = nt.createTextureInfoDef(Pt, It);
                St.getOcclusionStrength() !== 1 && (Dt.strength = St.getOcclusionStrength()),
                Et.occlusionTexture = Dt
            }
            if (St.getMetallicRoughnessTexture()) {
                const Pt = St.getMetallicRoughnessTexture()
                  , It = St.getMetallicRoughnessTextureInfo();
                Et.pbrMetallicRoughness.metallicRoughnessTexture = nt.createTextureInfoDef(Pt, It)
            }
            return nt.materialIndexMap.set(St, At),
            Et
        }
        ),
        ut.filter(St => St.prewriteTypes.includes(index_modern_PropertyType.MESH)).forEach(St => St.prewrite(nt, index_modern_PropertyType.MESH)),
        b.meshes = _.listMeshes().map( (St, At) => {
            const Et = nt.createPropertyDef(St);
            let Pt = null;
            return Et.primitives = St.listPrimitives().map(It => {
                const Dt = {
                    attributes: {}
                };
                Dt.mode = It.getMode();
                const Gt = It.getMaterial();
                Gt && (Dt.material = nt.materialIndexMap.get(Gt)),
                Object.keys(It.getExtras()).length && (Dt.extras = It.getExtras());
                const Bt = It.getIndices();
                Bt && (Dt.indices = nt.accessorIndexMap.get(Bt));
                for (const kt of It.listSemantics())
                    Dt.attributes[kt] = nt.accessorIndexMap.get(It.getAttribute(kt));
                for (const kt of It.listTargets()) {
                    const Ut = {};
                    for (const Ht of kt.listSemantics())
                        Ut[Ht] = nt.accessorIndexMap.get(kt.getAttribute(Ht));
                    Dt.targets = Dt.targets || [],
                    Dt.targets.push(Ut)
                }
                return It.listTargets().length && !Pt && (Pt = It.listTargets().map(kt => kt.getName())),
                Dt
            }
            ),
            St.getWeights().length && (Et.weights = St.getWeights()),
            Pt && (Et.extras = Et.extras || {},
            Et.extras.targetNames = Pt),
            nt.meshIndexMap.set(St, At),
            Et
        }
        ),
        b.cameras = _.listCameras().map( (St, At) => {
            const Et = nt.createPropertyDef(St);
            if (Et.type = St.getType(),
            Et.type === Camera.Type.PERSPECTIVE) {
                Et.perspective = {
                    znear: St.getZNear(),
                    zfar: St.getZFar(),
                    yfov: St.getYFov()
                };
                const Pt = St.getAspectRatio();
                Pt !== null && (Et.perspective.aspectRatio = Pt)
            } else
                Et.orthographic = {
                    znear: St.getZNear(),
                    zfar: St.getZFar(),
                    xmag: St.getXMag(),
                    ymag: St.getYMag()
                };
            return nt.cameraIndexMap.set(St, At),
            Et
        }
        ),
        b.nodes = _.listNodes().map( (St, At) => {
            const Et = nt.createPropertyDef(St);
            return index_modern_MathUtils.eq(St.getTranslation(), [0, 0, 0]) || (Et.translation = St.getTranslation()),
            index_modern_MathUtils.eq(St.getRotation(), [0, 0, 0, 1]) || (Et.rotation = St.getRotation()),
            index_modern_MathUtils.eq(St.getScale(), [1, 1, 1]) || (Et.scale = St.getScale()),
            St.getWeights().length && (Et.weights = St.getWeights()),
            nt.nodeIndexMap.set(St, At),
            Et
        }
        ),
        b.skins = _.listSkins().map( (St, At) => {
            const Et = nt.createPropertyDef(St)
              , Pt = St.getInverseBindMatrices();
            Pt && (Et.inverseBindMatrices = nt.accessorIndexMap.get(Pt));
            const It = St.getSkeleton();
            return It && (Et.skeleton = nt.nodeIndexMap.get(It)),
            Et.joints = St.listJoints().map(Dt => nt.nodeIndexMap.get(Dt)),
            nt.skinIndexMap.set(St, At),
            Et
        }
        ),
        _.listNodes().forEach( (St, At) => {
            const Et = b.nodes[At]
              , Pt = St.getMesh();
            Pt && (Et.mesh = nt.meshIndexMap.get(Pt));
            const It = St.getCamera();
            It && (Et.camera = nt.cameraIndexMap.get(It));
            const Dt = St.getSkin();
            Dt && (Et.skin = nt.skinIndexMap.get(Dt)),
            St.listChildren().length > 0 && (Et.children = St.listChildren().map(Gt => nt.nodeIndexMap.get(Gt)))
        }
        ),
        b.animations = _.listAnimations().map( (St, At) => {
            const Et = nt.createPropertyDef(St)
              , Pt = new Map;
            return Et.samplers = St.listSamplers().map( (It, Dt) => {
                const Gt = nt.createPropertyDef(It);
                return Gt.input = nt.accessorIndexMap.get(It.getInput()),
                Gt.output = nt.accessorIndexMap.get(It.getOutput()),
                Gt.interpolation = It.getInterpolation(),
                Pt.set(It, Dt),
                Gt
            }
            ),
            Et.channels = St.listChannels().map(It => {
                const Dt = nt.createPropertyDef(It);
                return Dt.sampler = Pt.get(It.getSampler()),
                Dt.target = {
                    node: nt.nodeIndexMap.get(It.getTargetNode()),
                    path: It.getTargetPath()
                },
                Dt
            }
            ),
            nt.animationIndexMap.set(St, At),
            Et
        }
        ),
        b.scenes = _.listScenes().map( (St, At) => {
            const Et = nt.createPropertyDef(St);
            return Et.nodes = St.listChildren().map(Pt => nt.nodeIndexMap.get(Pt)),
            nt.sceneIndexMap.set(St, At),
            Et
        }
        );
        const bt = _.getDefaultScene();
        return bt && (b.scene = _.listScenes().indexOf(bt)),
        b.extensionsUsed = ut.map(St => St.extensionName),
        b.extensionsRequired = pt.map(St => St.extensionName),
        ut.forEach(St => St.write(nt)),
        index_modern_clean(b),
        _e
    }
}

export default ht;
