({
	onPress : function(component, event, helper) {
        var selected = event.currentTarget;
		var appEvent = $A.get("e.c:Gameize_ShowGame");
		appEvent.setParams({"SelectedGameId" : selected.getAttribute('data-id')});
        appEvent.fire();
	}
})