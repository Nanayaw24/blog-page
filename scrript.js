
const state = {
  posts: [],
  filtered: [],
  latestCount: 6,
  perPage: 8,
  currentPage: 1,
  pinnedId: null,
  tags: new Set(),
  darkMode: false
};

const els = {
  topbar: document.getElementById('topbar'),
  closeTopbar: document.getElementById('closeTopbar'),
  navbar: document.getElementById('navbar'),
  navToggle: document.getElementById('navToggle'),
  navLinks: document.getElementById('navLinks'),
  hero: document.getElementById('hero'),
  featured: document.getElementById('featured'),
  featuredImg: document.getElementById('featuredImg'),
  featuredTitle: document.getElementById('featuredTitle'),
  featuredExcerpt: document.getElementById('featuredExcerpt'),
  featuredCategory: document.getElementById('featuredCategory'),
  featuredDate: document.getElementById('featuredDate'),
  featuredRead: document.getElementById('featuredRead'),
  unpinFeatured: document.getElementById('unpinFeatured'),
  sortSelect: document.getElementById('sortSelect'),
  searchInput: document.getElementById('searchInput'),
  latestContainer: document.getElementById('latestContainer'),
  metrics: document.getElementById('metrics'),
  blogContainer: document.getElementById('blogContainer'),
  skeletonGrid: document.getElementById('skeletonGrid'),
  categoryList: document.getElementById('categoryList'),
  tagList: document.getElementById('tagList'),
  pagination: document.getElementById('pagination'),
  pageNumbers: document.getElementById('pageNumbers'),
  toggleMode: document.getElementById('toggleMode'),
  scrollTop: document.getElementById('scrollTop'),
  postModal: document.getElementById('postModal'),
  modalBackdrop: document.getElementById('modalBackdrop'),
  modalClose: document.getElementById('modalClose'),
  modalImg: document.getElementById('modalImg'),
  modalTitle: document.getElementById('modalTitle'),
  modalCategory: document.getElementById('modalCategory'),
  modalDate: document.getElementById('modalDate'),
  modalBody: document.getElementById('modalBody'),
  toasts: document.getElementById('toasts')
};


