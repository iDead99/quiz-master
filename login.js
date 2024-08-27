const email = document.getElementById('login-email');
const password = document.getElementById('login-password');

const userPassError = document.getElementById('user-pass-error');

email.addEventListener('input', ()=> {
    userPassError.style.display='none';
})
password.addEventListener('input', ()=> {
    userPassError.style.display='none';
})

document.getElementById('login-form').addEventListener('submit', function(e) {
    e.preventDefault()
    login()
    
})

function login(){
    fetch('https://quiz-master-back.onrender.com/auth/jwt/create', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: email.value,
            password: password.value
        })
    })
    .then(response => {
        if(!response.ok){
            return response.json().then(error => {
                userPassError.textContent=error.detail;
                userPassError.style.display='inline-block';
            })
        }
        else{
            window.location.href="master-dashboard.html";
        }
        return response.json()
    })
    .then(data => {
        localStorage.setItem('accessToken', data.access)
    })
    .catch(error => {
        return error;
    })
}