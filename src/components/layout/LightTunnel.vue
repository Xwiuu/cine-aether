<script setup>
import { onMounted, onUnmounted, ref } from 'vue';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const sectionRef = ref(null);
const canvasRef = ref(null);
const videoWrapperRef = ref(null);
const overlayRef = ref(null);
const videoElement = ref(null);

// Estados da Animação
let ctx = null;
let animationId = null;
let stars = [];
let speed = 0.1; 
let warpFactor = 0;
const starCount = 1000; // Quantidade de estrelas

const centerX = window.innerWidth / 2;
const centerY = window.innerHeight / 2;

// Classe da Estrela (Física do Túnel)
class Star {
  constructor() {
    this.reset();
    this.z = Math.random() * 2000; 
  }

  reset() {
    this.x = (Math.random() - 0.5) * window.innerWidth * 4; 
    this.y = (Math.random() - 0.5) * window.innerHeight * 4;
    this.z = 2000; 
    this.px = 0;
    this.py = 0;
  }

  update() {
    this.z -= speed * 25; // Velocidade baseada no scroll

    if (this.z <= 1) {
      this.reset();
    }
  }

  draw() {
    const sx = (this.x / this.z) * centerX + centerX;
    const sy = (this.y / this.z) * centerY + centerY;

    const prevZ = this.z + (speed * 40); 
    const px = (this.x / prevZ) * centerX + centerX;
    const py = (this.y / prevZ) * centerY + centerY;

    if (sx < 0 || sx > window.innerWidth || sy < 0 || sy > window.innerHeight) return;

    const size = (1 - this.z / 2000) * 3; 
    
    // EFEITO RGB (Quando acelera muito)
    if (warpFactor > 0.1) {
        ctx.beginPath();
        ctx.strokeStyle = `rgba(255, 0, 0, ${0.5 * warpFactor})`;
        ctx.lineWidth = size;
        ctx.moveTo(px - (2 * warpFactor), py - (2 * warpFactor));
        ctx.lineTo(sx - (2 * warpFactor), sy - (2 * warpFactor));
        ctx.stroke();

        ctx.beginPath();
        ctx.strokeStyle = `rgba(0, 255, 255, ${0.5 * warpFactor})`;
        ctx.lineWidth = size;
        ctx.moveTo(px + (2 * warpFactor), py + (2 * warpFactor));
        ctx.lineTo(sx + (2 * warpFactor), sy + (2 * warpFactor));
        ctx.stroke();
    }

    ctx.beginPath();
    ctx.strokeStyle = `rgba(255, 255, 255, ${Math.min(1, (2000 - this.z) / 500)})`;
    ctx.lineWidth = size;
    ctx.lineCap = 'round';
    ctx.moveTo(px, py);
    ctx.lineTo(sx, sy);
    ctx.stroke();
  }
}

const initCanvas = () => {
  const canvas = canvasRef.value;
  ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  
  stars = [];
  for (let i = 0; i < starCount; i++) {
    stars.push(new Star());
  }
};

const animate = () => {
  // Rastro de Motion Blur (Preto com transparência)
  ctx.fillStyle = `rgba(11, 11, 11, ${0.3 + (warpFactor * 0.4)})`; 
  ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);

  stars.forEach(star => {
    star.update();
    star.draw();
  });

  animationId = requestAnimationFrame(animate);
};