const postsData = [
  
  { id: 1, title: "Top 10 Fully Funded Scholarships for Ghanaian Students (2026/2027)", category: "Scholarship", tags: ["funding","ghana","global","masters","phd"], image: "https://picsum.photos/640/360?random=101", date: "2026-01-02", body: "Explore scholarships in the US, UK, Canada, and Europe for Ghanaian students seeking study abroad opportunities." },
  { id: 2, title: "DAAD Scholarships for African Students in Germany", category: "Scholarship", tags: ["germany","daad","postgraduate"], image: "https://picsum.photos/640/360?random=102", date: "2025-12-20", body: "The DAAD program offers full funding for postgraduate studies in Germany, including tuition and living expenses." },
  { id: 3, title: "Mastercard Foundation Scholarships at African Universities", category: "Scholarship", tags: ["mastercard","africa","undergraduate","leadership"], image: "https://picsum.photos/640/360?random=103", date: "2025-12-15", body: "Partner universities provide scholarships for talented Ghanaian students with leadership potential." },
  { id: 4, title: "Chevening Scholarships for Ghanaian Students in the UK", category: "Scholarship", tags: ["uk","chevening","postgraduate"], image: "https://picsum.photos/640/360?random=104", date: "2025-11-20", body: "The UK government offers Chevening scholarships for postgraduate study, covering tuition and living costs." },

  
  { id: 5, title: "How to Apply for a US Visa (2026 Update)", category: "Visa", tags: ["usa","visa","interview","student","tourist"], image: "https://picsum.photos/640/360?random=105", date: "2026-01-03", body: "Step-by-step guide for Ghanaian applicants seeking student, tourist, or work visas to the United States." },
  { id: 6, title: "Canada Visa Application Process for Ghanaians", category: "Visa", tags: ["canada","visa","study","tourism"], image: "https://picsum.photos/640/360?random=106", date: "2025-12-28", body: "Learn the requirements, documents, and interview tips for Canadian study and tourist visas." },
  { id: 7, title: "Mexico Visa Tips for Ghanaian Travelers", category: "Visa", tags: ["mexico","visa","documents"], image: "https://picsum.photos/640/360?random=107", date: "2025-12-12", body: "Essential information for applying for a Mexican visa, including embassy contacts and processing times." },
  { id: 8, title: "Visa Interview Preparation for Ghanaian Students", category: "Visa", tags: ["interview","prep","tips"], image: "https://picsum.photos/640/360?random=108", date: "2025-11-30", body: "Tips and common questions to help Ghanaian students succeed in visa interviews abroad." },

  
  { id: 9, title: "Oxford University Ranked #1 Globally in 2026", category: "University News", tags: ["rankings","oxford","THE"], image: "https://picsum.photos/640/360?random=109", date: "2025-12-10", body: "Times Higher Education ranks Oxford as the top university worldwide for the 10th consecutive year." },
  { id: 10, title: "MIT Tops QS World Rankings 2026", category: "University News", tags: ["rankings","MIT","QS"], image: "https://picsum.photos/640/360?random=110", date: "2025-12-18", body: "MIT continues to lead in innovation and research excellence." },
  { id: 11, title: "Harvard Expands Scholarships for International Students", category: "University News", tags: ["harvard","funding","international"], image: "https://picsum.photos/640/360?random=111", date: "2025-12-06", body: "Harvard announces new funding opportunities for African students, including Ghanaians." },
  { id: 12, title: "University of Toronto Launches Africa Partnership Program", category: "University News", tags: ["toronto","partnership","exchange"], image: "https://picsum.photos/640/360?random=112", date: "2025-12-02", body: "Toronto expands collaborations with African universities, offering exchange programs and scholarships." },

  
  { id: 13, title: "World Cup 2026 Host Countries: USA, Canada, Mexico", category: "Current Affairs", tags: ["fifa","worldcup","2026","hosts"], image: "https://picsum.photos/640/360?random=113", date: "2025-12-22", body: "The FIFA World Cup 2026 will be jointly hosted by the USA, Canada, and Mexico, with matches across 16 cities." },
  { id: 14, title: "Black Stars Road to World Cup 2026", category: "Current Affairs", tags: ["ghana","blackstars","qualifiers"], image: "https://picsum.photos/640/360?random=114", date: "2025-12-08", body: "Updates on Ghana’s qualification journey and preparations for the FIFA World Cup." },
  { id: 15, title: "Canada Prepares for FIFA World Cup 2026", category: "Current Affairs", tags: ["canada","hosts","cities"], image: "https://picsum.photos/640/360?random=115", date: "2025-12-05", body: "Canadian cities gear up for hosting matches, with infrastructure and tourism opportunities expanding." },
  { id: 16, title: "Mexico’s Cultural Showcase During FIFA World Cup", category: "Current Affairs", tags: ["mexico","culture","events"], image: "https://picsum.photos/640/360?random=116", date: "2025-11-25", body: "Mexico plans cultural festivals alongside World Cup matches to highlight its heritage." },

  
  { id: 17, title: "Opportunities to Support Black Star Abroad", category: "Opportunities", tags: ["exchange","sports","culture"], image: "https://picsum.photos/640/360?random=117", date: "2025-12-01", body: "Scholarships and cultural exchange programs that help Ghanaians support the Black Star." },
  { id: 18, title: "Internships for Ghanaian Students in North America", category: "Opportunities", tags: ["internship","usa","canada"], image: "https://picsum.photos/640/360?random=118", date: "2025-11-18", body: "Paid internship opportunities across top companies in the USA and Canada." }
];


function init() {
  
  state.darkMode = localStorage.getItem('cc-dark') === 'true';
  state.pinnedId = parseInt(localStorage.getItem('cc-pinned') || '0', 10) || null;
  if (state.darkMode) document.body.classList.add('dark');

  
  postsData.forEach(p => p.tags.forEach(t => state.tags.add(t)));
  renderTags();

  
  showSkeletons(8);

  
  setTimeout(() => {
    state.posts = postsData.slice();
    applySort('newest');
    renderFeatured();
    renderLatest();
    renderPage(1);
    buildPagination();
    hideSkeletons();
    animateReveal();
  }, 600);

  
  bindEvents();
}
document.addEventListener('DOMContentLoaded', init);


function bindEvents() {
  els.closeTopbar.addEventListener('click', () => els.topbar.remove());
  els.navToggle.addEventListener('click', () => els.navLinks.classList.toggle('open'));
  els.toggleMode.addEventListener('click', toggleDarkMode);
  els.scrollTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  els.sortSelect.addEventListener('change', e => { applySort(e.target.value); renderLatest(); renderPage(1); buildPagination(); });
  els.searchInput.addEventListener('input', handleSearch);
  els.unpinFeatured.addEventListener('click', () => { state.pinnedId = null; localStorage.removeItem('cc-pinned'); renderFeatured(); showToast('Featured post unpinned'); });
  els.featuredRead.addEventListener('click', openFeaturedModal);
  els.categoryList.addEventListener('click', handleCategoryClick);
  els.pageNumbers.addEventListener('click', handlePageClick);
  els.pagination.addEventListener('click', handlePrevNext);
  els.tagList.addEventListener('click', handleTagClick);
  els.newsletterForm.addEventListener('submit', subscribeNewsletter);

  
  els.modalClose.addEventListener('click', closeModal);
  els.modalBackdrop.addEventListener('click', closeModal);

  
  window.addEventListener('scroll', handleScrollEffects);
}


