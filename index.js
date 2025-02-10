function convertTemp(value, dir) {
    if (dir === 'toC') {
        let celsius = (value - 32) * 5 / 9;
        return `${Math.round(celsius)} C`;
    } else if (dir === 'toF') {
        let fahrenheit = (value * 9 / 5) + 32;
        return `${Math.round(fahrenheit)} F`;
    } else {
        return "Неверное значение";
    }
}
console.log(convertTemp(32, 'toC'));
console.log(convertTemp(10, 'toF')); 



console.log(' ')
function checkTreyg(a, b, c) { 
    if (a + b > c && a + c > b && b + c > a) {
        let p = (a + b + c) / 2;
        let area = Math.sqrt(p * (p - a) * (p - b) * (p - c));
        let srznach = (a + b + c) / area;
        console.log("Треугольник существует");
        console.log("Периметр =", a + b + c);
        console.log("Площадь =", area.toFixed(2));
        console.log("Соотношение =", srznach.toFixed(2));
    }
    else {
        console.log("Треугольник не существует");
      }
}
checkTreyg(10, 30, 20);
checkTreyg(5, 6, 8);



console.log(' ')
let n = 10;
for (let i = 0; i <= n; i = i + 1) {
  if (i % 5 === 0 && i !== 0) {
    console.log(i + " fizz buzz");
  } else if (i % 2 === 0) {
    console.log(i + " buzz");
  } else {
    console.log(i + " fizz");
  }
}



console.log(' ')
function createTree(height) {
  let tree = "";
  for (let i = 1; i <= height; i++) {
    tree += (i % 2 === 0 ? "#" : "*").repeat(i) + "\n";
  }
  tree += "||";
  return tree;
}
console.log(createTree(15));



console.log(' ')
function checkDel(n, x, y) {
  if (n >= 0 && x >= 0 && y >= 0) {
    let res = (n % x == 0 && n % y == 0);
    console.log(`n = ${n}, x = ${x}, y = ${y} => ${res}`);}
  else {
    console.log('Что-то пошло не так')
  }
}
checkDel(10, 4, 2);
checkDel(10, 5, 2);
checkDel(40, 3, 8);
checkDel(-10, 3, 8);
checkDel(10, -3, 8);




console.log(' ')
function countButer(breed, cheese) {
  cnt = Math.min(Math.floor(breed / 2), cheese)
  return (`breed = ${breed}, cheese = ${cheese}, count buter = ${cnt}`)
}
console.log(countButer(3, 5))
console.log(countButer(10, 1000))
console.log(countButer(1, 5))




console.log(' ')
function absValue(n) {
  if (n >= 0) {return (`absValue(${n}) -> ${n}`)}
  else {return (`absValue(${n}) -> ${n * (-1)}`)}
}
console.log(absValue(10))
console.log(absValue(-10))
console.log(absValue(0))




console.log(' ') 
function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}
console.log(random(7, 15))
console.log(random(1, 15))
console.log(random(1, 15))





console.log(' ');
function massiv(arr, cnt) {
  let res = [];
  while (res.length < cnt) {
    let i = random(0, arr.length - 1);
    if (!res.includes(arr[i])) {
      res.push(arr[i]);
    }
  }
  return res;
}
let test_arr = [1, 'a', 4, 'g', 'd', 6];
console.log(`my array: ${test_arr}, len new array: ${cnt}, new array: ${massiv(test_arr, 3)}`);


