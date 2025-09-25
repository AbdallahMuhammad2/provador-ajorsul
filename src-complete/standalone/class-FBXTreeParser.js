/* Standalone Class: FBXTreeParser */

class FBXTreeParser {
    constructor(o, c) {
        this.textureLoader = o,
        this.manager = c
    }
    parse() {
        connections = this.parseConnections();
        const o = this.parseImages()
          , c = this.parseTextures(o)
          , h = this.parseMaterials(c)
          , _ = this.parseDeformers()
          , b = new GeometryParser().parse(_);
        return this.parseScene(_, b, h),
        sceneGraph
    }
    parseConnections() {
        const o = new Map;
        return "Connections"in fbxTree && fbxTree.Connections.connections.forEach(function(c) {
            const h = c[0]
              , _ = c[1]
              , b = c[2];
            o.has(h) || o.set(h, {
                parents: [],
                children: []
            });
            const _e = {
                ID: _,
                relationship: b
            };
            o.get(h).parents.push(_e),
            o.has(_) || o.set(_, {
                parents: [],
                children: []
            });
            const nt = {
                ID: h,
                relationship: b
            };
            o.get(_).children.push(nt)
        }),
        o
    }
    parseImages() {
        const o = {}
          , c = {};
        if ("Video"in fbxTree.Objects) {
            const h = fbxTree.Objects.Video;
            for (const _ in h) {
                const b = h[_];
                if (o[parseInt(_)] = b.RelativeFilename || b.Filename,
                "Content"in b) {
                    const _e = b.Content instanceof ArrayBuffer && b.Content.byteLength > 0
                      , nt = typeof b.Content == "string" && b.Content !== "";
                    if (_e || nt) {
                        const it = this.parseImage(h[_]);
                        c[b.RelativeFilename || b.Filename] = it
                    }
                }
            }
        }
        for (const h in o) {
            const _ = o[h];
            c[_] !== void 0 ? o[h] = c[_] : o[h] = o[h].split("\\").pop()
        }
        return o
    }
    parseImage(o) {
        const c = o.Content
          , h = o.RelativeFilename || o.Filename
          , _ = h.slice(h.lastIndexOf(".") + 1).toLowerCase();
        let b;
        switch (_) {
        case "bmp":
            b = "image/bmp";
            break;
        case "jpg":
        case "jpeg":
            b = "image/jpeg";
            break;
        case "png":
            b = "image/png";
            break;
        case "tif":
            b = "image/tiff";
            break;
        case "tga":
            this.manager.getHandler(".tga") === null && console.warn("FBXLoader: TGA loader not found, skipping ", h),
            b = "image/tga";
            break;
        default:
            return void console.warn('FBXLoader: Image type "' + _ + '" is not supported.')
        }
        if (typeof c == "string")
            return "data:" + b + ";base64," + c;
        {
            const _e = new Uint8Array(c);
            return window.URL.createObjectURL(new Blob([_e],{
                type: b
            }))
        }
    }
    parseTextures(o) {
        const c = new Map;
        if ("Texture"in fbxTree.Objects) {
            const h = fbxTree.Objects.Texture;
            for (const _ in h) {
                const b = this.parseTexture(h[_], o);
                c.set(parseInt(_), b)
            }
        }
        return c
    }
    parseTexture(o, c) {
        const h = this.loadTexture(o, c);
        h.ID = o.id,
        h.name = o.attrName;
        const _ = o.WrapModeU
          , b = o.WrapModeV
          , _e = _ !== void 0 ? _.value : 0
          , nt = b !== void 0 ? b.value : 0;
        if (h.wrapS = _e === 0 ? three_module.GJx : three_module.ghU,
        h.wrapT = nt === 0 ? three_module.GJx : three_module.ghU,
        "Scaling"in o) {
            const it = o.Scaling.value;
            h.repeat.x = it[0],
            h.repeat.y = it[1]
        }
        if ("Translation"in o) {
            const it = o.Translation.value;
            h.offset.x = it[0],
            h.offset.y = it[1]
        }
        return h
    }
    loadTexture(o, c) {
        let h;
        const _ = this.textureLoader.path
          , b = connections.get(o.id).children;
        let _e;
        b !== void 0 && b.length > 0 && c[b[0].ID] !== void 0 && (h = c[b[0].ID],
        h.indexOf("blob:") !== 0 && h.indexOf("data:") !== 0 || this.textureLoader.setPath(void 0));
        const nt = o.FileName.slice(-3).toLowerCase();
        if (nt === "tga") {
            const it = this.manager.getHandler(".tga");
            it === null ? (console.warn("FBXLoader: TGA loader not found, creating placeholder texture for", o.RelativeFilename),
            _e = new three_module.gPd) : (it.setPath(this.textureLoader.path),
            _e = it.load(h))
        } else
            nt === "psd" ? (console.warn("FBXLoader: PSD textures are not supported, creating placeholder texture for", o.RelativeFilename),
            _e = new three_module.gPd) : _e = this.textureLoader.load(h);
        return this.textureLoader.setPath(_),
        _e
    }
    parseMaterials(o) {
        const c = new Map;
        if ("Material"in fbxTree.Objects) {
            const h = fbxTree.Objects.Material;
            for (const _ in h) {
                const b = this.parseMaterial(h[_], o);
                b !== null && c.set(parseInt(_), b)
            }
        }
        return c
    }
    parseMaterial(o, c) {
        const h = o.id
          , _ = o.attrName;
        let b = o.ShadingModel;
        if (typeof b == "object" && (b = b.value),
        !connections.has(h))
            return null;
        const _e = this.parseParameters(o, c, h);
        let nt;
        switch (b.toLowerCase()) {
        case "phong":
            nt = new three_module.tXL;
            break;
        case "lambert":
            nt = new three_module.G_z;
            break;
        default:
            console.warn('THREE.FBXLoader: unknown material type "%s". Defaulting to MeshPhongMaterial.', b),
            nt = new three_module.tXL
        }
        return nt.setValues(_e),
        nt.name = _,
        nt
    }
    parseParameters(o, c, h) {
        const _ = {};
        o.BumpFactor && (_.bumpScale = o.BumpFactor.value),
        o.Diffuse ? _.color = new three_module.Q1f().fromArray(o.Diffuse.value).convertSRGBToLinear() : !o.DiffuseColor || o.DiffuseColor.type !== "Color" && o.DiffuseColor.type !== "ColorRGB" || (_.color = new three_module.Q1f().fromArray(o.DiffuseColor.value).convertSRGBToLinear()),
        o.DisplacementFactor && (_.displacementScale = o.DisplacementFactor.value),
        o.Emissive ? _.emissive = new three_module.Q1f().fromArray(o.Emissive.value).convertSRGBToLinear() : !o.EmissiveColor || o.EmissiveColor.type !== "Color" && o.EmissiveColor.type !== "ColorRGB" || (_.emissive = new three_module.Q1f().fromArray(o.EmissiveColor.value).convertSRGBToLinear()),
        o.EmissiveFactor && (_.emissiveIntensity = parseFloat(o.EmissiveFactor.value)),
        o.Opacity && (_.opacity = parseFloat(o.Opacity.value)),
        _.opacity < 1 && (_.transparent = !0),
        o.ReflectionFactor && (_.reflectivity = o.ReflectionFactor.value),
        o.Shininess && (_.shininess = o.Shininess.value),
        o.Specular ? _.specular = new three_module.Q1f().fromArray(o.Specular.value).convertSRGBToLinear() : o.SpecularColor && o.SpecularColor.type === "Color" && (_.specular = new three_module.Q1f().fromArray(o.SpecularColor.value).convertSRGBToLinear());
        const b = this;
        return connections.get(h).children.forEach(function(_e) {
            const nt = _e.relationship;
            switch (nt) {
            case "Bump":
                _.bumpMap = b.getTexture(c, _e.ID);
                break;
            case "Maya|TEX_ao_map":
                _.aoMap = b.getTexture(c, _e.ID);
                break;
            case "DiffuseColor":
            case "Maya|TEX_color_map":
                _.map = b.getTexture(c, _e.ID),
                _.map !== void 0 && (_.map.colorSpace = three_module.er$);
                break;
            case "DisplacementColor":
                _.displacementMap = b.getTexture(c, _e.ID);
                break;
            case "EmissiveColor":
                _.emissiveMap = b.getTexture(c, _e.ID),
                _.emissiveMap !== void 0 && (_.emissiveMap.colorSpace = three_module.er$);
                break;
            case "NormalMap":
            case "Maya|TEX_normal_map":
                _.normalMap = b.getTexture(c, _e.ID);
                break;
            case "ReflectionColor":
                _.envMap = b.getTexture(c, _e.ID),
                _.envMap !== void 0 && (_.envMap.mapping = three_module.wfO,
                _.envMap.colorSpace = three_module.er$);
                break;
            case "SpecularColor":
                _.specularMap = b.getTexture(c, _e.ID),
                _.specularMap !== void 0 && (_.specularMap.colorSpace = three_module.er$);
                break;
            case "TransparentColor":
            case "TransparencyFactor":
                _.alphaMap = b.getTexture(c, _e.ID),
                _.transparent = !0;
                break;
            default:
                console.warn("THREE.FBXLoader: %s map is not supported in three.js, skipping texture.", nt)
            }
        }),
        _
    }
    getTexture(o, c) {
        return "LayeredTexture"in fbxTree.Objects && c in fbxTree.Objects.LayeredTexture && (console.warn("THREE.FBXLoader: layered textures are not supported in three.js. Discarding all but first layer."),
        c = connections.get(c).children[0].ID),
        o.get(c)
    }
    parseDeformers() {
        const o = {}
          , c = {};
        if ("Deformer"in fbxTree.Objects) {
            const h = fbxTree.Objects.Deformer;
            for (const _ in h) {
                const b = h[_]
                  , _e = connections.get(parseInt(_));
                if (b.attrType === "Skin") {
                    const nt = this.parseSkeleton(_e, h);
                    nt.ID = _,
                    _e.parents.length > 1 && console.warn("THREE.FBXLoader: skeleton attached to more than one geometry is not supported."),
                    nt.geometryID = _e.parents[0].ID,
                    o[_] = nt
                } else if (b.attrType === "BlendShape") {
                    const nt = {
                        id: _
                    };
                    nt.rawTargets = this.parseMorphTargets(_e, h),
                    nt.id = _,
                    _e.parents.length > 1 && console.warn("THREE.FBXLoader: morph target attached to more than one geometry is not supported."),
                    c[_] = nt
                }
            }
        }
        return {
            skeletons: o,
            morphTargets: c
        }
    }
    parseSkeleton(o, c) {
        const h = [];
        return o.children.forEach(function(_) {
            const b = c[_.ID];
            if (b.attrType !== "Cluster")
                return;
            const _e = {
                ID: _.ID,
                indices: [],
                weights: [],
                transformLink: new three_module.kn4().fromArray(b.TransformLink.a)
            };
            "Indexes"in b && (_e.indices = b.Indexes.a,
            _e.weights = b.Weights.a),
            h.push(_e)
        }),
        {
            rawBones: h,
            bones: []
        }
    }
    parseMorphTargets(o, c) {
        const h = [];
        for (let _ = 0; _ < o.children.length; _++) {
            const b = o.children[_]
              , _e = c[b.ID]
              , nt = {
                name: _e.attrName,
                initialWeight: _e.DeformPercent,
                id: _e.id,
                fullWeights: _e.FullWeights.a
            };
            if (_e.attrType !== "BlendShapeChannel")
                return;
            nt.geoID = connections.get(parseInt(b.ID)).children.filter(function(it) {
                return it.relationship === void 0
            })[0].ID,
            h.push(nt)
        }
        return h
    }
    parseScene(o, c, h) {
        sceneGraph = new three_module.YJl;
        const _ = this.parseModels(o.skeletons, c, h)
          , b = fbxTree.Objects.Model
          , _e = this;
        _.forEach(function(it) {
            const at = b[it.ID];
            _e.setLookAtProperties(it, at),
            connections.get(it.ID).parents.forEach(function(ut) {
                const pt = _.get(ut.ID);
                pt !== void 0 && pt.add(it)
            }),
            it.parent === null && sceneGraph.add(it)
        }),
        this.bindSkeleton(o.skeletons, c, _),
        this.createAmbientLight(),
        sceneGraph.traverse(function(it) {
            if (it.userData.transformData) {
                it.parent && (it.userData.transformData.parentMatrix = it.parent.matrix,
                it.userData.transformData.parentMatrixWorld = it.parent.matrixWorld);
                const at = generateTransform(it.userData.transformData);
                it.applyMatrix4(at),
                it.updateWorldMatrix()
            }
        });
        const nt = new AnimationParser().parse();
        sceneGraph.children.length === 1 && sceneGraph.children[0].isGroup && (sceneGraph.children[0].animations = nt,
        sceneGraph = sceneGraph.children[0]),
        sceneGraph.animations = nt
    }
    parseModels(o, c, h) {
        const _ = new Map
          , b = fbxTree.Objects.Model;
        for (const _e in b) {
            const nt = parseInt(_e)
              , it = b[_e]
              , at = connections.get(nt);
            let ut = this.buildSkeleton(at, o, nt, it.attrName);
            if (!ut) {
                switch (it.attrType) {
                case "Camera":
                    ut = this.createCamera(at);
                    break;
                case "Light":
                    ut = this.createLight(at);
                    break;
                case "Mesh":
                    ut = this.createMesh(at, c, h);
                    break;
                case "NurbsCurve":
                    ut = this.createCurve(at, c);
                    break;
                case "LimbNode":
                case "Root":
                    ut = new three_module.$Kf;
                    break;
                default:
                    ut = new three_module.YJl
                }
                ut.name = it.attrName ? three_module.Nwf.sanitizeNodeName(it.attrName) : "",
                ut.userData.originalName = it.attrName,
                ut.ID = nt
            }
            this.getTransformData(ut, it),
            _.set(nt, ut)
        }
        return _
    }
    buildSkeleton(o, c, h, _) {
        let b = null;
        return o.parents.forEach(function(_e) {
            for (const nt in c) {
                const it = c[nt];
                it.rawBones.forEach(function(at, ut) {
                    if (at.ID === _e.ID) {
                        const pt = b;
                        b = new three_module.$Kf,
                        b.matrixWorld.copy(at.transformLink),
                        b.name = _ ? three_module.Nwf.sanitizeNodeName(_) : "",
                        b.userData.originalName = _,
                        b.ID = h,
                        it.bones[ut] = b,
                        pt !== null && b.add(pt)
                    }
                })
            }
        }),
        b
    }
    createCamera(o) {
        let c, h;
        if (o.children.forEach(function(_) {
            const b = fbxTree.Objects.NodeAttribute[_.ID];
            b !== void 0 && (h = b)
        }),
        h === void 0)
            c = new three_module.B69;
        else {
            let _ = 0;
            h.CameraProjectionType !== void 0 && h.CameraProjectionType.value === 1 && (_ = 1);
            let b = 1;
            h.NearPlane !== void 0 && (b = h.NearPlane.value / 1e3);
            let _e = 1e3;
            h.FarPlane !== void 0 && (_e = h.FarPlane.value / 1e3);
            let nt = window.innerWidth
              , it = window.innerHeight;
            h.AspectWidth !== void 0 && h.AspectHeight !== void 0 && (nt = h.AspectWidth.value,
            it = h.AspectHeight.value);
            const at = nt / it;
            let ut = 45;
            h.FieldOfView !== void 0 && (ut = h.FieldOfView.value);
            const pt = h.FocalLength ? h.FocalLength.value : null;
            switch (_) {
            case 0:
                c = new three_module.ubm(ut,at,b,_e),
                pt !== null && c.setFocalLength(pt);
                break;
            case 1:
                c = new three_module.qUd(-nt / 2,nt / 2,it / 2,-it / 2,b,_e);
                break;
            default:
                console.warn("THREE.FBXLoader: Unknown camera type " + _ + "."),
                c = new three_module.B69
            }
        }
        return c
    }
    createLight(o) {
        let c, h;
        if (o.children.forEach(function(_) {
            const b = fbxTree.Objects.NodeAttribute[_.ID];
            b !== void 0 && (h = b)
        }),
        h === void 0)
            c = new three_module.B69;
        else {
            let _;
            _ = h.LightType === void 0 ? 0 : h.LightType.value;
            let b = 16777215;
            h.Color !== void 0 && (b = new three_module.Q1f().fromArray(h.Color.value).convertSRGBToLinear());
            let _e = h.Intensity === void 0 ? 1 : h.Intensity.value / 100;
            h.CastLightOnObject !== void 0 && h.CastLightOnObject.value === 0 && (_e = 0);
            let nt = 0;
            h.FarAttenuationEnd !== void 0 && (nt = h.EnableFarAttenuation !== void 0 && h.EnableFarAttenuation.value === 0 ? 0 : h.FarAttenuationEnd.value);
            const it = 1;
            switch (_) {
            case 0:
                c = new three_module.HiM(b,_e,nt,it);
                break;
            case 1:
                c = new three_module.ZyN(b,_e);
                break;
            case 2:
                let at = Math.PI / 3;
                h.InnerAngle !== void 0 && (at = three_module.cj9.degToRad(h.InnerAngle.value));
                let ut = 0;
                h.OuterAngle !== void 0 && (ut = three_module.cj9.degToRad(h.OuterAngle.value),
                ut = Math.max(ut, 1)),
                c = new three_module.nCl(b,_e,nt,at,ut,it);
                break;
            default:
                console.warn("THREE.FBXLoader: Unknown light type " + h.LightType.value + ", defaulting to a PointLight."),
                c = new three_module.HiM(b,_e)
            }
            h.CastShadows !== void 0 && h.CastShadows.value === 1 && (c.castShadow = !0)
        }
        return c
    }
    createMesh(o, c, h) {
        let _, b = null, _e = null;
        const nt = [];
        return o.children.forEach(function(it) {
            c.has(it.ID) && (b = c.get(it.ID)),
            h.has(it.ID) && nt.push(h.get(it.ID))
        }),
        nt.length > 1 ? _e = nt : nt.length > 0 ? _e = nt[0] : (_e = new three_module.tXL({
            name: three_module.aHM.DEFAULT_MATERIAL_NAME,
            color: 13421772
        }),
        nt.push(_e)),
        "color"in b.attributes && nt.forEach(function(it) {
            it.vertexColors = !0
        }),
        b.FBX_Deformer ? (_ = new three_module.I46(b,_e),
        _.normalizeSkinWeights()) : _ = new three_module.eaF(b,_e),
        _
    }
    createCurve(o, c) {
        const h = o.children.reduce(function(b, _e) {
            return c.has(_e.ID) && (b = c.get(_e.ID)),
            b
        }, null)
          , _ = new three_module.mrM({
            name: three_module.aHM.DEFAULT_MATERIAL_NAME,
            color: 3342591,
            linewidth: 1
        });
        return new three_module.N1A(h,_)
    }
    getTransformData(o, c) {
        const h = {};
        "InheritType"in c && (h.inheritType = parseInt(c.InheritType.value)),
        h.eulerOrder = "RotationOrder"in c ? getEulerOrder(c.RotationOrder.value) : "ZYX",
        "Lcl_Translation"in c && (h.translation = c.Lcl_Translation.value),
        "PreRotation"in c && (h.preRotation = c.PreRotation.value),
        "Lcl_Rotation"in c && (h.rotation = c.Lcl_Rotation.value),
        "PostRotation"in c && (h.postRotation = c.PostRotation.value),
        "Lcl_Scaling"in c && (h.scale = c.Lcl_Scaling.value),
        "ScalingOffset"in c && (h.scalingOffset = c.ScalingOffset.value),
        "ScalingPivot"in c && (h.scalingPivot = c.ScalingPivot.value),
        "RotationOffset"in c && (h.rotationOffset = c.RotationOffset.value),
        "RotationPivot"in c && (h.rotationPivot = c.RotationPivot.value),
        o.userData.transformData = h
    }
    setLookAtProperties(o, c) {
        "LookAtProperty"in c && connections.get(o.ID).children.forEach(function(h) {
            if (h.relationship === "LookAtProperty") {
                const _ = fbxTree.Objects.Model[h.ID];
                if ("Lcl_Translation"in _) {
                    const b = _.Lcl_Translation.value;
                    o.target !== void 0 ? (o.target.position.fromArray(b),
                    sceneGraph.add(o.target)) : o.lookAt(new three_module.Pq0().fromArray(b))
                }
            }
        })
    }
    bindSkeleton(o, c, h) {
        const _ = this.parsePoseNodes();
        for (const b in o) {
            const _e = o[b];
            connections.get(parseInt(_e.ID)).parents.forEach(function(nt) {
                if (c.has(nt.ID)) {
                    const it = nt.ID;
                    connections.get(it).parents.forEach(function(at) {
                        h.has(at.ID) && h.get(at.ID).bind(new three_module.EAD(_e.bones), _[at.ID])
                    })
                }
            })
        }
    }
    parsePoseNodes() {
        const o = {};
        if ("Pose"in fbxTree.Objects) {
            const c = fbxTree.Objects.Pose;
            for (const h in c)
                if (c[h].attrType === "BindPose" && c[h].NbPoseNodes > 0) {
                    const _ = c[h].PoseNode;
                    Array.isArray(_) ? _.forEach(function(b) {
                        o[b.Node] = new three_module.kn4().fromArray(b.Matrix.a)
                    }) : o[_.Node] = new three_module.kn4().fromArray(_.Matrix.a)
                }
        }
        return o
    }
    createAmbientLight() {
        if ("GlobalSettings"in fbxTree && "AmbientColor"in fbxTree.GlobalSettings) {
            const o = fbxTree.GlobalSettings.AmbientColor.value
              , c = o[0]
              , h = o[1]
              , _ = o[2];
            if (c !== 0 || h !== 0 || _ !== 0) {
                const b = new three_module.Q1f(c,h,_).convertSRGBToLinear();
                sceneGraph.add(new three_module.$p8(b,1))
            }
        }
    }
}

export default FBXTreeParser;
