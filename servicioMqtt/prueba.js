let counter = 1;

function incrementCounterAsync() {
  return new Promise((resolve, reject) => {
    counter += 1;
    resolve(counter);
  });
}

async function resolver() {
  const result = await runSequentially([
    incrementCounterAsync,
    incrementCounterAsync,
  ]);
  console.log(result);
  return result;
}

function filter(value, index, arr) {
  arr.filter((element, idx) => {
    if (typeof element !== "object") {
      arr.splice(idx, 1);
      return true;
    }
    return false;
  });
}

function filterNumbersFromArray(arr) {
  // Your code goes here
  arr.filter(filter);
  return arr;
}
let sum = 0;
function numberOfItems(arr, item) {
  // Your code goes here
  for (element of arr) {
    console.log(`Elemento: ${element}`);
    if (element === item) {
      sum++;
      console.log(`En suma, element: ${element}`);
    }
    if (typeof element === "object") numberOfItems(element, item);
  }

  return sum;
}

async function runSequentially(functions) {
  // Your code goes here
  let responses = [];
  for (element of functions) {
    const res = await element();
    console.log(res);
    if (res) {
      responses.push(res);
    } else {
      throw new Error("Something went wrong");
    }
  }
  console.log(responses);
  return responses;
}

const dayTrade = `[
  {"user": "Rob", "company": "Google", "countOfStocks": 5},
  {"user": "Bill", "company": "Goldman", "countOfStocks": 18},
  {"user": "Rob", "company": "JPMorgan", "countOfStocks": 10},
  {"user": "Dave", "company": "Boeing", "countOfStocks": 10},
  {"user": "Miley", "company": "Microsoft", "countOfStocks": 12}
]`;

function getPageData(dayTrade, pageSize, pageNumber) {
  // Your code goes here
  const data = JSON.parse(dayTrade);
  let sum = 0;
  data.sort((user1, user2) => {
    return user2.countOfStocks - user1.countOfStocks;
  });
  data.forEach((trade) => {
    sum += trade.countOfStocks;
  });

  let page = 1;
  let newData = [];
  let list = [];
  const times = data.length;
  for (let i = 0; i < times; i++) {
    const item = data.shift();
    if (list.length < pageSize) {
      list.push(item);
    }
    if (list.length === pageSize || data.length === 0) {
      const newPage = {
        page,
        data: list,
      };
      newData.push(newPage);
      list = [];
      page++;
    }
  }
  const outPage = newData.find((value) => value.page === pageNumber);
  console.log(outPage);
  return JSON.stringify(newData);
}

const x = getPageData(dayTrade, 2, 3);
// let x = [25, "apple", ["banana", "strawberry", "apple", 25]];
// console.log("tipo x: ", typeof x);
console.log(x);
// // newArray = filterNumbersFromArray(x);
// let count = numberOfItems(x, 25);
// console.log(count);
