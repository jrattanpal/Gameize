({
    doInit: function(component, event, helper){
        /*
        var words = component.get('v.words');
        var alpha = component.get('v.alpha');
        var bravo = component.get('v.bravo');
        var running = component.get('v.running');
        var failnum = component.get('v.failnum');
        var advising = component.get('v.advising');
        var index = component.get('v.index');
        var score = component.get('v.score');
        var alpha_index = component.get('v.alpha_index');
        var bravo_index = component.get('v.bravo_index');
        */
        
        var words = new Array("","acrimonious","allegiance","ameliorate","annihilate","antiseptic","articulate","authoritative","benefactor","boisterous","breakthrough","carcinogenic","censorious","chivalrous","collarbone","commendable","compendium","comprehensive","conclusive","conscientious","considerate","deferential","denouement","determinate","diffidence","disruption","earthenware","elliptical","entanglement","escutcheon","extinguish","extradition","fastidious","flamboyant","forethought","forthright","gregarious","handmaiden","honeysuckle","hypocritical","illustrious","infallible","lumberjack","mischievous","mollycoddle","nimbleness","nonplussed","obliterate","obsequious","obstreperous","opalescent","ostensible","pandemonium","paraphernalia","pawnbroker","pedestrian","peremptory","perfunctory","pernicious","perpetrate","personable","pickpocket","poltergeist","precipitous","predicament","preposterous","presumptuous","prevaricate","propensity","provisional","pugnacious","ramshackle","rattlesnake","reciprocate","recrimination","redoubtable","relinquish","remonstrate","repository","reprehensible","resolution","resplendent","restitution","retaliation","retribution","saccharine","salubrious","skulduggery","skyscraper","soothsayer","tearjerker","transcribe","turpentine","unassuming","underscore","undertaker","underwrite","unobtrusive","vernacular","waterfront","watertight");
        component.set('v.words', words);

        var alpha = new Array();
        component.set('v.alpha', alpha);

        var bravo = new Array();
        component.set('v.bravo', bravo);
    },
	go : function(component, event, helper) {
        helper.newWord(component, helper);
    },
    seek: function(component, event, helper){
        var selected = event.currentTarget;
        var letter = selected.getAttribute('data-letter');
        helper.seek(component, helper, letter)
    }
})