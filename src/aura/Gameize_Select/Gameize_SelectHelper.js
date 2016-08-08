({
    markIfGameAlreadyFavorite: function(component, helper){
        var dataFavorite = component.get('v.dataFavorite');
        var gameSelected = component.get('v.gameSelected');

        for(var i=0; i<dataFavorite.length; i++){
            if(dataFavorite[i].cmpname == gameSelected.cmpname){
                component.set('v.isSelectedGameFavorite', true);
                return true;
            }
        }
        return false;
    },
    findGameIndexFromId: function(component, helper, gameList, preGameSelectedId){
        if(typeof(preGameSelectedId) != 'undefined') {
            for (var i = 0; i < gameList.length; i++) {
                if (gameList[i].id == preGameSelectedId) {
                    return i;
                }
            }
        }
        return Math.floor(Math.random()*gameList.length);
    },
    loadGame: function(component, helper, gameList, gameSelectedIndex){
        var Gameize_Helper = component.find('Gameize_Helper');
        var gameSelected = gameList[gameSelectedIndex];
        component.set('v.gameSelected', gameSelected);

        helper.markIfGameAlreadyFavorite(component, helper);

        if(typeof(gameSelected) != undefined) {
            $A.createComponent(
                "gameize:Gameize_Game_"+gameSelected.cmpname,
                {
                    "aura:id": gameSelected.auraid,
                },
                function(content){
                    var container = component.find('gameContainer');
                    //Add the new button to the body array
                    if (component.isValid()) {
                        var body = container.get("v.body");
                        body.splice(0, 1);
                        body.push(content);
                        container.set("v.body", body);
                        helper.saveInHistory(component, helper, gameSelected);
                    }else{
                        Gameize_Helper.showToast('error', 'Error!', 'Some error occurred while selecting a game');
                    }
                }
            );

            //Toggle CSS styles for opening Modal
            helper.toggleClass(component,'backdrop','slds-backdrop--');
            helper.toggleClass(component,'modaldialog','slds-fade-in-');
        }else{
            Gameize_Helper.showToast('error', 'Error!', 'Some error occurred while selecting a game');
        }
    },
    toSFDate: function(helper, dateObj){
	// string format is YYYY-MM-DDThh:mm:ssZ           
		var dateStr = dateObj.getFullYear() +'-' + helper.pad2(dateObj.getMonth()+1) +'-'+
            					helper.pad2(dateObj.getDate()) +'T'+helper.pad2(dateObj.getHours())+':'+
            					helper.pad2(dateObj.getMinutes())+':'+helper.pad2(dateObj.getSeconds())+'Z';
		return dateStr;
    },
    pad2: function (number) {
	 return (number < 10 ? '0' : '') + number       
	},
    saveInHistory: function(component, helper, gameSelected){
        var dataHistory = component.get('v.dataHistory');
        var maxHistoryItems = component.get('v.maxHistoryItems');

        //Remove oldest item
        if(dataHistory.length >= maxHistoryItems){
            dataHistory.splice(0, 1);
        }
        //Add newest entry to history
        dataHistory.push({name: gameSelected.name, cmpname: gameSelected.cmpname, datePlayed: Date(), id: gameSelected.id});


        var apexBridge = component.find("ApexBridge");
        apexBridge.callApex({
            component: component,
            data: {
                operation: "GameizeController",
                input: {mode: 'saveData', fieldName:'dataHistory__c', fieldData: JSON.stringify(dataHistory)},
                debug: component.get('v.debug')
            },
            callBackMethod: function (data) {
                if (data.outputFlag == true) {
                    helper.raiseEventDataUpdated(component, 'dataHistory', dataHistory);
                }
            }
        });
    },
    saveFavorite: function(component, helper, Gameize_Helper, isItBeingAdded, dataFavorite){
        var apexBridge = component.find("ApexBridge");
        apexBridge.callApex({
            component: component,
            data: {
                operation: "GameizeController",
                input: {mode: 'saveData', fieldName:'dataFavorite__c', fieldData: JSON.stringify(dataFavorite)},
                debug: component.get('v.debug')
            },
            callBackMethod: function (data) {
                if(isItBeingAdded == true) {
                    if (data.outputFlag == true) {
                        component.set('v.isSelectedGameFavorite', true);
                        helper.raiseEventDataUpdated(component, 'dataFavorite', dataFavorite);
                        Gameize_Helper.showToast('success', 'Added!', 'Game was successfully marked as favorite!');
                    } else {
                        Gameize_Helper.showToast('error', 'Error!', 'Some error occurred while marking game as favorite.');
                    }
                }else{
                    if (data.outputFlag == true) {
                        component.set('v.isSelectedGameFavorite', false);
                        helper.raiseEventDataUpdated(component, 'dataFavorite', dataFavorite);
                        Gameize_Helper.showToast('success', 'Removed!', 'Game was successfully removed from favorite!');
                    } else {
                        Gameize_Helper.showToast('error', 'Error!', 'Some error occurred while removing game from favorite.');
                    }
                }
            }
        });
    },
    raiseEventDataUpdated: function(component, whichData, data){
        var cmpEvent = component.getEvent("Gameize_DataUpdated");
        cmpEvent.setParams({"whichData" : whichData, "data": data});
        cmpEvent.fire();
    },
    toggleClass: function(component,componentId,className) {
        var modal = component.find(componentId);
        $A.util.removeClass(modal,className+'hide');
        $A.util.addClass(modal,className+'open');
    },

    toggleClassInverse: function(component,componentId,className) {
        var modal = component.find(componentId);
        $A.util.addClass(modal,className+'hide');
        $A.util.removeClass(modal,className+'open');
    }
})