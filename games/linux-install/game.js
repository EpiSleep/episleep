// Linux Installation Game - Step Ordering Challenge

// Define the correct installation steps in order
const correctOrder = [
  {
    id: 1,
    text: "Choose a Linux distribution (Ubuntu, Fedora, Mint, etc.)"
  },
  {
    id: 2,
    text: "Download the ISO file from the official website"
  },
  {
    id: 3,
    text: "Create a bootable USB drive with the ISO"
  },
  {
    id: 4,
    text: "Backup your important data"
  },
  {
    id: 5,
    text: "Boot from the USB drive"
  },
  {
    id: 6,
    text: "Start the installer and configure language/timezone"
  },
  {
    id: 7,
    text: "Partition the disk and install the system"
  },
  {
    id: 8,
    text: "Reboot and enjoy your new Linux system"
  }
];

// Current order of steps (will be shuffled)
let currentOrder = [];
let draggedElement = null;
let isVerified = false;

// DOM elements
const stepsContainer = document.getElementById('steps-container');
const verifyBtn = document.getElementById('verify-btn');
const resetBtn = document.getElementById('reset-btn');
const resultMessage = document.getElementById('result-message');
const nextLevelBtn = document.getElementById('next-level-btn');

// Initialize the game
function initGame() {
  // Shuffle the steps
  currentOrder = shuffleArray([...correctOrder]);
  renderSteps();
  attachEventListeners();
  isVerified = false;
  resultMessage.style.display = 'none';
  resultMessage.className = 'result-message';
  nextLevelBtn.style.display = 'none';
}

// Shuffle array function (Fisher-Yates)
function shuffleArray(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

// Render steps in the DOM
function renderSteps() {
  stepsContainer.innerHTML = '';

  currentOrder.forEach((step, index) => {
    const stepElement = createStepElement(step, index);
    stepsContainer.appendChild(stepElement);
  });
}

// Create a step element
function createStepElement(step, index) {
  const div = document.createElement('div');
  div.className = 'step-item';
  div.draggable = true;
  div.dataset.stepId = step.id;
  div.dataset.index = index;

  const textDiv = document.createElement('div');
  textDiv.className = 'step-text';
  textDiv.textContent = step.text;

  div.appendChild(textDiv);

  // Add drag event listeners
  div.addEventListener('dragstart', handleDragStart);
  div.addEventListener('dragend', handleDragEnd);
  div.addEventListener('dragover', handleDragOver);
  div.addEventListener('drop', handleDrop);
  div.addEventListener('dragenter', handleDragEnter);
  div.addEventListener('dragleave', handleDragLeave);

  return div;
}

// Drag and Drop handlers
function handleDragStart(e) {
  if (isVerified) return;

  draggedElement = this;
  this.classList.add('dragging');
  e.dataTransfer.effectAllowed = 'move';
  e.dataTransfer.setData('text/html', this.innerHTML);
}

function handleDragEnd(e) {
  this.classList.remove('dragging');

  // Remove drag-over class from all items
  const items = document.querySelectorAll('.step-item');
  items.forEach(item => item.classList.remove('drag-over'));
}

function handleDragOver(e) {
  if (e.preventDefault) {
    e.preventDefault();
  }
  e.dataTransfer.dropEffect = 'move';
  return false;
}

function handleDragEnter(e) {
  if (this !== draggedElement) {
    this.classList.add('drag-over');
  }
}

function handleDragLeave(e) {
  this.classList.remove('drag-over');
}

function handleDrop(e) {
  if (e.stopPropagation) {
    e.stopPropagation();
  }

  if (draggedElement !== this) {
    // Get indices
    const draggedIndex = parseInt(draggedElement.dataset.index);
    const targetIndex = parseInt(this.dataset.index);

    // Swap in currentOrder array
    [currentOrder[draggedIndex], currentOrder[targetIndex]] =
      [currentOrder[targetIndex], currentOrder[draggedIndex]];

    // Re-render
    renderSteps();
  }

  return false;
}

// Verify the order
function verifyOrder() {
  if (isVerified) return;

  let allCorrect = true;
  const stepElements = stepsContainer.querySelectorAll('.step-item');

  stepElements.forEach((element, index) => {
    const stepId = parseInt(element.dataset.stepId);
    const correctId = correctOrder[index].id;

    // Remove previous validation classes
    element.classList.remove('correct', 'incorrect');

    if (stepId === correctId) {
      element.classList.add('correct');
    } else {
      element.classList.add('incorrect');
      allCorrect = false;
    }
  });

  // Display result message
  if (allCorrect) {
    resultMessage.className = 'result-message success';
    resultMessage.textContent = '🎉 Perfect! You have correctly ordered all the Linux installation steps!';
    resultMessage.style.display = 'block';
    nextLevelBtn.style.display = 'inline-flex';
    isVerified = true;

    // Mark game as completed and update score
    completeGame('linux');

    // Disable dragging
    stepElements.forEach(element => {
      element.draggable = false;
      element.style.cursor = 'default';
    });
  } else {
    resultMessage.className = 'result-message error';
    resultMessage.textContent = '❌ Some steps are not in the correct order. Incorrect steps are shown in red. Try again!';
    resultMessage.style.display = 'block';

    // Allow user to continue rearranging
    isVerified = false;
  }
}

// Reset the game
function resetGame() {
  // Clear validation classes
  const stepElements = stepsContainer.querySelectorAll('.step-item');
  stepElements.forEach(element => {
    element.classList.remove('correct', 'incorrect');
    element.draggable = true;
    element.style.cursor = 'grab';
  });

  // Re-shuffle and render
  currentOrder = shuffleArray([...correctOrder]);
  renderSteps();

  // Reset UI
  isVerified = false;
  resultMessage.style.display = 'none';
  resultMessage.className = 'result-message';
  nextLevelBtn.style.display = 'none';
}

// Attach event listeners
function attachEventListeners() {
  verifyBtn.addEventListener('click', verifyOrder);
  resetBtn.addEventListener('click', resetGame);
}

// Initialize game on page load
document.addEventListener('DOMContentLoaded', () => {
  initGameMusic('linux-install.mp3');
  initGame();
});

