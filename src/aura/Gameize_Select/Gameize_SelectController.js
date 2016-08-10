({
    handleShowGameEvent: function(component, event, helper){
        var Gameize_Helper = component.find('Gameize_Helper_dialog');
        var SelectedGameId = event.getParam("SelectedGameId");
        //If there is pre selected game then show that game
        if(SelectedGameId >=0 ) {
            var gameList = component.get('v.gameList');
            helper.loadGame(component, helper, Gameize_Helper, gameList, helper.findGameIndexFromId(component, helper, gameList, SelectedGameId));
        }
    },
    gameizeMe: function(component, event, helper){
        var Gameize_Helper = component.find('Gameize_Helper_dialog');        
        var gameList = component.get('v.gameList');
        helper.loadGame(component, helper, Gameize_Helper, gameList, helper.findGameIndexFromId(component, helper, gameList));
    },
    markAsFavorite: function(component, event, helper){
        var Gameize_Helper = component.find('Gameize_Helper_dialog');

        //If game is already marked favorite then set the flag to show proper buttons
        helper.markIfGameAlreadyFavorite(component, helper);

        if(component.get('v.isSelectedGameFavorite') == false){
            var dataFavorite = component.get('v.dataFavorite');
            var gameSelected = component.get('v.gameSelected');
            dataFavorite.push({name: gameSelected.name, cmpname: gameSelected.cmpname, id: gameSelected.id});
            helper.saveFavorite(component, helper, Gameize_Helper, true, dataFavorite);
        }else{
            Gameize_Helper.showToast('message', 'Already in favorite list!', 'You have already added this game in your favorite list');
        }
    },
    removeAsFavorite: function(component, event, helper){
        var Gameize_Helper = component.find('Gameize_Helper_dialog');

        helper.markIfGameAlreadyFavorite(component, helper);
        
        if(component.get('v.isSelectedGameFavorite') == true){
        	var dataFavorite = component.get('v.dataFavorite');
        	var gameSelected = component.get('v.gameSelected');

            for(var i=0; i<dataFavorite.length; i++){
                if(dataFavorite[i].cmpname == gameSelected.cmpname){
                    dataFavorite.splice(i, 1);
                    break;
                }
            }
        
            helper.saveFavorite(component, helper, Gameize_Helper, false, dataFavorite);
        }else{
            Gameize_Helper.showToast('message', 'NOT in Favorite List!', 'Game is not in favorite list.');
        }
    },
    hideModal : function(component, event, helper) {
        helper.hideModal(component, helper);
    }
})