fetch('../obj/musica.json')
.then(response=> response.json())
.then(data=>{
  //data è un array di oggetti
  console.log(data);

  let radioGenere=document.querySelector('#radioGenere');
  let radioArtista=document.querySelector('#radioArtista');
  let radioAnno=document.querySelector('#radioAnno');
  let containerCards=document.querySelector('#containerCards');
  let btnReset = document.querySelector(`.btn-reset`);

  let found=document.querySelector('.found');





  //-----------------RADIO BUTTON--------------------//
  //genera radio button con generi univoci
  function setGenere(){
    let generi=[]; //generi univoci

    //popolo l'array di generi unici
    data.forEach(element => {
      if(!generi.includes(element.genre)){
        generi.push(element.genre)
      }
    });

    generi.sort((a, b) => a.localeCompare(b)); //ordina i generi per ordine alfabetico

    //conta quanti ce ne stanno per ogni genere
    generi.forEach(genere=>{
      let count=0;
      data.forEach(element => {
        if(genere==element.genre){
          count++;
        }
      });
      
      //popolo il contenitore Genere
      let div=document.createElement('div');
      div.classList.add('form-check');
      div.innerHTML=` 
          <input class="form-check-input genere" type="radio" name="genere" id="${genere}">
            <label class="form-check-label" for=${genere}>
        ${genere} (${count})
        </label>
      `;
      radioGenere.appendChild(div);
    })
  }
  setGenere(); //eseguo la funzione precedente

  //genera radio button con artisti univoci
  function setArtista(){
    let artisti=[]; //artisti univoci

    //popolo l'array di generi unici
    data.forEach(element => {
      if(!artisti.includes(element.artist)){
        artisti.push(element.artist)
      }
    });

    artisti.sort((a, b) => a.localeCompare(b)); //ordina gli artisti per ordine alfabetico

    //conta quanti ce ne stanno per ogni categoria
    artisti.forEach(artista=>{
      let count=0;
      data.forEach(element => {
        if(artista==element.artist){
          count++;
        }
      });
      
      //popolo il contenitore Artista
      let div=document.createElement('div');
      div.classList.add('form-check');
      div.innerHTML=` 
          <input class="form-check-input artista" type="radio" name="artista" id="${artista}">
            <label class="form-check-label" for=${artista}>
        ${artista} (${count})
        </label>
      `;
      radioArtista.appendChild(div);
    })
  }
  setArtista(); //eseguo la funzione precedente

  //genera radio button con anni univoci
  function setAnno(){
    let anni=[]; //anni univoci

    //popolo l'array di generi unici
    data.forEach(element => {
      if(!anni.includes(element.year)){
        anni.push(element.year)
      }
    });

    anni.sort((a,b) => b-a); //ordine scescente

    //conta quanti ce ne stanno per ogni categoria
    anni.forEach(anno=>{
      let count=0;
      data.forEach(element => {
        if(anno==element.year){
          count++;
        }
      });
      
      //popolo il contenitore Anno
      let div=document.createElement('div');
      div.classList.add('form-check');
      div.innerHTML=` 
          <input class="form-check-input anno" type="radio" name="anno" id="${anno}">
            <label class="form-check-label" for=${anno}>
        ${anno} (${count})
        </label>
      `;
      radioAnno.appendChild(div);
    })
  }
  setAnno(); //eseguo la funzione precedente

  //-----------CARD GENERATOR---------------//

  function createCards(array) {
    // Ripulire il contenuto della sezione
    containerCards.innerHTML = '';
    array.forEach(musica => {
        let div = document.createElement('div');
        div.classList.add('card', 'mb-2', 'mx-2');
        div.style.width='18rem';
        div.innerHTML = `
          <img src="${musica.cover}" class="card-img-top" alt="...">
          <div class="card-body" >
            <h5 class="card-title">${musica.title}</h5>
            <p class="card-text">${musica.artist}</p>
            <p class="card-title">${musica.year}</p>
            <p class="card-title">${musica.price}€</p>
            <p class="card-title">(${musica.genre})</p>
            <button class="btn riproduci" id="riproduci-${musica.id}">Riproduci</button>
          </div>
        `;
        containerCards.appendChild(div);
    })
}
// Invocare la funzione createCards per creare gli Annunci
createCards(data);

  

//------------RANGE MANAGER-------------//
  let inputRange=document.querySelector('#inputRange'); //slider range
  let maxValue=document.querySelector('#maxValue'); //valore max
  //trova il prezzo maggiore
  function rangeMax(){
    let prices = data.map(musica => Number(musica.price)); // crea un array con i soli price di data
    let maxPrice = Math.max(...prices); //trova il max in un array di numeri con lo spread operator
    console.log(maxPrice);
    inputRange.max = maxPrice; //accede al parametro max del range
    inputRange.value = maxPrice; //accede al parametro min del range
    maxValue.innerHTML = `${maxPrice}&euro;`//popolo il container
  }
  rangeMax();


  //FILTRO GLOBALE  
  //--------------FILTRO GENERE------------------//
  let radioGenreInput = document.querySelectorAll('.genere'); //prendo tutti radio genere
  function filterByGenere(array) {
      let arrayFromNode=Array.from(radioGenreInput);  //ottengo un array di radio genere
      let checked=arrayFromNode.find(element=> element.checked==true); //seleziono solo quelli checked
      let genereSelected = checked.id; //contiene la categoria selezionata <- id
      //console.log(genereSelected);
      if (genereSelected == 'AllGenres') {
        return array;
      } 
      else {
        let filtered = array.filter(musica => musica.genre == genereSelected);
        //console.log(filtered);
        return filtered;
      }
  }
  //--------------FILTRO ARTISTA------------------//
  let radioArtistInput = document.querySelectorAll('.artista'); //prendo tutti radio artista
  function filterByArtista(array) {
    let arrayFromNode=Array.from(radioArtistInput);  //ottengo un array di radio artusta
    let checked=arrayFromNode.find(element=> element.checked==true); //seleziono solo quelli checked
    let artistaSelected = checked.id; //contiene artista selezionato <- id

    if (artistaSelected == 'AllArtists') {
      return array;
    } 
    else {
      let filtered = array.filter(musica => musica.artist == artistaSelected);
      //console.log(filtered);
      return filtered;
    }
  }

      //--------------FILTRO ANNO------------------//
  let radioYearInput = document.querySelectorAll('.anno'); //prendo tutti radio anno
  function filterByAnno(array) {
    let arrayFromNode=Array.from(radioYearInput);  //ottengo un array di radio genere

    let checked=arrayFromNode.find(element=> element.checked==true); //seleziono solo quelli checked
    let annoSelected = checked.id; //contiene l'anno selezionato <- id
    if (annoSelected == 'AllYears') {
      return array;
    } 
    else {
      let filtered = array.filter(musica => musica.year == annoSelected);
      //console.log(filtered);
      return filtered;
    }
  }


  //--------------------FILTRO PREZZO----------------//
  function filterByPrice(array) {
    let filtered = array.filter(element => Number(element.price) <= Number(inputRange.value));
    return filtered;
  }

  //--------------FILTRO FORM------------------------//
  function filterByWord(array) {
    let filtered =  array.filter(element => element.title.toLowerCase().includes(form.value.toLowerCase()));
    return filtered;
  }

//--------------FILTRO GLOBALE-----------------//
  function globalFilter() {
    let resultGenere=filterByGenere(data);
   
    let resultArtista=filterByArtista(resultGenere);
 
    let resultAnno=filterByAnno(resultArtista);
   
    let resultPrezzo=filterByPrice(resultAnno);

    let resultParola=filterByWord(resultPrezzo);
   
    //  Dopo aver filtrato deve creare le carte con la funzione create cards

    if (resultParola.length > 0) {
      let div = document.createElement('div');
      found.innerHTML = '';
      div.innerHTML = `Trovati ${resultParola.length} elementi`;
      found.appendChild(div);
      createCards(resultParola);
    } 
    // Se non trova niente 
    else { 
      let div1 = document.createElement('div');
      found.innerHTML = '';
      div1.innerHTML = `Trovati ${resultParola.length} elementi`;
      found.appendChild(div1);

      containerCards.innerHTML = '';
      let div = document.createElement('div');
      div.classList.add(`col-12`,`align-self-center`,`d-flex`,`justify-content-center`, 'found', 'rounded-1');
      div.innerHTML = `Non ho trovato nessun brano`;
      containerCards.appendChild(div);
    }
  }
  // Pulsante che reinvoca la funzione createcards con data per "ripulire i filtri"!
btnReset.onclick = function (){
  
  document.getElementById("AllGenres").click();
  document.getElementById("AllArtists").click();
  document.getElementById("AllYears").click();
  //Per cambiare il valore nella scrollbar bisogna riprendere il valore Max value togliere il simbolo dell'euro se no si bagga
  let Valmax = document.getElementById("maxValue").innerHTML;
  let CleanValmax = Valmax.replace(/€/g, "");
  document.getElementById("inputRange").value = CleanValmax;
  // Pulire il valore dentro searchword
  document.getElementById("searchWord").value = "";
  //  ricrea le cards attraverso i valori data
  createCards(data);

    }

  let allRadio=document.querySelectorAll('.form-check-input');
  let range=document.querySelector('#inputRange');
  let form=document.querySelector('#searchWord');

  allRadio.forEach(radio=> {
    radio.addEventListener('click', ()=>{
      globalFilter();
    })
  })

  range.addEventListener('input', () => {
     globalFilter();
  })

  form.addEventListener('input', () => {
    globalFilter();
  })
  globalFilter();


//--------------AUDIO MANAGER------------------------------------//

let audio=null;
//fix map from 100 to 60 range
  function mapRangeValue(x, in_min, in_max, out_min, out_max) {
      return (x - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
  }

  //fix seconds text
  function fixSeconds(num) {
    let decimal = num % 1; //parte intera 0 e parte decimale da convertire -> 0.762123
    let decimal60 = mapRangeValue(decimal, 0, 0.99999, 1, 60); //mappa nel range desiderato -da 0.50 -> 0.30
    let seconds = Math.floor(decimal60).toString().substring(0, 2); //estraggo la sola parte decimale formata da due cifre -> da 0.25 -> 25
    if (seconds.length < 2) { //se le cifre estratte sono 2 -> 1 , 2 , 3 ....9
      seconds = "0" + seconds; //antepone uno 0 -> da 2 a 02
    }
    return seconds;
  }
  let nav=document.createElement('nav');
  function playMusic(musica){
    nav.innerHTML=``;
    nav.classList.add('navbar', 'navbar-expand-lg', 'navbar-bottom');
    nav.innerHTML=`
    <div class="container-fluid">
      <div class="collapse navbar-collapse row" id="navbarNav">
        <ul class="navbar-nav">

          <li class="nav-item d-flex justify-content-end col-3">
            <h4 class="me-5 mt-3">${musica.artist}</h4>
            <h4 class="fw-bold mt-3">${musica.title}</h4>
          </li>

          <li class="nav-item d-flex justify-content-center col-1" >
            <button id="playPause" class="btn mt-1"> <h2 class="bi bi-pause-circle" style="color:black">  </h2></button>
          </li>

          <li class="nav-item col-8 d-flex justify-content-start align-items-center">
            <p id="start" class="mx-2 bg-black text-light mt-3 rounded-3 px-2">0:00</p>
            <div class="progress-bottom">
              <input id="progressAudio" type="range" class="form-range " min="0" max="" value="0" step="0.01" >
            </div>
            <p id="end" class="mx-2 bg-black text-light mt-3 rounded-3 px-2"></p>            
          </li>
        </ul>
        <audio preload="metadata">
              <source src="${musica.url}">
          </audio>
      </div>
    </div>
    `
    player.appendChild(nav); 

    audio=document.querySelector('audio');

    //PULSANTI
        //sul player
    let playPause=document.querySelector('#playPause');

    audio.play();


    //PLAY
   playPause.addEventListener('click', () => {
  if (audio.paused) {
    audio.play();
    console.log("play");
    playPause.innerHTML = '<h2 class="bi bi-pause-circle" style="color:black">';
  } else {
    audio.pause();
    console.log("pause");
    playPause.innerHTML = '<h2 class="bi bi-play-circle" style="color:black">';
  }
  playPause.blur(); // aggiungi questo per risolvere il problema di focus
});



    //metto in ascolto l'oggetto audio tramite le sue metainformazioni
    let end=document.querySelector("#end");
    let playerProgress=document.querySelector("#progressAudio");

    audio.addEventListener('loadedmetadata', ()=>{ 
        end.innerHTML=`${Math.floor(audio.duration/60).toFixed(0)}:${fixSeconds(audio.duration/60)}` ;
    })

    //metto in ascolto l'audio riguardo il cambiamento del tempo del brano
    let start=document.querySelector("#start");
    audio.addEventListener('timeupdate', ()=>{ 
    start.innerHTML=`${Math.floor(audio.currentTime/60).toFixed(0)}:${fixSeconds(audio.currentTime/60)}`;

    // currentTime, startTime, endTime, startProgress, endProgress
    playerProgress.value = `${mapRangeValue(audio.currentTime, 0, audio.duration, 0, 100)}`;
    console.log(`value ${playerProgress.value} - currentTime ${audio.currentTime}`);
    })

    playerProgress.addEventListener('input', ()=>{
      audio.currentTime=`${mapRangeValue(playerProgress.value, 0, 100, 0, audio.duration)}`;

    })
  }
 //catturo play nelle card
  //funzione usata per estrarre l'id della musica dall'id del pulsante riproduci
  function extractNumber(str) {
    const arr = str.split("-");
    const numStr = arr.pop();
    const num = numStr.match(/(\d+)/)[0];
    return num;
  }

  let playCards=document.querySelectorAll(".riproduci");

  playCards.forEach(function(playCards) {
    playCards.addEventListener("click", ()=> {
      if(audio!=null)
        audio.pause();
      let musicID=extractNumber(playCards.id); //estraggo il numero id dall'id del bottone
      let selected=data.find(element=>element.id==musicID); //trovo il primo id che cerco
      playMusic(selected);
    });
  });
})










//FILTRI SINGOLI
/*
//--------------FILTRO GENERE------------------//
let radioGenreInput = document.querySelectorAll('.genere');
function filterByGenere(genre) {
    let filtered = data.filter(musica => musica.genre == genre);
    createCards(filtered);
}

radioGenreInput.forEach(radioButton => {
    radioButton.addEventListener('click', () => {
        // console.log(radioButton.id);
        let genereSelected = radioButton.id;
        // Selezionato Tutte le Categorie
        if (genereSelected == 'AllGenres') {
            // Invocare la funzione createCards
            createCards(data);
        } 
        else {
          filterByGenere(genereSelected);
        }
    })
  })

  //--------------FILTRO ARTISTA------------------//
let radioArtistInput = document.querySelectorAll('.artista');
function filterByArtista(artist) {
    let filtered = data.filter(musica => musica.artist == artist);
    createCards(filtered);
  }

  radioArtistInput.forEach(radioButton => {
      radioButton.addEventListener('click', () => {
          // console.log(radioButton.id);
          let artistSelected = radioButton.id;
          // Selezionato Tutte le Categorie
          if (artistSelected == 'AllArtists') {
              // Invocare la funzione createCards 
              createCards(data);
            } else {
              filterByArtista(artistSelected);
          }
      })
  })


    //--------------FILTRO ANNO------------------//
let radioYearInput = document.querySelectorAll('.anno');
function filterByAnno(year) {
    let filtered = data.filter(musica => musica.year == year);
    createCards(filtered);
  }

  radioYearInput.forEach(radioButton => {
      radioButton.addEventListener('click', () => {
          // console.log(radioButton.id);
          let yearSelected = radioButton.id;
          // Selezionato Tutte le Categorie
          if (yearSelected == 'AllYears') {
              // Invocare la funzione createCards 
              createCards(data);
          } else {
            filterByAnno(yearSelected);
          }
      })
  })

    //--------------------FILTRO PREZZO----------------//
//filtra per prezzo
  function filterByPrice(number) {
    let filtered = data.filter(annuncio => Number(annuncio.price) <= Number(number));
    createCards(filtered);
  }

  let numberPrice=document.querySelector('#valueSelected'); //valore selezionato che sta nel mezzo

  //cattura il value del range ad ogni modifica del value
  inputRange.addEventListener('input', () => {
    //console.log(inputRange.value); 
    filterByPrice(inputRange.value);
    numberPrice.innerHTML = `${inputRange.value}&euro;`
  })

    //contiene la stringa nel form
  let searchWord = document.querySelector('#searchWord');


  //--------------FILTRO FORM------------------------//
  //aggiorna il valore del form ad ogni input
  searchWord.addEventListener('input', () => {
      //console.log( searchWord.value );
      filterByWord(searchWord.value);
  })
  //ricerca la parola inserita
  function filterByWord(word) {
    let filtered;
    //se esiste la parola cercata mettila in filtered
    filtered = data.filter(element => element.title.toLowerCase().includes(word.toLowerCase()));
     createCards(filtered);
  }

})
*/