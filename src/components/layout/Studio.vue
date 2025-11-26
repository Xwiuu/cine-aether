<script setup>
import { onMounted, onUnmounted, ref } from 'vue';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const canvasRef = ref(null);
const sectionRef = ref(null);
let ctx = null;
let animationId = null;

// AS PALAVRAS DO PODER
const words = ["CRIATIVIDADE", "AUDIOVISUAL", "PRATICIDADE", "IMPACTO", "FUTURO", "CINEAETHER"];
const wordCount = 30; 
const starCount = 200; // Poeira estelar

const objects = [];
let speed = 2;
let isWarping = false;
let colorHue = 260; // Começa no Roxo (HSL)

const mouse = { x: 0, y: 0 };
const center = { x: 0, y: 0 };

// Classe para Poeira Estelar (Dá a sensação de velocidade)
class Star {
  constructor() {
    this.x = (Math.random() - 0.5) * window.innerWidth * 2;
    this.y = (Math.random() - 0.5) * window.innerHeight * 2;
    this.z = Math.random() * 2000;
    this.prevZ = this.z;
  }

  update() {
    this.z -= speed * 1.5; // Estrelas são mais rápidas que palavras
    
    if (this.z < 1) {
      this.z = 2000;
      this.x = (Math.random() - 0.5) * window.innerWidth * 2;
      this.y = (Math.random() - 0.5) * window.innerHeight * 2;
      this.prevZ = this.z;
    }
  }

  draw() {
    const focalLength = 400;
    const scale = focalLength / (focalLength + this.z);
    const x2d = center.x + this.x * scale;
    const y2d = center.y + this.y * scale;

    if (scale < 0) return;

    // Efeito de Rastro (Streak) quando está rápido
    const length = isWarping ? 20 * scale : 2 * scale;

    ctx.fillStyle = isWarping ? '#00C2A8' : '#ffffff'; // Vira turquesa no warp
    ctx.beginPath();
    ctx.rect(x2d, y2d, length, 1 * scale); // Desenha como traço
    ctx.fill();
  }
}

// Classe das Palavras 3D
class Word3D {
  constructor(text, index, total) {
    this.text = text;
    this.angle = (index / total) * Math.PI * 2 * 3; // Espiral
    this.z = (index / total) * 2000;
    this.radius = 350; 
  }

  update() {
    this.z -= speed;

    if (this.z < -200) {
      this.z = 2000;
    }

    // Rotação do túnel baseada no mouse
    const rotX = (mouse.x / window.innerWidth - 0.5) * 2;
    this.angle += rotX * 0.02;
    
    // Se estiver em Warp, gira o túnel inteiro
    if(isWarping) this.angle += 0.05;
  }

