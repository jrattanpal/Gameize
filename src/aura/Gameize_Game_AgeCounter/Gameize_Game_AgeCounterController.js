({
    letsCount: function(component, event, helper){
        var today = new Date()
        var BirthDay = new Date(component.find('age').get('v.value'));
        console.log(BirthDay);
        var timeold = (today.getTime() - BirthDay.getTime());
        var sectimeold = timeold / 1000;
        var secondsold = Math.floor(sectimeold);
        var msPerDay = 24 * 60 * 60 * 1000 ;
        var e_daysold = timeold / msPerDay;
        var daysold = Math.floor(e_daysold);
        var e_hrsold = (e_daysold - daysold)*24;
        var hrsold = Math.floor(e_hrsold);
        var minsold = Math.floor((e_hrsold - hrsold)*60);

        component.find('daysOld').set('v.value', daysold);
        component.find('hoursOld').set('v.value', hrsold);
        component.find('minutesOld').set('v.value', minsold);
    }
})