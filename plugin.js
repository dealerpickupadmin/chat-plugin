// chat-widget.js

// Include Bootstrap and Font Awesome CDN links
// var bootstrapLink = document.createElement("link");
// bootstrapLink.rel = "stylesheet";
// bootstrapLink.href = "https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css";
// bootstrapLink.crossOrigin = "anonymous";
// document.head.appendChild(bootstrapLink);

// Include Bootstrap and Font Awesome CDN links
sssss
var bootstrapLink = document.createElement("link");
bootstrapLink.rel = "stylesheet";
bootstrapLink.href = "https://dealerpickupadmin.github.io/chat-plugin/dp-plugin.css";
bootstrapLink.crossOrigin = "anonymous";
document.head.appendChild(bootstrapLink);

var fontAwesomeLink = document.createElement("link");
fontAwesomeLink.rel = "stylesheet";
fontAwesomeLink.href = "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css";
fontAwesomeLink.crossOrigin = "anonymous";
document.head.appendChild(fontAwesomeLink);

// Include jQuery CDN link
var jqueryScript = document.createElement("script");
jqueryScript.src = "https://code.jquery.com/jquery-3.7.1.min.js";
jqueryScript.crossOrigin = "anonymous";
document.head.appendChild(jqueryScript);

// Include jQuery InputMask CDN link
var inputMaskScript = document.createElement("script");
inputMaskScript.src = "https://cdnjs.cloudflare.com/ajax/libs/jquery.mask/1.14.16/jquery.mask.min.js";
inputMaskScript.crossOrigin = "anonymous";
document.head.appendChild(inputMaskScript);

// Include jQuery InputMask CDN link
var popper = document.createElement("script");
popper.src = "https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js";
popper.crossOrigin = "anonymous";
document.head.appendChild(popper);

// Include jQuery InputMask CDN link
var bootjs = document.createElement("script");
bootjs.src = "https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js";
bootjs.crossOrigin = "anonymous";
document.head.appendChild(bootjs);

// Include Axios CDN link
var axiosLib = document.createElement("script");
axiosLib.src = "https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js";
axiosLib.crossOrigin = "anonymous";
document.head.appendChild(axiosLib);


// Wait for all scripts and stylesheets to load
var dependenciesLoaded = 0;

function checkDependencies() {
  dependenciesLoaded++;
  if (dependenciesLoaded === 7) {
    // All dependencies have loaded, now run your script
    runChatWidgetScript();
  }
}

jqueryScript.onload = checkDependencies;
inputMaskScript.onload = checkDependencies;

popper.onload = checkDependencies;
bootstrapLink.onload = checkDependencies;
fontAwesomeLink.onload = checkDependencies;
bootjs.onload = checkDependencies;
axiosLib.onload=checkDependencies;

