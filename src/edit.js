// This page will handle edit.html
import './scss/edit.scss'
import { initializeEditPage, findTimestamp } from './initialize'
import { updateJournalText, removeJournal } from './journals'
import { renderTodos } from './todo-view'
import { generateLastEdited } from './journal-view'

const timeEl = document.querySelector('#moment')// span displaying last edited

// Parse entry Id from the url string
const entryId = location.hash.substring(1)

// Initialize the page with data from entry Object
initializeEditPage(entryId)

// Render Todos
renderTodos(entryId)

// Wire up input with event listener to save title
document.querySelector('.entry-title').addEventListener('input', (e) => {
    updateJournalText(entryId, {
        title: e.target.value
    })
    timeEl.textContent = generateLastEdited(findTimestamp(entryId))
})

// Wire up textarea to update entry body text
document.querySelector('.entry-body').addEventListener('input', (e) => {
    updateJournalText(entryId, {
        body: e.target.value
    })
    timeEl.textContent = generateLastEdited(findTimestamp(entryId))
})

// Wire up remove entry button
document.querySelector('.remove-entry').addEventListener('click', (e) => {
    removeJournal(entryId)
    location.assign('/index.html')
})
