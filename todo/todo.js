class Todo {
    constructor(title, done, id = null) {
        if (id) {
            this.id = id;
        } else {
            this.id = this.getId();
        }
        this.title = title;
        this.date = this.getDateTime();
        this.done = done || false;
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

    getId() {
        const todos = CRUD.getTodos();
        if (todos.length == 0) {
            return 1;
        } else {
            const ids = todos.map(id => id.id);
            return Math.max(...ids) + 1;
        }
    }
}

class UI {
    // Display todos in the table
    static displayToDos() {
        const todos = CRUD.getTodos();
        todos.forEach(todo => UI.addToDoToList(todo));
    }

    static addToDoToList(todo) {
        const list = document.querySelector('#todo-list');
        const row = document.createElement('tr');
        let className = '';
        if (todo.done === true) {
            className = 'lineThrough';
        }
        row.innerHTML = `
            <td>${todo.id}</td>
            <td class="${className}">${todo.title}</td>
            <td class="${className}">${todo.date}</td>
            <td class="float-right">
                <a href="#" todo-id="${todo.id}"><i class="fas fa-check text-success done mr-2"></i></a>
                <a href="#" todo-id="${todo.id}"><i class="fas fa-trash-alt text-danger delete mr-2"></i></a>
                <a href="#" todo-id="${todo.id}"><i class="fas fa-edit text-primary edit"></i></a>
            </td>
        `;

        list.insertBefore(row, list.firstChild)
    }

    static showAlert(message, alert) {
        const div = document.createElement('div');
        div.className = `alert alert-${alert}`;
        div.appendChild(document.createTextNode(message));
        const container = document.querySelector('.container');
        const form = document.querySelector('#todo-form');
        container.insertBefore(div, form);
        document.querySelector('#formButton').disabled = true;
        // Vanish after 3 secs
        setTimeout(() => {
            document.querySelector('.alert').remove();
            document.querySelector('#formButton').disabled = false;
        }, 3000);
    }

    static clearFields() {
        document.querySelector('#title').value = '';
    }

}

class CRUD {

    // Display all todos
    static getTodos() {
        let todos;
        // Check if there are books already soterd in local storage (browser)
        if (localStorage.getItem('todos') === null) {
            todos = [];
        } else {
            todos = JSON.parse(localStorage.getItem('todos'));
        }
        // todos.reverse();
        return todos;
    }

    static storeTodo(todo) {
        const todos = this.getTodos();
        todos.push(todo);
        localStorage.setItem('todos', JSON.stringify(todos));

    }

    static showTodo() {

    }

    // Update todo
    static updateTodo() {

    }

    // Delte todo
    static deleteTodo(id) {
        // Find all todos
        const todos = this.getTodos();
        todos.forEach((todo, index) => {
            if (todo.id == id) {
                todos.splice(index, 1);
            }
        })
        localStorage.setItem('todos', JSON.stringify(todos));
        location.reload();
        // const todoIndex = id => todos.findIndex(todo => todo.id == id);
        // console.log(todoIndex(id));

    }

    // Mark todo as done with linr-through style
    static markAsDone(id) {
        // Solution with the localStorage
        // Find all todos
        const todos = this.getTodos();
        const todoIndex = id => todos.findIndex(todo => todo.id == id);
        const existingTodo = todos[todoIndex(id)];
        // Toggle between done and not done
        existingTodo.done = !existingTodo.done;
        const updatedTodo = new Todo(existingTodo.title, existingTodo.done, existingTodo.id)
        todos[todoIndex(id)] = updatedTodo;

        localStorage.setItem('todos', JSON.stringify(todos));
        location.reload();

        // First solution with an array as variable
        // let siblings = n => [...n.parentElement.children].filter(c => c != n);
        // let brothers_n_sisters = siblings(element);
        // console.log(brothers_n_sisters);
        // brothers_n_sisters.forEach(el => {
        //     el.style.textDecoration = "line-through"
        // });
    }
}

/* 
* Events handling
*/

// Event: display a book
document.addEventListener('DOMContentLoaded', UI.displayToDos);

document.querySelector('#todo-form').addEventListener('submit', e => {
    // Prevent actual submit
    e.preventDefault();

    // Get title value from the form
    const title = document.querySelector('#title').value;
    // Form validation
    if (title === '') {
        UI.showAlert('Please fill in title field.', 'danger');
    } else {
        // Instantate Todo class
        const todo = new Todo(title);

        // Display todo in the list
        UI.addToDoToList(todo);

        // Add todo to the localStorage
        CRUD.storeTodo(todo);

        // Clear fields in the form
        UI.clearFields();

        // Show success alert
        UI.showAlert('Todo created successfully.', 'success');
    }
})

document.querySelector('#todo-list').addEventListener('click', event => {
    if (event.target.classList.contains('done')) {
        CRUD.markAsDone(getId());
    }

    if (event.target.classList.contains('delete')) {
        CRUD.deleteTodo(getId());
    }
})

const getId = () => event.target.parentElement.getAttribute('todo-id');