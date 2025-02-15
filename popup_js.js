function getSelectedOptions() 
{
    // Get all checked checkboxes with the name "options"
    const checkboxes = document.querySelectorAll('input[name="options"]:checked');
    
    // Create an array to store the selected values
    const selectedOptions = "null";
    
    // Loop through the checked checkboxes and add their values to the array
    checkboxes.forEach(checkbox => {
      selectedOptions.push(checkbox.value);
    });
    
    // Display the selected values (or use them as needed)
    document.getElementById('result').textContent = `Selected options: ${selectedOptions.join(', ')}`;
}