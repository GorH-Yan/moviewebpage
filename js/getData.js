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