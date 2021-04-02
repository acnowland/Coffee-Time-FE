# README

# FRONTEND FOR COFFEETIME
==============================

# YOUR SOLUTION FOR MEETING COWORKERS....DIGITALLY


# Table Of Contents
* General Information
* Technologies
* Setup
* Use
* Code Examples
* To-do

This is the current version of the front end for my project called CoffeeTime. CoffeeTime is based on internal meeting services used by larger companies. I decided to design this with the main purpose of deploying it and allowing my school to have a way to offer new students and easy solution to meet students in upper Mods. This was an extremely fun and rewarding project to work on. I focused on having my Auth up and running on the backend and on the Frontend I was able to really push my design skills. Setting up a 'friending' model that was used to display users coffee breaks was especially rewarding to get working and makes me appreciate the depth of social media platforms!


**_Technologies_**

* Ruby on Rails for the backend (CURRENT BACKEND FOUND....HERE! "https://github.com/acnowland/Coffee-Time-BE")
* HTML/CSS/VANILLA JS for Frontend
* SweetAlert for alerts and popups
* Rails Auth - JWT/B-crypt

**Setup**

* First and foremost, you will want to make sure you have forked and cloned the backend from above and setup and detailed via the setup portion on the backend repo. 
* Fork and Clone frontend to make local
* once back-end is running, run lite-server to start the front end and enjoy! 


**Use**

(Will add video soon)

Using this web app is very straightforward and will function like most social medial websites you use; just on a much smaller scale. You will first want to create a user/users. This will ask you some questions and once submitted you can then proceed to  your login. Once you login, you will be able to see all other users on the platform so far. You can see their mod and their time they prefer to meet for coffee. A request button is shown on the cards and upon clicking it a coffee freindship will form; represented via a card on the left hand side. Once clicked, it also makes a coffee break for the other user as well. As long as they put in their slack link correctly, you can click on that link and proceed to set up a time to meet for coffee! Once you have finished, just click the finish button and it will remove the break for both users! Meeting people has never been so simple! 

**_Code Examples_**

The front end part of this project was awesome and really represented some unique challenges when passing a user around doing Auth. All of the information that is populated on the front page is done via one GET fetch request initially and the user that is logged in passed all needed information into their profile. 

```
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

```
I also was able to utilize my first attempt at a modal on my HTML. This is the only part of the platform not finished; needs to have a fetch update made still.(Which will be done soon I hope!)

```
 <div class='logout-area'>
            <button id='modal-button' class="mod-button">Edit Profile</button>
            <div id='edit-modal', class='modal'>
                <div class="modal-content">
                    <span class="close-button">&times;</span>
                    <h1 class = 'modal-username'>Username</h1>
                    <div class='edit-container'>
                        <form class = 'modal-form'>
                            <h3>MOD:</h3>
                            <input type="number" name = "mod" placeholder="Change Current Mod">
                            <h3>Change preferred time:</h3>
                            <div class = 'radio-buttons'>
                                <input type="radio" name = "timeAvailable" value = 'Morning'>
                                <label for="Morning">Morning</label>
                                <input type="radio" name = "timeAvailable" value = 'Afternoon'>
                                <label for="Afternoon">Afternoon</label>
                                <input type="radio" name = "timeAvailable" value = 'Evening'>
                                <label for="Evening">Evening</label>
                            </div>
                            <input class = 'mod-submit' type="submit">
                        </form>

                    </div>
                </div>
            </div>
 
            <a class = 'logout' href="./index.html">Logout</a>
        </div>

```

**_TO DO_**
* The first priority is finishing the update method on the backend to allow a user to update their mod and their time available
* After that I will be deploying to heroku likely!

**Created By**

**Adam Nowland**
