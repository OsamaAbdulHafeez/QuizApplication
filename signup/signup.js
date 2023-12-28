const form = document.querySelector('.form')
const names = document.getElementById('name')
const email = document.getElementById('email')
const password = document.getElementById('password')
const confirmpassword = document.getElementById('confirmpassword')
const warning = document.getElementById('warning')
const warnImg = document.getElementById('warnImg')
const warningImage = document.getElementById('warningImage')
const warningHeading = document.getElementById('warningHeading')
const namealert  = document.getElementById('namealert')
const emailalert = document.getElementById('emailalert')
const passwordalert = document.getElementById('passwordalert')
const confirmPassalert = document.getElementById('confirmPassalert')
setInterval(()=>{
    if(names.value){
        namealert.innerHTML = ""
    }
    if(email.value){
        emailalert.innerHTML = ""
    }
    if(password.value){
        
        passwordalert.innerHTML = ""
    }
    if(confirmpassword.value){
        if(confirmpassword.value == password.value){
            confirmPassalert.innerHTML = ""
        }
        else{
            confirmPassalert.innerHTML = "Password or Confirm Password not Match"
        }
    }
},100)
// Login Check
const LoginUser = JSON.parse(localStorage.getItem('LoginUser'))
if(LoginUser){
    window.location.href = "../homepage/index.html"
}
// Admin User Check
const AdminUser = JSON.parse(localStorage.getItem('AdminPanel'))
if (AdminUser) {
    window.location.href = '../adminPanel/index.html'
}
const signuphandler = () =>{

    const users = JSON.parse(localStorage.getItem('Users')) || []
    if(!names.value){
       return  namealert.innerHTML = "Name is Required"
    }
    if(!email.value){
        return emailalert.innerHTML = "Email is Required"
    }
    if(!password.value){
        return passwordalert.innerHTML = "Password is Required"
    }
    if(!confirmpassword.value){
        return confirmPassalert.innerHTML = "Confirm Password is Required"
    }
    if(password.value != confirmpassword.value){
        return confirmPassalert.innerHTML = "Password or Confirm Password not Match"
    }
    if(password.value.length < 8){
        return passwordalert.innerHTML = "Password Atleast 8 character"
    }
    const CheckUserName = users.find(user=>{
        if(user.username === names.value)return user
    })
    if(CheckUserName){
        form.style.display = "none"
        warningImage.src = '../Assets/Cross.png'
        warningHeading.textContent = "User Name Already Exists"
        warnImg.style.backgroundColor = "#fff"
        warning.style.top = "50%"
        setTimeout(() => {
            warning.style.top = '-30%'
            form.style.display = "block"
            warningImage.src = '../Assets/Check.png'
            warningHeading.textContent = "Sign Up SuccessFully"
            warnImg.style.backgroundColor = "#8cc63e"
        }, 1500)
        return CheckUserName
    }
    const CheckUserEmail = users.find(user=>{
        if(user.email == email.value)return user
    })
    if(CheckUserEmail){
        form.style.display = "none"
        warningImage.src = '../Assets/Cross.png'
        warningHeading.textContent = "This Email Already Exists"
        warnImg.style.backgroundColor = "#fff"
        warning.style.top = "50%"
        setTimeout(() => {
            warning.style.top = '-30%'
            form.style.display = "block"
            warningImage.src = '../Assets/Check.png'
            warningHeading.textContent = "Sign Up SuccessFully"
            warnImg.style.backgroundColor = "#8cc63e"
        }, 1500)
        return CheckUserEmail  
    }
    const user = {
        username:names.value,
        email:email.value,
        password:password.value,
        confirmPassword:confirmpassword.value,
        Key:1,
    }
    users.push(user)
    localStorage.setItem('Users',JSON.stringify(users))
    warning.style.top = "50%"
    warning.style.transition = "1s"
    form.style.display = "none"
    setTimeout(()=>{
        window.location.href = "../login/index.html"
    },2000)
    names.value = ""
    email.value = ""
    password.value = ""
    confirmpassword.value = ""
    
}
// Show And Hidden Password
var a;
const showpasswordHandler = () =>{
    if(a == 1){
        document.getElementById('password').type = 'password';
        document.getElementById('eyeopen').className = 'fa-solid fa-eye'
        a = 0
    }
    else{
        document.getElementById('password').type = 'text';
        document.getElementById('eyeopen').className = 'fa-solid fa-eye-slash'
        a = 1
    }
}
var b;
const showconfirmpasswordHandler = () =>{
    if(b == 1){
        document.getElementById('confirmpassword').type = 'password';
        document.getElementById('eyeopen').className = 'fa-solid fa-eye'
        b = 0
    }
    else{
        document.getElementById('confirmpassword').type = 'text';
        document.getElementById('eyeopen').className = 'fa-solid fa-eye-slash'
        b = 1
    }
}
