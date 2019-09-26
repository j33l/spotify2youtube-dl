// YTLink -> youtubeVidDownload

const youtubedl = require('youtube-dl')
var fs = require('fs')

const ytDL = (YTLink) => {
    return new Promise((resolve, reject) => {

        var video = youtubedl(YTLink, ['-x', '--audio-format', 'mp3'], { cwd: __dirname })
        var vidName

        // Will be called when the download starts.
        video.on('info', (info) => {
            console.log('Download started...')
            console.log('filename: ' + info._filename)
            console.log('VideoSize: ' + (info.size-1000000)/1000000 + ' MB')

            vidName = info._filename
        })

        video.pipe(fs.createWriteStream('myvideo.mp4'));

        video.on('end', () => {
            console.log('Download completes.')
            console.log(vidName)
            resolve(vidName)
        })

        video.on('error', () => {
            reject('Download fails!')
        })
    })
}

module.exports = ytDL
