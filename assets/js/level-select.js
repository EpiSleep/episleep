// ====================================================================
// 1. DATA ET STRUCTURE DU QCM (11 questions)
// ====================================================================

// Structure des données des niveaux
const levelData = [
  {
    id: 'femmes-info',
    title: 'Women & IT',
    description: '',
    cta: 'Discover the challenge',
    image: 'assets/images/femme.png',
    video: 'assets/video/Video_sans_titre_Realisee_avec_Clipchamp.mp4', 
    link: '/games/femmes-info/index.html'
  },
  {
    id: "decathlon",
    title: "Decathlon Data Rush",
    description:
      "Sporty mini-games fused with micro-optimization challenges. Get your algorithms and sneakers ready!",
    cta: "Load the map",
    image: "https://dummyimage.com/900x400/173f2d/ffffff&text=Decathlon",
    link: "/games/decathlon/index.html",
  },
  {
    id: "cve-explorer",
    title: "CVE Explorer",
    description:
      "An arcade scanner to explore and visualize CVE vulnerabilities. Input, parsing, display — all in pixel-art.",
    cta: "Launch scanner",
    image: "https://dummyimage.com/900x400/1f243d/ffffff&text=CVE+Explorer",
    link: "games/cve-explorer/fish.html",
  },
  {
    id: "linux-install",
    title: "Linux Installation",
    description:
      "Learn the correct order of steps to install Linux. Drag and drop the steps to arrange them correctly and master the installation process!",
    cta: "Start installation",
    image: "https://dummyimage.com/900x400/1a1a2e/00ff00&text=Linux+Install",
    link: "games/linux-install/index.html",
  },
  {
    id: "ergonomie",
    title: "Dark Pattern Lab",
    description:
      "Experiment with (and fix) devious interfaces. An ergonomics lab to put users back at the center.",
    cta: "Enter the lab",
    image: "https://dummyimage.com/900x400/3b1b2e/ffffff&text=Ergonomics",
    link: "/games/ergonomie-dark-pattern/index.html",
  },
];


let decathlonResponses = {};
let currentQuestionIndex = 0;


const qcmData = [
  {
    id: 1,
    question: "1. Quel est votre niveau de pratique sportive actuel ?",
    options: {
      A: "Débutant : Je commence tout juste.",
      B: "Intermédiaire : 1 à 2 fois par semaine.",
      C: "Avancé : 3 à 4 fois par semaine.",
      D: "Expert : 5 fois et plus par semaine.",
    },
  },
  {
    id: 2,
    question:
      "2. Combien de temps total consacrez-vous ou souhaitez-vous consacrer au sport par semaine ?",
    options: {
      A: "Moins de 1 heure",
      B: "Entre 1 et 3 heures",
      C: "Entre 3 et 6 heures",
      D: "7 heures ou plus",
    },
  },
  {
    id: 3,
    question: "3. Quel est votre objectif principal en faisant du sport ?",
    options: {
      A: "Améliorer ma santé générale et mon bien-être.",
      B: "Perte de poids ou maintien d'un poids de forme.",
      C: "Gagner en muscle/force ou performance.",
      D: "Préparation à une compétition ou à un défi.",
    },
  },
  {
    id: 4,
    question:
      "4. Quel type d'activité vous attire le plus ou pratiquez-vous déjà ?",
    options: {
      A: "Endurance (Course, vélo, natation...).",
      B: "Force/résistance (Musculation, Crossfit...).",
      C: "Sports collectifs ou de raquette.",
      D: "Flexibilité/bien-être (Yoga, Pilates, danse...).",
    },
  },
  {
    id: 5,
    question:
      "5. Quel est votre niveau de motivation ou d'engagement à long terme ?",
    options: {
      A: "Faible : si j'ai le temps/l'envie.",
      B: "Modéré : J'essaie de rester régulier.",
      C: "Fort : Je planifie mes séances à l'avance.",
      D: "Très Fort : Le sport est essentiel à mon planning.",
    },
  },
  {
    id: 6,
    question: "6. Quel est votre environnement de pratique préféré ?",
    options: {
      A: "Principalement en extérieur.",
      B: "Principalement en intérieur (salle, maison).",
      C: "Un équilibre des deux.",
      D: "Je n'ai pas de préférence.",
    },
  },
  {
    id: 7,
    question: "7. Préférez-vous vous entraîner seul(e) ou en groupe ?",
    options: {
      A: "Seul(e) : J'aime la concentration et l'autonomie.",
      B: "En groupe/équipe : J'ai besoin de l'émulation.",
      C: "Avec un(e) partenaire ou un petit groupe.",
      D: "J'alterne entre le solo et le groupe.",
    },
  },
  {
    id: 8,
    question: "8. Quel est votre rapport au repos et à la récupération ?",
    options: {
      A: "Je ne m'en préoccupe pas vraiment.",
      B: "J'essaie d'intégrer un jour de repos par semaine.",
      C: "Je planifie activement mon sommeil et mes jours de repos.",
      D: "La récupération active est aussi importante que l'entraînement.",
    },
  },
  {
    id: 9,
    question:
      "9. Quel est votre niveau de flexibilité pour les horaires d'entraînement ?",
    options: {
      A: "Très contraint : Seulement le week-end ou très tôt/tard.",
      B: "Assez flexible : Je peux m'adapter à différents moments.",
      C: "Je suis très structuré : même heure tous les jours.",
      D: "Je peux m'adapter, mais j'ai une forte préférence.",
    },
  },
  {
    id: 10,
    question: "10. Comment gérez-vous les blessures ou les douleurs légères ?",
    options: {
      A: "Je continue l'entraînement sans rien changer.",
      B: "Je réduis l'intensité ou je prends un jour de repos.",
      C: "Je consulte un professionnel dès que la douleur persiste.",
      D: "J'adapte mes exercices pour contourner la zone douloureuse.",
    },
  },
  {
    id: 11,
    question:
      "11. Quel type d'exercice de renforcement musculaire de base au poids du corps vous souhaitez le plus améliorer techniquement ?",
    options: {
      A: "Mouvements de Poussée (Pompes, Dips).",
      B: "Mouvements de Tirage (Tractions, Rameur inversé).",
      C: "Mouvements du Bas du corps (Squats, Fentes).",
      D: "Gainage et abdominaux profonds (Planche, Crunch).",
    },
  },
];



