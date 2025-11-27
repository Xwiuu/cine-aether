<script setup>
import { onMounted, onUnmounted, ref } from 'vue';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const containerRef = ref(null);

const services = [
  {
    id: '01',
    label: 'CORE',
    title: 'IMMERSIVE WEB',
    desc: 'Arquitetura tridimensional no browser. WebGL, Shaders e ambientes que reagem à física.',
    tags: ['Three.js', 'R3F', 'GLSL']
  },
  {
    id: '02',
    label: 'FLOW',
    title: 'MOTION DESIGN',
    desc: 'Narrativa através do movimento. Micro-interações que guiam o olho e retêm a atenção.',
    tags: ['GSAP', 'Lenis', 'Framer']
  },
  {
    id: '03',
    label: 'BRAIN',
    title: 'AI SYSTEMS',
    desc: 'Integração de LLMs e automação. Interfaces que não apenas mostram, mas pensam.',
    tags: ['OpenAI', 'Python', 'N8N']
  }
];

onMounted(() => {
  // Animação sutil de entrada para os elementos de cada card quando fixam
  const cards = gsap.utils.toArray('.service-card');
  
  cards.forEach((card, i) => {
    ScrollTrigger.create({
      trigger: card,
      start: "top top",
      end: "bottom top",
      pin: true,     // O card fixa no topo
      pinSpacing: false, // O próximo card cobre o atual (efeito baralho)
      scrub: true,
      onEnter: () => {
        // Pequeno brilho quando o card "ativa"
        gsap.to(card, { borderColor: 'rgba(124, 92, 255, 0.5)', duration: 0.3 });
      },
      onLeave: () => {
        // Escurece quando é coberto
        gsap.to(card.querySelector('.card-content'), { opacity: 0.2, scale: 0.95, duration: 0.5 });
      },
      onEnterBack: () => {
        gsap.to(card.querySelector('.card-content'), { opacity: 1, scale: 1, duration: 0.5 });
        gsap.to(card, { borderColor: 'rgba(255, 255, 255, 0.1)', duration: 0.3 });
      }
    });
  });
});

onUnmounted(() => {
  ScrollTrigger.getAll().forEach(t => t.kill());
});
</script>

<template>
  <section ref="containerRef" class="relative w-full bg-void pb-20">
    
    <div class="pt-32 pb-16 px-6 md:px-12 flex flex-col items-center justify-center text-center">
      <p class="text-neon font-mono text-xs tracking-[0.4em] uppercase mb-6 animate-pulse">
        System Modules
      </p>
      <h2 class="text-5xl md:text-8xl font-black text-white tracking-tighter uppercase opacity-90">
        Capabilities
      </h2>
    </div>

    <div class="relative w-full max-w-5xl mx-auto px-4">
      
      <div 
        v-for="(service, index) in services" 
        :key="service.id"
        class="service-card sticky top-24 md:top-32 w-full h-[60vh] md:h-[50vh] bg-void border border-white/10 rounded-2xl overflow-hidden backdrop-blur-xl mb-12 shadow-2xl transition-colors duration-500"
        :style="{ zIndex: index + 1 }"
      >
        
        <div class="absolute inset-0 bg-surface/40"></div>
        <div class="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>

        <div class="card-content relative h-full flex flex-col md:flex-row justify-between p-8 md:p-12 lg:p-16 gap-8">
          
          <div class="flex flex-col justify-between items-start h-full">
            <div class="flex items-center gap-4">
              <span class="font-mono text-neon text-sm tracking-widest">/ {{ service.id }}</span>
              <span class="w-12 h-[1px] bg-white/20"></span>
              <span class="font-mono text-gray-500 text-xs tracking-[0.2em] uppercase">{{ service.label }}</span>
            </div>
            
            <h3 class="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-none tracking-tight mt-auto md:mt-0">
              {{ service.title }}
            </h3>
          </div>

          <div class="flex flex-col justify-end md:max-w-xs lg:max-w-sm gap-6 md:gap-10">
            <p class="text-gray-400 text-sm md:text-base font-light leading-relaxed">
              {{ service.desc }}
            </p>
            
            <div class="flex flex-wrap gap-3">
              <span v-for="tag in service.tags" :key="tag" 
                    class="px-3 py-1 rounded border border-white/10 text-[10px] md:text-xs font-mono text-gray-300 uppercase tracking-wider hover:text-neon hover:border-neon/50 transition-colors cursor-default">
                {{ tag }}
              </span>
            </div>
          </div>

          <span class="absolute top-[-10%] right-[-5%] text-[15rem] md:text-[20rem] font-black text-white/[0.02] pointer-events-none select-none leading-none">
            {{ service.id }}
          </span>

        </div>

      </div>

    </div>

    <div class="h-[20vh] w-full bg-void"></div>

  </section>
</template>

<style scoped>
/* Garante performance na animação de fixação */
.service-card {
  will-change: transform, border-color;
}
</style>