// Browser regression harness. Execute through the documented CUA browser surface:
// const { runFooterNavigation } = await import('file:///.../tests/footer-navigation.browser.mjs');
// await runFooterNavigation(tab, { base: 'http://127.0.0.1:3450', history: true });
// No browser driver or additional animation dependency is required.
const policies = [
  ['Privacy Policy', '/privacy-policy'],
  ['Terms and Conditions', '/terms-and-conditions'],
  ['SMS Terms', '/sms-terms'],
];
const sections = ['Work', 'Services', 'Process', 'Packages', 'Technology'];

async function eventually(tab, read, label) {
  const deadline = Date.now() + 6000;
  let last;
  do {
    last = await tab.playwright.evaluate(read);
    if (last.ok) return last;
  } while (Date.now() < deadline);
  throw new Error(`${label}: ${JSON.stringify(last)}`);
}

export async function runFooterNavigation(tab, { base, history = false, crossRoutes = false, policyChecks = true, sectionSources }) {
  const passed = [];
  const footer = () => tab.playwright.getByRole('navigation', { name: 'Footer navigation' });
  await tab.goto(base + '/');
  await tab.playwright.locator('[data-welcome-overlay]').waitFor({ state: 'hidden', timeoutMs: 5000 });

  for (const [label, path] of policyChecks ? policies : []) {
    await footer().getByRole('link', { name: label, exact: true }).click();
    await tab.playwright.waitForURL(base + path);
    await tab.playwright.getByRole('heading', { name: label, exact: true }).waitFor({ state: 'visible' });
    const position = await eventually(tab, () => ({
      ok: window.scrollY < 2 && !!document.querySelector('[data-policy-content]'),
      y: window.scrollY,
      headingTop: document.querySelector('h1')?.getBoundingClientRect().top,
    }), label + ' top');
    passed.push({ test: label, ...position });
    if (history) {
      await tab.back();
      await eventually(tab, () => ({ ok: window.scrollY > 1000, y: window.scrollY }), 'Back restores footer');
      await tab.forward();
      await tab.playwright.waitForURL(base + path);
      await eventually(tab, () => ({ ok: window.scrollY < 2, y: window.scrollY }), 'Forward restores policy top');
      passed.push({ test: label + ' Back/Forward', ok: true });
    }
  }

  const sources = sectionSources ?? (crossRoutes ? ['', ...policies.map(p => p[1])] : ['']);
  for (const source of sources) {
    for (const label of sections) {
      await tab.goto(base + (source || '/'));
      await tab.playwright.locator('[data-welcome-overlay]').waitFor({ state: 'hidden', timeoutMs: 5000 });
      await footer().getByRole('link', { name: label, exact: true }).click();
      await tab.playwright.waitForURL(base + '/#' + label.toLowerCase());
      const position = await eventually(tab, () => {
        const target = document.querySelector(location.hash);
        const top = target?.getBoundingClientRect().top;
        const header = document.querySelector('header')?.getBoundingClientRect().height || 0;
        const offset = Number.parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop);
        return { ok: top !== undefined && top >= header - 1 && Math.abs(top - offset) < 2 && !document.querySelector('[data-welcome-overlay]'), top, header, offset };
      }, label + ' anchor from ' + source);
      passed.push({ test: `${source || '/'} → ${label}`, ...position });
    }
  }
  // Click the same hash again from the bottom: no ignored same-URL navigation.
  if (sources.length) await footer().getByRole('link', { name: 'Technology', exact: true }).click();
  if (sources.length) await eventually(tab, () => ({ ok: Math.abs(document.querySelector('#technology').getBoundingClientRect().top - Number.parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop)) < 2 }), 'repeated hash');
  if (sources.length) passed.push({ test: 'Repeated Technology anchor', ok: true });
  const layout = await tab.playwright.evaluate(() => ({
    ok: document.documentElement.scrollWidth <= innerWidth,
    width: innerWidth,
    pointerEvents: getComputedStyle(document.querySelector('.ambient-gradient')).pointerEvents,
    inert: !!document.querySelector('#site-content[inert]'),
  }));
  if (!layout.ok || layout.pointerEvents !== 'none' || layout.inert) throw new Error(JSON.stringify(layout));
  passed.push({ test: 'Overflow / decoration / welcome', ...layout });
  return passed;
}
