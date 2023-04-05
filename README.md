# odin-todo-list

This project is my solution to the [Odin ToDo List Assignment](https://www.theodinproject.com/lessons/node-path-javascript-todo-list).

## Objectives

[ ] Dynamically create todos
[ ] Organize todoes within projects
[ ] Have a default project to view
[ ] separate application logic from DOM in separate modules
[ ] UI requirements
- [ ] view all projects
- [ ] view all todos in each project
- [ ] expand a single todo to see/edit its details
- [ ] edit a todo

## Packages
### Suggested

date-fns
Web Storage API: localStorage uses JSON
- see [WesBos tutorial](https://www.youtube.com/watch?v=YL1F4dCUlLc)

### Extra

pubsub-js

## Scratchpad

Data stored
    Projects
        Title
        Description?
        Identifier color/icon?
        []ToDos ref? - deleting would need to send all to default first
        // if Project was listed as ToDos prop, then would need to check all for parent project deletion
        // localStorage.setItem('items', JSON.stringify(items));
        // const items = JSON.parse(localStorage.getItem('items')) || [];
    ToDos
        Title
        Description
        Due Date
        Priority
        Notes?
        []Checklist?