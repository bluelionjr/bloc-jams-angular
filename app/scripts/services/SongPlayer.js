(function() {
    function SongPlayer(Fixtures) {
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
                play(song);
            }
        };
        
        /**
        * @function SongPlayer.next
        * @desc Goes to the next song by increasing the index by one
        */        
        SongPlayer.next = function() {
            var currentSongIndex = getSongIndex(SongPlayer.currentSong);
            currentSongIndex++;
            
            if (currentSongIndex > currentAlbum.songs.length) {
                stopSong(SongPlayer.currentSong);
            } else {
                var song = currentAlbum.songs[currentSongIndex];
                setSong(song);
                play(song);
            }
        };
        
        return SongPlayer;
    }
    
    angular
        .module('blocJams')
        .factory('SongPlayer', ['Fixtures', SongPlayer]);
})();

// Start Mark


//(function(){
//  function SongPlayer(Fixtures) {
//    var SongPlayer = {};
//    var currentAlbum = Fixtures.getAlbum();
//
//    /**
//    * @desc Buzz object audio file
//    * @type {Object}
//    */
//    var currentBuzzObject = null; //sets up currentBuzzObject var
//
//    /**
//    * @function setSong
//    * @desc Stops currently playing song and loads new audio file as currentBuzzObject
//    * @param {object} song
//    */
//    var setSong = function(song) { //private method
//      if (currentBuzzObject) {
//        currentBuzzObject.stop();
//        SongPlayer.currentSong.playing = null;
//      }
//
//      currentBuzzObject = new buzz.sound(song.audioUrl, {
//        formats: ['mp3'],
//        preload: true
//      });
//      SongPlayer.currentSong = song;
//
//    };
//
//    /**
//    * @desc playSong plays current Buzz object
//    @function playSong
//    * @param {object} song
//    */
//    var playSong = function(song){
//      currentBuzzObject.play();
//      song.playing = true;
//    };
//
//    var getSongIndex = function(song) {
//      return currentAlbum.songs.indexOf(song);
//    };
//    //public method
//
//    /**
//    * @desc initialize currentSong var to be null
//    */
//    SongPlayer.currentSong = null; //sets up currentSong public attribute
//
//    SongPlayer.play = function(song) { //object. Question: Can I do this.play = function(song) instead of SongPlayer.play?
//        song = song || SongPlayer.currentSong;
//        if (SongPlayer.currentSong !== song) { //if currently playing song is not the song that is chosen
//            setSong(song);
//            playSong(song);
//        } else if (SongPlayer.currentSong === song) { //else if we are hovering on song #2 and clicks song#2 (2 possibility: is song#2 playing? is song#2 paused?)
//          if (currentBuzzObject.isPaused()) { //if it is paused, then play it
//            playSong(song);
//          }
//        }
//    };
//
//    //public method
//    SongPlayer.pause = function(song) {
//      song = song || SongPlayer.currentSong;
//      currentBuzzObject.pause();
//      song.playing = false;
//    }
//
//    SongPlayer.previous = function(){
//      var currentSongIndex = getSongIndex(SongPlayer.currentSong);
//      currentSongIndex--;
//
//      if (currentSongIndex < 0) {
//        currentBuzzObject.stop();
//        SongPlayer.currentSong.playing = null;
//      } else {
//        var song = currentAlbum.songs[currentSongIndex];
//        setSong(song);
//        playSong(song);
//      }
//    };
//
//    return SongPlayer;
//  }
//
//  angular
//    .module('blocJams')
//    .factory('SongPlayer', SongPlayer);
//})();