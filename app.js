const header=document.querySelector('[data-header]');
const onScroll=()=>header.classList.toggle('scrolled',window.scrollY>24);
onScroll();addEventListener('scroll',onScroll,{passive:true});

const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target)}}),{threshold:.14});
document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));

async function loadVideos(){
  const wall=document.querySelector('#video-wall');
  try{
    const response=await fetch('videos.json');
    if(!response.ok) throw new Error('Video manifest unavailable');
    const items=await response.json();
    wall.innerHTML=items.map((item,index)=>`<article class="video-card reveal visible">
      <div class="video-frame"><video controls playsinline preload="metadata" aria-label="Lollapalooza Lab 视频作品 ${index+1}"><source src="${item.src}" type="${item.type||'video/mp4'}">你的浏览器暂不支持视频播放。</video></div>
    </article>`).join('');
  }catch(error){wall.innerHTML='<p class="video-error">视频清单加载失败，请稍后刷新。</p>';}
}
loadVideos();

document.addEventListener('play',event=>{if(event.target.tagName==='VIDEO'){document.querySelectorAll('video').forEach(video=>{if(video!==event.target)video.pause()})}},true);
