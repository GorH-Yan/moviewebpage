import removeCards from "./removeData.js"
import { options } from "./script.js"

export async function getMovie(URL, options) {
    let movies = await fetch(URL, options).then(r => r.json())
    return movies
}
export async function getTrailer(id) {
    let trailerList = await getMovie(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, options)
    let trailerResult = trailerList.results
    trailerResult.forEach(trl => {
        if (trl.name.includes('Official Trailer' || trl.type === 'Trailer')) {
            return trl.key
        }
    })
    return trailerResult[0].key
}

export async function getSearch(title, showSearch) {
    let titleList = await getMovie(`https://api.themoviedb.org/3/search/movie?query=${title}`, options)
    let titleResult = titleList.results
    titleResult.forEach(e => {
        blackBack.style.display = 'block'
        const searchCard = document.createElement('div')
        const searchImage = document.createElement('img')
        const p = document.createElement('p')
        searchCard.classList.add('showCard')
        searchImage.setAttribute('src', 'https://image.tmdb.org/t/p/original' + e.poster_path)
        p.textContent = e.title
        searchCard.append(searchImage, p)
        showSearch.append(searchCard)
    })
}
