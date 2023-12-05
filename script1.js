'use strict';

let movements = document.querySelector('.movements');
let movementsRow = document.querySelector('.movements-row');
let loginBox1 = document.querySelector('#login-box-1');
let loginBox2 = document.querySelector('#login-box-2');
let loginButton = document.querySelector('#login-button');
let app = document.querySelector('.app');
let amount = document.querySelector('.amount');
let incoming = document.querySelector('.incoming');
let outgoing = document.querySelector('.outgoing');
let interest = document.querySelector('.interest');
let transferButton = document.querySelector('.transfer-button');
let transferAcc = document.querySelector('.transfer-account');
let transferAmt = document.querySelector('.transfer-amount');
let welcome = document.querySelector('.welcome');
let loanButton = document.querySelector('.loan-button');
let transferLoan = document.querySelector('.transfer-loan');
let closeButton = document.querySelector('.close-button');
let closePin = document.querySelector('.close-pin');
let closeAcc = document.querySelector('.close-account');
let sortButton = document.querySelector('.sort-button');
let balanceDate = document.querySelector('.balance-date');
let movementsDate = document.querySelector('.movements-date');
let timeOut = document.querySelector('.time-out p');


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
    "2023-10-01T17:01:17.194Z",
    "2023-10-03T23:36:17.929Z",
    "2023-10-06T10:51:36.790Z",
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
    "2023-10-03T18:49:59.371Z",
    "2023-10-05T12:01:20.894Z",
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

//////////////////////////////////////////////////

let formatDate = function(date, locale){
  let daysPassed = (date1, date2) => Math.round(Math.abs((date2 - date1)/(1000 * 60 * 60 * 24)));
  let passedDays = daysPassed(date, new Date());

  if(passedDays === 0) return 'Today';
  if(passedDays === 1) return 'Yesterday';
  if(passedDays <= 7) return `${passedDays} days ago`;

  let intDate = new Intl.DateTimeFormat(locale).format(date);
   return intDate
}

let formattedBalance = function(movement,locale,cur){
  let fBalance = new Intl.NumberFormat(locale, {style: 'currency', currency:cur}).format(movement);
  return fBalance
}

let tick;
let pageTimer = function(){
  let totalTime = 300;
   let tickTimer = function(){
       let minuteTime = String(Math.floor(totalTime / 60)).padStart(2,0);
       let secondTime = String(Math.floor(totalTime % 60)).padStart(2,0);
   
   
         timeOut.textContent = `You will be logged out in ${minuteTime}:${secondTime}`
         // console.log(minuteTime)
         // console.log(secondTime)
         // console.log(totalTime)
         
         totalTime--;
   }

   tickTimer();
   tick = setInterval(tickTimer, 1000)
  return tick;

}

let userName = function (accs) {

  accs.forEach((acc) =>
    acc.username = acc.owner.toLowerCase().split(' ').map((word) => word[0]).join('')
  )
}
userName(accounts)
console.log(account3)



let currentAccount;
loginButton.addEventListener('click', function (e) {
  e.preventDefault();
  let option = {
    hour: 'numeric',
    month: 'short',
    year: 'numeric',
    minute: 'numeric',
    day: 'numeric'
  }

  currentAccount = accounts.find(function (acc) {
    return acc.username === loginBox1.value;
  })

  
  
  if (currentAccount.pin === Number(loginBox2.value)) {
    app.style.opacity = 1;
  }

  // let startTimer = pageTimer();
  // timeOut.textContent = startTimer;


let formattedDate = new Intl.DateTimeFormat(currentAccount.locale, option).format(now);

 balanceDate.textContent = `As of ${formattedDate}`;
 console.log(formattedDate)
 console.log(currentAccount.locale);

 if(tick) clearInterval(tick);
 pageTimer();


  
  welcome.textContent = `Welcome back, ${currentAccount.owner.split(' ').splice(0,1).join('')}`;


  loginBox1.value = loginBox2.value = '';
  loginBox2.blur();


  updateUI(currentAccount)
});




