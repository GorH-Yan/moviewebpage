const pageInfo = document.getElementById('pageInfo')
const pageTitle = document.getElementById('pageTitle')
let movieId = location.hash.slice(1)
let movieUrl = `https://api.themoviedb.org/3/movie/${movieId}`
const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhMzIxNzQ1YTUzNTBkOTA2MDZkY2IyZTEwMmNlZjJkNCIsInN1YiI6IjY0ZWY1YzM2M2E5OTM3MDExY2JkMmMyMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Orvz0zkXEVwmhBZH9yhB5zMWrC4IijM3kKr42KsFb_Y'
    }
};
const getMoive = async (URL, options) => fetch(URL, options).then(r => r.json())
let movie = await getMoive(movieUrl, options)


function drowInfo(obj) {
    pageTitle.textContent = obj.title
    const leftSideCard = document.createElement('div')
    const rightSideCard = document.createElement('div')
    const allChild = document.createElement('div')
    const img = document.createElement('img')
    const h2 = document.createElement('h2')
    const text = document.createElement('p')
    const genreTitle = document.createElement('h3')
    const genres = obj.genres.map(e => { return e.name })
    const footer = document.createElement('div')
    const relDate = document.createElement('p')
    const vote = document.createElement('p')
    const star = document.createElement('i')
    star.className = "fa-solid fa-star"
    star.style.color ='yellow'
    h2.textContent = obj.title
    text.textContent = obj.overview
    genreTitle.textContent = genres
    img.setAttribute('src', 'https://image.tmdb.org/t/p/original' + obj.poster_path)
    document.body.style.backgroundImage = `url(${'https://image.tmdb.org/t/p/original' + obj.backdrop_path})`
    leftSideCard.append(img)
    leftSideCard.classList.add('leftSideCard')
    rightSideCard.classList.add('rightSideCard')
    allChild.classList.add('allChild')
    relDate.textContent = obj.release_date
    vote.textContent = obj.vote_average
    vote.append(star)
    footer.append(relDate, vote)
    footer.classList.add('footer')
    rightSideCard.append(h2, text, genreTitle, footer)
    allChild.append(leftSideCard, rightSideCard)
    return allChild
}
pageInfo.append(drowInfo(movie))
console.log(movie)