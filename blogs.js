// insights and blogs page
// fills the featured block and the recent list from blog-data.js,
// and filters the recent list by category and year from the side boxes

const featuredPosts = blogs.filter(post => post.featured);
const recentPosts = blogs.filter(post => !post.featured);

const perLoad = 6;         // recent cards shown at first and added by each load more
let shown = perLoad;
let pickedCategory = null; // null means all
let pickedYear = null;


// ---------- cards ----------
// every card opens the blog detail page for that post
function postLink(post) {
  return `blog-detail.html?post=${toSlug(post.title)}`;
}

function yearOf(post) {
  return post.date.slice(-4);
}

function dateLine(post) {
  return `<span class="date"><i></i>${post.date}</span>`;
}

// big card and the recent cards: photo on top, text under it
function blogCard(post) {
  return `
    <a href="${postLink(post)}" class="blog-card">
      ${imageTag(post.image)}
      <div class="blog-body">
        <h4>${post.title}</h4>
        <div class="blog-foot">
          ${dateLine(post)}
          <span class="read">Read Full Article <i class="fa-solid fa-arrow-right"></i></span>
        </div>
      </div>
    </a>`;
}

// middle and right columns of the featured block: photo on the left, text on the right
function sideCard(post, size) {
  return `
    <a href="${postLink(post)}" class="feat-card ${size}">
      ${imageTag(post.image)}
      <div class="feat-body">
        <h4>${post.title}</h4>
        <div class="blog-foot">
          ${dateLine(post)}
          <span class="read">Read Full Article <i class="fa-solid fa-arrow-right"></i></span>
        </div>
      </div>
    </a>`;
}


// ---------- featured block ----------
document.getElementById('featBig').innerHTML = blogCard(featuredPosts[0]);
document.getElementById('featMid').innerHTML = featuredPosts.slice(1, 3).map(post => sideCard(post, 'mid')).join('');
document.getElementById('featSmall').innerHTML = featuredPosts.slice(3, 6).map(post => sideCard(post, 'small')).join('');


// ---------- recent list ----------
const recentList = document.getElementById('recentList');
const moreBlogs = document.getElementById('moreBlogs');
const noBlogs = document.getElementById('noBlogs');
const clearFilter = document.getElementById('clearFilter');

function matchingPosts() {
  return recentPosts.filter(post =>
    (!pickedCategory || post.category === pickedCategory) &&
    (!pickedYear || yearOf(post) === pickedYear)
  );
}

function showRecent() {
  const posts = matchingPosts();

  recentList.innerHTML = posts.slice(0, shown).map(blogCard).join('');
  moreBlogs.hidden = shown >= posts.length;
  noBlogs.hidden = posts.length > 0;
  clearFilter.hidden = !pickedCategory && !pickedYear;
}

moreBlogs.addEventListener('click', () => {
  shown += perLoad;
  showRecent();
});


// ---------- categories and archive ----------
// both lists start with 5 items, load 2 more opens 2 at a time
function setupSideList(listId, buttonId, items, onPick) {
  const list = document.getElementById(listId);
  const button = document.getElementById(buttonId);
  let open = 5;

  function draw(picked) {
    list.innerHTML = items.slice(0, open).map(item =>
      `<li><button class="${item === picked ? 'active' : ''}" data-item="${item}">${item}${item === picked ? ' <i class="fa-solid fa-arrow-right"></i>' : ''}</button></li>`
    ).join('');
    button.hidden = open >= items.length;
  }

  list.addEventListener('click', event => {
    const picked = event.target.closest('button')?.dataset.item;
    if (picked) onPick(picked);
  });

  button.addEventListener('click', () => {
    open += 2;
    onPick(null, true);
  });

  return draw;
}

// the lists are built from the posts, so a new category or year shows up on its own
const categories = [...new Set(blogs.map(post => post.category))];
const years = [...new Set(blogs.map(yearOf))].sort((a, b) => b - a);

const drawCategories = setupSideList('categoryList', 'moreCategories', categories, (item, redrawOnly) => {
  if (!redrawOnly) pickedCategory = pickedCategory === item ? null : item;
  refresh();
});

const drawYears = setupSideList('yearList', 'moreYears', years, (item, redrawOnly) => {
  if (!redrawOnly) pickedYear = pickedYear === item ? null : item;
  refresh();
});

function refresh() {
  shown = perLoad;
  drawCategories(pickedCategory);
  drawYears(pickedYear);
  showRecent();
}

clearFilter.addEventListener('click', () => {
  pickedCategory = null;
  pickedYear = null;
  refresh();
});

refresh();
