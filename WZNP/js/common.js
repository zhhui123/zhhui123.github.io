/* 粒子连线背景 */
(function(){
  var canvas = document.getElementById('particles');
  if(!canvas) return;
  var ctx = canvas.getContext('2d');
  var particles = [];
  function resize(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);
  var COUNT = Math.min(70, Math.floor(window.innerWidth / 18));
  for (var i = 0; i < COUNT; i++){
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - .5) * .35,
      vy: (Math.random() - .5) * .35,
      r: Math.random() * 1.6 + .4,
      o: Math.random() * .5 + .15
    });
  }
  function tick(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (var i = 0; i < particles.length; i++){
      var p = particles[i];
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0 || p.x > canvas.width) p.vx = -p.vx;
      if (p.y < 0 || p.y > canvas.height) p.vy = -p.vy;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(13,77,150,' + p.o + ')';
      ctx.fill();
    }
    for (var a = 0; a < particles.length; a++){
      for (var b = a + 1; b < particles.length; b++){
        var dx = particles[a].x - particles[b].x;
        var dy = particles[a].y - particles[b].y;
        var d2 = dx * dx + dy * dy;
        if (d2 < 110 * 110){
          ctx.beginPath();
          ctx.moveTo(particles[a].x, particles[a].y);
          ctx.lineTo(particles[b].x, particles[b].y);
          ctx.strokeStyle = 'rgba(13,77,150,' + (0.18 * (1 - d2 / (110 * 110))) + ')';
          ctx.stroke();
        }
      }
    }
    requestAnimationFrame(tick);
  }
  tick();
})();
