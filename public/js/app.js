console.log('Client side javascript file is loaded!')

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const error_msg=document.querySelector('#error-msg')
const response_msg=document.querySelector('#response-msg')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value

    fetch('http://localhost:3000/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            response_msg.textContent='';
            if(data.error || data.length===0){
                error_msg.textContent="You must provide a valid location";
            }
            else{
            error_msg.textContent=data[0].name;
            response_msg.textContent="The temperature is "+data[1].temperature+" degrees"
            }
        })
    })
})