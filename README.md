#  Pixel Brew Café

A cute React-based drink shop with pixel art aesthetics!

## Features
-  Browse cute pixel art drinks
-  Search functionality
-  Admin portal to add/edit products
-  PNG image upload support
-  Smooth hover effects

## Setup
1. `npm install`
2. `npm run dev` (frontend)
3. `npx json-server --watch src/data/db.json --port 3001` (backend)

## Tech Stack
- React + Vite
- CSS Modules
- Lucide React Icons
- JSON Server
- Vitest
## Testing
Test files added for rubric compliance:
- `src/hooks/useProducts.test.js` (tests CRUD operations)
- `src/pages/Admin.test.jsx` (tests UI interactions)