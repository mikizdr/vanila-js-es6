class Todo {
    constructor(title) {
        this.id = this.getId();
        this.title = title;
        this.date = this.getDateTime();
        this.done = false;
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
        const todos = CRUD.indexTodo();
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
        const todos = CRUD.indexTodo();
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
            <td class="${className}">${todo.title}</td>
            <td class="${className}">${todo.date}</td>
            <td><a href="#"><i class="fas fa-check text-success done"></i></a></td>
        `;

        list.appendChild(row);
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

    static tododone(elemet) {
        if (element.classList.contains('done')) {
            // console.log(element.parentElement)
        }
    }
}

class CRUD {

    // Display all todos
    static indexTodo() {
        const todos = [
            {
                id: 1,
                title: "dfgdfg",
                done: true,
                date: "19-01-2019 17:26"
            }
        ];
        return todos;
    }

    static storeTodo(todo) {
        const todos = this.indexTodo();
        todos.unshift(todo);
        console.log(todos)
        // Clear fields in the form
        UI.clearFields();
        // Show alert
        UI.showAlert('Todo created successfully.', 'success');

    }

    // Update todo
    static updateTodo() {

    }

    // Delte todo
    static deleteTodo() {

    }

    // Mark todo as done with linr-through style
    static markAsDone(element) {
        let siblings = n => [...n.parentElement.children].filter(c => c != n);
        let brothers_n_sisters = siblings(element);
        brothers_n_sisters.forEach(el => {
            el.style.textDecoration = "line-through"
        });
    }
}

/* 
* Handles events
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
        // Create new Todo object
        const todo = new Todo(title);
        CRUD.storeTodo(todo);
        // Display todo in the list
        UI.displayToDos();
    }
})

document.querySelector('#todo-list').addEventListener('click', event => {
    // console.log(event.target)
    if (event.target.classList.contains('done')) {
        const element = event.target.parentElement.parentElement;
        CRUD.markAsDone(element);
    }
})