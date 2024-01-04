// chat-widget.js

// Include Bootstrap and Font Awesome CDN links
var bootstrapLink = document.createElement("link");
bootstrapLink.rel = "stylesheet";
bootstrapLink.href = "https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css";
bootstrapLink.crossOrigin = "anonymous";
document.head.appendChild(bootstrapLink);

var fontAwesomeLink = document.createElement("link");
fontAwesomeLink.rel = "stylesheet";
fontAwesomeLink.href = "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css";
fontAwesomeLink.crossOrigin = "anonymous";
document.head.appendChild(fontAwesomeLink);

// Include jQuery CDN link
var jqueryScript = document.createElement("script");
jqueryScript.src = "https://code.jquery.com/jquery-3.6.4.min.js";
jqueryScript.crossOrigin = "anonymous";
document.head.appendChild(jqueryScript);

// Include jQuery InputMask CDN link
var inputMaskScript = document.createElement("script");
inputMaskScript.src = "https://cdnjs.cloudflare.com/ajax/libs/jquery.inputmask/5.0.5/jquery.inputmask.min.js";
inputMaskScript.crossOrigin = "anonymous";
document.head.appendChild(inputMaskScript);

// Wait for all scripts and stylesheets to load
var dependenciesLoaded = 0;

function checkDependencies() {
  dependenciesLoaded++;
  if (dependenciesLoaded === 4) {
    // All dependencies have loaded, now run your script
    runChatWidgetScript();
  }
}

bootstrapLink.onload = checkDependencies;
fontAwesomeLink.onload = checkDependencies;
jqueryScript.onload = checkDependencies;
inputMaskScript.onload = checkDependencies;

function runChatWidgetScript() {
    // Create a button element with an icon
    var button = document.createElement("button");
    button.innerHTML = '<i class="fas fa-comment"></i> Chat With Us'; // Using Font Awesome icon for demonstration
    button.classList.add("btn", "btn-primary", "btn-icon");
    button.style.position = "fixed";
    button.style.bottom = "20px";
    button.style.right = "20px";
    button.style.zIndex = "999";

    // Append the button to the body of the website
    document.body.appendChild(button);

    // Function to create and show the form
    function createForm() {
        // Create a form element with Bootstrap classes
        var dpform = document.createElement("form");
        dpform.innerHTML = `
      <div class="form-header">
        <h3><i class="fas fa-comment"></i> Chat with Us</h3>
      </div>
      <div class="form-group">
        <label for="firstName">First Name:</label>
        <input type="text" class="form-control" id="dpfirstName" name="firstName" required>
      </div>
      <div class="form-group">
        <label for="lastName">Last Name:</label>
        <input type="text" class="form-control" id="dplastName" name="lastName" required>
      </div>
      <div class="form-group">
        <label for="phoneNumber">Phone Number:</label>
        <input type="tel" class="form-control" id="dpphoneNumber" name="phoneNumber" placeholder="Format: (123) 456-7890" required>
      </div>
      <div class="form-group">
        <label for="lastName">Message:</label>
        <textarea class="form-control" id="dpmessage" name="message" required rows="3"></textarea>
      </div>
      <div class="form-group form-check">
        <input type="checkbox" class="form-check-input" id="dpallowTexting">
        <label class="form-check-label" for="allowTexting">Allow Texting</label>
      </div>
      <button type="submit" class="btn btn-success" id="dpsaveButton" disabled>Save</button>
    `;

        // Style the form
        dpform.style.position = "fixed";
        dpform.style.bottom = "50px";
        dpform.style.right = "50px";
        dpform.style.padding = "20px";
        dpform.style.backgroundColor = "#fff";
        dpform.style.border = "1px solid #ccc";
        dpform.style.zIndex = "1000";

        // Append the form to the body
        document.body.appendChild(dpform);

        // Enable/disable Save button based on checkbox state
        var saveButton = document.getElementById("dpsaveButton");
        var allowTextingCheckbox = document.getElementById("dpallowTexting");

        allowTextingCheckbox.addEventListener("change", function () {
            saveButton.disabled = !allowTextingCheckbox.checked;
        });

        // Apply input masking to the phone number field
        $("#dpphoneNumber").inputmask({
            mask: "(999) 999-9999",
            placeholder: " ",
        });

        // Handle form submission
        dpform.addEventListener("submit", function (event) {
            event.preventDefault();

            // Check if the form is valid
            if (dpform.checkValidity()) {
                // Make an API call with form details
                var formData = {
                    firstName: document.getElementById("dpfirstName").value,
                    lastName: document.getElementById("dplastName").value,
                    message: document.getElementById("dpmessage").value,
                    phoneNumber: document.getElementById("dpphoneNumber").value.replace(/\D/g, ''), // Remove non-digits
                    allowTexting: document.getElementById("dpallowTexting").checked
                };

                // Replace the following URL with your actual API endpoint
                var apiUrl = "https://dp-api.azurewebsites.net/api/public/intiate-chat-by-3rd-party";

                // Make the API call using fetch
                fetch(apiUrl, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(formData)
                })
                    .then(response => response.json())
                    .then(data => {
                        console.log("API response:", data);
                        // You can add additional handling based on the API response
                    })
                    .catch(error => {
                        console.error("Error:", error);
                        // Handle errors here
                    });

                // Remove the form after submission
                dpform.remove();
            } else {
                // If the form is invalid, you can handle it accordingly
                console.log("Form is not valid");
            }
        });
    }

    // Attach the createForm function to the button click event
    button.addEventListener("click", createForm);
}

// ... (rest of your script)
