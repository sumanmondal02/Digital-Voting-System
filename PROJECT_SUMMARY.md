# Digital Voting System — Project Summary

## 1. Introduction

The **Digital Voting System** is a web-based simulation of an Electronic Voting Machine (EVM) designed to demonstrate how modern digital voting systems can incorporate authentication, vote verification, and audit mechanisms.

The project was developed as an educational project to explore concepts related to:

* secure voting workflows
* REST API design
* database modeling
* authentication systems
* election transparency and auditing

The system includes both a **Spring Boot backend** and a **web-based frontend interface** that simulates the voting process.

---

# 2. System Overview

The project consists of two primary components:

### Backend

A **Java Spring Boot application** that provides:

* REST API endpoints for election and vote management
* database entities for storing election and vote information
* repository layer using Spring Data JPA
* an H2 database for storing election records

### Frontend

A **browser-based voting interface** built using:

* HTML
* CSS
* JavaScript

The frontend simulates a secure voting environment including authentication and voting logic.

---

# 3. Architecture

```
Frontend (HTML / CSS / JavaScript)
        │
        ▼
Spring Boot REST API
        │
        ▼
Controller Layer
        │
        ▼
Repository Layer
        │
        ▼
H2 Database
```

Although both frontend and backend components exist, the **current implementation does not fully integrate the frontend with the backend REST APIs**.

The frontend currently simulates the voting workflow locally within the browser.

---

# 4. Backend Components

The backend is implemented using **Spring Boot** and follows a layered architecture.

### Main Application

* `EvmApplication.java` starts the Spring Boot server.

### Controllers

The system includes REST API controllers:

* `ElectionController`
* `VoteController`

These controllers provide endpoints such as:

* retrieving elections
* creating elections
* submitting votes
* retrieving election results

### Database Models

Two main database entities are defined:

**Election**
Represents an election event including candidate and voter lists.

**Vote**
Represents an individual vote cast by a voter.

The Vote table includes a **unique constraint on voter ID and election ID** to prevent duplicate voting.

### Repository Layer

Spring Data JPA repositories provide database operations:

* `ElectionRepository`
* `VoteRepository`

These repositories handle:

* saving votes
* retrieving election data
* checking whether a voter has already voted.

---

# 5. Frontend Components

The frontend interface is located in:

```
src/main/resources/static
```

Files include:

* `index.html`
* `style.css`
* `app.js`

The frontend provides the user interface for:

* login authentication
* candidate selection
* vote confirmation
* admin dashboard
* audit log view

The frontend also implements logic for:

* vote recording
* candidate vote counts
* system activity logs
* vote verification display

---

# 6. Authentication Simulation

The project simulates a multi-factor authentication workflow.

The authentication steps include:

1. Username and password login
2. OTP generation
3. biometric verification

However, the **OTP and biometric verification are simulated in the frontend and do not interact with external authentication systems**.

---

# 7. Voting Workflow

The simulated voting process includes:

1. user authentication
2. candidate selection
3. vote confirmation
4. vote receipt generation

Votes are stored temporarily within the application runtime.

The system also generates a **VVPAT-style vote receipt** showing:

* selected candidate
* vote hash
* timestamp
* simulated signature

---

# 8. Audit and Monitoring Features

The system includes an administrative and audit interface.

Features include:

* vote tally dashboard
* voter turnout indicators
* activity log
* vote integrity checks

An audit log records system actions such as:

* login attempts
* vote submissions
* system activity

---

# 9. Current Limitations

The project is a **functional prototype and simulation**. Several limitations exist in the current implementation.

### Frontend and Backend Integration

Although REST APIs are implemented in the backend, the frontend currently **does not send requests to these APIs**.

Instead, the frontend simulates voting operations locally using JavaScript.

Future versions could connect the frontend to the backend APIs to create a fully integrated system.

---

### Temporary Data Storage

The frontend stores voting data **in memory during runtime**.

As a result:

* refreshing the browser resets the data
* restarting the application clears stored votes
* votes are not permanently stored in the backend database

This behavior is expected because the frontend simulation maintains vote records locally.

---

### Biometric Verification

The biometric verification step is **only a simulated interface interaction**.

No actual fingerprint scanner or biometric hardware is integrated into the system.

The biometric verification button simply simulates a successful verification event.

---

### OTP System

The OTP generation mechanism is implemented entirely on the frontend and is used only for demonstration purposes.

It does not interact with external messaging or authentication services.

---

# 10. Purpose of the Project

The main goal of this project is to demonstrate how software engineering concepts can be applied to voting systems.

The project explores:

* election system design
* authentication workflows
* audit logging
* vote verification concepts
* REST API design using Spring Boot
* database modeling with JPA

---

# 11. Possible Future Improvements

Future improvements could include:

* full frontend-backend API integration
* persistent database storage for votes
* real biometric authentication integration
* secure OTP delivery system
* blockchain-based vote verification
* secure identity verification
* distributed election infrastructure
* cloud deployment

---

# 12. Conclusion

The Digital Voting System project demonstrates a conceptual model of a secure electronic voting system.

While the current implementation focuses on simulation and demonstration, it highlights important architectural and security considerations involved in building modern digital election systems.

The project serves as a learning platform for understanding how authentication, auditability, and system transparency can be implemented in digital voting environments.
