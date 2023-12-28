const form = document.querySelector('.form')
const email = document.getElementById('email')
const password = document.getElementById('password')
const emailalert = document.getElementById('emailalert')
const passwordalert = document.getElementById('passwordalert')
const warning = document.getElementById('warning')
const warnImg = document.getElementById('warnImg')
const warningImage = document.getElementById('warningImage')
const warningHeading = document.getElementById('warningHeading')

const users = JSON.parse(localStorage.getItem('Users'))

setInterval(() => {
    if (email.value) {
        emailalert.textContent = ""
    }
    if (password.value) {
        if (!password.value) {
            passwordalert.textContent = "Please Fill the Password"
        }
        else {
            passwordalert.textContent = ""
        }
    }
}, 100)
// Login Check
const LoginUser = JSON.parse(localStorage.getItem('LoginUser'))
if (LoginUser) {
    window.location.href = "../homepage/index.html"
}
// Admin User Check
const AdminUser = JSON.parse(localStorage.getItem('AdminPanel'))
if (AdminUser) {
    window.location.href = '../adminPanel/index.html'
}
const loginHandler = () => {
    if (!email.value) {
        return emailalert.innerHTML = "Email is Required"
    }
    if (!password.value) {
        return passwordalert.innerHTML = "Password is Required"
    }
    const founduser = users.find(user => {
        if (user.email == email.value) {
            return user
        }
    })
    // if(founduser.password != password.value){
    //     return passwordalert.textContent = "Invalid Password"
    // }
    if (!founduser) {
        return alert("User Not Found")
    }
    if (founduser.password != password.value) {
        form.style.display = "none"
        warningImage.src = '../Assets/Cross.png'
        warningHeading.textContent = "Invalid Password Try Again"
        warnImg.style.backgroundColor = "#fff"
        warning.style.top = "50%"
        setTimeout(() => {
            form.style.display = "block"
            warningImage.src = '../Assets/Check.png'
            warningHeading.textContent = "Login SuccessFully"
            warnImg.style.backgroundColor = "#8cc63e"
            warning.style.top = '-30%'
        }, 1500)
        return
    }
    warning.style.top = "50%"
    form.style.display = "none"
    if (founduser.Key == 1) {
        localStorage.setItem("LoginUser", JSON.stringify(founduser))
        setTimeout(() => {
            window.location.href = "../homepage/index.html"
        }, 2000)
    }
    else {
        localStorage.setItem("AdminPanel", JSON.stringify(founduser))
        setTimeout(() => {
            window.location.href = "../adminpanel/index.html"
        }, 2000)
    }
    email.value = ""
    password.value = ""
}
warning.style.top = "-30%"
form.style.display = "block"
var a;
const showpasswordHandler = () => {
    if (a == 1) {
        document.getElementById('password').type = 'password';
        document.getElementById('eyeopen').className = 'fa-solid fa-eye'
        a = 0
    }
    else {
        document.getElementById('password').type = 'text';
        document.getElementById('eyeopen').className = 'fa-solid fa-eye-slash'
        a = 1
    }
}