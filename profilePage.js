

const logout = document.querySelector('.logout')
const token = localStorage.getItem('token')
const friendContainer = document.querySelector('.card-container')
const breakContainer = document.querySelector('.side-bar')
const welcome = document.querySelector('.welcome-user')

//modal stuff
const modal = document.querySelector('#edit-modal')
const openModal = document.querySelector('.mod-button')
const closeModal = document.querySelector('.close-button')
const modalForm = document.querySelector('.modal-form')
const modalUser = document.querySelector('.modal-username')
console.log(modalForm)





//clears local storage on logout
logout.addEventListener('click', (event) => {
    localStorage.clear()
})

//initial fetch that will handle the user
//handling user entails creating all cards on page and creating break cards
fetch('http://localhost:3000/profile.html', {
    headers:{
        Authorization: `Bearer ${token}`
    }
})
    .then(response => response.json())
    .then(handleUser)

//displays login name, sets intial variables to pass down
//will call handleFriends and handleBreaks
function handleUser(user){
    welcome.textContent=(`Welcome ${user.user.fullName}!!`)
    let friends = user.users
    let breaks = user.user.breaks
    let userID = user.user.id


    handleFriends(friends,user)
    handleBreaks(breaks,userID)
    handleModal(user.user)
}

function handleModal(user){
    openModal.addEventListener('click', openModalDisplay)
    closeModal.addEventListener('click', closeModalDisplay)
    window.addEventListener('click', clickOutside)
    modalUser.textContent = user.fullName
    modalForm.addEventListener('submit', (event => {
        event.preventDefault();
        
        const formData = new FormData(event.target)
        console.log(formData)
        const newMod = formData.get('mod')
        const newTime = formData.get('timeAvailable')
        console.log(newMod,newTime)

        
    }))
    

    function openModalDisplay(){
        modal.style.display = 'block';
    }
    function closeModalDisplay(){
        modal.style.display = 'none';
    }
    function clickOutside(e){
        if(e.target ==  modal){
            modal.style.display = 'none'
        }
    }

}




//will go over each break and pass to create the break card
function handleBreaks(breaks,userID){
    breaks.forEach(coffeeBreak => {
        createBreakCard(coffeeBreak,userID)
    })
}

//creates each break card by putting it into the sidebar
//also handles the deletion of a card with on click listener
function createBreakCard(coffeeBreak,userID){
    
    const breakCard = document.createElement('div')
    breakCard.className = 'break-card'    
    const name = document.createElement('h2')
    name.textContent = coffeeBreak.fullName
    const year = document.createElement('h4')
    year.textContent = `Mod ${coffeeBreak.mod}`
    const removeBreakButton = document.createElement('button')
    removeBreakButton.textContent = 'Finish Break'
    removeBreakButton.className = 'general-button'
    removeBreakButton.addEventListener('click', removeBreak)

    const slack = document.createElement('a')
    slack.className = "break-slack"
    slack.textContent = 'Connect Via Slack'
    slack.href = coffeeBreak.slackLink

    breakCard.append(name, year,removeBreakButton, slack)
    breakContainer.append(breakCard)

    function removeBreak(){
        const breakToDelete = {
            user_1_id: userID,
            user_2_id: coffeeBreak.id
        }
        breakCard.remove()
        fetch('http://localhost:3000/coffee_breaks',{
            method: 'DELETE',
            headers:{
                Authorization: `Bearer ${token}`,
                'Content-Type':'application/json'
            },
            body: JSON.stringify(breakToDelete)
        })

    }

}

//will go over each friend and pass to friend card to creat care
function handleFriends(friends,user){

    friends.forEach(friend=>{
        friendCard(friend,user)
    })
}

//creates each friend card on the page
//also handles the creation of new coffee breaks
function friendCard(friend,user){


    if(friend.id !== user.user.id){
        //creating friend card
        const friendCard = document.createElement('div')
        friendCard.id = 'friend-card'

        //top of the friend card
        const topFriend = document.createElement('div')
        topFriend.className = 'top-friend-card'
        const beanImage = document.createElement('img')
        beanImage.src = "bean.png"
        const nameAndMod = document.createElement('div')
        nameAndMod.className = 'name-mod'
        const name = document.createElement('h3')
        name.textContent = friend.fullName
        const mod = document.createElement('h4')
        mod.textContent = `Mod ${friend.mod}`
        nameAndMod.append(name,mod)
        topFriend.append(beanImage,nameAndMod)

        //bottom of friend card
        const bottomFriend = document.createElement('div')
        bottomFriend.className = 'bottom-friend-card'
        const friendAndTime = document.createElement('div')
        friendAndTime.className = 'friend-time'
        const timeAvailable = document.createElement('h4')
        timeAvailable.textContent = `Time Available:`
        const time = document.createElement('h4')
        time.className = 'bottom-time'
        time.textContent = friend.time

        const reserveArea = document.createElement('div')
        reserveArea.className = 'reserve'

        const reserveButton = document.createElement('button')
        reserveButton.textContent = "Reserve Time"
        reserveButton.className = 'general-button'
        reserveButton.addEventListener('click', createBreak)

        friendAndTime.append(timeAvailable,time)
        reserveArea.append(reserveButton)
        
        bottomFriend.append(friendAndTime,reserveArea)


        friendCard.append(topFriend,bottomFriend)
        friendContainer.append(friendCard)
    }
    

    function createBreak(){

        const currentUser = user.user.id
        const newFriend = friend.id
        const newBreak = {
            user_1_id: currentUser,
            user_2_id: newFriend
        }

        fetch('http://localhost:3000/coffee_breaks',{
            method: 'POST',
            headers:{
                Authorization: `Bearer ${token}`,
                'content-type':'application/json'
            },
            body: JSON.stringify(newBreak)
        })
        .then(response => {
            if(response.ok == false){

                swal('Break Already Set!', 'Please try connecting with someone new 😊', "warning")
            }else{
                (createBreakCard(friend,currentUser))
            }
        })
    }



}


