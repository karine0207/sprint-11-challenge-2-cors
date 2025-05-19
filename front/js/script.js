const form = document.getElementById('charForm');
const input = document.getElementById('charName');
const results = document.getElementById('results');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const name = input.value.trim();

  if (!name) {
    results.innerHTML = '<p>Por favor, ingresa un nombre.</p>';
    return;
  }

  results.innerHTML = '<p>Buscando...</p>';

  try {
    const res = await fetch(`http://localhost:3000/characters/${encodeURIComponent(name)}`);

    if (!res.ok) throw new Error('Personaje no encontrado');

    const data = await res.json();


    results.innerHTML = `
      <li>
        <h2>${data.name}</h2>
        <img src="${data.image}" alt="${data.name}" />
        <p><strong>Status:</strong> ${data.status}</p>
        <p><strong>Species:</strong> ${data.species}</p>
        <p><strong>Gender:</strong> ${data.gender}</p>
        <p><strong>Origin:</strong> ${data.origin}</p>
      </li>
    `;
  } catch (error) {
    results.innerHTML = '<p>Personaje no encontrado.</p>';
    console.error(error);
  }
});
