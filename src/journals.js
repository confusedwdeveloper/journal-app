// This is where I will put everything that handles journal entries. This includes journals array and functions to expose and perform CRUD operations on it
import uuidv4 from 'uuid/v4'
import moment from 'moment'

let journals = []

// A function to load journals from loacal storage
const loadJournals = () => {
    const journalJSON = localStorage.getItem('journal')
    try {
        journals = journalJSON ? JSON.parse(journalJSON) : []
    } catch (e) {
        journals = []
    }
}

// A function to save journals to local storage
const saveJournals = () => {
    localStorage.setItem('journal', JSON.stringify(journals))
}

// A function to create new journal entry 
const createJournal = () => {
    const id = uuidv4()
    const timestamp = moment().valueOf()

    journals.push({
        id,
        createdAt: timestamp,
        updatedAt: timestamp,
        title: '',
        body: '',
        todos: []
    })
    saveJournals() // saving all changes to storage
    return id
}

// A function to remove journal entry based on id
const removeJournal = (id) => {
    const journalIndex = journals.findIndex((entry) => entry.id === id)
    if (journalIndex > -1) {
        journals.splice(journalIndex, 1)
        saveJournals() //saving changed journal array to local storage
    }
}
 // A function to update journal entries
 const updateJournalText = (id, { title, body, todos }) => { 
     // need two arguments. 1. id to find entry to update and an object containing updates
     const journal = journals.find((entry) => entry.id === id)
     // terminate the function in case entry not found
     if (!journal) {
         return
     }
     if (typeof title === 'string') {
         journal.title = title
         journal.updatedAt = moment().valueOf()
     }
     if (typeof body === 'string') {
         journal.body = body
         journal.updatedAt = moment().valueOf()
     }
     // I will create seperate module to handle todos
     saveJournals()

 }

 // A function to expose journals to other files
 const getJournals = () => journals

 // A function to sort journal entries
 const sortJournals = ({ sortBy }) => {
    if (sortBy === 'byCreated') {
        return journals.sort((a,b) => {
            if (a.createdAt > b.createdAt) {
                return -1
            } else if (b.createdAt > a.createdAt) {
                return 1
            } else {
                return 0
            }
        })
    } else if (sortBy === 'byEdited') {
        return journals.sort((a,b) => {
            if (a.updatedAt > b.updatedAt) {
                return -1
            } else if (b.updatedAt > a.updatedAt) {
                return 1
            } else {
                return 0
            }
        })
    } else {
        return journals
    }
 }

 // calling loadJournals to load the journal entries from local storage
 loadJournals()

//  Setting up exports
export { getJournals, loadJournals, createJournal, removeJournal, sortJournals, updateJournalText }

