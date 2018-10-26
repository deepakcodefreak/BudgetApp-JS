//Data Controller

var budgetController = (function() {
  // Some code
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
    console.log(input);
    // 2. Add the item to the budget Controller

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
