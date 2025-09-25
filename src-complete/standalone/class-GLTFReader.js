/* Standalone Class: GLTFReader */

class GLTFReader {
    static read(o, c=index_modern_DEFAULT_OPTIONS) {
        const h = index_modern_extends({}, index_modern_DEFAULT_OPTIONS, c)
          , {json: _} = o
          , b = new index_modern_Document().setLogger(h.logger);
        this.validate(o, h);
        const _e = new ReaderContext(o)
          , nt = _.asset
          , it = b.getRoot().getAsset();
        nt.copyright && (it.copyright = nt.copyright),
        nt.extras && (it.extras = nt.extras),
        _.extras !== void 0 && b.getRoot().setExtras(index_modern_extends({}, _.extras));
        const at = _.extensionsUsed || []
          , ut = _.extensionsRequired || [];
        h.extensions.sort( (Bt, kt) => Bt.EXTENSION_NAME > kt.EXTENSION_NAME ? 1 : -1);
        for (const Bt of h.extensions)
            if (at.includes(Bt.EXTENSION_NAME)) {
                const kt = b.createExtension(Bt).setRequired(ut.includes(Bt.EXTENSION_NAME))
                  , Ut = kt.prereadTypes.filter(Ht => !SUPPORTED_PREREAD_TYPES.has(Ht));
                Ut.length && h.logger.warn(`Preread hooks for some types (${Ut.join()}), requested by extension ${kt.extensionName}, are unsupported. Please file an issue or a PR.`);
                for (const Ht of kt.readDependencies)
                    kt.install(Ht, h.dependencies[Ht])
            }
        const pt = _.buffers || [];
        b.getRoot().listExtensionsUsed().filter(Bt => Bt.prereadTypes.includes(index_modern_PropertyType.BUFFER)).forEach(Bt => Bt.preread(_e, index_modern_PropertyType.BUFFER)),
        _e.buffers = pt.map(Bt => {
            const kt = b.createBuffer(Bt.name);
            return Bt.extras && kt.setExtras(Bt.extras),
            Bt.uri && Bt.uri.indexOf("__") !== 0 && kt.setURI(Bt.uri),
            kt
        }
        );
        const ht = _.bufferViews || [];
        _e.bufferViewBuffers = ht.map( (Bt, kt) => {
            if (!_e.bufferViews[kt]) {
                const Ut = o.json.buffers[Bt.buffer]
                  , Ht = Ut.uri ? o.resources[Ut.uri] : o.resources[GLB_BUFFER]
                  , Kt = Bt.byteOffset || 0;
                _e.bufferViews[kt] = index_modern_BufferUtils.toView(Ht, Kt, Bt.byteLength)
            }
            return _e.buffers[Bt.buffer]
        }
        );
        const _t = _.accessors || [];
        _e.accessors = _t.map(Bt => {
            const kt = _e.bufferViewBuffers[Bt.bufferView]
              , Ut = b.createAccessor(Bt.name, kt).setType(Bt.type);
            return Bt.extras && Ut.setExtras(Bt.extras),
            Bt.normalized !== void 0 && Ut.setNormalized(Bt.normalized),
            Bt.bufferView === void 0 || Ut.setArray(getAccessorArray(Bt, _e)),
            Ut
        }
        );
        const vt = _.images || []
          , bt = _.textures || [];
        b.getRoot().listExtensionsUsed().filter(Bt => Bt.prereadTypes.includes(index_modern_PropertyType.TEXTURE)).forEach(Bt => Bt.preread(_e, index_modern_PropertyType.TEXTURE)),
        _e.textures = vt.map(Bt => {
            const kt = b.createTexture(Bt.name);
            if (Bt.extras && kt.setExtras(Bt.extras),
            Bt.bufferView !== void 0) {
                const Ut = _.bufferViews[Bt.bufferView]
                  , Ht = o.json.buffers[Ut.buffer]
                  , Kt = Ht.uri ? o.resources[Ht.uri] : o.resources[GLB_BUFFER]
                  , Jt = Ut.byteOffset || 0
                  , or = Ut.byteLength
                  , ir = Kt.slice(Jt, Jt + or);
                kt.setImage(ir)
            } else
                Bt.uri !== void 0 && (kt.setImage(o.resources[Bt.uri]),
                Bt.uri.indexOf("__") !== 0 && kt.setURI(Bt.uri));
            if (Bt.mimeType !== void 0)
                kt.setMimeType(Bt.mimeType);
            else if (Bt.uri) {
                const Ut = index_modern_FileUtils.extension(Bt.uri);
                kt.setMimeType(index_modern_ImageUtils.extensionToMimeType(Ut))
            }
            return kt
        }
        ),
        b.getRoot().listExtensionsUsed().filter(Bt => Bt.prereadTypes.includes(index_modern_PropertyType.MATERIAL)).forEach(Bt => Bt.preread(_e, index_modern_PropertyType.MATERIAL));
        const St = _.materials || [];
        _e.materials = St.map(Bt => {
            const kt = b.createMaterial(Bt.name);
            Bt.extras && kt.setExtras(Bt.extras),
            Bt.alphaMode !== void 0 && kt.setAlphaMode(Bt.alphaMode),
            Bt.alphaCutoff !== void 0 && kt.setAlphaCutoff(Bt.alphaCutoff),
            Bt.doubleSided !== void 0 && kt.setDoubleSided(Bt.doubleSided);
            const Ut = Bt.pbrMetallicRoughness || {};
            if (Ut.baseColorFactor !== void 0 && kt.setBaseColorFactor(Ut.baseColorFactor),
            Bt.emissiveFactor !== void 0 && kt.setEmissiveFactor(Bt.emissiveFactor),
            Ut.metallicFactor !== void 0 && kt.setMetallicFactor(Ut.metallicFactor),
            Ut.roughnessFactor !== void 0 && kt.setRoughnessFactor(Ut.roughnessFactor),
            Ut.baseColorTexture !== void 0) {
                const Ht = Ut.baseColorTexture
                  , Kt = _e.textures[bt[Ht.index].source];
                kt.setBaseColorTexture(Kt),
                _e.setTextureInfo(kt.getBaseColorTextureInfo(), Ht)
            }
            if (Bt.emissiveTexture !== void 0) {
                const Ht = Bt.emissiveTexture
                  , Kt = _e.textures[bt[Ht.index].source];
                kt.setEmissiveTexture(Kt),
                _e.setTextureInfo(kt.getEmissiveTextureInfo(), Ht)
            }
            if (Bt.normalTexture !== void 0) {
                const Ht = Bt.normalTexture
                  , Kt = _e.textures[bt[Ht.index].source];
                kt.setNormalTexture(Kt),
                _e.setTextureInfo(kt.getNormalTextureInfo(), Ht),
                Bt.normalTexture.scale !== void 0 && kt.setNormalScale(Bt.normalTexture.scale)
            }
            if (Bt.occlusionTexture !== void 0) {
                const Ht = Bt.occlusionTexture
                  , Kt = _e.textures[bt[Ht.index].source];
                kt.setOcclusionTexture(Kt),
                _e.setTextureInfo(kt.getOcclusionTextureInfo(), Ht),
                Bt.occlusionTexture.strength !== void 0 && kt.setOcclusionStrength(Bt.occlusionTexture.strength)
            }
            if (Ut.metallicRoughnessTexture !== void 0) {
                const Ht = Ut.metallicRoughnessTexture
                  , Kt = _e.textures[bt[Ht.index].source];
                kt.setMetallicRoughnessTexture(Kt),
                _e.setTextureInfo(kt.getMetallicRoughnessTextureInfo(), Ht)
            }
            return kt
        }
        ),
        b.getRoot().listExtensionsUsed().filter(Bt => Bt.prereadTypes.includes(index_modern_PropertyType.MESH)).forEach(Bt => Bt.preread(_e, index_modern_PropertyType.MESH));
        const At = _.meshes || [];
        b.getRoot().listExtensionsUsed().filter(Bt => Bt.prereadTypes.includes(index_modern_PropertyType.PRIMITIVE)).forEach(Bt => Bt.preread(_e, index_modern_PropertyType.PRIMITIVE)),
        _e.meshes = At.map(Bt => {
            const kt = b.createMesh(Bt.name);
            return Bt.extras && kt.setExtras(Bt.extras),
            Bt.weights !== void 0 && kt.setWeights(Bt.weights),
            (Bt.primitives || []).forEach(Ut => {
                const Ht = b.createPrimitive();
                Ut.extras && Ht.setExtras(Ut.extras),
                Ut.material !== void 0 && Ht.setMaterial(_e.materials[Ut.material]),
                Ut.mode !== void 0 && Ht.setMode(Ut.mode);
                for (const [Jt,or] of Object.entries(Ut.attributes || {}))
                    Ht.setAttribute(Jt, _e.accessors[or]);
                Ut.indices !== void 0 && Ht.setIndices(_e.accessors[Ut.indices]);
                const Kt = Bt.extras && Bt.extras.targetNames || [];
                (Ut.targets || []).forEach( (Jt, or) => {
                    const ir = Kt[or] || or.toString()
                      , lr = b.createPrimitiveTarget(ir);
                    for (const [ar,hr] of Object.entries(Jt))
                        lr.setAttribute(ar, _e.accessors[hr]);
                    Ht.addTarget(lr)
                }
                ),
                kt.addPrimitive(Ht)
            }
            ),
            kt
        }
        );
        const Et = _.cameras || [];
        _e.cameras = Et.map(Bt => {
            const kt = b.createCamera(Bt.name).setType(Bt.type);
            if (Bt.extras && kt.setExtras(Bt.extras),
            Bt.type === Camera.Type.PERSPECTIVE) {
                const Ut = Bt.perspective;
                kt.setYFov(Ut.yfov),
                kt.setZNear(Ut.znear),
                Ut.zfar !== void 0 && kt.setZFar(Ut.zfar),
                Ut.aspectRatio !== void 0 && kt.setAspectRatio(Ut.aspectRatio)
            } else {
                const Ut = Bt.orthographic;
                kt.setZNear(Ut.znear).setZFar(Ut.zfar).setXMag(Ut.xmag).setYMag(Ut.ymag)
            }
            return kt
        }
        );
        const Pt = _.nodes || [];
        b.getRoot().listExtensionsUsed().filter(Bt => Bt.prereadTypes.includes(index_modern_PropertyType.NODE)).forEach(Bt => Bt.preread(_e, index_modern_PropertyType.NODE)),
        _e.nodes = Pt.map(Bt => {
            const kt = b.createNode(Bt.name);
            if (Bt.extras && kt.setExtras(Bt.extras),
            Bt.translation !== void 0 && kt.setTranslation(Bt.translation),
            Bt.rotation !== void 0 && kt.setRotation(Bt.rotation),
            Bt.scale !== void 0 && kt.setScale(Bt.scale),
            Bt.matrix !== void 0) {
                const Ut = [0, 0, 0]
                  , Ht = [0, 0, 0, 1]
                  , Kt = [1, 1, 1];
                index_modern_MathUtils.decompose(Bt.matrix, Ut, Ht, Kt),
                kt.setTranslation(Ut),
                kt.setRotation(Ht),
                kt.setScale(Kt)
            }
            return Bt.weights !== void 0 && kt.setWeights(Bt.weights),
            kt
        }
        );
        const It = _.skins || [];
        _e.skins = It.map(Bt => {
            const kt = b.createSkin(Bt.name);
            Bt.extras && kt.setExtras(Bt.extras),
            Bt.inverseBindMatrices !== void 0 && kt.setInverseBindMatrices(_e.accessors[Bt.inverseBindMatrices]),
            Bt.skeleton !== void 0 && kt.setSkeleton(_e.nodes[Bt.skeleton]);
            for (const Ut of Bt.joints)
                kt.addJoint(_e.nodes[Ut]);
            return kt
        }
        ),
        Pt.map( (Bt, kt) => {
            const Ut = _e.nodes[kt];
            (Bt.children || []).forEach(Ht => Ut.addChild(_e.nodes[Ht])),
            Bt.mesh !== void 0 && Ut.setMesh(_e.meshes[Bt.mesh]),
            Bt.camera !== void 0 && Ut.setCamera(_e.cameras[Bt.camera]),
            Bt.skin !== void 0 && Ut.setSkin(_e.skins[Bt.skin])
        }
        );
        const Dt = _.animations || [];
        _e.animations = Dt.map(Bt => {
            const kt = b.createAnimation(Bt.name);
            Bt.extras && kt.setExtras(Bt.extras);
            const Ut = (Bt.samplers || []).map(Ht => {
                const Kt = b.createAnimationSampler().setInput(_e.accessors[Ht.input]).setOutput(_e.accessors[Ht.output]).setInterpolation(Ht.interpolation || index_modern_AnimationSampler.Interpolation.LINEAR);
                return Ht.extras && Kt.setExtras(Ht.extras),
                kt.addSampler(Kt),
                Kt
            }
            );
            return (Bt.channels || []).forEach(Ht => {
                const Kt = b.createAnimationChannel().setSampler(Ut[Ht.sampler]).setTargetPath(Ht.target.path);
                Ht.target.node !== void 0 && Kt.setTargetNode(_e.nodes[Ht.target.node]),
                Ht.extras && Kt.setExtras(Ht.extras),
                kt.addChannel(Kt)
            }
            ),
            kt
        }
        );
        const Gt = _.scenes || [];
        return b.getRoot().listExtensionsUsed().filter(Bt => Bt.prereadTypes.includes(index_modern_PropertyType.SCENE)).forEach(Bt => Bt.preread(_e, index_modern_PropertyType.SCENE)),
        _e.scenes = Gt.map(Bt => {
            const kt = b.createScene(Bt.name);
            return Bt.extras && kt.setExtras(Bt.extras),
            (Bt.nodes || []).map(Ut => _e.nodes[Ut]).forEach(Ut => kt.addChild(Ut)),
            kt
        }
        ),
        _.scene !== void 0 && b.getRoot().setDefaultScene(_e.scenes[_.scene]),
        b.getRoot().listExtensionsUsed().forEach(Bt => Bt.read(_e)),
        _t.forEach( (Bt, kt) => {
            const Ut = _e.accessors[kt]
              , Ht = !!Bt.sparse
              , Kt = !Bt.bufferView && !Ut.getArray();
            (Ht || Kt) && Ut.setSparse(!0).setArray(getSparseArray(Bt, _e))
        }
        ),
        b
    }
    static validate(o, c) {
        const h = o.json;
        if (h.asset.version !== "2.0")
            throw new Error(`Unsupported glTF version, "${h.asset.version}".`);
        if (h.extensionsRequired) {
            for (const _ of h.extensionsRequired)
                if (!c.extensions.find(b => b.EXTENSION_NAME === _))
                    throw new Error(`Missing required extension, "${_}".`)
        }
        if (h.extensionsUsed)
            for (const _ of h.extensionsUsed)
                c.extensions.find(b => b.EXTENSION_NAME === _) || c.logger.warn(`Missing optional extension, "${_}".`)
    }
}

export default GLTFReader;
