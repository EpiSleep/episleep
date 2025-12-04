const levelData = [
  {
    id: 'femmes-info',
    title: 'Femmes & Info',
    description: "Une aventure narrative pour mettre en lumière les héroïnes de l'informatique. Vidéos, quiz et archives interactives au programme.",
    cta: 'Découvrir le défi',
    image: 'https://dummyimage.com/900x400/2b3a67/ffffff&text=Femmes+%26+Info',
    link: '/games/femmes-info/index.html'
  },
  {
    id: 'decathlon',
    title: 'Décathlon Data Rush',
    description: 'Des mini-jeux sportifs fusionnés avec des micro-défis d’optimisation. Préparez vos algorithmes et vos baskets !',
    cta: 'Charger la map',
    image: 'https://dummyimage.com/900x400/173f2d/ffffff&text=Décathlon',
    link: '/games/decathlon/index.html'
  },
  {
    id: 'cve-explorer',
    title: 'CVE Explorer',
    description: 'Un scanner arcade pour explorer et visualiser les vulnérabilités CVE. Entrée, parsing, affichage — tout en pixel-art.',
    cta: 'Lancer le scanner',
    image: 'https://dummyimage.com/900x400/1f243d/ffffff&text=CVE+Explorer',
    link: '/games/cve-explorer/index.html'
  },
  {
    id: 'ergonomie',
    title: 'Dark Pattern Lab',
    description: 'Expérimentez (et corrigez) des interfaces retorses. Un laboratoire d’ergonomie pour remettre l’utilisateur au centre.',
    cta: 'Entrer dans le labo',
    image: 'https://dummyimage.com/900x400/3b1b2e/ffffff&text=Ergonomie',
    link: '/games/ergonomie-dark-pattern/index.html'
  }
];

function renderModal(content) {
  const modal = document.querySelector('#levelModal');
  const body = modal.querySelector('.body');
  const heading = modal.querySelector('h3');
  const image = modal.querySelector('img');
  const playBtn = modal.querySelector('.play-btn');

  heading.textContent = content.title;
  body.textContent = content.description;
  image.src = content.image;
  image.alt = content.title;
  playBtn.href = content.link;

  modal.parentElement.classList.add('active');
}

function bindNodes() {
  document.querySelectorAll('[data-level-id]').forEach((node) => {
    node.addEventListener('click', () => {
      const levelId = node.dataset.levelId;
      const content = levelData.find((item) => item.id === levelId);
      if (content) {
        renderModal(content);
      }
    });
  });
}

function closeModal() {
  const backdrop = document.querySelector('#levelModal').parentElement;
  backdrop.classList.remove('active');
}

document.addEventListener('DOMContentLoaded', () => {
  bindNodes();

  const backdrop = document.querySelector('#levelModal').parentElement;
  backdrop.addEventListener('click', (event) => {
    if (event.target === backdrop) {
      closeModal();
    }
  });

  document.querySelectorAll('.close-btn').forEach((btn) =>
    btn.addEventListener('click', closeModal)
  );
});
