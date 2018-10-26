//Data Controller

var budgetController = (function(){
// Some code
})();




//UI Controller
var UIController = (function(){
  // Some Code...
})();




//App Controller
var Controller = (function(budgetCltr,UICltr){

  var cltrAddItem = function(){

        // 1. Get the field input

        // 2. Add the item to the budget Controller

        //3. Add the item to the UI

        //4. Calculate the budget

        //5. Display the Budget on the UI
          console.log('it works');
  }

  document.querySelector('.add__btn').addEventListener('click',cltrAddItem);


  document.addEventListener('keypress',function(event){

      if (event.keyCode === 13 || event.which === 13) {
        cltrAddItem();
      }

  })




})(budgetController,UIController)
