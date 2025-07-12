import {render} from "../utils/utils.js"
import {guards} from "../guard/guard.js"

const middlewares = [guards.logMiddleware, guards.sessionMiddleware, guards.authGuard];
const routes = {
    "": "/",
    "/": "/",
    "/index.html": "/",
    "/events": "/events/events",
    "/messages": "/show_messages/show_messages",
    "/subscriptions": "/subscription/subscription",
  };
function composeAsync(middlewares) {
  return async function handler(req, res) {
    showSpinner();
    for (let i = 0; i < middlewares.length; i++) {
      await new Promise((resolve, reject) => {
        try {
          middlewares[i](req, res, resolve);
        } catch (err) {
          reject(err);
        }
      });
    }
    hideSpinner();
    render(req);
  };
}

function showSpinner() {
  document.getElementById("spinner").style.display = "block";
}

function hideSpinner() {
  document.getElementById("spinner").style.display = "none";
}

export function handleRouteChange() {
  const url = location.hash.slice(1) || "/";
  const path = routes[url] || "/404"
  const req = { url,path };
  const res = {};
  console.log("Ruta actual:", url);
  composeAsync(middlewares)(req, res);
}


