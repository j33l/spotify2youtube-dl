// searchTerms -> YTLink

const ytSearch = require( 'yt-search' )

const searchedLink = (searchTerms) => {
    return new Promise((resolve, reject) => {
        ytSearch(searchTerms, (error, {videos}) => {
            if (error) reject('YTSearch Error!')

            console.log(videos[0])
            resolve(videos[0].url)
        })
    })
}

async function getLink(searchTerms) {
    var link = await searchedLink(searchTerms)
    return link
}

// use example
// getLink('thunder').then((link) => {
//     console.log(link)
// }).catch((error) => {
//     console.log(error)
// })

module.exports = getLink
