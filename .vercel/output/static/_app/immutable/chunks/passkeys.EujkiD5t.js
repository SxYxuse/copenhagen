import{d as f,a as t,t as s,f as i,b as a,c as y}from"./disclose-version.Bedei8AD.js";import{h}from"./index.DWgPtC_I.js";import{B as ta,H as sa,P as l}from"./blueprint.CLPDHYwR.js";import{H as $}from"./h2.BLVNhL6Q.js";import{A as v}from"./a.CxCmjLdc.js";import{P as m}from"./pre.DAToQk2m.js";import{U as pa,L as S}from"./ul.5IqOVinl.js";var ra=s("Passkeys",1),ia=s("Overview",1),da=s("Web Authentication (WebAuthn) standard",1),la=s("second factor",1),oa=s("Passkeys are built on top of the <!> and allow applications to authenticate users with in-device authentication methods, including biometrics and device pin-code. It can be more secure than traditional passwords as it doesn't require the user to remember their passwords. It can replace passwords entirely or be used in addition to passwords as a <!>.",1),ua=s("Passkeys are based on public key cryptography, where each user has a public-private key pair. The private key is stored in the user's device, while the public key is stored in your application. The device creates a signature with the private key and your application can use the public key to verify it.",1),ca=s("Challenge",1),ha=s("token",1),_a=s("Each attestation and assertion has a challenge associated with it. A challenge is a randomly generated single-use <!> stored in the server to prevent replay attacks. The recommended minimum entropy is 16 bytes.",1),ga=s("Registration",1),fa=s("Web Authentication API",1),ya=s("In the client, get a new challenge from the server and create a new credential with the <!>. This will prompt the user to authenticate with their device. Browsers such as Safari will only allow you to call this method if it was initiated by a user interaction (button click).",1),va=s("<!>: Your application's name",1),ma=s("<!>: Random ID",1),$a=s("<!>: Unique user identifier (user ID, username, email)",1),Sa=s("<!>: Does not need to be unique",1),Da=s("<!> <!> <!> <!>",1),ba=s("IANA COSE Algorithms registry",1),wa=s("The algorithm ID is from the <!>. ECDSA with SHA-256 (ES256) is recommended as it is widely supported. You can also pass <!> for RSASSA-PKCS1-v1_5 (RS256) to support a wider range of devices but devices that only support it are rare.",1),Ma=s("The public key, client data, authenticator data, credential ID, and the challenge are sent to the server for verification. A simple way to send binary data is by encoding it with base64.",1),Pa=s("The first step is to validate the challenge. Make sure to delete the challenge from storage as it is single-use. Next, check the client data and authenticator data. The origin is the domain your application is hosted on, including the protocol and port, and the relying party ID is the domain without the protocol or port.",1),Ca=s("Optionally, validate the attestation statement to verify that the attestation came from a legitimate device. However, unless your application has strict security or needs to verify the authenticity of the user's device, this is likely unnecessary.",1),Aa=s("The authenticator data also includes a signature counter that is incremented every time a new signature is generated, which can be used to detect cloned authenticators. However, for passkeys specifically, this is not necessary as credentials are designed to be exported and shared.",1),Na=s("Finally, check if the public key is valid, and create a new user with their public key and the credential ID. The public key is in the SubjectPublicKeyInfo format. If you support multiple algorithms, you can parse the public key to get the algorithm identifier.",1),Ia=s("Authentication",1),ka=s("Generate a challenge on the server and use it to authenticate the user client side.",1),Xa=s("The client data, authenticator data, signature, challenge, and credential ID are sent to the server. The challenge, the authenticator, and the client data are first verified. This part is nearly identical to the steps for verifying attestation.",1),Ta=s("The next step is to verify the signature. Use credential ID to get the user's public key and verify the signature, which is ASN.1 DER encoded. The algorithm depends on the parameters passed when the credential was created.",1),Ka=s('<!> <!> <!> <!> <!> <!> <!> <!> <figure data-rehype-pretty-code-figure=""><!></figure> <!> <!> <!> <!> <figure data-rehype-pretty-code-figure=""><!></figure> <!> <!> <!> <!> <!> <figure data-rehype-pretty-code-figure=""><!></figure> <!> <figure data-rehype-pretty-code-figure=""><!></figure> <!> <figure data-rehype-pretty-code-figure=""><!></figure>',1);const xa={title:"Passkeys"};function Wa(Y){var b=f(),z=i(b);ta(z,{metadata:xa,children:(F,Oa)=>{var w=Ka(),M=i(w);sa(M,{id:"passkeys",children:(e,p)=>{var n=ra();t(e,n)},$$slots:{default:!0}});var P=a(a(M,!0));$(P,{id:"overview",children:(e,p)=>{var n=ia();t(e,n)},$$slots:{default:!0}});var C=a(a(P,!0));l(C,{children:(e,p)=>{var n=oa(),r=a(i(n,!0));v(r,{href:"https://www.w3.org/TR/webauthn-2/",children:(c,_)=>{var d=da();t(c,d)},$$slots:{default:!0}});var u=a(a(r,!0));v(u,{href:"/content/mfa",children:(c,_)=>{var d=la();t(c,d)},$$slots:{default:!0}}),t(e,n)},$$slots:{default:!0}});var A=a(a(C,!0));l(A,{children:(e,p)=>{var n=ua();t(e,n)},$$slots:{default:!0}});var N=a(a(A,!0));$(N,{id:"challenge",children:(e,p)=>{var n=ca();t(e,n)},$$slots:{default:!0}});var I=a(a(N,!0));l(I,{children:(e,p)=>{var n=_a(),r=a(i(n,!0));v(r,{href:"/content/server-side-tokens",children:(u,c)=>{var _=ha();t(u,_)},$$slots:{default:!0}}),t(e,n)},$$slots:{default:!0}});var k=a(a(I,!0));$(k,{id:"registration",children:(e,p)=>{var n=ga();t(e,n)},$$slots:{default:!0}});var X=a(a(k,!0));l(X,{children:(e,p)=>{var n=ya(),r=a(i(n,!0));v(r,{href:"https://developer.mozilla.org/en-US/docs/Web/API/Web_Authentication_API",children:(u,c)=>{var _=fa();t(u,_)},$$slots:{default:!0}}),t(e,n)},$$slots:{default:!0}});var T=a(a(X,!0)),G=y(T);m(G,{class:"Serendipity Midnight Serendipity Morning",tabindex:"0","data-language":"untype","data-theme":"Serendipity Midnight Serendipity Morning",children:(e,p)=>{var n=f(),r=i(n);h(r,()=>`<code data-language="untype" data-theme="Serendipity Midnight Serendipity Morning" style="display: grid;"><span data-line=""><span>const publicKeyCredential: PublicKeyCredential = await navigator.credentials.create(&#123;</span></span>
<span data-line=""><span>	publicKey: &#123;</span></span>
<span data-line=""><span>		rp: &#123; name: 'My app' &#125;,</span></span>
<span data-line=""><span>		user: &#123;</span></span>
<span data-line=""><span>			id: crypto.getRandomValues(new Uint8Array(32)),</span></span>
<span data-line=""><span>			name: userId,</span></span>
<span data-line=""><span>			displayName: username</span></span>
<span data-line=""><span>		&#125;,</span></span>
<span data-line=""><span>		pubKeyCredParams: [</span></span>
<span data-line=""><span>			&#123;</span></span>
<span data-line=""><span>				type: 'public-key',</span></span>
<span data-line=""><span>				// ECDSA with SHA-256</span></span>
<span data-line=""><span>				alg: -7</span></span>
<span data-line=""><span>			&#125;</span></span>
<span data-line=""><span>		],</span></span>
<span data-line=""><span>		challenge</span></span>
<span data-line=""><span>	&#125;</span></span>
<span data-line=""><span>&#125;);</span></span>
<span data-line=""><span>const response: AuthenticatorAttestationResponse = publicKeyCredential.response;</span></span>
<span data-line=""> </span>
<span data-line=""><span>const publicKey: ArrayBuffer = response.getPublicKey();</span></span>
<span data-line=""><span>const clientDataJSON: ArrayBuffer = response.clientDataJSON;</span></span>
<span data-line=""><span>const authenticatorData: ArrayBuffer = response.getAuthenticatorData();</span></span>
<span data-line=""><span>const credentialId: string = publicKeyCredential.id;</span></span></code>`),t(e,n)},$$slots:{default:!0}});var K=a(a(T,!0));pa(K,{children:(e,p)=>{var n=Da(),r=i(n);S(r,{children:(d,D)=>{var o=va(),g=i(o);h(g,()=>"<code>rp.name</code>"),t(d,o)},$$slots:{default:!0}});var u=a(a(r,!0));S(u,{children:(d,D)=>{var o=ma(),g=i(o);h(g,()=>"<code>user.id</code>"),t(d,o)},$$slots:{default:!0}});var c=a(a(u,!0));S(c,{children:(d,D)=>{var o=$a(),g=i(o);h(g,()=>"<code>user.name</code>"),t(d,o)},$$slots:{default:!0}});var _=a(a(c,!0));S(_,{children:(d,D)=>{var o=Sa(),g=i(o);h(g,()=>"<code>user.displayName</code>"),t(d,o)},$$slots:{default:!0}}),t(e,n)},$$slots:{default:!0}});var x=a(a(K,!0));l(x,{children:(e,p)=>{var n=wa(),r=a(i(n,!0));v(r,{href:"https://www.iana.org/assignments/cose/cose.xhtml",children:(c,_)=>{var d=ba();t(c,d)},$$slots:{default:!0}});var u=a(a(r,!0));h(u,()=>"<code>-257</code>"),t(e,n)},$$slots:{default:!0}});var O=a(a(x,!0));l(O,{children:(e,p)=>{var n=Ma();t(e,n)},$$slots:{default:!0}});var H=a(a(O,!0));l(H,{children:(e,p)=>{var n=Pa();t(e,n)},$$slots:{default:!0}});var R=a(a(H,!0)),Q=y(R);m(Q,{class:"Serendipity Midnight Serendipity Morning",tabindex:"0","data-language":"untype","data-theme":"Serendipity Midnight Serendipity Morning",children:(e,p)=>{var n=f(),r=i(n);h(r,()=>`<code data-language="untype" data-theme="Serendipity Midnight Serendipity Morning" style="display: grid;"><span data-line=""><span>import (</span></span>
<span data-line=""><span>	"bytes"</span></span>
<span data-line=""><span>	"crypto/sha256"</span></span>
<span data-line=""><span>	"encoding/base64"</span></span>
<span data-line=""><span>	"encoding/json"</span></span>
<span data-line=""><span>	"errors"</span></span>
<span data-line=""><span>)</span></span>
<span data-line=""> </span>
<span data-line=""><span>var challenge []byte</span></span>
<span data-line=""> </span>
<span data-line=""><span>// Verify the challenge and delete it from storage.</span></span>
<span data-line=""> </span>
<span data-line=""><span>var publicKey, clientDataJSON, authenticatorData []byte</span></span>
<span data-line=""><span>var credentialId string</span></span>
<span data-line=""> </span>
<span data-line=""><span>var clientData ClientData</span></span>
<span data-line=""><span>json.Unmarshal(clientDataJSON, &amp;clientData)</span></span>
<span data-line=""> </span>
<span data-line=""><span>if clientData.Type != "webauthn.create" &#123;</span></span>
<span data-line=""><span>	return errors.New("invalid type")</span></span>
<span data-line=""><span>&#125;</span></span>
<span data-line=""><span>if clientData.Challenge != base64.URLEncoding.WithPadding(base64.NoPadding).EncodeToString(challenge) &#123;</span></span>
<span data-line=""><span>	return errors.New("invalid challenge")</span></span>
<span data-line=""><span>&#125;</span></span>
<span data-line=""><span>if clientData.Origin != "https://example.com" &#123;</span></span>
<span data-line=""><span>	return errors.New("invalid origin")</span></span>
<span data-line=""><span>&#125;</span></span>
<span data-line=""> </span>
<span data-line=""><span>if len(authenticatorData) &lt; 37 &#123;</span></span>
<span data-line=""><span>	return errors.New("invalid authenticator data")</span></span>
<span data-line=""><span>&#125;</span></span>
<span data-line=""><span>rpIdHash := authenticatorData[0:32]</span></span>
<span data-line=""><span>expectedRpIdHash := sha256.Sum256([]byte("example.com"))</span></span>
<span data-line=""><span>if bytes.Equal(rpIdHash, expectedRpIdHash[:]) &#123;</span></span>
<span data-line=""><span>	return errors.New("invalid relying party ID")</span></span>
<span data-line=""><span>&#125;</span></span>
<span data-line=""><span>// Check for the "user present" flag.</span></span>
<span data-line=""><span>if (authenticatorData[32] &amp; 1) != 1 &#123;</span></span>
<span data-line=""><span>	return errors.New("invalid flag")</span></span>
<span data-line=""><span>&#125;</span></span>
<span data-line=""> </span>
<span data-line=""><span>type ClientData struct &#123;</span></span>
<span data-line=""><span>	Type	  string &#96;json:"type"&#96;</span></span>
<span data-line=""><span>	Challenge string &#96;json:"challenge"&#96;</span></span>
<span data-line=""><span>	Origin	string &#96;json:"origin"&#96;</span></span>
<span data-line=""><span>&#125;</span></span></code>`),t(e,n)},$$slots:{default:!0}});var E=a(a(R,!0));l(E,{children:(e,p)=>{var n=Ca();t(e,n)},$$slots:{default:!0}});var J=a(a(E,!0));l(J,{children:(e,p)=>{var n=Aa();t(e,n)},$$slots:{default:!0}});var B=a(a(J,!0));l(B,{children:(e,p)=>{var n=Na();t(e,n)},$$slots:{default:!0}});var U=a(a(B,!0));$(U,{id:"authentication",children:(e,p)=>{var n=Ia();t(e,n)},$$slots:{default:!0}});var j=a(a(U,!0));l(j,{children:(e,p)=>{var n=ka();t(e,n)},$$slots:{default:!0}});var W=a(a(j,!0)),Z=y(W);m(Z,{class:"Serendipity Midnight Serendipity Morning",tabindex:"0","data-language":"untype","data-theme":"Serendipity Midnight Serendipity Morning",children:(e,p)=>{var n=f(),r=i(n);h(r,()=>`<code data-language="untype" data-theme="Serendipity Midnight Serendipity Morning" style="display: grid;"><span data-line=""><span>const publicKeyCredential: PublicKeyCredential = await navigator.credentials.get(&#123;</span></span>
<span data-line=""><span>	publicKey: &#123;</span></span>
<span data-line=""><span>		challenge</span></span>
<span data-line=""><span>	&#125;</span></span>
<span data-line=""><span>&#125;);</span></span>
<span data-line=""> </span>
<span data-line=""><span>const response: AuthenticatorAssertionResponse = publicKeyCredential.response;</span></span>
<span data-line=""><span>const clientDataJSON: ArrayBuffer = response.clientDataJSON);</span></span>
<span data-line=""><span>const authenticatorData: ArrayBuffer = response.authenticatorData);</span></span>
<span data-line=""><span>const signature: ArrayBuffer = response.signature);</span></span>
<span data-line=""><span>const credentialId: string = publicKeyCredential.id;</span></span></code>`),t(e,n)},$$slots:{default:!0}});var q=a(a(W,!0));l(q,{children:(e,p)=>{var n=Xa();t(e,n)},$$slots:{default:!0}});var L=a(a(q,!0)),aa=y(L);m(aa,{class:"Serendipity Midnight Serendipity Morning",tabindex:"0","data-language":"untype","data-theme":"Serendipity Midnight Serendipity Morning",children:(e,p)=>{var n=f(),r=i(n);h(r,()=>`<code data-language="untype" data-theme="Serendipity Midnight Serendipity Morning" style="display: grid;"><span data-line=""><span>import (</span></span>
<span data-line=""><span>	"bytes"</span></span>
<span data-line=""><span>	"crypto/sha256"</span></span>
<span data-line=""><span>	"encoding/base64"</span></span>
<span data-line=""><span>	"encoding/json"</span></span>
<span data-line=""><span>	"errors"</span></span>
<span data-line=""><span>)</span></span>
<span data-line=""> </span>
<span data-line=""><span>var challenge []byte</span></span>
<span data-line=""> </span>
<span data-line=""><span>// Verify the challenge and delete it from storage.</span></span>
<span data-line=""> </span>
<span data-line=""><span>var clientDataJSON, authenticatorData []byte</span></span>
<span data-line=""> </span>
<span data-line=""><span>var clientData ClientData</span></span>
<span data-line=""><span>json.Unmarshal(clientDataJSON, &amp;clientData)</span></span>
<span data-line=""> </span>
<span data-line=""><span>if clientData.Type != "webauthn.get" &#123;</span></span>
<span data-line=""><span>	return errors.New("invalid type")</span></span>
<span data-line=""><span>&#125;</span></span>
<span data-line=""><span>if clientData.Challenge != base64.URLEncoding.WithPadding(base64.NoPadding).EncodeToString(challenge) &#123;</span></span>
<span data-line=""><span>	return errors.New("invalid challenge")</span></span>
<span data-line=""><span>&#125;</span></span>
<span data-line=""><span>if clientData.Origin != "https://example.com" &#123;</span></span>
<span data-line=""><span>	return errors.New("invalid origin")</span></span>
<span data-line=""><span>&#125;</span></span>
<span data-line=""> </span>
<span data-line=""><span>if len(authenticatorData) &lt; 37 &#123;</span></span>
<span data-line=""><span>	return errors.New("invalid authenticator data")</span></span>
<span data-line=""><span>&#125;</span></span>
<span data-line=""><span>rpIdHash := authenticatorData[0:32]</span></span>
<span data-line=""><span>expectedRpIdHash := sha256.Sum256([]byte("example.com"))</span></span>
<span data-line=""><span>if !bytes.Equal(rpIdHash, expectedRpIdHash[:]) &#123;</span></span>
<span data-line=""><span>	return errors.New("invalid relying party ID")</span></span>
<span data-line=""><span>&#125;</span></span>
<span data-line=""><span>// Check for the "user present" flag.</span></span>
<span data-line=""><span>if (authenticatorData[32] &amp; 1) != 1 &#123;</span></span>
<span data-line=""><span>	return errors.New("invalid flag")</span></span>
<span data-line=""><span>&#125;</span></span></code>`),t(e,n)},$$slots:{default:!0}});var V=a(a(L,!0));l(V,{children:(e,p)=>{var n=Ta();t(e,n)},$$slots:{default:!0}});var na=a(a(V,!0)),ea=y(na);m(ea,{class:"Serendipity Midnight Serendipity Morning",tabindex:"0","data-language":"untype","data-theme":"Serendipity Midnight Serendipity Morning",children:(e,p)=>{var n=f(),r=i(n);h(r,()=>`<code data-language="untype" data-theme="Serendipity Midnight Serendipity Morning" style="display: grid;"><span data-line=""><span>import (</span></span>
<span data-line=""><span>	"crypto/ecdsa"</span></span>
<span data-line=""><span>	"crypto/sha256"</span></span>
<span data-line=""><span>	"errors"</span></span>
<span data-line=""><span>)</span></span>
<span data-line=""> </span>
<span data-line=""><span>var publicKey *ecdsa.PublicKey</span></span>
<span data-line=""><span>var signature []byte</span></span>
<span data-line=""> </span>
<span data-line=""><span>hashedClientDataJSON := sha256.Sum256(clientDataJSON)</span></span>
<span data-line=""><span>// Concatenate the authenticator data with the hashed client data JSON.</span></span>
<span data-line=""><span>data := append(authenticatorData, hashedClientDataJSON[:]...)</span></span>
<span data-line=""><span>hash := sha256.Sum256(data)</span></span>
<span data-line=""> </span>
<span data-line=""><span>validSignature := ecdsa.VerifyASN1(publicKey, hash[:], signature)</span></span>
<span data-line=""><span>if !validSignature &#123;</span></span>
<span data-line=""><span>	return errors.New("invalid signature")</span></span>
<span data-line=""><span>&#125;</span></span></code>`),t(e,n)},$$slots:{default:!0}}),t(F,w)},$$slots:{default:!0}}),t(Y,b)}export{Wa as default,xa as metadata};
