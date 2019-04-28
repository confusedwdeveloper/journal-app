// Function to manage filters object that will be dynamically updated
const filters = {
    todoSearchText: '',
    journalsSearchText: '',
    hideCompleted: false, // toggle todo
    sortBy: 'byEdited' // sort journal entries
}

// expose filters to other files
const getFilters = () => filters

// function to set/change filters
const setFilters = ({ todoSearchText, journalsSearchText, hideComleted, sortBy }) => {
    if (typeof todoSearchText === 'string') {
        filters.todoSearchText = todoSearchText
    }
    if ( typeof journalsSearchText === 'string') {
        filters.journalsSearchText = journalsSearchText
    }
    if (typeof hideComleted === 'boolean') {
        filters.hideComleted = hideComleted
    }
    if (typeof sortBy === 'string') {
        filters.sortBy = sortBy
    }
}

// setting up exports
export { getFilters, setFilters }