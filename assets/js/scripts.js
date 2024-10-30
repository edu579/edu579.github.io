// scripts.js
document.addEventListener('DOMContentLoaded', () => {
    const commandsContainer = document.querySelector('main');

    const commands = [
        { name: '!help', description: 'Displays a list of commands.' },
        { name: '!kick [user]', description: 'Kicks a user from the server.' },
        // Add more commands here
    ];

    commands.forEach(command => {
        const commandElement = document.createElement('div');
        commandElement.classList.add('command');
        commandElement.innerHTML = `<strong>${command.name}</strong>: ${command.description}`;
        commandsContainer.appendChild(commandElement);
    });
});
