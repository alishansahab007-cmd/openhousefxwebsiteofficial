export const WELCOME = {
  policy: "session" as "session" | "always" | "disabled",
  storageKey: "openhousefx_welcome_v4",
  event: "openhousefx:welcome-finished",
  sequenceDuration: 2450,
  maximumDuration: 2800,
};

// Runs before body paint. Native animation events also complete the welcome
// when React is still hydrating; the timeout only handles interrupted motion.
export const WELCOME_BOOTSTRAP = `(() => {
  const policy = ${JSON.stringify(WELCOME.policy)};
  const key = ${JSON.stringify(WELCOME.storageKey)};
  const eventName = ${JSON.stringify(WELCOME.event)};
  const root = document.documentElement;
  if (policy === "disabled" || location.pathname !== "/" || (location.hash && location.hash !== "#top")) return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  try {
    if (policy === "session" && sessionStorage.getItem(key)) return;
    sessionStorage.setItem(key, "started");
  } catch { return; }
  root.dataset.welcomeStarted = String(Date.now());
  root.dataset.welcome = "active";

  function cleanup() {
    window.clearTimeout(timer);
    document.removeEventListener("animationend", onCurtainEnd);
    document.removeEventListener("visibilitychange", onVisibility);
    window.removeEventListener("pageshow", onPageShow);
    window.removeEventListener(eventName, cleanup);
  }
  function finish() {
    cleanup();
    if (root.dataset.welcome !== "active") return;
    root.removeAttribute("data-welcome");
    root.removeAttribute("data-welcome-timer");
    root.removeAttribute("data-welcome-started");
    const page = document.getElementById("site-content");
    if (page) page.inert = false;
    try { sessionStorage.setItem(key, "completed"); } catch {}
    window.dispatchEvent(new Event(eventName));
  }
  function onCurtainEnd(event) {
    if (event.target instanceof Element && event.target.hasAttribute("data-welcome-right")) finish();
  }
  function onVisibility() { if (document.hidden) finish(); }
  function onPageShow(event) { if (event.persisted) finish(); }

  const timer = window.setTimeout(finish, ${WELCOME.maximumDuration});
  root.dataset.welcomeTimer = String(timer);
  document.addEventListener("animationend", onCurtainEnd);
  document.addEventListener("visibilitychange", onVisibility);
  window.addEventListener("pageshow", onPageShow);
  window.addEventListener(eventName, cleanup, { once: true });
})();`;
