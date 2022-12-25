const loader = (element, loadInterval) => {

    element.textContent = ''

    loadInterval = setInterval(() => {

        // Update the text content of the loading indicator
        element.textContent += '.';

        // If the loading indicator has reached three dots, reset it
        element.textContent === '...' && (element.textContent = '');


    }, 300);
}

export default loader;