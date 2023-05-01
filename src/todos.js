let main=document.getElementById("todo_container");
let input=document.getElementById("todo_create_input");
let add_todo_btn=document.getElementById("add_btn");
let complete_list=document.getElementById("complete_list") ;

let todo_data;
const token=localStorage.getItem("token");

let complete=JSON.parse(localStorage.getItem("complete")) || [];

window.addEventListener("load",()=>{
    if(token){
        fetchdata();
    }else{
        alert("Please Login First");
        window.location.href="/login.html"
    }
    

})

function fetchdata(){
    //console.log(token);
    show_completed_data(complete);
    fetch(" https://handsome-pig-toga.cyclic.app/user/todo",{
        method:"GET",
        headers:{
            "authorization":`bearer ${token}`
        }

    })
    .then((res)=>{
        return res.json();
    })
    .then((data)=>{
        console.log("data from todos : ",data);
        todo_data=data.todos;
        displaydata(data.todos)
    })
}

function displaydata(data){
    main.innerHTML=null;

    data.forEach(element => {
        //  console.log(element["_id"]);
        let card=document.createElement("div");
        card.setAttribute("class","card");

        let div1=document.createElement("div");

        let title=document.createElement("h2");
        title.innerText=element.title;
        let status="Completed"
        if(!element.status){
            status="Pending"
        };

        let p=document.createElement("p");
        p.innerText=status;

        div1.append(title,p);

        let div2=document.createElement("div");
        div2.setAttribute("class","btndiv");

        let btn1=document.createElement("button");
        btn1.innerText="complete";
        btn1.setAttribute("class","complete_btn");

        btn1.addEventListener("click",()=>{
            complete.push(element);
            localStorage.setItem("complete",JSON.stringify(complete));
            show_completed_data(complete);

            let id=element["_id"];
            fetch(` https://handsome-pig-toga.cyclic.app/user/todo/delete/${id}`,{
                method:"DELETE",
                headers:{
                    "authorization":`bearer ${token}`
                }
            })
            .then((res)=>{
                return res.json();
            })
            .then((data)=>{
                fetchdata();
            })
        });

        let btn2=document.createElement("button");
        btn2.innerText="remove";
        btn2.setAttribute("class","remove_btn");

        btn2.addEventListener("click",()=>{
            let id=element["_id"];
            fetch(` https://handsome-pig-toga.cyclic.app/user/todo/delete/${id}`,{
                method:"DELETE",
                headers:{
                    "authorization":`bearer ${token}`
                }
            })
            .then((res)=>{
                return res.json();
            })
            .then((data)=>{
                fetchdata();
            })
        });

        // let btn3=document.createElement("button");
        // btn3.innerText="Edit";
        // btn3.setAttribute("id","edit_btn");

        div2.append(btn1,btn2);

        card.append(div1,div2);

        main.append(card);
    });
    
};

add_todo_btn.addEventListener("click",()=>{
    obj={
        title:input.value
    }
    fetch(" https://handsome-pig-toga.cyclic.app/user/todo/create",{
        method:"POST",
        headers:{
            "Content-type":"application/json",
            "authorization":`Bearer ${token}`
        },
        body:JSON.stringify(obj)
    })
    .then((res)=>{
        return res.json();
    })
    .then((data)=>{
        fetchdata();
        show_completed_data(complete)
        //console.log(data);
    })
    .catch((err)=>{
        alert(err);
    })
});


// show completed todos

function show_completed_data(complete){
    complete_list.innerHTML=null;
    complete.forEach((ele,i) =>{
        let div=document.createElement("div");
        div.setAttribute("class","complete_div");

        let h3=document.createElement("h3");
        h3.innerText="⨁ "+ele.title;
        
        let btn=document.createElement("button");
        btn.innerText="❌";
        btn.setAttribute("class","comp_del_btn");

        btn.addEventListener("click",()=>{
            let data=complete.splice(i,1);
            localStorage.setItem("complete",JSON.stringify(data));
            show_completed_data(complete);

        })
        
        div.append(h3,btn);

        complete_list.append(div);

    })
}
