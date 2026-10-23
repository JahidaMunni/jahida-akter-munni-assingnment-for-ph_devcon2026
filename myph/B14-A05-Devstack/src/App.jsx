import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [technologies, setTechnologies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stack, setStack] = useState([]);

  //Featch JSON data//
  useEffect(() => {
    fetch('/src/technologies.json')
      .then(res => res.json())
      .then(data => {
        setTechnologies(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error loading data:", err);
        setLoading(false);
      });
  }, []);

  // Add to Stack Handler//
  const handleAddToStack = (tech) => {
    const isAlreadyExists = stack.some(item => item.id === tech.id);
    if (isAlreadyExists) {
      toast.warn("This technology is already in your stack!");
      return;
    }
    setStack([...stack, tech]);
    toast.success("Successfully added to your stack!");
  };

  // Remove single item//
  const handleRemove = (id) => {
    setStack(stack.filter(item => item.id !== id));
    toast.info("Removed from stack.");
  };

  // Remove all items//
  const handleRemoveAll = () => {
    setStack([]);
    toast.error("All technologies removed from stack!");
  };

  return (
    <div className="min-h-screen bg-base-100 font-sans">
      <ToastContainer position="top-right" autoClose={2000} />

      {/* Navbar Section */}
      <div className="navbar bg-base-100 shadow-md sticky top-0 z-50 px-6">
        <div className="flex-1">
          <a className="text-xl font-bold bg-gradient-to-r from-orange-500 via-pink-500 to-violet-600 bg-clip-text text-transparent">
            Dev Stack
          </a>
        </div>
        <div className="flex-none hidden md:flex">
          <ul className="menu menu-horizontal px-1 font-medium">
            <li><a>Home</a></li>
            <li><a>Technologies</a></li>
            <li><a>Projects</a></li>
            <li><a>About</a></li>
            <li><a>Contact</a></li>
          </ul>
        </div>
        <div className="flex-none gap-2">
          <button className="btn btn-ghost btn-sm">Sign In</button>
          <button className="btn bg-gradient-to-r from-orange-500 via-pink-500 to-violet-600 text-white btn-sm border-none">
            Sign Up
          </button>
        </div>
      </div>

      {/* Hero / Banner Section */}
      <div className="hero bg-base-200 py-16 px-6">
        <div className="hero-content text-center">
          <div className="max-w-2xl">
            <h1 className="text-4xl font-bold mb-4">
              Build Your Next <span className="bg-gradient-to-r from-orange-500 via-pink-500 to-violet-600 bg-clip-text text-transparent">Dev Stack</span>
            </h1>
            <p className="py-4 text-gray-600">
              Explore powerful modern technologies, frameworks, and developer tools to supercharge your web development journey.
            </p>
            <div className="flex justify-center gap-4">
              <button className="btn bg-gradient-to-r from-orange-500 via-pink-500 to-violet-600 text-white border-none">
                Explore Technologies
              </button>
              <button className="btn btn-outline">Learn More</button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="container mx-auto p-6 grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        {/* Technologies Grid (3 Columns) */}
        <div className="lg:col-span-3">
          <h2 className="text-2xl font-bold mb-6">Available Technologies</h2>
          
          {loading ? (
            <div className="text-center py-12">
              <span className="loading loading-spinner loading-lg text-primary"></span>
              <p className="mt-2 text-gray-500">Loading technologies...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {technologies.map(tech => (
                <div key={tech.id} className="card bg-base-100 shadow-xl border border-base-200">
                  <figure className="px-4 pt-4">
                    <img src={tech.icon} alt={tech.name} className="w-16 h-16 object-contain" />
                  </figure>
                  <div className="card-body">
                    <div className="flex justify-between items-center">
                      <span className="badge badge-outline">{tech.badge}</span>
                      <span className="text-sm text-gray-500">⭐ {tech.rating}</span>
                    </div>
                    <h2 className="card-title mt-2">{tech.name}</h2>
                    <p className="text-sm text-gray-600">{tech.description}</p>
                    <div className="flex justify-between items-center mt-2">
                      <span className="badge badge-primary badge-sm">{tech.category}</span>
                      <span className="text-xs font-semibold text-gray-500">{tech.difficulty}</span>
                    </div>
                    <div className="card-actions justify-end mt-4">
                      <button 
                        onClick={() => handleAddToStack(tech)}
                        className="btn btn-sm bg-gradient-to-r from-orange-500 to-violet-600 text-white w-full border-none"
                      >
                        Add to Stack
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Your Stack Sidebar */}
        <div className="lg:col-span-1 bg-base-200 p-4 rounded-xl h-fit sticky top-24">
          <h2 className="text-xl font-bold mb-2">Your Stack</h2>
          <p className="text-sm text-gray-600 mb-4">{stack.length} Technology Selected</p>

          {stack.length === 0 ? (
            <p className="text-sm text-gray-400 text-center py-8">Your stack is empty.</p>
          ) : (
            <div className="space-y-3">
              {stack.map(item => (
                <div key={item.id} className="flex items-center justify-between bg-base-100 p-2 rounded-lg shadow-sm">
                  <div className="flex items-center gap-2">
                    <img src={item.icon} alt={item.name} className="w-8 h-8 object-contain" />
                    <div>
                      <h4 className="text-sm font-bold">{item.name}</h4>
                      <span className="text-xs text-gray-500">{item.category}</span>
                    </div>
                  </div>
                  <button 
                    onClick={() => handleRemove(item.id)}
                    className="btn btn-ghost btn-xs text-red-500 font-bold"
                  >
                    ✕
                  </button>
                </div>
              ))}

              <button 
                onClick={handleRemoveAll}
                className="btn btn-error btn-sm w-full mt-4 text-white"
              >
                Remove All
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

export default App;