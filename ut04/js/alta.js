// alta.js · Validación a medida del alta de usuario (UT4, Fase 5)
const EDAD_MINIMA = 14;

const nacimiento = document.getElementById('nacimiento');
const clave  = document.getElementById('clave');
const clave2 = document.getElementById('clave2');

// ---------- Edad mínima calculada a partir de la fecha de nacimiento ----------
function comprobarEdad() {
  if (!nacimiento.value) { nacimiento.setCustomValidity(''); return; }
  const [a, m, d] = nacimiento.value.split('-').map(Number);   // sin new Date("aaaa-mm-dd") (UTC)
  const hoy = new Date();
  let edad = hoy.getFullYear() - a;
  // Si este año aún no ha cumplido años, se resta uno
  const yaCumplio = (hoy.getMonth() + 1 > m) || (hoy.getMonth() + 1 === m && hoy.getDate() >= d);
  if (!yaCumplio) edad--;

  if (new Date(a, m - 1, d) > hoy) {
    nacimiento.setCustomValidity('La fecha de nacimiento no puede ser futura');
  } else if (edad < EDAD_MINIMA) {
    nacimiento.setCustomValidity('Debes tener al menos ' + EDAD_MINIMA + ' años (tienes ' + edad + ')');
  } else {
    nacimiento.setCustomValidity('');     // limpiar el error cuando el valor vuelve a ser correcto
  }
}
nacimiento.addEventListener('input', comprobarEdad);

// ---------- Contraseñas que coinciden ----------
function comprobarClaves() {
  clave2.setCustomValidity(
    clave2.value && clave2.value !== clave.value ? 'Las contraseñas no coinciden' : ''
  );
}
clave.addEventListener('input', comprobarClaves);
clave2.addEventListener('input', comprobarClaves);
