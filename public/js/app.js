console.log('client file js is loaded')
fetch('http://puzzle.mead.io/puzzle').then((response)=>{
    response.json().then((data)=>{
        console.log(data)
    })
}) 
//fetch weather 
//setup a call to fetch qeather fpr boston 
//get the parse Json response if error print error
//if no error print location and forecast 
const messageOne=document.querySelector('#message-1')
const messageTwo=document.querySelector('#message-2')

//messageOne.textContent='from js'


const weatherForm=document.querySelector('form')
const search=document.querySelector('input')

weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    const location=search.value
    messageOne.textContent='loading'
messageTwo.textContent=''
    fetch('http://localhost:3000/weather?adress=' + location).then((response)=>{
    response.json().then((data)=>{
        if(data.error){
            messageOne.textContent=data.error
            
        }else{
            messageOne.textContent=data.location+'vendi'

            messageTwo.textContent=data.forecast+'koha'
            
        }
    })
})
    
  

})
