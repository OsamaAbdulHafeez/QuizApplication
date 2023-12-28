const superMain = document.getElementById('superMain')
const dropDown = document.querySelector('.dropDown')
const UserName = document.getElementById('UserName')
const startQuiz = document.querySelector('.startQuiz')
// Question Quiz
const Question = document.getElementById('Question')
const opt1 = document.getElementById('opt1')
const opt2 = document.getElementById('opt2')
const opt3 = document.getElementById('opt3')
const opt4 = document.getElementById('opt4')
// Result Variables
const percen = document.getElementById('percen')
const result = document.getElementById('result')
const congrtulation = document.getElementById('congrtulation')
const circle = document.querySelector('circle')
const quiznme = document.getElementById('quiznme')
const totQuesNum = document.getElementById('totQues').childNodes[3]
const corQues = document.getElementById('corQues').childNodes[3]
// console.log(TotalQuestion)
// LoginUser
const LoginUser = JSON.parse(localStorage.getItem('LoginUser'))
if (!LoginUser) {
    window.location.href = '../login/index.html'
}
const heading = document.querySelector('.heading')
const QuizesHTML = document.querySelector('.Quizes')
UserName.textContent = LoginUser.username
heading.childNodes[1].childNodes[1].textContent = LoginUser.username
// NavBar DropDown
var a;
const dropdown = () => {
    if (a == 1) {
        dropDown.style.display = "none";
        a = 0
    }
    else {
        dropDown.style.display = "block";
        a = 1
    }
}
const QuizName = JSON.parse(localStorage.getItem('QuizName'))
const QuizQuestion = JSON.parse(localStorage.getItem('QuizQuestion')) || []
QuizName.forEach(element => {
    QuizesHTML.innerHTML += `<div id="QuizName">
    <h3>${element.name}</h3>
    <div class="join" id="${element.name}">Join</div>
</div>`
});
const htmlQuiz = () => {
    window.location.href = "./htmlquiz.html"
}
let index = 0;
let filterQuestion;
const logout = document.getElementById('logout')
const join = document.querySelectorAll('.join')
join.forEach(element => {
    element.addEventListener('click', (event) => {
        if (event.target.id == element.id) {
            filterQuestion = QuizQuestion.filter(element => {
                if (element.Category == event.target.id) {
                    return element
                }
            })
            nextQuestion()
        }
        else {
            console.log('Not Find')
        }
        superMain.style.display = "none"
    })
})
let divques;
let score = 0;
const nextQuestion = () => {
    const options = document.getElementsByName('answer')
    for (let i = 0; i < options.length; i++) {
        if (options[i].checked) {
            // console.log(filterQuestion[index-1].CorrectAnswer)
            // console.log(options[i].value)
            if (options[i].value === filterQuestion[index - 1].CorrectAnswer) {
                score++;
            }
        }
        options[i].checked = false
        btn.disabled = true
    }
    if (divques) {
        startQuiz.removeChild(divques)
    }
    if (index > filterQuestion.length - 1) {
        const acheiveMarks = Math.round((score / filterQuestion.length) * 100)
        percen.textContent = `${acheiveMarks}%`
        totQuesNum.textContent = filterQuestion.length
        quiznme.textContent = filterQuestion[0].Category
        corQues.textContent = score
        // CSS Animation
        let pointvalue = `0.${acheiveMarks}`
        let strokeValue = 472 - 472 * pointvalue
        let style = document.createElement('style')
        style.type = 'text/css';
        document.head.appendChild(style)
        let animation = `@keyframes anim {
        100%{
            stroke-dashoffset: ${strokeValue};
        }
    }`
        style.sheet.insertRule(animation, style.sheet, CSSRule.length)
        circle.style.animation = 'anim 2s linear forwards'
        // CSS Animation
        if (acheiveMarks < 70) {
            congrtulation.textContent = "You Failed"
            congrtulation.style.color = "#ce1e07"
            circle.style.stroke = "#ce1e07"
        }
        else {
            congrtulation.textContent = "Congratulation, You Passed"
        }
        result.style.display = "block"
    }
    else {
        divques = document.createElement('div')
        const h3 = document.createElement('h3')
        const lstUl = document.createElement('ul')
        const btn = document.createElement('button')
        const opt1Li = document.createElement('li')
        const opt2Li = document.createElement('li')
        const opt3Li = document.createElement('li')
        const opt4Li = document.createElement('li')
        const input1 = document.createElement('input')
        const input2 = document.createElement('input')
        const input3 = document.createElement('input')
        const input4 = document.createElement('input')
        const span1 = document.createElement('span')
        const span2 = document.createElement('span')
        const span3 = document.createElement('span')
        const span4 = document.createElement('span')
        btn.setAttribute('id', 'btn'), btn.setAttribute('onclick', 'nextQuestion()')
        btn.disabled = true
        btn.textContent = "Next Question"
        input1.setAttribute('type', 'radio'), input1.setAttribute('name', 'answer'), input1.setAttribute('onclick', 'enablebtn()'), input1.setAttribute('value', `${filterQuestion[index].Option1}`)

        input2.setAttribute('type', 'radio'), input2.setAttribute('name', 'answer'), input2.setAttribute('onclick', 'enablebtn()'), input2.setAttribute('value', `${filterQuestion[index].Option2}`)

        input3.setAttribute('type', 'radio'), input3.setAttribute('name', 'answer'), input3.setAttribute('onclick', 'enablebtn()'), input3.setAttribute('value', `${filterQuestion[index].Option3}`)

        input4.setAttribute('type', 'radio'), input4.setAttribute('name', 'answer'), input4.setAttribute('onclick', 'enablebtn()'), input4.setAttribute('value', `${filterQuestion[index].Option4}`)
        h3.textContent = filterQuestion[index].Question
        divques.appendChild(h3)
        divques.appendChild(lstUl)
        divques.appendChild(btn)
        span1.textContent = filterQuestion[index].Option1
        span2.textContent = filterQuestion[index].Option2
        span3.textContent = filterQuestion[index].Option3
        span4.textContent = filterQuestion[index].Option4
        opt1Li.appendChild(input1)
        opt2Li.appendChild(input2)
        opt3Li.appendChild(input3)
        opt4Li.appendChild(input4)
        opt1Li.appendChild(span1)
        opt2Li.appendChild(span2)
        opt3Li.appendChild(span3)
        opt4Li.appendChild(span4)
        lstUl.appendChild(opt1Li)
        lstUl.appendChild(opt2Li)
        lstUl.appendChild(opt3Li)
        lstUl.appendChild(opt4Li)
        startQuiz.appendChild(divques)
        divques.setAttribute('id', 'quizQues')
        index++
        // startQuiz.innerHTML = `<div id="quizQues">
        //     <h3 id="Question">${filterQuestion[index].Question}</h3>
        //     <ul>
        //         <li><input type="radio" name="answer" onclick="enablebtn()" value="${filterQuestion[index].Option1}">${filterQuestion[index].Option1}</li>
        //         <li><input type="radio" name="answer" onclick="enablebtn()" value="${filterQuestion[index].Option2}">${filterQuestion[index].Option2}</li>
        //         <li><input type="radio" name="answer" onclick="enablebtn()" value="${filterQuestion[index].Option3}">${filterQuestion[index].Option3}</li>
        //         <li><input type="radio" name="answer" onclick="enablebtn()" value="${filterQuestion[index].Option4}">${filterQuestion[index].Option4}</li>
        //     </ul>
        //     <button disabled  id="btn"onclick="nextQuestion()">Next Question</button>
        // </div>`
        // index++
    }
}
const enablebtn = () => {
    const btn = document.getElementById('btn')
    btn.disabled = false
}
logout.addEventListener('click', () => {
    localStorage.removeItem('LoginUser')
    window.location.href = "../login/index.html"
})