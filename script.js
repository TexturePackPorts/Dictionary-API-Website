document.getElementById('theme-toggle').addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
});

async function fetchDefinition() {
    const word = document.getElementById('wordInput').value;
    const url = `https://dictionary-psi-six.vercel.app/define?word=${word}`;
    const definitionContainer = document.getElementById('definitionContainer');

    definitionContainer.innerHTML = `<p>Loading...</p>`; // Show loading state

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();

        definitionContainer.innerHTML = `
            <h3>${data.word}</h3>
            <p><strong>Type:</strong> ${data.type}</p>
            <p><strong>Definition:</strong> ${data.definition}</p>
        `;
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        definitionContainer.innerHTML = `
            <p>Sorry, an error occurred while fetching the definition. Please try again.</p>
        `;
    }
}

function copyToClipboard(elementId) {
    const text = document.getElementById(elementId).innerText;
    navigator.clipboard.writeText(text).then(() => {
        const button = document.querySelector('.copy-btn span');
        button.innerText = 'Copied';
        setTimeout(() => {
            button.innerText = 'Copy';
        }, 2000);
    }).catch(err => {
        console.error('Could not copy text: ', err);
    });
}
