import './scss/styles.scss'
import { getJournals, loadJournals, createJournal, removeJournal, sortJournals, updateJournalText } from './journals'
import { getFilters, setFilters } from './filters'
import { getTodos, createTodo, removeTodo, toggleTodo } from './todos'
import { renderJournals } from './journal-view'


// Render entries when the app starts
renderJournals()

// Wiring up filter input
document.querySelector('#filter').addEventListener('input', (e) => {
    setFilters({
        journalsSearchText: e.target.value
    })
    renderJournals()
})

// Wiring up dropdown
document.querySelector('.dropdown').addEventListener('change', (e) => {
    setFilters({
        sortBy: e.target.value
    })
    renderJournals()
})

// Wiring up create Journal Button
document.querySelector('.button').addEventListener('click', (e) => {
    const id = createJournal()
    location.assign(`/edit.html#${id}`)
})

// Setting up tab synchorization
window.addEventListener('storage', (e) => {
    if (e.key === 'journal') {
        loadJournals()
        renderJournals()
    }
})
