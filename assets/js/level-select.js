
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
    link: '/games/decathlon/index.html' 
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

// Variables globales pour le QCM
let decathlonResponses = {}; // Réponses Q1 à Q10
let miniGameSelection = null; // Réponse Q11 (Mini-jeu)
let currentQuestionIndex = 0;

// Le QCM structuré complet (11 questions)
const qcmData = [
    // [Q1-Q10 : Profil Général]
    { id: 1, question: "1. Quel est votre niveau de pratique sportive actuel ?", options: { A: "Débutant.", B: "Intermédiaire.", C: "Avancé.", D: "Expert." } },
    { id: 2, question: "2. Combien de temps par semaine consacrez-vous au sport ?", options: { A: "Moins de 1h", B: "1h-3h", C: "3h-6h", D: "7h et plus" } },
    { id: 3, question: "3. Quel est votre objectif principal ?", options: { A: "Santé et bien-être.", B: "Perte de poids/Endurance.", C: "Gain de muscle/force.", D: "Compétition/Défi." } },
    { id: 4, question: "4. Quel type d'activité vous attire le plus ?", options: { A: "Endurance (Course, vélo, natation).", B: "Force/résistance (Musculation).", C: "Sports collectifs.", D: "Flexibilité/bien-être (Yoga, Pilates)." } },
    { id: 5, question: "5. Quel est votre niveau de motivation à long terme ?", options: { A: "Faible.", B: "Modéré.", C: "Fort.", D: "Très Fort." } },
    { id: 6, question: "6. Quel est votre environnement de pratique préféré ?", options: { A: "En extérieur.", B: "En intérieur (salle, maison).", C: "Un équilibre des deux.", D: "Je n'ai pas de préférence." } },
    { id: 7, question: "7. Préférez-vous vous entraîner seul(e) ou en groupe ?", options: { A: "Seul(e).", B: "En groupe/équipe.", C: "Avec un(e) partenaire.", D: "J'alterne." } },
    { id: 8, question: "8. Comment gérez-vous le repos et la récupération ?", options: { A: "Je ne m'en préoccupe pas.", B: "J'essaie d'intégrer un jour de repos.", C: "Je planifie activement le repos/sommeil.", D: "La récupération active est primordiale." } },
    { id: 9, question: "9. Quel est votre niveau de flexibilité pour les horaires ?", options: { A: "Très contraint.", B: "Assez flexible.", C: "Très structuré (même heure).", D: "Forte préférence (ex: matin)." } },
    { id: 10, question: "10. Comment gérez-vous les douleurs légères ?", options: { A: "Je continue sans changer.", B: "Je réduis l'intensité/je me repose.", C: "Je consulte un professionnel.", D: "J'adapte mes exercices." } },
    // [Q11 : Sélecteur de Mini-Jeu]
    {
        id: 11,
        question: "11. Quel mouvement fondamental souhaitez-vous le plus améliorer pour le mini-jeu de timing ZQSD ?",
        options: {
            A: "Mouvements de Poussée (Pompes).",
            B: "Mouvements de Tirage (Tractions).",
            C: "Mouvements du Bas du corps (Squats).",
            D: "Gainage (Planche)."
        },
        isMiniGameSelector: true
    }
];

// URL de la mascotte pour la revue finale (Vérifiez que ce chemin est correct)
const MASCOT_URL = 'assets/img/mascot-decathlon.png'; 

// ====================================================================
// 2. FONCTIONS DE LOGIQUE QCM ET PROFIL
// ====================================================================

function generateProfile() {
    let counts = { A: 0, B: 0, C: 0, D: 0 };
    
    Object.values(decathlonResponses).forEach(response => {
        counts[response]++;
    });

    let dominantProfile = 'B'; 
    if (counts.D > counts.C && counts.D > counts.B && counts.D > counts.A) {
        dominantProfile = 'D';
    } else if (counts.C > counts.D && counts.C > counts.B && counts.C > counts.A) {
        dominantProfile = 'C';
    } else if (counts.A > counts.D && counts.A > counts.B && counts.A > counts.C) {
        dominantProfile = 'A';
    }

    const gameParam = miniGameSelection ? `&game=${miniGameSelection}` : '';

    const profileContent = {
        A: { 
            title: "Profil A : Programme d'initiation", 
            description: "Votre profil est **Découverte & Loisir**. Ce niveau Decathlon se concentre sur **l'initiation aux algorithmes de santé basiques** et la **gestion des données de faible volume**.", 
            link: `/games/decathlon/index.html?profile=A${gameParam}` 
        },
        B: { 
            title: "Profil B : Optimisation de la routine", 
            description: "Votre profil est **Intermédiaire & Forme**. Ce niveau Decathlon vous met au défi **d'optimiser des routines sportives** via des algorithmes et d'analyser des **séries de données moyennes**.", 
            link: `/games/decathlon/index.html?profile=B${gameParam}` 
        },
        C: { 
            title: "Profil C : Spécialisation Performance", 
            description: "Votre profil est **Avancé & Performance**. Ce niveau Decathlon nécessite une **analyse approfondie des données d'entraînement** et la **création de modèles de charge**.", 
            link: `/games/decathlon/index.html?profile=C${gameParam}` 
        },
        D: { 
            title: "Profil D : Challenge Athlète Pro", 
            description: "Votre profil est **Athlète & Compétition**. Ce niveau Decathlon vous confronte à la **micro-optimisation** des performances et à la **gestion de très gros jeux de données** en temps réel.", 
            link: `/games/decathlon/index.html?profile=D${gameParam}` 
        }
    };

    return profileContent[dominantProfile];
}

