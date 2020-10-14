let $photos, $modal, $closeButton;
let page = 1;
let control = false;

function addPhoto(item) {
  const $img = document.createElement('img');
  $img.src = item.urls.small;
  $img.onclick = () => imgOnClick(item);
  $photos.appendChild($img);
}

function fetchData(page = 1) {
  fetch(`https://api.unsplash.com/photos/?client_id=WI8xaUvGH0M6Cml_ZizBvCzmBQw_GabYEoZAKhAPMSw&page=${page}`)
    .then(r => r.json())
    .then(data => {
      data.forEach(function iterateResults(item) {    
        addPhoto(item);
      });
    });
}

function searchPictures(page = 1) {
  let searchText = document.getElementById("search-text").value;
  fetch(`https://api.unsplash.com/search/photos?page=1&query=${searchText}&collections=1020971&client_id=WI8xaUvGH0M6Cml_ZizBvCzmBQw_GabYEoZAKhAPMSw&page=${page}`)
    .then(r => r.json())
    .then(data => {
      data.results.forEach(function iterateResults(item) {    
        addPhoto(item);
      });
    });
}

function handleSearchSubmit(e) {
  e.preventDefault();
  removeAllPictures();
  control = true;
  searchPictures(1);
}

function removeAllPictures() {
  let pictureList = document.getElementById('photos');
  pictureList.innerHTML = '';
}

function loadMore() {
  // load next page
  if(!control) {
    fetchData(++page);
  } else {
    searchPictures(++page);
  }
}

function init() {
  $photos = document.querySelector('#photos'); // document.getElementById('photos');
  $modal = document.querySelector('#modal-container');
  $closeButton = document.querySelector('#close-button');

  $closeButton.onclick = function hideModal() {
    $modal.style.display = "none";
  };

  document.querySelector('#search-form').addEventListener('submit', handleSearchSubmit);

  fetchData();
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