import React, { useState, useEffect, useRef } from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Feed from "./pages/Feed";
import CreatePost from "./pages/CreatePost";
import EditPost from "./pages/EditPost";
import Profile from "./pages/Profile";
import EditProfile from "./pages/EditProfile";
import Search from "./pages/Search";
import ProtectedRoute from "./components/ProtectedRoute";
import { useAuth } from "./context/AuthContext";
import logo from "./assets/ConnectSphereLogo.png";

export default function App() {
  const { user, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [mobileUserMenuOpen, setMobileUserMenuOpen] = useState(false);
  const userMenuRef = useRef(null);
  const mobileUserMenuRef = useRef(null);
  const navigate = useNavigate();

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setUserMenuOpen(false);
      }
      if (
        mobileUserMenuRef.current &&
        !mobileUserMenuRef.current.contains(event.target)
      ) {
        setMobileUserMenuOpen(false);
      }
      // Close mobile menu when clicking outside
      if (mobileMenuOpen && !event.target.closest("nav")) {
        setMobileMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [mobileMenuOpen]);

  const handleLogout = () => {
    logout();
    navigate("/login");
    setUserMenuOpen(false);
    setMobileUserMenuOpen(false);
    setMobileMenuOpen(false);
  };

  const handleMobileLinkClick = () => {
    setMobileMenuOpen(false);
    setMobileUserMenuOpen(false);
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#E8F1F8" }}>
      {/* Navigation Bar */}
      <nav
        className="sticky top-0 z-50"
        style={{
          backgroundColor: "#ffffff",
          boxShadow: "0 2px 8px rgba(43, 58, 103, 0.15)",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link
              to="/"
              className="flex items-center space-x-3 hover:opacity-80 transition-opacity duration-200"
            >
              <img
                src={logo}
                alt="ConnectSphere logo"
                className="h-10 w-10 object-contain"
              />
              <span
                className="text-xl sm:text-2xl font-bold"
                style={{ color: "#2B3A67" }}
              >
                ConnectSphere
              </span>
            </Link>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center space-x-6">
              {user ? (
                <>
                  <Link
                    to="/"
                    className="font-medium transition-colors duration-200"
                    style={{ color: "#2B3A67" }}
                    onMouseEnter={(e) => (e.target.style.color = "#1F2B4D")}
                    onMouseLeave={(e) => (e.target.style.color = "#2B3A67")}
                  >
                    Feed
                  </Link>
                  <Link
                    to="/create"
                    className="font-medium transition-colors duration-200"
                    style={{ color: "#2B3A67" }}
                    onMouseEnter={(e) => (e.target.style.color = "#1F2B4D")}
                    onMouseLeave={(e) => (e.target.style.color = "#2B3A67")}
                  >
                    Create
                  </Link>
                  <Link
                    to="/search"
                    className="font-medium transition-colors duration-200"
                    style={{ color: "#2B3A67" }}
                    onMouseEnter={(e) => (e.target.style.color = "#1F2B4D")}
                    onMouseLeave={(e) => (e.target.style.color = "#2B3A67")}
                  >
                    Search
                  </Link>
                  <Link
                    to={`/profile/${user.id}`}
                    className="font-medium transition-colors duration-200"
                    style={{ color: "#2B3A67" }}
                    onMouseEnter={(e) => (e.target.style.color = "#1F2B4D")}
                    onMouseLeave={(e) => (e.target.style.color = "#2B3A67")}
                  >
                    Profile
                  </Link>

                  {/* User Avatar Dropdown */}
                  <div className="relative" ref={userMenuRef}>
                    <button
                      onClick={() => setUserMenuOpen(!userMenuOpen)}
                      className="flex items-center space-x-2 focus:outline-none"
                    >
                      <div
                        className="w-10 h-10 rounded-full flex items-center justify-center overflow-hidden"
                        style={{
                          backgroundColor: "#E8F1F8",
                          border: "2px solid #A7C7E7",
                        }}
                      >
                        {user.profilePic ? (
                          <img
                            src={user.profilePic}
                            alt={user.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <span
                            className="text-lg font-bold"
                            style={{ color: "#2B3A67" }}
                          >
                            {user.name?.charAt(0)?.toUpperCase() || "U"}
                          </span>
                        )}
                      </div>
                      <svg
                        className={`w-4 h-4 transition-transform duration-200 ${
                          userMenuOpen ? "transform rotate-180" : ""
                        }`}
                        style={{ color: "#2B3A67" }}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </button>

                    {/* Dropdown Menu */}
                    {userMenuOpen && (
                      <div
                        className="absolute right-0 mt-2 w-48 rounded-lg shadow-lg py-1"
                        style={{
                          backgroundColor: "#ffffff",
                          border: "1px solid #A7C7E7",
                          boxShadow: "0 4px 12px rgba(43, 58, 103, 0.2)",
                        }}
                      >
                        <div
                          className="px-4 py-3 border-b"
                          style={{ borderColor: "#A7C7E7" }}
                        >
                          <p
                            className="text-sm font-semibold"
                            style={{ color: "#2B3A67" }}
                          >
                            {user.name}
                          </p>
                          <p className="text-xs" style={{ color: "#2B3A67", opacity: 0.7 }}>
                            {user.email}
                          </p>
                        </div>
                        <Link
                          to={`/profile/${user.id}`}
                          onClick={() => setUserMenuOpen(false)}
                          className="block px-4 py-2 text-sm transition-colors duration-200"
                          style={{ color: "#2B3A67" }}
                          onMouseEnter={(e) =>
                            (e.target.style.backgroundColor = "#E8F1F8")
                          }
                          onMouseLeave={(e) =>
                            (e.target.style.backgroundColor = "transparent")
                          }
                        >
                          View Profile
                        </Link>
                        <Link
                          to={`/profile/${user.id}/edit`}
                          onClick={() => setUserMenuOpen(false)}
                          className="block px-4 py-2 text-sm transition-colors duration-200"
                          style={{ color: "#2B3A67" }}
                          onMouseEnter={(e) =>
                            (e.target.style.backgroundColor = "#E8F1F8")
                          }
                          onMouseLeave={(e) =>
                            (e.target.style.backgroundColor = "transparent")
                          }
                        >
                          Edit Profile
                        </Link>
                        <button
                          onClick={handleLogout}
                          className="block w-full text-left px-4 py-2 text-sm transition-colors duration-200"
                          style={{ color: "#d32f2f" }}
                          onMouseEnter={(e) =>
                            (e.target.style.backgroundColor = "#ffebee")
                          }
                          onMouseLeave={(e) =>
                            (e.target.style.backgroundColor = "transparent")
                          }
                        >
                          Logout
                        </button>
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="font-medium transition-colors duration-200"
                    style={{ color: "#2B3A67" }}
                    onMouseEnter={(e) => (e.target.style.color = "#1F2B4D")}
                    onMouseLeave={(e) => (e.target.style.color = "#2B3A67")}
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="px-4 py-2 text-white font-medium transition-colors duration-200"
                    style={{ backgroundColor: "#2B3A67", borderRadius: "8px" }}
                    onMouseEnter={(e) =>
                      (e.target.style.backgroundColor = "#1F2B4D")
                    }
                    onMouseLeave={(e) =>
                      (e.target.style.backgroundColor = "#2B3A67")
                    }
                  >
                    Register
                  </Link>
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center space-x-3">
              {user && (
                <div className="relative" ref={mobileUserMenuRef}>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setMobileUserMenuOpen(!mobileUserMenuOpen);
                      setMobileMenuOpen(false);
                    }}
                    className="focus:outline-none"
                    aria-label="User menu"
                  >
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center overflow-hidden cursor-pointer transition-transform duration-200 hover:scale-105"
                      style={{
                        backgroundColor: "#E8F1F8",
                        border: "2px solid #A7C7E7",
                      }}
                    >
                      {user.profilePic ? (
                        <img
                          src={user.profilePic}
                          alt={user.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span
                          className="text-lg font-bold"
                          style={{ color: "#2B3A67" }}
                        >
                          {user.name?.charAt(0)?.toUpperCase() || "U"}
                        </span>
                      )}
                    </div>
                  </button>

                  {/* Mobile Dropdown Menu */}
                  {mobileUserMenuOpen && (
                    <div
                      className="absolute right-0 mt-2 w-56 rounded-lg shadow-lg py-1 z-50"
                      style={{
                        backgroundColor: "#ffffff",
                        border: "1px solid #A7C7E7",
                        boxShadow: "0 4px 12px rgba(43, 58, 103, 0.2)",
                      }}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div
                        className="px-4 py-3 border-b"
                        style={{ borderColor: "#A7C7E7" }}
                      >
                        <p
                          className="text-sm font-semibold"
                          style={{ color: "#2B3A67" }}
                        >
                          {user.name}
                        </p>
                        <p className="text-xs" style={{ color: "#2B3A67", opacity: 0.7 }}>
                          {user.email}
                        </p>
                      </div>
                      <Link
                        to="/"
                        onClick={handleMobileLinkClick}
                        className="block px-4 py-2 text-sm transition-colors duration-200 cursor-pointer"
                        style={{ color: "#2B3A67" }}
                        onMouseEnter={(e) =>
                          (e.target.style.backgroundColor = "#E8F1F8")
                        }
                        onMouseLeave={(e) =>
                          (e.target.style.backgroundColor = "transparent")
                        }
                      >
                        Feed
                      </Link>
                      <Link
                        to="/create"
                        onClick={handleMobileLinkClick}
                        className="block px-4 py-2 text-sm transition-colors duration-200 cursor-pointer"
                        style={{ color: "#2B3A67" }}
                        onMouseEnter={(e) =>
                          (e.target.style.backgroundColor = "#E8F1F8")
                        }
                        onMouseLeave={(e) =>
                          (e.target.style.backgroundColor = "transparent")
                        }
                      >
                        Create
                      </Link>
                      <Link
                        to="/search"
                        onClick={handleMobileLinkClick}
                        className="block px-4 py-2 text-sm transition-colors duration-200 cursor-pointer"
                        style={{ color: "#2B3A67" }}
                        onMouseEnter={(e) =>
                          (e.target.style.backgroundColor = "#E8F1F8")
                        }
                        onMouseLeave={(e) =>
                          (e.target.style.backgroundColor = "transparent")
                        }
                      >
                        Search
                      </Link>
                      <Link
                        to={`/profile/${user.id}`}
                        onClick={handleMobileLinkClick}
                        className="block px-4 py-2 text-sm transition-colors duration-200 cursor-pointer"
                        style={{ color: "#2B3A67" }}
                        onMouseEnter={(e) =>
                          (e.target.style.backgroundColor = "#E8F1F8")
                        }
                        onMouseLeave={(e) =>
                          (e.target.style.backgroundColor = "transparent")
                        }
                      >
                        Profile
                      </Link>
                      <Link
                        to={`/profile/${user.id}/edit`}
                        onClick={handleMobileLinkClick}
                        className="block px-4 py-2 text-sm transition-colors duration-200 cursor-pointer"
                        style={{ color: "#2B3A67" }}
                        onMouseEnter={(e) =>
                          (e.target.style.backgroundColor = "#E8F1F8")
                        }
                        onMouseLeave={(e) =>
                          (e.target.style.backgroundColor = "transparent")
                        }
                      >
                        Edit Profile
                      </Link>
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          handleLogout();
                        }}
                        className="block w-full text-left px-4 py-2 text-sm transition-colors duration-200 cursor-pointer"
                        style={{ color: "#d32f2f" }}
                        onMouseEnter={(e) =>
                          (e.target.style.backgroundColor = "#ffebee")
                        }
                        onMouseLeave={(e) =>
                          (e.target.style.backgroundColor = "transparent")
                        }
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              )}

              {!user && (
                <>
                  <Link
                    to="/login"
                    className="px-3 py-2 text-sm font-medium transition-colors duration-200"
                    style={{ color: "#2B3A67" }}
                    onMouseEnter={(e) => (e.target.style.color = "#1F2B4D")}
                    onMouseLeave={(e) => (e.target.style.color = "#2B3A67")}
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="px-3 py-2 text-sm text-white font-medium transition-colors duration-200"
                    style={{ backgroundColor: "#2B3A67", borderRadius: "8px" }}
                    onMouseEnter={(e) =>
                      (e.target.style.backgroundColor = "#1F2B4D")
                    }
                    onMouseLeave={(e) =>
                      (e.target.style.backgroundColor = "#2B3A67")
                    }
                  >
                    Register
                  </Link>
                </>
              )}

              {/* Hamburger Menu Button */}
              {user && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setMobileMenuOpen(!mobileMenuOpen);
                    setMobileUserMenuOpen(false);
                  }}
                  className="p-2 focus:outline-none transition-colors duration-200"
                  style={{ color: "#2B3A67" }}
                  aria-label="Menu"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    {mobileMenuOpen ? (
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    ) : (
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 6h16M4 12h16M4 18h16"
                      />
                    )}
                  </svg>
                </button>
              )}
            </div>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && user && (
            <div
              className="md:hidden border-t py-2"
              style={{ borderColor: "#A7C7E7" }}
              onClick={(e) => e.stopPropagation()}
            >
              <Link
                to="/"
                onClick={handleMobileLinkClick}
                className="block px-4 py-3 font-medium transition-colors duration-200 cursor-pointer"
                style={{ color: "#2B3A67" }}
                onMouseEnter={(e) =>
                  (e.target.style.backgroundColor = "#E8F1F8")
                }
                onMouseLeave={(e) =>
                  (e.target.style.backgroundColor = "transparent")
                }
              >
                Feed
              </Link>
              <Link
                to="/create"
                onClick={handleMobileLinkClick}
                className="block px-4 py-3 font-medium transition-colors duration-200 cursor-pointer"
                style={{ color: "#2B3A67" }}
                onMouseEnter={(e) =>
                  (e.target.style.backgroundColor = "#E8F1F8")
                }
                onMouseLeave={(e) =>
                  (e.target.style.backgroundColor = "transparent")
                }
              >
                Create
              </Link>
              <Link
                to={`/profile/${user.id}`}
                onClick={handleMobileLinkClick}
                className="block px-4 py-3 font-medium transition-colors duration-200 cursor-pointer"
                style={{ color: "#2B3A67" }}
                onMouseEnter={(e) =>
                  (e.target.style.backgroundColor = "#E8F1F8")
                }
                onMouseLeave={(e) =>
                  (e.target.style.backgroundColor = "transparent")
                }
              >
                Profile
              </Link>
            </div>
          )}
        </div>
      </nav>

      {/* Main Content */}
      <main>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Feed />} />
          <Route
            path="/create"
            element={
              <ProtectedRoute>
                <CreatePost />
              </ProtectedRoute>
            }
          />
          <Route
            path="/edit/:id"
            element={
              <ProtectedRoute>
                <EditPost />
              </ProtectedRoute>
            }
          />
          <Route path="/profile/:id" element={<Profile />} />
          <Route
            path="/profile/:id/edit"
            element={
              <ProtectedRoute>
                <EditProfile />
              </ProtectedRoute>
            }
          />
          <Route path="/search" element={<Search />} />
        </Routes>
      </main>
    </div>
  );
}