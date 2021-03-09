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
    // Catch last number (before input is added do currentEquation)
    const lastNumberExpression = (currentEquation + input).split('').reduce(
      // if current char is a number accumulate it to the whole string
      // else reset the accumulated string and start bulding it from empty string
      // it's all about evaluating the value of current number and if (in condition below) it's zero you just can't type more than one zero consecutively
      (acc, char) => /[0-9]/.test(char) ? acc + char : '', '')
    // ignore input concatenation when value of last number (eg. 123 or 010)

    // console.log(lastNumberExpression[0], lastNumberExpression, currentEquation)
    if(lastNumberExpression.length > 1 && parseInt(lastNumberExpression) === 0) {
      return
    } else if(lastNumberExpression[0] === '0') {
      setCurrentEquation(prevStr => {
        // tutaj wywołasz potencjalnie handle octal

        // PROBLEM: musisz usuwać zero z last number w current equation (prev str)!!, a nie z samego początku tylko (ALE DLA PIERWSZEJ LICZBY TO DZIAŁA WIĘC GIT)

        // musisz odzwierciedlić to:
        // na chwilę oddzielasz last number i dzielisz currentquation na dwa stringi, potem odcinasz to zero z początku i potem joinujesz te dwa arraye i wtedy jestes w domu --> jak nie bedziwsz wiedzial dokladnych metod jakich użyć to spytaj kacperra o metodę ktora robi daną rzecz

        // --> dzielisz na arraye stringów co operator split(/)
        const tempArr = prevStr.split(/[\\/*\-+]/)
        // cut out the zero at the beginning
        const lastNumInTempArr = tempArr[tempArr.length - 1].slice(1, tempArr[tempArr.length - 1].length)

        // console.log('1: ' + tempArr)
        // console.log(lastNumInTempArr)
        // console.log(tempArr.splice((tempArr.length - 1), 1, lastNumInTempArr))
        // console.log(prevStr)
        // console.log(tempArr)
        // tempArr.shift()
        console.log(lastNumInTempArr)
        return prevStr.replace('0' + lastNumInTempArr, lastNumInTempArr) + input
        // return tempArr.join('') + input
      })
    } else {
      setCurrentEquation(prevStr => prevStr + input) 
    }

    // Concatenate input to current equation

    // pomysł: bierzesz całego stringa last NUmber expression i jeśli zero jest na początku i jego długość jest większa niż jeden to po prostu usuwasz to zero z początku!! jakoś slice itp. użyjesz pewnie

    // potem ją napiszesz poza komponentami, ale masz ją tutaj bliżej żeby łatwiej ją było pisać
    // TO JEST OPCJONALNE, żeby ładniej wyglądało, ale nie musisz spędzać nad tym za wiele czasu
    function handleOctalLiteral () {
  
    }
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
 
export default Calculator;

// TO-DO:
// - nadpisania zera jeśli było ono na początku a liczba jest więcej niż jedno-cyfrowa (czyli NIE może być np. 12+034, 010+010 tylko 12+34 albo 12+0 i 10+10)
// - jedne operatory i user story #13
 
// podczas tego przypomnij sobie działania hooków, których się już nauczyłeś
// czytaj także równolegle dokumentacje "zaawansowane informacje"

// PLAN ZAWSZE: 1. określ komponenty (każdy ma mieć swoje osobne zadanie) 2. zbuduj wersję statyczną (komponenty bez stanu) 3. zacznij od tego najwyższego 4. zaimplementuj minimalną dynamikę (pamiętaj o tym, żeby mieć tylko te części stanu, które są crucial) 5.rozwijaj po kolei różne feeature'y

// PYTANIE DO KACPERRA: czy worth jest podejście, że styluje się na końcu? czy to różnie bywa




