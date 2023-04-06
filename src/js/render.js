import PubSub from "pubsub-js";
import Keys from "./keys.js";

// import './css/style.css';

// SaveLoadModule

const listModule = (function() {
    const _tabRef = [];

    const addList = () => {
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
    }

    return {
        addList
    };
})();

const projectModule = (function() {

    const addProject = () => {
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
    }

    return {
        addProject
    }
})();

// TodoDisplayModule

export default (function() {
    const body = document.querySelector('body');

    // Store all of the created tabs and todos
    const _todoRef = [];

    function init() {
        const saveBtn = addSaveBtn();
        body.appendChild(saveBtn);
        const loadBtn = addLoadBtn();
        body.appendChild(loadBtn);

        const projectBtn = addProjectBtn();
        body.appendChild(projectBtn);

        const list = listModule.addList();
        body.appendChild(list);

        const project = projectModule.addProject();
        body.appendChild(project);
    };

    // Save All
    const addSaveBtn = () => {
        const btn = document.createElement('button');
        btn.textContent = 'SAVE'
        btn.addEventListener('click', () => PubSub.publish(Keys.LOCAL_STORAGE_SAVE));
        return btn;
    }

    // Load All
    const addLoadBtn = () => {
        const btn = document.createElement('button');
        btn.textContent = 'LOAD'
        btn.addEventListener('click', () => PubSub.publish(Keys.LOCAL_STORAGE_LOAD));
        return btn;
    }

    // Project Tabs:: listen for add, move, remove, update
    const addProjectBtn = () => {
        const btn = document.createElement('button');
        btn.textContent = 'Add Project'
        btn.addEventListener('click', () => PubSub.publish(Keys.PROJECT_ADD, {title: "Test PABtn", description: 'la de da'}));
        return btn;
    }

        // Add Todo
        // Edit/Update Todo

    return {
        init
    };
})();