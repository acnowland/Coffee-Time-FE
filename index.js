console.log('ahmed')

const loginForm = document.querySelector('#login-form')
const signUp = document.querySelector('.sign-up')
console.log(signUp)
const baseURL = 'http://localhost:3000/'







loginForm.addEventListener('submit', (event) => {
    event.preventDefault()
    const formData = new FormData(event.target)
    const username = formData.get('username')
    const password = formData.get('password')


    fetch(`${baseURL}login`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'content-type':'application/json'
        },
        body: JSON.stringify({username, password})
    })
    .then(response => response.json())
    .then(result => {
        if(result.error){
            window.alert(result.error)
            console.log(result.error)
        }else{
            localStorage.setItem('token', result.token)
            window.location.href = './profilePage.html'
        }
    })
})

signUp.addEventListener('click', (event) =>{
    event.preventDefault()
    
    window.location.href = './signUp.html'
})


