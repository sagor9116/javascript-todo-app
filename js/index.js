// DOM elements
const todoForm = document.querySelector(".todo-form")
const todoInput = document.querySelector(".todo-input")
const todoListsEl = document.querySelector(".todo-list-container")
const todoList = document.querySelector(".todo-list")
const todoSummary = document.querySelector(".todo-summary")
const itemsLeft = document.querySelector(".items-left")
const clearCompletedTodos = document.querySelector(".clear-completed")
const allTodos = document.querySelector(".all")
const activeTodos = document.querySelector(".active-todos")
const todoNotificationEl = document.querySelector(".notification")

// todos
let todos = JSON.parse(localStorage.getItem("todos")) || []
let editTodoId = -1

// very 1st render
renderTodos()

//form submit
todoForm.addEventListener("submit", (e) => {
  // prevent the default page load after submitting form
  e.preventDefault()
  // saving todos
  saveTodo()
  // rendering todos to the ui
  renderTodos()

  // storing todos to localStorage
  localStorage.setItem("todos", JSON.stringify(todos))
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
    showNotification("input field is empty")
  } else if (duplicatedTodo) {
    showNotification("todo already exists")
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
function renderTodos() {
  // clearing todos before a re-render
  todoListsEl.innerHTML = ""

  // after deleting every todo from the todo list
  if (todos.length === 0) {
    todoListsEl.innerHTML = `
    <div class="todo-lists">
      <p>No items now...</p>
    </div>
 `
  }

  //render todos
  todos.forEach((todo, index) => {
    todoListsEl.innerHTML += `
  <div class="todo-lists" id=${index} draggable="true">
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
  // todos left
  getItemCountleft()
  //  get all todos
}

// adding event listener to todo list
todoListsEl.addEventListener("click", (e) => {
  const target = e.target
  const parentEl = target.parentNode

  // todo id
  const todoId = Number(parentEl.id)

  // target action
  const action = target.dataset.action
  action === "check" && checkTodo(todoId)
  action === "edit" && editTodo(todoId)
  action === "delete" && deleteTodo(todoId)
})

// check a todo
const checkTodo = (todoId) => {
  todos = todos.map((todo, index) => ({
    ...todo,
    isCompleted: index === todoId ? !todo.isCompleted : todo.isCompleted,
    status: "completed",
  }))
  renderTodos()
  localStorage.setItem("todos", JSON.stringify(todos))
}

// edit a todo
const editTodo = (todoId) => {
  todoInput.value = todos[todoId].todoText
  editTodoId = todoId
}

// delete a todo
const deleteTodo = (todoId) => {
  todos = todos.filter((todo, index) => index !== todoId)
  editTodoId = -1
  renderTodos()
  localStorage.setItem("todos", JSON.stringify(todos))
}

// show notification
const showNotification = (mgs) => {
  todoNotificationEl.innerHTML = mgs

  // notification enter
  todoNotificationEl.classList.add("notify-enter")

  //notification leave
  setTimeout(() => {
    todoNotificationEl.classList.remove("notify-enter")
  }, 2000)
}

//tood items left
function getItemCountleft() {
  let count = 0
  todos.forEach((todo) => {
    !todo.isCompleted && count++
    // alternative
    /* 
      if (todo.isCompleted === false) {
        count = count + 1
      }
    */
  })

  if (count === 0 || count === 1) {
    itemsLeft.textContent = `${count} item left`
  } else {
    itemsLeft.textContent = `${count} items left`
  }
  return count
}

// drag and drop to reorder list
new Sortable(todoListsEl, {
  animation: 350,
})
