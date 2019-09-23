/* SpotifySongLink -> songData -> youyubeSearch -> youtubeVidDownload -> vid2audConversion -> removingVideoFile
*/

const fs = require('fs')
var { getPreview } = require("spotify-url-info");
const getLink = require('./YTSearch')
const dlVid = require('./YT-dl')
const vid2aud = require('./vid2aud')

// var searchTerms = 'thunder'
var searchString

if(!process.argv[2]) {
  console.log('No Link provided!')
}

getPreview(process.argv[2]).then((songData) => { // getting spotify song data
  console.log(songData)
  searchString = songData.title + ' ' + songData.artist + ' song'  
  return getLink(searchString) // serching videon on YT
}).then((link) => {
  return dlVid(link) // downloading video from YT
}).then((result) => {
  console.log(result)
  return vid2aud('./myvideo.mp4', './' +searchString + '.mp3') // converting video into audio
}).then((result) => {
  console.log(result)

  // removing video file
  fs.unlink('./myvideo.mp4', (error) => {
    if (error) console.log('Error: Can not clean Trash!')
    console.log('Trash cleaned.')
  })
}).catch((error) => {
  console.log(error) // occured error at any place
})
