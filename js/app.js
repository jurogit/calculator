(function() {

// calculator object 'constructor' function
function Calculator(displayID) {
  this.displayID = displayID;
  this.operationArray = [];
}

Calculator.prototype.updateDisplay = function() {
  document.getElementById(this.displayID).innerText = this.operationArray.join('');
};

/* *************************************************************************
Calculator.prototype.handleNumber = function(number) {
  // if the last item in the array is not a number
  if(isNaN(this.operationArray[this.operationArray.length - 1])) {
    this.operationArray.push(number.toString());
  } else {
    this.operationArray[this.operationArray.length - 1] += number.toString();
  }
  this.updateDisplay();
};
************************************************************************* */

Calculator.prototype.addToLast = function(input) {
  this.operationArray[this.operationArray.length - 1] += input;
};

Calculator.prototype.getLastItem = function() {
  return this.operationArray[this.operationArray.length - 1];
};

// updated number handler
Calculator.prototype.handleNumber = function(number) {
  if (isNaN(this.getLastItem())) {
    this.operationArray.push(number.toString());
  } else {
    this.addToLast(number.toString());
  }
  console.log('operationArray:', this.operationArray);
  
  this.updateDisplay();
};


Calculator.prototype.handleOperator = function(operator) {
  // if the last item in the array is a number
  if (!isNaN(this.getLastItem())) {
    if (operator === '.') {
      var isInteger = this.getLastItem().toString().indexOf('.') === -1;
      console.log('is Integer:', isInteger);
      if (isInteger) {
        this.addToLast(operator);
      }
    } else {
      this.operationArray.push(operator);
    }
  }
  console.log('--------------------------------------');
  console.log('operationArray:', this.operationArray);
  console.log('opArr last item:', this.getLastItem());
  console.log('opArr last item is number:', !isNaN(this.getLastItem()));
  
  this.updateDisplay();
};

/* *************************************************************************
Calculator.prototype.handleOperator = function(operator) {
  if (!isNaN(this.getLastItem())) {
    if (operator === '.') {
      this.addToLast(operator);
    } else {
      this.operationArray.push(operator);
    }
  }
  this.updateDisplay();
};
************************************************************************* */

Calculator.prototype.allClear = function() {
  this.operationArray = [];
  this.updateDisplay();
};

Calculator.prototype.clearEntry = function() {
  this.operationArray[this.operationArray.length - 1] = this.getLastItem().toString().slice(0, -1);
  if (this.getLastItem().length < 1) {
    this.operationArray.pop();
  }
  this.updateDisplay();
};

Calculator.prototype.getTotal = function() {
  if (isNaN(this.getLastItem())) {
    this.operationArray.pop();
  }
  var total = math.round(math.eval(this.operationArray.join('')), 15);
  this.operationArray = [total];
  console.log('operationArray:', this.operationArray);
  this.updateDisplay();
};

var fccCalculator = new Calculator('display');

document.getElementById('ac').addEventListener('click', function() {
  fccCalculator.allClear();
});

document.getElementById('ce').addEventListener('click', function() {
  fccCalculator.clearEntry();
});

document.getElementById('=').addEventListener('click', function() {
  fccCalculator.getTotal();
});

var operatorControls = document.getElementsByClassName('operator'),
    numberControls = document.getElementsByClassName('number'),
    opCtrlsLength = operatorControls.length,
    numCtrlsLength = numberControls.length,
    i;

function handleOperatorCallback() {
  fccCalculator.handleOperator(this.getAttribute('id'));
}

function handleNumberCallback() {
  fccCalculator.handleNumber(this.getAttribute('id'));
}

for (i = 0; i < opCtrlsLength; i += 1) {
  operatorControls[i].addEventListener('click', handleOperatorCallback);
}

for (i = 0; i < numCtrlsLength; i += 1) {
  numberControls[i].addEventListener('click', handleNumberCallback);
}

window.onkeyup = function(evt) {
  console.log('--------------------------------------');
  console.log(evt);
  console.log('key:', evt.key);
  console.log('keyCode', evt.keyCode);
  evt.preventDefault();
  var key = evt.keyCode ? evt.keyCode : evt.which;
 
  if (key >= 48 && key <= 57) {
    fccCalculator.handleNumber(key - 48);
  } else if (key === 107) {
    fccCalculator.handleOperator('+');
  } else if (key === 109) {
    fccCalculator.handleOperator('-');
  } else if (key === 106) {
    fccCalculator.handleOperator('*');
  } else if (key === 111) {
    fccCalculator.handleOperator('/');
  } else if (key === 110) {
    fccCalculator.handleOperator('.');
  } else if (key === 8) {
    fccCalculator.clearEntry();
  } else if (key === 46) {
    fccCalculator.allClear();
  } else if (key === 13) {
    fccCalculator.getTotal();
  }
};
  
}());