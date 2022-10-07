function $(elem) {
  return document.querySelector(elem)
}

const $getdata = $('main')
const $inicio = $('#inicio')
const $anterior = $('#anterior')
const $siguiente = $('#siguiente')
const $ultima = $('#ultima')
const $todos = $('#Todos')
const $mujeres = $('#mujeres')
const $hombres = $('#hombres')
const $humanos = $('#humanos')
const $Dead = $('#Dead')

let page = 1
let peronajes;
let totalpersonajes;
let response;
let totalpages;

window.onload = async () => {

  load(1)
}

async function load(page) {

  if(page < 2) {
    $anterior.classList.add('desactived')
    $inicio.classList.add('desactived')
  } else {
    $anterior.classList.remove('desactived')
    $inicio.classList.remove('desactived')
  }

  if(page > 41) {
    $siguiente.classList.add('desactived')
    $ultima.classList.add('desactived')
  } else {
    $siguiente.classList.remove('desactived')
    $ultima.classList.remove('desactived')
  }

  try{
    response = await fetch(`https://rickandmortyapi.com/api/character/?page=${page}`)
    response = await response.json();
    totalpersonajes = response.info.count;
    totalpages = totalpersonajes / 20
  } catch (error) {
    console.groupCollapsed(error)
  }

  let arraypromises = [];

  try {
    response.results.forEach(async character => {
      arraypromises.push(fetch(character.url))
    });
    totalpersonajes = await Promise.all(arraypromises)
    totalpersonajes = await Promise.all(totalpersonajes.map(responsecharacter => responsecharacter.json()))
    console.log(totalpersonajes)
    paintcards (totalpersonajes);
    } catch (error) {
    console.log(error)
  }
} 

$inicio.onclick = inicio
$anterior.onclick = anterior
$siguiente.onclick = siguiente
$ultima.onclick = ultima
$todos.onclick = todos
$Dead.onclick = Dead
$mujeres.onclick = mujeres
$hombres.onclick = hombres
$humanos.onclick = humanos

function siguiente () {
  if(page < 42 ) { 
    page += 1;
    load(page)
  }
}

function anterior () {
  if(page > 1) { 
    page -= 1;
    load(page)
  }
}

function inicio () {
  if(page !== 1) { 
    page = 1;
    load(page)
  }
}

function ultima () {
  if(page < 42) {
    while (page < 42) { 
      page = 42; 
    }
    load(page)
 }
}

function todos() {
  paintcards(totalpersonajes)
}

function Dead() {
  page = 0
  let nuevoarray= [];
  totalpersonajes.forEach(character => {
    if(character.status === "Dead") {
      nuevoarray.push(character)
    }
  })
  paintcards(nuevoarray)
  console.log(nuevoarray)
}

function hombres() {
  page = 0
  let nuevoarray= [];
  totalpersonajes.forEach(character => {
    if(character.gender === "Male") {
      nuevoarray.push(character)
    }
  })
  paintcards(nuevoarray)
  console.log(nuevoarray)
}

function mujeres() {
  page = 0
  let nuevoarray= [];
  totalpersonajes.forEach(character => {
    if(character.gender === "Female") {
      nuevoarray.push(character)
    }
  })
  paintcards(nuevoarray)
  console.log(nuevoarray)
}

function humanos() {
  page = 0
  let nuevoarray= [];
  totalpersonajes.forEach(character => {
    if(character.species === "Human") {
      nuevoarray.push(character)
    }
  })
  paintcards(nuevoarray)
  console.log(nuevoarray)
}

function paintcards (charactertopaint) {
  $getdata.innerHTML = ""
  charactertopaint.forEach(character => {
  $getdata.innerHTML += `
  <div class="characters" data-characters>
      <div id="caja" class='box' key={item.id}>
          <div class="imag">
              <img src=${character.image} alt={item.name} />
          </div>
          <div class='character'>
              <p class="name">Nombre: ${character.name}</p>
              <p class="specie">Especie: ${character.species}</p>
              <p class="status">Estatus: ${character.status}</p>
              <p class='gender'>Genero: ${character.gender}</p>
              <p class='origin'>Origen: ${character.origin.name}</p>
              <p class='location'>Location: ${character.location.name}</p>
          </div>
      <div class="ver">
          <a href="#">Ver mas...</a>
          </div>
      </div>
  </div>`
})
}
