//function to parse the names
function parseNames() {
    var sOutput;
    var sLovePhrase; 
    var sFirstName;
    var sSecondName;
    var iFirstCount = 0;
    var iSecondCount = 0;
    var TotalCount = 0; 

    sLovePhrase = document.getElementById("lovePhrase").value;
    //This removes any spaces in a string and changes any charaters to lower case
    sLovePhrase = sLovePhrase.replace(/\s/g, '').toLowerCase().split("");

    sFirstName = document.getElementById("personOne").value;
    sFirstName = sFirstName.replace(/\s/g, '').toLowerCase().split("");

    sSecondName = document.getElementById("personTwo").value;
    sSecondName = sSecondName.replace(/\s/g, '').toLowerCase().split("");
        //alert user if not input in text fields
    if (sLovePhrase == "" || sFirstName == "" || sSecondName == "") {
        alert("Please fill out all text fields");
    } else {
    //Counting the first name characters to the Love Phrase by using a nested loop
    for(var iOuterCount = 0; iOuterCount < sFirstName.length; iOuterCount++)
    {
        for(var iInnerCount = 0; iInnerCount < sLovePhrase.length; iInnerCount++)
        {
            if(sFirstName[iOuterCount] === sLovePhrase[iInnerCount])
            {
                iFirstCount++;
            }
        }            

    }
    //Counting the second name characters to the Love Phrase by using a nested loop
        for(var iOuterCount = 0; iOuterCount < sSecondName.length; iOuterCount++)
    {
        for(var iInnerCount = 0; iInnerCount < sLovePhrase.length; iInnerCount++)
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
                
    if (document.getElementById('communicate').checked) 
    iFactor = iFactor + .25
    if (document.getElementById('selfish').checked) 
    iFactor = iFactor + .25
    if (document.getElementById('serve').checked) 
    iFactor = iFactor + .25
    if (document.getElementById('friends').checked) 
    iFactor = iFactor + .25
    if (document.getElementById('god').checked) 
    iFactor = iFactor + .5
    //calculation
    iPower = Math.ceil(((TotalCount / sLovePhrase.length) * 22) * iFactor);

    drawBar(iPower);
    //output based on      
    if (iPower >= 100)
    document.getElementById("output").innerHTML= "Perfect Marriage";
    else if (iPower >= 85)
    document.getElementById("output").innerHTML = "Get Married";
    else if (iPower >= 70)
    document.getElementById("output").innerHTML = "It might work";
    else
    document.getElementById("output").innerHTML = "Keep looking!";
    }

}

function drawBar(num)  {
    var load = new ldBar("#heart");
    load.set(num); 
}