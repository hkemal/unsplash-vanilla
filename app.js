let $photos, $modal, $closeButton, $select;
let page = 1;
let control = false;
let collectionId;
let yourUnsplahClientId ='Sign in Unsplah Paste here your clientId'

function addPhoto(item) {
  const $img = document.createElement('img');
  $img.src = item.urls.small;
  $img.onclick = () => imgOnClick(item);
  $photos.appendChild($img);
}

function fetchData(page = 1) {
  fetch(`https://api.unsplash.com/photos/?client_id=${yourUnsplahClientId}&page=${page}`)
    .then(r => r.json())
    .then(data => {
      data.forEach(function iterateResults(item) {
        addPhoto(item);
      });
    });
}

function searchPictures(page = 1) {
  let searchText = document.getElementById('search-text').value;
  let e = document.getElementById('select');
  collectionId = e.options[e.selectedIndex].value;
  fetch(`https://api.unsplash.com/search/photos?page=1&query=${searchText}&collections=${collectionId}&client_id=${yourUnsplahClientId}&page=${page}`)
    .then(r => r.json())
    .then(data => {
      data.results.forEach(function iterateResults(item) {
        addPhoto(item);
      });
    });
}

function handleSearchSubmit(e) {
  e.preventDefault();
  let searchText = document.getElementById('search-text').value;
  if (!searchText) {
    if (control) {
      removeAllPictures();
      fetchData();
      control = false;
    }
    return;
  }
  removeAllPictures();
  control = true;
  searchPictures(1);
}

function removeAllPictures() {
  let pictureList = document.getElementById('photos');
  pictureList.innerHTML = '';
}

function loadMore() {
  if (!control) {
    fetchData(++page);
  } else {
    searchPictures(++page);
  }
}

function collectionState() {
  fetch(`https://api.unsplash.com/collections?page=3&client_id=${yourUnsplahClientId}`)
    .then(r => r.json())
    .then(data => {
      data.forEach(function iterateCollection(item) {
        collectionForm(item);
      });
    });
}

function collectionForm(item) {
  const $option = document.createElement('option');
  $select.appendChild($option);
  $option.innerHTML = item.title;
  $option.value = item.id;
}

function init() {
  $photos = document.querySelector('#photos');
  $modal = document.querySelector('#modal-container');
  $closeButton = document.querySelector('#close-button');
  $select = document.querySelector('#select')

  $closeButton.onclick = function hideModal() {
    $modal.style.display = "none";
  };

  document.querySelector('#search-form').addEventListener('submit', handleSearchSubmit);

  fetchData();
  collectionState();
}

function imgOnClick(item) {
  $modal.style.display = 'flex';
  const $pp = document.querySelector('#avatar');
  $pp.src = item.user.profile_image.medium;
  const $name = document.querySelector('#name');
  $name.innerHTML = item.user.name;
  const $username = document.querySelector('#username');
  $username.innerHTML = '@' + item.user.username;
  const $selectedPhoto = document.querySelector('#selected-photo > img');
  $selectedPhoto.src = item.urls.regular;
}

document.addEventListener('DOMContentLoaded', init);