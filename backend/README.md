# Backend – Lost Item Finder

This folder contains the backend implementation of the Lost Item Finder application.  
The backend is responsible for authentication, item management, claim verification, and enforcing access control.

The focus of this backend is correctness, security, and clear separation of responsibilities.

---

## Backend Responsibilities

- User authentication and authorization
- Managing lost and found item data
- Claim submission and approval workflow
- Secure image upload handling
- Enforcing ownership-based access rules
- Providing REST APIs consumed by the frontend

---


## Code Organization Philosophy

- **Routes** only define endpoints and middleware usage  
- **Controllers** contain business logic and ownership checks  
- **Models** define database structure and relationships  
- **Middlewares** handle authentication and request protection  
- **Validators** ensure invalid data never reaches controllers  

This structure helped keep the code manageable as features increased.

---

## Authentication & Authorization

- JWT-based authentication is used for user sessions
- Protected routes require a valid token
- Authorization rules ensure:
  - users cannot modify or delete others’ items
  - users cannot claim their own items
  - only item owners can accept or reject claims

This distinction between authentication and authorization was a key learning outcome.

---

## Item & Claim Logic

- Lost and Found items are stored as separate entities
- Claims require proof of ownership instead of direct access
- Item status updates automatically based on claim decisions
- Controllers validate ownership before allowing sensitive actions

The claim system was designed to reduce misuse and false claims.

---

## File Upload Handling

- Multer is used for handling multipart form data
- Images are processed on the backend before storage
- Uploaded files are not directly exposed without authorization

---

## Validation & Error Handling

- Request validation is handled before controller logic
- Invalid or incomplete data is rejected early
- Consistent error responses are sent to the client

This helped avoid unpredictable backend behavior.

---

## Key Challenges Faced

- Managing growing authentication logic
- Preventing unauthorized actions on items and claims
- Refactoring controllers as features expanded
- Balancing feature additions with maintainability

---

## Notes

This backend prioritizes clarity and correctness over premature optimization.  
Several potential features were intentionally excluded to keep the system stable and understandable.
