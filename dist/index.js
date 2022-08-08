"use strict";
// Note the Non Null Assertion Operator (!) that says that the element will not be null. Note also the type assertion HTMLInputElement so we can access properties like input.value, as it is not a generic HTML element.
var btn = document.getElementById("btn");
var input = document.getElementById("todoinput");
var form = document.querySelector("form");
var list = document.getElementById("todolist");
var deleteBtn = document.getElementById("btn-delete");
// When we load the page we will set the todos array (of type Todo) to what comes from localStorage
var todos = readTodos();
// Then we display the items on our list:
todos.forEach(createTodo);
// The next function will return an array of type Todo:
function readTodos() {
    var todosJSON = localStorage.getItem("todos");
    if (todosJSON == null)
        return [];
    return JSON.parse(todosJSON);
}
// The next function will save the todos to localStorage
function saveTodos() {
    localStorage.setItem("todos", JSON.stringify(todos));
}
// Note the e: SubmitEvent so we have access to events properties.
function handleSubmit(e) {
    e.preventDefault();
    var newTodo = {
        text: input.value,
        completed: false
    };
    createTodo(newTodo);
    todos.push(newTodo);
    // Let's save the array to local storage:
    saveTodos();
    input.value = "";
}
// The next function will create a new list item when passing a new todo:
function createTodo(todo) {
    var newLi = document.createElement("li");
    var checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    // Let's assign the checked value to the "completed" value:
    checkbox.checked = todo.completed;
    // Let's check if the checkbox is clicked and act accordingly
    checkbox.addEventListener("change", function () {
        todo.completed = checkbox.checked;
        // Then we update local storage:
        saveTodos();
    });
    newLi.append(todo.text);
    newLi.append(checkbox);
    list.append(newLi);
}
// The next function will delete the checked todos
function deleteTodos() {
    todos = todos.filter(function (item) {
        return !item.completed;
    });
    saveTodos();
    window.location.reload();
}
// Let's add a submit event for our form. It will call the handleSubmit funcion
form.addEventListener("submit", handleSubmit);
// We add a click event listener on the delete button:
deleteBtn.addEventListener("click", deleteTodos);
