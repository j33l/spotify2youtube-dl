// searchTerms -> YTLink

const ytSearch = require( 'yt-search' )

const searchedLink = (searchTerms) => {
    return new Promise((resolve, reject) => {
        ytSearch(searchTerms, (error, {videos}) => {
            if (error) reject('YTSearch Error!')

            console.log(videos[0])
            resolve('https://www.youtube.com' + videos[0].url)
        })
    })
}

module.exports = searchedLink
