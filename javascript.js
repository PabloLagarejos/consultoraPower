
function mostrarFormulario() {
  document.getElementById('modal-overlay').style.display = 'flex';
  document.getElementById('fondo').classList.add('blurred');
}

function cerrarFormulario() {
  document.getElementById('modal-overlay').style.display = 'none';
  document.getElementById('fondo').classList.remove('blurred');
}

window.addEventListener('click', function (e) {
  const modal = document.getElementById('modal');
  const overlay = document.getElementById('modal-overlay');
  if (e.target === overlay) {
    cerrarFormulario();
  }
});

window.addEventListener('keydown', function (e) {
  if (e.key === 'Escape') {
    cerrarFormulario();
  }
});
