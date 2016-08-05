({
    gameizeme: function(component, event, helper){
        var gameList = component.get('v.gameList');
        var item = gameList[Math.floor(Math.random()*gameList.length)];

        console.log(item);
    }
})