var Spotify = require('node-spotify-api');

console.log('this is loaded');

exports.twitterKeys = {
  consumer_key: 'hd6kAfGhoIzENFjb8NkCenAdZ',
  consumer_secret: 'uLIxvEYBkvSklNde5f9RJv18NGgbAoVhyrQhdz0bYlEezQQW93',
  access_token_key: '563874226-8ZDDKbtZvVgjkxH4Ofutt6yJ2gQIUIJQZ0fDdlBx',
  access_token_secret: '94TNsaaUZCRafNQRBOJFjc9v0TwDscByCJIpcCGqpe1TE',
}


var spotify = new Spotify({
  id: '3b00b6be2c3c473eb2d6c64eac8879b5',
  secret: '17040557e79b41caa02c64fd683fc56b'
});

exports.spotify = spotify;


