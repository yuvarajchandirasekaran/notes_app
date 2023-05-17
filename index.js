let addBtn = document.querySelector('.card')
let form = document.querySelector('.formsection')
let closebtn = document.querySelector('.closebtn')
let firstrow = document.querySelector('.firstrow')

let input1 = document.querySelector('.title')
let input2 = document.querySelector('.body')
let submitbtn = document.querySelector('.submit')
let notify = document.querySelector('.notifydiv')
let notification = document.querySelector('.notification')

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const d = new Date();
const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

let t = [d.getDate()];
let year = d.getFullYear()
let m = months[d.getMonth()];
// let isedit=false

let dates = new Date()

addBtn.addEventListener('click', () => {
    form.classList.add('show')
    submitbtn.value = "Add Note"

})
closebtn.addEventListener('click', () => {
    form.classList.remove('show')
    input1.value = ""
    input2.value = ""

})

submitbtn.addEventListener('click', (e) => {
    e.preventDefault()

    // isedit = false

    if (input1.value !== "" && input2.value !== "") {

        if (submitbtn.value == "Add Note") {
            fetch('http://localhost:3000/posts', {
                method: "POST",
                body: JSON.stringify({
                    title: input1.value,
                    body: input2.value,
                    time: `${t}-${m},${year}`
                }),
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            }).then((res => {
                popup()
            })).catch((err) => {
                console.log(err)
            });

        }
    }
    else {
        alert("Please enter value")
    }

})



window.addEventListener('DOMContentLoaded', () => {
    fetch('http://localhost:3000/posts')
        .then(res => res.json())
        .then(datas => {
            for (let i = 0; i < datas.length; i++) {

                // main div
                let subdiv = document.createElement('div')
                subdiv.setAttribute('class', 'sub-div')

                //card header
                let title = document.createElement('h3')
                title.setAttribute('class', 'tittle')

                //card body
                let line1 = document.createElement('hr')
                let description = document.createElement('article')
                description.setAttribute('class', 'description')
                let line2 = document.createElement('hr')

                //card footer
                let time = document.createElement('span')
                time.setAttribute('class', 'timestamp')

                // footer div
                let footerdiv = document.createElement('div')
                footerdiv.setAttribute('class', 'datesection')

                //button parent div
                let buttondiv = document.createElement('div')
                buttondiv.setAttribute('class', 'buttondiv')
                //

                //buttons

                let editimg = document.createElement('img')
                editimg.setAttribute('class', 'editbtn')
                editimg.src = "pen-to-square-regular.svg"
                editimg.setAttribute('id', `${datas[i].id}`)

                let deleteimg = document.createElement('img')
                deleteimg.setAttribute('class', 'deletebtn')
                deleteimg.src = "trash-solid.svg"
                deleteimg.setAttribute('id', `${datas[i].id}`)

                let editbtn = document.createElement('div')
                editbtn.append(editimg)

                let deletbtn = document.createElement('div')
                deletbtn.append(deleteimg)


                title.innerText = datas[i].title
                description.innerText = datas[i].body
                time.innerText = datas[i].time


                subdiv.append(title)
                subdiv.append(line1)
                subdiv.append(description)
                subdiv.append(line2)
                footerdiv.append(time)
                // footerdiv.append(id)    
                // footerdiv.appendChild(icon)
                subdiv.append(footerdiv)
                buttondiv.append(editbtn)
                buttondiv.append(deletbtn)
                subdiv.append(buttondiv)

                firstrow.appendChild(subdiv)

                // DELETE FUNCTION
                deleteAction(deletbtn)
                //
                //EDIT FUNCTION
                editAction(editbtn)
                // 


            }

        })
})



// edit function
function editAction(editbtn) {
    editbtn.addEventListener('click', (e) => {

        // isedit = true
        submitbtn.value = "update"
        form.classList.add('show')
        let updateid = e.target.id
        // assigning the value from target note
        let oldtitle = e.target.parentElement.parentElement.parentElement.children[0].innerText
        let olddescription = e.target.parentElement.parentElement.parentElement.children[2].innerText
        console.log(oldtitle)
        console.log(olddescription);
        input1.value = oldtitle
        input2.value = olddescription

        submitbtn.addEventListener('click', (e) => {
            if (input1.value !== "" && input2.value !== "") {
                if (submitbtn.value == "update") {
                    fetch(`http://localhost:3000/posts/${updateid}`, {
                        method: "PUT",
                        headers: { 'content-type': 'application/json' },
                        body: JSON.stringify({
                            'title': input1.value,
                            'body': input2.value,
                            'time': `${t}-${m},${year}`,
                            'id': updateid
                        })
                    }).then(res => {
                        popup()
                    })
                        .catch((err) => {
                            console.log(err)
                        });

                }

            }
            else {
                alert("Please enter value")
            }
        })

    })
}



function popup() {

    if (submitbtn.value == "Add Note") {
        formhide(form)
        notify.classList.add('show')
        setTimeout(() => {
            notify.classList.remove('show')
            window.location.reload()

        }, 1000);
    }

    else if (submitbtn.value == "update") {
        notification.innerText = "Item Successfully Updated"
        formhide(form)
        notify.classList.add('show')
        setTimeout(() => {
            notify.classList.remove('show')
            window.location.reload()
        }, 1000);
    }

}




function deleteAction(deletbtn) {
    deletbtn.addEventListener('click', (e) => {
        fetch(`http://localhost:3000/posts/${e.target.id}`, {
            method: "DELETE",

            headers: { 'content-type': 'application/json' }
        })
            .catch((err) => {
                console.log(err)
            });

        location.reload()
    })
}


function formhide(form) {
    form.style.display = 'none'
}












