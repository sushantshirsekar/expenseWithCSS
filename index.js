function getDetails(event){
    event.preventDefault();
    const amountInp = event.target.amount.value;
    const descInp = event.target.description.value ;
    const categoryInp = event.target.category.value ;

    let details = {
        amountInp,
        descInp,
        categoryInp
    }

    axios.post(`https://crudcrud.com/api/2473773cb0f04217b65592c9dbc9a502/appointmentData`,details)
    .then((res)=>{
        console.log(res.data)
    })
    .catch((err)=> console.log(err));

    displayDetails(details);
}

function displayDetails(details)
{
    document.getElementById('amnt').value = '';
    document.getElementById('desc').value = '';
    document.getElementById('catId').value = '';

    const parent = document.getElementById('parent');
    const child = `<li class='listE' id=${details._id}> ${details.amountInp} ${details.categoryInp} on ${details.descInp} <br> 
    <button class='btn1' 
    onClick=deleteDetails('${details._id}')> Delete </button>
    <button class='btn' onClick=editDetails('${details._id}')> Edit </button>
    </li>`
    parent.innerHTML = parent.innerHTML + child;
}


window.addEventListener('DOMContentLoaded',()=>{
    axios.get('https://crudcrud.com/api/2473773cb0f04217b65592c9dbc9a502/appointmentData').then((res)=>{
        for(let i = 0; i < res.data.length; i++)
        {
            displayDetails(res.data[i]);
        }
    })
})


function deleteDetails(id){
    axios.delete(`https://crudcrud.com/api/2473773cb0f04217b65592c9dbc9a502/appointmentData/${id}`)
    .then((res)=>{
        removeDisplay(id);
    })
    .catch((err)=> console.log(err));

    
}

function removeDisplay(id){
    let parent = document.getElementById('parent');
    let child = document.getElementById(id);
    if(child){
        parent.removeChild(child);
    }
}

function editDetails(id){
    axios.get(`https://crudcrud.com/api/2473773cb0f04217b65592c9dbc9a502/appointmentData/${id}`)
    .then((res)=>{
        document.getElementById('amnt').value = res.data.amountInp;
        document.getElementById('desc').value = res.data.descInp;
        document.getElementById('catId').value = res.data.categoryInp;
        deleteDetails(id);
    })
    .catch((err)=> console.log(err));
}