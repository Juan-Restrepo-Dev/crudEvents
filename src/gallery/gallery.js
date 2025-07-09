
const inputUrl = document.getElementById('imageUrl');
const btnAdd = document.getElementById('btnAdd');
const gallery = document.getElementById('gallery');

document.addEventListener('DOMContentLoaded', () => {
  const savedPhotos = JSON.parse(localStorage.getItem('photos')) || [];
  savedPhotos.forEach(url => createCard(url));
});

btnAdd.addEventListener('click', () => {
  const url = inputUrl.value.trim();
  if (!url) return;

  createCard(url);
  photoSaved(url);
  inputUrl.value = '';
});

gallery.addEventListener('click', (e) => {
  if (e.target.classList.contains('btn-eliminar')) {
    const col = e.target.closest('.col-md-4');
    const url = col.getAttribute('data-url');
    photoDelete(url);
    col.remove();
  }
});

function createCard(url) {
  const col = document.createElement('div');
  col.className = 'col-md-4 mb-4';
  col.setAttribute('data-url', url);

  col.innerHTML = `
    <div class="card shadow-sm h-50">
      <img src="${url}" class="card-img-top h-100" alt="Foto">
      <button class="btn btn-danger btn-sm btn-eliminar">Eliminar</button>
      
    </div>
  `;

  gallery.appendChild(col);
} 

function photoSaved(url) {
  const photos = JSON.parse(localStorage.getItem('photos')) || [];
  photos.push(url);
  localStorage.setItem('photos', JSON.stringify(photos));
}

function photoDelete(url) {
  const photos = JSON.parse(localStorage.getItem('photos')) || [];
  const newPhoto = photos.filter(foto => foto !== url);
  localStorage.setItem('photos', JSON.stringify(newPhoto));
}