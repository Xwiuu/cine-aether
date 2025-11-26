<script setup>
import { onMounted, ref } from 'vue';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const containerRef = ref(null);
const paragraphsRef = ref([]); // Array para guardar os parágrafos

// Função para capturar os elementos no v-for ou ref manual
const setParagraphRef = (el) => {
  if (el) paragraphsRef.value.push(el);
};

onMounted(() => {
  // Para cada parágrafo, criamos uma animação separada
  paragraphsRef.value.forEach((para) => {
    gsap.fromTo(para, 
      { 
        opacity: 0.2, // Começa quase invisível
        y: 50,
        filter: "blur(10px)" // Começa borrado
      },
      {
        opacity: 1, // Fica totalmente visível
        y: 0,
        filter: "blur(0px)", // Fica nítido
        color: "#FFFFFF",
        duration: 1,
        ease: "none", // Sem aceleração, linear com o scroll
        scrollTrigger: {
          trigger: para,
          start: "top 85%", // Começa quando o topo do texto chega em 85% da tela
          end: "top 45%",   // Termina quando chega no meio
          scrub: 1,         // O SEGREDO: A animação segue o dedo do usuário (com suavidade de 1s)
        }
      }
    );
  });
});
</script>

<template>
  <section ref="containerRef" class="w-full min-h-[120vh] bg-void flex flex-col items-center justify-center py-40 relative z-10 overflow-hidden">
    
    <div class="absolute top-0 right-0 w-[600px] h-[600px] bg-neon/5 rounded-full blur-[150px] pointer-events-none -translate-y-1/2 translate-x-1/2"></div>

    <div class="max-w-5xl px-8 md:px-12 flex flex-col gap-24">
      
      <p :ref="setParagraphRef" class="text-3xl md:text-6xl font-bold leading-tight text-surface transition-colors">
        O mercado está cheio de ruído.
        Nós criamos <span class="text-neon drop-shadow-[0_0_15px_rgba(124,92,255,0.5)]">sinal</span>.
      </p>

      <p :ref="setParagraphRef" class="text-2xl md:text-5xl font-light leading-tight text-surface">
        Não construímos apenas sites. Projetamos 
        <span class="text-hologram font-medium">ecossistemas imersivos</span> 
        que prendem a atenção e desafiam a lógica convencional.
      </p>

      <p :ref="setParagraphRef" class="text-2xl md:text-5xl font-light leading-tight text-surface">
        A tecnologia é fria. <br>
        A nossa missão é fazê-la <span class="italic font-serif text-white">sentir</span>.
      </p>

    </div>

    <div class="mt-32">
      <button class="group relative px-8 py-4 bg-transparent border border-white/20 rounded-full overflow-hidden hover:border-neon transition-colors duration-300">
        <div class="absolute inset-0 bg-neon/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"></div>
        <span class="relative text-sm tracking-[0.3em] uppercase group-hover:text-white transition-colors">
          Iniciar Protocolo
        </span>
      </button>
    </div>

  </section>
</template>