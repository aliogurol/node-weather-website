
const weatherForm   = document.querySelector('form')
const serach        = document.querySelector('input')
const message1      = document.querySelector('#message-1')
const message2      = document.querySelector('#message-2')


weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault();

    const location = serach.value

    message1.textContent = 'Loading...'

    fetch('/weather?address=' + location).then((response)=>{
        response.json().then((data)=>{
            if(data.error){
                message1.textContent = data.error
            }else{
                const weatherObject     =   data.forecast
                message1.textContent    =   data.location
                message2.textContent    =   'Description: '     +   weatherObject.weather_descriptions + 
                                            ' , Humidity: '     +   weatherObject.humidity +
                                            ' , Feelslike: '    +   weatherObject.feelslike
            }
        })
    })
})
