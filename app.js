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
        var newItem = new Income(ID,description,value);
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
    inputBtn: '.add__btn'
  }


  return {
    getInput: function() {

      return {
        type: document.querySelector(DOMstrings.inputType).value, //inc or exp
        description: document.querySelector(DOMstrings.inputDescription).value,
        value: document.querySelector(DOMstrings.inputValue).value
      }

    },

    getDOMstrings: function() {
      return DOMstrings;
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

    // 1. Get the field input
    var input = UICltr.getInput();

    // 2. Add the item to the budget Controller
    var newItem = budgetCltr.addItem(input.type,input.description,input.value);



    //3. Add the item to the UI

    //4. Calculate the budget

    //5. Display the Budget on the UI

  }

  return {
    init:function(){
      console.log('App started');
      setUpEventListener();
    }
  }


})(budgetController, UIController)


Controller.init();
