/* Standalone Class: AwsV4Signer */

class AwsV4Signer {
    constructor({method: o, url: c, headers: h, body: _, accessKeyId: b, secretAccessKey: _e, sessionToken: nt, service: it, region: at, cache: ut, datetime: pt, signQuery: ht, appendSessionToken: _t, allHeaders: vt, singleEncode: bt}) {
        if (c == null)
            throw new TypeError("url is a required option");
        if (b == null)
            throw new TypeError("accessKeyId is a required option");
        if (_e == null)
            throw new TypeError("secretAccessKey is a required option");
        let St, At;
        this.method = o || (_ ? "POST" : "GET"),
        this.url = new URL(c),
        this.headers = new Headers(h || {}),
        this.body = _,
        this.accessKeyId = b,
        this.secretAccessKey = _e,
        this.sessionToken = nt,
        it && at || ([St,At] = guessServiceRegion(this.url, this.headers)),
        this.service = it || St || "",
        this.region = at || At || "us-east-1",
        this.cache = ut || new Map,
        this.datetime = pt || new Date().toISOString().replace(/[:-]|\.\d{3}/g, ""),
        this.signQuery = ht,
        this.appendSessionToken = _t || this.service === "iotdevicegateway",
        this.headers.delete("Host"),
        this.service !== "s3" || this.signQuery || this.headers.has("X-Amz-Content-Sha256") || this.headers.set("X-Amz-Content-Sha256", "UNSIGNED-PAYLOAD");
        const Et = this.signQuery ? this.url.searchParams : this.headers;
        if (Et.set("X-Amz-Date", this.datetime),
        this.sessionToken && !this.appendSessionToken && Et.set("X-Amz-Security-Token", this.sessionToken),
        this.signableHeaders = ["host", ...this.headers.keys()].filter(It => vt || !UNSIGNABLE_HEADERS.has(It)).sort(),
        this.signedHeaders = this.signableHeaders.join(";"),
        this.canonicalHeaders = this.signableHeaders.map(It => It + ":" + (It === "host" ? this.url.host : (this.headers.get(It) || "").replace(/\s+/g, " "))).join(`
`),
        this.credentialString = [this.datetime.slice(0, 8), this.region, this.service, "aws4_request"].join("/"),
        this.signQuery && (this.service !== "s3" || Et.has("X-Amz-Expires") || Et.set("X-Amz-Expires", "86400"),
        Et.set("X-Amz-Algorithm", "AWS4-HMAC-SHA256"),
        Et.set("X-Amz-Credential", this.accessKeyId + "/" + this.credentialString),
        Et.set("X-Amz-SignedHeaders", this.signedHeaders)),
        this.service === "s3")
            try {
                this.encodedPath = decodeURIComponent(this.url.pathname.replace(/\+/g, " "))
            } catch {
                this.encodedPath = this.url.pathname
            }
        else
            this.encodedPath = this.url.pathname.replace(/\/+/g, "/");
        bt || (this.encodedPath = encodeURIComponent(this.encodedPath).replace(/%2F/g, "/")),
        this.encodedPath = encodeRfc3986(this.encodedPath);
        const Pt = new Set;
        this.encodedSearch = [...this.url.searchParams].filter( ([It]) => {
            if (!It)
                return !1;
            if (this.service === "s3") {
                if (Pt.has(It))
                    return !1;
                Pt.add(It)
            }
            return !0
        }
        ).map(It => It.map(Dt => encodeRfc3986(encodeURIComponent(Dt)))).sort( ([It,Dt], [Gt,Bt]) => It < Gt ? -1 : It > Gt ? 1 : Dt < Bt ? -1 : Dt > Bt ? 1 : 0).map(It => It.join("=")).join("&")
    }
    async sign() {
        return this.signQuery ? (this.url.searchParams.set("X-Amz-Signature", await this.signature()),
        this.sessionToken && this.appendSessionToken && this.url.searchParams.set("X-Amz-Security-Token", this.sessionToken)) : this.headers.set("Authorization", await this.authHeader()),
        {
            method: this.method,
            url: this.url,
            headers: this.headers,
            body: this.body
        }
    }
    async authHeader() {
        return ["AWS4-HMAC-SHA256 Credential=" + this.accessKeyId + "/" + this.credentialString, "SignedHeaders=" + this.signedHeaders, "Signature=" + await this.signature()].join(", ")
    }
    async signature() {
        const o = this.datetime.slice(0, 8)
          , c = [this.secretAccessKey, o, this.region, this.service].join();
        let h = this.cache.get(c);
        if (!h) {
            const _ = await hmac("AWS4" + this.secretAccessKey, o)
              , b = await hmac(_, this.region)
              , _e = await hmac(b, this.service);
            h = await hmac(_e, "aws4_request"),
            this.cache.set(c, h)
        }
        return buf2hex(await hmac(h, await this.stringToSign()))
    }
    async stringToSign() {
        return ["AWS4-HMAC-SHA256", this.datetime, this.credentialString, buf2hex(await aws4fetch_esm_hash(await this.canonicalString()))].join(`
`)
    }
    async canonicalString() {
        return [this.method.toUpperCase(), this.encodedPath, this.encodedSearch, this.canonicalHeaders + `
`, this.signedHeaders, await this.hexBodyHash()].join(`
`)
    }
    async hexBodyHash() {
        let o = this.headers.get("X-Amz-Content-Sha256") || (this.service === "s3" && this.signQuery ? "UNSIGNED-PAYLOAD" : null);
        if (o == null) {
            if (this.body && typeof this.body != "string" && !("byteLength"in this.body))
                throw new Error("body must be a string, ArrayBuffer or ArrayBufferView, unless you include the X-Amz-Content-Sha256 header");
            o = buf2hex(await aws4fetch_esm_hash(this.body || ""))
        }
        return o
    }
}

export default AwsV4Signer;