function generateProfile() {
  let counts = { A: 0, B: 0, C: 0, D: 0 };

  // Compter les réponses
  Object.values(decathlonResponses).forEach((response) => {
    counts[response]++;
  });

  let dominantProfile = "B";

  if (counts.D > counts.C && counts.D > counts.B && counts.D > counts.A) {
    dominantProfile = "D";
  } else if (
    counts.C > counts.D &&
    counts.C > counts.B &&
    counts.C > counts.A
  ) {
    dominantProfile = "C";
  } else if (
    counts.A > counts.D &&
    counts.A > counts.B &&
    counts.A > counts.C
  ) {
    dominantProfile = "A";
  }

  const profileContent = {
    A: {
      title: "Profil A : Découverte & Loisir",
      description:
        "Vous visez le bien-être et la régularité. Ce niveau Decathlon se concentre sur les bases de la programmation pour la santé et le bien-être.",
      link: "/games/decathlon/index.html?profile=A",
    },
    B: {
      title: "Profil B : Intermédiaire & Forme",
      description:
        "Vous êtes régulier et cherchez à améliorer votre endurance. Ce niveau Decathlon vous met au défi d'optimiser des routines sportives via des algorithmes.",
      link: "/games/decathlon/index.html?profile=B",
    },
    C: {
      title: "Profil C : Avancé & Performance",
      description:
        "Votre objectif est la force et la performance spécifique. Ce niveau Decathlon nécessite une analyse approfondie des données de performance et de gain de force.",
      link: "/games/decathlon/index.html?profile=C",
    },
    D: {
      title: "Profil D : Athlète & Compétition",
      description:
        "Votre engagement est total. Ce niveau Decathlon vous confronte à des défis de micro-optimisation et de gestion de gros jeux de données sportifs.",
      link: "/games/decathlon/index.html?profile=D",
    },
  };

  return profileContent[dominantProfile];
}

function nextQuestion(answer) {
    const currentQ = qcmData[currentQuestionIndex];
    decathlonResponses[currentQ.id] = answer; 
    
    currentQuestionIndex++; 
    
   
    const decathlonContent = levelData.find(item => item.id === 'decathlon');
    if (decathlonContent) {
        renderModal(decathlonContent);
    }
}

function attachQCMListeners() {
  document.querySelectorAll(".qcm-option").forEach((button) => {
    button.onclick = null;
    button.onclick = () => {
      const answer = button.dataset.answer;
      nextQuestion(answer);
    };
  });
}



function closeModal() {
  const modal = document.querySelector("#levelModal");
  if (modal && modal.parentElement) {
    modal.parentElement.classList.remove('active');
    
   
    const video = modal.querySelector('video');
    if(video) {
        video.pause();
        video.src = ""; 
    }
  }
}


