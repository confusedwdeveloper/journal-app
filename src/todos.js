// Module to perform crud operations and expose and manage todos. 
import { getJournals } from './journals'
import uuidv4 from 'uuid/v4'

// function to expose todos
const getTodos = (journalId) => {
    const journal = getJournals().find((entry) => entry.id === journalId)
    if (!journal) {
        return []
    }
    try {
        return journal.todos
    } catch (e) {

    }
}

// function to create todo
const createTodo = (journalId, text) => {
    const journals = getJournals()
    const journal = journals.find((entry) => entry.id === journalId)
    const id = uuidv4()

    journal.todos.push({
        id,
        text,
        completed: false
    })
    localStorage.setItem('journal', JSON.stringify(journals))
}

// A function to remove a todo based on id
const removeTodo = (journalId, todoId) => {
    const journals = getJournals()
    const journal = journals.find((entry) => entry.id === journalId)
    // index of todo to remove
    const todoIndex = journal.todos.findIndex((todo) => todo.id === todoId )

    if (todoIndex > -1) {
        journal.todos.splice((todoIndex, 1))
        localStorage.setItem('journal', JSON.stringify(journals))
    }
}

// A function to toggle todo completed status

const toggleTodo = (journalId, todoId) => {
const journals = getJournals()
const journal = journals.find((entry) => entry.id === journalId)
const todo = journal.todos.find((todo) => todo.id === todoId)
if (todo) {
    todo.completed = !todo.completed
    localStorage.setItem('journal', JSON.stringify(journals))
}
}

// setting up exports
export { getTodos, createTodo, removeTodo, toggleTodo }