let display=document.getElementById('display');
let currentInput='0';
let shouldResetDisplay=false;

function updateDisplay(isError= false){
    display.textContent=currentInput;
    if(isError){
        display.classList.add("error");
    }
    else{
        display.classList.remove("error");
    }
}
function appendToDisplay(value){
    if(shouldResetDisplay){
        currentInput='';
        shouldResetDisplay=false;
    }
    if(currentInput==='0' && value!=='.'){
        currentInput=value;
    }
    else{
        currentInput+=value;
    }
    updateDisplay();
}
function clearDisplay(){
    currentInput='0';
    shouldResetDisplay=false;
    updateDisplay();
}
function deleteLast(){
    if(currentInput.length>1){
        currentInput=currentInput.slice(0,-1);
    }
    else{
        currentInput='0';
    }
    updateDisplay();
}

function calculate(){
    try{
        let expression= currentInput.replace(/x/g,'*').replace(/÷/g,'/');
        if(!/^[0-9+\-*/.()]+$/.test(expression)) throw new Error();
        let result=eval(expression);
        if(isNaN(result) || !isFinite(result)) throw new Error();
        currentInput=result.toString();
        shouldResetDisplay=true;
        updateDisplay();
    }
    catch{
        currentInput='Oops! Invalid input';
        shouldResetDisplay=true;
        updateDisplay(true);
    }
}

document.addEventListener('keydown',(event)=>{
        const key = event.key;
        if (/[0-9]/.test(key)) appendToDisplay(key);
        else if (['+', '-', '*', '/','.'].includes(key)) appendToDisplay(key);
        else if (key === 'Enter' || key === '=') calculate();
        else if (key === 'Escape') clearDisplay();
        else if (key === 'Backspace') deleteLast();
});