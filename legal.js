// terms and conditions page (the privacy policy page can use this file too)
// builds the table of contents from the h2 headings, and marks the section being read in red

const sections = [...document.querySelectorAll('#legalBody h2')];
const tocList = document.getElementById('tocList');

tocList.innerHTML = sections.map(h => `<li><a href="#${h.id}">${h.textContent}</a></li>`).join('');

// the heading nearest the top of the screen is the one being read
function markReading() {
  let current = sections[0];
  sections.forEach(h => {
    if (h.getBoundingClientRect().top < 160) current = h;
  });

  tocList.querySelectorAll('a').forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === `#${current.id}`);
  });
}

addEventListener('scroll', markReading, { passive: true });
markReading();
