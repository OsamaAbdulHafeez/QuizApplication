const dropDown = document.querySelector('.dropDown')
const UserName = document.getElementById('UserName')
const QuizForm = document.querySelector('.QuizForm')
const QuizType = document.getElementById('QuizType')
const quizname = document.getElementById('quizname')
const Quizlist = document.getElementById('Quizlist')
// Admin User Check
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

// Quiz Names
function showQuizName() {
    Quizlist.innerHTML = ""
    const QuizName = JSON.parse(localStorage.getItem('QuizName')) || []
    QuizName.forEach(element => {
        Quizlist.innerHTML += `<li>
        <span>${element.name}</span>
        <span>
            <i class="fa-solid fa-pen" onclick="quizupdhandler(${element.id})"></i>
            <i class="fa-solid fa-trash" onclick="quizdelhandler(${element.id})"></i>
        </span>
    </li>`
    })
}
showQuizName()
let oldQuiz;
let oldQuizIndex;
// Delete Quiz Name
const quizdelhandler = (id) => {
    const deleteQuizName = JSON.parse(localStorage.getItem('QuizName'))
    const QuizQuestion = JSON.parse(localStorage.getItem('QuizQuestion'))
    const DeleteQuizQuestion = QuizQuestion.filter(element => {
        return element.categoryId != id
    })
    console.log(DeleteQuizQuestion)
    const filterdelete = deleteQuizName.filter(element => element.id != id)
    localStorage.setItem('QuizName', JSON.stringify(filterdelete))
    localStorage.setItem('QuizQuestion',JSON.stringify(DeleteQuizQuestion))
    showQuizName()
}
// Update Quiz Name
const quizupdhandler = (id) => {
    const updateQuizName = JSON.parse(localStorage.getItem('QuizName'))
    const findquiz = updateQuizName.find(element => {
        return element.id == id
    })
    const findIndexquiz = updateQuizName.findIndex(element => {
        return element.id == id
    })
    oldQuiz = findquiz
    oldQuizIndex = findIndexquiz
    quizname.value = findquiz.name
    QuizForm.style.top = "30%"
    QuizType.style.display = "none"
}
const quizedithandler = () => {
    if (!quizname.value) {
        return alert("please Fill The Value")
    }
    const newEditQuiz = {
        id: oldQuiz.id,
        name: quizname.value
    }
    const QuizName = JSON.parse(localStorage.getItem('QuizName'))
    const QuizQuestion = JSON.parse(localStorage.getItem('QuizQuestion')) || []
    const foundQuizName = QuizName.find(element => {
        if (element.name === newEditQuiz.name) {
            return element
        }
    })
    for (let i = 0; i < QuizQuestion.length; i++) {
        if (QuizQuestion[i].categoryId == oldQuiz.id) {
            QuizQuestion[i].Category = quizname.value
        }
    }
    if (foundQuizName) {
        alert("please Already FOund Try Again")
    }
    else {
        QuizName.splice(oldQuizIndex, 1, newEditQuiz)
        localStorage.setItem('QuizName', JSON.stringify(QuizName))
        localStorage.setItem('QuizQuestion', JSON.stringify(QuizQuestion))
    }
    quizname.value = ""
    QuizForm.style.top = "-30%"
    QuizType.style.display = "block"
    showQuizName()
}


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