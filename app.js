async function initEMR() {
    try {
        const response = await fetch('./data.json');
        const data = await response.json();

        // Simulate a "Secure Connection" delay
        setTimeout(() => {
            renderDashboard(data);
        }, 1200);
    } catch (err) {
        console.error("EMR System Error:", err);
    }
}

function renderDashboard(data) {
    // Update Header Info
    document.getElementById('clinic-name').innerText = data.clinicName;
    document.getElementById('provider-name').innerText = data.provider;

    const container = document.getElementById('patient-container');
    container.innerHTML = ''; // Remove skeletons

    data.patients.forEach(patient => {
        const card = document.createElement('div');
        card.className = 'patient-card';
        
        card.innerHTML = `
            <div style="font-size: 0.8rem; color: #888;">ID: ${patient.id}</div>
            <h3 style="margin: 5px 0;">${patient.name}</h3>
            <p style="font-size: 0.9rem;">DOB: ${patient.dob} | Blood: ${patient.bloodType}</p>
            
            <div class="vitals-row">
                <div class="vital">🌡️ ${patient.vitals.temp}</div>
                <div class="vital">💓 ${patient.vitals.hr}</div>
                <div class="vital">🩸 ${patient.vitals.bp}</div>
            </div>

            <p style="font-size: 0.85rem; margin-top: 15px;">
                <strong>Conditions:</strong> ${patient.conditions.join(', ')}
            </p>
            <div style="margin-top: 10px; font-size: 0.75rem; color: #666;">
                Last Encouter: ${patient.lastVisit}
            </div>
        `;
        container.appendChild(card);
    });
}

initEMR();