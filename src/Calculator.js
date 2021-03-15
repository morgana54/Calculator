import React from 'react';
import './index.css'

const Display = ({result, currentEquation, wasEqualPressed, alert}) => {
  return (
    <div id="display" className='display'>
      {wasEqualPressed ? result : currentEquation}
      <div className='alert'>
      {alert}
      </div>
    </div>
  )
}

const Button = ({name, id, handleClick}) => {
  return (
    <button id={id} name={name} onClick={(e) => handleClick(e)}>{name}</button>
    
    );
}

const EqualsBtn = ({name, id, handleEqualsClick}) => {
  return (
    <button id={id} className="equals" name={name} onClick={() => handleEqualsClick()}>{name}</button>
    );
}

const AC = ({name, handleClearClick}) => {
  return (
    <button id="clear" className="ac" onClick={() => handleClearClick()}>{name}</button>
  )
}

const Calculator = () => {
  const [result, setResult] = React.useState(0)
  const [currentEquation, setCurrentEquation] = React.useState('')
  const [decimalCount, setDecimalCount] = React.useState(0)
  const [wasEqualPressed, setWasEqualPressed] = React.useState(false)
  const [alert, setAlert] = React.useState('')
 
  function handleClick(e)  {
    setWasEqualPressed(false)
    const input = e.target.name 
    // Prevent too long input
    if( currentEquation.length + input.length > 16) {
      // Display alert only when it's an empty string
      if(!alert) {
        // Display message for 5 seconds
        setAlert("DIGIT LIMIT EXCEEDED")
        setTimeout(() => setAlert(""), 2000)
      }
      return
    }
    return processEquation(currentEquation, input, setCurrentEquation, decimalCount, setDecimalCount)
  }

  function handleEqualsClick() {
    let len = currentEquation.length
    if(/[\/+*\-]/.test(currentEquation[len - 1])) {
      // prevent from equation to be accepted as result (ie. do nothing when the operator is the last char of equation)
      return
    } else {
      setResult(eval(currentEquation))
      setCurrentEquation(eval(currentEquation))
      setWasEqualPressed(true)
    }
  }

  function handleClearClick() {
    setResult(0)
    setCurrentEquation('')
    setDecimalCount(0)
    setAlert('')
  }

  return ( 
  <div className="container"> 
    <div className="calculator">
      <div style={{display: 'flex', boxSizing: "border-box"}}>
        <AC name='AC' handleClearClick={handleClearClick} id="clear"/>
        <Display result={result} alert={alert} currentEquation={currentEquation} wasEqualPressed={wasEqualPressed}/>
      </div>
      <Button id='one' name="1" handleClick={handleClick}/>
      <Button id='two' name="2" handleClick={handleClick}/>
      <Button id='three' name="3" handleClick={handleClick}/>
      <Button id='divide' name="/" handleClick={handleClick}/>
      <Button id='four' name="4" handleClick={handleClick}/>
      <Button id='five' name="5" handleClick={handleClick}/>
      <Button id='six' name="6" handleClick={handleClick}/>
      <Button id='multiply' name="*" handleClick={handleClick}/>
      <Button id='seven' name="7" handleClick={handleClick}/>
      <Button id='eight' name="8" handleClick={handleClick}/>
      <Button id='nine' name="9" handleClick={handleClick}/>
      <Button id='subtract' name="-" handleClick={handleClick}/>
      <Button id='zero' name="0" handleClick={handleClick}/>
      <Button id='decimal' name="." handleClick={handleClick}/>
      <EqualsBtn id='equals' name="=" handleEqualsClick={handleEqualsClick}/>
      <Button id='add' name="+" handleClick={handleClick}/>
    </div>
  </div>  
  
  );
}
// it also handles octal literals
function processEquation (curEq, input, setter, dcmCount, dcmSetter) {
  // Catch last number (before input is added do currentEquation)
  const lastNumberExpression = getLastNumber(curEq + input)
  // evaluate the value of current number (2nd condition) and if it's zero you just can't type more than one zero consecutively
  // 1st condition allows for a zero to be passed
  // console.log('lastNum: ' + lastNumberExpression)
  if(lastNumberExpression.length > 1 && parseInt(lastNumberExpression) === 0) {
    return
  } else if(lastNumberExpression[0] === '0') {
    setter(prevStr => {
      const lastNumBeforeInput = getLastNumber(curEq)
      if(lastNumBeforeInput === '0') {
        // cut out the whole substring without the zero at the end (so transform 123+3221*0 to 123+3221*) and then add input to it and return it
        return curEq.substr(0, curEq.length - 1) + input
      } else {
        // just perform standard concatenation
        return curEq + input
      }
    })
  } else if( curEq.length > 1 && curEq[curEq.length - 2] === '+' &&  curEq[curEq.length - 1] === '-' &&  /[\/+*]/.test(input)) {
    return
  }else if( curEq.length > 1 &&  !/[\/+*\-]/.test(curEq[curEq.length - 2])  && /[\/+*\-]/.test(curEq[curEq.length - 1]) && /[\/+*]/.test(input)) {
    // cut out the whole substring without the operator and replace it with the new one (ie. input) - except the minus operator
    setter(curEq.substr(0, curEq.length - 1) + input) 
  } else if(curEq[curEq.length - 1] === '-' && input === '-') {
    return
  } else if(/[\/+*\-]/.test(input)) {
    // reset count after each operator (so in every new number)
    dcmSetter(0)
    setter(prevStr => prevStr + input) 
  } else if(input === '.') {
    if(dcmCount > 0) {
      return
    }
    dcmSetter(prevCount => prevCount + 1)
    setter(prevStr => prevStr + input) 
  } else {
    setter(prevStr => prevStr + input) 
  }
}

function getLastNumber(equation) {
  // if current char is a number accumulate it to the whole string
  // else reset the accumulated string and start bulding it from empty string (so it will accumulate numbers only after the last operator!)
  return equation.split('').reduce(
    (acc, char) => /[0-9.]/.test(char) ? acc + char : '', '')
}
 
export default Calculator;

// TO-DO:
// - naprawić problem operatorów
// - jeśli result jest dłuższy niz 17 to zaokrągl go do 15 miejsc po przecinku, żeby nigdy nie wychodził poza kalkulator
// - zaimplementować Formula / Expression Logic jeśli to nie będzie mega długie do zrobienia (po prostu przed składaniem CV to rozwiniesz tak samo jak Drum Machine)
 
// podczas tego przypomnij sobie działania hooków, których się już nauczyłeś
// czytaj także równolegle dokumentacje "zaawansowane informacje"

// PLAN ZAWSZE: 1. określ komponenty (każdy ma mieć swoje osobne zadanie) 2. zbuduj wersję statyczną (komponenty bez stanu) 3. zacznij od tego najwyższego 4. zaimplementuj minimalną dynamikę (pamiętaj o tym, żeby mieć tylko te części stanu, które są crucial) 5.rozwijaj po kolei różne feeature'y
