let form1=document.getElementById("loginform");
let btn=document.getElementById("login_btn");

btn.addEventListener("click",(e)=>{
    e.preventDefault();

    let obj={
        email:form1.email.value,
        password:form1.password.value
    }
    fetch(" https://handsome-pig-toga.cyclic.app/user/login",{
        method:"POST",
        headers:{
            "Content-type":"application/json"
        },
        body:JSON.stringify(obj)
    })
    .then((res)=>{
        return res.json();
    })
    .then((data)=>{
        localStorage.setItem("token",data.token);
        alert(data.msg);
        window.location.href="/todos.html";
    })
})