const todoList = [{ name: 'make dinner', dueDate: '2022-12-22' }, { name: 'wash dishes', dueDate: '2022-12-22' }];


function renderTodoList() {

    let todoListHTML = '';

    for (let i = 0; i < todoList.length; i++) {
        const todoObject = todoList[i];
        // const name = todoObject.name;
        const { name } = todoObject;
        // const dueDate = todoObject.dueDate;
        const { dueDate } = todoObject;

        const html = `<div> ${name}</div>  
                        <div>${dueDate}</div> 
                        <div><button class="delete-todo-button" onClick='todoList.splice(${i},1); renderTodoList();'>Delete</button></div>`
        todoListHTML += html
    }

    console.log(todoListHTML)

    document.querySelector('.todo-list').innerHTML = todoListHTML;
}

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