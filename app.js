let staff = [];
let areas = [];
let rotationIndex = 0;

const fileInput = document.getElementById('fileInput');
const areaSelect = document.getElementById('areaSelect');
const wheel = document.getElementById('wheel');
const rotateBtn = document.getElementById('rotateBtn');

// 1️⃣ Datei laden
fileInput.addEventListener('change', e => {
  const file = e.target.files[0];
  const reader = new FileReader();
  reader.onload = ev => {
    const data = JSON.parse(ev.target.result);
    staff = data.staff;
    areas = data.areas;
    populateAreas();
    wheel.textContent = 'Daten geladen!';
  };
  reader.readAsText(file);
});

// 2️⃣ Dropdown füllen
function populateAreas() {
  areaSelect.innerHTML = '';
  areas.forEach(a => {
    const opt = document.createElement('option');
    opt.value = a.name;
    opt.textContent = a.name;
    areaSelect.appendChild(opt);
  });
  updateWheel();
}

// 3️⃣ Anzeige aktualisieren
function updateWheel() {
  const area = areaSelect.value;
  const assigned = getNextStaff(area);
  wheel.textContent = `Diese Woche: ${assigned}`;
}

// 4️⃣ Rotation-Logik (ganz einfach)
function getNextStaff(area) {
  // Finde Mitarbeiter, die für diese Abteilung qualifiziert sind
  const qualified = staff.filter(s => s.qualifications.includes(area));
  if (qualified.length === 0) return 'Niemand verfügbar';
  // „Faire Rotation“: jeder kommt der Reihe nach dran
  const person = qualified[rotationIndex % qualified.length];
  return person.name;
}

// 5️⃣ Rotate-Button
rotateBtn.addEventListener('click', () => {
  rotationIndex++;
  updateWheel();
});
