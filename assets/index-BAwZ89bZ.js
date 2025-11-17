(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))c(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const s of o.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&c(s)}).observe(document,{childList:!0,subtree:!0});function i(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerPolicy&&(o.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?o.credentials="include":e.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function c(e){if(e.ep)return;e.ep=!0;const o=i(e);fetch(e.href,o)}})();const m=async()=>{try{return(await navigator.mediaDevices.enumerateDevices()).some(n=>n.kind==="videoinput")}catch(t){return console.error("获取设备失败：",t),!1}};let d=null,l=null;const u=async()=>{try{const t=await navigator.mediaDevices.getUserMedia({video:{facingMode:"user"}}),n=document.getElementById("video");return d=t,n.srcObject=t,await n.play(),!0}catch(t){const n=document.getElementById("no-camera");return n&&(n.textContent="无法打开摄像头："+(t&&t.message?t.message:"")),!1}},v=()=>{d&&(d.getTracks().forEach(t=>t.stop()),d=null)},y=()=>{const t=document.getElementById("video"),n=document.querySelector(".round-preview"),i=t.videoWidth,c=t.videoHeight;if(!i||!c)return;const e=Math.min(i,c),o=(i-e)/2,s=(c-e)/2,a=document.createElement("canvas");a.width=e,a.height=e,a.getContext("2d").drawImage(t,o,s,e,e,0,0,e,e),l=a.toDataURL("image/jpeg",.9),v(),t.style.display="none";let r=document.getElementById("captured");r||(r=document.createElement("img"),r.id="captured",n.appendChild(r)),r.src=l,r.style.display="block"},p=async()=>{const t=document.getElementById("video"),n=document.getElementById("captured");n&&(n.style.display="none"),t.style.display="block",await u()},f=async()=>{const t=document.querySelector("#app");t.innerHTML=`
  <div class="container">
    <div class="card left">
      <div class="avatar-placeholder">
        <div class="avatar-circle"></div>
      </div>
      <button id="btn-start">拍照</button>
      <div class="notice" id="no-camera"></div>
    </div>
    <div class="card right" id="right-card" style="display:none">
      <div class="title">请将脸完整移入框内</div>
      <div class="round-preview">
        <video id="video" autoplay playsinline></video>
      </div>
      <div class="actions">
        <button id="btn-retake">重新拍照</button>
        <button id="btn-confirm">确认</button>
      </div>
    </div>
  </div>
`;const n=await m(),i=document.getElementById("btn-start"),c=document.getElementById("no-camera");n||(i.disabled=!0,c.textContent="未检测到摄像头，请检查设备或浏览器权限"),i.addEventListener("click",async()=>{const e=document.getElementById("right-card");e.style.display="block",await u()}),document.getElementById("btn-retake").addEventListener("click",p),document.getElementById("btn-confirm").addEventListener("click",y)};f();
