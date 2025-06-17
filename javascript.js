// Función para mostrar el formulario
function mostrarFormulario() {
  document.getElementById('modal-overlay').style.display = 'flex';
  document.getElementById('fondo')?.classList.add('blurred');
}

// Función para cerrar el formulario
function cerrarFormulario() {
  document.getElementById('modal-overlay').style.display = 'none';
  document.getElementById('fondo')?.classList.remove('blurred');
}

// Gestión del submit
document.querySelector("form").addEventListener("submit", async function (e) {
  e.preventDefault();

  const nombre = document.querySelector('input[name="nombre"]').value;
  const apellidos = document.querySelector('input[name="apellido"]').value;
  const email = document.querySelector('input[name="email"]').value;
  const telefono = document.querySelector('input[name="telefono"]').value;
  console.log("Teléfono capturado:", telefono);
  const departamento = document.querySelector('input[name="departamento"]:checked')?.value || "";

  const cvInput = document.querySelector('input[name="cvFile"]');
  const videoInput = document.querySelector('input[name="videoFile"]');

  const cvFile = cvInput.files[0];
  const videoFile = videoInput.files[0];

  const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const base64Data = reader.result.split(',')[1];
      resolve(base64Data);
    };
    reader.onerror = error => reject(error);
    reader.readAsDataURL(file);
  });

  const cvBase64 = cvFile ? await toBase64(cvFile) : "";
  const videoBase64 = videoFile ? await toBase64(videoFile) : "";

  const datos = {
    nombre: nombre,
    apellidos: apellidos,
    email: email,
    telefono: telefono,
    departamento: departamento,
    cv: cvBase64,
    video: videoBase64,
    cvNombre: cvFile?.name || "sin_nombre.pdf",
    videoNombre: videoFile?.name || "sin_video.mp4"
  };

  const url = "https://prod-46.northeurope.logic.azure.com:443/workflows/50e2b23e7d1844ce8ed67452de6be5de/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=QS-d8sEOAVnkhDO6tGjGPh0IAykHeG2fWxR6CCZypU0";

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
      document.querySelector("form").reset();
      cerrarFormulario();
    } else {
      alert("Error al enviar el formulario.");
    }
  } catch (err) {
    console.error(err);
    alert("Ocurrió un error al enviar los datos.");
    cerrarFormulario();
  }
});
document.getElementById('modal-overlay').addEventListener('click', function (e) {
  if (e.target === this) {
    cerrarFormulario();
  }
});