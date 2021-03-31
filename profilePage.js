console.log('ahmed')

const logout = document.querySelector('.logout')
const token = localStorage.getItem('token')
const friendContainer = document.querySelector('.card-container')
const breakContainer = document.querySelector('.side-bar')
console.log(breakContainer)

logout.addEventListener('click', (event) => {
    localStorage.clear()
})

fetch('http://localhost:3000/profile.html', {
    headers:{
        Authorization: `Bearer ${token}`
    }
})
    .then(response => response.json())
    .then(handleUser)


function handleUser(user){
    let friends = user.users
    let breaks = user.user.breaks
    handleFriends(friends,user)
    handleBreaks(breaks)
}

function handleBreaks(breaks){
    breaks.forEach(coffeeBreak => {
        createBreakCard(coffeeBreak)
    })
}

function createBreakCard(coffeeBreak){
    const breakCard = document.createElement('div')
    breakCard.className = 'break-card'    
    const name = document.createElement('h2')
    name.textContent = coffeeBreak.fullName
    const year = document.createElement('h4')
    year.textContent = `Mod ${coffeeBreak.mod}`
    const slack = document.createElement('a')
    slack.className = "break-slack"
    slack.textContent = 'Connect Via Slack'
    slack.href = coffeeBreak.slackLink

    breakCard.append(name, year, slack)
    breakContainer.append(breakCard)
}


function handleFriends(friends,user){

    friends.forEach(friend=>{
        friendCard(friend,user)
    })
}

function friendCard(friend,user){

    


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
    timeAvailable.textContent = "Time Available:"
    const time = document.createElement('h4')
    time.textContent = "need to add time"

    const reserveArea = document.createElement('div')
    reserveArea.className = 'reserve'

    const reserveButton = document.createElement('button')
    reserveButton.textContent = "Reserve Time"
    reserveButton.addEventListener('click', createBreak)

    friendAndTime.append(timeAvailable,time)
    reserveArea.append(reserveButton)
    bottomFriend.append(friendAndTime,reserveArea)


    friendCard.append(topFriend,bottomFriend)
    friendContainer.append(friendCard)

    function createBreak(){
        console.log(friend)
        const currentUser = user.user.id
        const newFriend = friend.id
        const newBreak = {
            user_1_id: currentUser,
            user_2_id: newFriend
        }
        createBreakCard(friend)
        fetch('http://localhost:3000/coffee_breaks',{
            method: 'POST',
            headers:{
                Authorization: `Bearer ${token}`,
                'content-type':'application/json'
            },
            body: JSON.stringify(newBreak)
        })

    }



}


