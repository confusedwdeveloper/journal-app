// This page will handle edit.html
import './scss/edit.scss'
import { initializeEditPage, findTimestamp } from './initialize'
import { updateJournalText, removeJournal, loadJournals } from './journals'
import { renderTodos } from './todo-view'
import { generateLastEdited } from './journal-view'
import { setFilters } from './filters'
import { createTodo } from './todos'

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

// Todos section

// Wire up todo filter
document.querySelector('.todos__input').addEventListener('input', (e) => {
    setFilters({
        todoSearchText: e.target.value
    })
    renderTodos(entryId)
})

//Wire up hideCompleted checkbox
document.querySelector('#todos__checkbox').addEventListener('change', (e) => {
    setFilters({
        hideCompleted: e.target.checked
    })
    renderTodos(entryId)
})

// set up form event listener to add new todo
document.querySelector('#todos__form').addEventListener('submit', (e) => {
    e.preventDefault()
    const text = e.target.elements.newTodo.value.trim()
    if (text.length > 0) {
        createTodo(entryId, text)
        renderTodos(entryId)
        timeEl.textContent = generateLastEdited(findTimestamp(entryId))
        e.target.elements.newTodo.value = ''
    }
})

// set up tab synchorization
window.addEventListener('storage', (e) => {
    if (e.key === 'journal') {
        loadJournals()
        initializeEditPage(entryId)
        renderTodos(entryId)
    }
})

// todo-button
const todoButton = document.querySelector('.todo-button')

window.addEventListener('scroll', (e) => {
    if (document.documentElement.scrollTop > 30 || document.body.scrollTop > 30) {
        todoButton.style.display = 'block'
    } else {
        todoButton.style.display = 'none'
    }
})
todoButton.addEventListener('click', (e) => {
    document.querySelector('.remove-entry').scrollIntoView()
    todoButton.style.zIndex = '-1'
})
