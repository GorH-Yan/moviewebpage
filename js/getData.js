export async function getMovie(URL, options) {
    let movies = await fetch(URL, options).then(r => r.json())
    return movies
}