function runChatWidgetScript() {
  // Create a button element with an icon
  var button = document.createElement("button");
  button.innerHTML = '<i class="fas fa-comment"></i> Text Us'; // Using Font Awesome icon for demonstration
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
        <div style="min-width:250px;max-Width:450px;max-height:550px;overflow:scroll;">
      <div class="form-header">
        <h3><i class="fas fa-comment"></i> Text Us</h3>
      </div>
      <div class="dp-form-group dp-row">
      <label for="firstName" class="dp-col-sm-4 dp-col-form-label">* First Name:</label>
      <div class="dp-col-sm-8">
          <input type="text" class="dp-form-control" id="dpfirstName" name="firstName" required>
      </div>
  </div>
  <div class="dp-form-group dp-row">
      <label for="lastName" class="dp-col-sm-4 dp-col-form-label">* Last Name:</label>
      <div class="dp-col-sm-8">
          <input type="text" class="dp-form-control" id="dplastName" name="lastName" required>
      </div>
  </div>
  <div class="dp-form-group dp-row">
      <label for="phoneNumber" class="dp-col-sm-4 dp-col-form-label">* Phone Number:</label>
      <div class="dp-col-sm-8">
          <input type="tel" class="dp-form-control" id="dpphoneNumber" name="phoneNumber" required>
      </div>
  </div>
  <div class="dp-form-group dp-row">
      <label for="departmentSelect" class="dp-col-sm-4 col-form-label">* Department:</label>
      <div class="dp-col-sm-8">
          <select class="form-control" id="departmentSelect" required>
              <option value="" disabled selected>Select a department</option>
              <!-- Options will be populated by JavaScript -->
          </select>
          <div class="invalid-feedback">
              Please select a department.
          </div>
      </div>
  </div>
      
      <div class="dp-form-group">
        <label for="lastName">* Message:</label>
        <textarea class="dp-form-control" id="dpmessage" name="message" required rows="3"></textarea>
      </div>
      <div class="dp-form-group dp-form-check">
        <input type="checkbox" class="dp-form-check-input" id="dpallowTexting"> &nbsp; &nbsp;
        <label class="dp-form-check-label" for="allowTexting">Allow Texting</label>
        <p class="small text-dark text-wrap pt-0" id="warningText"></p>
        
      </div>
      
      <div class="dp-col-sm-12">
      <button type="submit" class="btn btn-dp-success float-right" id="dpsaveButton" disabled>Send</button>
      <button type="button" class="btn btn-warning float-left" id="dpcancelButton" >Cancel</button>
</div>
      <!-- Spinner -->
      <div id="spinner" class="spinner-border text-primary" role="status" style="display: none;">
          <span class="sr-only">Loading...</span>
      </div>
     
      <!-- Confirmation Modal -->
      <div class="modal" tabindex="-1" role="dialog" id="confirmationModal">
          <div class="modal-dialog" role="document">
              <div class="modal-content">
                  <div class="modal-header">
                      <h5 class="modal-title">Confirmation</h5>
                      <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                          <span aria-hidden="true">&times;</span>
                      </button>
                  </div>
                  <div class="modal-body">
                      Your message has been sent successfully.
                  </div>
                  <div class="modal-footer">
                      <button type="button" class="btn btn-primary" data-dismiss="modal">OK</button>
                  </div>
              </div>
          </div>
      </div>
      <div id="alertPlaceholder" class="mt-3"></div>
</div>
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

    var select = document.getElementById("departmentSelect");

    departmentCodes.forEach(function (dept) {
      var option = document.createElement("option");
      option.value = dept;
      option.textContent = dept.charAt(0).toUpperCase() + dept.slice(1);
      select.appendChild(option);
    });

    // To enable Bootstrap's custom validation feedback
    (function () {
      'use strict';
      window.addEventListener('load', function () {
        var forms = document.getElementsByClassName('needs-validation');
        var validation = Array.prototype.filter.call(forms, function (form) {
          form.addEventListener('submit', function (event) {
            if (form.checkValidity() === false) {
              event.preventDefault();
              event.stopPropagation();
            }
            form.classList.add('was-validated');
          }, false);
        });
      }, false);
    })();
    // Apply input masking to the phone number field

    function cancelForm() {
      dpform.remove();
    }
    document.getElementById("dpcancelButton").addEventListener("click", cancelForm);
    document.getElementById("dpsaveButton").addEventListener("click", sendCustMsg);

    var warning = 'By checking this box, I agree to receive text messages from ' + storeName + '. Message frequency varies. Message & data rates may apply. Reply STOP to opt out or HELP for more information. View our <a href="' + privacyPolicyLink + '" target="_blank">terms & privacy policy</a>.';
    document.getElementById("warningText").innerHTML = warning;

    $("#dpphoneNumber").inputmask({
      mask: "(999) 999-9999",
      placeholder: " ",
    });
    // Function to show alert
    function showAlert(message, type) {
      var alertPlaceholder = document.getElementById('alertPlaceholder');
      var wrapper = document.createElement('div');
      wrapper.innerHTML = [
        `<div class="alert alert-${type} alert-dismissible" role="alert">`,
        `   <div>${message}</div>`,
        '   <button type="button" class="close" data-dismiss="alert" aria-label="Close">',
        '     <span aria-hidden="true">&times;</span>',
        '   </button>',
        '</div>'
      ].join('');

      alertPlaceholder.append(wrapper);
    }
    // Handle form submission
    //dpform.addEventListener("submit", function (event) 
    function sendCustMsg() {



      // Show spinner during API call
      document.getElementById("spinner").style.display = "block";

      // Check if the form is valid
      if (dpform.checkValidity()) {
        // Prevent the default form submission behavior
event.preventDefault();
        // Make an API call with form details
        var formData = {
          firstName: document.getElementById("dpfirstName").value,
          lastName: document.getElementById("dplastName").value,
          message: document.getElementById("dpmessage").value,
          phoneNumber: document.getElementById("dpphoneNumber").value.replace(/\D/g, ''), // Remove non-digits
          allowTexting: document.getElementById("dpallowTexting").checked,
          storeId: dpStoreId,
          enterpriseId: dpEnterpriseId,
          dept: document.getElementById("departmentSelect").value
        };

        // Replace the following URL with your actual API endpoint
        var apiUrl = "https://dp2-prd-core-api.azurewebsites.net/api/public/intiate-chat-by-3rd-party";
        axios.post(apiUrl, formData, {
          headers: {
            "Content-Type": "application/json"
          }
        })
          .then(response => {
            // Hide spinner after the API call
            document.getElementById("spinner").style.display = "none";

            // Check if the response is successful and data is true
            if (response.data && response.data === true) {
              // Show confirmation modal on success
              showAlert('Successfully submitted message.', 'success');
              // Wait for 3 seconds before removing the form
              setTimeout(() => {
                dpform.remove();
              }, 2000);
            }
          })
          .catch(error => {
            // Hide spinner in case of error
            document.getElementById("spinner").style.display = "none";
            showAlert('Submission Failed!', 'warning');
            // Handle errors here
          });
        // Make the API call using fetch
        //   fetch(apiUrl, {
        //       method: "POST",
        //       headers: {
        //           "Content-Type": "application/json"
        //       },
        //       body: JSON.stringify(formData)
        //   })
        //   .then(response => {
        //     // Hide spinner after the API call
        //     document.getElementById("spinner").style.display = "none";

        // })
        // .then(data => {
        //     console.log("API response:", data);

        //     // Show confirmation modal on success
        //     if (data && data === true) {
        //         $('#confirmationModal').modal('show');
        //     }
        // })
        // .catch(error => {
        //   document.getElementById("spinner").style.display = "none";
        //     console.error("Error:", error);
        //     // Handle errors here
        // });

        // Remove the form after submission
        // dpform.remove();
      } else {
        document.getElementById("spinner").style.display = "none";
        // If the form is invalid, you can handle it accordingly
        // showAlert('Please fill out the form correctly.', 'danger');
      }
      document.getElementById("spinner").style.display = "block";
    };
  }

  // Attach the createForm function to the button click event
  button.addEventListener("click", createForm);

}

// ... (rest of your script)
