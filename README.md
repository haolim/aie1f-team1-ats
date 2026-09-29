# Applicant Tracker

Live app: [[https://<your-site>.netlify.app](https://bucolic-starlight-2f13fd.netlify.app/)]

A board for recruiters and hiring managers at a small company.
It shows every candidate by hiring stage. Users can add candidates,
schedule interviews, record notes, and reject or delete candidates.

## Board screenshot

<img width="1143" height="1297" alt="Image" src="https://github.com/user-attachments/assets/50ef3068-2736-4055-8119-686ce6679f8d" />

## App Demo Recording

https://github.com/user-attachments/assets/a88a79be-c0f3-48b2-92e4-fcba9297a81c

## Features

- Board with four columns: Pending Review, Interview, Shortlisted, Offer
- Add Candidate form with validation
- Candidate Detail with notes, interview scheduling, and reject
- Rejected page with delete

## Tech stack

Vite, React 19, React Router 7, fetch, MockAPI, Netlify, plain CSS, Yup (form validation on the Add Candidate form)

## Run locally

1. `git clone https://github.com/haolim/aie1f-team1-ats.git`
2. `cd aie1f-team1-ats`
3. `npm install`
4. Set up your own MockAPI project (the free plan is enough):
   1. Sign up at https://mockapi.io.
   2. Create a new project. Copy its API endpoint URL from the dashboard.
   3. Add a resource named exactly `candidates`.
   4. Remove the sample fields MockAPI suggests, such as `name` and `avatar`.
      Keep only `id`. Do not add other fields. MockAPI fills
      missing schema fields, and the app already sends
      every field it needs.
5. Copy `.env.example` to `.env.development`.
6. In `.env.development`, set `VITE_API_BASE_URL` to your endpoint URL, with no
   slash at the end. For example: `VITE_API_BASE_URL=https://your-id.mockapi.io`
7. `npm run dev`
8. Open the app and add candidates through the Add Candidate page.

## Team and work split

| Member    | Built                                                                                                                            | Requests written                                                                 |
| --------- | -------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- |
| Hao       | GitHub setup, CandidateCard, BoardPage, Board, Column, ScheduleForm, schedule and reject handlers on CandidateDetailPage, deploy | BoardPage: GET all, PUT status; CandidateDetailPage: PUT schedule, PUT reject    |
| Mike      | Spinner, ErrorMessage, RejectedPage, RejectedList                                                                                | RejectedPage: GET all, DELETE                                                    |
| Siew Hoon | RootLayout, Sidebar, CandidateDetailPage, CandidateDetail, AddCandidatePage, AddCandidateForm                                    | CandidateDetailPage: GET one, CandidateDetail: PUT notes; AddCandidateForm: POST |

Tasks were tracked on our GitHub Projects board: [[link](https://github.com/users/haolim/projects/1/views/1)]. Each card links to an issue assigned to its owner

## Bonus challenges completed

- Update an item: notes, interview scheduling, and status changes

## AI and tools

- Hao: Claude, used to create and refine project plan, README, Git workflow guide; generate and review code (including index.css); review pull requests and draft commit messages and PR descriptions; explain React concepts such as useReducer; debug MockAPI and Netlify issues; fix Git branch problems.
- Siew Hoon: Gemini for coding, Copilot within VS Code to troubleshoot and fix bugs.
- Mike: Copilot, used for coding, troubleshoot, and fix bugs

## Code adapted from other sources

- RootLayout adapted from NTU lesson 2.8
