const search = document.querySelector('input')
const weatherForm = document.querySelector('form')
const printMessagOne = document.querySelector('#message-1')
const printMessageTwo = document.querySelector('#message-2')

    weatherForm.addEventListener('submit', (e) => {
        e.preventDefault()
    
        fetch("/weather?address="+search.value).then((response) => {
        response.json().then((data) => {
        
            if(data.error) {

                printMessagOne.textContent = data.error

            } else {

                printMessagOne.textContent = data.location
                printMessageTwo.textContent = data.forecast
            
            }   
        })
    })
})


