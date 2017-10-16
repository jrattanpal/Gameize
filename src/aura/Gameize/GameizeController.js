({
    doInit: function(component, event, helper){
        var Gameize_Helper = component.find('Gameize_Helper');

        //game data from static resource
        helper.fetchGameData(component, helper, Gameize_Helper);

        //User data for Favorite and History
        helper.fetchUserData(component, helper, Gameize_Helper);
    },
    changeTab : function(component, event, helper) {
        var selectedItem = event.currentTarget;
        component.set('v.activeTabNumber', selectedItem.getAttribute('tabindex'));
    },
    handleDataUpdatedEvent: function(component, event, helper){
        //Update Favorite and History data as updated upon add/remove favorite and tracked in history
        var whichData = event.getParam("whichData");
        var data = event.getParam("data");
        if(whichData === 'dataFavorite'){
            component.set('v.dataFavorite', data);
        }else if(whichData == 'dataHistory'){
            component.set('v.dataHistory', data);
        }
    },
    handleShowGameEvent: function(component, event, helper){
        var tabset = component.find('tabset');
        tabset.set('v.selectedTabId', 'tab1');

        /*
        $A.util.addClass(component.find('tab1'), 'slds-active');
        $A.util.removeClass(component.find('tab2'), 'slds-active');
        $A.util.removeClass(component.find('tab3'), 'slds-active');
        */
    }

})