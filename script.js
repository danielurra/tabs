

function openTab(evt, tabName) {
    var i, tabcontent, tabs, textAreaContainer, imageAreaContainer;

    // Hide all tab contents
    tabcontent = document.getElementsByClassName("tab-content");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
        tabcontent[i].classList.remove("active-container", "tab1-container", "tab2-container", "tab3-container", "tab4-container", "tab5-container", "tab6-container");
    }

    // Show the current tab content
    document.getElementById(tabName).style.display = "block";

    // Remove active class from all tabs
    tabs = document.getElementsByClassName("tab");
    for (i = 0; i < tabs.length; i++) {
        tabs[i].classList.remove("active");
    }

    // Add active class to the clicked tab
    evt.currentTarget.classList.add("active");

    // Get the text and image containers of the current tab
    textAreaContainer = document.querySelector(`#${tabName} textarea`).parentElement;
    imageAreaContainer = document.querySelector(`#imagePasteArea-${tabName}`).parentElement;

    // Add the active-container class and tab-specific class for color
    textAreaContainer.classList.add("active-container", `${tabName}-container`);
    imageAreaContainer.classList.add("active-container", `${tabName}-container`);
}

function copyToClipboard(tabName) {
    const textarea = document.querySelector(`#${tabName} textarea`);
    textarea.select();
    document.execCommand("copy");
    
    // Display the copied text below the textarea
    const output = document.getElementById(`output-${tabName}`);
    output.textContent = `Copied: ${textarea.value}`;
}

function removeParentheses(tabName) {
    const textarea = document.querySelector(`#${tabName} textarea`);
    textarea.value = textarea.value.replace(/[()]/g, '');
}

function removeDashes(tabName) {
    const textarea = document.querySelector(`#${tabName} textarea`);
    textarea.value = textarea.value.replace(/-/g, '');
}

function removeNonDigits(tabName) {
    const textarea = document.querySelector(`#${tabName} textarea`);
    textarea.value = textarea.value.replace(/\D/g, '');
}

function removeColons(tabName) {
    const textarea = document.querySelector(`#${tabName} textarea`);
    textarea.value = textarea.value.replace(/:/g, ''); // Remove all colons
}

function renameTab(tabId, tabTitleId, newName) {
    // Allow letters, numbers, and special characters: @, -, *, /
    const validName = /^[a-zA-Z0-9 @\-\*\#\\\/]*$/.test(newName); // Regular expression updated to allow special characters
    if (validName) {
        const label = document.getElementById(tabId);
        const title = document.getElementById(tabTitleId);
        const defaultLabel = `Tab ${tabId.slice(-1)}`;

        // Update the tab label and title with the new name or default if empty
        label.textContent = newName || defaultLabel;
        title.innerHTML = `Tab <strong>${newName || tabId.slice(-1)}</strong>`;
    } else {
        alert("Invalid name! Only letters, numbers, and @, -, *, / are allowed.");
    }
}


// Function to dynamically change the page title
function changePageTitle(newTitle) {
    document.title = newTitle || 'Toggleable Tabs with Text Manipulation';
}

// Open the first tab by default
document.querySelector('.tabs .tab').click();

// Danny el Danny Added section for copy/pastin images

// Handle pasting of images for each tab
function setupImagePasteListener(tabName) {
    const imageArea = document.getElementById(`imagePasteArea-${tabName}`);

    imageArea.addEventListener('paste', function (event) {
        const items = (event.clipboardData || event.originalEvent.clipboardData).items;

        for (const item of items) {
            if (item.type.indexOf('image') !== -1) {
                const blob = item.getAsFile();
                const reader = new FileReader();

                reader.onload = function (event) {
                    const img = document.createElement('img');
                    img.src = event.target.result;
                    img.style.maxWidth = '100%'; // Adjust to the div width
                    imageArea.appendChild(img);
                };

                reader.readAsDataURL(blob);
            }
        }

        // Prevent default paste behavior
        event.preventDefault();
    });
}

// Copy the content of the image section for each tab
function copyImageContent(tabName) {
    const imageArea = document.getElementById(`imagePasteArea-${tabName}`);
    const range = document.createRange();
    range.selectNode(imageArea);
    window.getSelection().removeAllRanges();
    window.getSelection().addRange(range);
    document.execCommand('copy');
    alert('Image content copied to clipboard');
    window.getSelection().removeAllRanges(); // Unselect content after copying
}

// Initialize image paste event listeners for each tab
setupImagePasteListener('tab1');
setupImagePasteListener('tab2');
setupImagePasteListener('tab3');
setupImagePasteListener('tab4');
setupImagePasteListener('tab5');
setupImagePasteListener('tab6');

function saveTextareaContent() {
    // Get the textarea element and its value
    const textarea = document.getElementById("paragraphInput");
    const textareaValue = textarea.value;

    // Create a new <p> element to replace the textarea
    const paragraphElement = document.createElement("p");
    paragraphElement.innerText = textareaValue;

    // Replace the textarea with the <p> element
    textarea.parentNode.replaceChild(paragraphElement, textarea);
}

function savePageTitleContent() {
    // Get the textarea element and its value
    const titletext = document.getElementById("pageTitleInput");
    const titletextValue = titletext.value;

    // Create a new <p> element to replace the textarea
    const titleparagraphElement = document.createElement("p");
    titleparagraphElement.innerText = titletextValue;

    // Increase the font size
    titleparagraphElement.style.fontSize = "40px"; // Change to your desired size

    // Optionally, you can also set other styles
    titleparagraphElement.style.color = "blue"; // Example: change text color

    // Set padding and margin
    titleparagraphElement.style.padding = "20px"; // Adds 20px of padding
    titleparagraphElement.style.marginLeft = "20px"; // Sets left margin to 20px

    // Replace the textarea with the <p> element
    titletext.parentNode.replaceChild(titleparagraphElement, titletext);
}

function activateTabOnEnter(event, tabId) {
    if (event.key === "Enter") {
        event.preventDefault(); // Prevent the default form submission behavior

        // Make the tab active by triggering the openTab function
        const tabButton = document.querySelector(`#tabLabel${tabId.slice(-1)}`);
        tabButton.click(); // Simulates a click on the tab button to activate it
    }
}

// Function to format text (bold, list, etc.)
function formatText(command) {
    document.execCommand(command, false, null);
}

// Function to highlight text (yellow background)
function highlightText() {
    document.execCommand('backColor', false, 'yellow');
}

// Function to create a clickable link
function createLink() {
    const url = prompt("Enter the URL", "https://");
    if (url) {
        document.execCommand("createLink", false, url);
    }
}

// Handle link clicks inside contenteditable areas
document.addEventListener('click', function(event) {
    // Check if the clicked element is a link (A tag) inside a contenteditable area
    if (event.target.tagName === 'A' && event.target.closest('[contenteditable="true"]')) {
        const href = event.target.getAttribute('href');
        
        // Open the link in a new tab if it's a valid URL
        if (href) {
            event.preventDefault();
            window.open(href, '_blank');
        }
    }
});
