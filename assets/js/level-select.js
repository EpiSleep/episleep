// ====================================================================
// 1. DATA ET STRUCTURE DU QCM (11 questions)
// ====================================================================

// Structure des données des niveaux (fournie par l'utilisateur)
const levelData = [
  {
    id: 'femmes-info',
    title: 'Women & IT',
    description: 'A narrative adventure highlighting the heroines of computing. Videos, quizzes, and interactive archives await.',
    cta: 'Discover the challenge',
    image: 'https://dummyimage.com/900x400/2b3a67/ffffff&text=Women+%26+IT',
    link: '/games/femmes-info/index.html'
  },
  {
    id: 'decathlon',
    title: 'Decathlon Data Rush',
    description: 'Sporty mini-games fused with micro-optimization challenges. Get your algorithms and sneakers ready!',
    cta: 'Load the map',
    image: 'https://dummyimage.com/900x400/173f2d/ffffff&text=Decathlon',
    link: '/games/decathlon/index.html' // Lien par défaut
  },
  {
    id: 'cve-explorer',
    title: 'CVE Explorer',
    description: 'An arcade scanner to explore and visualize CVE vulnerabilities. Input, parsing, display — all in pixel-art.',
    cta: 'Launch scanner',
    image: 'https://dummyimage.com/900x400/1f243d/ffffff&text=CVE+Explorer',
    link: '/games/cve-explorer/index.html'
  },
  {
    id: 'ergonomie',
    title: 'Dark Pattern Lab',
    description: 'Experiment with (and fix) devious interfaces. An ergonomics lab to put users back at the center.',
    cta: 'Enter the lab',
    image: 'https://dummyimage.com/900x400/3b1b2e/ffffff&text=Ergonomics',
    link: '/games/ergonomie-dark-pattern/index.html'
  }
];

// Variable pour stocker les réponses du QCM
let decathlonResponses = {};
let currentQuestionIndex = 0;

