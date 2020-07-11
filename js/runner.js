/* eslint-disable linebreak-style */
/* eslint-disable require-jsdoc */
// const rickMarty = require('rickmortyapi')

const selectChoise = document.getElementById('searchType');
const word = document.getElementsByClassName('is-large input')[0];
const spinner = document.getElementsByClassName('spinner')[0];
const content = document.getElementById('content');
const resultContainer = document.getElementById('result-container');
const actionBtn = document.getElementById('byQueryBtn');

actionBtn.addEventListener('click', () => {
  function searchByName(value) {
    fetch(`https://rickandmortyapi.com/api/character/?name=${value}`)
        .then((res) => res.json())
        .then((data) => console.log(data));
    spinner.style.visibility = 'visible';
    setTimeout(() => {
      spinner.style.visibility = 'hidden';
    }, 3000);
  }
  function searchByEpisode(value) {
    fetch(`https://rickandmortyapi.com/api/episode/${value}`)
        .then((res) => res.json())
        .then((data) => console.log(data));
    spinner.style.visibility = 'visible';
    setTimeout(() => {
      spinner.style.visibility = 'hidden';
    }, 3000);
  }
  function searchByLocation(value) {
    fetch(`https://rickandmortyapi.com/api/location/${value}`)
        .then((res) => res.json())
        .then((data) => console.log(data));
    spinner.style.visibility = 'visible';
    setTimeout(() => {
      spinner.style.visibility = 'hidden';
    }, 3000);
  }
  switch (selectChoise.selectedIndex) {
    case 0:
      searchByName(word.value);
      break;
    case 1:
      searchByEpisode(word.value);
      break;
    case 2:
      searchByLocation(word.value);
      break;
  }
});
