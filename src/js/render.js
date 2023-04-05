import PubSub from "pubsub-js";
import Keys from "./keys.js";

// import './css/style.css';

// render DOM

export default (function() {
    const body = document.querySelector('body');

    function init() {
        addSaveBtn();
        addLoadBtn();
    };

    // Save All
    const addSaveBtn = () => {
        const btn = document.createElement('button');
        btn.textContent = 'SAVE'
        btn.addEventListener('click', () => PubSub.publish(Keys.LOCAL_STORAGE_SAVE));
        body.appendChild(btn);
    }

    // Load All
    const addLoadBtn = () => {
        const btn = document.createElement('button');
        btn.textContent = 'LOAD'
        btn.addEventListener('click', () => PubSub.publish(Keys.LOCAL_STORAGE_LOAD));
        body.appendChild(btn);
    }

    // Project Tabs:: listen for add, move, remove, update

        // Add Todo
        // Edit/Update Todo

    return {
        init
    };
})();