onMounted(() => {
  initCanvas();
  animate();
  window.addEventListener('resize', initCanvas);

  // Configura o vídeo para começar invisível e atrás
  gsap.set(videoWrapperRef.value, { opacity: 0, zIndex: -1 });

  // --- A TIMELINE ÉPICA (GSAP SCROLLTRIGGER) ---
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: sectionRef.value,
      pin: true,
      start: "top top",
      end: "+=8000", // Tempo da viagem
      scrub: 0.1,    // Responsividade
      onUpdate: (self) => {
        // Aumenta a velocidade baseada no scroll
        speed = 0.5 + Math.pow(self.progress * 10, 2); 
        warpFactor = self.progress;
      }
    }
  });

  // 1. O TEXTO VEM COMO UMA PEDRA (TEXTO 1)
  tl.fromTo('.text-1', 
    { scale: 0, opacity: 0, z: 0 }, // Começa minúsculo no fundo
    { scale: 1, opacity: 1, duration: 2, ease: "power3.in" } // Cresce até ficar legível
  )
  .to('.text-1', 
    { scale: 30, opacity: 0, duration: 1, ease: "expo.in" }, // EXPLODE na cara do usuário
    "+=0.5"
  )

  // 2. O TEXTO VEM COMO UMA PEDRA (TEXTO 2)
  .fromTo('.text-2', 
    { scale: 0, opacity: 0 },
    { scale: 1, opacity: 1, duration: 2, ease: "power3.in" }
  )
  .to('.text-2', 
    { scale: 40, opacity: 0, duration: 1, ease: "expo.in" }, 
    "+=0.5"
  )
  
  // 3. WHITEOUT (LUZ NO FIM DO TÚNEL)
  .to('.light-core', {
    scale: 150,     // Engole a tela
    opacity: 1,
    duration: 2,
    ease: "expo.in"
  })

  // 4. REVELAÇÃO DO VÍDEO (SEU SHOWREEL)
  .set(videoWrapperRef.value, { opacity: 1, zIndex: 50 }) // Traz o vídeo pra frente
  .to(overlayRef.value, { opacity: 0, duration: 3, ease: "power2.inOut" }) // O branco some devagar
  .fromTo('.final-video', 
    { scale: 1.5 }, // Zoom out leve no vídeo
    { scale: 1, duration: 3 }, 
    "<"
  );

});

onUnmounted(() => {
  cancelAnimationFrame(animationId);
  window.removeEventListener('resize', initCanvas);
  ScrollTrigger.getAll().forEach(t => t.kill());
});
</script>

<template>
  <section ref="sectionRef" class="h-screen w-full bg-void relative overflow-hidden cursor-none">
    
    <canvas ref="canvasRef" class="absolute inset-0 z-10 w-full h-full"></canvas>

    <div class="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
        <div class="light-core w-2 h-2 bg-white rounded-full shadow-[0_0_100px_white] opacity-0"></div>
    </div>

    <div class="absolute inset-0 grid place-items-center z-30 pointer-events-none px-4">
        
        <div class="text-1 col-start-1 row-start-1 opacity-0 text-center w-full">
            <h2 class="text-[8vw] font-black text-white leading-none tracking-tighter drop-shadow-[0_0_20px_rgba(0,0,0,1)]">
                O MERCADO<br>É <span class="text-gray-500">ESCURO.</span>
            </h2>
        </div>

        <div class="text-2 col-start-1 row-start-1 opacity-0 text-center w-full">
            <h2 class="text-[10vw] font-black text-white leading-none tracking-tighter drop-shadow-[0_0_30px_rgba(255,255,255,0.5)]">
                SEJA A <span class="text-neon italic">LUZ.</span>
            </h2>
        </div>

    </div>

    <div ref="overlayRef" class="absolute inset-0 bg-white z-40 opacity-0 pointer-events-none"></div>

    <div ref="videoWrapperRef" class="absolute inset-0 z-0 opacity-0 bg-black">
        
        <div class="absolute inset-0 flex flex-col items-center justify-center z-50 bg-black/20">
            <h1 class="text-4xl md:text-7xl font-black text-white tracking-[0.2em] mix-blend-overlay mb-8 text-center">
                CINEAETHER
            </h1>
            <button class="px-10 py-4 bg-white text-black font-bold tracking-widest rounded-full hover:scale-110 transition-transform duration-300 shadow-[0_0_30px_rgba(255,255,255,0.5)] cursor-pointer">
                FALAR COM A GENTE
            </button>
        </div>
    </div>

  </section>
</template>

<style scoped>
/* Efeito de Vinheta para dar profundidade e focar no centro */
section::after {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(transparent 30%, #0B0B0B 100%);
    pointer-events: none;
    z-index: 15;
}
</style>
