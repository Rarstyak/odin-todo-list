import PubSub from 'pubsub-js';
import Keys from './keys.js';

const Todo = (title, description, dueDate, priority, done, note) => {
    let _title = title || 'Untitled';
    let _description = description || '';
    let _dueDate = dueDate || '';
    let _priority = priority || '';
    let _done = done || false;
    let _note = note || '';

    const getTitle = () => {
        return _title;
    };

    const setTitle = (title) => {
        if (_title == title || title == undefined) {
            return false;
        } else {
            _title = title;
            return true;
        }
    };

    const getDescription = () => {
        return _description;
    };

    const setDescription = (description) => {
        if (_description == description || description == undefined) {
            return false;
        } else {
            _description = description;
            return true;
        }
    };

    const getDueDate = () => {
        return _dueDate;
    };

    const setDueDate = (dueDate) => {
        if (_dueDate == dueDate || dueDate == undefined) {
            return false;
        } else {
            _dueDate = dueDate;
            return true;
        }
    };

    const getPriority = () => {
        return _priority;
    };

    const setPriority = (priority) => {
        if (_priority == priority || priority == undefined) {
            return false;
        } else {
            _priority = priority;
            return true;
        }
    };

    const getDone = () => {
        return _done;
    };

    const setDone = (done) => {
        if (_done == done || done == undefined) {
            return false;
        } else {
            _done = done;
            return true;
        }
    };

    const toggleDone = () => {
        _done = !_done;
        return true;
    }

    const getNote = () => {
        return _note;
    };

    const setNote = (note) => {
        if (_note == note || note == undefined) {
            return false;
        } else {
            _note = note;
            return true;
        }
    };

    const update = (title, description, dueDate, priority, done, note) => {
        const changed = [
            setTitle(title),
            setDescription(description),
            setDueDate(dueDate),
            setPriority(priority),
            setDone(done),
            setNote(note)
        ].some(i => i);
        return changed;
    }

    const toJSON = () => {
        return {
            title: getTitle(),
            description: getDescription(),
            dueDate: getDueDate(),
            priority: getPriority(),
            done: getDone(),
            note: getNote(),
        }
    };

    return {
        getTitle, getDescription, getDueDate, getPriority, getDone, getNote,
        update, toggleDone,
        toJSON
    };
};

const Project = (title, description) => {
    let _title = title || 'Untitled';
    let _description = description || '';
    const _todos = [];

    const getTitle = () => {
        return _title;
    };

    const setTitle = (title) => {
        if (_title == title || title == undefined) {
            return false;
        } else {
            _title = title;
            return true;
        }
    };

    const getDescription = () => {
        return _description;
    };

    const setDescription = (description) => {
        if (_description == description || description == undefined) {
            return false;
        } else {
            _description = description;
            return true;
        }
    };

    const update = (title, description) => {
        const changed = [
            setTitle(title),
            setDescription(description)
        ].some(i => i);
        return changed;
    };

    const addTodo = (todo) => {
        _todos.push(todo);
    };

    const editTodo = (index, title, description, dueDate, priority, done, note) => {
        return _todos[index].update(title, description, dueDate, priority, done, note);
    }

    const toggleTodo = (index) => {
        return _todos[index].toggleDone();
    }

    const removeTodo = (index) => {
        _todos.splice(index, 1);
    }

    const moveTodo = (indexA, indexB) => {
        // Move todo at index a to index b
        const holdA = _todos[a];
        if (indexA < indexB) {
            _todos.splice(indexB, 0, holdA);
            _todos.splice(indexA, 1);
        } else {
            _todos.splice(indexA, 1);
            _todos.splice(indexB, 0, holdA);
        }
    }

    // const moveTodoUp = (index) => {
    //     moveTodo(index, index+1);
    // }

    // const moveTodoDown = (index) => {
    //     moveTodo(index, index-1);
    // }

    const getDone = () => {
        return _todos.reduce((sum, todo) => {
            sum = todo.getDone() ? 1 : 0;
        }, 0);
    }

    const getTotal = () => {
        return _todos.length;
    }

    const getTodosJSON = () => {
        return _todos.map( (todo) => {
            return todo.toJSON();
        });
    };

    const toJSON = () => {
        return {
            title: getTitle(),
            description: getDescription(),
            todos: getTodosJSON(),
        }
    }

    return {
        getTitle, getDescription,
        setTitle, setDescription,
        update,
        addTodo, editTodo, toggleTodo, removeTodo, moveTodo, getTodosJSON,
        toJSON
    }
};

