import { drowMovie, drowInfo, drowRightMenu } from "./drowMovie.js";
import { getGenre, getMovie, getSearch } from "./getData.js";
import removeCards from "./removeData.js";
import { scrollLog } from "./scrollLog.js";

export const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhMzIxNzQ1YTUzNTBkOTA2MDZkY2IyZTEwMmNlZjJkNCIsInN1YiI6IjY0ZWY1YzM2M2E5OTM3MDExY2JkMmMyMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Orvz0zkXEVwmhBZH9yhB5zMWrC4IijM3kKr42KsFb_Y'
    }
};

const movieWrap = document.getElementById('movieWrap')
const showInfo = document.getElementById('showInfo')
const showSearch = document.getElementById('showSearch')
const blackBack = document.getElementById('blackBack')
const rightMenu = document.getElementById('rightMenu')
const inp = document.forms[0]
const burgerBtn = document.getElementById('burger')
const arrowUp = document.getElementById('arrowUp')
const left = document.getElementById('left')
const right = document.getElementById('right')

let moveiUrl = 'https://api.themoviedb.org/3/discover/movie?page=1'
let movieData = await getMovie(moveiUrl, options)
export let results = movieData.results
function loopArr(arr) {
    arr.forEach(e => {
        movieWrap.append(drowMovie(e))
    })
}
window.addEventListener('load', loopArr(results))

movieWrap.addEventListener('click', (event) => {
    if (event.target.localName === 'img') {
        let cardMovie = results.find(movie => movie.id === +event.target.dataset.id)
        drowInfo(cardMovie, showInfo)
        arrowUp.classList.remove('arrowUpActive')
    }
})
blackBack.addEventListener('click', () => {
    showInfo.style.transform = 'translateY(-3000px)'
    blackBack.style.display = 'none'
    showInfo.replaceChildren()
    showSearch.classList.remove('searchDiv')
    showSearch.replaceChildren()
    rightMenu.replaceChildren()
    if (burgerBtn.classList.contains('burgerRev')) {
        burgerBtn.classList.remove('burgerRev')
        rightMenu.classList.remove('rightMenuDef')
    }
    document.body.style.overflowY = 'auto'
})

burgerBtn.addEventListener('click', () => {
    if (burgerBtn.classList.contains('burgerRev')) {
        burgerBtn.classList.remove('burgerRev')
        rightMenu.classList.remove('rightMenuDef')
        blackBack.style.display = 'none'
    } else {
        blackBack.style.display = 'block'
        getGenre()
        burgerBtn.classList.add('burgerRev')
        rightMenu.classList.add('rightMenuDef')
    }
})

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        arrowUp.classList.add('arrowUpActive')
    } else {
        arrowUp.classList.remove('arrowUpActive')
    }
})

arrowUp.addEventListener('click', scrollLog)

right.addEventListener('click', async () => {
    let pageNum = +moveiUrl.match(/\d+$/g).join()
    pageNum++
    moveiUrl = moveiUrl.split(/\d+$/g)[0] + pageNum
    movieData = await getMovie(moveiUrl, options)
    results = movieData.results
    removeCards([...movieWrap.children])
    loopArr(results)
    scrollLog()
})

left.addEventListener('click', async () => {
    let pageNum = +moveiUrl.match(/\d+$/g).join()
    if (pageNum > 1) {
        pageNum--
        moveiUrl = moveiUrl.split(/\d+$/g)[0] + pageNum
        movieData = await getMovie(moveiUrl, options)
        results = movieData.results
        removeCards([...movieWrap.children])
        loopArr(results)
        scrollLog()
    }
})

inp.addEventListener('submit', (e) => {
    e.preventDefault()
    if (inp[0].value !== '') {
        showSearch.classList.add('searchDiv')
        getSearch(inp[0].value, showSearch)
    }
    inp.reset()
})
