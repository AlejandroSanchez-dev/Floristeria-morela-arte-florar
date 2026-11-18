// Rellena los datos legales de las páginas legales a partir de data.json
// (se editan desde el panel: sección "Datos legales del titular").
(async () => {
  const year = document.getElementById('current-year');
  if (year) year.textContent = new Date().getFullYear();

  let data = {};
  try {
    const res = await fetch('/data.json', { cache: 'no-store' });
    if (res.ok) data = await res.json();
  } catch (_) { /* sin conexión: se quedan los textos por defecto */ }

  const legal = data.legal || {};
  const contacto = data.contacto || {};
  const envio = data.envio || {};

  const formatDate = iso => {
    const m = String(iso || '').match(/^(\d{4})-(\d{2})-(\d{2})/);
    return m ? `${m[3]}/${m[2]}/${m[1]}` : '';
  };

  const values = {
    titular: legal.titular,
    nif: legal.nif,
    email: legal.email || contacto.email,
    registro: legal.registro,
    actualizado: formatDate(legal.actualizado),
    telefono: contacto.telefono,
    envio_zona: envio.zona,
    envio_coste: envio.coste,
    envio_gratis: envio.gratis_desde,
    envio_plazo: envio.plazo
  };

  document.querySelectorAll('[data-l]').forEach(el => {
    const key = el.getAttribute('data-l');
    const value = values[key];
    if (value === undefined || value === null || value === '') return;
    if (key === 'email') {
      el.innerHTML = '';
      const a = document.createElement('a');
      a.href = 'mailto:' + value;
      a.textContent = value;
      el.appendChild(a);
    } else {
      el.textContent = value;
    }
    el.classList.remove('pendiente');
  });

  // La fila de datos registrales solo tiene sentido si es una sociedad
  const row = document.querySelector('[data-row="registro"]');
  if (row && !legal.registro) row.remove();
})();
