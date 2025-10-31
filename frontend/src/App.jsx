import { BrowserRouter as Router } from 'react-router-dom'

function App() {
  return (
    <Router basename="/equipment-booking-sg">
      <div className="min-h-screen bg-gray-100">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
            Equipment Booking System
          </h1>
          <div className="bg-white rounded-lg shadow-md p-6">
            <p className="text-gray-600 text-center">
              Welcome to the Equipment Booking System for Singapore Education Institutions
            </p>
            <p className="text-gray-500 text-center mt-4">
              This is a placeholder page. The full application will be built in Phase 1.
            </p>
          </div>
        </div>
      </div>
    </Router>
  )
}

export default App
