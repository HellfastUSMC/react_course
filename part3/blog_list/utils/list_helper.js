var lodash = require('lodash');

const dummy = (blogs) => {
    return 1
  }

const totalLikes = (blogs) => {
    total_likes = 0

    for (let entry of blogs) {
        total_likes += entry.likes
    }

    return total_likes
}

const mostBlogs = (blogs) => {
    const maxPosts = lodash(blogs).countBy('author').map((value, key) => { return {author: key, blogs: value}}).orderBy('blogs', 'desc')
    return maxPosts.first()
}

const mostLikes = (blogs) => {
    const maxLikes = lodash(blogs).groupBy('author').map((value, key) => { return {author: key, likes: lodash(value).sumBy('likes')}}).orderBy('likes', 'desc')
    return maxLikes.first()
}

  module.exports = {
    dummy,
    totalLikes,
    mostBlogs,
    mostLikes
  }