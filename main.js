const calculator = document.querySelector('.calculator');
const display = document.querySelector('#output');
const container = document.querySelector('#container');
const mode = document.querySelector("#mode");

container.addEventListener('click',(event)=>{
    if(event.target.matches('button')){
        const key = event.target;
        const action = key.dataset.action;
        const displayedNum = display.textContent;
        const keyContent = key.textContent;
        const previousKeyType = calculator.dataset.previousKeyType;
        Array.from(key.parentNode.children).forEach(k=>k.classList.remove('is-depressed'));
       
        if(!action){
            if(displayedNum === "0"||previousKeyType==="operator" ){
                display.textContent = keyContent;
            }
            else{
                display.textContent = displayedNum + keyContent ;
            }
            calculator.dataset.previousKeyType = 'number';
        }
        if(action==='add'||
        action==='subtract'||
        action==='multiply'||
        action==='divide'){
        

            const firstValue = calculator.dataset.firstValue;
            const secondValue = displayedNum;
            const operator = calculator.dataset.operator;
            
            if(firstValue && operator && previousKeyType!=='operator' && previousKeyType!=='calculate'){
                let value = calculate(firstValue,secondValue,operator);
                display.textContent = value;
                calculator.dataset.firstValue = value;
            }
            else{
                calculator.dataset.firstValue = displayedNum;
            }

            key.classList.add('is-depressed')
            calculator.dataset.previousKeyType = "operator";
            calculator.dataset.operator = action;
            calculator.dataset.firstValue = displayedNum;
        }

        if(action==='decimal'){
            if(!displayedNum.includes(".")){
                display.textContent = displayedNum + ".";
            }
            calculator.dataset.previousKeyType = "decimal";
        }

        if(action==='calculate'){           
            const secondValue = display.textContent;
            let firstValue = calculator.dataset.firstValue;
            const operator = calculator.dataset.operator;
            
            if(firstValue){
                if(previousKeyType==="calculator"){
                    firstValue = displayedNum;
                    secondValue = calculator.dataset.modValue;
                }
                display.textContent = calculate(firstValue,secondValue,operator);

                
            }
            calculator.dataset.modValue = secondValue;
            calculator.dataset.previousKeyType = 'calculate';
        }





        if(action==='clear'){
            display.textContent="0";
            if(key.textContent==='AC'){
               calculator.dataset.operator = "";
               calculator.dataset.firstValue="";
               calculator.dataset.modValue = "";
               calculator.dataset.previousKeyType="";
            }
            else{
                key.textContent ="AC";
            }
            
            calculator.dataset.previousKeyType = "clear";
        }
        if(action!=='clear'){
            const clear = document.querySelector('#clear');
            clear.textContent = "CE";
            
        }

    }
});

function calculate(first,second,operator){
   if(operator==="add"){
       return parseFloat(first) + parseFloat(second);
   }
   if(operator==="subtract"){
    return parseFloat(first) - parseFloat(second);
   }
   if(operator==="multiply"){
    return parseFloat(first) * parseFloat(second);
   }
   if(operator==="divide"){
    return parseFloat(first) / parseFloat(second);
  }
}




mode.addEventListener('click',(event)=>{
    const mainContainer = document.querySelector('#mainContainer');
    const result = document.querySelector("#output");

    
    
    if(mode.className=="simple"){
          mode.setAttribute("class","dark");
          mode.innerHTML='<i class="fas fa-moon"></i>';

          mainContainer.setAttribute("class","mainContainer")
          result.setAttribute("class","result")
          container.setAttribute("class","container")

      }
      else{
        mode.setAttribute("class","simple");
        mode.innerHTML='<i class="fas fa-sun">';
        mainContainer.setAttribute("class","mainContainerLight")
        result.setAttribute("class","resultLight")
        container.setAttribute("class","containerLight")

       
      }
})
