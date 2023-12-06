# Project - Team Sync

## Overview

Team Sync is a web application designed to facilitate team creation and management. It provides a visually appealing interface to display users in a card format, supports pagination, and enables dynamic searching and filtering. The application is responsive and ensures a seamless user experience across different devices.

## Features

### User Display

- Users are displayed in a visually appealing card format.
- Pagination is implemented to display 20 users per page.
- Dynamic search functionality allows users to search for individuals by their names.
- Three filters (Domain, Gender, and Availability) are available for users to refine the displayed list.

### Team Creation

- Users can create teams by selecting members from the list.
- Only users with unique domains and availability are selectable for the team.

### Team Details

- Once a team is created, the application displays the details of the selected team, including user information.

### Responsive Design

- The application is designed to be responsive and displays optimally on various screen sizes.

## Tech Stack

### Frontend

- React.js for UI components.
- Tailwind CSS and DaisyUI for designing.

### Backend

- Node.js and Express.js for the server.
- MongoDB for the database.

## API Endpoints

### User Operations

- `GET /api/users`: Retrieve all users with pagination support.
- `GET /api/users/:id`: Retrieve a specific user by ID.
- `POST /api/users`: Create a new user.
- `PUT /api/users/:id`: Update an existing user.
- `DELETE /api/users/:id`: Delete a user.

### Team Operations

- `POST /api/team`: Create a new team by selecting users with unique domains and availability.
- `GET /api/team/:id`: Retrieve the details of a specific team by ID.

## Live Demo

Visit the live demo of Team Sync: [Team Sync Live Demo](https://teamsync-34ae9.web.app/)