function renderDefaultModal(content) {
    const modal = document.querySelector('#levelModal');
    const body = modal.querySelector('.body');
    const heading = modal.querySelector('h3');
    const image = modal.querySelector('img');
    const video = modal.querySelector('video');
    const actions = modal.querySelector('.actions');

    heading.textContent = content.title;
    body.textContent = content.description;
    

    if (image) {
        image.src = content.image;
        image.alt = content.title;
        image.style.display = 'block';
    }

    
    let playButtonHtml = `<a class="btn play-btn" href="${content.link}">${content.cta || 'Play'}</a>`;
    
   
    if (content.video && video) {
        video.style.display = 'block';
        video.src = content.video;
        
        playButtonHtml = `<button class="btn play-btn video-toggle">Lecture Vidéo ▶</button>`;
    } else if (video) {
        
        video.style.display = 'none';
        video.pause();
    }

  actions.innerHTML = `
        ${playButtonHtml}

    `;

   
    if (content.video && video) {
        const videoBtn = actions.querySelector('.video-toggle');
        videoBtn.addEventListener('click', (e) => {
            e.preventDefault();
            if (video.paused) {
                video.play();
                videoBtn.textContent = "Pause ⏸";
            } else {
                video.pause();
                videoBtn.textContent = "Lecture Vidéo ▶";
            }
        });
    }

  if (modal.parentElement) {
    modal.parentElement.classList.add("active");
  }
}


function renderModal(content) {
    const modal = document.querySelector('#levelModal');
    if (!modal) return console.warn('Modal element (#levelModal) not found.');

    const body = modal.querySelector('.body');
    const heading = modal.querySelector('h3');
    const image = modal.querySelector('img');
    const actions = modal.querySelector('.actions');
    const video = modal.querySelector('video');

    
    if (content.id !== 'decathlon') {
        renderDefaultModal(content);
        return;
    }

   
    if(video) video.style.display = 'none';

    
    if (currentQuestionIndex >= qcmData.length) {
        const finalProfile = generateProfile();
        heading.textContent = `Mission Briefing: ${finalProfile.title}`;
        body.innerHTML = `<p>${finalProfile.description}</p>`; 
        image.src = content.image; 
        image.alt = finalProfile.title;
        
        actions.innerHTML = `
            <a class="btn play-btn" href="${finalProfile.link}">Start the mission</a>
            <button class="btn secondary close-btn" onclick="closeModal()">Maybe later</button>
        `;
  } else {
    // Afficher la question
    const currentQ = qcmData[currentQuestionIndex];
    heading.textContent = `QCM Decathlon (${currentQ.id}/${qcmData.length})`;

    } else {
        
        const currentQ = qcmData[currentQuestionIndex];
        heading.textContent = `QCM Decathlon (${currentQ.id}/${qcmData.length})`;
        
        let questionHTML = `<h4>${currentQ.question}</h4><ul style="list-style: none; padding: 0;">`;
        for (const [key, value] of Object.entries(currentQ.options)) {
            questionHTML += `<li style="margin-bottom: 8px;"><button class="qcm-option btn secondary" data-answer="${key}" style="text-align: left; width: 100%;">${key}. ${value}</button></li>`;
        }
        questionHTML += '</ul>';
        
        body.innerHTML = questionHTML;
        image.src = content.image; 

        actions.innerHTML = `<button class="btn secondary close-btn" onclick="closeModal()">Annuler le QCM</button>`;
    }
    questionHTML += "</ul>";

    if (modal.parentElement) {
        modal.parentElement.classList.add('active');
    }
    
    if (currentQuestionIndex < qcmData.length) {
        attachQCMListeners();
    }
    
    
    document.querySelectorAll('.close-btn').forEach((btn) => btn.onclick = closeModal);
}

function bindNodes() {
    document.querySelectorAll('[data-level-id]').forEach((node) => {
        node.addEventListener('click', () => {
            const levelId = node.dataset.levelId;
            const content = levelData.find((item) => item.id === levelId);

            
            if (levelId === 'decathlon') {
                decathlonResponses = {};
                currentQuestionIndex = 0;
            }

            if (content) {
                renderModal(content);
            }
        });
    });
  });
}

