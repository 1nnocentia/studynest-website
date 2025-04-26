const reminderInput = document.getElementById("reminderInput");
    const reminderList = document.getElementById("reminderList");

    reminderInput.addEventListener("keypress", function (e) {
      if (e.key === "Enter" && reminderInput.value.trim() !== "") {
        addReminder(reminderInput.value.trim());
        reminderInput.value = "";
      }
    });

    function addReminder(text) {
      const wrapper = document.createElement("div");
      wrapper.className = "reminder-item";

      const label = document.createElement("label");
      label.textContent = text;

      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.addEventListener("change", function () {
        if (checkbox.checked) {
          wrapper.remove();
        }
      });

      wrapper.prepend(checkbox);
      wrapper.appendChild(label);
      reminderList.appendChild(wrapper);
    }

    // Happening Logic
    const happeningList = document.getElementById("happeningList");

    function updatePlaceholders() {
      const inputs = happeningList.querySelectorAll(".happening-input");
      inputs.forEach((input, index) => {
        input.placeholder = `Happening ${index + 1}`;
      });
    }

    happeningList.addEventListener("keypress", function (e) {
      if (e.target.classList.contains("happening-input") && e.key === "Enter") {
        const value = e.target.value.trim();
        const inputs = happeningList.querySelectorAll(".happening-input");
        const isLast = inputs[inputs.length - 1] === e.target;

        if (value !== "" && isLast) {
          const newInput = document.createElement("input");
          newInput.type = "text";
          newInput.className = "happening-input";
          happeningList.appendChild(newInput);
          newInput.focus();
          updatePlaceholders();
        }
      }
    });

    document.addEventListener("click", function (e) {
      const inputs = happeningList.querySelectorAll(".happening-input");
      inputs.forEach((input, index) => {
        if (index >= 2 && input.value.trim() === "" && !input.contains(e.target) && document.activeElement !== input) {
          input.remove();
          updatePlaceholders();
        }
      });
    });

    updatePlaceholders(); // initial setup

    document.addEventListener("DOMContentLoaded", function () {
        function addTaskRow() {
          const taskBody = document.getElementById("taskBody");
      
          const row = document.createElement("tr");
          row.innerHTML = `
            <td>
              <select class="form-select form-select-sm">
                <option value="High" class="text-danger">High</option>
                <option value="Medium" class="text-warning">Medium</option>
                <option value="Low" class="text-success">Low</option>
              </select>
            </td>
            <td><input type="text" class="form-control form-control-sm" placeholder="Task name"></td>
            <td><input type="text" class="form-control form-control-sm" placeholder="To-Do detail"></td>
            <td><input type="date" class="form-control form-control-sm"></td>
            <td>
              <div class="d-flex align-items-center gap-2 text-white">
                <span class="pomodoro-done">0</span> /
                <span class="pomodoro-total">0</span>
              </div>
              <div class="d-flex gap-2 mt-1">
                <button class="btn btn-sm btn-outline-light pomodoro-increase">+1</button>
                <button class="btn btn-sm btn-outline-light pomodoro-decrease">-1</button>
              </div>
            </td>
            <td>
              <div class="progress">
                <div class="progress-bar bg-success" style="width: 0%;" role="progressbar"></div>
              </div>
              <small><span class="progress-text">0%</span></small>
            </td>
          `;
          taskBody.appendChild(row);
          addPomodoroEvent(row);
        }
      
        function addPomodoroEvent(row) {
          const increaseBtn = row.querySelector(".pomodoro-increase");
          const decreaseBtn = row.querySelector(".pomodoro-decrease");
          const doneSpan = row.querySelector(".pomodoro-done");
          const totalSpan = row.querySelector(".pomodoro-total");
          const progressBar = row.querySelector(".progress-bar");
          const progressText = row.querySelector(".progress-text");
        
          increaseBtn.addEventListener("click", function () {
            let total = parseInt(totalSpan.textContent) || 0;
            total += 1;
            totalSpan.textContent = total;
        
            const done = parseInt(doneSpan.textContent) || 0;
            const percent = total > 0 ? Math.round((done / total) * 100) : 0;
            progressBar.style.width = percent + "%";
            progressText.textContent = percent + "%";
          });
        
          decreaseBtn.addEventListener("click", function () {
            let total = parseInt(totalSpan.textContent) || 0;
            let done = parseInt(doneSpan.textContent) || 0;
        
            if (total > 0) total -= 1;
            if (done > total) done = total;
        
            totalSpan.textContent = total;
            doneSpan.textContent = done;
        
            const percent = total > 0 ? Math.round((done / total) * 100) : 0;
            progressBar.style.width = percent + "%";
            progressText.textContent = percent + "%";
          });
        }
        
        
      
        // Initial row
        addTaskRow();
      
        // Add new row on click
        const addTaskBtn = document.getElementById("addTaskBtn");
        addTaskBtn.addEventListener("click", addTaskRow);
      });

      function increasePomodoroCount(row) {
        const totalInput = row.querySelector(".pomodoro-total");
        const doneSpan = row.querySelector(".pomodoro-done");
        const progressBar = row.querySelector(".progress-bar");
        const progressText = row.querySelector(".progress-text");
      
        let total = parseInt(totalInput.value) || 0;
        let done = parseInt(doneSpan.textContent) || 0;
      
        if (done < total && total > 0) {
          done += 1;
          const percent = Math.round((done / total) * 100);
          doneSpan.textContent = done;
          progressBar.style.width = percent + "%";
          progressText.textContent = percent + "%";
        }
      }
      
      function addPomodoroEvent(row) {
        const button = row.querySelector(".pomodoro-increase");
        button.addEventListener("click", function () {
          increasePomodoroCount(row);
        });
      }
      
      increasePomodoroCount(targetRow);