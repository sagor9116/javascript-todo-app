// DOM elements
const todoForm = document.querySelector(".todo-form")
const todoInput = document.querySelector(".todo-input")
const todoListsEl = document.querySelector(".todo-list-container")

// todos
let todos = []
let editTodoId = -1

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
    if (editTodoId >= 0) {
      todos = todos.map((todo, index) => ({
        ...todo,
        todoText: index === editTodoId ? todoInputValue : todo.todoText,
      }))
      editTodoId = -1
    } else {
      const newTodo = {
        todoText: todoInputValue,
        isCompleted: false,
        status: "active",
      }
      // pushing newTodos to todos array
      todos.push(newTodo)
    }
  }

  // clearing the input field after submission
  todoInput.value = ""
}

// rendering todos to the user interface
const renderTodos = () => {
  // clearing todos before a re-render
  todoListsEl.innerHTML = ""

  //render todos
  todos.forEach((todo, index) => {
    todoListsEl.innerHTML += `
    <div class="todo-lists" id=${index}>
      <div class='check-mark ${
        todo.isCompleted ? "checked" : ""
      }' data-action ="check" >
      ${todo.isCompleted ? '<img src="/images/icon-check.svg" alt="" />' : ""}
      </div>
      <!-- check-mark -->
  
      <div class='todo-text ${
        todo.isCompleted ? "checked" : ""
      }' id=${index} data-action ="check">
          ${todo.todoText}
      </div>
      <!-- todo-text -->

      <div class="todo-options">
        <span class="edit" id=${index}>
          <i class="fa-sharp fa-solid fa-pen-to-square" data-action = "edit"></i>
        </span>
        <span class="delete" id=${index}>
          <i class="fa-sharp fa-solid fa-trash" data-action = "delete"></i>
        </span>
      </div>
      <!-- .todo-options -->
    </div>
  <!-- .todo-lists -->
  `
  })
}

// adding event listener

todoListsEl.addEventListener("click", (e) => {
  const target = e.target
  console.log(target)
  const parentEl = target.parentNode
  console.log(parentEl)
  // todo id
  const todoId = Number(parentEl.id)
  console.log(todoId)

  // target action
  const action = target.dataset.action
  action === "check" && checkTodo(todoId)
  action === "edit" && editTodo(todoId)
})

// check a todo
const checkTodo = (todoId) => {
  todos = todos.map((todo, index) => ({
    ...todo,
    isCompleted: index === todoId ? !todo.isCompleted : todo.isCompleted,
    status: "completed",
  }))
  renderTodos()
}

// edit a todo
const editTodo = (todoId) => {
  todoInput.value = todos[todoId].todoText
  editTodoId = todoId
}
