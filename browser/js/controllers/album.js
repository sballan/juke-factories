app.controller('AlbumCtrl', function ($scope, $http, $rootScope, StatsFactory, PlayerFactory) {

	$http.get('/api/albums/561ea20a85bb44629dac8e04')
	.then(function (response) {
		var album = response.data;
		album.imageUrl = '/api/albums/' + album._id + '.image';
		var albumArtists = _.indexBy(album.artists, '_id');
		album.songs.forEach(function (s) {
			s.audioUrl = '/api/songs/' + s._id + '.audio';
			s.artists = s.artists.map(function (artistId) {
				return albumArtists[artistId];
			});
		});
		$scope.album = album;

		StatsFactory.totalTime(album)
		.then(function(albumDuration) {
			$scope.album.duration = Math.floor(albumDuration / 60) + " min";
			console.log("Total Duraction is ", $scope.albumDuration)
		})
	});

	$scope.start = function (s) {
		obj = {}
		obj.song = s
		obj.album = $scope.album
		PlayerFactory.start(obj)
	}

	$scope.isPlaying = function() {
		return PlayerFactory.isPlaying;
	}

	$scope.currentSong = function() {
		return PlayerFactory.getCurrentSong();
	}


	$scope.$on('songLoad', function (evt, song) {
		$scope.currentSong = song;
	});

});