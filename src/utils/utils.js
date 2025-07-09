async function loadModule(url,path) {
  console.log("Cargando modulo de el path:", path);

  // obtiene  el elemento root por id del documento html
  const container = document.getElementById("app-container");
  //pelu un loader 
  container.innerHTML = "loading...";
  //funcion fetch para obtener el elemnto html
  try {
    console.log("RUTA",`src${path}.html`)
    const response = await fetch(`src${path}.html`);
    if (!response.ok) throw new Error("Error al cargar el modulo");

    const html = await response.text();
    container.innerHTML = html;

    //agregamos el css si no ha sido agregado
    const existingStyle = document.querySelector(`link[data-module="${url}"]`);
    if (!existingStyle) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = `src${path}.css`;
      link.setAttribute("data-module", url);
      document.head.appendChild(link);
    }

    //agregamos el script
    const existingScript = document.querySelector(`script[data-module="${url}"]`);
    if (!existingScript) {
      const script = document.createElement("script");
      script.type = "module"
      script.src = `src${path}.js`;
      script.setAttribute("data-module", url);
      script.onload = () => { console.log(`se a cargado el scipt del modulo ${url}`) }
      document.body.appendChild(script);
    }
  }
  catch (error) {
    console.error(error, "ocurrio un error al cargar el modulo");
    container.innerHTML = " <h1>404 Lapagina no existe </h1> "
  }

}

export function render(req) {
  if (!req.url) {
    console.error("No se ha proporcionado una ruta válida");
    return;
  }
  if (req.url === "/") {
    return
  } else {
    loadModule(req.url,req.path);
  }
}


export function RegisterAction(action) {
  const date = new Date().toLocaleString();

  const history = JSON.parse(localStorage.getItem("Action")) || [];
  history.push({ action, date });

  localStorage.setItem("Action", JSON.stringify(history));
};
