async function searchMission() {
    const nameToSearch = document.getElementById('nameInput').value;
    const response = await fetch('https://services.isrostats.in/api/launches');
    
    if (response.ok) {
        const data = await response.json();
        const launchInfo = data.find(item => item.Name === nameToSearch);

        if (launchInfo) {
            displayMissionInfo(launchInfo);
        } else {
            displayErrorMessage('Missão não encontrada.');
        }
    } else {
        displayErrorMessage('Falha ao buscar dados da API.');
    }
}

function displayMissionInfo(mission) {
    const missionInfoDiv = document.getElementById('mission-info');
    missionInfoDiv.innerHTML = `
        <div class="mission-details">
            <h2>${mission.Name}</h2>
            <ul>
                <li><strong>Data de lançamento:</strong> ${mission.LaunchDate}</li>
                <li><strong>Tipo de lançamento:</strong> ${mission.LaunchType}</li>
                <li><strong>Objeto:</strong> ${mission.Payload}</li>
                <li><strong>Status da missão:</strong> ${mission.MissionStatus}</li>
                <li><strong>Link:</strong> <a href="${mission.Link}" target="_blank">Mais informações</a></li>
            </ul>
        </div>
    `;

  
    missionInfoDiv.querySelector('.mission-details').style.border = '1px solid #ccc';
    missionInfoDiv.querySelector('.mission-details').style.padding = '10px';
    missionInfoDiv.querySelector('ul').listStyleType = 'none';
}

function displayErrorMessage(message) {
    const missionInfoDiv = document.getElementById('mission-info');
    missionInfoDiv.innerHTML = `<p>${message}</p>`;
}