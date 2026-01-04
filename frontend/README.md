# Frontend – Lost Item Finder

This folder contains the frontend of the Lost Item Finder application, built as a React single-page application.

The frontend focuses on clear user flows, protected navigation, and smooth interaction with the backend APIs.

---

## Frontend Responsibilities

- User authentication flows (login & signup)
- Displaying lost and found items
- Claim submission and claim status tracking
- Protected routing for authenticated users
- Map-based visualization of item locations
- User profile and dashboard views


---

## Component Design Approach

- **Page components** handle routing and data fetching
- **Reusable components** handle UI logic (item cards, claim buttons, image upload)
- **Layout components** ensure consistent structure across pages
- **Utility files** isolate authentication-related logic

This separation made the UI easier to scale as features were added.

---

## Authentication Handling

- Authentication state is managed using **React Context**
- JWT tokens are stored client-side and attached to API requests
- Protected routes prevent unauthorized access using a custom `PrivateRoute`
- Users are redirected to login when accessing restricted pages

This helped reinforce the difference between frontend routing protection and backend authorization.

---

## Routing Strategy

- React Router is used for navigation
- Routes are grouped by feature (lost items, found items, profile, claims)
- Layout-based routing ensures consistent UI across pages
- Authentication routes are separated from protected routes

---

## Map & Location Integration

- Item locations are visualized using map components
- Routes between landmarks and item locations are displayed
- Map logic is isolated to dedicated components for clarity

---

## UI Philosophy

- Simple, readable layouts
- Clear call-to-action buttons for claims
- Immediate feedback for user actions
- Focus on usability rather than heavy design frameworks

---

## Challenges Faced

- Managing authentication state across pages
- Protecting routes without duplicating logic
- Keeping components reusable as features increased
- Aligning frontend behavior with backend authorization rules

---

## Notes

The frontend prioritizes clarity, usability, and alignment with backend logic.  
Design decisions were made to keep the application understandable and easy to extend.


