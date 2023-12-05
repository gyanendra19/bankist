'use strict';

let mainApp = document.querySelector('.app')
let welcomeGreet = document.querySelector('.welcome')
let movementshtml = document.querySelector('.movements')
let movementsRow = document.querySelector('.movements-row')
let operation = document.querySelector('.operation')
let operationTransfer = document.querySelector('.operation-transfer')
let operationLoan = document.querySelector('.operation-loan')
let formInput = document.querySelector('.form-input')

let summary = document.querySelector('.summary')
let timeOut = document.querySelector('.time-out')
let logIn = document.querySelector('.login')
let balanceAmount = document.querySelector('.balance-amount');
let balanceDate = document.querySelector('.balance-date');
let incoming = document.querySelector('.incoming');
let outgoing = document.querySelector('.outgoing');
let interestRate = document.querySelector('.interest');
let loginUsername = document.querySelector('#login-box-1');

let loginPin = document.querySelector('#login-box-2');
let loginButton = document.querySelector('#login-button');
let transferButton = document.querySelector('.transfer-button');
let loanButton = document.querySelector('.loan-button');
let closeButton = document.querySelector('.close-button');
let transferAmount = document.querySelector('.transfer-amount');

let transferAccount = document.querySelector('.transfer-account');
let loanAmount = document.querySelector('.transfer-loan');
let closeAccount = document.querySelector('.close-account');
let closePin = document.querySelector('.close-pin');
let sortButton = document.querySelector('.sort-button');


const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    "2019-11-18T21:31:17.178Z",
    "2019-12-23T07:42:02.383Z",
    "2020-01-28T09:15:04.904Z",
    "2020-04-01T10:17:24.185Z",
    "2020-05-15T14:11:59.604Z",
    "2023-09-17T17:01:17.194Z",
    "2023-09-16T23:36:17.929Z",
    "2023-09-19T10:51:36.790Z",
  ],
  currency: "EUR",
  locale: "pt-PT",
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    "2019-11-01T13:15:33.035Z",
    "2019-11-30T09:48:16.867Z",
    "2019-12-25T06:04:23.907Z",
    "2020-01-25T14:18:46.235Z",
    "2020-02-05T16:33:06.386Z",
    "2020-04-10T14:43:26.374Z",
    "2020-06-25T18:49:59.371Z",
    "2020-07-26T12:01:20.894Z",
  ],
  currency: "USD",
  locale: "en-US",
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,

  movementsDates: [
    "2019-11-01T13:15:33.035Z",
    "2019-11-30T09:48:16.867Z",
    "2019-12-25T06:04:23.907Z",
    "2020-01-25T14:18:46.235Z",
    "2020-02-05T16:33:06.386Z",
    "2020-04-10T14:43:26.374Z",
    "2020-06-25T18:49:59.371Z",
    "2020-07-26T12:01:20.894Z",
  ],
  currency: "USD",
  locale: "en-US",
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,

  movementsDates: [
    "2019-11-18T21:31:17.178Z",
    "2019-12-23T07:42:02.383Z",
    "2020-01-28T09:15:04.904Z",
    "2020-04-01T10:17:24.185Z",
    "2020-05-15T14:11:59.604Z",
    "2023-09-17T17:01:17.194Z",
    "2023-09-16T23:36:17.929Z",
    "2023-09-19T10:51:36.790Z",
  ],
  currency: "EUR",
  locale: "pt-PT",
};



const accounts = [account1, account2, account3, account4];


//////////////////////////////////////////////////////////

let setTimer = function(){
  let time = 300;

  let timer = function(){
    let min = String(Math.floor(time / 60)).padStart(2,0);
    let sec = String(time % 60).padStart(2,0);

    
    timeOut.textContent = `You will be logged out in ${min}:${sec}`
    
    if(time === 0){
      mainApp.style.opacity = 0;
      welcomeGreet.textContent = 'Login to get started'
      clearInterval(tick)
    }

    time--;
  }

  timer();
  tick = setInterval(timer ,1000)

 return tick;
}

