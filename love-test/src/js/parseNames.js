
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
                
    if (data.communicate === true) 
    iFactor = iFactor + .25
    if (data.selfish === true) 
    iFactor = iFactor + .25
    if (data.serve === true) 
    iFactor = iFactor + .25
    if (data.friends === true) 
    iFactor = iFactor + .25
    if (data.god === true) 
    iFactor = iFactor + .5
    //calculation
    iPower = Math.ceil(((TotalCount / sLovePhrase.length) * 22) * iFactor);

    //output based on      
    if (iPower >= 100) {
    //document.getElementById("output").innerHTML= "Perfect Marriage";
        return ["Perfect Marriage", iPower];
    }
    else if (iPower >= 85) {
        //document.getElementById("output").innerHTML = "Get Married";
        return ["Get Married", iPower];
    }

    else if (iPower >= 70) {
        //document.getElementById("output").innerHTML = "It might work";
        return ["It might work", iPower];
    }
    else {
        //document.getElementById("output").innerHTML = "Keep looking!";
        return ["Keep looking!", iPower];
    }
    }

}


exports.parseNames = parseNames;