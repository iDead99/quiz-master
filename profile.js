const firstName = document.getElementById('first-name');
const lastName = document.getElementById('last-name');
const gender = document.getElementById('gender');
const email = document.getElementById('email');
const phone = document.getElementById('phone');
const confirmUpdateProfile = document.getElementById('confirm-update-profile')
const submitBtn = document.querySelector('.btn-update-profile');

const accessToken=localStorage.getItem('accessToken');

if(!accessToken){
    window.location.href="login.html";
 }

document.addEventListener('DOMContentLoaded', function() {
    fetchUserProfile();
    fetchMasterProfile();
})

function genderLoad(){
    const gender = [
       {name: "Male"},
       {name: "Female"},
    ];
 
    const selectGender=document.getElementById("gender");
 
    gender.forEach(gender =>{
       const option=document.createElement("option");
       option.text=gender.name;
       selectGender.appendChild(option);
    });
 }
 genderLoad();

function fetchUserProfile(){

    fetch('http://127.0.0.1:8000/auth/users/me/', {
        headers: {
            'Authorization': `JWT ${accessToken}`,
            'Content-Type': 'application/json',          
        }
    })
    .then(response => {
        if(!response.ok){
            throw new Error('network not ok!')
        }
        return response.json()
    })
    .then(data => {
        firstName.value = data.first_name;
        lastName.value = data.last_name;
        email.value = data.email;
    })
    .catch(error => {
        alert(error)
    })
}

function fetchMasterProfile(){

    fetch('http://127.0.0.1:8000/manage_quizmaster/masters/me/', {
        headers: {
            'Authorization': `JWT ${accessToken}`,
            'Content-Type': 'application/json',          
        }
    })
    .then(response => {
        if(!response.ok){
            throw new Error('network not ok!')
        }
        return response.json()
    })
    .then(data => {
        gender.value = data.gender;
        phone.value = data.phone;
        
    })
    .catch(error => {
        alert(error)
    })
}


document.getElementById('profile-form').addEventListener('submit', function(e) {
    e.preventDefault()
    submitBtn.disabled=true;
    if(submitBtn.disabled){
    submitBtn.style.backgroundColor='gray';
    }
    updateUserProfile();
    updateMasterProfile();
})

function updateUserProfile(){

    fetch('http://127.0.0.1:8000/auth/users/me/', {
        method: 'PUT',
        headers: {
            'Authorization': `JWT ${accessToken}`,
            'Content-Type': 'application/json',          
        },
        body: JSON.stringify({
            first_name: firstName.value,
            last_name: lastName.value,
            email: email.value,
        })
    })
    .then(response => {
        if(!response.ok){
            throw new Error('network not ok!')
        }
        return response.json()
    })
    .catch(error => {
        alert(error)
    })
}


function updateMasterProfile(){

    fetch('http://127.0.0.1:8000/manage_quizmaster/masters/me/', {
        method: 'PUT',
        headers: {
            'Authorization': `JWT ${accessToken}`,
            'Content-Type': 'application/json',          
        },
        body: JSON.stringify({
            gender: gender.value,
            phone: phone.value,
        })
    })
    .then(response => {
        if(!response.ok){
            throw new Error('network not ok!')
        }
        else{
            confirmUpdateProfile.style.display='block'
            submitBtn.disabled=false;
            if(submitBtn.disabled===false){
            submitBtn.style.backgroundColor='#007bff';
            fetchUserProfile();
            fetchMasterProfile();
            }
          }
        return response.json()
    })
    .catch(error => {
        alert(error)
    })
}
