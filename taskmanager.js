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