// Open form
document.getElementById("btn").addEventListener("click", () => {
  document.getElementById("section3").style.display = "block";
});

// Close form
document.getElementById("closebtn").addEventListener("click", () => {
  document.getElementById("section3").style.display = "none";
});

// Add data
document.getElementById("adddata").addEventListener("click", () => {
  // Get values
  const taskname = document.getElementById("taskname").value;
  const taskdate = document.getElementById("selectdate").value;
  const taskstatus = document.getElementById("statusname").value;
  const taskpriority = document.getElementById("priorityname").value;

  // Check field
  if (taskname && taskdate && taskstatus && taskpriority) {
    const tasks = JSON.parse(localStorage.getItem("taskdata")) || [];

    // create object
    const task = {
      id: Date.now(),
      taskname,
      taskdate,
      taskstatus,
      taskpriority,
    };

    // Add the new task to the array
    tasks.push(task);

    // Save the latest array
    localStorage.setItem("taskdata", JSON.stringify(tasks));

    printAllTasks();

    document.getElementById("section3").style.display = "none";
  }
});

// function for print task
function printAllTasks() {
  document.getElementById("section2_2").innerHTML = "";
  const tasks = JSON.parse(localStorage.getItem("taskdata")) || [];

  tasks.forEach(printData);
}

// Display all tasks when the page loads
window.onload = () => {
  printAllTasks();
};

// print data
function printData(task) {
  // first div
  const fdiv = document.createElement("div");
  fdiv.classList.add("col-lg-3");
  fdiv.id = `task-${task.id}`;

  // second div
  const sdiv = document.createElement("div");
  fdiv.appendChild(sdiv);

  // h3
  const h3 = document.createElement("h3");
  h3.textContent = task.taskname;
  sdiv.appendChild(h3);

  // date and status
  const t_fdiv = document.createElement("div");
  t_fdiv.classList.add("ff1");
  sdiv.appendChild(t_fdiv);

  const date1 = document.createElement("p");
  date1.classList.add("date1");
  date1.textContent = task.taskdate;
  t_fdiv.appendChild(date1);

  const status1 = document.createElement("p");
  status1.classList.add("status1");
  status1.textContent = task.taskstatus;
  t_fdiv.appendChild(status1);

  // priority and update, delete
  const t_sdiv = document.createElement("div");
  t_sdiv.classList.add("ff2");
  sdiv.appendChild(t_sdiv);

  const priority1 = document.createElement("p");
  priority1.classList.add("priority1");
  priority1.textContent = task.taskpriority;
  t_sdiv.appendChild(priority1);

  // update and delete
  const up_del = document.createElement("div");
  up_del.classList.add("up_del");
  t_sdiv.appendChild(up_del);

  // Update button
  const btn1 = document.createElement("button");
  btn1.classList.add("up1");
  btn1.innerHTML = "<i class='bx bx-edit'></i>";
  btn1.addEventListener("click", () => updateTask(task.id));
  up_del.appendChild(btn1);

  // Delete button
  const btn2 = document.createElement("button");
  btn2.classList.add("del1");
  btn2.innerHTML = "<i class='bx bx-message-square-x'></i>";
  btn2.addEventListener("click", () => deleteTask(task.id));
  up_del.appendChild(btn2);

  // append in main
  document.getElementById("section2_2").appendChild(fdiv);
}

// function for update task
function updateTask(taskId) {
  document.getElementById("section3").style.display = "block";

  const tasks1 = JSON.parse(localStorage.getItem("taskdata")) || [];

  const taskToUpdate = tasks1.find((task) => task.id === taskId);

  if (taskToUpdate) {
    document.getElementById("taskname").value = taskToUpdate.taskname;
    document.getElementById("selectdate").value = taskToUpdate.taskdate;
    document.getElementById("statusname").value = taskToUpdate.taskstatus;
    document.getElementById("priorityname").value = taskToUpdate.taskpriority;

    document.getElementById("adddata").onclick = () => {
      taskToUpdate.taskname = document.getElementById("taskname").value;
      taskToUpdate.taskdate = document.getElementById("selectdate").value;
      taskToUpdate.taskstatus = document.getElementById("statusname").value;
      taskToUpdate.taskpriority = document.getElementById("priorityname").value;

      localStorage.setItem("taskdata", JSON.stringify(tasks1));

      printAllTasks();

      document.getElementById("section3").style.display = "none";
    };
  }
}

// function for delete
function deleteTask(taskId) {
  const tasks1 = JSON.parse(localStorage.getItem("taskdata")) || [];

  const updatedTasks = tasks1.filter((task) => task.id !== taskId);

  localStorage.setItem("taskdata", JSON.stringify(updatedTasks));

  printAllTasks();
}

// Search filter
document.getElementById("search").addEventListener("input", () => {
  const query = document.getElementById("search").value.toLowerCase();
  const tasks = JSON.parse(localStorage.getItem("taskdata")) || [];
  const filteredTasks = tasks.filter((task) =>
    task.taskname.toLowerCase().includes(query)
  );

  document.getElementById("section2_2").innerHTML = "";

  filteredTasks.forEach(printData);
});

// date filter
document.getElementById("date").addEventListener("change", () => {
  const filter_date = document.getElementById("date").value;
  const tasks= JSON.parse(localStorage.getItem("taskdata")) || [];
  document.getElementById("section2_2").innerHTML = "";

  if (filter_date) {
    const filteredTask_date = tasks.filter(
      (task) => task.taskdate === filter_date
    );
    filteredTask_date.forEach(printData);
  } else {
    tasks.forEach(printData);
  }
});

// status filter

const radiobtns = document.querySelectorAll(".status1");

radiobtns.forEach((radiobtn) => {
  radiobtn.addEventListener("change", (event) => {
    const radiobtnvalue = event.target.value;
    document.getElementById("section2_2").innerHTML = "";
    const tasks = JSON.parse(localStorage.getItem("taskdata")) || [];
    if (radiobtnvalue === "all") {
      tasks.forEach(printData);
    } else {
      const filteredTask_status = tasks.filter(
        (task) => task.taskstatus === radiobtnvalue
      );
      filteredTask_status.forEach(printData);
    }
  });
});

// priority filter
const radiobtns2 = document.querySelectorAll(".priority1");

radiobtns2.forEach((radiobtn) => {
  radiobtn.addEventListener("change", (event) => {
    const radiobtnvalue = event.target.value;
    const tasks = JSON.parse(localStorage.getItem("taskdata")) || [];
    document.getElementById("section2_2").innerHTML = "";

    if (radiobtnvalue === "all") {
      tasks.forEach(printData);
    } else {
      const filteredTask_priority = tasks.filter(
        (task) => task.taskpriority === radiobtnvalue
      );
      filteredTask_priority.forEach(printData);
    }
  });
});
