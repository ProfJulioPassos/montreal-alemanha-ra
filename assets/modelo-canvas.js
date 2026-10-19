/* Montreal 2026. Portão de Brandemburgo — maquete 3D feita com Canvas.
   Sem dependências externas, funciona até offline. Representação estilizada. */
(()=>{'use strict';
const cvs=document.getElementById('monument-canvas'); if(!cvs)return;
const ctx=cvs.getContext('2d'); if(!ctx){document.getElementById('view-status').textContent='O navegador não suporta Canvas 2D.';return;}
const shapes=[];
const pal={stone:'#d7c6a0',trim:'#f5e1b9',shadow:'#ad9068',base:'#bfa275',patina:'#75a994',metal:'#477764',dark:'#6c553a'};
function box(x,y,z,w,h,d,color='stone'){
  const v=[[-1,-1,-1],[1,-1,-1],[1,1,-1],[-1,1,-1],[-1,-1,1],[1,-1,1],[1,1,1],[-1,1,1]].map(p=>[x+p[0]*w/2,y+p[1]*h/2,z+p[2]*d/2]);
  const faces=[[0,1,2,3],[4,7,6,5],[0,4,5,1],[3,2,6,7],[1,5,6,2],[4,0,3,7]];
  for(const [i,f] of faces.entries())shapes.push({points:f.map(k=>v[k]),color:pal[color],shade:[.61,.94,.66,1,.78,.56][i]});
}
function cyl(x,y,z,r,h,color='stone',sides=12){
 const top=[],bottom=[];
 for(let i=0;i<sides;i++){const a=i/sides*Math.PI*2;top.push([x+Math.cos(a)*r,y+h/2,z+Math.sin(a)*r]);bottom.push([x+Math.cos(a)*r,y-h/2,z+Math.sin(a)*r]);}
 for(let i=0;i<sides;i++)shapes.push({points:[top[i],bottom[i],bottom[(i+1)%sides],top[(i+1)%sides]],color:pal[color],shade:.65+.32*Math.max(0,Math.cos(i/sides*2*Math.PI+.45))});
 shapes.push({points:top,color:pal[color],shade:1.05});
}
function orb(x,y,z,r,color='metal'){
 for(let j=0;j<5;j++){const lo=-Math.PI/2+j*Math.PI/5,hi=lo+Math.PI/5; for(let i=0;i<10;i++){const a=i*Math.PI/5,b=(i+1)*Math.PI/5;
 const p=(u,t)=>[x+r*Math.cos(u)*Math.cos(t),y+r*Math.sin(u),z+r*Math.cos(u)*Math.sin(t)];
 shapes.push({points:[p(lo,a),p(lo,b),p(hi,b),p(hi,a)],color:pal[color],shade:.75+.25*Math.cos(lo)});
 }}
}
function build(){
 box(0,.07,0,5.25,.14,1.90,'base');box(0,.17,0,5.05,.08,1.72,'stone');box(0,.24,0,4.90,.07,1.61,'trim');
 for(let z of [-.48,.48])for(let i=0;i<6;i++){
 const x=-2.15+i*.86;
 box(x,.33,z,.40,.17,.39,'base');box(x,.44,z,.34,.10,.34,'trim');
 cyl(x,1.41,z,.164,1.89,'stone');
 for(let j=0;j<10;j++){const a=j*Math.PI/5;cyl(x+.132*Math.cos(a),1.41,z+.132*Math.sin(a),.013,1.82,'trim',6);}
 box(x,2.40,z,.39,.14,.39,'trim');box(x,2.51,z,.46,.11,.42,'shadow');
 }
 box(0,2.59,0,5.01,.18,1.62,'trim');box(0,2.74,0,5.12,.17,1.7,'base');
 box(0,2.92,0,5.10,.28,1.57,'stone');
 for(let z of [-.79,.79])for(let i=0;i<24;i++)box(-2.41+i*.21,2.93,z,.055,.19,.023,'shadow');
 box(0,3.12,0,5.22,.13,1.73,'trim');box(0,3.22,0,5.30,.10,1.79,'base');
 box(0,3.35,0,1.50,.08,.75,'metal');
 for(let i=0;i<4;i++){
 const x=-.54+i*.36;
 orb(x,3.65,.17,.17,'metal');cyl(x,3.84,.33,.085,.37,'patina',10);orb(x,4.06,.42,.115,'metal');
 box(x,4.03,.52,.14,.07,.20,'metal');
 for(let zz of [.04,.27])for(let off of [-.09,.09])cyl(x+off,3.46,zz,.033,.26,'metal',8);
 }
 box(0,3.50,-.30,.61,.30,.33,'metal');
 for(let x of [-.38,.38]){cyl(x,3.38,-.32,.16,.06,'patina',16);}
 cyl(0,3.93,-.28,.13,.48,'patina');orb(0,4.26,-.28,.13,'patina');box(0,4.12,-.25,.38,.07,.13,'metal');
 cyl(.21,4.34,-.28,.03,.40,'metal');orb(.21,4.57,-.28,.09,'patina');
}
build();
let yaw=-.38,pitch=-.14,zoom=10.3,w=0,h=0,dpr=1,down=false,px=0,py=0,raf=0;
function rgb(hex,shade){let n=parseInt(hex.slice(1),16);let v=[(n>>16)&255,(n>>8)&255,n&255].map(x=>Math.round(Math.min(255,Math.max(0,x*shade))));return `rgb(${v.join(',')})`}
function project(p){let x=p[0],y=p[1]-2.1,z=p[2];let cy=Math.cos(yaw),sy=Math.sin(yaw),cp=Math.cos(pitch),sp=Math.sin(pitch);
 let xr=x*cy+z*sy,zr=-x*sy+z*cy,yr=y*cp-zr*sp,zp=y*sp+zr*cp;
 let depth=Math.max(.35,zoom-zp),f=Math.min(w*1.46,h*1.13);
 return {x:w*.5+xr*f/depth,y:h*.49-yr*f/depth,z:depth};
}
function draw(){raf=0;if(!w||!h)return;
 const bg=ctx.createRadialGradient(w*.5,h*.43,5,w*.5,h*.65,Math.max(w,h)*.75);bg.addColorStop(0,'#24405a');bg.addColorStop(.55,'#10273e');bg.addColorStop(1,'#071424');ctx.fillStyle=bg;ctx.fillRect(0,0,w,h);
 ctx.fillStyle='rgba(230,206,153,.035)';for(let j=0;j<26;j++){let xx=(j*217%1000)/1000*w,yy=(j*331%1000)/1000*h;ctx.beginPath();ctx.arc(xx,yy,(j%3)+.6,0,Math.PI*2);ctx.fill()}
 const yy=h*.78;let glow=ctx.createRadialGradient(w/2,yy,8,w/2,yy,w*.54);glow.addColorStop(0,'rgba(218,176,104,.2)');glow.addColorStop(1,'rgba(218,176,104,0)');ctx.fillStyle=glow;ctx.fillRect(0,h*.42,w,h*.58);
 let arr=shapes.map(s=>{let pts=s.points.map(project);return {pts,color:rgb(s.color,s.shade),depth:pts.reduce((sum,p)=>sum+p.z,0)/pts.length}}).sort((a,b)=>b.depth-a.depth);
 for(let s of arr){ctx.fillStyle=s.color;ctx.beginPath();ctx.moveTo(s.pts[0].x,s.pts[0].y);for(let k=1;k<s.pts.length;k++)ctx.lineTo(s.pts[k].x,s.pts[k].y);ctx.closePath();ctx.fill();ctx.strokeStyle='rgba(21,26,35,.11)';ctx.lineWidth=.6;ctx.stroke()}
}
function rerender(){if(!raf)raf=requestAnimationFrame(draw)}
function resize(){const r=cvs.getBoundingClientRect();w=r.width;h=r.height;dpr=Math.min(window.devicePixelRatio||1,2);cvs.width=Math.max(1,Math.round(w*dpr));cvs.height=Math.max(1,Math.round(h*dpr));ctx.setTransform(dpr,0,0,dpr,0,0);rerender();}
cvs.addEventListener('pointerdown',e=>{down=true;px=e.clientX;py=e.clientY;cvs.setPointerCapture?.(e.pointerId)});
cvs.addEventListener('pointermove',e=>{if(!down)return;yaw+=(e.clientX-px)*.008;pitch=Math.max(-.50,Math.min(.48,pitch+(e.clientY-py)*.006));px=e.clientX;py=e.clientY;rerender()});
for(const k of ['pointerup','pointercancel','lostpointercapture'])cvs.addEventListener(k,()=>down=false);
cvs.addEventListener('wheel',e=>{e.preventDefault();zoom=Math.min(17,Math.max(6.3,zoom+e.deltaY*.012));rerender()},{passive:false});
const zi=document.getElementById('zoom-in'),zo=document.getElementById('zoom-out'),reset=document.getElementById('reset');
zi.onclick=()=>{zoom=Math.max(6.3,zoom-1);rerender()};zo.onclick=()=>{zoom=Math.min(17,zoom+1);rerender()};reset.onclick=()=>{yaw=-.38;pitch=-.14;zoom=10.3;rerender()};
window.addEventListener('resize',resize);resize();
document.getElementById('view-status').textContent='Maquete 3D pronta • Gire com o dedo';
})();
