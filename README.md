# StudyMate — AI-Powered Study Planner

## a. What it does & the problem it solves
StudyMate helps students who struggle to organize their study time before exams or deadlines. Instead of guessing how to divide time between subjects, a student lists their subjects/topics, how many hours each needs, and their priority level. The app then uses AI to generate a realistic, day-by-day study schedule tailored to the number of days left and the hours available per day.

**Who it's for:** Students preparing for exams, assignments, or any multi-subject deadline who need help planning their time effectively.

## b. Live Demo
**https://ai-powered-study-planner-beta.vercel.app**

## c. Features
- Add subjects/topics with hours needed and priority (High/Medium/Low)
- View and remove subjects from your list
- Set number of days available and hours you can study per day
- Generate a full AI-powered, day-by-day study plan
- Plan accounts for priority order and warns if your workload exceeds available time

## d. The AI Feature
The AI feature generates the actual study schedule. It's powered by Google's Gemini API, called through a server-side function so the API key stays secret.

**System prompt used:**

You are an expert academic study planner. Your job is to create a clear, day-by-day study schedule for a student based on the subjects/topics they provide, their priorities, the hours needed for each, the number of days available, and the hours they can study per day.

Rules you must follow:
1. Prioritize High priority subjects earlier and give them more time.
2. Never schedule more total hours in a day than the student's stated hours-per-day limit.
3. Break large subjects into smaller study sessions of no more than 2 hours ideally, with short breaks mentioned.
4. If total hours needed exceeds total hours available, warn the student clearly and suggest which lower-priority subjects to trim.
5. Format the output as a clean day-by-day plan (Day 1, Day 2, etc.), listing subject, duration, and a one-line focus/tip for that session.
6. Keep tone encouraging and practical. Do not add unnecessary fluff or long paragraphs.

## e. Tools, Services & Models Used
- Frontend: HTML, CSS, JavaScript (vanilla)
- Backend: Vercel Serverless Functions (Node.js)
- AI Model: Google Gemini (gemini-flash-latest)
- Hosting/Deployment: Vercel
- Version Control: Git & GitHub

## f. Screenshots

![Home page](Screenshot%20(62).png)
![Adding subjects](Screenshot%20(63).png)
![Generated study plan](Screenshot%20(64).png)

## g. How to Run This Project Locally

1. Clone the repository:
git clone https://github.com/ravitabai246-wq/AI-Powered-Study-Planner.git
cd AI-Powered-Study-Planner

2. Install Vercel CLI:
npm install -g vercel

3. Create a .env file in the root folder with your Gemini API key:
GEMINI_API_KEY=your_gemini_api_key_here

4. Run the project locally:
vercel dev

5. Open the URL shown in the terminal (usually http://localhost:3000)

## Deployment Instructions (for reference)
1. Push this repo to GitHub (public).
2. Go to vercel.com, sign in with GitHub.
3. Import this repository.
4. In Vercel project settings, Environment Variables, add GEMINI_API_KEY with your Gemini key.
5. Deploy. Vercel will give you a live public URL.
