import { useState } from 'react'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <header className="text-center mb-12">
            <h1 className="text-5xl font-bold text-gray-900 mb-4">
              Equipment Booking System
            </h1>
            <p className="text-xl text-gray-600 mb-2">
              Singapore Education Institutions
            </p>
            <p className="text-sm text-gray-500">
              Phase 1: Frontend + localStorage
            </p>
          </header>

          <div className="bg-white rounded-lg shadow-xl p-8 mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">
              🚀 Project Status
            </h2>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-green-600 mb-3">
                  ✅ Phase 1 (Current)
                </h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• React 18 + Vite</li>
                  <li>• React Router v6</li>
                  <li>• Tailwind CSS</li>
                  <li>• localStorage for state</li>
                </ul>
              </div>

              <div className="border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-blue-600 mb-3">
                  📅 Phase 2 (Planned)
                </h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Node.js/Express backend</li>
                  <li>• MongoDB/PostgreSQL</li>
                  <li>• JWT authentication</li>
                  <li>• RESTful API</li>
                </ul>
              </div>
            </div>

            <div className="text-center border-t border-gray-200 pt-6">
              <p className="text-gray-600 mb-4">
                Interactive Counter Demo:
              </p>
              <button
                onClick={() => setCount((count) => count + 1)}
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-8 rounded-lg transition duration-200 transform hover:scale-105 shadow-lg"
              >
                Count is {count}
              </button>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-xl p-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              📋 Coming Soon
            </h2>
            <div className="grid md:grid-cols-3 gap-4 text-center">
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="text-3xl mb-2">🔐</div>
                <p className="text-sm font-semibold text-gray-700">Authentication</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="text-3xl mb-2">📦</div>
                <p className="text-sm font-semibold text-gray-700">Equipment Catalog</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="text-3xl mb-2">📅</div>
                <p className="text-sm font-semibold text-gray-700">Booking System</p>
              </div>
            </div>
          </div>

          <footer className="text-center mt-8 text-gray-500 text-sm">
            <p>GitHub Pages deployment active ✨</p>
          </footer>
        </div>
      </div>
    </div>
  )
}

export default App
