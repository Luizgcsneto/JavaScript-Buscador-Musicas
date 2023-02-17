const form = document.querySelector('#form')
const searchInput = document.querySelector('#search')
const songContainer = document.querySelector('#songs-container')
const prevAndNextContainer = document.querySelector('#prev-and-next-container')

const apiUrl = `https://api.lyrics.ovh`

const getMoreSong = async url => {
    debugger
    const response = await fetch(`http://cors-anywhere.herokuapp.com/${url}`)
    console.log(response)
    const data = await response.json()

    insertSongsInfoPage(data)
}

insertSongsInfoPage = songsInfo => {
    songContainer.innerHTML = songsInfo.data.map(song => 
        `
        <li class="song">
            <span class="song-artist"><strong>${song.artist.name}</strong>- ${song.title}</span>
            <button class="btn" data-artist="${song.artist.name}" data-song-title="${song.title}">ver letra</button>
        </li>
        `).join('')

        if (songsInfo.prev || songsInfo.next){
            prevAndNextContainer.innerHTML = `
            ${songsInfo.prev ? `<button class="btn" onClick="getMoreSong('${songsInfo.prev}')">Anteriores</button>` : '' }
            ${songsInfo.next ? `<button class="btn" onClick="getMoreSong('${songsInfo.next}')">Próximas</button>` : '' }
            `
            return
        }

        prevAndNextContainer.innerHTML = ''
}

const fetchSongs = async term => {
    const response = await fetch(`${apiUrl}/suggest/${term}`)
    const data = await response.json()

    insertSongsInfoPage(data)
}

form.addEventListener('submit', event => {
    event.preventDefault()

    const searchTerm =  searchInput.value.trim()

    if (!searchTerm){
        songContainer.innerHTML = `<li class="warning-message">Por favor digite um termo válido</li>`
        return
    }

    fetchSongs(searchTerm)

})