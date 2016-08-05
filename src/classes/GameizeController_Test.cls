@istest
public with sharing class GameizeController_Test {


    @isTest
    static void saveData_test_runas_negative_null_data(){
        Profile p = [select id from profile where name='Standard User'];
        User u = new User(Alias = 'standt', Email='standarduser@testorg.com',
                EmailEncodingKey='UTF-8', LastName='Testing', LanguageLocaleKey='en_US',
                LocaleSidKey='en_US', ProfileId = p.Id,
                TimeZoneSidKey='America/Los_Angeles', UserName='standarduser@testorg.com');
        System.runAs(u){
            List<Gameize__c> g = [select id from Gameize__c];
            System.assertEquals(0, g.size(), 'There should 0 Gameize records');

            Map<String, String> data = new Map<String, String>{'mode'=>'saveData'};

            ETLC_ApexBridge_Data d1 = new ETLC_ApexBridge_Data();
            d1.operation = 'GameizeController';
            d1.input = ETLC_ApexBridge_Data.encodeData(data);
            d1.debug = true;

            String strD2 =  ETLC_ApexBridge_Controller.execute(d1.toJson());
            ETLC_ApexBridge_Data d2 = ETLC_ApexBridge_Data.fromJSON(strD2);
            System.assertEquals(false, d2.outputFlag, 'OutputFlag should be false');


            g = [select id,dataFavorite__c,dataHistory__c  from Gameize__c];
            System.assertEquals(0, g.size(), 'There should 0 Gameize records');
        }
    }

    @isTest
    static void saveData_test_existingrecord_data(){
        Gameize__c g1 = new Gameize__c();
        g1.Name='test';
        g1.user__c = UserInfo.getUserId();
        g1.dataFavorite__c = null;
        g1.dataHistory__c =  null;
        insert g1;


        List<Gameize__c> g = [select id from Gameize__c];
        System.assertEquals(1, g.size(), 'There should 1 Gameize records');

        Map<String, String> data = new Map<String, String>{'mode'=>'saveData','fieldName'=>'dataFavorite__c', 'fieldData'=>'{}'};

        ETLC_ApexBridge_Data d1 = new ETLC_ApexBridge_Data();
        d1.operation = 'GameizeController';
        d1.input = ETLC_ApexBridge_Data.encodeData(data);
        d1.debug = true;

        String strD2 =  ETLC_ApexBridge_Controller.execute(d1.toJson());
        ETLC_ApexBridge_Data d2 = ETLC_ApexBridge_Data.fromJSON(strD2);
        System.assertEquals(true, d2.outputFlag, 'OutputFlag should be true');


        g = [select id,dataFavorite__c,dataHistory__c  from Gameize__c];
        System.assertEquals(1, g.size(), 'There should 1 Gameize records');
        System.assertEquals('{}', g[0].dataFavorite__c, 'dataFavorite__c should have "{}"');
        System.assertEquals(null, g[0].dataHistory__c, 'dataHistory__c be null');
    }

    @isTest
    static void saveData_test_data(){
        List<Gameize__c> g = [select id from Gameize__c];
        System.assertEquals(0, g.size(), 'There should 0 Gameize records');

        Map<String, String> data = new Map<String, String>{'mode'=>'saveData','fieldName'=>'dataFavorite__c', 'fieldData'=>'{}'};

        ETLC_ApexBridge_Data d1 = new ETLC_ApexBridge_Data();
        d1.operation = 'GameizeController';
        d1.input = ETLC_ApexBridge_Data.encodeData(data);
        d1.debug = true;

        String strD2 =  ETLC_ApexBridge_Controller.execute(d1.toJson());
        ETLC_ApexBridge_Data d2 = ETLC_ApexBridge_Data.fromJSON(strD2);
        System.assertEquals(true, d2.outputFlag, 'OutputFlag should be true');


        g = [select id,dataFavorite__c,dataHistory__c  from Gameize__c];
        System.assertEquals(1, g.size(), 'There should 1 Gameize records');
        System.assertEquals('{}', g[0].dataFavorite__c, 'dataFavorite__c should have "{}"');
        System.assertEquals(null, g[0].dataHistory__c, 'dataHistory__c be null');
    }
    @isTest
    static void saveData_test_data2(){
        List<Gameize__c> g = [select id from Gameize__c];
        System.assertEquals(0, g.size(), 'There should 0 Gameize records');

        Map<String, String> data = new Map<String, String>{'mode'=>'saveData','fieldName'=>'dataHistory__c', 'fieldData'=>'{}'};

        ETLC_ApexBridge_Data d1 = new ETLC_ApexBridge_Data();
        d1.operation = 'GameizeController';
        d1.input = ETLC_ApexBridge_Data.encodeData(data);
        d1.debug = true;

        String strD2 =  ETLC_ApexBridge_Controller.execute(d1.toJson());
        ETLC_ApexBridge_Data d2 = ETLC_ApexBridge_Data.fromJSON(strD2);
        System.assertEquals(true, d2.outputFlag, 'OutputFlag should be true');


        g = [select id,dataFavorite__c,dataHistory__c  from Gameize__c];
        System.assertEquals(1, g.size(), 'There should 1 Gameize records');
        System.assertEquals(null, g[0].dataFavorite__c, 'dataFavorite__c should be null');
        System.assertEquals('{}', g[0].dataHistory__c, 'dataHistory__c have "{}"');
    }

    @isTest
    static void saveData_test_null_data(){
        List<Gameize__c> g = [select id from Gameize__c];
        System.assertEquals(0, g.size(), 'There should 0 Gameize records');

        Map<String, String> data = new Map<String, String>{'mode'=>'saveData'};

        ETLC_ApexBridge_Data d1 = new ETLC_ApexBridge_Data();
        d1.operation = 'GameizeController';
        d1.input = ETLC_ApexBridge_Data.encodeData(data);
        d1.debug = true;

        String strD2 =  ETLC_ApexBridge_Controller.execute(d1.toJson());
        ETLC_ApexBridge_Data d2 = ETLC_ApexBridge_Data.fromJSON(strD2);
        System.assertEquals(true, d2.outputFlag, 'OutputFlag should be true');


        g = [select id,dataFavorite__c,dataHistory__c  from Gameize__c];
        System.assertEquals(1, g.size(), 'There should 1 Gameize records');
        System.assertEquals(null, g[0].dataFavorite__c, 'dataFavorite__c should be null');
        System.assertEquals(null, g[0].dataHistory__c, 'dataHistory__c should be null');
    }
    @isTest
    static void saveData_test_runas_positive_data(){
        PermissionSet ps = [ select Id from PermissionSet where Name = 'Gameize_Permissions' ];

        Profile p = [select id from profile where name='Standard User'];
        User u = new User(Alias = 'standt', Email='standarduser@testorg.com',
                EmailEncodingKey='UTF-8', LastName='Testing', LanguageLocaleKey='en_US',
                LocaleSidKey='en_US', ProfileId = p.Id,
                TimeZoneSidKey='America/Los_Angeles', UserName='standarduser@testorg.com');
        insert u;
        PermissionSetAssignment assignment = new PermissionSetAssignment( AssigneeId = u.Id, PermissionSetId = ps.Id);
        insert assignment;

        System.runAs(u){
            saveData_test_null_data();
        }
    }
    @isTest
    static void saveData_test_runas_positive_null_data(){
        PermissionSet ps = [ select Id from PermissionSet where Name = 'Gameize_Permissions' ];

        Profile p = [select id from profile where name='Standard User'];
        User u = new User(Alias = 'standt', Email='standarduser@testorg.com',
                EmailEncodingKey='UTF-8', LastName='Testing', LanguageLocaleKey='en_US',
                LocaleSidKey='en_US', ProfileId = p.Id,
                TimeZoneSidKey='America/Los_Angeles', UserName='standarduser@testorg.com');
        insert u;
        PermissionSetAssignment assignment = new PermissionSetAssignment( AssigneeId = u.Id, PermissionSetId = ps.Id);
        insert assignment;

        System.runAs(u){
            saveData_test_null_data();
        }
    }


    @isTest
    static void fetchData_test_negative(){
        Map<String, String> data = new Map<String, String>{'mode'=>'fetchData'};

        ETLC_ApexBridge_Data d1 = new ETLC_ApexBridge_Data();
        d1.operation = 'GameizeController';
        d1.input = ETLC_ApexBridge_Data.encodeData(data);
        d1.debug = true;

        String strD2 =  ETLC_ApexBridge_Controller.execute(d1.toJson());
        ETLC_ApexBridge_Data d2 = ETLC_ApexBridge_Data.fromJSON(strD2);
        System.assertEquals(false, d2.outputFlag, 'OutputFlag should be false');
        System.assertEquals(null, d2.output, 'Output should be null');
    }
    @isTest
    static void fetchData_test_positive(){
        Gameize__c g = new Gameize__c();
        g.Name='test';
        g.user__c = UserInfo.getUserId();
        g.dataFavorite__c = '{}';
        g.dataHistory__c = '{}';
        insert g;

        Map<String, String> data = new Map<String, String>{'mode'=>'fetchData'};

        ETLC_ApexBridge_Data d1 = new ETLC_ApexBridge_Data();
        d1.operation = 'GameizeController';
        d1.input = ETLC_ApexBridge_Data.encodeData(data);
        d1.debug = true;

        String strD2 =  ETLC_ApexBridge_Controller.execute(d1.toJson());
        ETLC_ApexBridge_Data d2 = ETLC_ApexBridge_Data.fromJSON(strD2);
        System.assertEquals(true, d2.outputFlag, 'OutputFlag should be true');

    }
    @isTest
    static void fetchData_test_runas_negative(){
        Profile p = [select id from profile where name='Standard User'];
        User u = new User(Alias = 'standt', Email='standarduser@testorg.com',
                        EmailEncodingKey='UTF-8', LastName='Testing', LanguageLocaleKey='en_US',
                        LocaleSidKey='en_US', ProfileId = p.Id,
                        TimeZoneSidKey='America/Los_Angeles', UserName='standarduser@testorg.com');
        System.runAs(u){
            fetchData_test_negative();
        }
    }
    @isTest
    static void fetchData_test_runas_positive(){
        PermissionSet ps = [ select Id from PermissionSet where Name = 'Gameize_Permissions' ];

        Profile p = [select id from profile where name='Standard User'];
        User u = new User(Alias = 'standt', Email='standarduser@testorg.com',
                EmailEncodingKey='UTF-8', LastName='Testing', LanguageLocaleKey='en_US',
                LocaleSidKey='en_US', ProfileId = p.Id,
                TimeZoneSidKey='America/Los_Angeles', UserName='standarduser@testorg.com');
        insert u;
        PermissionSetAssignment assignment = new PermissionSetAssignment( AssigneeId = u.Id, PermissionSetId = ps.Id);
        insert assignment;

        System.runAs(u){
            fetchData_test_positive();
        }
    }
    @isTest
    static void fetchData_test_runas_without_permission_set(){

        Profile p = [select id from profile where name='Standard User'];
        User u = new User(Alias = 'standt', Email='standarduser@testorg.com',
                EmailEncodingKey='UTF-8', LastName='Testing', LanguageLocaleKey='en_US',
                LocaleSidKey='en_US', ProfileId = p.Id,
                TimeZoneSidKey='America/Los_Angeles', UserName='standarduser@testorg.com');

        System.runAs(u){
            Gameize__c g = new Gameize__c();
            g.Name='test';
            g.user__c = UserInfo.getUserId();
            g.dataFavorite__c = '{}';
            g.dataHistory__c = '{}';
            insert g;

            Map<String, String> data = new Map<String, String>{'mode'=>'fetchData'};

            ETLC_ApexBridge_Data d1 = new ETLC_ApexBridge_Data();
            d1.operation = 'GameizeController';
            d1.input = ETLC_ApexBridge_Data.encodeData(data);
            d1.debug = true;

            String strD2 =  ETLC_ApexBridge_Controller.execute(d1.toJson());
            ETLC_ApexBridge_Data d2 = ETLC_ApexBridge_Data.fromJSON(strD2);
            System.assertEquals(false, d2.outputFlag, 'OutputFlag should be false');
        }
    }
    /**/
}