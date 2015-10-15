app.factory('AlbumListFactory', function($http, $rootScope, StatsFactory) {

	var data = {
		fetchAlbum: function(albumId) {
			var album = null;
			var promise = $http.get('/api/albums/' + albumId)
			.then(function(response) {
				album = response.data;
				album.imageUrl = '/api/albums/' + albumId + '.image';
				var albumArtists = _.indexBy(album.artists, '_id');
				album.songs.forEach(function (s) {
					s.audioUrl = '/api/songs/' + s._id + '.audio';
					s.artists = s.artists.map(function (artistId) {
						return albumArtists[artistId];
					});
				});
				currentAlbum = album;
				StatsFactory.totalTime(album)
				.then(function(albumDuration) {
					album.duration = Math.floor(albumDuration / 60) + " min";
				})
				return album
			});
			return promise
		}
	}
	return data;
})