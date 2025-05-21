
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
document.querySelector("form").addEventListener("submit", async function (e) {
  e.preventDefault();

  const nombre = document.querySelector('input[name="nombre"]').value;
  const apellidos = document.querySelector('input[name="apellido"]').value.value;
  const email = document.querySelector('input[name="email"]').value;
  const telefono = document.querySelector('input[name="telefono"]').value;
  const departamento = document.querySelector('input[name="departamento"]:checked')?.nextSibling.textContent.trim();

  const cvInput = document.querySelector('input[type="file"][accept=".pdf"]');
  const videoInput = document.querySelector('input[type="file"][accept="video/mp4"]');

  const cvFile = cvInput.files[0];
  const videoFile = videoInput.files[0];

  const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result.split(',')[1]);
    reader.onerror = error => reject(error);
    reader.readAsDataURL(file);
  });

  const cvBase64 = cvFile ? await toBase64(cvFile) : "";
  const videoBase64 = videoFile ? await toBase64(videoFile) : "";

  const datos = {
    nombre,
    apellidos,
    email,
    telefono,
    departamento,
    cv: cvBase64,
    video: videoBase64,
    cvNombre: cvFile?.name || "sin_nombre.pdf",
    videoNombre: videoFile?.name || "sin_video.mp4"
  };

  const url = "https://prod-57.northeurope.logic.azure.com:443/workflows/6eaf2628f8e943f2a5e878162f9901b5/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=-TVjO-S1ZZ4ye9GshWgtRp0GpnqGS7KOdCKgbOaYQUg";

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(datos)
    });

    if (response.ok) {
      alert("¡Formulario enviado correctamente!");
    } else {
      alert("Error al enviar el formulario.");
    }
  } catch (err) {
    console.error(err);
    alert("Ocurrió un error al enviar los datos.");
  }
});
