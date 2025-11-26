<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const x = ref(0);
const y = ref(0);

// Detecta o movimento
const updateCursor = (e) => {
  x.value = e.clientX;
  y.value = e.clientY;
};

onMounted(() => {
  // Começa no centro
  x.value = window.innerWidth / 2;
  y.value = window.innerHeight / 2;
  
  window.addEventListener('mousemove', updateCursor);
  document.body.style.cursor = 'none';
});

onUnmounted(() => {
  window.removeEventListener('mousemove', updateCursor);
  document.body.style.cursor = 'auto';
});
</script>

<template>
  <div class="cursor-wrapper">
    
    <div 
      class="cursor-ring"
      :style="{ 
        transform: `translate(${x}px, ${y}px)`,
        transition: 'transform 0.15s ease-out' 
      }"
    ></div>

    <div 
      class="cursor-dot"
      :style="{ 
        transform: `translate(${x}px, ${y}px)` 
      }"
    ></div>

  </div>
</template>

<style scoped>
.cursor-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  pointer-events: none; /* Isso é VITAL para poder clicar nos links */
  z-index: 9999;
  overflow: hidden;
}

.cursor-dot {
  position: absolute;
  top: 0;
  left: 0;
  width: 8px;
  height: 8px;
  background-color: white;
  border-radius: 50%;
  margin-top: -4px;  /* Centraliza */
  margin-left: -4px; /* Centraliza */
  mix-blend-mode: difference; /* Inverte a cor dependendo do fundo (efeito pro) */
}

.cursor-ring {
  position: absolute;
  top: 0;
  left: 0;
  width: 40px;
  height: 40px;
  border: 1px solid rgba(124, 92, 255, 0.5); /* Cor Neon */
  border-radius: 50%;
  margin-top: -20px; /* Centraliza */
  margin-left: -20px; /* Centraliza */
  mix-blend-mode: screen;
  box-shadow: 0 0 10px rgba(124, 92, 255, 0.2); /* Glow leve */
  will-change: transform; /* Otimiza performance */
}
</style>