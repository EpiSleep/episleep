// Dark Pattern Lab - Complex Date Input Game
// Goal: Make date input as frustratingly complex as possible

class DateGame {
  constructor() {
    this.currentStep = 0;
    this.userDate = null;
    this.steps = [
      'initial',
      'chinese',
      'islamic',
      'timezone',
      'written',
      'roman',
      'backwards',
      'success'
    ];
    this.init();
  }

  init() {
    this.showStep('initial');
    this.attachEventListeners();
  }

  attachEventListeners() {
    // Initial date input
    const initialForm = document.getElementById('initial-form');
    if (initialForm) {
      initialForm.addEventListener('submit', (e) => {
        e.preventDefault();
        this.handleInitialDate();
      });
    }
  }

  handleInitialDate() {
    const dateInput = document.getElementById('date-input');
    const date = new Date(dateInput.value);

    if (!dateInput.value || isNaN(date)) {
      this.showError('Please enter a valid date');
      return;
    }

    this.userDate = date;
    document.getElementById('display-date').textContent = this.formatDate(date);
    document.getElementById('date-display-container').style.display = 'block';
    this.nextStep();
  }

  formatDate(date) {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  showStep(stepName) {
    // Hide all steps
    document.querySelectorAll('.game-step').forEach(step => {
      step.style.display = 'none';
    });

    // Show current step
    const currentStepEl = document.getElementById(`step-${stepName}`);
    if (currentStepEl) {
      currentStepEl.style.display = 'block';
    }

    // Update progress
    const stepIndex = this.steps.indexOf(stepName);
    const progress = (stepIndex / (this.steps.length - 1)) * 100;
    document.getElementById('progress').style.width = `${progress}%`;
  }

  nextStep() {
    this.currentStep++;
    if (this.currentStep >= this.steps.length) {
      this.currentStep = this.steps.length - 1;
    }
    this.showStep(this.steps[this.currentStep]);
    this.initCurrentStep();
  }

  initCurrentStep() {
    const stepName = this.steps[this.currentStep];

    switch(stepName) {
      case 'chinese':
        this.initChineseCalendar();
        break;
      case 'islamic':
        this.initIslamicCalendar();
        break;
      case 'timezone':
        this.initTimezone();
        break;
      case 'written':
        this.initWritten();
        break;
      case 'roman':
        this.initRoman();
        break;
      case 'backwards':
        this.initBackwards();
        break;
    }
  }

  initChineseCalendar() {
    const form = document.getElementById('chinese-form');
    const expected = this.getChineseYear(this.userDate.getFullYear());

    document.getElementById('chinese-hint').textContent =
      `Convert ${this.userDate.getFullYear()} to the Chinese calendar`;

    // Add show answer button
    const showAnswerBtn = document.getElementById('chinese-show-answer');
    showAnswerBtn.onclick = () => {
      document.getElementById('chinese-animal').value = expected.animal;
      document.getElementById('chinese-element').value = expected.element;
      showAnswerBtn.disabled = true;
      showAnswerBtn.textContent = 'Answer shown ✓';
    };

    form.onsubmit = (e) => {
      e.preventDefault();
      const animal = document.getElementById('chinese-animal').value;
      const element = document.getElementById('chinese-element').value;

      if (animal === expected.animal && element === expected.element) {
        this.nextStep();
      } else {
        this.showError('Incorrect! Check the Chinese cycle.');
      }
    };
  }

  getChineseYear(year) {
    const animals = ['Rat', 'Ox', 'Tiger', 'Rabbit', 'Dragon', 'Snake',
                     'Horse', 'Goat', 'Monkey', 'Rooster', 'Dog', 'Pig'];
    const elements = ['Metal', 'Water', 'Wood', 'Fire', 'Earth'];

    const animalIndex = (year - 4) % 12;
    const elementIndex = Math.floor(((year - 4) % 10) / 2);

    return {
      animal: animals[animalIndex],
      element: elements[elementIndex]
    };
  }

  initIslamicCalendar() {
    const form = document.getElementById('islamic-form');
    const gregorianYear = this.userDate.getFullYear();
    const islamicYear = Math.floor((gregorianYear - 622) * 1.030684);

    document.getElementById('islamic-hint').textContent =
      `The year ${gregorianYear} corresponds approximately to which Hijri year?`;

    form.onsubmit = (e) => {
      e.preventDefault();
      const userAnswer = parseInt(document.getElementById('islamic-year').value);

      // Allow margin of error of ±1 year
      if (Math.abs(userAnswer - islamicYear) <= 1) {
        this.nextStep();
      } else {
        this.showError(`Incorrect! The Islamic year is close to ${islamicYear}.`);
      }
    };
  }

  initTimezone() {
    // Get user's actual timezone
    const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    let selectedLocation = null;
    let map = null;
    let marker = null;

    // Initialize Leaflet map
    map = L.map('timezone-map').setView([20, 0], 2);

    // Add OpenStreetMap tiles with dark theme
    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      subdomains: 'abcd',
      maxZoom: 19
    }).addTo(map);

