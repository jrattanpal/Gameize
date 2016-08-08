public with sharing class GameizeController extends ETLC_ApexBridge_Abstract {
    private static ETLC_ApexBridge_Data apexBridgedata;
    public override void process(ETLC_ApexBridge_Data data) {
        apexBridgedata = data;
        if (data.debug) System.debug(data);
        // Depending on the mode, determine which operation to perform
        String mode = (String) data.getInputValue('mode');
        if (mode == 'fetchUserData') {
            data.output = fetchUserData(UserInfo.getUserId());
            data.outputFlag = (data.output == null)?false:true;
        }else if (mode == 'saveUserData') {
            data.outputFlag = saveUserData(UserInfo.getUserId(), userInfo.getUserName(), (String) data.getInputValue('fieldName'), (String) data.getInputValue('fieldData') );
        }else if (mode == 'fetchGameData') {
            data.output = fetchGameData();
            data.outputFlag = (data.output == null)?false:true;
        }
    }
    /**
     * Returns game data for current logged in user
     */
    public String fetchUserData(ID userId) {
        String returnData = null;
        try {
            List<Gameize__c> records = [SELECT ID, dataFavorite__c, dataHistory__c From Gameize__c where User__c=:userId limit 1];
            if(records.size()>0){
                //CRUD/FLS Permission check
                ETLC_SecuredDB.validateQuery(records);

                returnData = JSON.serialize(records[0]);
                if(apexBridgedata.debug){System.debug('GameizeController:fetchData:returnData:: ' + returnData);  }
            }
        }Catch(Exception e){ if (apexBridgedata.debug) { System.debug('GameizeController:fetchData:exception:: ' + e.getMessage());  }   }
        return returnData;
    }
    /**
     * Save  game data for current logged in user
     */
    public boolean saveUserData(ID userId, String userName,  String fieldName, String fieldData) {
        Boolean returnFlag = false;
        try {
            String [] fields = new String [] {'Name', 'gameize__dataFavorite__c', 'gameize__dataHistory__c'};

            //Although, ETLC_SecuredDB will check CRUD/FLS, we need to check Createable and updateable permissions for upsert
            // Obtaining the field name/token map for the Contact object
            Map<String,Schema.SObjectField> m = Schema.SObjectType.Gameize__c.fields.getMap();
            for (String fieldToCheck: fields) {
                // Check if the user has create access on the each field

                //if not accessible then return false
                //If not updatable then return false; update part of update
                //If not createdable then return false; insert part of upsert
                if (!m.get(fieldToCheck).getDescribe().isAccessible() ||
                        !m.get(fieldToCheck).getDescribe().isUpdateable() ||
                        !m.get(fieldToCheck).getDescribe().isCreateable()) {
                    return false;
                }
            }

            Gameize__c g = new Gameize__c();
            g.name = userName;
            g.User__c = userId;
            if(fieldName == 'dataFavorite__c'){
                g.dataFavorite__c = fieldData;
            }else if(fieldName == 'dataHistory__c'){
                g.dataHistory__c = fieldData;
            }
            //Check if existing record exists for the user
            //If it does then use that to update the same record or create a new one
            List<Gameize__c> records = [SELECT ID From Gameize__c where User__c=:userId limit 1];
            if(records.size()>0){
                g.Id = records[0].Id;
            }
            upsert g;
            if(apexBridgedata.debug){System.debug('GameizeController:saveData:g:: ' + g);  }
            returnFlag = true;
        }Catch(Exception e){ if (apexBridgedata.debug) { System.debug('GameizeController:fetchData:exception:: ' + e.getMessage());  }   }
        return returnFlag;
    }
    /**
     * Fetch game list from static resources
     */
    public String fetchGameData(){
        String returnData = null;
        try{
            List<StaticResource> records = [select Body from StaticResource where Name = 'Gameize_GameList'];
            if(records.size()>0){
                //ETLC_SecuredDB.validateQuery(records);
                returnData = records[0].Body.toString();
                System.debug('returnData::'+returnData);
                if(apexBridgedata.debug){System.debug('GameizeController:fetchData:returnData:: ' + returnData);  }
            }
        }Catch(Exception e){ if (apexBridgedata.debug) { System.debug('GameizeController:fetchData:exception:: ' + e.getMessage());  }   }
        return returnData;
	}
}