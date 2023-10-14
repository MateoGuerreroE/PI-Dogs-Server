function attitudeValidator(attitudesArr, pushingArray) {
  let arr = attitudesArr;
  if (arr.length) {
    let evaluate = arr.pop();
    if (!pushingArray.includes(evaluate)) pushingArray.push(evaluate);
    attitudeValidator(arr, pushingArray);
  } else {
    return;
  }
}

module.exports = attitudeValidator;
