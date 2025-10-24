document.addEventListener("DOMContentLoaded", () => {
  const activitiesList = document.getElementById("activities-list");
  const activitySelect = document.getElementById("activity");
  const signupForm = document.getElementById("signup-form");
  const messageDiv = document.getElementById("message");

  // Mock data for activities
  const mockActivities = {
    "Chess Club": {
      description: "Learn strategies and compete in chess tournaments",
      schedule: "Fridays, 3:30 PM - 5:00 PM",
      max_participants: 10,
      participants: ["michael@mergington.edu", "daniel@mergington.edu"]
    },
    "Drama Club": {
      description: "Explore acting, script writing, and stage production",
      schedule: "Wednesdays, 4:00 PM - 6:00 PM",
      max_participants: 15,
      participants: ["sarah@mergington.edu", "lucas@mergington.edu", "ana@mergington.edu"]
    },
    "Science Fair": {
      description: "Prepare experiments and projects for the annual science fair",
      schedule: "Tuesdays and Thursdays, 3:30 PM - 5:30 PM",
      max_participants: 8,
      participants: []
    },
    "Basketball Team": {
      description: "Train and compete in inter-school basketball tournaments",
      schedule: "Mondays and Fridays, 5:00 PM - 7:00 PM",
      max_participants: 12,
      participants: ["carlos@mergington.edu", "felipe@mergington.edu", "joao@mergington.edu", "pedro@mergington.edu"]
    }
  };

  // Function to display activities (using mock data instead of API)
  function displayActivities() {
    try {
      // Clear loading message
      activitiesList.innerHTML = "";

      // Populate activities list
      Object.entries(mockActivities).forEach(([name, details]) => {
        const activityCard = document.createElement("div");
        activityCard.className = "activity-card";

        const spotsLeft = details.max_participants - details.participants.length;

        // Create participants list
        const participantsList = details.participants.map(email => `<li>${email}</li>`).join('');

        activityCard.innerHTML = `
          <h4>${name}</h4>
          <p>${details.description}</p>
          <p><strong>Agenda:</strong> ${details.schedule}</p>
          <p><strong>Disponibilidade:</strong> ${spotsLeft} vagas disponíveis</p>
          <div class="participants-section">
            <h5>Participantes Inscritos (${details.participants.length}/${details.max_participants}):</h5>
            <ul class="participants-list">
              ${participantsList || '<li class="no-participants">Nenhum participante inscrito ainda</li>'}
            </ul>
          </div>
        `;

        activitiesList.appendChild(activityCard);

        // Add option to select dropdown
        const option = document.createElement("option");
        option.value = name;
        option.textContent = name;
        activitySelect.appendChild(option);
      });
    } catch (error) {
      activitiesList.innerHTML = "<p>Falha ao carregar atividades. Por favor, tente novamente mais tarde.</p>";
      console.error("Erro ao buscar atividades:", error);
    }
  }

  // Handle form submission
  signupForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const activity = document.getElementById("activity").value;

    // Simulate signup with mock data
    if (mockActivities[activity]) {
      const activityData = mockActivities[activity];
      
      // Check if already enrolled
      if (activityData.participants.includes(email)) {
        messageDiv.textContent = "Você já está inscrito nesta atividade!";
        messageDiv.className = "error";
        messageDiv.classList.remove("hidden");
        setTimeout(() => {
          messageDiv.classList.add("hidden");
        }, 5000);
        return;
      }
      // Check if activity is full
      else if (activityData.participants.length >= activityData.max_participants) {
        messageDiv.textContent = "Esta atividade está lotada!";
        messageDiv.className = "error";
      }
      // Success - add participant
      else {
        activityData.participants.push(email);
        messageDiv.textContent = `Inscrição realizada com sucesso na atividade ${activity}!`;
        messageDiv.className = "success";
        signupForm.reset();
        // Refresh the display
        displayActivities();
      }
    } else {
      messageDiv.textContent = "Atividade não encontrada!";
      messageDiv.className = "error";
    }

    messageDiv.classList.remove("hidden");

    // Hide message after 5 seconds
    setTimeout(() => {
      messageDiv.classList.add("hidden");
    }, 5000);
  });

  // Initialize app
  displayActivities();
});
