/* Standalone Constant: nt */

const nt = {
                        items: _e.items,
                        prefix: _e.prefix,
                        name: _e.name,
                        title: _e.title || "",
                        icon: _e.icon || "",
                        icons: (h = _e.icons) !== null && h !== void 0 ? h : _e.items.map( () => ""),
                        titles: (_ = _e.titles) !== null && _ !== void 0 ? _ : _e.items.map( () => ""),
                        itemFiles: [],
                        iconFiles: [],
                        data: {
                            ..._e.data
                        }
                    };

export default nt;