  draw() {
    const focalLength = 400;
    const scale = focalLength / (focalLength + this.z);
    
    if (scale < 0) return;

    const x2d = center.x + (Math.cos(this.angle) * this.radius * scale);
    const y2d = center.y + (Math.sin(this.angle) * this.radius * scale);

    ctx.save();
    
    // CAMERA SHAKE (Tremor na tela durante o Warp)
    if (isWarping) {
        const shake = (Math.random() - 0.5) * 10; // Tremor de 10px
        ctx.translate(x2d + shake, y2d + shake);
    } else {
        ctx.translate(x2d, y2d);
    }
    
    ctx.scale(scale, scale);

    // Opacidade e Cor
    const alpha = Math.min(1, (2000 - this.z) / 1000);
    
    // WARP MODE: Efeito agressivo
    if (isWarping) {
        ctx.font = '900 80px "Courier New", monospace'; // Fonte Hacker
        // RGB Split (Sombra Colorida)
        ctx.fillStyle = `rgba(0, 255, 255, ${alpha * 0.7})`; // Ciano
        ctx.fillText(this.text, 8, 0);
        ctx.fillStyle = `rgba(255, 0, 100, ${alpha * 0.7})`; // Magenta
        ctx.fillText(this.text, -8, 0);
        
        ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`; // Branco Puro
    } else {
        ctx.font = '900 60px "Inter", sans-serif';
        // Cor baseada na variável global de Hue (Roxo -> Azul)
        ctx.fillStyle = `hsla(${colorHue}, 100%, 70%, ${alpha})`;
        
        // Glow Neon
        ctx.shadowBlur = 30 * scale;
        ctx.shadowColor = `hsla(${colorHue}, 100%, 50%, 1)`;
    }

    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(this.text, 0, 0);

    ctx.restore();
  }
}

const init = () => {
  objects.length = 0;
  center.x = window.innerWidth / 2;
  center.y = window.innerHeight / 2;

  // Cria as Estrelas primeiro (fundo)
  for (let i = 0; i < starCount; i++) {
    objects.push(new Star());
  }

  // Cria as Palavras depois
  for (let i = 0; i < wordCount; i++) {
    const word = words[i % words.length];
    objects.push(new Word3D(word, i, wordCount));
  }
};

const animate = () => {
  // Rastro (Motion Blur)
  // Durante o Warp, o rastro é maior (menos alpha no fillRect)
  ctx.fillStyle = isWarping ? 'rgba(11, 11, 11, 0.1)' : 'rgba(11, 11, 11, 0.6)';
  ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);

  // Ordena para desenhar fundo primeiro
  objects.sort((a, b) => b.z - a.z);

  objects.forEach(obj => {
    obj.update();
    obj.draw();
  });

  // Lógica de Aceleração e Mudança de Cor
  if (isWarping) {
      if (speed < 80) speed += 2; // Acelera muito
      if (colorHue > 180) colorHue -= 2; // Vira Turquesa (180deg)
  } else {
      if (speed > 2) speed -= 1; // Freia
      if (colorHue < 260) colorHue += 2; // Volta pro Roxo (260deg)
  }

  animationId = requestAnimationFrame(animate);
};

const handleResize = () => {
    canvasRef.value.width = window.innerWidth;
    canvasRef.value.height = window.innerHeight;
    center.x = window.innerWidth / 2;
    center.y = window.innerHeight / 2;
};

const startWarp = () => isWarping = true;
const endWarp = () => isWarping = false;

onMounted(() => {
  const canvas = canvasRef.value;
  ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  init();
  animate();

  window.addEventListener('resize', handleResize);
  window.addEventListener('mousedown', startWarp);
  window.addEventListener('mouseup', endWarp);
  
  // Entrada triunfal
  gsap.from(canvasRef.value, {
    opacity: 0,
    scale: 0.8,
    duration: 1.5,
    ease: "power2.out",
    scrollTrigger: {
      trigger: sectionRef.value,
      start: "top 70%",
    }
  });
});

onUnmounted(() => {
  cancelAnimationFrame(animationId);
  window.removeEventListener('resize', handleResize);
  window.removeEventListener('mousedown', startWarp);
  window.removeEventListener('mouseup', endWarp);
});
</script>

<template>
  <section ref="sectionRef" class="relative h-screen w-full bg-void flex items-center justify-center overflow-hidden z-10 border-t border-white/5 cursor-crosshair">
    
    <canvas 
      ref="canvasRef" 
      class="absolute inset-0 z-10"
      @mousemove="(e) => { mouse.x = e.clientX; mouse.y = e.clientY }"
    ></canvas>

    <div class="absolute bottom-10 z-20 pointer-events-none mix-blend-difference text-center transition-all duration-300" 
         :class="{ 'opacity-0 scale-150 blur-md': isWarping }">
        <h2 class="text-white text-[5vw] font-black leading-none opacity-10 tracking-tighter">VORTEX</h2>
        
        <div class="mt-4 flex flex-col items-center gap-2">
            <span class="text-neon text-[10px] tracking-[0.5em] uppercase animate-pulse">
                SISTEMA PRONTO
            </span>
            <div class="border border-neon/50 px-6 py-2 rounded-full bg-black/50 backdrop-blur-md shadow-[0_0_20px_rgba(124,92,255,0.3)]">
                <span class="text-white text-xs tracking-[0.2em] font-bold">SEGURE PARA ACELERAR</span>
            </div>
        </div>
    </div>

    <div class="absolute inset-0 z-10 pointer-events-none bg-[radial-gradient(transparent_20%,#0B0B0B_100%)]"></div>

  </section>
</template>