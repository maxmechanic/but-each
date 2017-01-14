const { parse: parseQuery } = require('querystring')
const { parse: parseUrl } = require('url')

function adjustVideo(id) {
  chrome.storage.sync.get('videos', ({ videos = {} }) => {
    const vid = document.querySelector('video')
    if (!vid) return

    if (videos[id]) {
      const rate = videos[id]

      vid.playbackRate = rate
      chrome.storage.sync.set({
        videos: Object.assign(videos, { [id]: rate + 1 })
      })
    } else {

      vid.playbackRate = 1
      chrome.storage.sync.set({
        videos: Object.assign(videos, { [id]: 2 })
      })
    }
  })
}

let oldId = ''
function checkQuery() {
  const { query } = parseUrl(window.location.href)
  const { v: id } = parseQuery(query)

  if (id !== oldId) adjustVideo(id)

  oldId = id
}

checkQuery()
setInterval(checkQuery, 1000)
