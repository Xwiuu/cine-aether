<script setup>
import { onMounted, onUnmounted, ref } from 'vue';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const containerRef = ref(null);

const protocols = [
  {
    id: '01',
    label: 'MISSÃO',
    rawText: 'SYSTEM_OVERRIDE', 
    text: 'Reescrever a complexidade humana em interfaces que transcendem o vidro.'
  },
  {
    id: '02',
    label: 'VISÃO',
    rawText: 'NEURAL_HANDSHAKE',
    text: 'O fim da barreira entre biológico e digital. Software vivo.'
  },
  {
    id: '03',
    label: 'VALORES',
    rawText: 'NO_COMPROMISE',
    text: 'Verdade no código. Estética absoluta. A falha na matrix que cria o novo.'
  }
];

// --- EFEITO HACKER SUPREMO ---
const scrambleText = (element, finalText) => {
  if (!element) return;
  
  // Limpa intervalo anterior
  if (element.dataset.intervalId) clearInterval(element.dataset.intervalId);

  // 1. Configuração Visual "Hacker" (Fonte Mono + Cor Neon)
  element.classList.add('font-mono', 'text-neon', 'glitch-active');
  element.classList.remove('font-sans', 'text-white');

  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_!@#%&<>';
  let iterations = 0;
  
  const interval = setInterval(() => {
    element.innerText = finalText
      .split('')
      .map((letter, index) => {
        if (index < iterations) return finalText[index];
        return chars[Math.floor(Math.random() * chars.length)];
      })
      .join('');
    
    // 2. Quando terminar...
    if (iterations >= finalText.length) {
      clearInterval(interval);
      // Volta para o estilo "Bonito/Final" (Sans Serif + Branco)
      element.classList.remove('font-mono', 'text-neon', 'glitch-active');
      element.classList.add('font-sans', 'text-white');
      element.innerText = finalText; // Garante o texto final limpo
    }
    
    iterations += 1/3; // Velocidade da decodificação
  }, 40);

  element.dataset.intervalId = interval;
};

onMounted(() => {
  const slides = gsap.utils.toArray('.protocol-slide');
  
  // Setup Inicial
  gsap.set(slides, { opacity: 0, xPercent: 100, skewX: 30, scale: 0.8 }); 
  gsap.set(slides[0], { opacity: 1, xPercent: 0, skewX: 0, scale: 1 });

  // Dispara o efeito no primeiro slide
  setTimeout(() => {
    const title = slides[0].querySelector('.mega-title');
    const desc = slides[0].querySelector('.desc-text');
    scrambleText(title, protocols[0].label);
    gsap.fromTo(desc, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 1, delay: 0.5 });
  }, 500);

  let tl = gsap.timeline({
    scrollTrigger: {
      trigger: containerRef.value,
      pin: true,
      start: "top top",
      end: "+=5000",
      scrub: 1,
    }
  });

  slides.forEach((slide, i) => {
    if (i === slides.length - 1) return;

    const nextSlide = slides[i + 1];
    const nextTitle = nextSlide.querySelector('.mega-title');
    const nextDesc = nextSlide.querySelector('.desc-text');
    
    // Slide Atual (Saída Dramática)
    tl.to(slide, {
      xPercent: -120,
      skewX: -45, // Inclinação agressiva na saída
      opacity: 0,
      filter: "blur(40px)",
      scale: 1.5,
      duration: 1.5,
      ease: "power3.inOut"
    })
    
    // Próximo Slide (Entrada Explosiva)
    .fromTo(nextSlide, 
      { 
        xPercent: 120, 
        skewX: 45, // Inclinação agressiva na entrada
        opacity: 0, 
        filter: "blur(40px)",
        scale: 0.5
      },
      { 
        xPercent: 0, 
        skewX: 0, 
        opacity: 1, 
        filter: "blur(0px)",
        scale: 1,
        duration: 1.5,
        ease: "power3.out",
        onStart: () => {
          // Dispara o Hacker Effect
          scrambleText(nextTitle, protocols[i + 1].label);
          
          // Anima o texto de descrição subindo suavemente
          gsap.fromTo(nextDesc, 
            { y: 50, opacity: 0 },
            { y: 0, opacity: 1, duration: 1, ease: "power2.out", delay: 0.2 }
          );
        }
      }, 
      "-=1.3"
    );
  });
});

onUnmounted(() => {
  ScrollTrigger.getAll().forEach(t => t.kill());
});
</script>

<template>
  <section ref="containerRef" class="h-screen w-full bg-void relative overflow-hidden flex items-center justify-start pl-4 md:pl-20 lg:pl-32">
    
    <div class="absolute inset-0 pointer-events-none opacity-30 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay"></div>
    <div class="absolute inset-0 bg-gradient-to-r from-void via-transparent to-transparent z-10"></div>
    
    <div ref="sliderRef" class="relative w-full max-w-[90vw] h-[80vh] flex items-center z-20">
      
      <div 
        v-for="item in protocols" 
        :key="item.id"
        class="protocol-slide absolute w-full flex flex-col justify-center"
      >
        <span class="absolute -left-10 md:-left-20 top-1/2 -translate-y-1/2 text-[20rem] md:text-[45rem] font-black leading-none opacity-5 select-none pointer-events-none font-sans italic"
              style="-webkit-text-stroke: 4px white; color: transparent; z-index: -1;">
          {{ item.id }}
        </span>

        <div class="relative">
          
          <div class="flex items-center gap-6 mb-4 overflow-hidden">
            <div class="w-16 md:w-32 h-[2px] bg-neon animate-pulse"></div>
            <span class="text-neon font-mono text-sm md:text-lg tracking-[0.5em]">PROTOCOL_{{ item.id }}</span>
          </div>

          <h2 class="mega-title text-[13vw] font-black leading-[0.8] tracking-tighter uppercase transition-colors duration-300">
            {{ item.label }}
          </h2>

          <div class="mt-8 md:mt-12 max-w-3xl border-l-2 border-neon/50 pl-8 relative overflow-hidden group">
            <div class="absolute inset-0 bg-gradient-to-r from-neon/10 to-transparent -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out"></div>
            
            <h3 class="text-white/60 font-mono text-lg mb-2">> {{ item.rawText }}</h3>
            <p class="desc-text text-xl md:text-4xl text-white font-light leading-tight">
              {{ item.text }}
            </p>
          </div>

        </div>
      </div>

    </div>

  </section>
</template>

<style scoped>
/* Efeito de Glitch Cromático quando o texto está decodificando */
.glitch-active {
  text-shadow: 
    3px 0px 0px rgba(255, 0, 0, 0.7), 
    -3px 0px 0px rgba(0, 0, 255, 0.7);
  animation: jitter 0.2s infinite;
}

@keyframes jitter {
  0% { transform: translate(0,0); }
  25% { transform: translate(2px, 2px); }
  50% { transform: translate(-2px, -2px); }
  75% { transform: translate(2px, -2px); }
  100% { transform: translate(0,0); }
}

.mega-title {
  /* Garante que a troca de fonte não mude drasticamente a altura da linha */
  line-height: 0.85; 
  white-space: nowrap;
}
</style>