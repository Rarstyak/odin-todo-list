import PubSub from 'pubsub-js';
import Keys from './keys.js';

import '.././css/style.css';

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
        div.setAttribute('id', 'list-container');
        
        const divTabs = document.createElement('div');
        divTabs.setAttribute('id', 'project-tabs-container');
        
        const divAdd = document.createElement('div');
        divAdd.setAttribute('id', 'project-add-container');

        // Add button to create new project/tab
        const addProjectBtn = () => {
            const btn = document.createElement('button');
            btn.textContent = '+'
            btn.addEventListener('click', () => PubSub.publish(Keys.PROJECT_ADD, {title: prompt('Project Name', 'Untitled'), description: prompt('Project Description', 'test')}));
            return btn;
        };

        const projectBtn = addProjectBtn();
        divAdd.appendChild(projectBtn);

        div.appendChild(divTabs);
        div.appendChild(divAdd);

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
                // _tabRef.pop();
                // container.lastChild.remove();
                _tabRef[i].style.display = 'none';
            } else {
                _tabRef[i].style.display = '';
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
        div.setAttribute('id', 'todo-container');
        
        const divCards = document.createElement('div');
        divCards.setAttribute('id', 'todo-cards-container');
        
        const divAdd = document.createElement('div');
        divAdd.setAttribute('id', 'todo-add-container');


        const addTodoBtn = () => {
            const btn = document.createElement('button');
            btn.textContent = 'Add Todo'
            btn.addEventListener('click', () => PubSub.publish(Keys.TODO_ADD, {title: prompt('Todo Title', 'Test'), description: prompt('Todo Description', '')}));
            return btn;
        };
        const addBtn = addTodoBtn();
        divAdd.appendChild(addBtn);

        div.appendChild(divCards);
        div.appendChild(divAdd);

        return div;
    };

    const buildTodoCard = (index) => {
        const card = document.createElement('div');
        card.classList.add('todo-card');

        const done = document.createElement('button');
        done.classList.add('done');
        done.addEventListener('click', () => PubSub.publish(Keys.TODO_TOGGLE, index));
        card.appendChild(done);

        const info = document.createElement('div');
        info.classList.add('info');
        card.appendChild(info);

        const title = document.createElement('div');
        title.classList.add('title');
        info.appendChild(title);

        const description = document.createElement('div');
        description.classList.add('description');
        info.appendChild(description);

        const edit = document.createElement('button');
        edit.classList.add('edit');
        edit.textContent = 'Edit';
        edit.addEventListener('click', () => PubSub.publish(Keys.TODO_EDIT, {title: prompt('New Title'), description: prompt('New Description'), index: index}));
        card.appendChild(edit);

        const remove = document.createElement('button');
        remove.classList.add('remove');
        remove.textContent = 'X';
        remove.addEventListener('click', () => PubSub.publish(Keys.TODO_REMOVE, index));
        card.appendChild(remove);

        // Checkbox done - checkbox
        // Prioirty indicator - img
        // Title,Duedate,Description,Note - divs for text, cssgrid
        // Edit button, Delete button - 3 buttons
        return card;
    };

    const updateTodoCard = (todoCardRef, data) => {
        // UPDATE HERE

        const done = todoCardRef.querySelector('.done');
        done.textContent = `${(data.done) ? 'Y' : 'N'}`;

        const title = todoCardRef.querySelector('.title');
        title.textContent = `${data.title}`;

        const description = todoCardRef.querySelector('.description');
        description.textContent = `${data.description}`;

        // title
            // description
            // dueDate
            // priority
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
                _todoCardRef[i].style.display = 'none';
            } else {
                _todoCardRef[i].style.display = '';
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

    // Edit/Update Todo
    

    (function init() {
        const storage = document.createElement('div');
        storage.setAttribute('id', 'storage-container');
        body.appendChild(storage);

        const saveBtn = dataModule.addSaveBtn();
        storage.appendChild(saveBtn);
        const loadBtn = dataModule.addLoadBtn();
        storage.appendChild(loadBtn);
        const resetBtn = dataModule.addResetBtn();
        storage.appendChild(resetBtn);

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