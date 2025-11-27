# C I N E A E T H E R

<p align="center"> <img src="https://img.shields.io/badge/REALITY_ENGINE-v2.7-7C5CFF?style=for-the-badge"> <img src="https://img.shields.io/badge/MODE-CINEMATIC-00C2A8?style=for-the-badge"> <img src="https://img.shields.io/badge/INTERFACE-VUE_3-35495E?style=for-the-badge&logo=vuedotjs"> </p> <p align="center"><strong>“Quando o mundo se tornou previsível, nós reescrevemos a física.”</strong></p>

---
![Project Status](https://img.shields.io/badge/STATUS-OPERATIONAL-00C2A8?style=for-the-badge&logo=statuspage)
![Vue 3](https://img.shields.io/badge/Vue.js-35495E?style=for-the-badge&logo=vuedotjs&logoColor=4FC08D)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![GSAP](https://img.shields.io/badge/GSAP-88CE02?style=for-the-badge&logo=greensock&logoColor=white)

> **"A internet não é plana. Nós criamos profundidade onde antes havia apenas pixels."**

---


## 📡 Sobre o Sistema

**CineAether** é uma experiência web imersiva de alta performance, projetada para transcender os portfólios tradicionais. Utilizando a metáfora de um sistema operativo futurista, o projeto combina navegação fluida (inércia física), animações complexas e um design minimalista "Void" para destacar o conteúdo sem ruído visual.

Desenvolvido com foco em **Motion Design** e **Micro-interações**, cada scroll conta uma história.

---

## 🛠️ Tech Stack & Arsenal

Este projeto foi construído sobre uma arquitetura moderna e reativa:

| Categoria | Tecnologia | Função |
| :--- | :--- | :--- |
| **Core** | [Vue 3](https://vuejs.org/) (Composition API) | Framework Reativo |
| **Build** | [Vite](https://vitejs.dev/) | Bundler Ultra-rápido |
| **Estilo** | [Tailwind CSS v4](https://tailwindcss.com/) | Estilização Utilitária & Temas |
| **Motion** | [GSAP](https://greensock.com/) + ScrollTrigger | Core de Animação & Triggers |
| **Física** | [Lenis](https://lenis.studio/) | Smooth Scroll (Inércia e Peso) |
| **Gráficos** | HTML5 Canvas API | Partículas, Túneis e Warp Speed |

---

## ⚡ Funcionalidades Principais

* **🌑 Void Aesthetic:** Design "Stealth" com fundo preto profundo, vidro fosco e acentos em Neon/Hologram.
* **🖱️ Custom Physics Cursor:** Cursor magnético com *lag* calculado para sensação orgânica.
* **🌊 Smooth Scroll (Lenis):** Navegação com inércia cinematográfica, dessincronizada do scroll nativo.
* **🚀 Warp Speed Tunnel:** Efeito visual em Canvas que simula viagem à velocidade da luz ao chegar ao rodapé.
* **Horizontal Gallery:** Secção de projetos com scroll horizontal infinito e fixação (Pinning).
* **Reactive Particles:** Sistema de partículas no "Studio" que reage à posição do rato e cria conexões neurais.
* **Stealth Forms:** Inputs minimalistas que se integram ao fundo e acendem apenas no foco.

---

## 📂 Estrutura de Pastas

```bash
cine-aether/
├── public/              # Assets estáticos (Vídeos, Favicons)
├── src/
│   ├── assets/          # Imagens e SVGs
│   ├── components/
│   │   ├── layout/      # Blocos principais (Hero, Projects, Contact, etc.)
│   │   └── ui/          # Elementos menores (Cursor, Botões)
│   ├── style.css        # Configuração Global (Tailwind v4 @theme)
│   ├── App.vue          # Orquestrador (Lenis + Layout)
│   └── main.js          # Ponto de entrada
├── tailwind.config.js   # (Opcional no v4, mas mantido para plugins)
└── vite.config.js       # Configuração do Bundler
🚀 Como Iniciar o Protocolo (Instalação)
Certifique-se de ter o Node.js instalado.

Clone o repositório:

Bash

git clone [https://github.com/seu-usuario/cine-aether.git](https://github.com/seu-usuario/cine-aether.git)
cd cine-aether
Instale as dependências:

npm install
Inicie o servidor de desenvolvimento:

npm run dev
Acesse o sistema: Abra http://localhost:5173 no seu navegador.

🎨 Paleta de Cores (The Void)
A identidade visual é controlada via variáveis CSS no style.css:

⚫ Void: #0B0B0B (Fundo Principal)

⚪ Flash: #FFFFFF (Texto Primário)

🟣 Neon: #7C5CFF (Acentos de Interação)

🟢 Hologram: #00C2A8 (Dados e Status)

🌑 Surface: #1A1A1A (Cartões e Vidro)

📜 Licença
Este projeto é uma demonstração artística. Sinta-se livre para estudar o código. Copyright © 2025 CineAether Systems.

<p align="center"> <small>System Status: 🟢 Online | Latency: 4ms | Secure Connection</small> </p>