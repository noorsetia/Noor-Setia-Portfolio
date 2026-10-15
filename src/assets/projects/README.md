# Project Screenshots Guide

To replace the clean wireframe placeholders with your genuine project screenshots:

1. Add your screenshots to this folder (`src/assets/projects/`):
   - `nestora.png` (or `.jpg` / `.webp`)
   - `caresync.png` (or `.jpg` / `.webp`)
   - `worldvisual.png` (or `.jpg` / `.webp`)
   - `gym.png` (or `.jpg` / `.webp`)

2. In `src/data/projectsData.js`, import the screenshot or specify its path:
   ```javascript
   import nestoraImg from '../assets/projects/nestora.png';
   ...
   screenshotUrl: nestoraImg,
   ```

3. Recommended aspect ratio: **16:9** or **16:10** (e.g., 1280x720 or 1920x1080) for optimal clarity.
