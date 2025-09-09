let todos = [
  { id: 1, title: "Buy groceries", completed: false },
  { id: 2, title: "Finish project report", completed: true },
  { id: 3, title: "Book dentist appointment", completed: false },
  { id: 4, title: "Pay electricity bill", completed: true },
];i
function getTodobyId(todoId) {
  return todos.find((todo) => todo.id == todoId);
}
function getTodobyId(completed) {
  return todos.filter((todo) => !todo.completed);
}

const result = getTodobyId(1);
console.log(result);
