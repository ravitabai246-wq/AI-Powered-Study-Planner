export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { subjects, days, hoursPerDay } = req.body;

  if (!subjects || !days || !hoursPerDay) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const subjectsList = subjects
    .map(s => `- ${s.name}: needs ${s.hours} hours, priority: ${s.priority}`)
    .join('\n');

  const systemPrompt = `You are an expert academic study planner. Your job is to create a clear, day-by-day study schedule for a student based on the subjects/topics they provide, their priorities, the hours needed for each, the number of days available, and the hours they can study per day.

Rules you must follow:
1. Prioritize "High" priority subjects earlier and give them more time.
2. Never schedule more total hours in a day than the student's stated hours-per-day limit.
3. Break large subjects into smaller study sessions of no more than 2 hours ideally, with short breaks mentioned.
4. If total hours needed exceeds total hours available, warn the student clearly and suggest which lower-priority subjects to trim.
5. Format the output as a clean day-by-day plan (Day 1, Day 2, etc.), listing subject, duration, and a one-line focus/tip for that session.
6. Keep tone encouraging and practical. Do not add unnecessary fluff or long paragraphs.`;

  const userPrompt = `Here are my subjects/topics:
${subjectsList}

I have ${days} day(s) until my deadline/exam, and I can study ${hoursPerDay} hour(s) per day.

Please generate my study plan.`;

  try {
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return res.status(500).json({ error: 'Server is missing API key configuration.' });
    }

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: `${systemPrompt}\n\n${userPrompt}` }]
            }
          ]
        })
      }
    );

    const data = await response.json();

    if (data.error) {
      return res.status(500).json({ error: data.error.message });
    }

    const plan = data.candidates[0].content.parts[0].text;
    return res.status(200).json({ plan });

  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
