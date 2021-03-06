import React, { useEffect, useState } from 'react';
import './index.css'

const Button = ({name, id, handleClick}) => {
  return (
    <button id={id} name={name} onClick={(e) => handleClick(e)}>{name}</button>
    );
}
const EqualsBtn = ({name, id, handleEqualsClick}) => {
  return (
    <button id={id} name={name} onClick={() => handleEqualsClick()}>{name}</button>
    );
}

const Result = ({result}) => {
  return (
    <div id='display' className='display'>
      {result}
    </div>
  )
}

const AC = ({name, handleClearClick}) => {
  return (
    <button onClick={() => handleClearClick()}>{name}</button>
  )
}

const Formula = ({currentEquation}) => {
  return (
    <div>
      {currentEquation}
    </div>
  )
}

const Calculator = () => {
  const [result, setResult] = React.useState(0)
  const [currentEquation, setCurrentEquation] = React.useState('')


  function handleClick(e) {
    let input = e.target.name  
    setCurrentEquation(prev => prev + input) 
  }

  function handleEqualsClick() {
    setResult(eval(currentEquation))
    console.log(2)  
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
    <Button id='zero' name="0" handleClick={handleClick}/>
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

// TERAZ technikalia typu typ float itp. itd. lub user story #13

// podczas tego przypomnij sobie działania hooków, których się już nauczyłeś
// czytaj także równolegle dokumentacje "zaawansowane informacje"

// PLAN ZAWSZE: 1. określ komponenty (każdy ma mieć swoje osobne zadanie) 2. zbuduj wersję statyczną (komponenty bez stanu) 3. zacznij od tego najwyższego 4. zaimplementuj minimalną dynamikę (pamiętaj o tym, żeby mieć tylko te części stanu, które są crucial) 5.rozwijaj po kolei różne feeature'y

// PYTANIE DO KACPERRA: czy worth jest podejście, że styluje się na końcu? czy to różnie bywa




