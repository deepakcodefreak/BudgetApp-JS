var budgetController = (function(){
  let a = 23;

  var add  = function(x){
    return x+a;
  }

  return {
    publicTest:function(b){
      return add(b);
    }
  }

})();

var UIController = (function(){
  // Some Code...
})();

var Controller = (function(budgetCltr,UICltr){


    return {
      anotherPublic:function(a){
        var z = budgetCltr.publicTest(a);
        return z;
      }
    }

})(budgetController,UIController)
