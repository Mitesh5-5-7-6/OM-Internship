function showTab(event, tabId) {
    let tabs = document.querySelectorAll('.tab');
    tabs.forEach(tab => tab.classList.remove('active'));

    event.currentTarget.classList.add('active');

    // Load the corresponding component dynamically
    fetch(`${tabId}.html`)
        .then(response => response.text())
        .then(data => {
            document.getElementById('tab-container').innerHTML = data;
        })
        .catch(error => console.error('Error loading the content:', error));
}

// Load the default tab content on page load
document.addEventListener("DOMContentLoaded", () => {
    fetch('validation.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('tab-container').innerHTML = data;
        });
});
