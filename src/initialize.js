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
    
    document.querySelector('#moment').textContent = generateLastEdited(entry.updatedAt)
}

// I better create a function to find Entry updatedAt timestamp since i will just be repeating it
const findTimestamp = (entryId) => {
    const entry = getJournals().find((item) => item.id === entryId)
    return entry.updatedAt
}

export { initializeEditPage, findTimestamp }