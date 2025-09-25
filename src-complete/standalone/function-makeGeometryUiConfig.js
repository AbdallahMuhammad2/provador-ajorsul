/* Standalone Function: makeGeometryUiConfig */

function makeGeometryUiConfig(d) {
    return {
        label: "Geometry",
        type: "folder",
        children: [{
            type: "input",
            property: [d, "uuid"],
            disabled: !0
        }, {
            type: "input",
            property: [d, "name"]
        }, {
            type: "button",
            label: "Center Geometry",
            value: () => {
                d.center()
            }
        }, {
            type: "button",
            label: "Center Geometry (keep position)",
            value: () => {
                const o = new three_module.Pq0;
                d.center(o),
                o.negate();
                const c = d.userData.__appliedMeshes;
                for (const h of c)
                    h.updateMatrix(),
                    h.position.copy(o).applyMatrix4(h.matrix),
                    h.setDirty && h.setDirty()
            }
        }, {
            type: "button",
            label: "Compute vertex normals",
            value: () => {
                d.computeVertexNormals()
            }
        }, {
            type: "button",
            label: "Compute vertex tangents",
            value: () => {
                d.computeTangents()
            }
        }, {
            type: "button",
            label: "Normalize normals",
            value: () => {
                d.normalizeNormals()
            }
        }, {
            type: "button",
            label: "Convert to indexed",
            hidden: () => !!d.index,
            value: () => {
                var o;
                if (d.attributes.index)
                    return;
                const c = parseFloat((o = prompt("Tolerance", "-1")) !== null && o !== void 0 ? o : "-1");
                toIndexedGeometry(d, c)
            }
        }, {
            type: "button",
            label: "Convert to non-indexed",
            hidden: () => !d.index,
            value: () => {
                d.attributes.index && d.toNonIndexed()
            }
        }, {
            type: "button",
            label: "Create uv1 from uv",
            value: () => {
                d.hasAttribute("uv1") && !confirm("uv1 already exists, replace with uv data?") || d.setAttribute("uv1", d.getAttribute("uv"))
            }
        }, {
            type: "button",
            label: "Remove vertex color attribute",
            hidden: () => !d.hasAttribute("color"),
            value: () => {
                d.hasAttribute("color") ? confirm("Remove color attribute?") && d.deleteAttribute("color") : prompt("No color attribute found")
            }
        }, {
            type: "button",
            label: "Auto GPU Instances",
            hidden: () => !d.userData.__appliedMeshes || d.userData.__appliedMeshes.size < 2,
            value: () => {
                autoGPUInstanceMeshes(d)
            }
        }, {
            type: "input",
            label: "Mesh count",
            get value() {
                var o, c, h;
                return (h = (c = (o = d.userData) === null || o === void 0 ? void 0 : o.__appliedMeshes) === null || c === void 0 ? void 0 : c.size) !== null && h !== void 0 ? h : 0
            },
            set value(o) {},
            disabled: !0
        }]
    }
}

export default makeGeometryUiConfig;
