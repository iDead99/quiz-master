const logoutNObtn = document.getElementById("logout-no-btn");
const logoutYESbtn = document.getElementById("logout-yes-btn");
const logoutContainer = document.getElementById("logout-container");

logoutYESbtn.onclick=function(){
    localStorage.removeItem('accessToken');
    window.location.href="login.html";
 }
 logoutNObtn.onclick=function(){
    window.location.href="master-dashboard.html";
}