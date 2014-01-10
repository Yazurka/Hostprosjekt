/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var firstProfileId;
function makeApiCall() {
    queryAccounts();
}

function queryAccounts() {
    console.log('Querying Accounts.');

    // Get a list of all Google Analytics accounts for this user
    gapi.client.analytics.management.accounts.list().execute(handleAccounts);
}
//var firstAccountId;
function handleAccounts(results) {
    if (!results.code) {
        if (results && results.items && results.items.length) {



            // Get the first Google Analytics account
            var firstAccountId = results.items[0].id;


            for (var i = 0; i < results.items.length; i++) {
                console.log("Profil ID1: " + results.items[i].id);
                //console.log("Profil ID: " + results.items[i].profileName);
            }

            // Query for Web Properties
            queryWebproperties(firstAccountId);

        } else {
            console.log('No accounts found for this user.');
        }
    } else {
        console.log('There was an error querying accounts: ' + results.message);
    }
}

function queryWebproperties(accountId) {
    console.log('Querying Webproperties.');

    // Get a list of all the Web Properties for the account
    gapi.client.analytics.management.webproperties.list({'accountId': accountId}).execute(handleWebproperties);
}

function handleWebproperties(results) {
    if (!results.code) {
        if (results && results.items && results.items.length) {

            // Get the first Google Analytics account
            var firstAccountId = results.items[0].accountId;
            console.log("Profil ID: " + results.items[0].accountId); //NY
            /* 
             for(var i=0; i<results.items.length; i++){
             console.log("Profil ID: " + results.items[i].id);
             //console.log("Profil ID: " + results.items[i].profileName);
             }
             */
            // Get the first Web Property ID
            var firstWebpropertyId = results.items[3].id;
            console.log("WebpropertyId: " + results.items[3].id); //NY

            // Query for Views (Profiles)
            queryProfiles(firstAccountId, firstWebpropertyId);

        } else {
            console.log('No webproperties found for this user.');
        }
    } else {
        console.log('There was an error querying webproperties: ' + results.message);
    }
}

function queryProfiles(accountId, webpropertyId) {
    console.log('Querying Views (Profiles).');

    // Get a list of all Views (Profiles) for the first Web Property of the first Account
    gapi.client.analytics.management.profiles.list({
        'accountId': accountId,
        'webPropertyId': webpropertyId
    }).execute(handleProfiles);
}

function handleProfiles(results) {

    if (!results.code) {

        //console.log("Se her: " + results.code); //NY
        //console.log("Test1: " + results.message); //NY
        //console.log("Test: " + results.items[0].id); //NY

        if (results && results.items && results.items.length) {

            // Get the first View (Profile) ID
            firstProfileId = results.items[0].id;

            // Step 3. Query the Core Reporting API
            queryCoreReportingApi(firstProfileId);
            

        } else {
            console.log('No views (profiles) found for this user.');
        }
    } else {
        console.log('There was an error querying views (profiles): ' + results.message);
    }
}

