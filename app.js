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

  //Defining DataStructues

  var data = {
    items:{
      inc:[],
      exp:[]
    },
    totals:{
      inc:0,
      exp:0
      }
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
    expenseContainer:'.expenses__list'
  }


  return {
    getInput: function() {

      return {
        type: document.querySelector(DOMstrings.inputType).value,                //inc or exp
        description: document.querySelector(DOMstrings.inputDescription).value,
        value: document.querySelector(DOMstrings.inputValue).value
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
              html =  '<div class="item clearfix" id="income-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'

        }else if(type === 'exp'){
            element = DOMstrings.expenseContainer;
            html =  '<div class="item clearfix" id="expense-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'
          }

          // replace placeholder text with real one

          //console.log(newHtml);
          newHtml = html.replace('%id%',obj.id);
          //console.log(newHtml);
          newHtml = newHtml.replace('%value%',obj.value);
          //console.log(newHtml);
          newHtml = newHtml.replace('%description%',obj.description);
          console.log(newHtml);

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
    }

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

  }


  var cltrAddItem = function() {
    var input,newIteml
    // 1. Get the field input
    input = UICltr.getInput();

    // 2. Add the item to the budget Controller
    newItem = budgetCltr.addItem(input.type,input.description,input.value);

    //3. Add the item to the UI

      UIController.addListItem(newItem,input.type)

    //4 .Clear fields
      UIController.clearFields();

    //5. Calculate the budget

    //6. Display the Budget on the UI

  }

  return {
    init:function(){
      console.log('App started');
      setUpEventListener();
    }
  }


})(budgetController, UIController)


Controller.init();
