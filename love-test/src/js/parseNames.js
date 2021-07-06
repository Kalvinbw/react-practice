let saveFunc = require('./output');
//function to parse the names
function parseNames(data) {
    var sLovePhrase; 
    var sFirstName;
    var sSecondName;
    var iFirstCount = 0;
    var iSecondCount = 0;
    var TotalCount = 0; 

    sLovePhrase = data.lovePhrase;
    //This removes any spaces in a string and changes any charaters to lower case
    sLovePhrase = sLovePhrase.replace(/\s/g, '').toLowerCase().split("");

    sFirstName = data.personOne;
    sFirstName = sFirstName.replace(/\s/g, '').toLowerCase().split("");

    sSecondName = data.personTwo;
    sSecondName = sSecondName.replace(/\s/g, '').toLowerCase().split("");
        //alert user if not input in text fields
    if (sLovePhrase === "" || sFirstName === "" || sSecondName === "") {
        alert("Please fill out all text fields");
    } else {
    //Counting the first name characters to the Love Phrase by using a nested loop
    for(let iOuterCount = 0; iOuterCount < sFirstName.length; iOuterCount++)
    {
        for(let iInnerCount = 0; iInnerCount < sLovePhrase.length; iInnerCount++)
        {
            if(sFirstName[iOuterCount] === sLovePhrase[iInnerCount])
            {
                iFirstCount++;
            }
        }            

    }
    //Counting the second name characters to the Love Phrase by using a nested loop
        for(let iOuterCount = 0; iOuterCount < sSecondName.length; iOuterCount++)
    {
        for(let iInnerCount = 0; iInnerCount < sLovePhrase.length; iInnerCount++)
        {
            if(sSecondName[iOuterCount] === sLovePhrase[iInnerCount])
            {
                iSecondCount++; 
            }
        }            

    }
    TotalCount = iFirstCount + iSecondCount;
    //drawBar(TotalCount);

    //Get value of iFactor according to the checkedboxes
    var iPower = 0;
    var iFactor = 1;
                
    // if (document.getElementById('communicate').checked) 
    // iFactor = iFactor + .25
    // if (document.getElementById('selfish').checked) 
    // iFactor = iFactor + .25
    // if (document.getElementById('serve').checked) 
    // iFactor = iFactor + .25
    // if (document.getElementById('friends').checked) 
    // iFactor = iFactor + .25
    // if (document.getElementById('god').checked) 
    // iFactor = iFactor + .5
    //calculation
    iPower = Math.ceil(((TotalCount / sLovePhrase.length) * 22) * iFactor);

    //drawBar(iPower);
    //output based on      
    if (iPower >= 100)
    //document.getElementById("output").innerHTML= "Perfect Marriage";
    saveFunc.push("Perfect Marriage");
    else if (iPower >= 85)
    //document.getElementById("output").innerHTML = "Get Married";
    saveFunc.push("Get Married");
    else if (iPower >= 70)
    //document.getElementById("output").innerHTML = "It might work";
    saveFunc.push("It might work");
    else
    //document.getElementById("output").innerHTML = "Keep looking!";
    saveFunc.push("Keep looking!");
    }

}

// function drawBar(num)  {
//     var load = 50//new ldBar("#heart");
//     load.set(num); 
// }

exports.parseNames = parseNames;