let calcDate = function(date, locale){
  let daysPassed = (date1, date2) => Math.round(Math.abs((date2 - date1)/(1000 * 60 * 60 * 24)))

  let passDays = daysPassed(new Date(), date)
  
  if(passDays === 0) return 'Today'
  if(passDays === 1) return 'Yesterday'
  if(passDays <=7 ) return `${passDays} days ago`

   let intDate = new Intl.DateTimeFormat(locale).format(date);
   return intDate
}

let formattedCur = function(value, locale, currency){
  let formattedMovement = new Intl.NumberFormat(locale,{
    style: 'currency',
    currency: currency
  }).format(value)

  return formattedMovement
}


let displayMovements = function (acc, sort = false) {
  movementshtml.innerHTML = '';

  let movs = sort ? acc.movements.slice().sort((a, b) => a - b) : acc.movements;

  
  
  movs.forEach(function (mov, i) {
    let type = mov > 0 ? 'deposit' : 'withdrawal';
    
    let date = new Date(acc.movementsDates[i]);
    let formattedMovement = formattedCur(mov, acc.locale, acc.currency)
   
    let displayDate = calcDate(date, acc.locale);


    let html = ` <div class="movements-row">
        <p class="movements-type movements-type-${type}">${i + 1} ${type}</p>
        <p class="movements-type movements-date">${displayDate}</p>
        <p class="movements-type movements-amount">${formattedMovement}</p>
               </div>`

    movementshtml.insertAdjacentHTML('afterbegin', html)
  })
}



// BALANCE IN EACH TRANSACTION


let displayBalance = function (account) {
  account.balance = account.movements.reduce(function (acc, mov) {
    return acc + mov
  })

  balanceAmount.innerHTML = formattedCur(account.balance, account.locale, account.currency);
}





//USERNAME
let displayUserName = function (accs) {

  accs.forEach(function (acc) {
    acc.username = acc.owner.toLowerCase()
      .split(' ')
      .map(fname => fname[0])
      .join('');

  })
}

console.log(displayUserName(accounts))


// INCOMING, OUTGOING AND INTEREST RATE

let displayInOut = function (account) {
  //INCOMING
  let credit = account.movements.filter(mov => mov > 0).reduce((acc, cur) => acc + cur, 0)

  incoming.innerHTML = formattedCur(credit, account.locale, account.currency)

  //OUTGOING
  let debit = account.movements.filter(mov => mov < 0).reduce((acc, cur) => acc + cur, 0)


  outgoing.innerHTML = formattedCur(Math.abs(debit), account.locale, account.currency)

  //INTERSERT RATE
  let interestR = account.movements.filter(mov => mov > 0).reduce((acc, cur) => acc + cur, 0) * account.interestRate / 100;


  interestRate.textContent = formattedCur(interestR, account.locale, account.currency)
}

//UPDATE UI
let updateUI = function (acc) {
  // DISPLAY MOVEMENTS
  displayMovements(acc)

  //DISPLAY BALANCE
  displayBalance(acc)

  //DISPLAY SUMMARY
  displayInOut(acc)
}


//LOGIN

let currentAccount , tick;
loginButton.addEventListener('click', function (e) {
  e.preventDefault();
  // console.log('login')

  currentAccount = accounts.find(function (acc) {
    return acc.username === loginUsername.value
  });

  if (currentAccount.pin === Number(loginPin.value)) {
    mainApp.style.opacity = 1;

    welcomeGreet.textContent = `Welcome back, ${currentAccount.owner.split(' ')[0]}`;
    let options = {
      hour: 'numeric',
      month: 'long',
      minute: 'numeric',
      year: '2-digit',
      date: 'numeric'
    }
    let intDate = new Intl.DateTimeFormat('en-IE', options).format(now);
    balanceDate.textContent = `As of ${intDate}`
    
    if(tick) clearInterval(tick);
       setTimer()
    




    loginUsername.value = loginPin.value = '';
    loginPin.blur();

    updateUI(currentAccount)
  }
})

