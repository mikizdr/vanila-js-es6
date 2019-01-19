class Todo {
    constructor(title) {
        this.title = title;
        this.date = this.getDateTime();
        this.tag = false;
    }

    getDateTime() {
        let d = new Date();
        let year = d.getFullYear();
        let month = d.getMonth() + 1;
        if (month < 10) {
            month = '0' + month;
        }
        let day = d.getDate();
        if (day < 10) {
            day = '0' + day;
        }
        let hour = d.getHours();
        let minutes = d.getMinutes();
        return `${day}-${month}-${year} ${hour}:${minutes}`
    }
}

class UI {
    // Display todos in the table
    static displayToDos(todos) {
        todos.forEach(todo => UI.addToDoToList(todo));
    }

    static addToDoToList(todo) {
        const list = document.querySelector('#todo-list');
        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${todo.title}</td>
            <td>${todo.date}</td>
            <td>actions</td>
        `;

        list.appendChild(row);
    }

    static showAlert(message) {
        alert(message);
    }

    static clearFields() {
        document.querySelector('#title').value = '';
    }
}

class CRUD {

    // Display all todos
    static indexTodo() {

    }

    static storeTodo(todo) {
        const todos = [
        ];
        todos.push(todo);
        UI.displayToDos(todos);
    }

    // Update todo
    static updateTodo() {

    }

    // Delte todo
    static deleteTodo() {

    }
}

document.querySelector('#todo-form').addEventListener('submit', e => {
    // Prevent actual submit
    e.preventDefault();

    // Get title value from the form
    const title = document.querySelector('#title').value;
    // Form validation
    if (title === '') {
        UI.showAlert('warning');
    } else {
        // Create new Todo object
        const todo = new Todo(title);
        CRUD.storeTodo(todo);
        // Clear fields in the form
        UI.clearFields();

        // console.log(todo);
    }

})