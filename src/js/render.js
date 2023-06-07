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
            btn.textContent = '+';
            btn.addEventListener('click', () => toggleBtnForm());
            btn.style.display = 'block';
            return btn;
        };

        const addProjectForm = () => {
            const form = document.createElement('form');
            form.id = 'project-form'
            form.action = '';
            form.method = 'get';

            const title = document.createElement('input');
            title.type = 'text';
            title.name = 'title';
            title.id = 'project-form-title';
            title.required = true;
            title.placeholder = 'Project Name';

            const desc = document.createElement('input');
            desc.type = 'text';
            desc.name = 'desc';
            desc.id = 'project-form-desc';
            desc.placeholder = 'Project Description';

            const cancel = document.createElement('button');
            cancel.textContent = 'Cancel';
            cancel.type = 'button';
            cancel.addEventListener('click', () => toggleBtnForm());

            const submit = document.createElement('button');
            submit.textContent = 'Submit';

            form.appendChild(title);
            form.appendChild(desc);
            form.appendChild(cancel);
            form.appendChild(submit);

            form.style.display = 'none';
            form.classList.add('full-screen');
            form.addEventListener('submit', formSubmit);

            function formSubmit(e) {
                e.preventDefault();
                // Validation here

                // PubSub and clear form
                PubSub.publish(Keys.PROJECT_ADD, {
                    title: title.value,
                    description: desc.value
                });
                
                toggleBtnForm();
            }

            return form;
        }

        const projectBtn = addProjectBtn();
        const projectForm = addProjectForm();

        const toggleBtnForm = () => {
            projectBtn.style.display = projectBtn.style.display === 'block' ? 'none' : 'block';
            projectForm.style.display = projectForm.style.display === 'block' ? 'none' : 'block';
            projectForm.reset();
        }

        divAdd.appendChild(projectBtn);

        div.appendChild(divTabs);
        div.appendChild(divAdd);

        document.querySelector('body').appendChild(projectForm);

        return div;
    };

    const renderList = (msg, data) => {
        const container = document.querySelector('#project-tabs-container');

        const dataLen = data.length; // What should be displayed
        let tabRefLen = _tabRef.length; // What is currently displayed

        if (dataLen > tabRefLen) {
            // Add indexed tabs until equal
            for (let i = tabRefLen; i < dataLen; i+= 1) {
                const tab = document.createElement('div');
                const select = document.createElement('button');
                const edit = document.createElement('button');
                const remove = document.createElement('button');

                tab.classList.add('project-tab');
                select.classList.add('project-tab-select');
                select.classList.add('project-tab-edit');
                remove.classList.add('project-tab-remove');

                edit.textContent = 'e';
                remove.textContent = 'x';

                select.addEventListener('click', () => PubSub.publish(Keys.LIST_SELECT, i));
                edit.addEventListener('click', () => PubSub.publish(Keys.PROJECT_EDIT, {title: prompt('title', select.textContent), index: i}));
                remove.addEventListener('click', () => PubSub.publish(Keys.PROJECT_REMOVE, i));

                tab.appendChild(select);
                tab.appendChild(edit);
                tab.appendChild(remove);
                container.appendChild(tab);

                _tabRef.push(tab);
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
                _tabRef[i].querySelector('.project-tab-select').textContent = data[i];
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

        // const edit = document.createElement('button');
        // edit.setAttribute('id', 'project-edit');
        // div.appendChild(edit);

        const remove = document.createElement('button');
        remove.setAttribute('id', 'project-remove');
        remove.textContent = 'REMOVE';
        remove.addEventListener('click', () => PubSub.publish(Keys.PROJECT_REMOVE));
        div.appendChild(remove);

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
            btn.textContent = 'Add Todo';
            btn.addEventListener('click', () => toggleBtnForm());
            btn.style.display = 'block';
            return btn;
        };

        const addTodoForm = () => {
            const form = document.createElement('form');
            form.id = 'todo-form'
            form.action = '';
            form.method = 'get';

            const title = document.createElement('input');
            title.type = 'text';
            title.name = 'title';
            title.id = 'todo-form-title';
            title.required = true;
            title.placeholder = 'Todo Name';

            const desc = document.createElement('input');
            desc.type = 'text';
            desc.name = 'desc';
            desc.id = 'todo-form-desc';
            desc.placeholder = 'Todo Description';

            const priorityLow = document.createElement('input');
            priorityLow.type = 'radio';
            priorityLow.name = 'priority';
            priorityLow.id = 'todo-form-priority-low';
            priorityLow.value = 'LOW';

            const priorityLowLabel = document.createElement('label');
            priorityLowLabel.htmlFor = 'todo-form-priority-low';
            priorityLowLabel.textContent = 'LOW';

            const priorityMed = document.createElement('input');
            priorityMed.type = 'radio';
            priorityMed.name = 'priority';
            priorityMed.id = 'todo-form-priority-med';
            priorityMed.value = 'MEDIUM';

            const priorityMedLabel = document.createElement('label');
            priorityMedLabel.htmlFor = 'todo-form-priority-med';
            priorityMedLabel.textContent = 'MEDIUM';

            const priorityHigh = document.createElement('input');
            priorityHigh.type = 'radio';
            priorityHigh.name = 'priority';
            priorityHigh.id = 'todo-form-priority-high';
            priorityHigh.value = 'HIGH';

            const priorityHighLabel = document.createElement('label');
            priorityHighLabel.htmlFor = 'todo-form-priority-high';
            priorityHighLabel.textContent = 'HIGH';

            const dueDate = document.createElement('input');
            dueDate.type = 'date';
            dueDate.name = 'dueDate';
            dueDate.id = 'todo-form-dueDate';
            dueDate.required = true;

            const cancel = document.createElement('button');
            cancel.textContent = 'Cancel';
            cancel.type = 'button';
            cancel.addEventListener('click', () => toggleBtnForm());

            const submit = document.createElement('button');
            submit.textContent = 'Submit';

            form.appendChild(title);
            form.appendChild(desc);

            form.appendChild(priorityLow);
            form.appendChild(priorityMed);
            form.appendChild(priorityHigh);

            form.appendChild(priorityLowLabel);
            form.appendChild(priorityMedLabel);
            form.appendChild(priorityHighLabel);

            form.appendChild(dueDate);

            form.appendChild(cancel);
            form.appendChild(submit);

            form.style.display = 'none';
            form.classList.add('full-screen');
            form.addEventListener('submit', formSubmit);

            function formSubmit(e) {
                e.preventDefault();
                // Validation here

                // PubSub and clear form
                PubSub.publish(Keys.TODO_ADD, {
                    title: title.value,
                    description: desc.value
                });
                
                toggleBtnForm();
            }

            return form;
        }

        const toggleBtnForm = () => {
            todoBtn.style.display = todoBtn.style.display === 'block' ? 'none' : 'block';
            todoForm.style.display = todoForm.style.display === 'block' ? 'none' : 'block';
            todoForm.reset();
        }

        const todoBtn = addTodoBtn();
        const todoForm = addTodoForm();

        divAdd.appendChild(todoBtn);

        div.appendChild(divCards);
        div.appendChild(divAdd);

        document.querySelector('body').appendChild(todoForm);

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

        const priority = document.createElement('div');
        priority.classList.add('priority');
        info.appendChild(priority);

        const dueDate = document.createElement('div');
        dueDate.classList.add('dueDate');
        info.appendChild(dueDate);

        const edit = document.createElement('button');
        edit.classList.add('edit');
        edit.textContent = 'Edit';
        edit.addEventListener('click', () => PubSub.publish(Keys.TODO_EDIT, {title: prompt('New Title', title.textContent), description: prompt('New Description', description.textContent), index: index}));
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

        const priority = todoCardRef.querySelector('.priority');
        priority.textContent = `${data.priority}`;

        const dueDate = todoCardRef.querySelector('.dueDate');
        dueDate.textContent = `${data.dueDate}`;

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