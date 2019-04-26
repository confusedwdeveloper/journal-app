// This page will handle edit.html
import './scss/edit.scss'
import { initializeEditPage } from './initialize'
import { updateJournalText } from './journals'

// Parse Entry Id from location object
const entryId = location.hash.substring(1)
initializeEditPage(entryId)
