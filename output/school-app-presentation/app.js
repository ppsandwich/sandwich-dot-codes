const $ = s => document.querySelector(s);
const slides = [...document.querySelectorAll('.slide')];
let current = 0;
const dialogFocus = new WeakMap();

function showSlide(index, focus = false) {
  current = Math.max(0, Math.min(slides.length - 1, index));
  slides.forEach((slide, i) => { slide.hidden = i !== current; });
  $('#position').textContent = `${String(current + 1).padStart(2, '0')} / ${slides.length}`;
  $('#previous').disabled = current === 0;
  $('#next').disabled = current === slides.length - 1;
  $('#progress').style.width = `${(current + 1) / slides.length * 100}%`;
  document.title = `${slides[current].querySelector('h1').textContent} — Small apps. Clear learning.`;
  if (focus) slides[current].querySelector('h1').focus({preventScroll:true});
  window.scrollTo(0, 0);
}
function go(index) {
  if (index < 0 || index >= slides.length) return;
  history.pushState(null, '', '#' + slides[index].id);
  showSlide(index, true);
}
function fromHash() {
  const index = slides.findIndex(s => '#' + s.id === location.hash);
  showSlide(index < 0 ? 0 : index);
}
function openDialog(id, trigger) {
  const dialog = $(id);
  dialogFocus.set(dialog, trigger);
  dialog.showModal();
}
function openResearch(trigger) {
  document.querySelectorAll('.research-app').forEach(s => { s.hidden = s.dataset.slug !== slides[current].id; });
  openDialog('#research-dialog', trigger);
  $('#research-dialog').scrollTop = 0;
}
$('#previous').onclick = () => go(current - 1);
$('#next').onclick = () => go(current + 1);
$('#open-index').onclick = e => openDialog('#index-dialog', e.currentTarget);
$('#open-research').onclick = e => openResearch(e.currentTarget);
$('#open-notes').onclick = e => openResearch(e.currentTarget);
document.querySelectorAll('dialog').forEach(dialog => {
  dialog.querySelector('[data-close]').onclick = () => dialog.close();
  dialog.addEventListener('close', () => {
    if (!document.querySelector('dialog[open]')) dialogFocus.get(dialog)?.focus({preventScroll:true});
  });
});
document.querySelectorAll('.app-jump').forEach(link => link.onclick = e => {
  e.preventDefault();
  dialogFocus.delete($('#index-dialog'));
  $('#index-dialog').close();
  go(slides.findIndex(s => '#' + s.id === link.getAttribute('href')));
});
document.querySelectorAll('.screen').forEach(button => button.onclick = () => {
  $('#large-image').src = button.dataset.image;
  $('#large-image').alt = button.querySelector('img').alt;
  $('#image-title').textContent = button.dataset.caption;
  openDialog('#image-dialog', button);
});
document.addEventListener('keydown', e => {
  if (document.querySelector('dialog[open]') || /INPUT|TEXTAREA|SELECT/.test(e.target.tagName)) return;
  if (['ArrowRight', 'PageDown'].includes(e.key)) { e.preventDefault(); go(current + 1); }
  if (['ArrowLeft', 'PageUp'].includes(e.key)) { e.preventDefault(); go(current - 1); }
  if (e.key === 'Home') { e.preventDefault(); go(0); }
  if (e.key === 'End') { e.preventDefault(); go(slides.length - 1); }
});
$('#fullscreen').onclick = async () => {
  try {
    if (document.fullscreenElement) await document.exitFullscreen();
    else await document.documentElement.requestFullscreen();
  } catch {
    $('#fullscreen').textContent = 'Full screen unavailable';
  }
};
document.addEventListener('fullscreenchange', () => {
  const label = document.fullscreenElement ? 'Exit full screen' : 'Full screen';
  $('#fullscreen').textContent = label;
  $('#fullscreen').setAttribute('aria-label', label);
});
window.addEventListener('hashchange', fromHash);
window.addEventListener('popstate', fromHash);
fromHash();