// Le QCM structuré complet
const qcmData = [
    {
        id: 1,
        question: "1. Quel est votre niveau de pratique sportive actuel ?",
        options: {
            A: "Débutant : Je commence tout juste.",
            B: "Intermédiaire : 1 à 2 fois par semaine.",
            C: "Avancé : 3 à 4 fois par semaine.",
            D: "Expert : 5 fois et plus par semaine."
        }
    },
    {
        id: 2,
        question: "2. Combien de temps total consacrez-vous ou souhaitez-vous consacrer au sport par semaine ?",
        options: {
            A: "Moins de 1 heure",
            B: "Entre 1 et 3 heures",
            C: "Entre 3 et 6 heures",
            D: "7 heures ou plus"
        }
    },
    {
        id: 3,
        question: "3. Quel est votre objectif principal en faisant du sport ?",
        options: {
            A: "Améliorer ma santé générale et mon bien-être.",
            B: "Perte de poids ou maintien d'un poids de forme.",
            C: "Gagner en muscle/force ou performance.",
            D: "Préparation à une compétition ou à un défi."
        }
    },
    {
        id: 4,
        question: "4. Quel type d'activité vous attire le plus ou pratiquez-vous déjà ?",
        options: {
            A: "Endurance (Course, vélo, natation...).",
            B: "Force/résistance (Musculation, Crossfit...).",
            C: "Sports collectifs ou de raquette.",
            D: "Flexibilité/bien-être (Yoga, Pilates, danse...)."
        }
    },
    {
        id: 5,
        question: "5. Quel est votre niveau de motivation ou d'engagement à long terme ?",
        options: {
            A: "Faible : si j'ai le temps/l'envie.",
            B: "Modéré : J'essaie de rester régulier.",
            C: "Fort : Je planifie mes séances à l'avance.",
            D: "Très Fort : Le sport est essentiel à mon planning."
        }
    },
    {
        id: 6,
        question: "6. Quel est votre environnement de pratique préféré ?",
        options: {
            A: "Principalement en extérieur.",
            B: "Principalement en intérieur (salle, maison).",
            C: "Un équilibre des deux.",
            D: "Je n'ai pas de préférence."
        }
    },
    {
        id: 7,
        question: "7. Préférez-vous vous entraîner seul(e) ou en groupe ?",
        options: {
            A: "Seul(e) : J'aime la concentration et l'autonomie.",
            B: "En groupe/équipe : J'ai besoin de l'émulation.",
            C: "Avec un(e) partenaire ou un petit groupe.",
            D: "J'alterne entre le solo et le groupe."
        }
    },
    {
        id: 8,
        question: "8. Quel est votre rapport au repos et à la récupération ?",
        options: {
            A: "Je ne m'en préoccupe pas vraiment.",
            B: "J'essaie d'intégrer un jour de repos par semaine.",
            C: "Je planifie activement mon sommeil et mes jours de repos.",
            D: "La récupération active est aussi importante que l'entraînement."
        }
    },
    {
        id: 9,
        question: "9. Quel est votre niveau de flexibilité pour les horaires d'entraînement ?",
        options: {
            A: "Très contraint : Seulement le week-end ou très tôt/tard.",
            B: "Assez flexible : Je peux m'adapter à différents moments.",
            C: "Je suis très structuré : même heure tous les jours.",
            D: "Je peux m'adapter, mais j'ai une forte préférence."
        }
    },
    {
        id: 10,
        question: "10. Comment gérez-vous les blessures ou les douleurs légères ?",
        options: {
            A: "Je continue l'entraînement sans rien changer.",
            B: "Je réduis l'intensité ou je prends un jour de repos.",
            C: "Je consulte un professionnel dès que la douleur persiste.",
            D: "J'adapte mes exercices pour contourner la zone douloureuse."
        }
    },
    {
        id: 11,
        question: "11. Quel type d'exercice de renforcement musculaire de base au poids du corps vous souhaitez le plus améliorer techniquement ?",
        options: {
            A: "Mouvements de Poussée (Pompes, Dips).",
            B: "Mouvements de Tirage (Tractions, Rameur inversé).",
            C: "Mouvements du Bas du corps (Squats, Fentes).",
            D: "Gainage et abdominaux profonds (Planche, Crunch)."
        }
    }
];

// ====================================================================
// 2. FONCTIONS DE LOGIQUE QCM ET PROFIL
// ====================================================================

function generateProfile() {
    let counts = { A: 0, B: 0, C: 0, D: 0 };
    
    // Compter les réponses
    Object.values(decathlonResponses).forEach(response => {
        counts[response]++;
    });

    let dominantProfile = 'B'; // Profil par défaut ou en cas d'égalité
    
    // Déterminer la réponse majoritaire (simplifié pour l'exemple)
    if (counts.D > counts.C && counts.D > counts.B && counts.D > counts.A) {
        dominantProfile = 'D';
    } else if (counts.C > counts.D && counts.C > counts.B && counts.C > counts.A) {
        dominantProfile = 'C';
    } else if (counts.A > counts.D && counts.A > counts.B && counts.A > counts.C) {
        dominantProfile = 'A';
    }

    // Définir le contenu du profil final
    const profileContent = {
        A: { title: "Profil A : Découverte & Loisir", description: "Vous visez le bien-être et la régularité. Ce niveau Decathlon se concentre sur les bases de la programmation pour la santé et le bien-être.", link: '/games/decathlon/index.html?profile=A' },
        B: { title: "Profil B : Intermédiaire & Forme", description: "Vous êtes régulier et cherchez à améliorer votre endurance. Ce niveau Decathlon vous met au défi d'optimiser des routines sportives via des algorithmes.", link: '/games/decathlon/index.html?profile=B' },
        C: { title: "Profil C : Avancé & Performance", description: "Votre objectif est la force et la performance spécifique. Ce niveau Decathlon nécessite une analyse approfondie des données de performance et de gain de force.", link: '/games/decathlon/index.html?profile=C' },
        D: { title: "Profil D : Athlète & Compétition", description: "Votre engagement est total. Ce niveau Decathlon vous confronte à des défis de micro-optimisation et de gestion de gros jeux de données sportifs.", link: '/games/decathlon/index.html?profile=D' }
    };

    return profileContent[dominantProfile];
}

