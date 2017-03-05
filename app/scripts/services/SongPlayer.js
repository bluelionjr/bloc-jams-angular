(function() {
    function SongPlayer($rootScope, Fixtures) {
        var SongPlayer = {};
        
        // Private attributes
        /**
        * @desc the list of songs on the album
        * @type {Object}
        */
        var currentAlbum = Fixtures.getAlbum(); 
        

        /**
        * @desc Buzz object audio file
        * @type {Object}
        */
        var currentBuzzObject = null;
        
        // Private functions
        /**
        * @function setSong
        * @desc Stops currently playing song and loads new audio file as currentBuzzObject
        * @param {Object} song
        */
        var setSong = function(song) {
            if (currentBuzzObject) {
                currentBuzzObject.stop();
                SongPlayer.currentSong.playing = null;
            }
            
            currentBuzzObject = new buzz.sound(song.audioUrl, {
                formats: ['mp3'],
                preload: true
            });
            
            currentBuzzObject.bind('timeupdate', function() {
                $rootScope.$apply(function() {
                    SongPlayer.currentTime = currentBuzzObject.getTime();
                });
            });
            
            currentBuzzObject.bind('ended', function(event) {
                SongPlayer.next();
            });
            
            // Why doesn't this work:
//            if (currentBuzzObject.ended) {
//                SongPlaer.next();
//            };
            
            
            SongPlayer.currentSong = song;
        };
        
        /**
        * @function playSong
        * @desc Plays the loaded currentBuzzObject, private function
        * @param {Object} song
        */
        var playSong = function(song) {
            currentBuzzObject.play();
            song.playing = true;
            SongPlayer.muted = false;
        };
        
        /**
        * @function stopSong
        * @desc stops playing the song
        * @param {Object} song
        */
        var stopSong = function(song) {
            currentBuzzObject.stop();
            song.playing = null;
        };
        
        /**
        * @function getSongIndex
        * @desc Retrieves the index of the song
        * @param {Object} song
        */
        var getSongIndex = function(song) {
            return currentAlbum.songs.indexOf(song);
        };
        
        // Public attribute
        /**
        * @desc Current song variable
        * @type {Object}
        */
        SongPlayer.currentSong = null;
        
        /**
        * @desc Current playback time (in seconds) of currently playing song
        * @type {Number}
        */
        SongPlayer.currentTime = null;
        /**
        * @desc Sets initial volume to 80
        * @type {Number}
        */
        SongPlayer.volume = 80;
        
        /**
        * @desc tracks if the player is muted
        * @type {Boolean}
        */
        SongPlayer.muted = false;
        
        // Public methods
        /**
        * @function SongPlayer.play - public method of the SongPlayer service
        * @desc Uses the private setSong and playSong methods to play music one at a time
        * @param {Object} song
        */
        SongPlayer.play = function(song) {
            song = song || SongPlayer.currentSong;
            if (SongPlayer.currentSong !== song) {
                setSong(song);
                playSong(song);
            } 
            
            else if (SongPlayer.currentSong === song) {
                if (currentBuzzObject.isPaused()) {
                    currentBuzzObject.play();
                }
            }
        };
        
        /**
        * @function SongPlayer.pause - public method of the SongPlayer service
        * @desc Pauses the currently playing song, stets song.playing to false
        * @param {Object} song
        */
        SongPlayer.pause = function(song) {
            song = song || SongPlayer.currentSong;
            currentBuzzObject.pause();
            song.playing = false;
        };
        
        /**
        * @function SongPlayer.previous
        * @desc Goes to the previous song by reducing the index by one, if on first song stops music
        */        
        SongPlayer.previous = function() {
            var currentSongIndex = getSongIndex(SongPlayer.currentSong);
            currentSongIndex--;
            
            if (currentSongIndex < 0) {
                stopSong(SongPlayer.currentSong);
            } else {
                var song = currentAlbum.songs[currentSongIndex];
                setSong(song);
                playSong(song);
            }
        };
        
        /**
        * @function SongPlayer.next
        * @desc Goes to the next song by increasing the index by one
        */        
        SongPlayer.next = function() {
            var currentSongIndex = getSongIndex(SongPlayer.currentSong);
            currentSongIndex++;
            
            if (currentSongIndex >= currentAlbum.songs.length) {
                stopSong(SongPlayer.currentSong);
            } else {
                var song = currentAlbum.songs[currentSongIndex];
                setSong(song);
                playSong(song);
            }
        };
        
        
        /**
        * @function setCurrentTime
        * @desc Set current time (in seconds) of currently playing song
        * @param {Number} time
        */
        SongPlayer.setCurrentTime = function(time) {
            if (currentBuzzObject) {
                currentBuzzObject.setTime(time);
            }
        };
        
        /**
        * @function setVolume
        * @desc set the volume
        * @param {Number} volume
        */
        SongPlayer.setVolume = function(volume) {
            if (currentBuzzObject) {
                currentBuzzObject.setVolume(volume);
            }
            
        };
        
        /**
        * @function toggleMute
        * @desc mutes or unmutes current playing song
        */
        
        SongPlayer.toggleMute = function() {
            if (currentBuzzObject) {
                if(!currentBuzzObject.isMuted()) {
                    currentBuzzObject.mute();
                    SongPlayer.muted = true;
                } else {
                    currentBuzzObject.unmute();
                    SongPlayer.muted = false;
                }
            }
        }
        
        
        
        return SongPlayer;
    }
    
    angular
        .module('blocJams')
        .factory('SongPlayer', ['$rootScope', 'Fixtures', SongPlayer]);
})();