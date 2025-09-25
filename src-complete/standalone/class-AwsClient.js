/* Standalone Class: AwsClient */

class AwsClient {
    constructor({accessKeyId: o, secretAccessKey: c, sessionToken: h, service: _, region: b, cache: _e, retries: nt, initRetryMs: it}) {
        if (o == null)
            throw new TypeError("accessKeyId is a required option");
        if (c == null)
            throw new TypeError("secretAccessKey is a required option");
        this.accessKeyId = o,
        this.secretAccessKey = c,
        this.sessionToken = h,
        this.service = _,
        this.region = b,
        this.cache = _e || new Map,
        this.retries = nt ?? 10,
        this.initRetryMs = it || 50
    }
    async sign(o, c) {
        if (o instanceof Request) {
            const {method: b, url: _e, headers: nt, body: it} = o;
            (c = Object.assign({
                method: b,
                url: _e,
                headers: nt
            }, c)).body == null && nt.has("Content-Type") && (c.body = it != null && nt.has("X-Amz-Content-Sha256") ? it : await o.clone().arrayBuffer()),
            o = _e
        }
        const h = new AwsV4Signer(Object.assign({
            url: o.toString()
        }, c, this, c && c.aws))
          , _ = Object.assign({}, c, await h.sign());
        delete _.aws;
        try {
            return new Request(_.url.toString(),_)
        } catch (b) {
            if (b instanceof TypeError)
                return new Request(_.url.toString(),Object.assign({
                    duplex: "half"
                }, _));
            throw b
        }
    }
    async fetch(o, c) {
        for (let h = 0; h <= this.retries; h++) {
            const _ = fetch(await this.sign(o, c));
            if (h === this.retries)
                return _;
            const b = await _;
            if (b.status < 500 && b.status !== 429)
                return b;
            await new Promise(_e => setTimeout(_e, Math.random() * this.initRetryMs * Math.pow(2, h)))
        }
        throw new Error("An unknown error occurred, ensure retries is not negative")
    }
}

export default AwsClient;
