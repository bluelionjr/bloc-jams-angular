(function() {
    function CollectionCtrl() {
        this.albums = [];
        for (var i = 0; i < 12; i++) {
            // ----------------what does this do?  angular.copy
            // what is a deep copy, what is "source" is source here albumPicasso?
            // if that is the case, why is a copy necessary?  why not just set it = to?
            this.albums.push(angular.copy(albumPicasso));
        }
    }
    
    angular
        .module('blocJams')
        .controller('CollectionCtrl', CollectionCtrl);
})();