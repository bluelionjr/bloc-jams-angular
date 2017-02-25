(function() {
    function AlbumCtrl() {
        this.albumData = angular.copy(albumPicasso);
    }
    
    angular
        .module('blocJams')
        .controller('AlbumCtrl', AlbumCtrl);
})();

// just for clarification 'AlbumCtrl' is the name of the controller and AlbumCtrl is calling it in .controller('AlbumCtrl', AlbumCtrl) on line 8  ?????