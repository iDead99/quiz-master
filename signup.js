const firstName = document.getElementById('signup-first-name');
const lastName = document.getElementById('signup-last-name');
const gender = document.getElementById('signup-gender');
const email = document.getElementById('signup-email');
const phone = document.getElementById('signup-phone');
const password = document.getElementById('signup-password');
const confirmPassword = document.getElementById('signup-confirm-password');

const emailError = document.getElementById('email-error');
const passwordError = document.getElementById('password-error');

email.addEventListener('input', () => {
   emailError.style.display='none';
})
password.addEventListener('input', () => {
   passwordError.style.display='none';
})
confirmPassword.addEventListener('input', () => {
   passwordError.style.display='none';
})

document.addEventListener('DOMContentLoaded', function() {

    function genderLoad(){
        const gender = [
           {name: "Male"},
           {name: "Female"},
        ];
     
        const selectGender=document.getElementById("signup-gender");
     
        gender.forEach(gender =>{
           const option=document.createElement("option");
           option.text=gender.name;
           selectGender.appendChild(option);
        });
     }
     genderLoad();
})

document.getElementById('signup-form').addEventListener('submit',function(e) {
    e.preventDefault()

    if(password.value!==confirmPassword.value){
      passwordError.textContent='Passwords do not match!';
      passwordError.style.display='inline-block';
      return;
   }

    const userData={
        first_name: firstName.value.charAt(0).toUpperCase() + firstName.value.slice(1).toLowerCase(),
        last_name: lastName.value.charAt(0).toUpperCase() + lastName.value.slice(1).toLowerCase(),
        email: email.value,
        password: password.value,
        };

firstRegistration(userData);
})

function firstRegistration(userData){
    fetch("http://127.0.0.1:8000/auth/users/", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
        })
        .then(response => {
        if(!response.ok){
            return response.json().then(error =>{
                if(error.email){
                  emailError.textContent=error.email;
                  emailError.style.display='inline-block';
                }
                if(error.password){
                  passwordError.textContent=error.password;
                  passwordError.style.display='inline-block';
                }
            })   
        }
        else{

             const authUserData={
                email: email.value,
                password: password.value,
                };

        authenticateUser(authUserData);
        }
            return response.json();
        })
        .catch(error => {
         return error;
    })

    }


function authenticateUser(userData){
    fetch("http://127.0.0.1:8000/auth/jwt/create",{
        method: 'POST',
        headers: {
           'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
    
       })
       .then(response => {
        if(!response.ok){
             throw new Error('authentication failed!');
          }
          return response.json();
       })
     .then(data => {
       localStorage.setItem('accessToken', data.access);

      const secondUserData={
      gender: gender.value,
      phone: phone.value,
      };
      secondRegistration(secondUserData);
    })
    .catch(error => {
     console.log('Error', error);
    });
    
}

function secondRegistration(secondUserData){
    const accessToken=localStorage.getItem('accessToken');

    fetch('http://127.0.0.1:8000/manage_quizmaster/masters/me/', {
    method: 'PUT',
    headers: {
       'Authorization': `JWT ${accessToken}`,
       'Content-Type': 'application/json',
    },
    body: JSON.stringify(secondUserData)
 })
 .then(response =>{
    if(!response.ok){
       throw new Error('Network was not ok');
    }
    else{
       window.location.href="login.html";
    }
    return response.json();
 })
 .catch(error =>{
    console.log(error, 'Second registration failed')
 });
 localStorage.removeItem('accessToken');
 }