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
    video: 'assets/video/video_femme.mp4', 
    link: 'games/femmes-info/index.html'
  },
  {
    id: 'decathlon',
    title: 'Decathlon Data Rush',
    description: 'Sporty mini-games fused with micro-optimization challenges. Get your algorithms and sneakers ready!',
    cta: 'Load the map',
    image: 'assets/images/thumb_decat.png',
    link: 'games/decathlon/index.html'
  },
  {
    id: 'cve-explorer',
    title: 'CVE Explorer',
    description: 'An arcade scanner to explore and visualize CVE vulnerabilities. Input, parsing, display — all in pixel-art.',
    cta: 'Launch scanner',
    image: 'assets/images/thumb_fish.png',
    link: 'games/cve-explorer/fish.html'
  },
  {
    id: 'linux-install',
    title: 'Linux Installation',
    description: 'Learn the correct order of steps to install Linux. Drag and drop the steps to arrange them correctly and master the installation process!',
    cta: 'Start installation',
    image: 'assets/images/thumb_linux.png',
    link: 'games/linux-install/index.html'
  },
  {
    id: 'ergonomics',
    title: 'Dark Pattern Lab',
    description: 'Experience the world\'s most frustrating form! Validate a simple date through various complex steps. A perfect example of terrible UX design.',
    cta: 'Start the challenge',
    image: 'assets/images/thumb_ergo.png',
    link: 'games/ergonomics/index.html'
  },
  // L'exemple 'new-simple-info' doit être retiré du tableau levelData car il n'est pas un niveau cliquable.
  // Les étoiles seront gérées séparément.
];


let decathlonResponses = {};
let currentQuestionIndex = 0;


const qcmData = [
  {
    id: 1,
    question: "1. What is your current level of sports practice?",
    options: {
      A: "Beginner: I've just started.",
      B: "Intermediate: 1 to 2 times a week.",
      C: "Advanced: 3 to 4 times a week.",
      D: "Expert: 5 times a week or more.",
    },
  },
  {
    id: 2,
    question:
      "2. What is the total time you dedicate or wish to dedicate to sports per week?",
    options: {
      A: "Less than 1 hour",
      B: "Between 1 and 3 hours",
      C: "Between 3 and 6 hours",
      D: "7 hours or more",
    },
  },
  {
    id: 3,
    question: "3. What is your main goal for exercising?",
    options: {
      A: "Improve my general health and well-being.",
      B: "Weight loss or maintaining a healthy weight.",
      C: "Gain muscle/strength or improve performance.",
      D: "Preparation for a competition or a challenge.",
    },
  },
  {
    id: 4,
    question:
      "4. What type of activity attracts you the most or do you already practice?",
    options: {
      A: "Endurance (Running, cycling, swimming...).",
      B: "Strength/Resistance (Weight training, Crossfit...).",
      C: "Team or racket sports.",
      D: "Flexibility/Well-being (Yoga, Pilates, dance...).",
    },
  },
  {
    id: 5,
    question:
      "5. What is your level of long-term motivation or commitment?",
    options: {
      A: "Low: if I have the time/desire.",
      B: "Moderate: I try to stay consistent.",
      C: "Strong: I plan my sessions in advance.",
      D: "Very Strong: Sport is essential to my schedule.",
    },
  },
  {
    id: 6,
    question: "6. What is your preferred practice environment?",
    options: {
      A: "Mainly outdoors.",
      B: "Mainly indoors (gym, home).",
      C: "A balance of both.",
      D: "I have no preference.",
    },
  },
  {
    id: 7,
    question: "7. Do you prefer to train alone or in a group?",
    options: {
      A: "Alone: I like concentration and autonomy.",
      B: "In a group/team: I need the emulation.",
      C: "With a partner or small group.",
      D: "I alternate between solo and group.",
    },
  },
  {
    id: 8,
    question: "8. What is your approach to rest and recovery?",
    options: {
      A: "I don't really worry about it.",
      B: "I try to include a rest day per week.",
      C: "I actively plan my sleep and rest days.",
      D: "Active recovery is as important as training.",
    },
  },
  {
    id: 9,
    question:
      "9. What is your level of flexibility regarding training times?",
    options: {
      A: "Very constrained: Only on weekends or very early/late.",
      B: "Quite flexible: I can adapt to different times.",
      C: "I am very structured: same time every day.",
      D: "I can adapt, but I have a strong preference.",
    },
  },
  {
    id: 10,
    question: "10. How do you manage minor injuries or pain?",
    options: {
      A: "I continue training without making any changes.",
      B: "I reduce the intensity or take a rest day.",
      C: "I consult a professional as soon as the pain persists.",
      D: "I adapt my exercises to work around the painful area.",
    },
  },
  {
    id: 11,
    question:
      "11. What type of basic bodyweight strength exercise do you most want to technically improve?",
    options: {
      A: "Push movements (Push-ups, Dips).",
      B: "Pull movements (Pull-ups, Inverted rows).",
      C: "Lower body movements (Squats, Lunges).",
      D: "Sheathing and deep abdominals (Plank, Crunch).",
    },
  },
];  


