/*
 * Module 881 (Pattern 0)
 * Params: d, o, c
 * Size: 9949 chars
 */

// === MODULE CONTENT ===
function module881(d, o, c) {
var h = c(981)
          , _ = c(872)
          , b = typeof Float64Array < "u";
        function _e(ut, pt) {
            return ut[0] - pt[0]
        }
        function nt() {
            var ut, pt = this.stride, ht = new Array(pt.length);
            for (ut = 0; ut < ht.length; ++ut)
                ht[ut] = [Math.abs(pt[ut]), ut];
            ht.sort(_e);
            var _t = new Array(ht.length);
            for (ut = 0; ut < _t.length; ++ut)
                _t[ut] = ht[ut][1];
            return _t
        }
        function it(ut, pt) {
            var ht = ["View", pt, "d", ut].join("");
            pt < 0 && (ht = "View_Nil" + ut);
            var _t = ut === "generic";
            if (pt === -1) {
                var vt = "function " + ht + "(a){
this.data=a;};
var proto=" + ht + ".prototype;
proto.dtype='" + ut + "';
proto.index=function(){
return -1};
proto.size=0;
proto.dimension=-1;
proto.shape=proto.stride=proto.order=[];
proto.lo=proto.hi=proto.transpose=proto.step=function(){
return new " + ht + "(this.data);};
proto.get=proto.set=function(){};
proto.pick=function(){
return null};
return function construct_" + ht + "(a){
return new " + ht + "(a);}";
                return new Function(vt)()
            }
            if (pt === 0)
                return vt = "function " + ht + "(a,d) {
this.data = a;
this.offset = d};
var proto=" + ht + ".prototype;
proto.dtype='" + ut + "';
proto.index=function(){
return this.offset};
proto.dimension=0;
proto.size=1;
proto.shape=proto.stride=proto.order=[];
proto.lo=proto.hi=proto.transpose=proto.step=function " + ht + "_copy() {
return new " + ht + "(this.data,this.offset)};
proto.pick=function " + ht + "_pick(){
return TrivialArray(this.data);};
proto.valueOf=proto.get=function " + ht + "_get(){
return " + (_t ? "this.data.get(this.offset)" : "this.data[this.offset]") + "};
proto.set=function " + ht + "_set(v){
return " + (_t ? "this.data.set(this.offset,v)" : "this.data[this.offset]=v") + "};
return function construct_" + ht + "(a,b,c,d){
return new " + ht + "(a,d)}",
                new Function("TrivialArray",vt)(at[ut][0]);
            vt = ["'use strict'"];
            var bt = h(pt)
              , St = bt.map(function(Ut) {
                return "i" + Ut
            })
              , At = "this.offset+" + bt.map(function(Ut) {
                return "this.stride[" + Ut + "]*i" + Ut
            }).join("+")
              , Et = bt.map(function(Ut) {
                return "b" + Ut
            }).join(",")
              , Pt = bt.map(function(Ut) {
                return "c" + Ut
            }).join(",");
            vt.push("function " + ht + "(a," + Et + "," + Pt + ",d){
this.data=a", "this.shape=[" + Et + "]", "this.stride=[" + Pt + "]", "this.offset=d|0}", "var proto=" + ht + ".prototype", "proto.dtype='" + ut + "'", "proto.dimension=" + pt),
            vt.push("Object.defineProperty(proto,'size',{
get:function " + ht + "_size(){
return " + bt.map(function(Ut) {
                return "this.shape[" + Ut + "]"
            }).join("*"), "}})"),
            pt === 1 ? vt.push("proto.order=[0]") : (vt.push("Object.defineProperty(proto,'order',{
get:"),
            pt < 4 ? (vt.push("function " + ht + "_order(){"),
            pt === 2 ? vt.push("return (Math.abs(this.stride[0])>Math.abs(this.stride[1]))?[1,0]:[0,1]}})") : pt === 3 && vt.push("var s0=Math.abs(this.stride[0]),s1=Math.abs(this.stride[1]),s2=Math.abs(this.stride[2]);
if(s0>s1){
if(s1>s2){
return [2,1,0];}
else if(s0>s2){
return [1,2,0];}
else{
return [1,0,2];}}
else if(s0>s2){
return [2,0,1];}
else if(s2>s1){
return [0,1,2];}
else{
return [0,2,1];}}})")) : vt.push("ORDER})")),
            vt.push("proto.set=function " + ht + "_set(" + St.join(",") + ",v){"),
            _t ? vt.push("return this.data.set(" + At + ",v)}") : vt.push("return this.data[" + At + "]=v}"),
            vt.push("proto.get=function " + ht + "_get(" + St.join(",") + "){"),
            _t ? vt.push("return this.data.get(" + At + ")}") : vt.push("return this.data[" + At + "]}"),
            vt.push("proto.index=function " + ht + "_index(", St.join(), "){
return " + At + "}"),
            vt.push("proto.hi=function " + ht + "_hi(" + St.join(",") + "){
return new " + ht + "(this.data," + bt.map(function(Ut) {
                return ["(typeof i", Ut, "!=='number'||i", Ut, "<0)?this.shape[", Ut, "]:i", Ut, "|0"].join("")
            }).join(",") + "," + bt.map(function(Ut) {
                return "this.stride[" + Ut + "]"
            }).join(",") + ",this.offset)}");
            var It = bt.map(function(Ut) {
                return "a" + Ut + "=this.shape[" + Ut + "]"
            })
              , Dt = bt.map(function(Ut) {
                return "c" + Ut + "=this.stride[" + Ut + "]"
            });
            vt.push("proto.lo=function " + ht + "_lo(" + St.join(",") + "){
var b=this.offset,d=0," + It.join(",") + "," + Dt.join(","));
            for (var Gt = 0; Gt < pt; ++Gt)
                vt.push("if(typeof i" + Gt + "==='number'&&i" + Gt + ">=0){
d=i" + Gt + "|0;
b+=c" + Gt + "*d;
a" + Gt + "-=d}");
            for (vt.push("return new " + ht + "(this.data," + bt.map(function(Ut) {
                return "a" + Ut
            }).join(",") + "," + bt.map(function(Ut) {
                return "c" + Ut
            }).join(",") + ",b)}"),
            vt.push("proto.step=function " + ht + "_step(" + St.join(",") + "){
var " + bt.map(function(Ut) {
                return "a" + Ut + "=this.shape[" + Ut + "]"
            }).join(",") + "," + bt.map(function(Ut) {
                return "b" + Ut + "=this.stride[" + Ut + "]"
            }).join(",") + ",c=this.offset,d=0,ceil=Math.ceil"),
            Gt = 0; Gt < pt; ++Gt)
                vt.push("if(typeof i" + Gt + "==='number'){
d=i" + Gt + "|0;
if(d<0){
c+=b" + Gt + "*(a" + Gt + "-1);
a" + Gt + "=ceil(-a" + Gt + "/d)}
else{
a" + Gt + "=ceil(a" + Gt + "/d)}
b" + Gt + "*=d}");
            vt.push("return new " + ht + "(this.data," + bt.map(function(Ut) {
                return "a" + Ut
            }).join(",") + "," + bt.map(function(Ut) {
                return "b" + Ut
            }).join(",") + ",c)}");
            var Bt = new Array(pt)
              , kt = new Array(pt);
            for (Gt = 0; Gt < pt; ++Gt)
                Bt[Gt] = "a[i" + Gt + "]",
                kt[Gt] = "b[i" + Gt + "]";
            for (vt.push("proto.transpose=function " + ht + "_transpose(" + St + "){" + St.map(function(Ut, Ht) {
                return Ut + "=(" + Ut + "===undefined?" + Ht + ":" + Ut + "|0)"
            }).join(";"), "var a=this.shape,b=this.stride;
return new " + ht + "(this.data," + Bt.join(",") + "," + kt.join(",") + ",this.offset)}"),
            vt.push("proto.pick=function " + ht + "_pick(" + St + "){
var a=[],b=[],c=this.offset"),
            Gt = 0; Gt < pt; ++Gt)
                vt.push("if(typeof i" + Gt + "==='number'&&i" + Gt + ">=0){
c=(c+this.stride[" + Gt + "]*i" + Gt + ")|0}
else{
a.push(this.shape[" + Gt + "]);
b.push(this.stride[" + Gt + "])}");
            return vt.push("var ctor=CTOR_LIST[a.length+1];
return ctor(this.data,a,b,c)}"),
            vt.push("return function construct_" + ht + "(data,shape,stride,offset){
return new " + ht + "(data," + bt.map(function(Ut) {
                return "shape[" + Ut + "]"
            }).join(",") + "," + bt.map(function(Ut) {
                return "stride[" + Ut + "]"
            }).join(",") + ",offset)}"),
            new Function("CTOR_LIST","ORDER",vt.join(`
`))(at[ut], nt)
        }
        var at = {
            float32: [],
            float64: [],
            int8: [],
            int16: [],
            int32: [],
            uint8: [],
            uint16: [],
            uint32: [],
            array: [],
            uint8_clamped: [],
            bigint64: [],
            biguint64: [],
            buffer: [],
            generic: []
        };
        d.exports = function(ut, pt, ht, _t) {
            if (ut === void 0)
                return (0,
                at.array[0])([]);
            typeof ut == "number" && (ut = [ut]),
            pt === void 0 && (pt = [ut.length]);
            var vt = pt.length;
            if (ht === void 0) {
                ht = new Array(vt);
                for (var bt = vt - 1, St = 1; bt >= 0; --bt)
                    ht[bt] = St,
                    St *= pt[bt]
            }
            if (_t === void 0)
                for (_t = 0,
                bt = 0; bt < vt; ++bt)
                    ht[bt] < 0 && (_t -= (pt[bt] - 1) * ht[bt]);
            for (var At = function(Pt) {
                if (_(Pt))
                    return "buffer";
                if (b)
                    switch (Object.prototype.toString.call(Pt)) {
                    case "[object Float64Array]":
                        return "float64";
                    case "[object Float32Array]":
                        return "float32";
                    case "[object Int8Array]":
                        return "int8";
                    case "[object Int16Array]":
                        return "int16";
                    case "[object Int32Array]":
                        return "int32";
                    case "[object Uint8Array]":
                        return "uint8";
                    case "[object Uint16Array]":
                        return "uint16";
                    case "[object Uint32Array]":
                        return "uint32";
                    case "[object Uint8ClampedArray]":
                        return "uint8_clamped";
                    case "[object BigInt64Array]":
                        return "bigint64";
                    case "[object BigUint64Array]":
                        return "biguint64"
                    }
                return Array.isArray(Pt) ? "array" : "generic"
            }(ut), Et = at[At]; Et.length <= vt + 1; )
                Et.push(it(At, Et.length - 1));
            return (0,
            Et[vt + 1])(ut, pt, ht, _t)
        }
}

export default module881;
