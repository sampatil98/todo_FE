let form=document.getElementById("form");
let btn=document.getElementById("register_btn");
btn.addEventListener("click",(e)=>{
    e.preventDefault();
    
    let obj={
        name:form.name.value,
        email:form.email.value,
        password:form.password.value,
        city:form.city.value,
        mob_no:form.mobile.value,
        profession:form.select.value
    }
    console.log(obj);
    
    fetch(" https://handsome-pig-toga.cyclic.app/user/register",{
        method:"POST",
        headers:{
            "Content-type":"application/json"
        },
        body:JSON.stringify(obj)
    })
    .then((res)=>{
        return res.json();
    }).then((data)=>{
        alert(data.msg);
        window.location.href="/login.html";
    })
})

