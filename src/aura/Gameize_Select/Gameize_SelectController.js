({
    handleShowGameEvent: function(component, event, helper){
        var SelectedGameId = event.getParam("SelectedGameId");
        //If there is pre selected game then show that game
        if(SelectedGameId >=0 ) {
            var gameList = component.get('v.gameList');
            helper.loadGame(component, helper, gameList, helper.findGameIndexFromId(component, helper, gameList, SelectedGameId));
        }
    },
    gameizeMe: function(component, event, helper){
        var Gameize_Helper = component.find('Gameize_Helper_dialog');        
        Gameize_Helper.hideToast();
        
        var gameList = component.get('v.gameList');
        helper.loadGame(component, helper, gameList, helper.findGameIndexFromId(component, helper, gameList));
    },
    markAsFavorite: function(component, event, helper){
        var Gameize_Helper = component.find('Gameize_Helper_dialog');

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
        
        var dataFavorite = component.get('v.dataFavorite');
        var gameSelected = component.get('v.gameSelected');

        var wasRemoved = false;
        for(var i=0; i<dataFavorite.length; i++){
            if(dataFavorite[i].cmpname == gameSelected.cmpname){
                dataFavorite.splice(i, 1);
                wasRemoved = true;
                break;
            }
        }

        if(wasRemoved == true){
            helper.saveFavorite(component, helper, Gameize_Helper, false, dataFavorite);
        }else{
            Gameize_Helper.showToast('message', 'NOT in Favorite List!', 'Game is not in favorite list.');
        }
    },
    hideModal : function(component, event, helper) {
        //Toggle CSS styles for hiding Modal
        helper.toggleClassInverse(component,'backdrop','slds-backdrop--');
        helper.toggleClassInverse(component,'modaldialog','slds-fade-in-');
    }
})