    // Simplified timezone regions (approximate lat/lng bounds)
    const timezoneRegions = {
// --- North America ---
      'America/New_York': { lat: [25, 50], lng: [-90, -70] },      // Eastern Time
      'America/Chicago': { lat: [25, 50], lng: [-105, -85] },      // Central Time
      'America/Denver': { lat: [25, 50], lng: [-115, -100] },      // Mountain Time
      'America/Los_Angeles': { lat: [30, 50], lng: [-125, -110] }, // Pacific Time
      'America/Phoenix': { lat: [31, 37], lng: [-115, -109] },     // Mountain Standard (No DST)
      'America/Anchorage': { lat: [50, 72], lng: [-170, -130] },   // Alaska
      'Pacific/Honolulu': { lat: [18, 23], lng: [-161, -154] },    // Hawaii
      'America/Vancouver': { lat: [48, 60], lng: [-140, -114] },   // Pacific Canada
      'America/Toronto': { lat: [41, 57], lng: [-96, -74] },       // Eastern Canada
      'America/Mexico_City': { lat: [14, 24], lng: [-106, -96] },  // Central Mexico

// --- South America ---
      'America/Sao_Paulo': { lat: [-34, -20], lng: [-53, -44] },   // Brazil East
      'America/Argentina/Buenos_Aires': { lat: [-55, -21], lng: [-74, -53] }, // Argentina
      'America/Santiago': { lat: [-56, -17], lng: [-76, -66] },    // Chile
      'America/Bogota': { lat: [-5, 13], lng: [-80, -66] },        // Colombia
      'America/Lima': { lat: [-19, 0], lng: [-82, -68] },          // Peru

// --- Europe ---
      'Europe/London': { lat: [49, 61], lng: [-8, 2] },            // UK/Ireland
      'Europe/Paris': { lat: [41, 51], lng: [-5, 10] },            // France
      'Europe/Berlin': { lat: [47, 55], lng: [5, 15] },            // Germany
      'Europe/Madrid': { lat: [35, 44], lng: [-10, 5] },           // Spain
      'Europe/Rome': { lat: [36, 47], lng: [6, 19] },              // Italy
      'Europe/Warsaw': { lat: [49, 55], lng: [14, 24] },           // Poland
      'Europe/Kiev': { lat: [44, 53], lng: [22, 41] },             // Ukraine
      'Europe/Moscow': { lat: [50, 70], lng: [28, 60] },           // Western Russia
      'Europe/Istanbul': { lat: [35, 42], lng: [25, 45] },         // Turkey

// --- Africa ---
      'Africa/Cairo': { lat: [22, 32], lng: [25, 37] },            // Egypt
      'Africa/Johannesburg': { lat: [-35, -22], lng: [16, 33] },   // South Africa
      'Africa/Lagos': { lat: [4, 14], lng: [2, 15] },              // Nigeria (West Africa)
      'Africa/Nairobi': { lat: [-5, 5], lng: [33, 42] },           // Kenya (East Africa)
      'Africa/Casablanca': { lat: [21, 36], lng: [-17, -1] },      // Morocco

// --- Asia & Middle East ---
      'Asia/Dubai': { lat: [22, 27], lng: [51, 57] },              // UAE
      'Asia/Jerusalem': { lat: [29, 34], lng: [34, 36] },          // Israel
      'Asia/Riyadh': { lat: [16, 33], lng: [34, 56] },             // Saudi Arabia
      'Asia/Tehran': { lat: [25, 40], lng: [44, 64] },             // Iran
      'Asia/Kolkata': { lat: [8, 38], lng: [68, 98] },             // India
      'Asia/Bangkok': { lat: [5, 21], lng: [97, 106] },            // Thailand/Indochina
      'Asia/Singapore': { lat: [1, 2], lng: [103, 104] },          // Singapore
      'Asia/Shanghai': { lat: [18, 54], lng: [73, 135] },          // China (Beijing Time)
      'Asia/Tokyo': { lat: [24, 46], lng: [122, 154] },            // Japan
      'Asia/Seoul': { lat: [33, 39], lng: [124, 131] },            // South Korea
      'Asia/Hong_Kong': { lat: [22, 23], lng: [113, 115] },        // Hong Kong
      'Asia/Jakarta': { lat: [-11, -5], lng: [105, 115] },         // Western Indonesia

// --- Oceania ---
      'Australia/Sydney': { lat: [-38, -28], lng: [140, 154] },    // Eastern Australia
      'Australia/Melbourne': { lat: [-39, -33], lng: [140, 150] }, // SE Australia
      'Australia/Perth': { lat: [-36, -13], lng: [112, 129] },     // Western Australia
      'Pacific/Auckland': { lat: [-48, -34], lng: [166, 179] },    // New Zealand
      'Pacific/Fiji': { lat: [-22, -12], lng: [174, 182] }         // Fiji
    };

