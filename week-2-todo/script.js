  (function() {
    // ---- state ----
    let todos = [];            // each todo: { id, text, completed }

    // ---- DOM elements ----
    const todoInput = document.getElementById('todoInput');
    const addBtn = document.getElementById('addBtn');
    const todoListEl = document.getElementById('todoList');
    const taskCounter = document.getElementById('task-counter');
    const statsEl = document.getElementById('stats');

    // ---- helpers ----
    function generateId() {
      return crypto.randomUUID();
    }

    // update stats & counter
    function updateStats() {
      const total = todos.length;
      const completed = todos.filter(t => t.completed).length;
      statsEl.textContent = `${completed} / ${total} done`;
      taskCounter.textContent = total;
    }

    // ---- render the list ----
    function render() {
      // clear container
      todoListEl.innerHTML = '';

      if (todos.length === 0) {
        // show empty state
        const emptyDiv = document.createElement('li');
        emptyDiv.className = 'empty-state';
        emptyDiv.textContent = ' No Tasks ';
        todoListEl.appendChild(emptyDiv);
      } else {
        // create todo items
        todos.forEach(todo => {
          const li = document.createElement('li');
          li.className = `todo-item ${todo.completed ? 'completed' : ''}`;
          li.dataset.id = todo.id;

          // checkbox
          const checkbox = document.createElement('input');
          checkbox.type = 'checkbox';
          checkbox.checked = todo.completed;

          // toggle handler
          checkbox.addEventListener('change', (e) => {
            e.stopPropagation();
            toggleTodo(todo.id);
          });

          // text span
          const textSpan = document.createElement('span');
          textSpan.className = 'todo-text';
          textSpan.textContent = todo.text;

          // delete button
          const deleteBtn = document.createElement('button');
          deleteBtn.className = 'delete-btn';
          deleteBtn.innerHTML = '✕';
          deleteBtn.addEventListener('click', (e) => {
            deleteTodo(todo.id);
          });

          // assemble
          li.appendChild(checkbox);
          li.appendChild(textSpan);
          li.appendChild(deleteBtn);
          todoListEl.appendChild(li);
        });
      }

      // update stats
      updateStats();
    }

    // ---- actions ----
    function addTodo() {
      const text = todoInput.value.trim();
      if (text === '') {
        // small shake feedback for empty input (optional)
        todoInput.style.transform = 'translateX(4px)';
        setTimeout(() => todoInput.style.transform = '', 100);
        return;
      }

      const newTodo = {
        id: generateId(),
        text: text,
        completed: false,
      };

      todos.push(newTodo);
      todoInput.value = '';        // clear input
      todoInput.focus();
      render();
    }

    function toggleTodo(id) {
      const todo = todos.find(t => t.id === id);
      if (todo) {
        todo.completed = !todo.completed;
        render();
      }
    }

    function deleteTodo(id) {
      todos = todos.filter(t => t.id !== id);
      render();
    }

    // ---- event listeners ----
    addBtn.addEventListener('click', addTodo);


    render();

    // focus input on page load
    todoInput.focus();
  })();
