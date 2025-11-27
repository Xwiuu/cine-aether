<script setup>
import { onMounted, ref } from 'vue';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const formRef = ref(null);
const infoRef = ref(null);

onMounted(() => {
  // Animação de entrada da Esquerda (Infos)
  gsap.fromTo(infoRef.value.children, 
    { x: -50, opacity: 0 },
    { 
      x: 0, 
      opacity: 1, 
      duration: 1, 
      stagger: 0.2, 
      ease: "power3.out",
      scrollTrigger: {
        trigger: infoRef.value,
        start: "top 80%"
      }
    }
  );

  // Animação de entrada da Direita (Formulário)
  gsap.fromTo(formRef.value, 
    { x: 50, opacity: 0, filter: 'blur(10px)' },
    { 
      x: 0, 
      opacity: 1, 
      filter: 'blur(0px)',
      duration: 1.2, 
      ease: "power3.out",
      scrollTrigger: {
        trigger: formRef.value,
        start: "top 80%"
      }
    }
  );
});
</script>

<template>
  <section class="relative min-h-screen w-full bg-void flex items-center justify-center py-20 px-6 md:px-12 lg:px-24 overflow-hidden z-20 border-t border-white/5">
    
    <div class="absolute top-0 right-0 w-[500px] h-[500px] bg-neon/10 rounded-full blur-[120px] pointer-events-none translate-x-1/2 -translate-y-1/2"></div>
    <div class="absolute bottom-0 left-0 w-[600px] h-[600px] bg-hologram/5 rounded-full blur-[100px] pointer-events-none -translate-x-1/2 translate-y-1/2"></div>

    <div class="max-w-[1600px] w-full grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 relative z-10">
      
      <div ref="infoRef" class="flex flex-col justify-center gap-12">
        
        <div class="space-y-4">
          <div class="flex items-center gap-4">
            <span class="w-12 h-[2px] bg-neon"></span>
            <span class="text-neon font-mono text-sm tracking-[0.3em] uppercase">Status: Online</span>
          </div>
          <h2 class="text-5xl md:text-7xl font-black text-flash tracking-tighter leading-[0.9]">
            INICIAR <br> <span class="text-transparent bg-clip-text bg-gradient-to-r from-neon to-hologram">UPLINK</span>
          </h2>
          <p class="text-gray-400 text-lg md:text-xl font-light max-w-md leading-relaxed">
            Estamos prontos para receber o seu sinal. Conte-nos sobre o seu projeto e vamos construir o impossível.
          </p>
        </div>

        <div class="space-y-8 font-mono text-sm tracking-wider">
          
          <div class="flex items-start gap-6 group cursor-pointer">
            <div class="p-4 rounded-full border border-white/10 bg-white/5 group-hover:border-neon/50 group-hover:bg-neon/10 transition-all duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-white group-hover:text-neon transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <p class="text-gray-500 text-xs uppercase mb-1">Frequência Direta</p>
              <p class="text-flash text-lg group-hover:text-neon transition-colors">hello@cineaether.io</p>
            </div>
          </div>

          <div class="flex items-start gap-6 group">
            <div class="p-4 rounded-full border border-white/10 bg-white/5 group-hover:border-hologram/50 group-hover:bg-hologram/10 transition-all duration-300">
               <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-white group-hover:text-hologram transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <div>
              <p class="text-gray-500 text-xs uppercase mb-1">Base de Operações</p>
              <p class="text-flash text-lg">Lisboa, LX Factory <br> <span class="text-xs opacity-50">Setor Criativo B2</span></p>
            </div>
          </div>

        </div>

      </div>

      <div ref="formRef" class="relative">
        
        <div class="absolute -inset-1 bg-gradient-to-r from-neon via-transparent to-hologram opacity-20 blur-md rounded-2xl"></div>

        <form class="relative bg-surface/40 backdrop-blur-xl border border-white/10 p-8 md:p-12 rounded-2xl flex flex-col gap-6 shadow-2xl">
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="flex flex-col gap-2">
              <label class="text-xs font-mono text-neon tracking-widest uppercase ml-1">Codinome</label>
              <input type="text" placeholder="Seu Nome" class="cyber-input" />
            </div>
            <div class="flex flex-col gap-2">
              <label class="text-xs font-mono text-neon tracking-widest uppercase ml-1">Contato</label>
              <input type="email" placeholder="seu@email.com" class="cyber-input" />
            </div>
          </div>

          <div class="flex flex-col gap-2">
            <label class="text-xs font-mono text-neon tracking-widest uppercase ml-1">Assunto</label>
            <select class="cyber-input appearance-none">
              <option>Novo Projeto</option>
              <option>Colaboração</option>
              <option>Orçamento</option>
              <option>Outro</option>
            </select>
          </div>

          <div class="flex flex-col gap-2">
            <label class="text-xs font-mono text-neon tracking-widest uppercase ml-1">Mensagem</label>
            <textarea placeholder="Descreva sua missão..." rows="5" class="cyber-input resize-none"></textarea>
          </div>

          <button type="button" class="group relative mt-4 overflow-hidden rounded-lg bg-white/5 border border-white/10 px-8 py-4 transition-all duration-300 hover:border-neon hover:bg-neon/10">
            <div class="relative flex items-center justify-center gap-4">
              <span class="font-bold tracking-[0.2em] uppercase text-white group-hover:text-neon transition-colors">Transmitir Dados</span>
              <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-white group-hover:translate-x-1 group-hover:text-neon transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </div>
          </button>

        </form>

      </div>

    </div>
  </section>
</template>