const todos = [
    {
        id: 1,
        title: "dfgdfg",
        done: true,
        date: "19-01-2019 17:26"
    },
    {
        id: 2,
        title: "dfgdfg",
        done: true,
        date: "19-01-2019 17:26"
    },
    {
        id: 3,
        title: "dfgdfg",
        done: true,
        date: "19-01-2019 17:26"
    },
    {
        id: 4,
        title: "dfgdfg",
        done: true,
        date: "19-01-2019 17:26"
    },
    {
        id: 5,
        title: "dfgdfg",
        done: true,
        date: "19-01-2019 17:26"
    }
];

// console.log(JSON.stringify(todos));
// console.log([...todos.reverse()][0])

// Pull only ids from the array of todos
// console.log(todos.map(id => id.id))

// console.log(todos.filter(id => id == id.id))

const existingTodoIndex = m => todos.findIndex(todo => todo.id == m);

// console.log(existingTodoIndex(3))

const existingTodo = todos[existingTodoIndex(3)];
// console.log(existingTodo)

todos.splice(2, 1)
console.log(todos)

const str = "sdf, lkj, uiou, od, sdj, lsdkfjl, lskdjf, lsdkj, lskdj, ldkj,";

const str1 = str.split(",", 3)
console.log(str1)