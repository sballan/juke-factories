app.controller('AlbumListCtrl', function ($scope, $http, $rootScope, StatsFactory, PlayerFactory) {

	$scope.show = false;


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

	//TODO MAYBE DELETE?
	$scope.$on('songLoad', function (evt, song) {
		$scope.currentSong = song;
	});

	$rootScope.$on('viewSwap', function(evt, data) {
		if(data.album) $scope.album = data.album
		switch(data.type) {
			case 'showAlbumList':
				$scope.show = true;
				break;
			case 'showAlbumsView':
				$scope.show = false;
				break;
			default:
				break;
		}

	})

});