export default (function() {
    const _projects = [];
    let _viewProjectID = 0;

    // Helper Functions

    const addProject = (project) => {
        return _projects.push(project);
    };

    // Handler Functions

    const localStorageSave = () => {
        localStorage.setItem('projects', JSON.stringify(_projects));
    };

    const localStorageLoad = () => {
        _viewProjectID = 0;
        _projects.length = 0;
        // Rebuild all projects from local storage, if there are none, create a default
        const dataProjects = JSON.parse(localStorage.getItem('projects')) || [];
        if (dataProjects.length) {
            dataProjects.forEach(dataProject => {
                // Rebuild project
                const project = Project(
                    dataProject.title, 
                    dataProject.description
                );
                addProject(project);
                // Rebuild all todos for current project
                if (dataProject.todos.length) {
                    dataProject.todos.forEach(dataTodo => {
                        const todo = Todo(
                            dataTodo.title,
                            dataTodo.description,
                            dataTodo.dueDate,
                            dataTodo.priority,
                            dataTodo.done,
                            dataTodo.note
                        );
                        project.addTodo(todo);
                    });
                }
            });
            // PubSub.publish(Keys.DOM_UPDATE_ALL, 'Load prior data');
            publishList();
        } else {
            // Init default placeholders
            const initProject = Project('Default', 'The default project');
            addProject(initProject);
            initProject.addTodo(Todo('1'));
            initProject.addTodo(Todo('2', 'yeet'));
            initProject.addTodo(Todo('3'));
            // PubSub.publish(Keys.DOM_UPDATE_ALL, 'Init default data');
            publishList();
        };
    };

    const localStorageReset = () => {
        if (confirm('This will clear local storage. Are you sure?')) {
            localStorage.removeItem('projects');
            localStorageLoad();
        }
    };

    const listSelectHandler = (msg, index) => {
        _viewProjectID = index;
        publishProject();
    };

    const todoToggleHandler = (msg, index) => {
        const changed = _projects[_viewProjectID].toggleTodo(index);
        if (changed) {
            publishTodo();
        }
    };

    const projectAddHandler = (msg, data) => {
        const project = Project(
            data.title,
            data.description
        );
        const count = addProject(project);
        publishList();
        listSelectHandler(null, count-1);
    };

    const projectEditHandler = (msg, data) => {
        const changed = _projects[data.index].update(
            data.title,
            data.description
        );
        if (changed) {
            _viewProjectID = data.index;
            publishList();
        }
    };

    const projectMoveHandler = (msg, data) => {
        const holdA = _projects[data.indexA];
        if (data.indexA < data.indexB) {
            _projects.splice(data.indexB, 0, holdA);
            _projects.splice(data.indexA, 1);
        } else {
            _projects.splice(data.indexA, 1);
            _projects.splice(data.indexB, 0, holdA);
        }
    }

    const projectRemoveHandler = (msg, index = _viewProjectID) => {
        if (_projects.length > 1 && index < _projects.length) {
            _projects.splice(index, 1);
            _viewProjectID -= index <= _viewProjectID ? 1 : 0;
            publishList();
        }
    }

    const todoAddHandler = (msg, dataTodo) => {
        const todo = Todo(
            dataTodo.title,
            dataTodo.description,
            dataTodo.dueDate,
            dataTodo.priority,
            dataTodo.done,
            dataTodo.note
        );
        _projects[_viewProjectID].addTodo(todo);
        publishTodo();
    };

    const todoEditHandler = (msg, dataTodo) => {
        const changed = _projects[_viewProjectID].editTodo(dataTodo.index,
            dataTodo.title,
            dataTodo.description,
            dataTodo.dueDate,
            dataTodo.priority,
            dataTodo.done,
            dataTodo.note
        );
        if (changed) {
            publishTodo();
        }
    };

    const todoMoveHandler = (msg, data) => {
        _projects[_viewProjectID].moveTodo(data.indexA, data.indexB);
    }

    const todoRemoveHandler = (msg, index) => {
        _projects[_viewProjectID].removeTodo(index);
        publishTodo();
    };

    // DOM update Functions

    // For getting an array of names to make tab buttons out of
    const getCurrentListInfo = () => {
        let titles = _projects.map((project) => {
            return project.getTitle();
        });
        return titles;
    };

    const getCurrentProjectInfo = () => {
        const currentProject = _projects[_viewProjectID];
        return {
            title: currentProject.getTitle(),
            description: currentProject.getDescription(),
        }
    };

    const getCurrentTodoInfo = () => {
        return _projects[_viewProjectID].getTodosJSON();
    };

    const publishList = () => {
        PubSub.publish(Keys.DOM_UPDATE_LIST, getCurrentListInfo());
        publishProject();
    };

    const publishProject = () => {
        PubSub.publish(Keys.DOM_UPDATE_PROJECT, getCurrentProjectInfo());
        publishTodo();
    };

    const publishTodo = () => {
        PubSub.publish(Keys.DOM_UPDATE_TODO, getCurrentTodoInfo());
    };

    (function init() {
        // Set Subscribers
        PubSub.subscribe(Keys.LOCAL_STORAGE_SAVE, localStorageSave);
        PubSub.subscribe(Keys.LOCAL_STORAGE_LOAD, localStorageLoad);
        PubSub.subscribe(Keys.LOCAL_STORAGE_RESET, localStorageReset);

        // List Select
        PubSub.subscribe(Keys.LIST_SELECT, listSelectHandler);
        PubSub.subscribe(Keys.TODO_TOGGLE, todoToggleHandler);
        // Project
        PubSub.subscribe(Keys.PROJECT_ADD, projectAddHandler);
        PubSub.subscribe(Keys.PROJECT_EDIT, projectEditHandler);
        PubSub.subscribe(Keys.PROJECT_MOVE, projectMoveHandler);
        PubSub.subscribe(Keys.PROJECT_REMOVE, projectRemoveHandler);
        // Todo
        PubSub.subscribe(Keys.TODO_ADD, todoAddHandler);
        PubSub.subscribe(Keys.TODO_EDIT, todoEditHandler);
        PubSub.subscribe(Keys.TODO_MOVE, todoMoveHandler);
        PubSub.subscribe(Keys.TODO_REMOVE, todoRemoveHandler);

        // Load prior data
        localStorageLoad();
    })();

    return {
        localStorageSave,
        localStorageLoad
    };
})();