// DOM elements
const todoForm = document.querySelector(".todo-form")
const todoInput = document.querySelector(".todo-input")
const todoLists = document.querySelector(".todo-lists")

// todos
let todos = []

//form submit
todoForm.addEventListener("submit", (e) => {
  // prevent the default page load after submitting form
  e.preventDefault()
  saveTodo()
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
