

const logout = document.querySelector('.logout')
const token = localStorage.getItem('token')
const friendContainer = document.querySelector('.card-container')
const breakContainer = document.querySelector('.side-bar')
const welcome = document.querySelector('.welcome-user')


logout.addEventListener('click', (event) => {
    localStorage.clear()
})

// window.addEventListener("beforeunload", () => localStorage.clear())

fetch('http://localhost:3000/profile.html', {
    headers:{
        Authorization: `Bearer ${token}`
    }
})
    .then(response => response.json())
    .then(handleUser)


function handleUser(user){
    welcome.textContent=(`Welcome ${user.user.fullName}!!`)
    let friends = user.users
    let breaks = user.user.breaks
    let userID = user.user.id


    handleFriends(friends,user)
    handleBreaks(breaks,userID)
}

function handleBreaks(breaks,userID){
    breaks.forEach(coffeeBreak => {
        createBreakCard(coffeeBreak,userID)
    })
}

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




function handleFriends(friends,user){

    friends.forEach(friend=>{
        friendCard(friend,user)
    })
}

function friendCard(friend,user){
    console.log(friend)
    console.log(user.user)
    console.log(friend.id == user.user.id)

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
        .then(response => response.json())
        .then(createBreakCard(friend,currentUser))

    }



}


