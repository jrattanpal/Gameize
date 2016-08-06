({
	onPress : function(component, event, helper) {
		var appEvent = $A.get("e.c:Gameize_ShowGame");
		appEvent.setParams({"SelectedGameId" : 1});
        console.log('Fired');
        appEvent.fire();
	}
})