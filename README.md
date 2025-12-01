# Hypertrophy Helper

An evidence-based hypertrophy training tool that provides personalized volume guidance based on your actual training. Get color-coded feedback on whether your weekly set volumes are optimal, too low, or too high for each muscle group.

**Live Demo**: [https://jasonchan8.github.io/ENGW-Assignment-4/](https://jasonchan8.github.io/ENGW-Assignment-4/)

## Features

- **Muscle Group Selector**: Choose from 9 muscle groups (chest, back, shoulders, biceps, triceps, quads, hamstrings, glutes, calves)
- **Experience Level Selection**: Beginner, Intermediate, or Advanced
- **Volume Input**: Enter your actual weekly sets per muscle group using sliders or number inputs
- **Color-Coded Guidance**: 
  - 🟢 **Green**: Optimal volume (within recommended range)
  - 🟡 **Yellow**: Slightly off target (close but outside range)
  - 🔴 **Red**: Needs adjustment (too low or too high)
- **Personalized Recommendations**: Get specific feedback on how to adjust your volume (e.g., "add 3 more sets" or "reduce by 2 sets")
- **Visual Chart**: Bar chart comparing your volumes across muscle groups
- **Evidence-Based Ranges**: Muscle-group-specific volume recommendations based on MAV (Maximum Adaptive Volume) research
- **Educational Tooltips**: Explains weekly volume concepts and why experience level matters

## Tech Stack

- React 18
- TypeScript
- Vite
- TailwindCSS

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Build for production:
```bash
npm run build
```

## Project Structure

```
src/
  components/
    Header.tsx          # App header component
    FormPanel.tsx       # Form with muscle groups, experience, and training days
    ResultsPanel.tsx    # Results table with volume recommendations
    InfoTooltip.tsx     # Tooltip component for educational content
  types.ts              # TypeScript type definitions
  utils.ts              # Utility functions for calculations
  App.tsx               # Main app component
  main.tsx              # Entry point
  index.css             # TailwindCSS imports
```

## Usage

1. Select one or more muscle groups you want to evaluate
2. Choose your experience level (Beginner, Intermediate, or Advanced)
3. Enter your actual weekly sets for each selected muscle group using the sliders or number inputs
4. View color-coded feedback and personalized recommendations for each muscle group
5. Adjust your volumes based on the guidance to optimize your training program

The app compares your actual training volumes against evidence-based optimal ranges for each muscle group and provides actionable feedback.

## Deployment to GitHub Pages

This project is configured to deploy automatically to GitHub Pages using GitHub Actions.

### Automatic Deployment

1. Push your code to the `main` or `master` branch
2. The GitHub Actions workflow will automatically build and deploy to GitHub Pages
3. Your site will be available at: `https://[username].github.io/ENGW-Assignment-4/`

### Manual Setup (if needed)

1. Go to your repository Settings → Pages
2. Under "Source", select "GitHub Actions"
3. The workflow will run automatically on push to main/master

### Local Development

For local development, the app runs at the root path. The base path `/ENGW-Assignment-4/` is only applied in production builds.

