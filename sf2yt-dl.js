/* SpotifySongLink -> songData -> youtubeSearch -> YTVideoLink ->  youtubeVidDownload -> vid2audConversion -> removingVideoFile
*/

const fs = require('fs')
const { getPreview } = require('spotify-url-info')
const searchedLink = require('./YTSearch')
const ytDL = require('./YT-dl')
const convert = require('./vid2aud')

// const songLink = 'https://open.spotify.com/track/7dt6x5M1jzdTEt8oCbisTK'
// const plLink = 'https://open.spotify.com/playlist/37i9dQZF1DX1HUbZS4LEyL'

arg = process.argv[2]

// downloading via spotify song link
const dlFromSFLink = async () => {
  const sfSongData = await getPreview(arg) // getting spotify song data
  const searchString = sfSongData.title + ' ' + sfSongData.artist + ' song' // search string for YTSearch
  const YTLink = await searchedLink(searchString) // searching fro song in YT
  const vidDL = await ytDL(YTLink) // downloading YT video
  const vid2aud = await convert('./myvideo.mp4', './' + searchString + '.mp3') // converting video into audio
  console.log(vid2aud)
  removeFile('./myvideo.mp4')
}

// downloading via youtube link
const dlFromYTLink = async () => {
  const vidDL = await ytDL(arg) // downloading YT video
  const vid2aud = await convert('./myvideo.mp4', './' + vidDL + '.mp3') // converting video into audio
  console.log(vid2aud)
  removeFile('./myvideo.mp4')
}

// download via search in youtube
const dlFromYTSearch = async () => {
  const YTLink = await searchedLink(arg) // searching fro song in YT
  const vidDL = await ytDL(YTLink) // downloading YT video
  const vid2aud = await convert('./myvideo.mp4', './' + arg + '.mp3') // converting video into audio
  console.log(vid2aud)
  removeFile('./myvideo.mp4')
}

// removing video file
const removeFile = (filePath) => {
  fs.unlink(filePath, (error) => {
    if (error) console.log('Error: Can not clean Trash!')
    console.log('Trash cleaned.')
  })  
}

// checking user input
if(!arg) {
  console.log('No input provided!')
} else if(arg.includes('spotify.com')) { // regular expression matching
  console.log('Download via Spotify Link...')
  dlFromSFLink()
} else if(arg.includes('youtube.com')) {
  console.log('Download via YouTube Link...')
  dlFromYTLink()
} else {
  console.log('Searching...')
  dlFromYTSearch()
}
