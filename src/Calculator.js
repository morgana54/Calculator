import React, { useEffect, useState } from 'react';
import './index.css'

const Formula = ({currentEquation}) => {
  return (
    <div>
      {currentEquation}
    </div>
  )
}

const Result = ({result}) => {
  return (
    <div id='display' className='display'>
      {result}
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


// {power ? handleBankSwitch : null}

const EqualsBtn = ({name, id, handleEqualsClick}) => {
  return (
    <button id={id} name={name} onClick={() => handleEqualsClick()}>{name}</button>
    );
}

const AC = ({name, handleClearClick}) => {
  return (
    <button onClick={() => handleClearClick()}>{name}</button>
  )
}

const Calculator = () => {
  const [result, setResult] = React.useState(0)
  const [currentEquation, setCurrentEquation] = React.useState('')

  function handleClick(e)  {
    const input = e.target.name 
    return processEquation(currentEquation, input, setCurrentEquation)
  }

  function handleEqualsClick() {
    setResult(eval(currentEquation))
  }

  function handleClearClick() {
    setResult(0)
    setCurrentEquation('')
  }

  return ( 
  <div>
    <Button id='one' name="1" handleClick={handleClick}/>
    <Button id='two' name="2" handleClick={handleClick}/>
    <Button id='thre' name="3" handleClick={handleClick}/>
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
    <Result result={result}/>
    <Formula currentEquation={currentEquation} />
    <AC name='AC' handleClearClick={handleClearClick}/>
  </div>
  );
}

function processEquation (curEq, input, setter) {
// it handles octal literals
// Catch last number (before input is added do currentEquation)
const lastNumberExpression = getLastNumber(curEq + input)

  // evaluate the value of current number (2nd condition) and if it's zero you just can't type more than one zero consecutively
  // 1st condition allows for a zero to be passed
  if(lastNumberExpression.length > 1 && parseInt(lastNumberExpression) === 0) {
    return
  } else if(lastNumberExpression[0] === '0') {
    setter(prevStr => {
      // tutaj wywołasz potencjalnie handle octal
      const lastNumBeforeInput = getLastNumber(curEq)

      if(lastNumBeforeInput === '0') {
        // cut out the whole substring without the zero at the end (so transform 123+3221*0 to 123+3221*) and then add input to it and return it
        return curEq.substr(0, curEq.length - 1) + input
      } else {
        // just perform standard concatenation
        return curEq + input
      }
    })
  } else {
    setter(prevStr => prevStr + input) 
  }
}

function getLastNumber(equation) {
  return equation.split('').reduce(
    // if current char is a number accumulate it to the whole string
    // else reset the accumulated string and start bulding it from empty string (so it will accumulate numbers only after the last operator!)
    (acc, char) => /[0-9]/.test(char) ? acc + char : '', '')
}

 
export default Calculator;

// TO-DO:
// - tylko jeden decimal point żeby można było wprowadzić w całej liczbie
// - ogarnij żeby można było wpisać liczbę 2.0004 lub 2.03 (żeby po kropce też można było wpisać zera!!)
// - jedne operatory i user story #13
// - user story #14
// - user story #15
// - zaimplementować Formula / Expression Logic jeśli to nie będzie mega długie do zrobienia (jeśli tak to po prostu przed składaniem CV to rozwiniesz tak samo jak Drum Machine)
 
// podczas tego przypomnij sobie działania hooków, których się już nauczyłeś
// czytaj także równolegle dokumentacje "zaawansowane informacje"

// PLAN ZAWSZE: 1. określ komponenty (każdy ma mieć swoje osobne zadanie) 2. zbuduj wersję statyczną (komponenty bez stanu) 3. zacznij od tego najwyższego 4. zaimplementuj minimalną dynamikę (pamiętaj o tym, żeby mieć tylko te części stanu, które są crucial) 5.rozwijaj po kolei różne feeature'y

// PYTANIE DO KACPERRA: czy worth jest podejście, że styluje się na końcu? czy to różnie bywa