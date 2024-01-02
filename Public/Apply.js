let jobDescription = localStorage.getItem("jobDescription");

const successModalLabelID = document.getElementById('successModalLabel');
const modalBodyID = document.getElementById('modal-body');
const titleID = document.getElementById('title');

titleID.innerText = `You are applying for the ${jobDescription} job`;

function submitForm() {
    // Get form input values
    const nameInput = document.getElementById('nameInput').value.trim();
    const emailInput = document.getElementById('emailInput').value.trim();

    // Validate full name
    if (nameInput === '') {
        // Set modal content
        successModalLabelID.innerText = 'Error';
        modalBodyID.innerText = 'Please enter your full name.';
        // Show modal
        new bootstrap.Modal(document.getElementById('successModal')).show();
        return; // Prevent form submission
    }

    // Validate email address format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailInput)) {
        // Set modal content
        successModalLabelID.innerText = 'Error';
        modalBodyID.innerText = 'Please enter a valid email address.';
        // Show modal
        new bootstrap.Modal(document.getElementById('successModal')).show();
        return; // Prevent form submission
    }

    // Set modal content for success
    successModalLabelID.innerText = 'Success';
    modalBodyID.innerText = 'Your form has been submitted successfully.';
    // Show modal
    const successModal = new bootstrap.Modal(document.getElementById('successModal'));
    successModal.show();

    // Add click event listener to the "OK" button in the success modal
    document.getElementById('okButton').addEventListener('click', function() {
        // Navigate to home.html
        window.location.href = 'home.html';
    });


}
