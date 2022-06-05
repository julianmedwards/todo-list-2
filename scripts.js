let tasks = []

function add() {
    let taskString = this.event.target.elements.taskField.value
    let index = tasks.length

    let taskLi = document.createElement('li')
    taskLi.classList.add('task')
    taskLi.setAttribute('data-index', index)
    let taskIcon = document.createElement('i')
    taskIcon.classList.add('bi', 'bi-app', 'del')
    let taskP = document.createElement('p')
    taskP.textContent = taskString

    addDelListeners(taskIcon)

    let taskList = document.getElementById('tasks')
    taskLi.append(taskIcon, taskP)

    tasks.push(taskLi)

    taskList.prepend(taskLi)

    console.clear()
    console.table(tasks)

    this.event.target.reset()
}

// Event listeners to change icon on mouseover and remove from
// DOM and tasks array when clicked.
function addDelListeners(icon) {
    icon.addEventListener('mouseover', function () {
        this.classList.remove('bi-app')
        this.classList.add('bi-check2-square')
    })
    icon.addEventListener('mouseout', function () {
        this.classList.remove('bi-check2-square')
        this.classList.add('bi-app')
    })
    icon.addEventListener('click', function () {
        let task = this.parentElement
        let index = task.getAttribute('data-index')

        tasks.splice(index, 1)
        reIndex(tasks, index)

        console.clear()
        console.table(tasks)

        task.remove()
    })
}

// Iterates through all tasks in the tasks array. Once it reaches the
// passed index it starts reassigning data-index attributes on each
// task list item.
function reIndex(tasks, startIndex) {
    tasks.forEach((element, index) => {
        startIndex = Number(startIndex)
        if (index >= startIndex) {
            element.setAttribute('data-index', startIndex)
            startIndex += 1
        }
    })
    return tasks
}
