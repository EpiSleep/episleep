function renderLayout(active) {
  const header = document.getElementById('site-header');
  const footer = document.getElementById('site-footer');
  if (header) {
    header.innerHTML = `
      <div class="navbar">
        <a class="brand" href="index.html" aria-label="Accueil NIRD">
          <span>NIRD</span>
          <small>Numérique Indépendant & Résilient</small>
        </a>
        <nav class="nav-links" aria-label="Navigation principale">
          ${link('index.html', 'Accueil', active === 'home')}
          ${link('femmes-info.html', 'Femmes & Info', active === 'femmes')}
          ${link('decathlon.html', 'Décathlon', active === 'decathlon')}
          ${link('cve-explorer.html', 'CVE Explorer', active === 'cve')}
          ${link('ergonomie.html', "L'ergonomie", active === 'ergonomie')}
        </nav>
        <a class="cta" href="https://www.nuitdelinfo.com" target="_blank" rel="noreferrer">Oh les beaux boutons</a>
      </div>
    `;
  }

  if (footer) {
    footer.innerHTML = `
      <div class="footer-inner">
        <div>
          <strong>NIRD</strong> – Défendre nos libertés numériques, préférer le libre au propriétaire.
        </div>
        <div class="meta">
          <span>Inspiré par la Nuit de l'Info</span>
          <span>•</span>
          <a href="https://www.nuitdelinfo.com" target="_blank" rel="noreferrer">Découvrir les défis</a>
        </div>
      </div>
    `;
  }
}

function link(href, label, isActive) {
  return `<a href="${href}" class="${isActive ? 'active' : ''}">${label}</a>`;
}

async function fetchCveDetails(cveId, onResult) {
  if (!cveId) return;
  try {
    const response = await fetch(`https://cve.circl.lu/api/cve/${encodeURIComponent(cveId)}`);
    if (!response.ok) throw new Error('API non disponible');
    const data = await response.json();
    onResult({
      ok: true,
      data,
    });
  } catch (error) {
    onResult({
      ok: false,
      error: error.message,
    });
  }
}

function renderCveResult(container, result) {
  if (!container) return;
  if (!result) {
    container.innerHTML = '';
    return;
  }

  if (!result.ok) {
    container.innerHTML = `<div class="alert">Impossible de récupérer les données : ${result.error}. Essayez un autre identifiant ou vérifiez votre connexion.</div>`;
    return;
  }

  const { data } = result;
  const references = (data.references || []).slice(0, 5);
  const cvss = data.cvss || data.cvss3 || '—';
  container.innerHTML = `
    <div class="panel">
      <div class="meta">
        <span class="badge">${data.id || 'CVE inconnue'}</span>
        <span>Score CVSS : <strong>${cvss}</strong></span>
        <span>Publié le ${data.Published || '—'}</span>
      </div>
      <p>${data.summary || 'Aucun résumé disponible.'}</p>
      <div class="table-like">
        <div><strong>Produit</strong><span>${(data.vulnerable_configuration || []).slice(0, 3).join('<br>') || 'Non renseigné'}</span></div>
        <div><strong>Références</strong><span>${references.map(r => `<a href="${r}" target="_blank" rel="noreferrer">${r}</a>`).join('<br>') || '—'}</span></div>
      </div>
    </div>
  `;
}

window.addEventListener('DOMContentLoaded', () => {
  const active = document.body.dataset.page;
  renderLayout(active);

  const form = document.getElementById('cve-form');
  const input = document.getElementById('cve-input');
  const resultContainer = document.getElementById('cve-result');

  if (form && input) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const cveId = input.value.trim();
      if (!cveId) return;
      resultContainer.innerHTML = '<div class="notice">Recherche en cours...</div>';
      fetchCveDetails(cveId, (res) => renderCveResult(resultContainer, res));
    });
  }
});
