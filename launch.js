/* MODIFICADO: Eliminación completa de interfaz, contadores y selección.
 * Forzamos la ejecución instantánea de GoldHEN. */

var TARGET = {
  goldhen: "log=1&afterglow=run&mode=goldhen",
};

var waitingForCache = false;

var appCache = (function () {
  try { return window.applicationCache || null; } catch (e) { return null; }
})();

function cacheBusy() {
  if (!appCache) return false;
  try {
    return appCache.status === appCache.CHECKING
        || appCache.status === appCache.DOWNLOADING;
  } catch (e) {
    return false;
  }
}

function cacheChanged() {
  if (waitingForCache && !cacheBusy()) {
    waitingForCache = false;
    start();
  }
}

if (appCache) {
  var events = ["checking", "downloading", "progress", "cached", "noupdate",
                "updateready", "error", "obsolete"];
  for (var e = 0; e < events.length; e++) {
    try { appCache.addEventListener(events[e], cacheChanged, false); } catch (err) {}
  }
}

function start() {
  /* Si la caché offline de la PS4 está ocupada actualizando archivos, espera.
     Si ya está lista, ejecuta GoldHEN de inmediato. */
  if (cacheBusy()) {
    waitingForCache = true;
    return;
  }
  // Salta directo a la inyección sin esperas de tiempo
  location.href = "jb.html?" + TARGET.goldhen;
}

// Ejecución automática inmediata al abrir la página
start();