function toggleDarkMode() {
  document.body.classList.toggle('dark');
  state.darkMode = document.body.classList.contains('dark');
  localStorage.setItem('cc-dark', String(state.darkMode));
  els.toggleMode.textContent = state.darkMode ? '☀️' : '🌙';
}


function showSkeletons(count = 6) {
  els.skeletonGrid.innerHTML = '';
  for (let i = 0; i < count; i++) {
    const s = document.createElement('div');
    s.className = 'skeleton';
    els.skeletonGrid.appendChild(s);
  }
}
function hideSkeletons() {
  els.skeletonGrid.innerHTML = '';
}


function applySort(mode) {
  switch (mode) {
    case 'newest':
      state.filtered = state.posts.slice().sort((a, b) => new Date(b.date) - new Date(a.date));
      break;
    case 'oldest':
      state.filtered = state.posts.slice().sort((a, b) => new Date(a.date) - new Date(b.date));
      break;
    case 'a-z':
      state.filtered = state.posts.slice().sort((a, b) => a.title.localeCompare(b.title));
      break;
    case 'z-a':
      state.filtered = state.posts.slice().sort((a, b) => b.title.localeCompare(a.title));
      break;
    default:
      state.filtered = state.posts.slice();
  }
}


function renderFeatured() {
  const post = state.pinnedId ? state.posts.find(p => p.id === state.pinnedId) : state.posts.slice().sort((a,b)=>new Date(b.date)-new Date(a.date))[0];
  if (!post) return;
  els.featuredImg.src = post.image;
  els.featuredTitle.textContent = post.title;
  els.featuredExcerpt.textContent = post.body;
  els.featuredCategory.textContent = post.category;
  els.featuredDate.textContent = formatDate(post.date);
  els.featuredRead.dataset.id = post.id;

  
  els.featuredImg.ondblclick = () => {
    state.pinnedId = post.id;
    localStorage.setItem('cc-pinned', String(post.id));
    showToast('Post pinned as featured');
  };
}


function renderLatest() {
  els.latestContainer.innerHTML = '';
  const latest = state.filtered.slice(0, state.latestCount);
  latest.forEach(p => els.latestContainer.appendChild(postCard(p, true)));
}


function buildPagination() {
  const totalPages = Math.ceil(state.filtered.length / state.perPage);
  els.pageNumbers.innerHTML = '';
  for (let i = 1; i <= totalPages; i++) {
    const btn = document.createElement('button');
    btn.className = 'page-number' + (i === state.currentPage ? ' active' : '');
    btn.textContent = i;
    btn.dataset.page = String(i);
    els.pageNumbers.appendChild(btn);
  }
}
function handlePageClick(e) {
  const n = e.target.closest('.page-number');
  if (!n) return;
  const page = parseInt(n.dataset.page, 10);
  renderPage(page);
  buildPagination();
  window.scrollTo({ top: els.blogContainer.offsetTop - 60, behavior: 'smooth' });
}
function handlePrevNext(e) {
  const btn = e.target.closest('.page-btn');
  if (!btn) return;
  const totalPages = Math.ceil(state.filtered.length / state.perPage);
  if (btn.dataset.page === 'prev') {
    if (state.currentPage > 1) renderPage(state.currentPage - 1);
  } else {
    if (state.currentPage < totalPages) renderPage(state.currentPage + 1);
  }
  buildPagination();
}
function renderPage(page = 1) {
  state.currentPage = page;
  els.blogContainer.querySelectorAll('.blog-card').forEach(c => c.remove());
  const start = (page - 1) * state.perPage;
  const items = state.filtered.slice(start, start + state.perPage);
  items.forEach(p => els.blogContainer.appendChild(postCard(p)));
}


function postCard(p, compact = false) {
  const card = document.createElement('article');
  card.className = compact ? 'latest-card reveal' : 'blog-card reveal';
  const img = document.createElement('img');
  img.loading = 'lazy';
  img.src = p.image;
  img.alt = p.title;
  const content = document.createElement('div');
  content.className = 'content';
  const h3 = document.createElement('h3');
  h3.textContent = p.title;
  const excerpt = document.createElement('p');
  excerpt.className = 'excerpt';
  excerpt.textContent = p.body.length > 140 ? p.body.slice(0, 140) + '…' : p.body;
  const meta = document.createElement('div');
  meta.className = 'meta';
  const badge = document.createElement('span');
  badge.className = 'badge';
  badge.textContent = p.category;
  const date = document.createElement('span');
  date.className = 'date';
  date.textContent = formatDate(p.date);
  meta.append(badge, date);

  const actions = document.createElement('div');
  actions.className = 'card-actions';
  const read = document.createElement('button');
  read.className = 'card-btn';
  read.textContent = 'Preview';
  read.addEventListener('click', () => openPostModal(p.id));
  const pin = document.createElement('button');
  pin.className = 'card-btn';
  pin.textContent = 'Pin';
  pin.addEventListener('click', () => {
    state.pinnedId = p.id;
    localStorage.setItem('cc-pinned', String(p.id));
    renderFeatured();
    showToast('Pinned as featured');
  });

  const link = document.createElement('a');
  link.className = 'read-link';
  link.textContent = 'Read details';
  link.href = '#';
  link.addEventListener('click', (e) => {
    e.preventDefault();
    openPostModal(p.id);
  });

  actions.append(read, pin);

  content.append(h3, excerpt, meta, actions, link);

  card.append(img, content);
  return card;
}


