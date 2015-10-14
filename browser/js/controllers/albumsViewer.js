//albumViewer.js
app.controller('AlbumsViewer', function($scope, $http) {
	console.log(Anything)
	$http.get('/api/albums/')
	.then(function (response) {

		var albums = response.data;
		//IMAGES
		albums.forEach(function(album){
			album.imageUrl = '/api/albums/' + album._id + '.image'
		// albums.imageUrl = '/api/albums/' + album._id + '.image';
		})
		console.log("Our albums dirred: ");
		console.dir(albums);

		//something to show ALBUM NAME
		//something to show SONGS

		// var albumArtists = _.indexBy(album.artists, '_id');
		// album.songs.forEach(function (s) {
		// 	s.audioUrl = '/api/songs/' + s._id + '.audio';
		// 	s.artists = s.artists.map(function (artistId) {
		// 		return albumArtists[artistId];
		// 	});
		// });

			$scope.albums = albums;
	})
})