// Fonction pour passer à la question suivante
function nextQuestion(answer) {
    const currentQ = qcmData[currentQuestionIndex];
    decathlonResponses[currentQ.id] = answer; // Stocker la réponse
    
    currentQuestionIndex++; // Passer à la question suivante
    
    // Ré-afficher la modale, ce qui déclenchera la question suivante ou le profil final
    const decathlonContent = levelData.find(item => item.id === 'decathlon');
    if (decathlonContent) {
        renderModal(decathlonContent);
    }
}

// Attacher les écouteurs d'événements pour les boutons de réponse du QCM
function attachQCMListeners() {
    document.querySelectorAll('.qcm-option').forEach(button => {
        // Détacher d'abord pour éviter les doubles écouteurs
        button.onclick = null; 
        
        button.onclick = () => {
            const answer = button.dataset.answer;
            nextQuestion(answer);
        };
    });
}

// ====================================================================
// 3. FONCTIONS D'INTERFACE UTILISATEUR (MODALE)
// ====================================================================

function closeModal() {
  const modal = document.querySelector('#levelModal');
  if (modal && modal.parentElement) {
    modal.parentElement.classList.remove('active');
  }
}

// Fonction utilitaire pour le rendu par défaut des autres niveaux
function renderDefaultModal(content) {
    const modal = document.querySelector('#levelModal');
    const body = modal.querySelector('.body');
    const heading = modal.querySelector('h3');
    const image = modal.querySelector('img');
    const actions = modal.querySelector('.actions');

    heading.textContent = content.title;
    body.textContent = content.description;
    image.src = content.image;
    image.alt = content.title;
    
    // Réinitialiser les boutons d'action au format par défaut
    actions.innerHTML = `
        <a class="btn play-btn" href="${content.link}">${content.cta || 'Play'}</a>
        <button class="btn secondary close-btn" onclick="closeModal()">Maybe later</button>
    `;

    if (modal.parentElement) {
        modal.parentElement.classList.add('active');
    }
}

function renderModal(content) {
    const modal = document.querySelector('#levelModal');
    if (!modal) return console.warn('Modal element (#levelModal) not found.');

    const body = modal.querySelector('.body');
    const heading = modal.querySelector('h3');
    const image = modal.querySelector('img');
    const actions = modal.querySelector('.actions');

    // Rendre la modale normale pour tous les niveaux SAUF Decathlon
    if (content.id !== 'decathlon') {
        renderDefaultModal(content);
        return;
    }

    // --- LOGIQUE SPÉCIFIQUE AU QCM DECATHLON ---

    // Si le QCM est terminé, afficher le profil final
    if (currentQuestionIndex >= qcmData.length) {
        const finalProfile = generateProfile();
        heading.textContent = `Mission Briefing: ${finalProfile.title}`;
        // Utiliser innerHTML pour permettre les balises HTML si besoin
        body.innerHTML = `<p>${finalProfile.description}</p>`; 
        image.src = content.image; 
        image.alt = finalProfile.title;
        
        // Afficher le bouton "Play" avec le lien du profil
        actions.innerHTML = `
            <a class="btn play-btn" href="${finalProfile.link}">Start the mission</a>
            <button class="btn secondary close-btn" onclick="closeModal()">Maybe later</button>
        `;

    } else {
        // Afficher la question actuelle
        const currentQ = qcmData[currentQuestionIndex];
        heading.textContent = `QCM Decathlon (${currentQ.id}/${qcmData.length})`;
        
        let questionHTML = `<h4>${currentQ.question}</h4><ul style="list-style: none; padding: 0;">`;
        for (const [key, value] of Object.entries(currentQ.options)) {
            // Utilisation d'un style en ligne pour le bouton pour coller au style global
            questionHTML += `<li style="margin-bottom: 8px;"><button class="qcm-option btn secondary" data-answer="${key}" style="text-align: left; width: 100%;">${key}. ${value}</button></li>`;
        }
        questionHTML += '</ul>';
        
        body.innerHTML = questionHTML;
        image.src = content.image; 

        // Afficher uniquement le bouton d'annulation pendant le QCM
        actions.innerHTML = `<button class="btn secondary close-btn" onclick="closeModal()">Annuler le QCM</button>`;
    }

    // Afficher la modale (backdrop.classList.add('active'))
    if (modal.parentElement) {
        modal.parentElement.classList.add('active');
    }
    
    // Attacher les écouteurs d'événements pour les boutons de réponse QCM
    if (currentQuestionIndex < qcmData.length) {
        attachQCMListeners();
    }
    
    // S'assurer que les boutons de fermeture fonctionnent toujours
    document.querySelectorAll('.close-btn').forEach((btn) => btn.addEventListener('click', closeModal));
}

