(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))r(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const c of o.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&r(c)}).observe(document,{childList:!0,subtree:!0});function i(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerPolicy&&(o.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?o.credentials="include":e.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function r(e){if(e.ep)return;e.ep=!0;const o=i(e);fetch(e.href,o)}})();const m=async()=>{try{return(await navigator.mediaDevices.enumerateDevices()).some(n=>n.kind==="videoinput")}catch(t){return console.error("获取设备失败：",t),!1}};let a=null,l=null;const u=async()=>{try{const t=await navigator.mediaDevices.getUserMedia({video:{facingMode:"user",width:{ideal:720},height:{ideal:720}}}),n=document.getElementById("video");return n.setAttribute("playsinline","true"),n.muted=!0,a=t,n.srcObject=t,await n.play(),!0}catch(t){const n=document.getElementById("no-camera");let i="";const r=t&&t.name?t.name:"";return r==="NotAllowedError"?i="未授权摄像头，请在浏览器设置中允许摄像头权限":r==="NotFoundError"?i="未检测到摄像头设备":i="无法打开摄像头："+(t&&t.message?t.message:""),n&&(n.textContent=i),!1}},y=()=>{a&&(a.getTracks().forEach(t=>t.stop()),a=null)},p=()=>{const t=document.getElementById("video"),n=document.querySelector(".round-preview"),i=t.videoWidth,r=t.videoHeight;if(!i||!r)return;const e=Math.min(i,r),o=(i-e)/2,c=(r-e)/2,d=document.createElement("canvas");d.width=e,d.height=e,d.getContext("2d").drawImage(t,o,c,e,e,0,0,e,e),l=d.toDataURL("image/jpeg",.9),y(),t.style.display="none";let s=document.getElementById("captured");s||(s=document.createElement("img"),s.id="captured",n.appendChild(s)),s.src=l,s.style.display="block"},f=async()=>{const t=document.getElementById("video"),n=document.getElementById("captured");n&&(n.style.display="none"),t.style.display="block",await u()},v=async()=>{const t=document.querySelector("#app");t.innerHTML=`
  <div class="container">
    <div class="card left" id="left-card">
      <button id="btn-start">开始拍照</button>
      <div class="notice" id="no-camera"></div>
    </div>
    <div class="card right" id="right-card" style="display:none">
      <div class="title">请将脸完整移入框内</div>
      <div class="round-preview">
        <video id="video" autoplay playsinline muted></video>
      </div>
      <div class="actions">
        <button id="btn-retake">重新拍照</button>
        <button id="btn-confirm">确认</button>
      </div>
    </div>
  </div>
`;const n=document.getElementById("btn-start"),i=document.getElementById("no-camera");await m()||(n.disabled=!0,i.textContent="当前浏览器不支持摄像头"),n.addEventListener("click",async()=>{const e=document.getElementById("left-card"),o=document.getElementById("right-card");e.style.display="none",o.style.display="block",await u()}),document.getElementById("btn-retake").addEventListener("click",f),document.getElementById("btn-confirm").addEventListener("click",p)};v();
