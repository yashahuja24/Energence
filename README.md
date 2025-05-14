# 🍀 Energence

Energence is a renewable energy optimization platform that predicts and optimizes solar and wind power generation using machine learning models.

## 🔍 Overview

Energence is a full-stack application that helps optimize renewable energy production by:

- Predicting solar and wind power generation based on weather conditions
- Optimizing parameters to maximize energy output
- Balancing energy consumption with generation
- Providing a user-friendly interface to monitor and manage renewable energy systems

## 🏗️ Project Structure

The project consists of two main components:

### 🔧 Backend (Django + Machine Learning)

- Solar energy prediction and optimization
- Wind energy prediction and optimization
- RESTful API endpoints for frontend integration
- ML models for energy production forecasting


### 🌐 Frontend (React + Vite)

- Modern React application with Tailwind CSS
- Interactive dashboards for energy monitoring
- User-friendly controls for optimization settings
- Responsive design for desktop and mobile access

## 💻 Technologies Used

### Backend
- Django (Python web framework)
- TensorFlow/Keras (Machine learning)
- Multi Layer Perceptron Model
- REST framework for API endpoints
- SQLite database

### Frontend
- React 19
- Vite (Build tool)
- Tailwind CSS (Styling)
- Framer Motion (Animations)
- React Router (Navigation)

## 🚀 Installation

### Backend Setup

1. Navigate to the backend directory:
   ```
   cd backend
   ```

2. Create and activate a virtual environment:
   ```
   python -m venv env
   source env/bin/activate  # On Windows, use: env\Scripts\activate
   ```

3. Install dependencies:
   ```
   pip install -r requirements.txt
   ```

4. Run migrations:
   ```
   python manage.py migrate
   ```

5. Start the development server:
   ```
   python manage.py runserver
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```
   cd frontend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the development server:
   ```
   npm run dev
   ```

4. Open your browser and visit:
   ```
   http://localhost:5173
   ```

## 📊 Usage

1. Upload or input weather data for your location
2. View energy generation predictions
3. Run optimization to maximize energy output
4. Monitor performance through interactive dashboards

## 🔌 API Endpoints

- `/solar/predict` - Predict solar power generation
- `/solar/optimize` - Optimize solar power parameters
- `/wind/predict` - Predict wind power generation
- `/wind/optimize` - Optimize wind power parameters

## 🤝 Contributing

To contribute to Energence:

1. Please fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request with detailed description of changes

We appreciate all contributions to enhance Energence!

## 📄 License

This project is licensed under the MIT License - see the LICENSE.md file for details.

## ©️ Copyright

Copyright © 2023 Energence. All Rights Reserved.

**IMPORTANT NOTICE:** This software and associated documentation files (the "Software") are protected by copyright law. Unauthorized copying, modification, distribution, or use of this Software, in whole or in part, for any purpose without express written permission from the copyright holder is strictly prohibited.

