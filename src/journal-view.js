import moment from 'moment'

// A function to generate last edited message. I need moment for that
const generateLastEdited = (timestamp) => {
    return ` Last edited ${moment(timestamp).fromNow()}`
}

// A function to display formatted date
const generateDate = (timestamp) => {
    return `${moment(timestamp).format('Do MMM YYYY, hh:mm')}`
}

// Function to generate task left message
const taskLeft = (array) => {
    const x = array.length === 0? 'no' : array.length === 1? 'one' : 'some'
    const task = array.length === 1? 'task' : 'tasks'
    return `Your have ${x} ${task} left`
}

// Function to generate each cards for Journal Entries
const generateEntryCard = (item) => {
    const rootDiv = document.createElement('a') // root element that we can return

    const dateEl = document.createElement('p') // to render Date
    dateEl.textContent = generateDate(item.createdAt)
    rootDiv.appendChild(dateEl)

    const titleEl = document.createElement('h3') // to render entry title
    if (item.title.length === 0) {
        titleEl.textContent = 'Unnamed Journal'
    } else {
        titleEl.textContent = item.title
    }
    rootDiv.appendChild(titleEl)

    const taskEl = document.createElement('p')// to show tasks left
    taskEl.textContent = taskLeft(item.todos)
    rootDiv.appendChild(taskEl)

    const editEl = document.createElement('p')
    editEl.textContent = generateLastEdited(item.updatedAt)
    rootDiv.appendChild(editEl)

    return rootDiv

}

export { generateEntryCard }