let displayMovements = function (acc, sort = false) {
  movements.innerHTML = '';

  let sortMov = sort ? acc.movements.slice().sort((a,b) => a-b) : acc.movements;
  
  console.log(acc)
  sortMov.forEach((mov, i) => {
    
    let move = mov > 0 ? 'deposit' : 'withdrawal';
    let date = new Date(acc.movementsDates[i]);
    let finalDate = formatDate(date, acc.locale)

    let dislayformatbal = formattedBalance(mov, acc.locale, acc.currency)
    console.log(finalDate)
    
    
    movements.insertAdjacentHTML('afterbegin',
    ` <div class="movements-row">
            <p class="movements-type movements-type-${move}">${i + 1} ${move}</p>
            <p class="movements-type movements-date">${finalDate}</p>
            <p class="movements-type movements-amount">${dislayformatbal} </p>
        </div>`
        )
      })
}

let balance;
let displayBalance = function (accs) {
  
  balance = accs.movements.reduce((acc, mov) => {
    return acc + mov;
  }, 0)

  let dislayformatbal = formattedBalance(balance, accs.locale, accs.currency)

  
  amount.innerHTML = `${dislayformatbal}`
}

let displaySummary = function (accs) {
  let income = accs.movements.filter(mov => mov > 0).reduce((acc, mov) => acc + mov, 0);
  let dislayformatbal = formattedBalance(income, accs.locale, accs.currency)
  incoming.textContent = `${dislayformatbal}`
  
  let out = accs.movements.filter(mov => mov < 0).reduce((acc, mov) => acc + mov, 0);
  let dislayout = formattedBalance(Math.abs(out), accs.locale, accs.currency)
  outgoing.textContent = `${dislayout}`
  
  let interestLoan = accs.movements.filter(mov => mov > 0).reduce((acc, mov) => acc + mov, 0) * accs.interestRate / 100;
  let dislayloan = formattedBalance(Math.abs(Math.trunc(interestLoan)), accs.locale, accs.currency)
  interest.textContent = `${dislayloan}`
  
}

let updateUI = function(acc){
  displayMovements(acc);

  displayBalance(acc);

  displaySummary(acc);
}



transferButton.addEventListener('click', function (e) {
  e.preventDefault();

  let transferToAccount = accounts.find(acc => {
    return transferAcc.value === acc.username;
  })

  console.log(transferToAccount)

  currentAccount.movementsDates.push(new Date().toISOString());
  transferToAccount.movementsDates.push(new Date().toISOString())

  if(+transferAmt.value > 0 && balance >= +transferAmt.value && transferAcc.value !== currentAccount.username && transferToAccount){
    currentAccount.movements.push(Number(-transferAmt.value));
    transferToAccount.movements.push(Number(transferAmt.value));
    // console.log('yes')
  }

  transferAcc.value = transferAmt.value = '';

  updateUI(currentAccount);
  
})

loanButton.addEventListener('click', function(e){
  e.preventDefault();
  if(currentAccount.movements.some(mov => mov >= +transferLoan.value * 0.1)){
    currentAccount.movements.push(Number(transferLoan.value));
  }

  currentAccount.movementsDates.push(new Date().toISOString())

  transferLoan.value = '';
  console.log(currentAccount.movements)

  updateUI(currentAccount)
});

closeButton.addEventListener('click', function(e){
  e.preventDefault();

  if(closeAcc.value === currentAccount.username && Number(closePin.value) === currentAccount.pin){
    let index = accounts.findIndex(acc => {
      return acc.username === closeAcc.value;
    })

    accounts.splice(index,1);
    app.style.opacity = 0;
    welcome.textContent = 'Login to get started';
    console.log(accounts)
    console.log(index)
  }

  closeAcc.value = closePin.value ='';
})



let sorted = false;
sortButton.addEventListener('click', function(){
  displayMovements(currentAccount, !sorted);
  sorted = !sorted;

})






console.log(Date.now())
console.log(new Date())

let now = new Date();
console.log(now.getDate())

let forDate = new Intl.DateTimeFormat('en-US', {
  hour: 'numeric',
  month: 'short',
  year: 'numeric',
  minute: 'numeric',
  second: 'numeric',
}).format(now)

console.log(forDate)

setInterval(() => {
  let forDate = new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    month: 'short',
    year: 'numeric',
    minute: 'numeric',
  }).format(now)
  
  // console.log(forDate)
},10000)

let inDate ="2020-01-28T09:15:04.904Z";
console.log(new Date("2020-01-28T09:15:04.904Z"))
let d1 = new Date();
let d2 = new Date(account1.movementsDates[6]);
console.log(Math.round((d1-d2)/(1000 * 60 * 60 * 24)))
console.log(d1)
console.log(d2)