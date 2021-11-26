import React from 'react'
import styled from '@emotion/styled'
import { css, keyframes } from '@emotion/react'

const animateWordEntry = (color: string) => keyframes`
  0% {
    color: ${color};
    opacity: 0;
    transform: translateY(8px);
  }
  33% {
    transform: translateY(0px);
  }
  66% {
    opacity: 1;
  }
  100% {
    color: black;
  }
`

function animateSpan(color: string) {
  return css`
    display: inline-block;
    animation-name: ${animateWordEntry(color || 'cyan')};
    animation-duration: 900ms;
    animation-timing-function: ease;
  `
}

const Container = styled.div`
  background: white;
  width: 100vw;
  max-width: 400px;
  height: 90vh;
  overflow-y: scroll;

  .cyan {
    ${animateSpan('cyan')};
  }

  .magenta {
    ${animateSpan('magenta')};
  }

  .yellow {
    ${animateSpan('yellow')};
  }
`

function getRandomColor() {
  const colors = ['cyan', 'magenta', 'yellow']
  const random = Math.floor(Math.random() * colors.length)
  return colors[random]
}

function App() {
  function addWord(newWord: string) {
    const lastParagraph = document.getElementById('container')?.lastChild
    const span = document.createElement('span')
    span.classList.add(getRandomColor())
    const text = document.createTextNode(newWord)
    span.append(text)
    lastParagraph && lastParagraph.appendChild(span)
  }

  function handleAddWords(newWords: string) {
    const newWordsArray = newWords.split(' ')
    newWordsArray.forEach((newWord, index) => {
      const space = index === 0 ? '' : '\u00A0'
      setTimeout(() => addWord(`${space}${newWord}`), 50 * index)
    })
  }

  return (
    <>
      <Container id="container">
        <p></p>
      </Container>
      <button onClick={() => handleAddWords('This is a test.\u00A0')}>
        Add Word
      </button>
    </>
  )
}

export default App
