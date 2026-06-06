# Product Requirements Document (PRD): FocusGuard / Pace

## 1. Goal Description & Problem Statement
Users who experience hyperfixations—often associated with ADHD or neurodivergence—frequently invest significant time, energy, and money into new interests, only to lose interest entirely a few weeks later. This pattern can be financially expensive and mentally exhausting. 

The goal of this application is to serve as an "external friction" system. It will help users identify early warning signs of hyperfixation, differentiate these from genuine long-term hobbies, and implement "cooling-off" periods to prevent impulsive spending and time loss.

## 2. Target Audience
- Individuals who struggle with impulse control or hyperfixation (e.g., ADHD, Autism).
- Users looking to budget their "fun money" more effectively and avoid abandoning expensive hobbies.
- Anyone wanting to be more mindful of where their free time is spent.

## 3. Core Features (MVP)

Based on psychological research into habit tracking, ADHD spending, and hyperfixation management, the following features are recommended:

### A. The "Cooling-Off" Wishlist (Spending Friction)
When the user feels an intense urge to buy supplies for a new interest, they log it in the app instead of buying it immediately.
- **24-48 Hour Lock:** The item is placed in a "cooling-off" state. The app visually locks the item and prevents approval until the time has passed.
- **True Cost Calculator:** The user inputs the item cost and their hourly wage. The app displays the cost in terms of "hours worked" to shift perspective.
- **Visual Anchor:** Users can upload a picture of a long-term financial goal (e.g., a vacation) that appears next to the wishlist to serve as a visual reminder of what they are sacrificing.

### B. Interest vs. Fixation Self-Assessment (Early Detector)
A quick, 5-question quiz users can take when starting a new activity to determine if it's a healthy hobby or a consuming hyperfixation. Questions are based on clinical early warning signs:
1. *Loss of Time:* "Have you lost track of time for more than 3 hours today doing this?"
2. *Basic Needs:* "Have you skipped meals, sleep, or bathroom breaks to continue?"
3. *Task Switching:* "Do you feel extreme distress or irritation when forced to stop?"
4. *Social Withdrawal:* "Have you ignored messages from friends/family to keep doing this?"
5. *Control:* "Does this feel like a choice, or do you feel compelled to do it?"
- **Result:** Based on the answers, the app categorizes the interest and suggests interventions (e.g., "High Risk of Hyperfixation - Set a 30-minute timer").

### C. Interest Lifespan Tracker & "Graveyard"
Users log their current active interests. 
- The app tracks the duration of engagement.
- If an interest is abandoned after a short period (e.g., 3 weeks), it is moved to the "Fixation Graveyard." 
- When the user wants to start a *new* interest, the app gently reminds them of the Graveyard (e.g., "Remember when you bought all those knitting supplies in March? Let's take it slow this time.")

### D. Reality Check Notifications (Mindfulness)
- Users can enable "Body Scan" push notifications while engaging in an interest.
- The app will send periodic reminders (e.g., every 60 minutes): *"Are you thirsty? Unclench your jaw. Do you need to stretch?"* to break the "tunnel vision" effect.

## 4. Technical Requirements & Architecture

Since the user requires deployment on **Web, iOS, and Android**, a cross-platform approach is highly recommended for a small app.

- **Frontend Framework:** React Native (with Expo) or Flutter. Expo is particularly strong for quickly deploying to all three platforms (iOS, Android, and Web) from a single codebase.
- **State Management:** Zustand or Redux Toolkit (React Native) or Provider/Riverpod (Flutter) to manage the wishlist and timers.
- **Storage:** Local storage (AsyncStorage / SecureStore) is sufficient for an MVP to ensure privacy and low server costs. If multi-device sync is needed later, Firebase or Supabase could be integrated.
- **Notifications:** Local push notifications for the "Reality Checks" and timer completions.

## 5. User Review Required / Open Questions
> [!IMPORTANT]
> **Monetization & Privacy:** Since this deals with potentially sensitive behavioral data, I recommend keeping all data local to the device for the MVP. Are you okay with users not being able to sync between devices initially to save on database costs and maximize privacy?

> [!QUESTION]
> **Naming:** Do you have a preferred name for the app? (e.g., *Pace*, *FocusGuard*, *HobbyCheck*)

> [!TIP]
> **Tech Stack:** I recommend using **Expo (React Native)** because it allows us to build the Web, iOS, and Android apps simultaneously with a single Javascript/Typescript codebase. Does this align with your preferences?

## 6. Next Steps
Once you review and approve these features, we can move on to designing the UI (perhaps generating some mockups) and setting up the Expo project!