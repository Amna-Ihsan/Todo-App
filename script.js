const todoForm = document.querySelector("form");
const todoInput = document.getElementById("todo-input");
const todoListUL = document.getElementById("todo-list");

// Initialize the todo list from local storage
let allTodos = getTodos();
updateToDoList();
todoForm.addEventListener("submit", function (e) {
  e.preventDefault();
  addTodo();
});

// Add a new todo item to the list
function addTodo() {
  const todoText = todoInput.value.trim();

  // Only add the todo if it's not empty
  if (todoText.length > 0) {
    const todoObject = {
      text: todoText,
      completed: false,
    };
    allTodos.push(todoObject); // Add the new todo to the list

    updateToDoList(); // Refresh the displayed list of todos
    saveTodos(); // Save the updated todos to localStorage
    todoInput.value = ""; // Clear the input field
  }
}
// Update the displayed list of todos
function updateToDoList() {
  todoListUL.innerHTML = "";
  allTodos.forEach((todo, todoIndex) => {
    todoItem = createToDoItem(todo, todoIndex);
    todoListUL.append(todoItem);
  });
}

// Create a new list item (<li>) for a todo
function createToDoItem(todo, todoIndex) {
  const todoId = "todo-" + todoIndex;
  const todoLI = document.createElement("li");
  const todoText = todo.text;
  todoLI.className = "todo";
  todoLI.innerHTML = `
      <input type="checkbox" id="${todoId}" />
          <label for="${todoId}" class="custom-checkbox">
            <i class="fa-solid fa-check"></i>
          </label>
          <label for="${todoId}" class="todo-text">
            ${todoText}
          </label>
          <button class="delete-button">
            <i class="fa-solid fa-trash-can"></i>
          </button>
    `;
  // Add event listener to the delete button to remove the todo when clicked
  const deleteButton = todoLI.querySelector(".delete-button");
  deleteButton.addEventListener("click", () => {
    deleteTodoItms(todoIndex);
  });

  // Add event listener to the checkbox to update the todo's completion status when changed
  const checkbox = todoLI.querySelector("input");
  checkbox.addEventListener("change", () => {
    allTodos[todoIndex].completed = checkbox.checked; // Update the 'completed' status
    saveTodos(); // Save the updated todos to localStorage
  });
  // Set the checkbox state based on whether the todo is completed
  checkbox.checked = todo.completed;
  return todoLI; // Return the created <li> element
}

// Delete a todo item by its index
function deleteTodoItms(todoIndex) {
  allTodos = allTodos.filter((_, i) => i !== todoIndex); // Remove the todo from the array
  saveTodos(); // Save the updated todos to localStorage
  updateToDoList(); // Refresh the displayed list
}

// Save the todos to localStorage as a JSON string
function saveTodos() {
  const todosJson = JSON.stringify(allTodos);
  localStorage.setItem("todos", todosJson);
}
function getTodos() {
  const todos = localStorage.getItem("todos") || "[]";
  return JSON.parse(todos);
}
