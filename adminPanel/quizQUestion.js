const dropDown = document.querySelector('.dropDown')
const UserName = document.getElementById('UserName')
const warning = document.getElementById('warning')
const QuizForm = document.querySelector('.QuizForm')
const superMain = document.getElementById('superMain')
// Question List
const Question = document.getElementById('Question')
const QuizQuestion = JSON.parse(localStorage.getItem('QuizQuestion')) || []
const ShowQuestion = document.getElementById('ShowQuestion')

const quizQues = document.getElementById('quizQues')
const quizopt1 = document.getElementById('quizopt1')
const quizopt2 = document.getElementById('quizopt2')
const quizopt3 = document.getElementById('quizopt3')
const quizopt4 = document.getElementById('quizopt4')
const quizanswer = document.getElementById('quizanswer')
const category = document.getElementById('category')
// AdminUser
const AdminUser = JSON.parse(localStorage.getItem('AdminPanel'))
if (!AdminUser) {
    window.location.href = '../login/index.html'
}

// Admin Logout Variables
const logout = document.getElementById('logout')
logout.addEventListener('click', () => {
    localStorage.removeItem('AdminPanel')
    window.location.href = "../login/index.html"
})
UserName.textContent = AdminUser.username
// Category Shhow
const QuizName = JSON.parse(localStorage.getItem('QuizName')) || []
QuizName.forEach(element => {
    category.innerHTML += `<option value="${element.name}">${element.name}</option>`
})
// Show Question
function ShowQuiz() {
    ShowQuestion.innerHTML = ""
    QuizQuestion.forEach(element => {
        //         ShowQuestion.innerHTML += 
        // `<li id="show">
        //     <div id="question">
        //         <h3>${element.Question}</h3>
        //         <span>
        //             <i class="fa-solid fa-pen" onclick="Quesupdhandler(${element.id})"></i>
        //             <i class="fa-solid fa-trash" onclick="Quesdelhandler(${element.id})"></i>
        //         </span>
        //     </div>
        //         <ul id="options">
        //             <li><span>Category&#41;&nbsp;</span>${element.Category}</li>
        //             <li><span>Option1&#41;&nbsp;</span>${element.Option1}</li>
        //             <li><span>Option2&#41;&nbsp;</span>${element.Option2}</li>
        //             <li><span>Option3&#41;&nbsp;</span>${element.Option3}</li>
        //             <li><span>Option4&#41;&nbsp;</span>${element.Option4}</li>
        //             <li><span>CorrectAnswer&#41;&nbsp;</span>${element.CorrectAnswer}</li>
        //         </ul>
        // </li>`
        const parLi = document.createElement('li')
    const ques = document.createElement('div')
    const h3 = document.createElement('h3')
    const span = document.createElement('span')
    const edtI = document.createElement('i')
    const delI = document.createElement('i')
    const lstUl = document.createElement('ul')
    const catLi = document.createElement('li')
    const opt1Li = document.createElement('li')
    const opt2Li = document.createElement('li')
    const opt3Li = document.createElement('li')
    const opt4Li = document.createElement('li')
    const corAnsLi = document.createElement('li')
    h3.textContent = element.Question
    span.appendChild(edtI),span.appendChild(delI)
    ques.appendChild(h3),ques.appendChild(span)
    parLi.appendChild(ques),parLi.appendChild(lstUl)
    catLi.innerText = element.Category
    opt1Li.textContent = element.Option1
    opt2Li.textContent = element.Option2
    opt3Li.textContent = element.Option3
    opt4Li.textContent = element.Option4
    corAnsLi.textContent = element.CorrectAnswer
    lstUl.appendChild(catLi)
    lstUl.appendChild(opt1Li)
    lstUl.appendChild(opt2Li)
    lstUl.appendChild(opt3Li)
    lstUl.appendChild(opt4Li)
    lstUl.appendChild(corAnsLi)
    ShowQuestion.appendChild(parLi)
    parLi.setAttribute('id','show')
    ques.setAttribute('id','question')
    edtI.setAttribute('class', 'fa-solid fa-pen')
    delI.setAttribute('class', 'fa-solid fa-trash')
    edtI.setAttribute('onclick',`Quesupdhandler(${element.id})`)
    delI.setAttribute('onclick',`Quesdelhandler(${element.id})`)
    lstUl.setAttribute('id','options')
    });
}
ShowQuiz()
// Delete Question
const Quesdelhandler = (id) => {
    const DelteQuestion = JSON.parse(localStorage.getItem('QuizQuestion'))
    const filterQuestion = DelteQuestion.filter(element => {
        return element.id != id
    })
    console.log(filterQuestion)
    localStorage.setItem('QuizQuestion', JSON.stringify(filterQuestion))
    warning.style.top = "50%"
    setTimeout(() => {
        warning.style.top = "-30%"
    }, 1500)
    ShowQuiz()
}
let oldQuestion;
let oldQuestionIndex;
// Update Question
const Quesupdhandler = (id) => {
    superMain.style.display = "none"
    QuizForm.style.top = "10%"
    const UpdateQuestion = JSON.parse(localStorage.getItem('QuizQuestion'))
    const findQuestion = UpdateQuestion.find(element => {
        return element.id == id
    })
    const findQuestionIndex = UpdateQuestion.findIndex(element => {
        return element.id == id
    })
    quizQues.value = findQuestion.Question
    quizopt1.value = findQuestion.Option1
    quizopt2.value = findQuestion.Option2
    quizopt3.value = findQuestion.Option3
    quizopt4.value = findQuestion.Option4
    quizanswer.value = findQuestion.CorrectAnswer
    category.value = findQuestion.Category
    oldQuestion = findQuestion
    oldQuestionIndex = findQuestionIndex
}
const EditQuestion = () => {
    const newEdtQuestion = {
        id: oldQuestion.id,
        Question: quizQues.value || oldQuestion.Question,
        Option1: quizopt1.value || oldQuestion.Option1,
        Option2: quizopt2.value || oldQuestion.Option2,
        Option3: quizopt3.value || oldQuestion.Option3,
        Option4: quizopt4.value || oldQuestion.Option4,
        CorrectAnswer: quizanswer.value || oldQuestion.CorrectAnswer,
        Category: category.value || oldQuestion.Category
    }
    const QuizName = JSON.parse(localStorage.getItem('QuizName')) || []
    const quizCategoryCheck = QuizName.find(element => {
        return element.name == category.value
    })
    // console.log(quizCategoryCheck)
    newEdtQuestion['categoryId'] = quizCategoryCheck.id
    QuizQuestion.splice(oldQuestionIndex, 1, newEdtQuestion)
    localStorage.setItem('QuizQuestion', JSON.stringify(QuizQuestion))
    superMain.style.display = "block"
    QuizForm.style.top = "-90%"
    quizQues.value = ""
    quizopt1.value = ""
    quizopt2.value = ""
    quizopt3.value = ""
    quizopt4.value = ""
    quizanswer.value = ""
    category.value = ""
    // console.log(QuizQuestion) 
}
// Cross

const cross = () =>{
    superMain.style.display = "block"
    QuizForm.style.top = "-90%"
}
// window.addEventListener('click',function(event){
//     event.preventDefault()
//     event.returnValue = ''
// })
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