// DOM selectors 
const
  mainScreen = document.querySelector('.main-screen'),

  pokeName = document.querySelector('.poke-name'),
  pokeId = document.querySelector('.poke-id'),
  pokeTypeOne = document.querySelector('.poke-type-one'),
  pokeTypeTwo = document.querySelector('.poke-type-two'),
  pokeWeight = document.querySelector('.poke-weight'),
  pokeHeight = document.querySelector('.poke-height'),
  pokeListItems = document.querySelectorAll('.list-item'),
  rightContainerScreen = document.querySelector('.right-container__screen'),

  nextPageBtn = document.querySelector('.right-button'),
  prevPageBtn = document.querySelector('.left-button'),

  pokeFrontImage = document.querySelector('.poke-front-image'),
  pokeBackImage = document.querySelector('.poke-back-image');

//variables
let 
prevUrl = null,
nextUrl = null,
resultData ='';
//functions

const fetchRightSide = (url) => {
  //get data for RIGHT SIDE of screen
  fetch(url)
    .then(res => res.json())
    .then(data => {
      
      // extracting results para from data object
      const { results, next, previous } = data
      prevUrl = previous
      nextUrl = next;
      
  
      for (let i = 0; i < results.length; i++) {
        const resultData = results[i]
        const { name, url } = resultData

        const urlArray = url.split('/')
        const pokeListItem = document.createElement('div')
        pokeListItem.className = 'list-item'
        resultData ? pokeListItem.innerHTML = `${urlArray[urlArray.length - 2]} ${name}` : pokeListItem.innerHTML = ''
        rightContainerScreen.appendChild(pokeListItem)
      }}
    )
}

const fetchLeftSide = (url) => {

  // get data for LEFT SIDE of screen
  fetch(url)
    .then(res => res.json())
    .then(data => {
      console.log(data)
      mainScreen.setAttribute('id', '')
      pokeBackImage.classList.remove('hide')

      if (data.types.length > 1) {
        pokeTypeOne.innerHTML = data.types[0].type.name
        pokeTypeTwo.innerHTML = data.types[1].type.name
      } else {
        pokeTypeOne.innerHTML = data.types[0].type.name
        pokeTypeTwo.remove()
      }
  
      // mainScreen.classList.add(data.types[0].type.name)
      mainScreen.setAttribute('id', data.types[0].type.name)
      mainScreen.classList.remove('hide')
      pokeName.innerHTML = data.name
      pokeId.innerHTML = `#${data.id.toString().padStart(4, '0')}`
      pokeWeight.innerHTML = data.weight
      pokeHeight.innerHTML = data.height  

      const {back_default, front_default} = data.sprites
      
      
      if(back_default === null) {
        pokeBackImage.classList.add('hide')
      }
      pokeFrontImage.src = front_default 
      pokeBackImage.src = back_default || ''

    })
}


//Event Listeners 
nextPageBtn.addEventListener('click', () => {
  // while (rightContainerScreen.hasChildNodes()) {
  //   rightContainerScreen.removeChild(rightContainerScreen.lastChild)
  // }
  rightContainerScreen.innerHTML = ''
  
  nextUrl ? fetchRightSide(nextUrl) : null
})

prevPageBtn.addEventListener('click', () => {
  if(prevUrl) {
     rightContainerScreen.innerHTML = ''
    fetchRightSide(prevUrl)
  }
} )


fetchRightSide(`https://pokeapi.co/api/v2/pokemon?offset=0&limit=20`)
fetchLeftSide(`https://pokeapi.co/api/v2/pokemon/${Math.floor(Math.random()*893) + 1}`)


    rightContainerScreen.addEventListener('click', (e) => {
      if(e.target.className === 'list-item') {
        const arrayListItem = e.target.innerHTML.split(' ')[0]
        fetchLeftSide(`https://pokeapi.co/api/v2/pokemon/${arrayListItem}`)
      }
      
    })

   