({
    doInit: function(component, event, helper){
        var gameList = array();
        gameList['agecounter'] = {'name': 'Age Coounter', 'cmp': 'GameAgeCounter'};
        component.set('v.gamelist', gameList);
    },
    changeTab : function(component, event, helper) {
        var selectedItem = event.currentTarget;
        component.set('v.activeTabNumber', selectedItem.getAttribute('tabindex'));
    }
})