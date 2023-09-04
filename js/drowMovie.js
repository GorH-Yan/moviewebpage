export function drowMovie(obj) {
    const card = document.createElement('div')
    const cardImage = document.createElement('img')
    const cardTitle = document.createElement('h2')
    const cardInfo = document.createElement('div')
    const year = document.createElement('p')
    const rate = document.createElement('p')
    const star = document.createElement('i')
    star.className = "fa-solid fa-star"
    star.style.color = 'yellow'
    cardImage.dataset.id = obj.id
    cardImage.setAttribute('src', 'https://image.tmdb.org/t/p/original' + obj.poster_path)
    cardTitle.textContent = obj.title
    year.textContent = 'Release Date ' + obj.release_date
    rate.textContent = 'Rating ' + obj.vote_average + ' '
    rate.append(star)
    cardInfo.append(year, rate)
    card.append(cardImage, cardTitle, cardInfo)
    card.classList.add('cardStyle')
    return card
}