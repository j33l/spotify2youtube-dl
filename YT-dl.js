// YTLink -> youtubeVidDownload

const youtubedl = require('youtube-dl')
var fs = require('fs')

const ytDL = (link) => {
    return new Promise((resolve, reject) => {
        var YTLink = 'https://www.youtube.com' + link

        var video = youtubedl(YTLink, ['-x', '--audio-format', 'mp3'], { cwd: __dirname })

        // Will be called when the download starts.
        video.on('info', (info) => {
            console.log('Download started...')
            console.log('filename: ' + info._filename)
            console.log('VideoSize: ' + (info.size-1000000)/1000000 + ' MB')
        })

        video.pipe(fs.createWriteStream('myvideo.mp4'));

        video.on('end', () => {
            resolve('Download completes.')
        })

        video.on('error', () => {
            reject('Download fails!')
        })
    })
}

async function dlVid(link) {
    const message = ytDL(link)
    return message
}

// use example
// dlVid('/watch?v=fKopy74weus').then((result) => {
//     console.log(result)
// }).catch((error) => {
//     console.log(error)
// })

module.exports = dlVid