function initDragToPan() {
  const stageWrapper = document.querySelector(".stage-wrapper");
  if (!stageWrapper) return;

  let isDragging = false;
  let startX = 0;
  let startY = 0;
  let scrollLeft = 0;
  let scrollTop = 0;

  stageWrapper.addEventListener("mousedown", (event) => {
    if (event.button !== 0) return;
    isDragging = true;
    stageWrapper.classList.add("is-dragging");
    startX = event.pageX - stageWrapper.offsetLeft;
    startY = event.pageY - stageWrapper.offsetTop;
    scrollLeft = stageWrapper.scrollLeft;
    scrollTop = stageWrapper.scrollTop;
    document.body.style.userSelect = "none";
  });

  window.addEventListener("mouseup", () => {
    isDragging = false;
    stageWrapper.classList.remove("is-dragging");
    document.body.style.userSelect = "";
  });

  stageWrapper.addEventListener("mousemove", (event) => {
    if (!isDragging) return;
    event.preventDefault();
    const x = event.pageX - stageWrapper.offsetLeft;
    const y = event.pageY - stageWrapper.offsetTop;
    stageWrapper.scrollLeft = scrollLeft - (x - startX);
    stageWrapper.scrollTop = scrollTop - (y - startY);
  });
  
 
  let touchStart = null;
  stageWrapper.addEventListener("touchstart", (e) => {
    if (e.touches.length !== 1) return;
    touchStart = {
      x: e.touches[0].pageX,
      y: e.touches[0].pageY,
      sl: stageWrapper.scrollLeft,
      st: stageWrapper.scrollTop,
    };
  });
  stageWrapper.addEventListener("touchmove", (e) => {
    if (!touchStart) return;
    const dx = e.touches[0].pageX - touchStart.x;
    const dy = e.touches[0].pageY - touchStart.st;
    stageWrapper.scrollLeft = touchStart.sl - dx;
    stageWrapper.scrollTop = touchStart.st - dy;
  });
  stageWrapper.addEventListener("touchend", () => {
    touchStart = null;
  });
}



document.addEventListener("DOMContentLoaded", () => {
  bindNodes();
  initDragToPan();

  const backdrop = document.querySelector("#levelModal")?.parentElement;
  if (backdrop) {
    backdrop.addEventListener("click", (event) => {
      if (event.target === backdrop) {
        closeModal();
      }
    });
  }

  document
    .querySelectorAll(".close-btn")
    .forEach((btn) => btn.addEventListener("click", closeModal));
});


function setCookie(name, value, days) {
  let expires = "";
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie =
    name + "=" + (value || "") + expires + "; path=/; SameSite=Lax";
}

function getCookie(name) {
  const nameEQ = name + "=";
  const ca = document.cookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === " ") c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}


const element = document.getElementById('gameWindow');
const progressbar = document.getElementById("progress");

if (element && progressbar) {
  function handleMouseOver() {
    const score = getCookie("score") || 0;
    progressbar.style.width = 20 * score + "%";
  }
  function handleMouseOut() {
    const score = getCookie("score") || 0;
    progressbar.style.width = 20 * score + "%";
  }
  element.addEventListener("mouseover", handleMouseOver);
  element.addEventListener("mouseout", handleMouseOut);
}
if(element && progressbar) {
    function handleMouseOver() {
      const score = getCookie('score') || 0; 
      progressbar.style.width = (20 * score)+'%';
      const woman = document.getElementById('women');
      const decat = document.getElementById('decat');
      const cve = document.getElementById('cve');
      const ergo = document.getElementById('ergo');
      const linux = document.getElementById('linux');
      if (getCookie('woman') == "1"){
        woman.src = "assets/images/medals/femme.png";
      }
      if (getCookie('decat') == "1"){
        decat.src = "assets/images/medals/decathlon.png";
      }
      if (getCookie('cve') == "1"){
        cve.src = "assets/images/medals/peche.png";
      }
      if (getCookie('ergo') == "1"){
        ergo.src = "assets/images/medals/brain.png";
      }
      if (getCookie('linux') == "1"){
        linux.src = "assets/images/medals/linux.png";
      }
    }
    function handleMouseOut() {
      const score = getCookie('score') || 0;
      progressbar.style.width = (25 * score)+'%';
      const woman = document.getElementById('women');
      const decat = document.getElementById('decat');
      const cve = document.getElementById('cve');
      const ergo = document.getElementById('ergo');
      const linux = document.getElementById('linux');
      if (getCookie('woman') == "1"){
        woman.src = "assets/images/medals/femme.png";
      }
      if (getCookie('decat') == "1"){
        decat.src = "assets/images/medals/decathlon.png";
      }
      if (getCookie('cve') == "1"){
        cve.src = "assets/images/medals/peche.png";
      }
      if (getCookie('ergo') == "1"){
        ergo.src = "assets/images/medals/brain.png";
      }
      if (getCookie('linux') == "1"){
        linux.src = "assets/images/medals/linux.png";
      }
    }
    element.addEventListener('mouseover', handleMouseOver);
    element.addEventListener('mouseout', handleMouseOut);
}
