/* Standalone Class: TextParser */

class TextParser {
    getPrevNode() {
        return this.nodeStack[this.currentIndent - 2]
    }
    getCurrentNode() {
        return this.nodeStack[this.currentIndent - 1]
    }
    getCurrentProp() {
        return this.currentProp
    }
    pushStack(o) {
        this.nodeStack.push(o),
        this.currentIndent += 1
    }
    popStack() {
        this.nodeStack.pop(),
        this.currentIndent -= 1
    }
    setCurrentProp(o, c) {
        this.currentProp = o,
        this.currentPropName = c
    }
    parse(o) {
        this.currentIndent = 0,
        this.allNodes = new FBXTree,
        this.nodeStack = [],
        this.currentProp = [],
        this.currentPropName = "";
        const c = this
          , h = o.split(/[\r\n]+/);
        return h.forEach(function(_, b) {
            const _e = _.match(/^[\s\t]*;/)
              , nt = _.match(/^[\s\t]*$/);
            if (_e || nt)
                return;
            const it = _.match("^\\t{" + c.currentIndent + "}(\\w+):(.*){", "")
              , at = _.match("^\\t{" + c.currentIndent + "}(\\w+):[\\s\\t\\r\\n](.*)")
              , ut = _.match("^\\t{" + (c.currentIndent - 1) + "}}");
            it ? c.parseNodeBegin(_, it) : at ? c.parseNodeProperty(_, at, h[++b]) : ut ? c.popStack() : _.match(/^[^\s\t}]/) && c.parseNodePropertyContinued(_)
        }),
        this.allNodes
    }
    parseNodeBegin(o, c) {
        const h = c[1].trim().replace(/^"/, "").replace(/"$/, "")
          , _ = c[2].split(",").map(function(it) {
            return it.trim().replace(/^"/, "").replace(/"$/, "")
        })
          , b = {
            name: h
        }
          , _e = this.parseNodeAttr(_)
          , nt = this.getCurrentNode();
        this.currentIndent === 0 ? this.allNodes.add(h, b) : h in nt ? (h === "PoseNode" ? nt.PoseNode.push(b) : nt[h].id !== void 0 && (nt[h] = {},
        nt[h][nt[h].id] = nt[h]),
        _e.id !== "" && (nt[h][_e.id] = b)) : typeof _e.id == "number" ? (nt[h] = {},
        nt[h][_e.id] = b) : h !== "Properties70" && (nt[h] = h === "PoseNode" ? [b] : b),
        typeof _e.id == "number" && (b.id = _e.id),
        _e.name !== "" && (b.attrName = _e.name),
        _e.type !== "" && (b.attrType = _e.type),
        this.pushStack(b)
    }
    parseNodeAttr(o) {
        let c = o[0];
        o[0] !== "" && (c = parseInt(o[0]),
        isNaN(c) && (c = o[0]));
        let h = ""
          , _ = "";
        return o.length > 1 && (h = o[1].replace(/^(\w+)::/, ""),
        _ = o[2]),
        {
            id: c,
            name: h,
            type: _
        }
    }
    parseNodeProperty(o, c, h) {
        let _ = c[1].replace(/^"/, "").replace(/"$/, "").trim()
          , b = c[2].replace(/^"/, "").replace(/"$/, "").trim();
        _ === "Content" && b === "," && (b = h.replace(/"/g, "").replace(/,$/, "").trim());
        const _e = this.getCurrentNode();
        if (_e.name !== "Properties70") {
            if (_ === "C") {
                const nt = b.split(",").slice(1)
                  , it = parseInt(nt[0])
                  , at = parseInt(nt[1]);
                let ut = b.split(",").slice(3);
                ut = ut.map(function(pt) {
                    return pt.trim().replace(/^"/, "")
                }),
                _ = "connections",
                b = [it, at],
                append(b, ut),
                _e[_] === void 0 && (_e[_] = [])
            }
            _ === "Node" && (_e.id = b),
            _ in _e && Array.isArray(_e[_]) ? _e[_].push(b) : _ !== "a" ? _e[_] = b : _e.a = b,
            this.setCurrentProp(_e, _),
            _ === "a" && b.slice(-1) !== "," && (_e.a = parseNumberArray(b))
        } else
            this.parseNodeSpecialProperty(o, _, b)
    }
    parseNodePropertyContinued(o) {
        const c = this.getCurrentNode();
        c.a += o,
        o.slice(-1) !== "," && (c.a = parseNumberArray(c.a))
    }
    parseNodeSpecialProperty(o, c, h) {
        const _ = h.split('",').map(function(ut) {
            return ut.trim().replace(/^\"/, "").replace(/\s/, "_")
        })
          , b = _[0]
          , _e = _[1]
          , nt = _[2]
          , it = _[3];
        let at = _[4];
        switch (_e) {
        case "int":
        case "enum":
        case "bool":
        case "ULongLong":
        case "double":
        case "Number":
        case "FieldOfView":
            at = parseFloat(at);
            break;
        case "Color":
        case "ColorRGB":
        case "Vector3D":
        case "Lcl_Translation":
        case "Lcl_Rotation":
        case "Lcl_Scaling":
            at = parseNumberArray(at)
        }
        this.getPrevNode()[b] = {
            type: _e,
            type2: nt,
            flag: it,
            value: at
        },
        this.setCurrentProp(this.getPrevNode(), b)
    }
}

export default TextParser;
