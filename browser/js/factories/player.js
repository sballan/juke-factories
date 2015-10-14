app.factory('PlayerFactory', function ($rootScope) {
	var audio = document.createElement('audio');
	var currentSong = null;
	var progress;
	var songs;


	audio.addEventListener('timeupdate', function () {
		$rootScope.$apply(function() {
			data.setProgress(100 * audio.currentTime / audio.duration)
		})
	});

	audio.addEventListener('ended', function () {
		$rootScope.$apply(function() {
			data.next();
		})
	});

	function moveTo (index){
		console.dir(songs);
		console.log("index is:", index)
		index += songs.length;
		index %= songs.length;
		data.start({song: songs[index]});

	}

	function load (song) {
		audio.src = song.audioUrl;
		audio.load();
		data.setCurrentSong(song);
		progress = 0;
	}

	var data = {
		start: function (obj) {
			if(obj.hasOwnProperty('audioUrl')) {
				var temp = {song: obj};
				obj = temp;
			}
			if (currentSong == obj.song){
				this.play();
				return;
			}
			this.pause()
			console.log("obj song is:", obj.song)
			load(obj.song)
			this.play();
			if(!songs) songs = obj.album.songs
		},
		play: function() {
			audio.play()
			this.isPlaying = true;
		},
		pause: function() {
			audio.pause();
			this.isPlaying = false;
		},
		resume: function() {
			this.play();
		},
		isPlaying: false,
		getCurrentSong: function() { return currentSong },
		setCurrentSong: function(song) {
			currentSong = song;
		},
		next: function() {
			var index = songs.indexOf(currentSong)
			moveTo(index+1);
		},
		previous: function() {
			var index = songs.indexOf(currentSong)
			moveTo(index-1);
		},
		getProgress: function() { return progress; },
		setProgress: function(num) { progress = num },
		getAudio: function() { return audio }
	};

	return data
});