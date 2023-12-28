const dropDown = document.querySelector('.dropDown')
const UserName = document.getElementById('UserName')
const warning = document.getElementById('warning')
// Quiz Category Variables
const quizname = document.getElementById('quizname')
const quiznamealert = document.getElementById('quiznamealert')
// Quiz Question Variables
const quizQues = document.getElementById('quizQues')
const quizopt1 = document.getElementById('quizopt1')
const quizopt2 = document.getElementById('quizopt2')
const quizopt3 = document.getElementById('quizopt3')
const quizopt4 = document.getElementById('quizopt4')
const quizanswer = document.getElementById('quizanswer')
const category = document.getElementById('category')
const quizquealert = document.getElementById('quizquealert')
const quizoption1alert = document.getElementById('quizoption1alert')
const quizoption2alert = document.getElementById('quizoption2alert')
const quizoption3alert = document.getElementById('quizoption3alert')
const quizoption4alert = document.getElementById('quizoption4alert')
const quizansweralert = document.getElementById('quizansweralert')
const categoryalert = document.getElementById('categoryalert')
const QuizName = JSON.parse(localStorage.getItem('QuizName')) || []
QuizName.forEach(element => {
    category.innerHTML += `<option value="${element.name}">${element.name}</option>`
});
// Admin User Check
const AdminUser = JSON.parse(localStorage.getItem('AdminPanel'))
if (!AdminUser) {
    window.location.href = '../login/index.html'
}
// Admin Logout Variables
const logout = document.getElementById('logout')

UserName.textContent = AdminUser.username
// Set Interval
setInterval(() => {
    if (quizname.value) {
        quiznamealert.innerHTML = ""
    }
    if (quizQues.value) {
        quizquealert.innerHTML = ""
    }
    if (quizopt1.value) {
        quizoption1alert.innerHTML = ""
    }
    if (quizopt2.value) {
        quizoption2alert.innerHTML = ""
    }
    if (quizopt3.value) {
        quizoption3alert.innerHTML = ""
    }
    if (quizopt4.value) {
        quizoption4alert.innerHTML = ""
    }
    if (quizanswer.value) {
        quizansweralert.innerHTML = ""
    }
    if (category.value) {
        categoryalert.innerHTML = ""
    }

}, 100)
// Quiz Category Uploaded
const quizUpload = () => {
    if (!quizname.value) {
        return quiznamealert.innerHTML = "Please Fill Quiz Name"
    }
    const QuizName = JSON.parse(localStorage.getItem('QuizName')) || []
    const quizcat = {
        id : Date.now(),
        name:quizname.value
    }
    QuizName.push(quizcat)
    localStorage.setItem('QuizName', JSON.stringify(QuizName))
    quizname.value = ""
}
logout.addEventListener('click', () => {
    localStorage.removeItem('AdminPanel')
    window.location.href = "../login/index.html"
})
// Quiz Question Uploaded

const quizQuestion = () => {
    if (!quizQues.value) {
        return quizquealert.innerHTML = "Please Fill the Question"
    }
    if (!quizopt1.value) {
        return quizoption1alert.innerHTML = "Please Fill the Option"
    }
    if (!quizopt2.value) {
        return quizoption2alert.innerHTML = "Please Fill the Option"
    }
    if (!quizopt3.value) {
        return quizoption3alert.innerHTML = "Please Fill the Option"
    }
    if (!quizopt4.value) {
        return quizoption4alert.innerHTML = "Please Fill the Option"
    }
    if (!quizanswer.value) {
        return quizansweralert.innerHTML = "Please Fill the Answer"
    }
    if (!category.value) {
        return categoryalert.innerHTML = "please Choose Category"
    }
    const QuizQuestion = JSON.parse(localStorage.getItem('QuizQuestion')) || []
    const QuizName = JSON.parse(localStorage.getItem('QuizName'))
    const question = {
        id: Date.now(),
        Question: quizQues.value,
        Option1: quizopt1.value,
        Option2: quizopt2.value,
        Option3: quizopt3.value,
        Option4: quizopt4.value,
        CorrectAnswer: quizanswer.value,
        Category: category.value
    }
    const quizcategoryCheck = QuizName.find(element=>{
        return element.name == category.value
    })
    question['categoryId'] = quizcategoryCheck.id
    QuizQuestion.push(question)
    localStorage.setItem('QuizQuestion', JSON.stringify(QuizQuestion))
    warning.style.top = "50%"
    setTimeout(()=>{
        warning.style.top = "-30%"
    },1000)
    quizQues.value = ""
    quizopt1.value = ""
    quizopt2.value = ""
    quizopt3.value = ""
    quizopt4.value = ""
    quizanswer.value = ""
    category.value = ""
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