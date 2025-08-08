const $ = id => document.getElementById(id);

const status = $('status');
const results = $('results');
const btn = $('searchBtn');

function setStatus(text, isError = false) {
  status.textContent = text;
  status.style.color = isError ? 'crimson' : '';
}

function renderResults(items) {
  results.innerHTML = '';
  if (!items || items.length === 0) {
    results.innerHTML = '<div class="result-item"><div class="result-sub">No results found.</div></div>';
    return;
  }

  items.forEach((item, index) => {
    const el = document.createElement('div');
    el.className = 'result-item';
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';

    el.innerHTML = `
      <div class="result-title">${item.title || 'No title'}</div>
      <div class="result-sub">
        Rating: ${item.rating !== null ? item.rating + ' stars' : 'N/A'} •
        Reviews: ${item.reviews !== null ? item.reviews : 'N/A'}
      </div>
      ${item.image ? `<img src="${item.image}" alt="${item.title}" class="result-image" />` : ''}
    `;

    results.appendChild(el);

    setTimeout(() => {
      el.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    }, index * 100);
  });
}


async function doSearch() {
  const keyword = $('keyword').value.trim();
  results.innerHTML = '';
  if (!keyword) {
    setStatus('Please enter a search keyword.', true);
    return;
  }
  setStatus('Searching...');
  btn.disabled = true;

  try {
    const res = await fetch(`/api/scrape?keyword=${encodeURIComponent(keyword)}`, { method: 'GET' });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);

    const data = await res.json();
    renderResults(data.results);
    setStatus(`Results loaded (${data.count})`);
  } catch (err) {
    console.error(err);
    setStatus(`Error: ${err.message}`, true);
    results.innerHTML = '';
  } finally {
    btn.disabled = false;
  }
}

btn.addEventListener('click', doSearch);

$('keyword').addEventListener('keydown', (e) => { if (e.key === 'Enter') doSearch(); });
