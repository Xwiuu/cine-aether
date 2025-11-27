<template>
  <CustomCursor />

  <main class="antialiased bg-void min-h-screen text-flash selection:bg-neon selection:text-white cursor-none">
    <Header />
    <Hero />
    <Manifesto />
    <Projects />
    <Values />
    <Studio />
    
    <Services />
    
    <div class="h-[20vh] w-full bg-black"></div>

    <LightTunnel />

    <Contact />

  </main>
</template>

<script setup>
import { onMounted, onUnmounted } from 'vue';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from '@studio-freight/lenis';

import Hero from './components/layout/Hero.vue';
import Header from './components/layout/Header.vue';
import Manifesto from './components/layout/Manifesto.vue';
import Projects from './components/layout/Projects.vue';
import Values from './components/layout/Values.vue';
import Studio from './components/layout/Studio.vue';
import Services from './components/layout/Services.vue';
import LightTunnel from './components/layout/LightTunnel.vue';
import Contact from './components/layout/Contact.vue';
import CustomCursor from './components/ui/CustomCursor.vue';

// Registrar ScrollTrigger globalmente
gsap.registerPlugin(ScrollTrigger);

let lenis;

onMounted(() => {
  // Configuração "Cinemática" do Scroll
  lenis = new Lenis({
    duration: 2.0, // QUANTO MAIOR, MAIS "LENTO" E SUAVE (Padrão: 1.2)
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Curva exponencial suave
    direction: 'vertical',
    gestureDirection: 'vertical',
    smooth: true,
    mouseMultiplier: 1, // Sensibilidade do mouse
    smoothTouch: false, // Em mobile geralmente o nativo é melhor, mas podes ativar se quiseres
    touchMultiplier: 2,
  });

  // Conectar Lenis ao ScrollTrigger do GSAP
  // Isso garante que as animações (como o Túnel e os Cards) fiquem 100% sincronizadas
  lenis.on('scroll', ScrollTrigger.update);

  // Loop de animação
  gsap.ticker.add((time) => {
    lenis.raf(time * 1000); // Converte para ms
  });

  // Desativa o "lag" de suavização interno do GSAP para o Lenis assumir o controle total
  gsap.ticker.lagSmoothing(0);
});

onUnmounted(() => {
  if (lenis) {
    lenis.destroy();
    gsap.ticker.remove(lenis.raf);
  }
});
</script>