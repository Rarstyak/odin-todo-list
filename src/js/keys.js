export default (function() {
    const   LOCAL_STORAGE_SAVE = 'local storage save',
            LOCAL_STORAGE_LOAD = 'local storage load',
            LOCAL_STORAGE_RESET = 'local storage reset',

            // List (App) -> (Interface all project tabs)
                // [] of titles
            // Project (App) -> (Interface all todos in project)
            // Todo (App) -> (Interface all data in todo)

            DOM_UPDATE_LIST = 'dom update list',
            DOM_UPDATE_PROJECT = 'dom update project',
            DOM_UPDATE_TODO = 'dom update todo',

            // Edit (Interface) -> (App Project List)
                // data = project id in _projects via button id
            LIST_SELECT = 'list select',
            TODO_TOGGLE = 'todo toggle',

            // Add (Interface) -> (App ^ Project List)
                // data.title, data.description
            // Edit (Interface) -> (App Project)
                // someway to reference the project
                // data.id
                // new data
                // data.title, data.description
            // Move (Interface) -> (App ^ Projet List)
                // data.id1
                // data.id2
            // Remove (Interface) -> (App ^ Project List)
                // data.id

            PROJECT_ADD = 'project add',
            PROJECT_EDIT = 'project edit',
            PROJECT_MOVE = 'project move',
            PROJECT_REMOVE = 'project remove',

            // Add (Interface) -> (App ^ Project)
            // Edit (Interface) -> (App ToDo)
            // Move (Interface) -> (App ^ ^ Projet List)
            // Remove (Interface) -> (App ^ Project)

            TODO_ADD = 'todo add',
            TODO_EDIT = 'todo edit',
            TODO_MOVE = 'todo move',
            TODO_REMOVE = 'todo remove';

    return {
        LOCAL_STORAGE_SAVE, //Done
        LOCAL_STORAGE_LOAD, //Done
        LOCAL_STORAGE_RESET, //Done

        DOM_UPDATE_LIST, //Done
        DOM_UPDATE_PROJECT, //Done
        DOM_UPDATE_TODO, //Done

        LIST_SELECT, //Done
        TODO_TOGGLE,

        PROJECT_ADD, //Incomplete
        PROJECT_EDIT,
        PROJECT_MOVE, //Uninplimented
        PROJECT_REMOVE,

        TODO_ADD,
        TODO_EDIT,
        TODO_MOVE,
        TODO_REMOVE,
    };
})();