    // Function to detect timezone from clicked coordinates
    function detectTimezone(lat, lng) {
      for (const [tz, bounds] of Object.entries(timezoneRegions)) {
        if (lat >= bounds.lat[0] && lat <= bounds.lat[1] &&
            lng >= bounds.lng[0] && lng <= bounds.lng[1]) {
          return tz;
        }
      }
      return null;
    }

    // Map click handler
    map.on('click', function(e) {
      const latlng = e.latlng;

      // Remove previous marker if exists
      if (marker) {
        map.removeLayer(marker);
      }

      // Add new marker with custom styling
      marker = L.circleMarker(latlng, {
        radius: 10,
        fillColor: '#ff7ee2',
        color: '#fff',
        weight: 2,
        opacity: 1,
        fillOpacity: 0.8
      }).addTo(map);

      // Detect timezone from coordinates
      const detectedTz = detectTimezone(latlng.lat, latlng.lng);
      selectedLocation = { lat: latlng.lat, lng: latlng.lng, timezone: detectedTz };

      // Show feedback
      if (detectedTz) {
        marker.bindPopup(`<strong>Detected timezone:</strong><br>${detectedTz}`).openPopup();
      } else {
        marker.bindPopup(`<strong>Location:</strong><br>Lat: ${latlng.lat.toFixed(2)}, Lng: ${latlng.lng.toFixed(2)}`).openPopup();
      }

      document.getElementById('timezone-submit').disabled = false;
    });

    // Submit button handler
    document.getElementById('timezone-submit').onclick = () => {
      if (!selectedLocation) {
        this.showError('Please click on the map to select your location.');
        return;
      }

      // Check if detected timezone matches user's actual timezone
      if (selectedLocation.timezone === userTimezone) {
        // Clean up map
        if (map) {
          map.remove();
        }
        this.nextStep();
      } else {
        this.showError(`Incorrect! Your timezone is ${userTimezone}, but you selected ${selectedLocation.timezone || 'an unknown region'}.`);
      }
    };
  }

  initWritten() {
    const writtenDate = this.formatDate(this.userDate);
    document.getElementById('written-display').textContent = writtenDate;

    const input = document.getElementById('written-input');

    // Disable selection and copy
    input.addEventListener('copy', (e) => e.preventDefault());
    input.addEventListener('cut', (e) => e.preventDefault());
    input.addEventListener('paste', (e) => e.preventDefault());
    input.addEventListener('selectstart', (e) => e.preventDefault());

    document.getElementById('written-form').onsubmit = (e) => {
      e.preventDefault();
      const userInput = input.value.toLowerCase().trim();
      const expected = writtenDate.toLowerCase().trim();

      if (userInput === expected) {
        this.nextStep();
      } else {
        this.showError('The date doesn\'t match exactly. Check every character!');
      }
    };
  }

  initRoman() {
    const year = this.userDate.getFullYear();
    const romanYear = this.toRoman(year);

    document.getElementById('roman-hint').textContent =
      `Convert the year ${year} to Roman numerals`;

    document.getElementById('roman-form').onsubmit = (e) => {
      e.preventDefault();
      const userInput = document.getElementById('roman-input').value.toUpperCase().trim();

      if (userInput === romanYear) {
        this.nextStep();
      } else {
        this.showError(`Incorrect! The expected answer is ${romanYear}`);
      }
    };
  }

  toRoman(num) {
    const lookup = {M:1000, CM:900, D:500, CD:400, C:100, XC:90, L:50, XL:40, X:10, IX:9, V:5, IV:4, I:1};
    let roman = '';
    for (let i in lookup) {
      while (num >= lookup[i]) {
        roman += i;
        num -= lookup[i];
      }
    }
    return roman;
  }

  initBackwards() {
    const day = String(this.userDate.getDate()).padStart(2, '0');
    const month = String(this.userDate.getMonth() + 1).padStart(2, '0');
    const year = this.userDate.getFullYear();
    const normalDate = `${day}/${month}/${year}`;
    const backwardsDate = normalDate.split('').reverse().join('');

    document.getElementById('backwards-hint').textContent =
      `Write the date ${normalDate} backwards (character by character)`;

    document.getElementById('backwards-form').onsubmit = (e) => {
      e.preventDefault();
      const userInput = document.getElementById('backwards-input').value;

      if (userInput === backwardsDate) {
        this.nextStep();
      } else {
        this.showError(`Incorrect! Expected: ${backwardsDate}`);
      }
    };
  }

  showError(message) {
    const errorEl = document.getElementById('error-message');
    errorEl.textContent = message;
    errorEl.style.display = 'block';

    setTimeout(() => {
      errorEl.style.display = 'none';
    }, 3000);
  }
}

// Initialize game when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  initGameMusic('ergonomics.mp3');
  new DateGame();
});
