<script setup>
import { onMounted, ref } from 'vue';
import gsap from 'gsap';

const titleRef = ref(null);
const subtitleRef = ref(null);

onMounted(() => {
  // Configura o estado inicial (invisível)
  gsap.set([titleRef.value, subtitleRef.value], { opacity: 0 });

  const tl = gsap.timeline();

  // Animação sequencial
  tl.fromTo(titleRef.value, 
    { y: 100, opacity: 0 },
    { y: 0, opacity: 1, duration: 1.5, ease: "power4.out" }
  )
  .fromTo(subtitleRef.value, 
    { y: 20, opacity: 0 },
    { y: 0, opacity: 1, duration: 1, ease: "power2.out" }, 
    "-=1" // Começa 1 segundo antes do fim da anterior
  );
});
</script>

<template>
  <section class="h-screen w-full flex flex-col items-center justify-center bg-void relative overflow-hidden">
    
    <div class="absolute w-[500px] h-[500px] bg-neon/20 rounded-full blur-[120px] pointer-events-none"></div>

    <div class="z-10 text-center mix-blend-screen">
      <h1 ref="titleRef" class="text-flash text-7xl md:text-9xl font-bold tracking-tighter select-none">
        CINE<span class="text-neon drop-shadow-[0_0_15px_rgba(124,92,255,0.8)]">AETHER</span>
      </h1>
      
      <p ref="subtitleRef" class="text-hologram mt-6 text-sm md:text-xl tracking-[0.8em] uppercase font-light">
        Experiências Audiovisuais Vivas
      </p>
    </div>

  </section>
</template>
