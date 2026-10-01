// shared package listing for ghumgham (filters, results, sort, chips and load more)
// used on the trips page and the region detail page
// in wordpress this becomes a template part, e.g. template-parts/listing.php

// how to use it on a page:
//   1. put <div id="package-listing"></div> where the listing should go
//   2. load this file after common.js
//   3. call setupListing(packages) with a list like
//      { title, place, style, difficulty, days, price, order }


// ---------- markup ----------
const listingMarkup = `
<div class="listing">

  <!-- filters on the left, every change updates the results (see setupListing below) -->
  <aside class="filters" id="filters">
    <h3>Filters</h3>

    <div class="filter-group open">
      <button class="filter-head">Travel Style <i class="fa-solid fa-chevron-down"></i></button>
      <div class="filter-body">
        <label class="filter-option"><input type="checkbox" name="style" value="Classic" checked><span class="tick"></span>Classic</label>
        <label class="filter-option"><input type="checkbox" name="style" value="Luxury"><span class="tick"></span>Luxury</label>
        <label class="filter-option"><input type="checkbox" name="style" value="Family-Friendly"><span class="tick"></span>Family-Friendly</label>
        <label class="filter-option"><input type="checkbox" name="style" value="Off-the-Beaten-Path"><span class="tick"></span>Off-the-Beaten-Path</label>
      </div>
    </div>

    <div class="filter-group">
      <button class="filter-head">Duration <i class="fa-solid fa-chevron-down"></i></button>
      <div class="filter-body">
        <label class="filter-option"><input type="checkbox" name="duration" value="short"><span class="tick"></span>Up to 5 days</label>
        <label class="filter-option"><input type="checkbox" name="duration" value="medium"><span class="tick"></span>6 to 10 days</label>
        <label class="filter-option"><input type="checkbox" name="duration" value="long"><span class="tick"></span>11 days or more</label>
      </div>
    </div>

    <div class="filter-group">
      <button class="filter-head">Difficulty Level <i class="fa-solid fa-chevron-down"></i></button>
      <div class="filter-body">
        <label class="filter-option"><input type="checkbox" name="difficulty" value="Easy"><span class="tick"></span>Easy</label>
        <label class="filter-option"><input type="checkbox" name="difficulty" value="Moderate"><span class="tick"></span>Moderate</label>
        <label class="filter-option"><input type="checkbox" name="difficulty" value="Challenging"><span class="tick"></span>Challenging</label>
      </div>
    </div>

    <div class="filter-group open">
      <button class="filter-head">Budget Range <i class="fa-solid fa-chevron-down"></i></button>
      <div class="filter-body">
        <!-- two sliders on top of each other, one for the lowest and one for the highest price -->
        <div class="budget">
          <span class="budget-end">4500</span>
          <div class="budget-track">
            <div class="budget-fill" id="budgetFill"></div>
            <span class="budget-bubble" id="minBubble"></span>
            <span class="budget-bubble" id="maxBubble"></span>
            <input type="range" id="minPrice" min="4500" max="250000" step="500" value="4500" aria-label="lowest price">
            <input type="range" id="maxPrice" min="4500" max="250000" step="500" value="250000" aria-label="highest price">
          </div>
          <span class="budget-end">2,50,000</span>
        </div>
      </div>
    </div>
  </aside>


  <!-- results on the right -->
  <div class="results">
    <div class="results-top">
      <div>
        <p class="results-count">Showing <span id="resultCount">0</span> Results</p>
        <!-- small tags for each active filter, click the x to remove it -->
        <div class="chips" id="chips"></div>
      </div>

      <label class="sort">Sort by:
        <select id="sortBy">
          <option value="relevancy">Relevancy</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
          <option value="days">Duration: Short to Long</option>
        </select>
      </label>
    </div>

    <!-- package cards are added here by setupListing -->
    <div class="result-grid" id="resultGrid"></div>
    <p class="no-results" id="noResults">No packages match these filters. Try removing one.</p>

    <div class="center">
      <button class="pill small" id="loadMore">
        Load More
        <span class="circle"><i class="fa-solid fa-arrow-down"></i></span>
      </button>
    </div>
  </div>

</div>
`;

document.getElementById('package-listing').outerHTML = listingMarkup;


