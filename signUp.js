


const newUserForm = document.querySelector('form')



newUserForm.addEventListener('submit', (event) => {
    event.preventDefault()

    const formData = new FormData(event.target)
    const userName = formData.get('username')
    const password = formData.get('password')
    const mod = formData.get('mod')
    const fullName = formData.get('fullName')
    const prefTime = formData.get('timeAvailable')
    const slackLink = formData.get('slackLink')
    const newUser = {
        username: userName,
        password: password,
        fullName: fullName,
        time: prefTime,
        mod: mod,
        slackLink: slackLink
    }

    fetch('http://localhost:3000/users', {
        method: 'POST',
        headers:{
            'content-type':'application/json'
        },
        body: JSON.stringify(newUser)
    })
    .then(response => {
        if(response.ok == false){
            swal("Sorry Name Taken!", "Please select a different username", "error");
            newUserForm.reset()
        }else{
            swal("Success!!", "You will now be redirected to login", "success")
            .then(function() {
                window.location.href = './index.html'
            }) 
        }
    })
})