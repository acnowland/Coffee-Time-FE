console.log('ahmed')

const logout = document.querySelector('.logout')
const token = localStorage.getItem('token')
console.log(logout)

logout.addEventListener('click', (event) => {
    localStorage.clear()
})

fetch('http://localhost:3000/profile.html', {
    headers:{
        Authorization: `Bearer ${token}`
    }
})
    .then(response => response.json())
    .then(console.log)