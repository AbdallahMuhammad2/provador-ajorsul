
const algorithms = {
    ES256: { name: 'ECDSA', namedCurve: 'P-256', hash: { name: 'SHA-256' } },
    ES384: { name: 'ECDSA', namedCurve: 'P-384', hash: { name: 'SHA-384' } },
    ES512: { name: 'ECDSA', namedCurve: 'P-521', hash: { name: 'SHA-512' } },
    HS256: { name: 'HMAC', hash: { name: 'SHA-256' } },
    HS384: { name: 'HMAC', hash: { name: 'SHA-384' } },
    HS512: { name: 'HMAC', hash: { name: 'SHA-512' } },
    RS256: { name: 'RSASSA-PKCS1-v1_5', hash: { name: 'SHA-256' } },
    RS384: { name: 'RSASSA-PKCS1-v1_5', hash: { name: 'SHA-384' } },
    RS512: { name: 'RSASSA-PKCS1-v1_5', hash: { name: 'SHA-512' } }
} as const;
function decode(token: string){
    return JSON.parse(atob(token.split('.')[1]));
}
async function verify(token: string, publicKey: JsonWebKey, options: any){
    const algorithm = algorithms[(options.algorithm as keyof typeof algorithms) ||'RS512']
    const key = await crypto.subtle.importKey('jwk',
        publicKey,
        algorithm,
        true, ['verify']
    )
    const splits  = token.split('.')
    const signature = new Uint8Array(atob(splits[2]).split('').map(c => c.charCodeAt(0)))
    const data = new Uint8Array(atob(splits[0] + '.' + splits[1]).split('').map(c => c.charCodeAt(0)))
    return await crypto.subtle.verify(algorithm, key, signature, data)
}
const jwt = {decode, verify}
export {jwt}
