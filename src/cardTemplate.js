const { capitalize, capitalizeAll } = require('./littleHelpers')

var icons = { manager: '<i class="fas fa-mug-hot"></i>', engineer: '<i class="fas fa-glasses"></i>', intern: '<i class="fas fa-user-graduate"></i>' }

// returns the html card with each of the provided details filled in
const cardTemplate = ({ position, fullName, id, email, officeNumber, github, school }) => `

<div class="card">
    <div class="card-body">
        <h5 class="card-title">${capitalizeAll(fullName)}<br />${icons[position] + "&nbsp;" + capitalize(position)}</h5>
        <div class="card-bottom">
            <p>ID: ${id}</p>
            <p>Email: <a href="mailto:${email}">${email}</a></p>
            ${position === 'manager' ? `<p>Office number: ${officeNumber}</p>` : ''}
            ${position === 'engineer' ? `<p>Github: <a href="https://github.com/${github}" target="_blank">${github}</a></p>` : ''}
            ${position === 'intern' ? `<p>School: <a href="https://google.com/search?q=${school.replace(" ", "+")}" target="_blank">${capitalizeAll(school)}</a></p>` : ''}
        </div>
    </div>
</div>
`;

module.exports = cardTemplate