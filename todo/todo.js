class Todo {
    constructor(title) {
        this.title = title;
        this.date = this.getDateTime();
    }

    getDateTime() {
        let d = new Date();
        const year = d.getFullYear();
        const month = d.getMonth() + 1;
        const day = d.getDate();
        const hour = d.getHours();
        const minutes = d.getMinutes();
        return `${day}-${month}-${year} ${hour}:${minutes}`
    }
}

class UI {
    // Display todos in the table
    static displayToDo() {
        const todos = [
            {
                title: 'Beat',
                date: '19-01-2019 10:36'
            },
            {
                title: 'Beat',
                date: '19-01-2019 10:36'
            }
        ];
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
}
UI.displayToDo()
document.querySelector('#todo-form').addEventListener('submit', e => {
    // Prevent actual submit
    e.preventDefault();
    const title = document.querySelector('#title').value;
    const todo = new Todo(title);
    console.log(todo)
})