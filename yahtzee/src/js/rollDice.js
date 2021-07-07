function rollTheDie(data) {
    //get user input and declare variables and empty arrays
    var num = data;
    let rolled;
    var timesRolled = [];
    var resultArray = [];
        //begin for loop to roll each die until the desired number is reached
    for (let j = 0; j < 6; j++) {
        var i = 0;
        do {
            rolled = (Math.floor(Math.random() * 6) + 1);
                /*if the roll is equal to the number then put the times rolled
                    into an array and change the die image to the correct die*/
            if (rolled === num) {
                i++
                timesRolled.push(i);
                resultArray.push(
                    {
                        NumTimes: timesRolled,
                        key: j
                    }
                );
            } else {
                //if not the number count the roll and repeat
                i++
            }
        } while (rolled !== num);
    }
    return resultArray;
}

exports.rollDice = rollTheDie();