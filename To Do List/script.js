const inp=document.getElementById('list');
const tBody=document.getElementById('table-body');
const addbtn=document.getElementById('Add');
addbtn.addEventListener('click',addTable);



function addTable(){

    let counter=tBody.childElementCount;
// console.log(counter);

    const tr=document.createElement('tr');

    const no=document.createElement('td');
    no.innerHTML=counter+1;
    const list=document.createElement('td');
     list.innerHTML=inp.value;
    inp.value=null;

    const fin=document.createElement('td');
   

    const check=document.createElement('input');
    check.class="chck"
    check.type="checkbox";
    check.addEventListener('change',function(){
        setTimeout(()=>{
            tBody.removeChild(tr);
        },500)
    });


    fin.appendChild(check);
    tBody.appendChild(tr);
    tr.appendChild(no);
    tr.appendChild(list);
    tr.appendChild(fin);
    
    tBody.appendChild(tr);
}

