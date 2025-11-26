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
import Hero from './components/layout/Hero.vue';
import Header from './components/layout/Header.vue';
import Manifesto from './components/layout/Manifesto.vue';
import Projects from './components/layout/Projects.vue';
import Values from './components/layout/Values.vue';
import Studio from './components/layout/Studio.vue';
import Services from './components/layout/Services.vue';
import LightTunnel from './components/layout/LightTunnel.vue';
import Contact from './components/layout/Contact.vue'; // <--- Importar
import CustomCursor from './components/ui/CustomCursor.vue';
</script>