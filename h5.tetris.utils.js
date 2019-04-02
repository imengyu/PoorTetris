
var lastRandomNum = 0

//生成从minNum到maxNum的随机数
function randomNum(minNum, maxNum) {
  var thisNum = 0;
  lastRandomNum = 0;

  switch (arguments.length) {
    case 1:
      thisNum = parseInt(Math.random() * minNum + 1, 10);
      if (thisNum == lastRandomNum) thisNum = parseInt(Math.random() * minNum + 1, 10);
      break;
    case 2:
      thisNum = parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10);
      if (thisNum == lastRandomNum) thisNum = parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10);
      break;
  }
  lastRandomNum = thisNum;
  return lastRandomNum;
}


function deepCopy(obj) {
  var result = Array.isArray(obj) ? [] : {};
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) {
      if (typeof obj[key] === 'object') {
        result[key] = deepCopy(obj[key]);   //递归复制
      } else {
        result[key] = obj[key];
      }
    }
  }
  return result;
}