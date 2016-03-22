function diceRolls() {
  var rolls = [];
  for (var i = 0; i < 6; i++) {
    var tempRolls = [];
    for (var n = 0; n < 4; n++) {
      tempRolls.push(Math.floor(Math.random() * 6) + 1);
    }
    tempRolls.sort();
    rolls.push(tempRolls[1] + tempRolls[2] + tempRolls[3]);
  }
  return rolls;
}
diceRolls();
