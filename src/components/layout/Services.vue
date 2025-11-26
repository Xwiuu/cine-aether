<script setup>
import { onMounted, onUnmounted } from 'vue';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    id: '01',
    title: 'IMMERSIVE',
    subtitle: 'WEBGL / VUE / 3D',
    desc: 'A internet não é plana. Criamos profundidade onde antes havia apenas pixels.',
    video: 'https://cdn.coverr.co/videos/coverr-abstract-purple-lines-2530/1080p.mp4',
    specs: ['THREE.JS', 'GLSL SHADERS', 'PHYSICS']
  },
  {
    id: '02',
    title: 'MOTION',
    subtitle: 'NARRATIVE DESIGN',
    desc: 'Atenção é a moeda. O movimento é o ladrão. Nós roubamos a atenção do usuário.',
    video: 'https://cdn.coverr.co/videos/coverr-loading-bar-concept-4577/1080p.mp4',
    specs: ['FRAMER MOTION', 'GSAP', 'LOTTIE']
  },
  {
    id: '03',
    title: 'SYSTEMS',
    subtitle: 'AI & AUTOMATION',
    desc: 'Interfaces que pensam. Conectamos design com inteligência de dados real.',
    video: 'https://cdn.coverr.co/videos/coverr-white-lines-loop-4615/1080p.mp4',
    specs: ['OPENAI API', 'PYTHON', 'NEURAL NETS']
  }
];

onMounted(() => {
  const cards = gsap.utils.toArray('.service-card');
  
  cards.forEach(card => {
    gsap.from(card.querySelectorAll('.anim-item'), {
      y: 30,
      opacity: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: card,
        start: "top 60%",
        toggleActions: "play none none reverse"
      }
    });
  });
});

onUnmounted(() => {
  ScrollTrigger.getAll().forEach(t => t.kill());
});
</script>

<template>
  <section class="relative w-full bg-black">
    
    <div class="h-[50vh] w-full flex flex-col items-center justify-center sticky top-0 bg-black z-0 border-b border-white/10">
        <p class="text-gray-500 tracking-[1em] text-xs uppercase mb-8 md:mb-10">System Modules</p>
        <h2 class="text-5xl md:text-8xl font-black text-white tracking-tighter mix-blend-difference text-center px-4">
            CAPABILITIES
        </h2>
    </div>

    <div class="relative z-10 w-full">
      
      <div 
        v-for="(service, index) in services" 
        :key="service.id"
        class="service-card sticky top-0 w-full h-screen border-t border-white/20 overflow-hidden"
        :style="{ zIndex: index + 1 }"
      >
        
        <div class="absolute inset-0 z-0 bg-black">
            <video 
              class="w-full h-full object-cover opacity-40 filter grayscale contrast-125"
              autoplay loop muted playsinline
            >
              <source :src="service.video" type="video/mp4">
            </video>
            <div class="absolute inset-0 bg-black/60"></div>
            <div class="absolute inset-0 bg-[url('/noise.png')] opacity-20 mix-blend-overlay"></div>
        </div>

        <div class="relative z-10 w-full h-full grid grid-rows-[auto_1fr_auto] px-8 md:px-24 py-16 md:py-24 max-w-[1800px] mx-auto">
            
            <!-- Top: Subtitle -->
            <div class="flex items-center gap-4 anim-item">
                <span class="w-12 md:w-16 h-[2px] bg-neon"></span>
                <span class="text-neon font-mono text-sm md:text-base tracking-[0.2em] uppercase">
                    {{ service.subtitle }}
                </span>
            </div>

            <!-- Middle: Title (centered) -->
            <div class="flex items-center justify-center anim-item">
                <h2 class="text-[10vw] md:text-[8vw] lg:text-[6vw] font-black text-white leading-[0.9] tracking-tighter uppercase mix-blend-overlay">
                  {{ service.title }}
                </h2>
            </div>

            <!-- Bottom: Description & Tags (footer) -->
            <div class="flex flex-col xl:flex-row items-start xl:items-end justify-between gap-8 md:gap-12 border-t border-white/20 pt-8 md:pt-10 anim-item bg-black/30 backdrop-blur-md p-16 md:p-20 rounded-lg">
                
                <p class="text-base md:text-lg lg:text-xl text-gray-300 font-light max-w-xl leading-relaxed">
                    {{ service.desc }}
                </p>

                <div class="flex flex-wrap gap-4 md:gap-5">
                    <span v-for="spec in service.specs" :key="spec" 
                          class="border border-white/20 px-4 md:px-5 py-1.5 md:py-2 rounded-full text-xs text-gray-300 uppercase tracking-wider hover:border-white/40 hover:text-white transition-all cursor-default">
                        {{ spec }}
                    </span>
                </div>
            </div>

        </div>

        <span class="absolute top-1/2 right-6 md:right-12 lg:right-16 -translate-y-1/2 text-[25vh] md:text-[30vh] font-black text-white/5 select-none pointer-events-none z-0">
            {{ service.id }}
        </span>

      </div>

    </div>

    <div class="h-[30vh] md:h-[25vh] bg-black"></div>

  </section>
</template>