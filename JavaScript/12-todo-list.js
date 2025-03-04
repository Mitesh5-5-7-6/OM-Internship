const todoList = [{ name: 'make dinner', dueDate: '2022-12-22' }, { name: 'wash dishes', dueDate: '2022-12-22' }];


function renderTodoList() {

    let todoListHTML = '';
    todoList.forEach((todoObject, index) => {
        const { name } = todoObject;
        const { dueDate } = todoObject;

        const html = `<div> ${name}</div>  
                        <div>${dueDate}</div> 
                        <div><button class="delete-todo-button js-delete-todo-button">Delete</button></div>`
        todoListHTML += html
    })

    console.log(todoListHTML)

    document.querySelector('.todo-list').innerHTML = todoListHTML;

    document.querySelectorAll('.js-delete-todo-button')
        .forEach((deleteButton, index) => {
            deleteButton.addEventListener('click', () => {
                todoList.splice(index, 1); renderTodoList();
            });

        })
}

document.querySelector('.js-add-todo-button')
    .addEventListener('click', () => {
        addTodo()
    })

function addTodo() {
    const inputElement = document.querySelector('.name-input')
    const name = inputElement.value;

    const dateInputElement = document.querySelector('.due-date-input')
    const dueDate = dateInputElement.value;

    todoList.push({
        // name: name, dueDate: dueDate
        name, dueDate
    });

    // console.log(todoList)

    inputElement.value = '';
    dateInputElement.value = '';
    renderTodoList();
}