// ---------- filters, results and load more ----------
function setupListing(packages) {

  const resultGrid = document.getElementById('resultGrid');
  const resultCount = document.getElementById('resultCount');
  const chips = document.getElementById('chips');
  const noResults = document.getElementById('noResults');
  const loadMore = document.getElementById('loadMore');
  const sortBy = document.getElementById('sortBy');
  const minPrice = document.getElementById('minPrice');
  const maxPrice = document.getElementById('maxPrice');

  const PAGE_SIZE = 9; // cards shown at first, load more adds 6 each time
  let visible = PAGE_SIZE;

  // labels used on the chips
  const groupNames = { style: 'Travel Style', duration: 'Duration', difficulty: 'Difficulty' };

  function durationGroup(days) {
    if (days <= 5) return 'short';
    if (days <= 10) return 'medium';
    return 'long';
  }

  // values of all ticked boxes in one filter group
  function ticked(name) {
    return [...document.querySelectorAll(`input[name="${name}"]:checked`)].map(box => box.value);
  }

  function render() {
    const styles = ticked('style');
    const durations = ticked('duration');
    const levels = ticked('difficulty');
    const low = Number(minPrice.value);
    const high = Number(maxPrice.value);

    // an empty group means "show everything" for that group
    let list = packages.filter(pkg =>
      (!styles.length || styles.includes(pkg.style)) &&
      (!durations.length || durations.includes(durationGroup(pkg.days))) &&
      (!levels.length || levels.includes(pkg.difficulty)) &&
      pkg.price >= low && pkg.price <= high
    );

    if (sortBy.value === 'price-low') list.sort((a, b) => a.price - b.price);
    if (sortBy.value === 'price-high') list.sort((a, b) => b.price - a.price);
    if (sortBy.value === 'days') list.sort((a, b) => a.days - b.days);
    if (sortBy.value === 'relevancy') list.sort((a, b) => a.order - b.order);

    resultCount.textContent = list.length;
    noResults.classList.toggle('show', list.length === 0);
    loadMore.hidden = list.length <= visible;

    resultGrid.innerHTML = list.slice(0, visible).map(pkg => {
      const days = pkg.days === 1 ? '1D' : `${pkg.days}D/${pkg.days - 1}N`;
      return packageCard(pkg.title, pkg.place, days, pkg.price);
    }).join('');

    renderChips();
  }

  // one chip for each ticked box, plus one for the budget if it was changed
  function renderChips() {
    const ticks = [...document.querySelectorAll('.filter-option input:checked')].map(box => `
      <button class="chip" data-name="${box.name}" data-value="${box.value}">
        ${groupNames[box.name]}: ${box.parentElement.textContent.trim()} <i class="fa-solid fa-xmark"></i>
      </button>`);

    const budgetChanged = minPrice.value !== minPrice.min || maxPrice.value !== maxPrice.max;
    if (budgetChanged) {
      ticks.push(`
      <button class="chip" data-name="budget">
        Budget: ${formatPrice(Number(minPrice.value))} to ${formatPrice(Number(maxPrice.value))} <i class="fa-solid fa-xmark"></i>
      </button>`);
    }

    chips.innerHTML = ticks.join('');
  }

  // clicking a chip removes that filter
  chips.addEventListener('click', event => {
    const chip = event.target.closest('.chip');
    if (!chip) return;

    if (chip.dataset.name === 'budget') {
      minPrice.value = minPrice.min;
      maxPrice.value = maxPrice.max;
      updateBudget();
    } else {
      document.querySelector(`input[name="${chip.dataset.name}"][value="${chip.dataset.value}"]`).checked = false;
    }

    visible = PAGE_SIZE;
    render();
  });

  // any tick box or the sort menu starts the list again from the top
  document.getElementById('filters').addEventListener('change', () => { visible = PAGE_SIZE; render(); });
  sortBy.addEventListener('change', render);

  loadMore.addEventListener('click', () => { visible += 6; render(); });

  // open and close each filter group
  document.querySelectorAll('.filter-head').forEach(head => {
    head.addEventListener('click', () => head.parentElement.classList.toggle('open'));
  });


  // ---------- budget slider ----------
  // keeps the two thumbs from crossing, and moves the red bar and the labels
  function updateBudget(event) {
    const gap = 5000; // smallest gap between the two prices
    if (Number(maxPrice.value) - Number(minPrice.value) < gap) {
      if (event && event.target === minPrice) minPrice.value = Number(maxPrice.value) - gap;
      else maxPrice.value = Number(minPrice.value) + gap;
    }

    const range = maxPrice.max - minPrice.min;
    const left = ((minPrice.value - minPrice.min) / range) * 100;
    const right = ((maxPrice.value - minPrice.min) / range) * 100;

    const fill = document.getElementById('budgetFill');
    fill.style.left = left + '%';
    fill.style.width = (right - left) + '%';

    const minBubble = document.getElementById('minBubble');
    const maxBubble = document.getElementById('maxBubble');
    minBubble.style.left = left + '%';
    maxBubble.style.left = right + '%';
    minBubble.textContent = formatPrice(Number(minPrice.value));
    maxBubble.textContent = formatPrice(Number(maxPrice.value));
  }

  minPrice.addEventListener('input', updateBudget);
  maxPrice.addEventListener('input', updateBudget);

  // ---------- start ----------
  updateBudget();
  render();
}
