$(document).ready(function() {
    let list = [];
    const $toDoEl = $('#ft_list');
    const $addBtn = $('#addBtn');

    const render = () => {
        $toDoEl.empty();
        list.forEach((value, index) => {
            const $toDoItem = createTodoElement(value);
            $toDoItem.on('click', () => {
                removeTodo(index);
            });
            $toDoEl.append($toDoItem);
        });
    };

    const createTodoElement = (value) => {
        return $('<button>')
            .addClass('todoItem')
            .text(value);
    };

    const addTodo = (value) => {
        list.push(value);
        updateCookie(JSON.stringify(list));
        render();
    };

    const removeTodo = (index) => {
        const confirmed = confirm('Do you want to delete this todo');
        if (confirmed) {
            list.splice(index, 1);
            updateCookie(JSON.stringify(list));
            render();
        }
    };

    const setCookie = (key, value) => {
        document.cookie = `${key}=${value};`;
    };

    const updateCookie = (value) => {
        setCookie('toDo', value);
    };


    const getCookie = (key) => {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.startsWith(key + '=')) return cookie.substring(key.length + 1);
            /*
            key = 'todo'
            cookie = 'todo=hello'

            key + '=' >> 'todo='
            4+1

            "todo=hello >> hello"
            
            */
        }
        return 0;
    };

    $addBtn.on('click', () => {
        const newTodo = prompt('New ToDo');
        if (newTodo && newTodo.trim().length > 0) {
            addTodo(newTodo);
        }
    });

    const oldToDo = getCookie('toDo');
    if (oldToDo) {
        list = JSON.parse(oldToDo);
    }

    render();
});