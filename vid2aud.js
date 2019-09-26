// videoFile -> audioFile

var ffmpeg = require('fluent-ffmpeg');

// setting ffmpeg paths using API
// ffmpeg.setFfmpegPath('./ffmpeg-win64/bin/ffmpeg.exe') // Argument path is a string with the full path to the ffmpeg binary.
// ffmpeg.setFfprobePath('./ffmpeg-win64/bin/ffprobe.exe')
// Ffmpeg.setFlvtoolPath('./ffmpeg-win64/bin')

// fluent-ffmpeg stuff
const convert = (input, output) => { // input - string, path input file, output - string, path output file, callback - function(error, result)        
    return new Promise((resolve, reject) => {
        ffmpeg(input)
        .output(output)
        .on('end', () => {                    
            resolve('conversion complete.')
        })
        .on('error', (error) => {
            reject(error)
        })
        .run()
    })
}

module.exports = convert
