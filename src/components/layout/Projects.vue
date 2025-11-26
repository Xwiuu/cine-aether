<script setup>
import { onMounted, onUnmounted, ref } from 'vue';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const sectionRef = ref(null);
const triggerRef = ref(null);

// Dados fictícios dos projetos
const projects = [
  {
    id: '01',
    title: 'NEON GENESIS',
    category: 'Cyberpunk UI',
    description: 'Interface neural para cidades inteligentes.',
    color: 'from-purple-900 to-blue-900' // Gradiente temporário
  },
  {
    id: '02',
    title: 'VOID WALKER',
    category: 'Immersive WebGL',
    description: 'Experiência de exploração espacial em tempo real.',
    color: 'from-gray-900 to-black'
  },
  {
    id: '03',
    title: 'SYNTH MIND',
    category: 'AI Narrative',
    description: 'Chatbot com personalidade sensiente.',
    color: 'from-emerald-900 to-teal-900'
  },
  {
    id: '04',
    title: 'CHROMA DATA',
    category: 'Data Viz',
    description: 'Visualização de big data financeiro.',
    color: 'from-red-900 to-orange-900'
  }
];

onMounted(() => {
  const container = sectionRef.value;
  const totalWidth = container.offsetWidth;
  const amountToScroll = totalWidth - window.innerWidth;

  // A Mágica do Scroll Horizontal
  gsap.to(container, {
    x: -amountToScroll, // Move para a esquerda
    ease: "none",
    scrollTrigger: {
      trigger: triggerRef.value,
      pin: true,     // TRAVA a tela
      scrub: 1,      // Suaviza o movimento
      start: "top top",
      end: "+=3000", // Define a "distância" fictícia do scroll (quanto maior, mais lento)
      // markers: true // Descomente se quiser ver as linhas de debug
    }
  });
});

// Limpeza para não quebrar quando mudar de página (Boas práticas)
onUnmounted(() => {
  ScrollTrigger.getAll().forEach(t => t.kill());
});
</script>

<template>
  <div ref="triggerRef" class="overflow-hidden bg-void relative">
    
    <div class="absolute top-10 left-10 md:left-20 z-20 mix-blend-difference">
      <span class="text-neon text-xs tracking-[0.5em] uppercase font-bold border border-neon/30 px-4 py-2 rounded-full bg-void/50 backdrop-blur-sm">
        Selected Works
      </span>
    </div>

    <div ref="sectionRef" class="flex h-screen w-[400vw]"> <div 
        v-for="project in projects" 
        :key="project.id"
        class="w-screen h-screen flex items-center justify-center relative border-r border-white/5"
      >
        <div class="group relative w-[80vw] md:w-[60vw] h-[60vh] bg-surface overflow-hidden rounded-sm cursor-none">
          
          <div :class="`absolute inset-0 bg-gradient-to-br ${project.color} opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-out`"></div>
          
          <div class="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-500"></div>

          <div class="absolute bottom-0 left-0 p-8 md:p-16 w-full">
            <div class="overflow-hidden">
              <h3 class="text-4xl md:text-7xl font-bold text-flash translate-y-full group-hover:translate-y-0 transition-transform duration-500 delay-100">
                {{ project.title }}
              </h3>
            </div>
            
            <div class="flex items-center gap-4 mt-4 overflow-hidden">
              <span class="text-neon tracking-widest text-sm uppercase translate-y-full group-hover:translate-y-0 transition-transform duration-500 delay-200">
                {{ project.category }}
              </span>
              <span class="w-12 h-[1px] bg-white/50 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500 delay-300"></span>
              <p class="text-gray-400 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-500">
                {{ project.description }}
              </p>
            </div>
          </div>

          <span class="absolute top-4 right-8 text-[10rem] font-bold text-white/5 select-none pointer-events-none group-hover:text-neon/10 transition-colors">
            {{ project.id }}
          </span>

        </div>
      </div>

    </div>
  </div>
</template>