<script setup>
import { onMounted, onUnmounted, ref } from "vue";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const sectionRef = ref(null);
const triggerRef = ref(null);
const wrapperRef = ref(null);

const projects = [
  {
    id: "01",
    title: "NEON GENESIS",
    role: "INTERFACE",
    year: "2024",
  },
  {
    id: "02",
    title: "VOID WALKER",
    role: "WEBGL XP",
    year: "2024",
  },
  {
    id: "03",
    title: "SYNTH MIND",
    role: "AI MODEL",
    year: "2023",
  },
  {
    id: "04",
    title: "CHROMA DATA",
    role: "DATAVIZ",
    year: "2025",
  },
];

let scrollTween;

onMounted(() => {
  // Cálculo dinâmico para garantir fluidez
  const container = wrapperRef.value;

  // Cria a animação de scroll horizontal
  // "xPercent: -100 * (projects.length - 1)" é uma técnica mais robusta que pixels
  const totalSlides = projects.length;

  scrollTween = gsap.to(container, {
    x: () => -(container.scrollWidth - window.innerWidth),
    ease: "none", // Linear é vital para scroll
    scrollTrigger: {
      trigger: triggerRef.value,
      pin: true,
      scrub: 0.5, // Reduzi de 1 para 0.5 (Resposta mais rápida/menos "lag")
      start: "top top",
      end: "+=2000", // Reduzi de 3000 para 2000 (Menos scroll necessário para ver tudo)
      invalidateOnRefresh: true, // Recalcula se redimensionar a janela
    },
  });
});

onUnmounted(() => {
  if (scrollTween) scrollTween.kill();
  ScrollTrigger.getAll().forEach((t) => t.kill());
});
</script>

<template>
  <section ref="triggerRef" class="relative bg-void overflow-hidden">
    <div
      class="absolute top-12 left-8 md:left-24 z-20 pointer-events-none mix-blend-difference"
    >
      <div class="flex items-center gap-4">
        <span class="w-2 h-2 bg-neon rounded-full animate-pulse"></span>
        <span
          class="text-xs font-mono text-flash tracking-[0.4em] uppercase opacity-70"
        >
          Selected Works / Archive
        </span>
      </div>
    </div>

    <div ref="sectionRef" class="h-screen w-full flex items-center">
      <div ref="wrapperRef" class="flex gap-20 px-8 md:px-24 w-max">
        <div
          v-for="(project, index) in projects"
          :key="project.id"
          class="project-card group relative w-[85vw] md:w-[60vw] lg:w-[45vw] h-[60vh] md:h-[70vh] flex flex-col justify-between p-8 md:p-12 border border-white/5 bg-surface/20 backdrop-blur-sm transition-all duration-500 hover:border-neon/50 hover:bg-surface/40"
        >
          <span
            class="absolute top-0 right-0 p-8 text-[8rem] md:text-[12rem] font-black leading-none text-white/5 group-hover:text-neon/5 transition-colors duration-500 select-none pointer-events-none"
          >
            {{ project.id }}
          </span>

          <div
            class="relative z-10 flex justify-between items-start border-b border-white/5 pb-6 group-hover:border-neon/20 transition-colors duration-500"
          >
            <span
              class="font-mono text-xs text-gray-400 group-hover:text-neon transition-colors tracking-widest uppercase"
            >
              {{ project.role }}
            </span>
            <span class="font-mono text-xs text-gray-500">
              {{ project.year }}
            </span>
          </div>

          <div
            class="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/80 opacity-60"
          ></div>

          <div
            class="relative z-10 translate-y-4 group-hover:translate-y-0 transition-transform duration-500 ease-out"
          >
            <h3
              class="text-4xl md:text-6xl font-bold text-white tracking-tighter mb-2 group-hover:text-white transition-colors"
            >
              {{ project.title }}
            </h3>

            <div
              class="h-[1px] w-0 group-hover:w-full bg-neon transition-all duration-700 ease-in-out opacity-50"
            ></div>

            <div
              class="mt-4 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100"
            >
              <span
                class="text-xs font-bold uppercase tracking-widest text-neon"
                >View Case</span
              >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-4 h-4 text-neon"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* Otimização de renderização para evitar "tremedeira" no scroll */
.project-card {
  will-change: transform, opacity, border-color;
}
</style>
