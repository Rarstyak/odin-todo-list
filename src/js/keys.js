export default (function() {
    const   LOCAL_STORAGE_SAVE = 'local storage save',
            LOCAL_STORAGE_LOAD = 'local storage load',

            // Add (Interface) -> (App ^ Project)
            // Edit (Interface) -> (App ToDo)
            // Move (Interface) -> (App ^ ^ Projet List)
            // Remove (Interface) -> (App ^ Project)
            // Update (App) -> (Interface DOM)

            TODO_ADD = 'todo add',
            TODO_EDIT = 'todo edit',
            TODO_MOVE = 'todo move',
            TODO_REMOVE = 'todo remove',
            TODO_UPDATE = 'todo update',

            // Add (Interface) -> (App ^ Project List)
            // Edit (Interface) -> (App Project)
            // Move (Interface) -> (App ^ Projet List)
            // Remove (Interface) -> (App ^ Project List)
            // Update (App) -> (Interface DOM)

            PROJECT_ADD = 'project add',
            PROJECT_EDIT = 'project edit',
            PROJECT_MOVE = 'project move',
            PROJECT_REMOVE = 'project remove',
            PROJECT_UPDATE = 'project update',

            // Redo everything or parts based on msg/data?
            DOM_UPDATE = 'dom update';

    return {
        LOCAL_STORAGE_SAVE,
        LOCAL_STORAGE_LOAD,

        TODO_ADD,
        TODO_EDIT,
        TODO_MOVE,
        TODO_REMOVE,
        TODO_UPDATE,

        PROJECT_ADD,
        PROJECT_EDIT,
        PROJECT_MOVE,
        PROJECT_REMOVE,
        PROJECT_UPDATE,

        DOM_UPDATE,
    };
})();