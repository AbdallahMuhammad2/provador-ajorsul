import {jwt} from './jwt_utils'

export class LicenseVerification{
    private readonly PRODUCT_ID = 'IJewel3D_WebTryOn_1';
    private readonly KEY_TYPE_ID = 'online-v1';
    private readonly TOKEN_FILE = '0.txt';
    private readonly PUBLIC_KEY_FILE = '1.json';

    private readonly KEY_SERVER = 'https://license.ijewel3d.com';
    private readonly KEY_SERVER_VERIFY = '/api/v1/verify';
    private readonly KEY_SERVER_CERTS = '/api/v1/certs/' + this.KEY_TYPE_ID;

    private id = '';
    private idHash = '';
    // private idPath = '';
    private appVersion = '';
    private appName = '';


    constructor(appName: string, appVersion: string) {
        this.appVersion = appVersion
        this.appName = appName
    }

    private _getOriginId(){
        const location = getCurrentDomain(window);
        if(!location) throw new Error('Failed to get origin');
        return location;
    }

    private _storage = {
        getItem: async (key: string) => localStorage.getItem(key),
        setItem: async (key: string, value: string) => {
            localStorage.setItem(key, value)
            return value
        },
    }
    private _getStorage(){
        return this._storage;
    }

    async init(){
        this.id = this.id ?? this._getOriginId();
        if(!this.id) throw new Error('Failed to get machine id');
        this.idHash = await hash(this.id);

        const storage = this._getStorage();

        // this.idPath = join(await getBasePath(), this.idHash);
        // const firstTime = await fs.access(this.idPath).then(() => true).catch(() => false);
        // if(!firstTime) await fs.mkdir(this.idPath, {recursive: true});

        const tokenFilePath = this.idHash + this.TOKEN_FILE
        let token = await storage.getItem(tokenFilePath) ?? await storage.setItem(tokenFilePath, '');;

        // const publicKeyPath = this.idHash + this.PUBLIC_KEY_FILE;
        // const publicKeyStored = await storage.getItem(publicKeyPath) ?? null;
        // const resp = await this.getPublicKey();
        // let publicKey = resp?.jwk ?? null;
        // if(!publicKey && publicKeyStored) publicKey = JSON.parse(publicKeyStored) as JsonWebKey;
        // if(!publicKey) throw new Error('Failed to get public key ' + resp.error);
        // if(publicKey!==publicKeyStored) await storage.setItem(publicKeyPath, JSON.stringify(publicKey));

        return {
            token,
            // publicKey,
        };
    }

    async verify(key: string, data?: any){
        try {
            data = data ?? await this.init();
            let jwtData;
            let token = data.token;
            if (!token || !token.length) {
                token = await this.setLicenseKey(key);
            }
            jwtData = jwt.decode(token);
            let valid = false
            // todo with public key properly.
            // valid = valid || await jwt.verify(token, data.publicKey, {
            //     algorithm: 'RS512',
            //     throwError: false,
            // })
            valid = valid || await this.verifyData(jwtData)
            return valid
        }catch (_) {
            return false
        }
    }

    async writeToken(token: string){
        const tokenFilePath = this.idHash + this.TOKEN_FILE;
        await this._getStorage().setItem(tokenFilePath, token);
    }

    async verifyData(data: {payload: any}){
        return data.payload?.sub === this.id && data.payload?.app === this.appName+'_'+this.appVersion && data.payload?.pid === this.PRODUCT_ID;
    }

    protected async _getPublicKeyFromServer(): Promise<{jwk?: JsonWebKey, error?: string}>{
        return fetch(this.KEY_SERVER + this.KEY_SERVER_CERTS).then((res) => res.json()).catch((err) => ({
            error: err,
        }));
    }

    protected async _validateKeyFromServer(key: string){
        return await fetch(this.KEY_SERVER + this.KEY_SERVER_VERIFY, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                key,
                id: this.id,
                app: {
                    name: this.appName,
                    version: this.appVersion,
                },
                pid: this.PRODUCT_ID,
            }),
        }).then((res) => res.json()).catch((err) => ({
            error: err,
        }));
    }


    silent = false;
    private _throw(e: any){
        if(!this.silent) throw e;
        return null
    }
    async setLicenseKey(key: string){
        const resp = await this._validateKeyFromServer(key);
        if(resp.error) return this._throw(resp.error);
        const token = resp.token;
        if(!token) return this._throw(new Error('Invalid license key, no token'));
        await this.writeToken(token);
        return token;
    }
    // async getPublicKey(){
    //     const resp = await this._getPublicKeyFromServer();
    //     if(resp.error) return this._throw(resp.error);
    //     const key = resp.jwk;
    //     if(!key) return this._throw(new Error('Invalid public key'));
    //     return key;
    // }

}

async function hash(guid: string): Promise<string> {
    const buffer = new TextEncoder().encode(guid);
    const digest = await crypto.subtle.digest('SHA-256', buffer);
    const hashArray = Array.from(new Uint8Array(digest));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}
// https://github.com/javascript-obfuscator/javascript-obfuscator/blob/1000402f10f61bd367cd971d55f0f832d940d60e/src/custom-code-helpers/domain-lock/templates/DomainLockTemplate.ts#L12
function getCurrentDomain(that: any){
    let document: any;
    let domain: any;
    let location: any;
    let hostname: any;

    // @ts-ignore
    const isName = function(name, length, cs) {
        if (name.length != length) {
            return false;
        }

        for (let i = 0; i < length; i++) {
            for (let j = 0; j < cs.length; j += 2) {
                if (i == cs[j] && name.charCodeAt(i) != cs[j+1]) {
                    return false;
                }
            }
        }

        return true;
    };

    // @ts-ignore
    const isNameVariant1 = function(cs, name, length) {
        return isName(name, length, cs);
    };

    // @ts-ignore
    const isNameVariant2 = function(name, cs, length) {
        return isNameVariant1(cs, name, length);
    };

    // @ts-ignore
    const isNameVariant3 = function(length, name, cs) {
        return isNameVariant2(name, cs, length);
    };

    for (let d in that) {
        if (isName(d, 8, [7, 116, 5, 101, 3, 117, 0, 100])) {
            document = d;

            break;
        }
    }

    for (let d1 in that[document]) {
        if (isNameVariant3(6, d1, [5, 110, 0, 100])) {
            domain = d1;

            break;
        }
    }

    for (let d2 in that[document]) {
        if (isNameVariant2(d2, [7, 110, 0, 108], 8)) {
            location = d2;

            break;
        }
    }

    if (!("~" > domain)) {
        for (let d3 in that[document][location]) {
            if (isNameVariant1([7, 101, 0, 104], d3, 8)) {
                hostname = d3;

                break;
            }
        }
    }

    if (!document || !that[document]) {
        return;
    }

    const documentDomain = that[document][domain];
    const documentLocationHostName = !!that[document][location] && that[document][location][hostname];
    const currentDomain = documentDomain || documentLocationHostName;

    if (!currentDomain) {
        return;
    }

    // console.log(document, domain, location, hostname, documentDomain, documentLocationHostName, currentDomain);

    return currentDomain;
}

// jwt helpers
