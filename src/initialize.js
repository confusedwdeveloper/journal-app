// This module will be used to initialize edit page with date when user gets redirected
import { getJournals } from './journals'
import { generateLastEdited } from './journal-view'

// Function to initialize Edit Page with date from entry
const initializeEditPage = (entryId) => {
    const titleEl = document.querySelector('.entry-title')
    const bodyEl = document.querySelector('.entry-body')
    const journals = getJournals()
    const entry = journals.find((item) => item.id === entryId)
    // If no entry found return to homepage
    if (!entry) {
        location.assign('/index.html')
    }

    titleEl.value = entry.title
    bodyEl.value = entry.body
    
    // calling EditPageEdit function to populate span element with last edited message
    editPageEditMessage(entry)
}

// Function to generate last edited message
const editPageEditMessage = (entry) => {
    const spanEl = document.querySelector('#moment')
    // I will call this function inside initializeEditPage function
    // So I don't need to verify the status of existence of entry
    
    spanEl.textContent = generateLastEdited(entry.updatedAt)
}


export { initializeEditPage }