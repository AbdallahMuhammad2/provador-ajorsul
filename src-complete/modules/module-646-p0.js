/*
 * Module 646 (Pattern 0)
 * Params: d, o, c
 * Size: 1812 chars
 */

// === MODULE CONTENT ===
function module646(d, o, c) {
var h = c(364)
          , _ = c.n(h)()(function(b) {
            return b[1]
        });
        _.push([d.id, '#assetManagerLoadingScreen{
z-index:300;
position:absolute;
bottom:0;
right:0;
min-width:100%;
min-height:100%;
color:#333;
font-size:1rem;
gap:1rem;
display:flex;
align-content:center;
justify-content:center;
align-items:center;
flex-direction:column;
opacity:1;
transition:opacity .5s ease-in-out,min-width .5s,min-height .5s,bottom .5s,right .5s;
overflow:hidden;
background:rgba(0,0,0,0);-webkit-backdrop-filter:blur(16px);
backdrop-filter:blur(16px);
background-blend-mode:luminosity;--b-opacity: 0.8;--b-background: #ffffff}#assetManagerLoadingScreen::before{
content:"";
position:absolute;
top:0;
left:0;
width:100%;
height:100%;
z-index:-1;
opacity:var(--b-opacity);
background:var(--b-background)}#assetManagerLoadingScreenContent{
padding-top:.5rem}.loadingScreenProcessState{
font-weight:bold}#assetManagerLoadingScreen.minimizedLoadingScreen{
top:unset;
left:unset;
bottom:2rem;
right:2rem;
min-width:0;
min-height:0;
max-width:80vw;
max-height:80vh;
width:-moz-max-content;
width:max-content;
height:-moz-max-content;
height:max-content;
padding:1.5rem;
border-radius:.5rem}.loadingScreenFilesElement{
min-height:4rem;
padding:1rem}.loadingScreenLogoElement{
margin-bottom:.5rem;
max-width:80%}.loadingScreenLogoElement img{
min-height:3rem;
max-height:5rem;
max-width:100%;-o-object-fit:contain;
object-fit:contain}.loadingScreenLogoImage{
width:-moz-max-content;
width:max-content;
height:-moz-max-content;
height:max-content}.minimizedLoadingScreen .loadingScreenLoadingElement{
display:none}.minimizedLoadingScreen .loadingScreenFilesElement{
min-height:0}.minimizedLoadingScreen .loadingScreenLogoElement{
min-height:0;
display:none}.minimizedLoadingScreen #assetManagerLoadingScreenContent{
display:none}', ""]),
        o.A = _
}

export default module646;
