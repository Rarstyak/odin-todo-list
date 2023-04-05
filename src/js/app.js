import PubSub from "pubsub-js";
import Keys from "./keys.js";
import Print from './print.js';

const Todo = (title, description, dueDate, priority, done, note) => {
    const _title = title || 'Untitled';
    const _description = description || '';
    const _dueDate = dueDate || '';
    const _priority = priority || '';
    const _done = done || false;
    const _note = note || '';

    const getTitle = () => {
        return _title;
    };

    const setTitle = (title) => {
        if (getTitle() == title) {
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
        if (getDescription() == description) {
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
        if (getDueDate() == dueDate) {
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
        if (getPriority() == priority) {
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
        if (getDone() == done) {
            return false;
        } else {
            _done = done;
            return true;
        }
    };

    const toggleDone = () => {
        _done = !_done;
    }

    const getNote = () => {
        return _note;
    };

    const setNote = (note) => {
        if (getNote() == note) {
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
        if (changed) {
            // PubSub.publish(Keys.TODO_UPDATE, 'changes made');
            return true;
        } else {
            // PubSub.publish(Keys.TODO_UPDATE, 'no changes made');
            return false;
        }
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
    const _title = title || 'Untitled';
    const _description = description || '';
    const _todos = [];

    const getTitle = () => {
        return _title;
    };

    const setTitle = (title) => {
        _title = title;
    }

    const getDescription = () => {
        return _description;
    };

    const setDescription = (description) => {
        _description = description;
    }

    const update = (title, description) => {
        setTitle(title);
        setDescription(description);
    };

    const addTodo = (todo) => {
        _todos.push(todo);
    };

    const getTodos = () => {
        return _todos.map( (todo) => {
            return todo.toJSON();
        });
    };

    const toJSON = () => {
        return {
            title: getTitle(),
            description: getDescription(),
            todos: getTodos(),
        }
    }

    return {
        getTitle, getDescription,
        setTitle, setDescription,
        update,
        addTodo,
        toJSON
    }
};

export default (function() {
    const _projects = [];

    // Functions
    function init() {
        // Module logs to console
        Print.init();
        // Set Subscribers
        PubSub.subscribe(Keys.LOCAL_STORAGE_SAVE, localStorageSave);
        PubSub.subscribe(Keys.LOCAL_STORAGE_LOAD, localStorageLoad);

        // Todo Move
        // Project Add
        // Project Move
        // Project Remove

        // Load prior data
        localStorageLoad();
    };

    const localStorageSave = () => {
        localStorage.setItem('projects', JSON.stringify(_projects));
    };

    const localStorageLoad = () => {
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
            PubSub.publish(Keys.DOM_UPDATE, 'Load prior data');
        } else {
            // Init default placeholders
            const initProject = Project('Default', 'The default project');
            addProject(initProject);
            initProject.addTodo(Todo('1'));
            initProject.addTodo(Todo('2', 'yeet'));
            initProject.addTodo(Todo('3'));
            PubSub.publish(Keys.DOM_UPDATE, 'Init default data');
        };
    };

    const getProjectTitles = () => {
        let titles = _projects.map((project) => {
            return project.getTitle();
        });
        return titles;
    };

    const addProject = (project) => {
        _projects.push(project);
        return project;
    };

    // deleteProject = (project, transferTodos)

    // moveTodo = (project)

    // updateTodo

    // deleteTodo

    return {
        init,
        localStorageSave,
        localStorageLoad
    };
})();