function bindNodes() {
    document.querySelectorAll('[data-level-id]').forEach((node) => {
        node.addEventListener('click', () => {
            const levelId = node.dataset.levelId;
            const content = levelData.find((item) => item.id === levelId);

            // Réinitialiser le QCM si l'on clique sur Decathlon pour commencer
            if (levelId === 'decathlon') {
                decathlonResponses = {};
                currentQuestionIndex = 0;
            }

            if (content) {
                renderModal(content);
            }
        });
    });
}

function initDragToPan() {
  const stageWrapper = document.querySelector('.stage-wrapper');
  if (!stageWrapper) return;

  let isDragging = false;
  let startX = 0;
  let startY = 0;
  let scrollLeft = 0;
  let scrollTop = 0;

  stageWrapper.addEventListener('mousedown', (event) => {
    if (event.button !== 0) return; // left click only
    isDragging = true;
    stageWrapper.classList.add('is-dragging');
    startX = event.pageX - stageWrapper.offsetLeft;
    startY = event.pageY - stageWrapper.offsetTop;
    scrollLeft = stageWrapper.scrollLeft;
    scrollTop = stageWrapper.scrollTop;
    document.body.style.userSelect = 'none';
  });

  window.addEventListener('mouseup', () => {
    isDragging = false;
    stageWrapper.classList.remove('is-dragging');
    document.body.style.userSelect = '';
  });

  stageWrapper.addEventListener('mousemove', (event) => {
    if (!isDragging) return;
    event.preventDefault();
    const x = event.pageX - stageWrapper.offsetLeft;
    const y = event.pageY - stageWrapper.offsetTop;
    stageWrapper.scrollLeft = scrollLeft - (x - startX);
    stageWrapper.scrollTop = scrollTop - (y - startY);
  });

  // Touch support
  let touchStart = null;
  stageWrapper.addEventListener('touchstart', (e) => {
    if (e.touches.length !== 1) return;
    touchStart = { x: e.touches[0].pageX, y: e.touches[0].pageY, sl: stageWrapper.scrollLeft, st: stageWrapper.scrollTop };
  });
  stageWrapper.addEventListener('touchmove', (e) => {
    if (!touchStart) return;
    const dx = e.touches[0].pageX - touchStart.x;
    const dy = e.touches[0].pageY - touchStart.st;
    stageWrapper.scrollLeft = touchStart.sl - dx;
    stageWrapper.scrollTop = touchStart.st - dy;
  });
  stageWrapper.addEventListener('touchend', () => { touchStart = null; });
}

// ====================================================================
// 4. INITIALISATION
// ====================================================================

document.addEventListener('DOMContentLoaded', () => {
  bindNodes();
  initDragToPan();

  // Gestion du clic sur le backdrop pour fermer la modale
  const backdrop = document.querySelector('#levelModal').parentElement;
  if (backdrop) {
    backdrop.addEventListener('click', (event) => {
      // Ne fermer que si l'on clique directement sur le fond (pas sur la modale elle-même)
      if (event.target === backdrop) {
        closeModal();
      }
    });
  }

  // Écouteurs pour tous les boutons de fermeture
  document.querySelectorAll('.close-btn').forEach((btn) =>
    btn.addEventListener('click', closeModal)
  );
});