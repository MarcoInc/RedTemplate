let tracks=[{ 'name' : 'track 1', 'id':'pop' , 'artist': 'artista1' },
            { 'name' : 'track 2', 'id':'rap' , 'artist': 'artista2' },
            { 'name' : 'track 3', 'id':'rock' , 'artist': 'artista3' },
            { 'name' : 'track 4', 'genre':'classic' , 'artist': 'artista4' }
]



// counter

let firstnumber = document.querySelector ('#firstnumber')
let secondnumber = document.querySelector("#secondnumber");
let thirdnumber = document.querySelector("#thirdnumber");


function interval(element, final, frame) {
    let counter = 0; //va messo dentro altrimenti il contatore è unico per tutti
    let interval = setInterval(() => {
      if (counter < final) {
        counter++;
        element.innerHTML = counter;
      } else {
        clearInterval(interval);
      }
    }, frame);
}

// intersection observer
let observer = new IntersectionObserver ((entries) => {
    entries.forEach(entry =>{
        if (entry.isIntersecting ) {
            interval(firstnumber, 500, 5);
            interval(secondnumber, 200, 7);
            interval(thirdnumber, 1000, 1); //1000 -> 1 secondo
            ;
        }
    })
})
observer.observe(firstnumber)

