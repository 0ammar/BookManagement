BookManagement System

BookManagement System built for the Junior .NET Core + Angular Developer task at MindTorches
Uses Onion Architecture DDD Repository Pattern EF Core and ADO.NET with Stored Procedures

Technologies

Backend: .NET 9 ASP.NET Core API EF Core ADO.NET SQL Server Swagger
Frontend: Angular Angular Material SCSS

Project Structure
src/
├── BookManagement.API
├── BookManagement.Application
├── BookManagement.Domain
├── BookManagement.Infrastructure
client/
db/

Setup

Backend
Clone repo and go to API folder
Update connection string in appsettings.json
Run database scripts Tables.sql and StoredProcedures.sql
Start API with dotnet run

Frontend
Go to client folder
Install dependencies npm install
Start app ng serve --host 0.0.0.0 --port 4200
Update API URL in environment.ts

Features

Manage Books Add Update Delete List Get by Id
Books can belong to multiple Categories
Manage Categories Add Update Delete List
Get all Books with Categories using Stored Procedure
Swagger API documentation
Angular frontend with Material components

Time and Challenges

Estimated 7 days actual 8 days
Limited daily time around 2 hours per day
Balancing backend architecture with functional frontend
Using AI to generate parts of the code while keeping it clean and maintainable

AI Tools

Used ChatGPT to generate and improve code for backend and frontend
Also used it for setup guidance and Angular UI suggestions