//TRANSFER MONEY

transferButton.addEventListener('click', function (e) {
  e.preventDefault();
  let transAmount = Number(transferAmount.value);
  let recAccount = accounts.find(acc => transferAccount.value === acc.username)

  currentAccount.movementsDates.push(new Date().toISOString());
  recAccount.movementsDates.push(new Date().toISOString());
  transferAmount.value = transferAccount.value = '';

  if (transAmount > 0 && transAmount < currentAccount.balance && recAccount && transferAccount.value !== currentAccount.username) {
    currentAccount.movements.push(-transAmount);
    recAccount.movements.push(transAmount);

    clearInterval(tick)
    setTimer()

    updateUI(currentAccount);
  }
})


//CLOSE ACCOUNT
closeButton.addEventListener('click', function (e) {
  e.preventDefault();

  if (closeAccount.value === currentAccount.username && +(closePin.value) === currentAccount.pin) {

    let index = accounts.findIndex(function (acc) {
      return acc.username === closeAccount.value
    })

    accounts.splice(index, 1)
    mainApp.style.opacity = 0;
    welcomeGreet.textContent = 'Login to get started'
    closeAccount.value = closePin.value = '';

  }
})

//LOAN ACCOUNT
loanButton.addEventListener('click', function (e) {
  e.preventDefault();
  let amt = +(loanAmount.value);
  if (amt > 0 && currentAccount.movements.some(acc => acc > amt * 0.1)) {
    setTimeout(function(){
      currentAccount.movements.push(amt)
    currentAccount.movementsDates.push(new Date().toISOString())
  
    clearInterval(tick)
      setTimer()
  
  
    updateUI(currentAccount);
  
    loanAmount.value = '';
    },3000)
  }

})

let sorted = false;
sortButton.addEventListener('click', function (e) {
  e.preventDefault();

  displayMovements(currentAccount, !sorted);
  sorted = !sorted;
})
































// const withdrawal = account1.movements.filter(function(mov){
//   return mov < 0;
// })

// console.log(withdrawal)

// let firstLetter =user
// .toLocaleLowerCase()
// .split(' ')
// .map(fname=>fname[0])
// .join('');


// console.log(firstLetter)

//  let money = [5000, 3400, -150, -790, -3210, -1000, 8500, -30];

//  let sum = 0;
//  for(const mon of money){
//   sum += mon
//  }

//  console.log(sum)

console.log(Number.parseInt('20.345kh'))
console.log(Number.isFinite('20.345kh'))
console.log(Number.isFinite(`20`))
console.log(Math.ceil(`20.3`))
console.log((2.3).toFixed(0))


welcomeGreet.addEventListener('click', function () {

  [...document.querySelectorAll('.movements-row')].forEach((row, i) => {
    if (i % 2 === 0) {
      row.style.backgroundColor = 'red'
    }
  })
  //  console.log([...document.querySelectorAll('.movements-row')])
})

let now = new Date();
let year = `${now.getFullYear()}`.padStart(2, 0)
let month = `${now.getMonth()}`.padStart(2, 0)
let day = `${now.getDate()}`.padStart(2, 0)
let minute = `${now.getMinutes()}`.padStart(2, 0)
let second = `${now.getSeconds()}`.padStart(2, 0)
let hour = `${now.getHours()}`.padStart(2, 0)

// let past = new Date(2002, 1, 19, 14, 32)
// console.log(past)

let future = new Date(2037, 10, 19, 23, 12, 34);
let date3 = new Date(account1.movementsDates[0])
let date4 = new Date(account1.movementsDates[1])
console.log(date4-date3)
