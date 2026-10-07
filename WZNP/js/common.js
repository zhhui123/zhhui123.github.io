(function(){
  var c=document.getElementById('particles');
  if(!c) return;
  var ctx=c.getContext('2d');
  var W,H,particles=[];
  function resize(){
    W=c.width=window.innerWidth;
    H=c.height=window.innerHeight;
  }
  window.addEventListener('resize',resize);
  resize();
  var count=Math.min(80,Math.floor((W*H)/18000));
  for(var i=0;i<count;i++){
    particles.push({
      x:Math.random()*W,y:Math.random()*H,
      vx:(Math.random()-.5)*.4,vy:(Math.random()-.5)*.4,
      r:Math.random()*1.5+1,o:Math.random()*.4+.2
    });
  }
  function draw(){
    ctx.clearRect(0,0,W,H);
    for(var i=0;i<particles.length;i++){
      var p=particles[i];
      p.x+=p.vx;p.y+=p.vy;
      if(p.x<0||p.x>W) p.vx*=-1;
      if(p.y<0||p.y>H) p.vy*=-1;
      ctx.beginPath();
      ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
      ctx.fillStyle='rgba(13,77,150,'+p.o+')';
      ctx.fill();
    }
    for(var i=0;i<particles.length;i++){
      for(var j=i+1;j<particles.length;j++){
        var a=particles[i],b=particles[j];
        var dx=a.x-b.x,dy=a.y-b.y;
        var d2=dx*dx+dy*dy;
        if(d2<110*110){
          ctx.beginPath();
          ctx.moveTo(a.x,a.y);ctx.lineTo(b.x,b.y);
          ctx.strokeStyle='rgba(13,77,150,'+(0.18*(1-d2/(110*110)))+')';
          ctx.stroke();
        }
      }
    }
    requestAnimationFrame(draw);
  }
  draw();
})();
