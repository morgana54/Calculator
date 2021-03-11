import React from 'react';
import './index.css'

const Display = ({result, currentEquation, shouldEqual}) => {
  return (
    <div id="display" className='display'>
      {shouldEqual ? result : currentEquation}
    </div>
  )
}

const Button = ({name, id, handleClick}) => {
  return (
    <button id={id} name={name} onClick={(e) => handleClick(e)}>{name}</button>
    );
}

const ZeroBtn = ({name, id, handleClick}) => {
  return (
    // i tutaj dasz że jeśli count jest większy od 0 to wtedy po prostu zwrócisz null na onclick i się nie wykona nic!
    <button id={id} name={name} onClick={(e) => handleClick(e)}>{name}</button>
    );
}

const EqualsBtn = ({name, id, handleEqualsClick}) => {
  return (
    <button id={id} name={name} onClick={() => handleEqualsClick()}>{name}</button>
    );
}

const AC = ({name, handleClearClick}) => {
  return (
    <button id="clear" onClick={() => handleClearClick()}>{name}</button>
  )
}

const Calculator = () => {
  const [result, setResult] = React.useState(0)
  const [currentEquation, setCurrentEquation] = React.useState('')
  const [decimalCount, setDecimalCount] = React.useState(0)
  const [shouldEqual, setShouldEqual] = React.useState(false)
 
  function handleClick(e)  {
    setShouldEqual(false)
    const input = e.target.name 
    // console.log('curEq: ' + currentEquation, 'last: ' + currentEquation[currentEquation.length - 1])
    return processEquation(
      currentEquation, input, setCurrentEquation, decimalCount, setDecimalCount)
  }

  function handleEqualsClick() {
    // debugger;
    let len = currentEquation.length
    let tempEq = ''
    if(/[\/+*\-]/.test(currentEquation[len - 1])) {
      return;
      // tempEq = currentEquation.substr(0, len - 1)
      // // console.log(tempEq)
      // setResult(eval(tempEq))
      // setCurrentEquation(eval(tempEq))
    } else {
      setResult(eval(currentEquation))
      setCurrentEquation(eval(currentEquation))
      setShouldEqual(true)
    }
  }

  function handleClearClick() {
    setResult(0)
    setCurrentEquation('')
    setDecimalCount(0)
  }

  return ( 
  <div>
    <Button id='one' name="1" handleClick={handleClick}/>
    <Button id='two' name="2" handleClick={handleClick}/>
    <Button id='three' name="3" handleClick={handleClick}/>
    <Button id='four' name="4" handleClick={handleClick}/>
    <Button id='five' name="5" handleClick={handleClick}/>
    <Button id='six' name="6" handleClick={handleClick}/>
    <Button id='seven' name="7" handleClick={handleClick}/>
    <Button id='eight' name="8" handleClick={handleClick}/>
    <Button id='nine' name="9" handleClick={handleClick}/>
    <ZeroBtn id='zero' name="0" handleClick={handleClick}/>
    <Button id='decimal' name="." handleClick={handleClick}/>
    <Button id='add' name="+" handleClick={handleClick}/>
    <Button id='subtract' name="-" handleClick={handleClick}/>
    <Button id='multiply' name="*" handleClick={handleClick}/>
    <Button id='divide' name="/" handleClick={handleClick}/>
    <EqualsBtn id='equals' name="=" handleEqualsClick={handleEqualsClick}/>
    <Display result={result} currentEquation={currentEquation} shouldEqual={shouldEqual}/>
    <AC name='AC' handleClearClick={handleClearClick} id="clear"/>
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
  } else if(/[\/+*\-]/.test(curEq[curEq.length - 1]) && /[\/+*]/.test(input)) {
    // cut out the whole substring without the operator and replace it with the new one (ie. input) - except the minus operator
    setter(curEq.substr(0, curEq.length - 1) + input) 
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
// - rozwiązać problem z testem 16 (czyli zmodyfikować / rozwinąć wpisywanie operatorów)
// - zaimplementować Formula / Expression Logic jeśli to nie będzie mega długie do zrobienia (jeśli tak to po prostu przed składaniem CV to rozwiniesz tak samo jak Drum Machine)
 
// podczas tego przypomnij sobie działania hooków, których się już nauczyłeś
// czytaj także równolegle dokumentacje "zaawansowane informacje"

// PLAN ZAWSZE: 1. określ komponenty (każdy ma mieć swoje osobne zadanie) 2. zbuduj wersję statyczną (komponenty bez stanu) 3. zacznij od tego najwyższego 4. zaimplementuj minimalną dynamikę (pamiętaj o tym, żeby mieć tylko te części stanu, które są crucial) 5.rozwijaj po kolei różne feeature'y

// PYTANIE DO KACPERRA: czy worth jest podejście, że styluje się na końcu? czy to różnie bywa