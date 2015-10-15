app.controller('AlbumListCtrl', function ($scope, $http, $rootScope, StatsFactory, PlayerFactory, AlbumListFactory) {
	$scope.show = false;

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
		console.dir(data)
		if(data.albumId) {
			AlbumListFactory.fetchAlbum(data.albumId)
			.then(function(album) {
				$scope.album = album
			})
		}
			console.dir($scope.album)
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