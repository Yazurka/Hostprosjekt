
function queryCoreReportingApi(profileId) {
    console.log('Querying Core Reporting API.');
    var currentDate = new Date();
    var dd = currentDate.getDate();
    var mm = currentDate.getMonth() + 1;
    var yyyy = currentDate.getFullYear();
    if (dd < 10) {
        dd = '0' + dd
    }
    if (mm < 10) {
        mm = '0' + mm
    }
    today = yyyy + '-' + mm + '-' + dd;



    // Use the Analytics Service Object to query the Core Reporting API
    gapi.client.analytics.data.ga.get({
        'ids': 'ga:' + profileId,
        'start-date': today,
        'end-date': today,
        'metrics': 'ga:visits'

    }).execute(handleCoreReportingResults);
}

function handleCoreReportingResults(results) {
    if (results.error) {
        console.log('There was an error querying core reporting API: ' + results.message);
    } else {
        printResults(results);
    }
}


function printResults(results) {
    if (results.rows && results.rows.length) {
        console.log('View (Profile) Name: ', results.profileInfo.profileName);
        console.log('antall rows', results.rows.length);

        for (var i = 0; i < results.rows.length; i++) {
            {
                console.log('hei', results.rows[i]);
            }
        }

//    console.log('View (Profile) Name: ', results.profileInfo.profileName);
//    console.log('Total Visits: ', results.rows[0][0]);
    } else {
        console.log('No results found');
    }
}
