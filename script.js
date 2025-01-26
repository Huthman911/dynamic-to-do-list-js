document.addEventListener("DOMContentLoaded", function () {
    // Select DOM elements
    const addButton = document.getElementById("add-task-btn");
    const taskInput = document.getElementById("task-input");
    const taskList = document.getElementById("task-list");
  
    // Function to load tasks from Local Storage
    function loadTasks() {
      // Retrieve tasks from Local Storage, defaulting to an empty array if none exist
      const storedTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
  
      // Populate the task list with stored tasks
      storedTasks.forEach(function (taskText) {
        addTask(taskText, false); // Pass false to avoid saving duplicate tasks
      });
    }
  
    // Function to add a new task
    function addTask(taskText, save = true) {
      // Check if taskText is empty
      if (taskText.trim() === "") {
        alert("Please enter a task.");
        return;
      }
  
      // Create a new list item for the task
      const taskItem = document.createElement("li");
      taskItem.textContent = taskText;
  
      // Create a remove button for the task
      const removeButton = document.createElement("button");
      removeButton.textContent = "Remove";
      removeButton.classList.add = "remove-btn";
  
      // Assign an onclick event to the remove button
      removeButton.onclick = function () {
        taskList.removeChild(taskItem);
        removeTaskFromStorage(taskText);
      };
  
      // Append the remove button to the task item
      taskItem.appendChild(removeButton);
  
      // Append the task item to the task list
      taskList.appendChild(taskItem);
  
      // Save the task to Local Storage if save is true
      if (save) {
        const storedTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
        storedTasks.push(taskText);
        localStorage.setItem("tasks", JSON.stringify(storedTasks));
      }
    }
  
    // Function to remove a task from Local Storage
    function removeTaskFromStorage(taskText) {
      // Retrieve the current tasks from Local Storage
      const storedTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
  
      // Filter out the task to be removed
      const updatedTasks = storedTasks.filter(function (task) {
        return task !== taskText;
      });
  
      // Save the updated task list back to Local Storage
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    }
  
    // Add event listener to the "Add Task" button
    addButton.addEventListener("click", function () {
      const taskText = taskInput.value.trim();
      addTask(taskText); // Add the task and save it to Local Storage
      taskInput.value = ""; // Clear the input field
    });
  
    // Add event listener for the 'Enter' key in the input field
    taskInput.addEventListener("keypress", function (event) {
      if (event.key === "Enter") {
        const taskText = taskInput.value.trim();
        addTask(taskText); // Add the task and save it to Local Storage
        taskInput.value = ""; // Clear the input field
      }
    });
  
    // Load tasks from Local Storage when the page loads
    loadTasks();
  });
  