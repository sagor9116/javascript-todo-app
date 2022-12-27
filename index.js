// DOM elements
const todoForm = document.querySelector(".todo-form")
const todoInput = document.querySelector(".todo-input")
const todoListsEl = document.querySelector(".todo-list-container")

// todos
let todos = []

//form submit
todoForm.addEventListener("submit", (e) => {
  // prevent the default page load after submitting form
  e.preventDefault()
  saveTodo()
  renderTodos()
})

// saving new todo
const saveTodo = () => {
  //grabing value from user input field
  const todoInputValue = todoInput.value

  // if input field is empty
  const isEmpty = todoInputValue === ""

  // if user try to put existing todo
  const duplicatedTodo = todos.find(
    (todo) => todo.todoText.toUpperCase() === todoInputValue.toUpperCase()
  )
  if (isEmpty) {
    alert("input field is empty")
  } else if (duplicatedTodo) {
    alert("todo already exists")
  } else {
    const newTodo = {
      todoText: todoInputValue,
      isCompleted: false,
    }
    // pushing newTodos to todos array
    todos.push(newTodo)
    console.log(todos)
  }

  // clearing the input field after submission
  todoInput.value = ""
}

// rendering todos to the user interface
const renderTodos = () => {
  // clearing todos before a re-render
  todoListsEl.innerHTML = ""

  //render todos
  todos.map((todo, index) => {
    todoListsEl.innerHTML += `
  <div class="todo-lists" id=${index}>
    <div class="check-mark checked">
      <img src="/images/icon-check.svg" alt="" />
    </div>
    <!-- check-mark -->
  
    <div class="todo-text">
      <span>${todo.todoText}</span>
    </div>
    <!-- todo-text -->

    <div class="todo-options">
      <span class="edit">
        <i class="fa-sharp fa-solid fa-pen-to-square"></i>
      </span>
      <span class="delete">
        <i class="fa-sharp fa-solid fa-trash"></i>
      </span>
    </div>
    <!-- .todo-options -->
  </div>
  `
  })
}

/* 


  
  
*/
