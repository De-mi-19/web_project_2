const nIpt=document.getElementById('name');
const eIpt=document.getElementById('email');
const add=document.getElementById('add');
const tableBody=document.getElementById('table-body');
const upName=document.getElementById('upName');
const upEmail=document.getElementById('upEmail');
const upBtn=document.getElementById('updt');
const clBtn=document.getElementById('cncl');
let users=JSON.parse(localStorage.getItem('users')) || [];
let currUid=null;

const regex=/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;


const rendTable=()=>{

    tableBody.innerHTML="";
    for(let i=0;i<users.length;i++){
        const user=users[i];
        const tr=document.createElement("tr");
        const idTd=document.createElement("td");const nTd=document.createElement("td");const eTd=document.createElement("td");const acTd=document.createElement("td");const edtBtn=document.createElement("button");
        edtBtn.className='edit'
        const delBtn=document.createElement("button");
        delBtn.className='del';


        idTd.innerHTML=user.id;
        nTd.innerHTML=user.name;
        eTd.innerHTML=user.email;
        edtBtn.innerText="Edit";
        delBtn.innerText="Delete";
        edtBtn.addEventListener('click',()=>{showUpdateForm(user.id)});
        delBtn.addEventListener('click',()=>{deleteUser(user.id)});
        acTd.appendChild(edtBtn);
        acTd.appendChild(delBtn);
        tr.appendChild(idTd);
        tr.appendChild(nTd);
        tr.appendChild(eTd);
        tr.appendChild(acTd);
        tableBody.appendChild(tr);

    }

}

function adduser(){
    const name=nIpt.value.trim();
    const email=eIpt.value.trim();
    if(email.match(regex)){
        if(name&&email!=null){
            var id=1;
            var val=users.map((x)=>{return x.id}).indexOf(id);
            while(val!=-1){
                id++;
                val=users.map((x)=>{return x.id}).indexOf(id);
            }
    
            const user={
                id:id,
                name:name,
                email:email,
            };
            users.push(user);
            localStorage.setItem("users",JSON.stringify(users));
            nIpt.value="";
            eIpt.value="";
            rendTable();
            
        }else{
            alert("Name is Required");
        }
        
    }else{
        alert("Invalid Email address");
    }

}


function upUser(){
    const name=upName.value.trim();
    const email=upEmail.value.trim();
    if(email.match(regex)){
      const index=users.findIndex((user)=>user.id===currUid);
      if(index!==-1){
        users[index].name=name;
        users[index].email=email;
        localStorage.setItem("users",JSON.stringify(users));
        hideUpdate();
        rendTable();
      }
    }else{
        alert("Invalid email address");
    }
}

function  showUpdateForm(userId){
    const user=users.find((user)=>user.id===userId);
    if(user){
        upName.value=user.name;
        upEmail.value=user.email;
        currUid=user.id;
        upBtn.addEventListener('click',upUser);
        clBtn.addEventListener('click',hideUpdate);
        upBtn.style.display="inline-block";
        clBtn.style.display="inline-block";
        upName.style.display="inline-block";
        upEmail.style.display="inline-block";
        document.getElementById("update").style.display="block";
    }

}

function hideUpdate(){
    document.getElementById("update").style.display="none";
}

function deleteUser(userId){
    users=users.filter((user)=>user.id!==userId);
    localStorage.setItem('users',JSON.stringify(users));
    if(users.length==0){
        hideUpdate();
    }
    rendTable();
}
add.addEventListener('click',adduser);

rendTable();




