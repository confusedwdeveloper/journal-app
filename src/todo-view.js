// This module will be used to render todos
import { toggleTodo, removeTodo } from './todos'
import { getJournals } from './journals'
import { getFilters } from './filters'
import { generateLastEdited } from './journal-view'
import { findTimestamp } from './initialize'

const timeEl = document.querySelector('#moment')// span displaying last edited

// A function to generate individual todo card
const generateTodoCard = (entryId, todo) => {
    // Creating root label to contain a checkbox, span and button
    const rootEl = document.createElement('label')

    // A div to contain checkbox and span
    const divEl = document.createElement('div')

    // Create and set up/wire up a checkbox to toggle todo
    const checkEl = document.createElement('input')
    checkEl.setAttribute('type', 'checkbox')

    //change checkbox checked status
    checkEl.checked = todo.completed

    // add event listener to chance todo completed status
    checkEl.addEventListener('change', (e) => {
        toggleTodo(entryId, todo.id) // calling imported function from todos module
        timeEl.textContent = generateLastEdited(findTimestamp(entryId)) // update timestamp

        // Now call renderFunction defined below
        renderTodos(entryId)
    })
    // Append to div
    divEl.appendChild(checkEl)

    // Create and set up span element
    const spanEl = document.createElement('span')
    spanEl.textContent = todo.text

    // Append span
    divEl.appendChild(spanEl)

    //Append div on label
    rootEl.appendChild(divEl)

    // Create and set up/wire up button
    const buttonEl = document.createElement('button')
    buttonEl.textContent = 'Remove'

    // Wire up button
    buttonEl.addEventListener('click', (e) => {
        removeTodo(entryId, todo.id)
        // Now render new list
        timeEl.textContent = generateLastEdited(findTimestamp(entryId)) // update timestamp
        renderTodos(entryId)
    })
    // Append button
    rootEl.appendChild(buttonEl)
    return rootEl

}

// A function to render how many todos are left
const todosLeft = (todos) => {
    //since we will call it inside renderTodo where we will have 
    // todos read from local storage, we can simply pass todos array as an array
    todos = todos.filter((todo) => !todo.completed)
    const todo = todos.length === 1 ? 'todo' : 'todos'
    return `You have ${todos.length} ${todo} left to complete!`
}

// Now a function to renderTodos on edit.js page
const renderTodos = (entryId) => {
    const journals = getJournals()// getting journals array
    // getting filters
    const { todoSearchText, hideCompleted } = getFilters()

    const entry = journals.find((item) => item.id === entryId)
    let todos = entry.todos

    //Filtering todos based on filter input
    todos = todos.filter((todo) => todo.text.toLowerCase().trim().includes(todoSearchText.toLowerCase().trimStart()))

    // Filter todos based on hide completed checkbox value
    todos = todos.filter((todo) => {
        if (hideCompleted) {
            return !todo.completed
        } else {
            return todo
        }
    })

    // div to render todos
    const rootEl = document.querySelector('.todos-root')

    // clear html before appending
    rootEl.innerHTML = ''

    // Generate todos left List
    const todosLeftEl = document.createElement('p')
    todosLeftEl.textContent = todosLeft(todos)
    todosLeftEl.style.cssText = 'font-weight: 500; font-family: sans-serif; font-style: oblique; text-align: center; margin: 3rem auto 1.5rem auto; color: #1133E1;'
    rootEl.appendChild(todosLeftEl)

    //Render todos
    if (todos.length === 0) {
        const emptyMessageEl = document.createElement('p')
        emptyMessageEl.textContent = 'Nothing to show here'
        rootEl.appendChild(emptyMessageEl)
    } else {
        todos.forEach((todo) => {
            const cardEl = generateTodoCard(entryId, todo )
            rootEl.appendChild(cardEl)
        })
    }


}

export { renderTodos }