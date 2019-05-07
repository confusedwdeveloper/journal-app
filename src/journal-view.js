// Module to render data on front page
import moment from 'moment'
import { sortJournals } from './journals'
import { getFilters } from './filters'

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
    array = array.filter((todo) => !todo.completed)
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

    // make cards clickable to take them to edit age
    rootDiv.setAttribute('href', `/edit.html#${item.id}`)

    return rootDiv

}

// Render everything from local storage
const renderJournals = () => {
    const rootEl = document.querySelector('#root') // root section to render
    const containerEl = document.createElement('div') // container of all entries

    // get the filters
    const filters = getFilters()

    //Get the sorted array. sorted based on dropdown
    let journals = sortJournals(filters) //let because we will filter it

    // Filter journals array based on user input
    journals = journals.filter((entry) => {
        return entry.title.toLowerCase().includes(filters.journalsSearchText.toLowerCase().trimStart())
    })
    // Now time to render our entries. First clear root div so as not to overlap
    rootEl.innerHTML = ''

    // Now time to render
    if (journals.length === 0) { // when there's no entry to display
        const emptyMessage = document.createElement('p')
        emptyMessage.textContent = 'Nothing to see here'
        rootEl.appendChild(emptyMessage)
    } else {
        journals.forEach((entry) => {
            const card = generateEntryCard(entry)
            rootEl.appendChild(card)
        })
    }

}

export { renderJournals, generateLastEdited }