function handleCategoryClick(e) {
  const btn = e.target.closest('.chip');
  if (!btn) return;
  const cat = btn.dataset.cat;
  els.searchInput.value = '';
  state.filtered = state.posts.filter(p => p.category === cat);
  renderLatest();
  renderPage(1);
  buildPagination();
  showToast(`Filtered by ${cat}`);
}


function renderTags() {
  els.tagList.innerHTML = '';
  Array.from(state.tags).slice(0, 20).forEach(tag => {
    const t = document.createElement('button');
    t.className = 'tag';
    t.textContent = `#${tag}`;
    t.dataset.tag = tag;
    els.tagList.appendChild(t);
  });
}
function handleTagClick(e) {
  const t = e.target.closest('.tag');
  if (!t) return;
  const tag = t.dataset.tag;
  els.searchInput.value = '';
  state.filtered = state.posts.filter(p => p.tags.includes(tag));
  renderLatest();
  renderPage(1);
  buildPagination();
  showToast(`Filtered by tag #${tag}`);
}


function handleSearch() {
  const q = els.searchInput.value.trim().toLowerCase();
  if (!q) { applySort(els.sortSelect.value); renderLatest(); renderPage(1); buildPagination(); return; }
  const res = state.posts.filter(p =>
    p.title.toLowerCase().includes(q) ||
    p.body.toLowerCase().includes(q) ||
    p.category.toLowerCase().includes(q) ||
    p.tags.some(t => t.toLowerCase().includes(q))
  );
  state.filtered = res;
  renderLatest();
  renderPage(1);
  buildPagination();
  highlightQuery(q);
}
function highlightQuery(q) {
  if (!q) return;
  document.querySelectorAll('.excerpt, h3').forEach(el => {
    const text = el.textContent;
    const re = new RegExp(`(${escapeRegExp(q)})`, 'ig');
    el.innerHTML = text.replace(re, '<mark>$1</mark>');
  });
}
function escapeRegExp(s) { return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); }


function openFeaturedModal() {
  const id = parseInt(els.featuredRead.dataset.id, 10);
  openPostModal(id);
}
function openPostModal(id) {
  const p = state.posts.find(x => x.id === id);
  if (!p) return;
  els.modalImg.src = p.image;
  els.modalTitle.textContent = p.title;
  els.modalCategory.textContent = p.category;
  els.modalDate.textContent = formatDate(p.date);
  els.modalBody.textContent = p.body;
  els.postModal.classList.add('show');
  els.postModal.setAttribute('aria-hidden', 'false');
}
function closeModal() {
  els.postModal.classList.remove('show');
  els.postModal.setAttribute('aria-hidden', 'true');
}


function animateCounters() {
  const nums = document.querySelectorAll('.metric-number');
  nums.forEach(n => {
    const target = parseInt(n.dataset.target, 10);
    let current = 0;
    const step = Math.max(1, Math.round(target / 50));
    const timer = setInterval(() => {
      current += step;
      if (current >= target) { current = target; clearInterval(timer); }
      n.textContent = String(current);
    }, 24);
  });
}


function animateReveal() {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.reveal, .blog-card, .metric-card').forEach(el => observer.observe(el));
  animateCounters();
}


function handleScrollEffects() {
  const scrolled = window.scrollY > 60;
  els.navbar.style.boxShadow = scrolled ? '0 6px 18px rgba(2,6,23,0.08)' : 'none';
}


function subscribeNewsletter(e) {
  e.preventDefault();
  const email = document.getElementById('newsletterEmail').value.trim();
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    showToast('Please enter a valid email'); return;
  }
  showToast('Subscribed successfully!'); e.target.reset();
}


function showToast(text) {
  const t = document.createElement('div');
  t.className = 'toast';
  t.textContent = text;
  els.toasts.appendChild(t);
  requestAnimationFrame(() => t.classList.add('show'));
  setTimeout(() => { t.classList.remove('show'); setTimeout(() => t.remove(), 200); }, 2200);
}


function formatDate(d) {
  try {
    const date = new Date(d);
    return date.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
  } catch { return d; }
  }
  

