import { getTrailer } from "./getData.js"
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

export async function drowInfo(obj, showInfo) {
    const txt = document.createElement('p')
    const infoCard = document.createElement('div')
    const title = document.createElement('h2')
    const relDate = document.createElement('p')
    const rateInfo = document.createElement('span')
    const infoCardImg = document.createElement('img')
    const star = document.createElement('i')
    const trailer = document.createElement('iframe')
    const rightInfo = document.createElement('div')
    txt.classList.add('showInfoText')
    showInfo.style.backgroundImage = `url(${'https://image.tmdb.org/t/p/original' + obj.backdrop_path})`
    showInfo.style.transform = 'translateY(0)'
    txt.textContent = obj.overview
    blackBack.style.display = 'block'
    rightInfo.classList.add('rightInfo')
    star.className = "fa-solid fa-star"
    star.style.color = 'yellow'
    infoCardImg.setAttribute('src', 'https://image.tmdb.org/t/p/original' + obj.poster_path)
    trailer.setAttribute('src', `https://www.youtube.com/embed/${await getTrailer(obj.id)}`)
    title.textContent = obj.title
    relDate.textContent = obj.release_date
    rateInfo.textContent = obj.vote_average + ' '
    rateInfo.append(star)
    infoCard.append(infoCardImg, title, relDate, rateInfo)
    infoCard.classList.add('infoCard')
    rightInfo.append(txt)
    rightInfo.append(trailer)
    showInfo.append(infoCard, rightInfo)
}