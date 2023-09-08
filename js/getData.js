import { drowRightMenu, drowSearch } from "./drowMovie.js"
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
    if (titleResult.length === 0) {
        blackBack.style.display = 'block'
        const wrongSearch = document.createElement('h2')
        wrongSearch.textContent = 'No Movies Found'
        showSearch.classList.add('wrongSearch')
        showSearch.append(wrongSearch)
        document.body.style.overflowY = 'hidden'
    } else {
        titleResult.forEach(e => {
            drowSearch(e)
        })
    }
}

export async function getGenre() {
    let genreList = await getMovie('https://api.themoviedb.org/3/genre/movie/list', options)
    let genreResult = genreList.genres
    genreResult.forEach(e => {
        drowRightMenu(e)
    })
}