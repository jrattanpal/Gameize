({
	newWord : function(component, helper) {
        var words = component.get('v.words');
        var running = component.get('v.running');
        var failnum = component.get('v.failnum');
        var advising = component.get('v.advising');
        var alpha = component.get('v.alpha');
        var alpha_index = component.get('v.alpha_index');
        var bravo_index = component.get('v.bravo_index');
        var bravo = component.get('v.bravo');
        
        if(!running){
            running=1;
            failnum=0;
            component.find('lives').set('v.value', failnum);
            component.find('tried').set('v.value', '');
            component.find('word').set('v.value', '');
              
            var index=Math.round(Math.random()*10000) % 100;
            component.set('v.index', index);
            
            //console.log('words[index]: '+ words[index]);
            alpha[0]=words[index].charAt(0);
            alpha[1]=words[index].charAt(words[index].length-1);
            alpha_index=1;
            bravo[0]=words[index].charAt(0);
            bravo[1]=words[index].charAt(words[index].length-1);
            bravo_index=1;
            
            component.set('v.alpha', alpha);
            component.set('v.alpha_index', alpha_index);
            component.set('v.bravo', bravo);
            component.set('v.bravo_index', bravo_index);
            component.set('v.running', running);
            
            helper.pick(component, helper, index);
        }else{
            helper.advise(component, helper, "A word is already in play!");
        }		
	},
    pick: function(component, helper, index){
        var words = component.get('v.words');
        var running = component.get('v.running');
        var alpha = component.get('v.alpha');
        var alpha_index = component.get('v.alpha_index');
        var score = component.get('v.score');
        
        var choice="";
        var blank=0;
        
        for (var i=0; i<words[index].length; i++){
            var t=0;
            for(var j=0; j<=alpha_index; j++){
                if(words[index].charAt(i)==alpha[j] || words[index].charAt(i)==alpha[j].toLowerCase()) t=1;
            }
            if (t){
                choice+=words[index].charAt(i)+" ";
            }else{
                choice+="_ ";
                blank=1;
            }
        }   
        component.find('word').set('v.value', choice);
        
        if (!blank)
        {
        	component.find('tried').set('v.value', "   === You Win! ===");
            score++;
        	component.find('score').set('v.value', score);
            component.set('v.score', score);
            component.set('v.running', 0);
        }
    },
    seek: function(component, helper, letter){
        
        var words = component.get('v.words');
        var running = component.get('v.running');
        var alpha = component.get('v.alpha');
        var alpha_index = component.get('v.alpha_index');
        var bravo = component.get('v.bravo');
        var bravo_index = component.get('v.bravo_index');
        var failnum = component.get('v.failnum');
        var index = component.get('v.index');
        
        var score = component.find('score').get('v.value');
        
        if (!running){
            helper.advise(component, helper, ".....Click GO to start !");  
        }else{
    		var t=0;
            for (var i=0; i<=bravo_index; i++){
                if (bravo[i]==letter || bravo[i]==letter.toLowerCase()){
                    t=1;
                }
            }
            if (!t) {
                component.find('tried').set('v.value', component.find('tried').get('v.value') + letter + " ");
                bravo_index++;
                bravo[bravo_index]=letter;
	    
                for(var i=0;i<words[index].length;i++){
                    if(words[index].charAt(i)==letter || words[index].charAt(i)==letter.toLowerCase()){
                        t=1;
                    }
                }
                if(t){
                    alpha_index++;
                    alpha[alpha_index]=letter;
                }else{
                    failnum++;
                }
				component.find('lives').set('v.value', failnum);
                component.set('v.failnum', failnum);
                component.set('v.alpha_index', alpha_index);
                component.set('v.alpha', alpha);
                component.set('v.bravo_index', bravo_index);
                component.set('v.bravo', bravo);
	    		if (failnum==6){
                    score--;
                    component.find('tried').set('v.value', "You lose - Try again!");
                    component.find('word').set('v.value', words[index]);
                    component.find('score').set('v.value', score);
                    component.set('v.score', score);
        			component.set('v.running', false);
                }else{
                    helper.pick(component, helper, index);
                } 
            }else{
                helper.advise(component, helper, "Letter "+letter+" is already used!");
            }
        }
    },
    advise: function(component, helper, message){
        var advising = component.get('v.advising');
        if (!advising){
            advising=-1;
            var savetext = component.find('tried').get('v.value');
            component.find('tried').set('v.value', message);
            component.set('v.advising', advising);
            window.setTimeout(
                 $A.getCallback(function() {
                     if (component.isValid()) {
                         component.find('tried').set('v.value', savetext);
                         component.set('v.advising', 0);
                     }
                 }), 1000);
        }
    }
})