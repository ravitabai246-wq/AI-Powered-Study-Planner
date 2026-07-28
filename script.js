let subjects = [];

const subjectForm = document.getElementById('subjectForm');
const subjectList = document.getElementById('subjectList');
const emptyMsg = document.getElementById('emptyMsg');
const generateBtn = document.getElementById('generateBtn');
const loadingMsg = document.getElementById('loadingMsg');
const planSection = document.getElementById('planSection');
const planOutput = document.getElementById('planOutput');

subjectForm.addEventListener('submit', function (e) {
  e.preventDefault();

  const name = document.getElementById('subjectName').value.trim();
  const hours = document.getElementById('subjectHours').value;
  const priority = document.getElementById('subjectPriority').value;

  if (!name || !hours || !priority) return;

  subjects.push({ name, hours, priority });
  renderSubjects();
  subjectForm.reset();
});

function renderSubjects() {
  subjectList.innerHTML = '';

  if (subjects.length === 0) {
    emptyMsg.style.display = 'block';
    return;
  }
  emptyMsg.style.display = 'none';

  subjects.forEach((subj, index) => {
    const li = document.createElement('li');
    li.className = `priority-${subj.priority}`;
    li.innerHTML = `
      <span><strong>${subj.name}</strong> — ${subj.hours}h — ${subj.priority} priority</span>
      <button class="remove-btn" onclick="removeSubject(${index})">✕</button>
    `;
    subjectList.appendChild(li);
  });
}

function removeSubject(index) {
  subjects.splice(index, 1);
  renderSubjects();
}

generateBtn.addEventListener('click', async function () {
  const days = document.getElementById('daysAvailable').value;
  const hoursPerDay = document.getElementById('hoursPerDay').value;

  if (subjects.length === 0) {
    alert('Please add at least one subject first.');
    return;
  }
  if (!days || !hoursPerDay) {
    alert('Please enter how many days and hours per day you can study.');
    return;
  }

  loadingMsg.classList.remove('hidden');
  planSection.style.display = 'none';

  try {
    const response = await fetch('/api/plan', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ subjects, days, hoursPerDay })
    });

    const data = await response.json();

    if (data.plan) {
      planOutput.textContent = data.plan;
      planSection.style.display = 'block';
    } else {
      planOutput.textContent = 'Something went wrong: ' + (data.error || 'Unknown error');
      planSection.style.display = 'block';
    }
  } catch (err) {
    planOutput.textContent = 'Error connecting to AI service: ' + err.message;
    planSection.style.display = 'block';
  } finally {
    loadingMsg.classList.add('hidden');
  }
});
