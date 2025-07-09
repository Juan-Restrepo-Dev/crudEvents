function logMiddleware(req, res, next) {
  console.log(`[url] ${req.url}`);
  next();
}
function sessionMiddleware(req, res, next) {
  const session = sessionStorage.getItem("userLog");
  req.user = session ? JSON.parse(session) : null;
  console.log(`[Usuario]`, req.user);
  if (req.user) {
    console.log("Usuario autenticado:", req.user);
  } else {
    console.log("No hay usuario autenticado.");
  }
  next();
}
function logoutMiddleware(req, res, next) {
  if (req.url === "/logout") {
    sessionStorage.removeItem("userLog");
    alert("Has cerrado sesión.");
    location.hash = "#/";
  }
  next();
}

// middlewares.push(logoutMiddleware);
function authGuard(req, res, next) {
  const authorizedRoles = {
    "": ["admin", "user"],
    "/": ["admin","user"],
    "/index.html": ["admin", "user"],
    "/create-products": ["admin", "user"],
    "/list-products": ["admin", "user"],
    "/profile": ["admin", "user"],
    "/notes": ["admin", "user"],
    "/gallery": ["admin", "user"],
    "/logs": ["admin", "user"],
  };
  const rolesPath = authorizedRoles[req.url] || [];
  console.log(`Roles permitidos para la ruta ${req.url}:`, rolesPath);

  if (!rolesPath.includes(req.user?.role)) {
    alert("Acceso denegado No tienes permisos para acceder a esta ruta. Redirigiendo al inicio de seccion...");
    location= "src/auth/login/login.html";
    return;
  }
  next();
}

export const guards = {logMiddleware, sessionMiddleware, logoutMiddleware, authGuard};