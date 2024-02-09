
document.addEventListener("DOMContentLoaded", ()=>{

    const password = document.getElementById("password")
    const confirmPassword = document.getElementById("confirmPassword")
    const togglePassword = document.getElementById("toggle-password")
    const toggleConfirmPassword = document.getElementById("toggle-confirmPassword")
    
    togglePassword.addEventListener("mouseenter", () =>{
        password.setAttribute("type", "text")
    })
    
    togglePassword.addEventListener("mouseleave", () =>{
        password.setAttribute("type", "password")
    })
    
    toggleConfirmPassword.addEventListener("mouseenter", () =>{
        confirmPassword.setAttribute("type", "text")
    })
    
    toggleConfirmPassword.addEventListener("mouseleave", () =>{
        confirmPassword.setAttribute("type", "password")
    })

})