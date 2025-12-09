import { useState } from 'react'

function App() {
  const [email, setEmail] = useState('')

  const handleSubmit = () => {
    if (email) {
      alert(`Thanks for subscribing with: ${email}`)
      setEmail('')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800">
      {/* Navbar */}
      <nav className="container mx-auto px-6 py-6 flex justify-between items-center">
        <div className="text-white text-2xl font-bold">YourBrand</div>
        <div className="hidden md:flex space-x-8 text-white">
          <a href="#features" className="hover:text-pink-300 transition">Features</a>
          <a href="#pricing" className="hover:text-pink-300 transition">Pricing</a>
          <a href="#about" className="hover:text-pink-300 transition">About</a>
        </div>
        <button className="bg-white text-purple-900 px-6 py-2 rounded-full font-semibold hover:bg-pink-300 transition">
          Sign Up
        </button>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-20 text-center">
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
          Build Something
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-300 to-yellow-300"> Amazing</span>
        </h1>
        <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
          Transform your ideas into reality with our powerful platform. Fast, secure, and built for modern creators.
        </p>
        
        {/* Email Subscribe */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-xl mx-auto mb-12">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="w-full sm:w-96 px-6 py-4 rounded-full text-gray-900 focus:outline-none focus:ring-4 focus:ring-pink-300"
          />
          <button
            onClick={handleSubmit}
            className="w-full sm:w-auto bg-gradient-to-r from-pink-500 to-yellow-500 text-white px-8 py-4 rounded-full font-bold hover:shadow-2xl hover:scale-105 transition transform"
          >
            Get Started
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20">
          <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-2xl p-8 hover:bg-opacity-20 transition">
            <div className="text-4xl font-bold text-white mb-2">10K+</div>
            <div className="text-gray-300">Active Users</div>
          </div>
          <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-2xl p-8 hover:bg-opacity-20 transition">
            <div className="text-4xl font-bold text-white mb-2">99.9%</div>
            <div className="text-gray-300">Uptime</div>
          </div>
          <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-2xl p-8 hover:bg-opacity-20 transition">
            <div className="text-4xl font-bold text-white mb-2">24/7</div>
            <div className="text-gray-300">Support</div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="container mx-auto px-6 py-20">
        <h2 className="text-4xl font-bold text-white text-center mb-16">
          Why Choose Us?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-2xl p-8 hover:scale-105 transition transform">
            <div className="text-5xl mb-4">⚡</div>
            <h3 className="text-2xl font-bold text-white mb-4">Lightning Fast</h3>
            <p className="text-gray-300">Experience blazing fast performance with our optimized infrastructure.</p>
          </div>
          <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-2xl p-8 hover:scale-105 transition transform">
            <div className="text-5xl mb-4">🔒</div>
            <h3 className="text-2xl font-bold text-white mb-4">Secure</h3>
            <p className="text-gray-300">Your data is protected with enterprise-grade security measures.</p>
          </div>
          <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-2xl p-8 hover:scale-105 transition transform">
            <div className="text-5xl mb-4">🎨</div>
            <h3 className="text-2xl font-bold text-white mb-4">Customizable</h3>
            <p className="text-gray-300">Tailor everything to match your brand and workflow perfectly.</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-6 py-20 text-center">
        <div className="bg-gradient-to-r from-pink-500 to-yellow-500 rounded-3xl p-12 md:p-20">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-white mb-8 opacity-90">
            Join thousands of satisfied users today
          </p>
          <button className="bg-white text-purple-900 px-10 py-4 rounded-full font-bold text-lg hover:scale-105 transition transform shadow-2xl">
            Start Free Trial
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="container mx-auto px-6 py-12 text-center text-gray-400 border-t border-gray-700">
        <p>&copy; 2024 YourBrand. All rights reserved.</p>
      </footer>
    </div>
  )
}

export default App