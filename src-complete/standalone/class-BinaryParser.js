/* Standalone Class: BinaryParser */

class BinaryParser {
    parse(o) {
        const c = new BinaryReader(o);
        c.skip(23);
        const h = c.getUint32();
        if (h < 6400)
            throw new Error("THREE.FBXLoader: FBX version not supported, FileVersion: " + h);
        const _ = new FBXTree;
        for (; !this.endOfContent(c); ) {
            const b = this.parseNode(c, h);
            b !== null && _.add(b.name, b)
        }
        return _
    }
    endOfContent(o) {
        return o.size() % 16 == 0 ? (o.getOffset() + 160 + 16 & -16) >= o.size() : o.getOffset() + 160 + 16 >= o.size()
    }
    parseNode(o, c) {
        const h = {}
          , _ = c >= 7500 ? o.getUint64() : o.getUint32()
          , b = c >= 7500 ? o.getUint64() : o.getUint32();
        c >= 7500 ? o.getUint64() : o.getUint32();
        const _e = o.getUint8()
          , nt = o.getString(_e);
        if (_ === 0)
            return null;
        const it = [];
        for (let ht = 0; ht < b; ht++)
            it.push(this.parseProperty(o));
        const at = it.length > 0 ? it[0] : ""
          , ut = it.length > 1 ? it[1] : ""
          , pt = it.length > 2 ? it[2] : "";
        for (h.singleProperty = b === 1 && o.getOffset() === _; _ > o.getOffset(); ) {
            const ht = this.parseNode(o, c);
            ht !== null && this.parseSubNode(nt, h, ht)
        }
        return h.propertyList = it,
        typeof at == "number" && (h.id = at),
        ut !== "" && (h.attrName = ut),
        pt !== "" && (h.attrType = pt),
        nt !== "" && (h.name = nt),
        h
    }
    parseSubNode(o, c, h) {
        if (h.singleProperty === !0) {
            const _ = h.propertyList[0];
            Array.isArray(_) ? (c[h.name] = h,
            h.a = _) : c[h.name] = _
        } else if (o === "Connections" && h.name === "C") {
            const _ = [];
            h.propertyList.forEach(function(b, _e) {
                _e !== 0 && _.push(b)
            }),
            c.connections === void 0 && (c.connections = []),
            c.connections.push(_)
        } else if (h.name === "Properties70")
            Object.keys(h).forEach(function(_) {
                c[_] = h[_]
            });
        else if (o === "Properties70" && h.name === "P") {
            let _ = h.propertyList[0]
              , b = h.propertyList[1];
            const _e = h.propertyList[2]
              , nt = h.propertyList[3];
            let it;
            _.indexOf("Lcl ") === 0 && (_ = _.replace("Lcl ", "Lcl_")),
            b.indexOf("Lcl ") === 0 && (b = b.replace("Lcl ", "Lcl_")),
            it = b === "Color" || b === "ColorRGB" || b === "Vector" || b === "Vector3D" || b.indexOf("Lcl_") === 0 ? [h.propertyList[4], h.propertyList[5], h.propertyList[6]] : h.propertyList[4],
            c[_] = {
                type: b,
                type2: _e,
                flag: nt,
                value: it
            }
        } else
            c[h.name] === void 0 ? typeof h.id == "number" ? (c[h.name] = {},
            c[h.name][h.id] = h) : c[h.name] = h : h.name === "PoseNode" ? (Array.isArray(c[h.name]) || (c[h.name] = [c[h.name]]),
            c[h.name].push(h)) : c[h.name][h.id] === void 0 && (c[h.name][h.id] = h)
    }
    parseProperty(o) {
        const c = o.getString(1);
        let h;
        switch (c) {
        case "C":
            return o.getBoolean();
        case "D":
            return o.getFloat64();
        case "F":
            return o.getFloat32();
        case "I":
            return o.getInt32();
        case "L":
            return o.getInt64();
        case "R":
            return h = o.getUint32(),
            o.getArrayBuffer(h);
        case "S":
            return h = o.getUint32(),
            o.getString(h);
        case "Y":
            return o.getInt16();
        case "b":
        case "c":
        case "d":
        case "f":
        case "i":
        case "l":
            const _ = o.getUint32()
              , b = o.getUint32()
              , _e = o.getUint32();
            if (b === 0)
                switch (c) {
                case "b":
                case "c":
                    return o.getBooleanArray(_);
                case "d":
                    return o.getFloat64Array(_);
                case "f":
                    return o.getFloat32Array(_);
                case "i":
                    return o.getInt32Array(_);
                case "l":
                    return o.getInt64Array(_)
                }
            const nt = fflate_module_unzlibSync(new Uint8Array(o.getArrayBuffer(_e)))
              , it = new BinaryReader(nt.buffer);
            switch (c) {
            case "b":
            case "c":
                return it.getBooleanArray(_);
            case "d":
                return it.getFloat64Array(_);
            case "f":
                return it.getFloat32Array(_);
            case "i":
                return it.getInt32Array(_);
            case "l":
                return it.getInt64Array(_)
            }
            break;
        default:
            throw new Error("THREE.FBXLoader: Unknown property type " + c)
        }
    }
}

export default BinaryParser;
