// === Cargar cantos desde cantos.json ===
fetch("cantos.json?" + new Date().getTime())
  .then(res => res.json())
  .then(data => {
    // Mostrar fecha y tiempo litúrgico
    document.getElementById("fecha").textContent = data.fecha;
    document.getElementById("tiempo").textContent = data.tiempo;

    // Contenedor principal de cantos
    const contenedor = document.getElementById("contenedor-cantos");

    // === Crear cada sección de canto en el orden original ===
    for (const [seccion, info] of Object.entries(data.cantos)) {
      const div = document.createElement("div");
      div.classList.add("canto");

      // Crear título
      const titulo = document.createElement("h3");
      titulo.textContent = info.titulo || seccion;

      // Crear letra
      const texto = document.createElement("p");
      texto.innerHTML = info.letra ? info.letra.replace(/\n/g, "<br>") : "";
      texto.style.display = "none";

      // Mostrar / ocultar al hacer clic
      titulo.addEventListener("click", () => {
        texto.style.display = texto.style.display === "none" ? "block" : "none";
      });

      div.appendChild(titulo);
      div.appendChild(texto);
      contenedor.appendChild(div);
    }

    // Generar hojas animadas
    generarHojas(data.colorLiturgico);
  })
  .catch(err => console.error("Error al cargar cantos.json", err));


// === Crear hojas animadas según el color litúrgico ===
function generarHojas(color) {
  const overlay = document.querySelector(".overlay");
  const colores = {
    verde: "fondos/hoja-verde.png",
    morado: "fondos/hoja-morada.png",
    rojo: "fondos/hoja-roja.png",
    blanco: "fondos/hoja-blanca.png",
    dorado: "fondos/hoja-dorada.png"
  };

  overlay.innerHTML = "";

  for (let i = 0; i < 12; i++) {
    const hoja = document.createElement("div");
    hoja.classList.add("hoja");
    hoja.style.left = Math.random() * 100 + "vw";
    hoja.style.animationDuration = 8 + Math.random() * 5 + "s";
    hoja.style.animationDelay = Math.random() * 5 + "s";
    hoja.style.backgroundImage = `url('${colores[color] || colores.verde}')`;
    overlay.appendChild(hoja);
  }
}
