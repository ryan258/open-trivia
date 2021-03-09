const title = document.querySelector('h1')
const mainContainer = document.querySelector('.main-container')
const questionContainer = document.querySelector('.question-container')
const answerContainer = document.querySelector('.answer-container')
const overlayContainer = document.querySelector('.overlay-container')
const questionCountInput = document.querySelector('.question-count-input')
const startButton = document.querySelector('.start-button')

const baseURL = `https://opentdb.com/api.php?`

// Game states
const gameState = {
  questions: [],
  currentQuestion: 0
}

window.addEventListener('DOMContentLoaded', (e) => {
  questionCountInput.defaultValue = 5
})

startButton.addEventListener('click', (e) => {
  overlayContainer.style.display = 'none'
  questionContainer.textContent = 'princess is in another castle'
  const queryURL = `${baseURL}amount=${questionCountInput.value}`
  // console.log(queryURL)
  getQuestions(queryURL)
})

function getQuestions(url) {
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      console.log(data)
      gameState.questions = data.results
      displayQuestion()
    })
}

function displayQuestion() {
  questionContainer.innerHTML = ''
  answerContainer.innerHTML = ''
  let question = gameState.questions[gameState.currentQuestion]
  gameState.currentQuestion++
  console.log(question)
  questionContainer.innerHTML = question.question

  // build array of answers
  let answers = [...question.incorrect_answers, question.correct_answer]
  console.log(answers)
  answers.forEach((answer) => {
    const answerButton = document.createElement('button')
    answerButton.textContent = answer
    answerButton.addEventListener('click', (e) => {
      if (answer === question.correct_answer) {
        alert('nailed it!')
      } else {
        alert('sorry Mario, the princess is in another castle')
      }

      nextQuestion()
    })
    answerContainer.append(answerButton)
  })
}

function nextQuestion() {
  const nextQuestionButton = document.createElement('button')
  nextQuestionButton.innerHTML = 'next question!'
  nextQuestionButton.addEventListener('click', displayQuestion)
  answerContainer.append(nextQuestionButton)
}
