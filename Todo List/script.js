const form = document.getElementById('todo-form');
const input = document.getElementById('todo-input');
const list = document.getElementById('todo-list');
const filters = document.querySelector('.filters');

let todos = JSON.parse(localStorage.getItem('todos')) || [];
let currentFilter = 'all';

function renderTodos() {
  list.innerHTML = '';

  const filteredTodos = todos.filter(todo => {
    if (currentFilter === 'all') return true;
    if (currentFilter === 'active') return !todo.completed;
    if (currentFilter === 'completed') return todo.completed;
  });

  filteredTodos.forEach((todo, index) => {
    const li = document.createElement('li');
    li.className = todo.completed ? 'completed' : 'active';

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = todo.completed;
    checkbox.addEventListener('change', () => {
      toggleComplete(index);
    });

    const span = document.createElement('span');
    span.textContent = todo.text;

    const editBtn = document.createElement('button');
    editBtn.textContent = 'Sửa';
    editBtn.addEventListener('click', (e) => {
      e.stopPropagation(); // tránh xung đột sự kiện
      editTodo(index);
    });

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Xóa';
    deleteBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      deleteTodo(index);
    });

    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(editBtn);
    li.appendChild(deleteBtn);
    list.appendChild(li);
  });

  localStorage.setItem('todos', JSON.stringify(todos));
}

function toggleComplete(index) {
  todos[index].completed = !todos[index].completed;
  renderTodos();
}

function editTodo(index) {
  const newText = prompt('Nhập nội dung mới:', todos[index].text);
  if (newText !== null && newText.trim() !== '') {
    todos[index].text = newText.trim();
    renderTodos();
  }
}

function deleteTodo(index) {
  if (confirm('Bạn có chắc chắn muốn xóa không?')) {
    todos.splice(index, 1);
    renderTodos();
  }
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const text = input.value.trim();
  if (text !== '') {
    todos.push({ text, completed: false });
    input.value = '';
    renderTodos();
  }
});

filters.addEventListener('click', (e) => {
  if (e.target.tagName === 'BUTTON') {
    currentFilter = e.target.dataset.filter;
    renderTodos();
  }
});

renderTodos();
