/* eslint-disable linebreak-style */
/* eslint-disable space-before-blocks */
/* eslint-disable padded-blocks */
/* eslint-disable indent */
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
    resultContainer.style.visibility = 'hidden';
    spinner.style.visibility = 'visible';

    fetch(`https://rickandmortyapi.com/api/character/?name=${value}`)
      .then((res) => res.json())
      .then((data) => {
        let result = data.results;
        const pages = data.info.pages;
        if (pages > 1) {
          for (i = 2; i <= pages; i++) {
            const page = i;
            fetch(`https://rickandmortyapi.com/api/character/?page=${i}&name=${value}`)
              .then((res) => res.json())
              .then((data) => {
                result = result.concat(data.results);
                if (page === pages) {
                  renderResultPeople(result);
                }
              });
          }
        } else {
          renderResultPeople(result);
        }
      });
    setTimeout(() => {
      spinner.style.visibility = 'hidden';
      resultContainer.style.visibility = 'visible';
      resultContainer.style.backgroundColor = 'rgba(55, 206,76, 0.57)';
    }, 3000);
  }


  async function searchByEpisode(value) {
    resultContainer.style.visibility = 'hidden';
    spinner.style.visibility = 'visible';
    const data = await (await fetch(`https://rickandmortyapi.com/api/episode/${value}`)).json();

    const arrOfUrls = data.characters.map(url => fetch(`${url}`));
    Promise.all(arrOfUrls)
      .then(res => res.map(el => el.json()))
      .then(pretty => Promise.all(pretty))
      .then(res => renderResult(data, res))



    setTimeout(() => {
      spinner.style.visibility = 'hidden';
      resultContainer.style.visibility = 'visible';
      resultContainer.style.backgroundColor = 'rgba(55, 206,76, 0.57)';
    }, 3000);
  }
  function searchByLocation(value) {
    resultContainer.style.visibility = 'hidden';
    spinner.style.visibility = 'visible';
    fetch(`https://rickandmortyapi.com/api/location/?name=${value}`)
      .then((res) => res.json())
      .then((data) => {
        let result = data.results;
        const pages = data.info.pages;
        if (pages > 1) {
          for (i = 2; i <= pages; i++) {
            const page = i;
            fetch(`https://rickandmortyapi.com/api/location/?page=${i}&name=${value}`)
              .then((res) => res.json())
              .then((data) => {
                result = result.concat(data.results);
                if (page === pages) {
                  renderResultPeople(result);
                }
              });
          }
        } else {
          renderResultPeople(result);
        }
      });

    setTimeout(() => {
      spinner.style.visibility = 'hidden';
      resultContainer.style.visibility = 'visible';
      resultContainer.style.backgroundColor = 'rgba(55, 206,76, 0.57)';
    }, 3000);
  }


  function renderResultPeople(objValue) {
    content.innerHTML = '';
    content.innerText = '';
    let tmp = '';
    console.log(objValue);
    objValue.forEach((value) => {
      if (value.image) {
        tmp += `<div class='colunm is-one-quarter'>
        <img  class='outputImage' src ="${value.image}"'>
        <div class ='outputInfo'>${value.name}</div>
        <div class ='outputInfo'>${value.status}</div>
        <br><br><br><br><br>
        </div>
        `;
      } else {
        tmp += `<div class='colunm is-one-quarter'>
      <img  class='noborder' src ="./img/icon.png"'>
        <div class ='outputInfo'>${value.name}</div>
        <div class ='outputInfo'>${value.dimension}</div><br><br><br><br><br>
        </div>
        `;

      }
    });

    content.innerHTML = tmp;
  }
  function renderResult(objValue, arr) {
    content.innerHTML = '';
    content.innerText = '';
    let tmp = '';
    console.log(arr);   
    tmp+= `<div class='colunm is-half'>
    <div class ='outputTitle'>Episode title:   ${objValue.name}</div>
    </div>`;
    arr.forEach(el=>{
      tmp+=`<div class='colunm is-one-quarter'>
      <img  class='outputImage' src ="${el.image}"'>
      <div class ='outputInfo'>${el.name}</div>
      <div class ='outputInfo'>${el.status}</div>
      <br><br><br><br><br>
      </div>`
    })
    content.innerHTML=tmp;
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
