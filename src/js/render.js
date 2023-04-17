import PubSub from 'pubsub-js';
import Keys from './keys.js';

// import './css/style.css';

const dataModule = (function() {

    // Save All
    const addSaveBtn = () => {
        const btn = document.createElement('button');
        btn.textContent = 'SAVE';
        btn.classList.add('local-storage-save');
        btn.addEventListener('click', () => PubSub.publish(Keys.LOCAL_STORAGE_SAVE));
        return btn;
    };

    // Load All
    const addLoadBtn = () => {
        const btn = document.createElement('button');
        btn.textContent = 'LOAD';
        btn.classList.add('local-storage-load');
        btn.addEventListener('click', () => PubSub.publish(Keys.LOCAL_STORAGE_LOAD));
        return btn;
    };

    // Load All
    const addResetBtn = () => {
        const btn = document.createElement('button');
        btn.textContent = 'RESET';
        btn.classList.add('local-storage-reset');
        btn.addEventListener('click', () => PubSub.publish(Keys.LOCAL_STORAGE_RESET));
        return btn;
    };

    return {
        addSaveBtn,
        addLoadBtn,
        addResetBtn,
    };
})();

const listModule = (function() {
    const _tabRef = [];

    const initList = () => {
        PubSub.subscribe(Keys.DOM_UPDATE_LIST, renderList);
        const div = document.createElement('div');
        div.setAttribute('id', 'project-tabs-container');
        return div;
    };

    const renderList = (msg, data) => {
        const container = document.querySelector('#project-tabs-container');

        const dataLen = data.length; // What should be displayed
        let tabRefLen = _tabRef.length; // What is currently displayed

        if (dataLen > tabRefLen) {
            // Add indexed tabs until equal
            for (let i = tabRefLen; i < dataLen; i+= 1) {
                const tab = document.createElement('button');
                container.appendChild(tab);
                _tabRef.push(tab);
                // tab.setAttribute('data-tab-number', i); This is unnecessary if we can directly publish with an id
                tab.addEventListener('click', () => PubSub.publish(Keys.LIST_SELECT, i));
            }
        }

        // Get new number of tab divs
        tabRefLen = _tabRef.length;

        // Remove unnecessary tabs and update text for the rest
        for (let i = tabRefLen - 1; i >= 0; i-= 1) {
            if (i >= dataLen) {
                _tabRef.pop();
                container.lastChild.remove();
            } else {
                _tabRef[i].textContent = data[i];
            }
        }
    };

    return {
        initList
    };
})();

const projectModule = (function() {

    const initProject = () => {
        PubSub.subscribe(Keys.DOM_UPDATE_PROJECT, renderProject);

        const div = document.createElement('div');
        div.setAttribute('id', 'project-container');

        const title = document.createElement('h1');
        title.setAttribute('id', 'project-title');
        div.appendChild(title);

        const description = document.createElement('p');
        description.setAttribute('id', 'project-description');
        div.appendChild(description);

        return div;
    };

    const renderProject = (msg, data) => {
        // const container = document.querySelector('#project-container');
        const title = document.querySelector('#project-title');
        const description = document.querySelector('#project-description');

        title.textContent = data.title;
        description.textContent = data.description;
    };

    return {
        initProject
    };
})();

// TodoDisplayModule

const todoModule = (function() {
    const _todoCardRef = [];

    const initTodo = () => {
        PubSub.subscribe(Keys.DOM_UPDATE_TODO, renderTodoArray);
        const div = document.createElement('div');
        div.setAttribute('id', 'todo-cards-container');
        return div;
    };

    const buildTodoCard = (index) => {
        const card = document.createElement('div');
        card.classList.add('todo-card');
        // card.addEventListener('click', () => PubSub.publish(Keys.LIST_SELECT, i));
        
        // Checkbox done - checkbox
        // Prioirty indicator - img
        // Title,Duedate,Description,Note - divs for text, cssgrid
        // Edit button, Delete button - 3 buttons
        return card;
    };

    const updateTodoCard = (todoCardRef, data) => {
        // UPDATE HERE
        todoCardRef.textContent = data.title + ' ' + data.description;
            // title
            // description
            // dueDate
            // priority
            // done
            // note
    };

    const renderTodoArray = (msg, data) => {
        const container = document.querySelector('#todo-cards-container');

        const dataLen = data.length; // What should be displayed
        let tabRefLen = _todoCardRef.length; // What is currently displayed

        if (dataLen > tabRefLen) {
            // Add indexed tabs until equal
            for (let i = tabRefLen; i < dataLen; i+= 1) {
                const card = buildTodoCard(i);
                container.appendChild(card);
                _todoCardRef.push(card);
            }
        }

        // Get new number of tab divs
        tabRefLen = _todoCardRef.length;

        // Remove unnecessary tabs and update text for the rest
        for (let i = tabRefLen - 1; i >= 0; i-= 1) {
            if (i >= dataLen) {
                _todoCardRef.pop();
                container.lastChild.remove();
            } else {
                updateTodoCard(_todoCardRef[i], data[i]);
            }
        }
    };

    return {
        initTodo
    };
})();

export default (function() {
    const body = document.querySelector('body');

    // Store all of the created tabs and todos
    const _todoRef = [];

    // Project Tabs:: listen for add, move, remove, update
    const addProjectBtn = () => {
        const btn = document.createElement('button');
        btn.textContent = 'Add Project'
        btn.addEventListener('click', () => PubSub.publish(Keys.PROJECT_ADD, {title: "Test PABtn", description: 'la de da'}));
        return btn;
    };

        // Add Todo
    const addTodoBtn = () => {
        const btn = document.createElement('button');
        btn.textContent = 'Add Todo'
        btn.addEventListener('click', () => PubSub.publish(Keys.TODO_ADD, {title: "Test new todo", description: 'la de da'}));
        return btn;
    };
        // Edit/Update Todo

    (function init() {
        const saveBtn = dataModule.addSaveBtn();
        body.appendChild(saveBtn);
        const loadBtn = dataModule.addLoadBtn();
        body.appendChild(loadBtn);
        const resetBtn = dataModule.addResetBtn();
        body.appendChild(resetBtn);

        const projectBtn = addProjectBtn();
        body.appendChild(projectBtn);

        const todoBtn = addTodoBtn();
        body.appendChild(todoBtn);

        const list = listModule.initList();
        body.appendChild(list);

        const project = projectModule.initProject();
        body.appendChild(project);

        const todo = todoModule.initTodo();
        body.appendChild(todo);
    })();

    return {

    };
})();