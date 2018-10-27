//Data Controller

var budgetController = (function() {

  var Expenses = function(id,description,value) {
    this.id = id;
    this.description = description;
    this.value = value;
  }

  var Income = function(id,description,value) {
    this.id = id;
    this.description = description;
    this.value = value;
  }

  var calTotal = function(type){
      var sum = 0;

      data.items[type].forEach(function(current){
        sum = sum + current.value;
      })

      data.totals[type] = sum;
  }

  //Defining DataStructues

  var data = {
    items:{
      inc:[],
      exp:[]
    },
    totals:{
      inc:0,
      exp:0
    },
    budget:0,
    percentage:-1,
  }

return {
  addItem: function(type,description,value){

      var ID;

      //create new id
      if (data.items[type].length > 0) {
          ID = data.items[type][data.items[type].length-1].id+1;
      }else{
        ID = 0;
      }


        // create new item based on type -- inc or exp
      if (type === 'inc') {
        var newItem = new Income(ID,description,value);
      }else if(type === 'exp'){
        var newItem = new Expenses(ID,description,value);
      }

      //push data to the DataStructues
      data.items[type].push(newItem);

      //Return the newItem
      return newItem;

  },

  calculateBudget : function(){

    // calculate  total income and total expenses__list
        calTotal('inc');
        calTotal('exp');

    // calculate total budget  = income  - expense
          data.budget = data.totals['inc'] - data.totals['exp'];

    // calculate percentage of income that much we have spend
      if (data.totals.inc > 0) {
        data.percentage = Math.round((data.totals.exp/data.totals.inc)*100);
      }else {
        data.percentage = -1;
      }

  },
  getBudget: function(){

      return {
        budget: data.budget,
        totalInc: data.totals.inc,
        totalExp: data.totals.exp,
        percentage: data.percentage
      }

  },

  testing: function(){
    console.log(data);
  }
}








})();






//UI Controller
var UIController = (function() {

  var DOMstrings = {
    inputType: '.add__type',
    inputDescription: `.add__description`,
    inputValue: '.add__value',
    inputBtn: '.add__btn',
    incomeContainer:'.income__list',
    expenseContainer:'.expenses__list',
    budgetLabel:'.budget__value',
    incomeLabel:'.budget__income--value',
    expenseLable:'.budget__expenses--value',
    percentageLabel:'.budget__expenses--percentage',
    container:'.container',


  }


  return {
    getInput: function() {

      return {
        type: document.querySelector(DOMstrings.inputType).value,                //inc or exp
        description: document.querySelector(DOMstrings.inputDescription).value,
        value:  parseFloat(document.querySelector(DOMstrings.inputValue).value)
      }

    },

    getDOMstrings: function() {
      return DOMstrings;
    },

    addListItem: function(obj,type){
        var html,newHtml,element;

          //create HTML string with placeholder text
          if (type === 'inc') {
            element = DOMstrings.incomeContainer;
              html =  '<div class="item clearfix" id="inc-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'

        }else if(type === 'exp'){
            element = DOMstrings.expenseContainer;
            html =  '<div class="item clearfix" id="exp-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'
          }

          // replace placeholder text with real one

          newHtml = html.replace('%id%',obj.id);
          newHtml = newHtml.replace('%value%',obj.value);
          newHtml = newHtml.replace('%description%',obj.description);

          // Inert the HTML into DOM

        document.querySelector(element).insertAdjacentHTML('beforeend',newHtml);

    },
    clearFields:function(){
        var fields,fieldsArr;

        fields = document.querySelectorAll(DOMstrings.inputValue + ',' + DOMstrings.inputDescription);
        fieldsArr = Array.prototype.slice.call(fields);

        fieldsArr.forEach(function(current,index,array){
          current.value = '';
        })
      fieldsArr[0].focus();
    },

   displayBudget:function(obj){

     document.querySelector(DOMstrings.budgetLabel).textContent = obj.budget;
     document.querySelector(DOMstrings.incomeLabel).textContent = obj.totalInc;
     document.querySelector(DOMstrings.expenseLable).textContent = obj.totalExp;

      if (obj.percentage > 0) {
        document.querySelector(DOMstrings.percentageLabel).textContent = obj.percentage + '%';
      }else {
        document.querySelector(DOMstrings.percentageLabel).textContent = '----'
      }

    },

  }

})();




//App Controller
var Controller = (function(budgetCltr, UICltr) {

  var setUpEventListener = function(){
    var DOM = UICltr.getDOMstrings();

    document.querySelector(DOM.inputBtn).addEventListener('click', cltrAddItem);

    document.addEventListener('keypress', function(event) {

      if (event.keyCode === 13 || event.which === 13) {
        cltrAddItem();
      }
    })


    document.querySelector(DOM.container).addEventListener('click',cltrDeleteItem);


  }

  var updateBudget = function(){
    var budget;

    // 1. Calculate the budget
      budgetCltr.calculateBudget();

    // 2. Return the budget
    budget = budgetCltr.getBudget();
    console.log(budget);

    // 3. Display the budget on UI
    UICltr.displayBudget(budget);


  }


  var cltrAddItem = function() {
    var input,newIteml
    // 1. Get the field input
    input = UICltr.getInput();

    if (input.description !== "" && !isNaN(input.value) && input.value > 0 ) {

          // 2. Add the item to the budget Controller
          newItem = budgetCltr.addItem(input.type,input.description,input.value);

          //3. Add the item to the UI

            UIController.addListItem(newItem,input.type)

          //4 .Clear fields
            UIController.clearFields();

          // 5. Calculate and update budget
              updateBudget();

    }


  }


  var cltrDeleteItem = function(event){
    var itemID,splitID,Id,type;

    itemID = event.target.parentNode.parentNode.parentNode.parentNode.id;

    if (itemID) {

      splitID = itemID.split('-');
      type = splitID[0];
      Id = splitID[1];

    }
    //1. Dalete the item from tha DS

    //2. Delete the item from the UI

    //3. update the budget and Display the new Budget...


  }


  return {
    init:function(){
      console.log('App started');
      UICltr.displayBudget({
        budget:0,
        totalInc:0,
        totalExp:0,
        percentage:-1
      })

      setUpEventListener();
    }
  }


})(budgetController, UIController)


Controller.init();
