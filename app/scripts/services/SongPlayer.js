(function() {
    function SongPlayer() {
        var SongPlayer = {};
        
        // Private attributes
        /**
        * @desc Current song variable
        * @type {Object}
        */
        var currentSong = null;
        
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
                currentSong.playing = null;
            }
            
            currentBuzzObject = new buzz.sound(song.audioUrl, {
                formats: ['mp3'],
                preload: true
            });
            
            currentSong = song;
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
        
        
        // Public methods
        /**
        * @function SongPlayer.play - public method of the SongPlayer service
        * @desc Uses the private setSong and playSong methods to play music one at a time
        * @param {Object} song
        */
        SongPlayer.play = function(song) {
            if (currentSong !== song) {
                
                setSong(song);
                playSong(song);
            } 
            
            else if (currentSong === song) {
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
            currentBuzzObject.pause();
            song.playing = false;
        };
        
        return SongPlayer;
    }
    
    angular
        .module('blocJams')
        .factory('SongPlayer', SongPlayer);
})();

