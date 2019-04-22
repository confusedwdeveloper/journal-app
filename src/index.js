import './scss/styles.scss'
import { getJournals, loadJournals, createJournal, removeJournal, sortJournals, updateJournalText } from './journals'
import { getFilters, setFilters } from './filters'
import { getTodos, createTodo, removeTodo, toggleTodo } from './todos'
import { generateEntryCard } from './journal-view'

// createJournal()
console.log(getJournals())
const x = generateEntryCard({
    body: "",
createdAt: 1555747223374,
id: "27148367-1efb-4afb-8a4a-9855ba79b676",
title: "",
todos: [{
    completed: false,
id: "10aadebf-2c1c-4f55-b9a8-f54044d06a76",
text: "Hello hello My name is Darshan"
},
{
    completed: false,
id: "10aadebf-2c1c-4f55-b9a8-f54044d06a76",
text: "Hello hello My name is Darshan"
}],
updatedAt: 1555747223374
})


document.querySelector('body').appendChild(x)