function generateProfile() {
  let counts = { A: 0, B: 0, C: 0, D: 0 };

  // Compter les réponses
  Object.values(decathlonResponses).forEach((response) => {
    counts[response]++;
  });

  const profileContent = {
    A: { title: "Profil A : Découverte & Loisir", description: "Vous visez le bien-être et la régularité. Ce niveau Decathlon se concentre sur les bases de la programmation pour la santé et le bien-être.", link: 'games/decathlon/index.html?profile=A' },
    B: { title: "Profil B : Intermédiaire & Forme", description: "Vous êtes régulier et cherchez à améliorer votre endurance. Ce niveau Decathlon vous met au défi d'optimiser des routines sportives via des algorithmes.", link: 'games/decathlon/index.html?profile=B' },
    C: { title: "Profil C : Avancé & Performance", description: "Votre objectif est la force et la performance spécifique. Ce niveau Decathlon nécessite une analyse approfondie des données de performance et de gain de force.", link: 'games/decathlon/index.html?profile=C' },
    D: { title: "Profil D : Athlète & Compétition", description: "Votre engagement est total. Ce niveau Decathlon vous confronte à des défis de micro-optimisation et de gestion de gros jeux de données sportifs.", link: 'games/decathlon/index.html?profile=D' }
  };

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


/**
 * Affiche une modale simple (Titre et Description) pour les éléments comme les étoiles.
 * Masque les images, vidéos et boutons d'action spécifiques aux niveaux.
 */
function renderSimpleInfoModal(title, bodyText) {
    const modal = document.querySelector('#levelModal');
    if (!modal) return console.warn('Modal element (#levelModal) not found.');

    const body = modal.querySelector('.body');
    const heading = modal.querySelector('h3');
    const image = modal.querySelector('img');
    const video = modal.querySelector('video');
    const actions = modal.querySelector('.actions');

    // 1. Mise à jour du contenu
    heading.textContent = title;
    body.innerHTML = `<p>${bodyText}</p>`;
    
    // 2. Masquage des éléments non pertinents
    if (image) image.style.display = 'none';
    if (video) {
        video.style.display = 'none';
        video.pause();
        video.src = "";
    }
    
    // Supprimer le bouton "Play" (les actions)
    actions.innerHTML = ``; 

    // 3. Affichage de la modale
    if (modal.parentElement) {
        modal.parentElement.classList.add('active');
    }
    
    // S'assurer que les boutons de fermeture fonctionnent (ils sont attachés dans DOMContentLoaded)
    document.querySelectorAll('.close-btn').forEach((btn) => btn.onclick = closeModal);
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
    

    if (content.image && image) {
        image.src = content.image;
        image.alt = content.title;
        image.style.display = 'block';
    } else if (image) {
        // Ajout pour masquer l'image si content.image est null/undefined (comme dans la modale simple)
        image.style.display = 'none';
        image.src = '';
    }


    let playButtonHtml = `<a class="btn play-btn" href="${content.link}">${content.cta || 'Play'}</a>`;
    

    if (content.video && video) {
        video.style.display = 'block';
        video.src = content.video;

        playButtonHtml = `<button class="btn play-btn video-toggle">Lecture Vidéo ▶</button>`;
    } else if (video) {
        // Ajout pour masquer la vidéo si content.video est null/undefined
        video.style.display = 'none';
        video.pause();
        video.src = "";
    }

  actions.innerHTML = `
        ${playButtonHtml}

    `;


    if (content.video && video) {
        const videoBtn = actions.querySelector('.video-toggle');
        // Nettoyer l'écouteur précédent si nécessaire (bonne pratique)
        const oldVideoBtn = actions.querySelector('.video-toggle');
        if (oldVideoBtn) oldVideoBtn.replaceWith(oldVideoBtn.cloneNode(true));
        
        const newVideoBtn = actions.querySelector('.video-toggle');
        newVideoBtn.addEventListener('click', (e) => {
            e.preventDefault();
            if (video.paused) {
                video.play();
                newVideoBtn.textContent = "Pause ⏸";
            } else {
                video.pause();
                newVideoBtn.textContent = "Lecture Vidéo ▶";
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

    if (modal.parentElement) {
        modal.parentElement.classList.add('active');
    }
    
    if (currentQuestionIndex < qcmData.length) {
        attachQCMListeners();
    }
    

    document.querySelectorAll('.close-btn').forEach((btn) => btn.onclick = closeModal);
}

// REMPLACEMENT de la fonction bindNodes existante
function bindNodes() {
    // Événement pour les NIVEAUX
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

    // Événement pour les ÉTOILES (NOUVEAU)
    document.querySelectorAll('.star').forEach((star) => {
        star.addEventListener('click', (event) => {
            event.stopPropagation(); 
            
            const starId = star.id;
            let title = "Étoile d'Information";
            let description = "Information générale sur la progression ou la carte.";

            // Logique de contenu spécifique à chaque étoile :
            if (starId === 's1') {
                 title = "NIRD Initiative: Progress Update";
                 description = "Nature and Objectives A collective of teachers is leading an initiative advocating for open-source and eco-responsible digital technology in educational institutions. This initiative aims to reconcile digital transformation with ecological transition in primary and secondary schools. It serves as a response to the end of Windows 10 support and the reliance on proprietary solutions.";
            } else if (starId === 's2') {
                 title = "The Three NIRD Pillars";
                 description = "Inclusion: Equitable access to digital technology and bridging the digital divide. Responsibility: Reasoned use of sovereign technologies that respect personal data. Sustainability: Fighting planned obsolescence, controlling costs, and extending the lifespan of equipment. Implementation of the Approach The approach is structured around three key stages: mobilization, experimentation, and integration. It is designed to be co-constructed with participants and remains intentionally flexible to adapt to local contexts. Initially, it targets interested teachers, who are invited to join a dedicated Tchap forum.";
            } else if (starId === 's3') {
                 title = "Role of Linux and Refurbishment";
                 description = "Gradual adoption of Linux as the technical foundation and primary driver of the initiative. Computer refurbishment (often performed with students) to equip the school fleet, families, or neighboring schools. Opening up new pedagogical possibilities centered on open-source digital tools.";
            } else if (starId === 's4') {
                 title = "Origin, Status, and Expansion";
                 description = "Inspired by the NIRD establishment project at Lycée Carnot in Bruay-la-Buissière. A spontaneous grassroots initiative, currently without official recognition. Ambition to federate existing initiatives and spread to other pilot schools.";
            } else if (starId === 's5') {Explora
                 title = "Resources and Participation";
                 description = "Resources offered: A \"NIRD approach\" Linux distribution, GitLab, a webpage for local authorities, and a detailed advocacy kit.Communication tools: Tchap channel, Mastodon account, and upcoming webinars.";
            }
            
            renderSimpleInfoModal(title, description);
        });
    });
}


function initDragToPan() {
  const stageWrapper = document.querySelector(".stage-wrapper");
// ... (reste de initDragToPan inchangé)
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

if(element && progressbar) {
    function handleMouseOver() {
      const score = getCookie('score') || 0; 
      progressbar.style.width = (20 * score)+'%';
      const woman = document.getElementById('women');
      const decat = document.getElementById('decat');
      const cve = document.getElementById('cve');
      const ergo = document.getElementById('ergo');
      const linux = document.getElementById('linux');
      if (getCookie('woman') === "1"){
        woman.src = "assets/images/medals/femme.png";
      }
      if (getCookie('decat') === "1"){
        decat.src = "assets/images/medals/decathlon.png";
      }
      if (getCookie('cve') === "1"){
        cve.src = "assets/images/medals/peche.png";
      }
      if (getCookie('ergo') === "1"){
        ergo.src = "assets/images/medals/brain.png";
      }
      if (getCookie('linux') === "1"){
        linux.src = "assets/images/medals/linux.png";
      }
    }
    function handleMouseOut() {
      const score = getCookie('score') || 0;
      progressbar.style.width = (20 * score)+'%';
      const woman = document.getElementById('women');
      const decat = document.getElementById('decat');
      const cve = document.getElementById('cve');
      const ergo = document.getElementById('ergo');
      const linux = document.getElementById('linux');
      if (getCookie('woman') === "1"){
        woman.src = "assets/images/medals/femme.png";
      }
      if (getCookie('decat') === "1"){
        decat.src = "assets/images/medals/decathlon.png";
      }
      if (getCookie('cve') === "1"){
        cve.src = "assets/images/medals/peche.png";
      }
      if (getCookie('ergo') === "1"){
        ergo.src = "assets/images/medals/brain.png";
      }
      if (getCookie('linux') === "1"){
        linux.src = "assets/images/medals/linux.png";
      }
    }
    element.addEventListener('mouseover', handleMouseOver);
    element.addEventListener('mouseout', handleMouseOut);
}