function nextQuestion(answer) {
    const currentQ = qcmData[currentQuestionIndex];

    if (currentQ.isMiniGameSelector) {
        miniGameSelection = answer; 
    } else {
        decathlonResponses[currentQ.id] = answer; 
    }
    
    currentQuestionIndex++; 
    
    const decathlonContent = levelData.find(item => item.id === 'decathlon');
    if (decathlonContent) {
        renderModal(decathlonContent);
    }
}

function attachQCMListeners() {
    document.querySelectorAll('.qcm-option').forEach(button => {
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

function renderModal(content) {
    const modal = document.querySelector('#levelModal');
    if (!modal) return console.warn('Modal element (#levelModal) not found.');

    const body = modal.querySelector('.body');
    const heading = modal.querySelector('h3');
    const image = modal.querySelector('img');
    const actions = modal.querySelector('.actions');
    
    // Nettoyer la classe de revue avant de commencer
    modal.classList.remove('is-review');

    // --- Rendu par défaut pour les niveaux non-Decathlon ---
    if (content.id !== 'decathlon') {
        heading.textContent = content.title;
        body.textContent = content.description;
        image.src = content.image;
        image.alt = content.title;

        actions.innerHTML = `
            <a class="btn play-btn" href="${content.link}">${content.cta || 'Play'}</a>
            <button class="btn secondary close-btn" onclick="closeModal()">Maybe later</button>
        `;
        image.style.display = 'block';
    }

    // --- LOGIQUE SPÉCIFIQUE AU QCM DECATHLON ---
    else {
        // Le QCM est terminé, afficher le profil final (REVUE)
        if (currentQuestionIndex >= qcmData.length) {
            const finalProfile = generateProfile();
            
            modal.classList.add('is-review'); // Ajout de la classe de style pour la revue

            heading.textContent = `Synthèse du Profil Sportif`;

            // Utilisation de la nouvelle structure CSS (review-layout)
            body.innerHTML = `
                <div class="review-layout">
                    <div class="review-profile-details">
                        <h4>${finalProfile.title}</h4>
                        <p>${finalProfile.description}</p>
                    </div>
                    <div class="review-mascot">
                        <img src="${MASCOT_URL}" alt="Mascotte Decathlon">
                    </div>
                </div>
            `; 
            
            // L'image par défaut de la modale est masquée par le CSS .is-review
            
            // Afficher le bouton "Play" avec le lien du profil
            actions.innerHTML = `
                <a class="btn play-btn" href="${finalProfile.link}">Commencer la mission</a>
                <button class="btn secondary close-btn" onclick="closeModal()">Maybe later</button>
            `;

        } 
        // Le QCM est en cours
        else {
            const currentQ = qcmData[currentQuestionIndex];
            heading.textContent = `QCM Decathlon (${currentQ.id}/${qcmData.length})`;
            
            let questionHTML = `<h2>${currentQ.question}</h2><ul class="qcm-options-list">`;
            for (const [key, value] of Object.entries(currentQ.options)) {
                questionHTML += `<li style="margin-bottom: 8px;">
                    <button class="qcm-option btn secondary" data-answer="${key}">
                        ${key}. ${value}
                    </button>
                </li>`;
            }
            questionHTML += '</ul>';
            
            body.innerHTML = questionHTML;
            
            image.style.display = 'block';
            image.src = content.image;

            actions.innerHTML = `<button class="btn secondary close-btn" onclick="closeModal()">Annuler le QCM</button>`;
        }
    }

    // Afficher la modale
    if (modal.parentElement) {
        modal.parentElement.classList.add('active');
    }
    
    // Attacher les écouteurs pour les boutons de réponse QCM si nécessaire
    if (content.id === 'decathlon' && currentQuestionIndex < qcmData.length) {
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
                miniGameSelection = null;
                currentQuestionIndex = 0;
            }

            if (content) {
                renderModal(content);
            }
        });
    });
}

// Fonction de gestion du glisser-déposer de la carte (inchangée)
function initDragToPan() {
  const stageWrapper = document.querySelector('.stage-wrapper');
  if (!stageWrapper) return;

  let isDragging = false;
  let startX = 0;
  let startY = 0;
  let scrollLeft = 0;
  let scrollTop = 0;

  stageWrapper.addEventListener('mousedown', (event) => {
    if (event.button !== 0) return; 
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
    const dy = e.touches[0].pageY - touchStart.y;
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

  const backdrop = document.querySelector('#levelModal').parentElement;
  if (backdrop) {
    backdrop.addEventListener('click', (event) => {
      if (event.target === backdrop) {
        closeModal();
      }
    });
  }

  document.querySelectorAll('.close-btn').forEach((btn) =>
    btn.addEventListener('click', closeModal)
  );
});