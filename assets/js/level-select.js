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
    const dy = e.touches[0].pageY - touchStart.y;
    stageWrapper.scrollLeft = touchStart.sl - dx;
    stageWrapper.scrollTop = touchStart.st - dy;
  });
  stageWrapper.addEventListener('touchend', () => { touchStart = null; });
}

document.addEventListener('DOMContentLoaded', () => {
  bindNodes();
  initDragToPan();

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
