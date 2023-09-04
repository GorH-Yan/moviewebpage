import { drowMovie } from "./drowMovie.js";
import { getMovie } from "./getData.js";
const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhMzIxNzQ1YTUzNTBkOTA2MDZkY2IyZTEwMmNlZjJkNCIsInN1YiI6IjY0ZWY1YzM2M2E5OTM3MDExY2JkMmMyMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Orvz0zkXEVwmhBZH9yhB5zMWrC4IijM3kKr42KsFb_Y'
    }
};
const movieWrap = document.getElementById('movieWrap')
const showInfo = document.getElementById('showInfo')
const blackBack = document.getElementById('blackBack')
const rightMenu = document.getElementById('rightMenu')
const burgerBtn = document.getElementById('burger')
const arrowUp = document.getElementById('arrowUp')
let movieData = await getMovie('https://api.themoviedb.org/3/movie/top_rated', options)
let movieData1 = await getMovie('https://api.themoviedb.org/3/discover/movie', options)
let movieData2 = await getMovie('https://api.themoviedb.org/3/movie/upcoming', options)
let results = movieData.results
let results1 = movieData1.results
let results2 = movieData2.results
results.forEach(e => {
    movieWrap.append(drowMovie(e))
})
results1.forEach(e => {
    movieWrap.append(drowMovie(e))
})
results2.forEach(e => {
    movieWrap.append(drowMovie(e))
})
movieWrap.childNodes.forEach(e => {
    e.addEventListener('click', (event) => {
        e.childNodes.forEach(elem => {
            if (event.target.dataset.id === elem.dataset.id && event.target.localName === 'img') {
                results.forEach(img => {
                    if (+event.target.dataset.id === img.id) {
                        showInfo.style.backgroundImage = `url(${'https://image.tmdb.org/t/p/original' + img.backdrop_path})`
                        const txt = document.createElement('p')
                        txt.classList.add('showInfoText')
                        txt.textContent = img.overview
                        showInfo.prepend(txt)
                    }
                })
                results1.forEach(img => {
                    if (+event.target.dataset.id === img.id) {
                        showInfo.style.backgroundImage = `url(${'https://image.tmdb.org/t/p/original' + img.backdrop_path})`
                        const txt = document.createElement('p')
                        txt.classList.add('showInfoText')
                        txt.textContent = img.overview
                        showInfo.prepend(txt)
                    }
                })
                results2.forEach(img => {
                    if (+event.target.dataset.id === img.id) {
                        showInfo.style.backgroundImage = `url(${'https://image.tmdb.org/t/p/original' + img.backdrop_path})`
                        const txt = document.createElement('p')
                        txt.classList.add('showInfoText')
                        txt.textContent = img.overview
                        showInfo.prepend(txt)
                    }
                })
                showInfo.style.transform = 'translateY(0)'
                blackBack.style.display = 'block'
                const infoCard = document.createElement('div')
                infoCard.append(e.firstChild.cloneNode(true), e.firstChild.nextSibling.cloneNode(true), e.firstChild.nextSibling.nextSibling.cloneNode(true))
                infoCard.classList.add('infoCard')
                showInfo.append(infoCard)
            }
        })
    })
})

blackBack.addEventListener('click', () => {
    showInfo.style.transform = 'translateY(-1000px)'
    blackBack.style.display = 'none'
    showInfo.replaceChildren()
})

burgerBtn.addEventListener('click', () => {
    if (burgerBtn.classList.contains('burgerRev')) {
        burgerBtn.classList.remove('burgerRev')
        rightMenu.classList.remove('rightMenuDef')
    } else {
        burgerBtn.classList.add('burgerRev')
        rightMenu.classList.add('rightMenuDef')
    }
})

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        arrowUp.style.display = 'block'
    } else {
        arrowUp.style.display = 'none'
    }
})

arrowUp.addEventListener('click', () => {
    window.scroll({
        top: 0,
        left:0,
        behavior: "smooth",
    })
})