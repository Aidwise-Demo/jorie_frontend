import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/login.css";
import Bulb from "../assets/Bulb.png";
import site from "../../src/utils/API";

function Login() {
    const [isSignup, setIsSignup] = useState(false);    
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [displayName, setDisplayName] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    // Separate handler for login
    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");
    
        try {
            // Form data for login - strictly email and password only
            const loginData = {
                email: email,
                password: password
            };
            
            const response = await site.post("api/login", loginData);
            
            // Store tokens from response
            localStorage.setItem("token", response.data.id_token);
            localStorage.setItem("refreshToken", response.data.refresh_token);
            localStorage.setItem("userEmail", email);
            localStorage.setItem("expiresIn", response.data.expires_in);
            
            // Navigate to home on successful login
            navigate("/");
        } catch (error) {
            console.error("Login error:", error);
            setError(error.response?.data?.message || "Login failed");
            alert(error.response?.data?.message || "Login failed");
        }
    };

    // Separate handler for registration
    const handleRegister = async (e) => {
        e.preventDefault();
        setError("");
    
        try {
            // Form data for registration - including display_name
            const UserRegister = {
                email: email,
                password: password,
                display_name: displayName
            };
            
            const response = await site.post("api/register", UserRegister);
            console.log("Registration response:", response);
            
            // Show success message
            alert(response.data.message);
            // Switch to login mode after successful registration
            setIsSignup(false);
        } catch (error) {
            console.error("Registration error:", error);
            setError(error.response?.data?.message || "Registration failed");
            alert(error.response?.data?.detail || "Registration failed");
        }
    };

    // Choose the appropriate handler based on mode
    const handleSubmit = (e) => {
        if (isSignup) {
            handleRegister(e);
        } else {
            handleLogin(e);
        }
    };
    
    return (
        <div className="login-container">
            <div className="login-content">
                <div className="login-info">
                    <div className="login-info-content">
                        <h1 style={{ textAlign: "center", lineHeight: 1.25 }}>
                            Welcome to Jorie's <br /> AI Healthcare Platform
                        </h1>
                        <img src={Bulb} alt="Descriptive Image" width="400" height="400" />
                        <p style={{ textAlign: "center" }}>
                            Your Partner in <br />
                            <strong>Ensuring Uninterrupted Healthcare Operations</strong>
                        </p>

                        <ul className="feature-list">
                            <li><i className="fas fa-chart-line"></i> Advanced analytics for healthcare operations</li>
                            <li><i className="fas fa-user-md"></i> Comprehensive patient management</li>
                            <li><i className="fas fa-hospital"></i> Streamlined clinical workflows</li>
                            <li><i className="fas fa-shield-alt"></i> Secure and compliant platform</li>
                        </ul>
                    </div>
                </div>

                <div className="login-form-container">
                    <div className="login-card">
                        <div className="login-header">
                            <div className="logo-container">
                                <img 
                                    src="https://app.trickle.so/storage/public/images/usr_0c129b7d60008001/0dd06bf3-7b58-4e62-b8f0-4b1c42d45fd9.png" 
                                    alt="Jorie Logo"
                                />
                            </div>
                            <h2 className="text-2xl font-bold mb-2 text-center">
                                {isSignup ? "Create an account" : "Sign in to your account"}
                            </h2>
                            <p className="text-gray-600 text-sm text-center mb-8">
                                {isSignup ? "Create your credentials to get started" : "Enter your credentials to access the platform"}
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="login-form">
                            <div className="mb-4">
                                <input
                                    type="email"
                                    placeholder="Email address"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    autoComplete="off"
                                />
                            </div>
                            
                            {isSignup && (
                                <div className="mb-4">
                                    <input
                                        type="text"
                                        placeholder="Display Name"
                                        value={displayName}
                                        onChange={(e) => setDisplayName(e.target.value)}
                                        required
                                        autoComplete="off"
                                    />
                                </div>
                            )}
                            
                            <div className="mb-6">
                                <input
                                    type="password"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    autoComplete="off"
                                />
                            </div>

                            {error && <div className="error-message">{error}</div>}

                            <button type="submit" className="auth-button login-button">
                                {isSignup ? "Sign Up" : "Sign In"}
                            </button>

                            <button 
                                type="button" 
                                className="auth-button signup-button" 
                                onClick={() => {
                                    setIsSignup(!isSignup);
                                    setError(""); // Clear any existing errors when switching modes
                                }}
                            >
                                {isSignup ? "Already have an account? Sign In" : "Need an account? Sign Up"}
                            </button>

                            <div className="divider">
                                <span>Or continue with</span>
                            </div>

                            <button type="button" className="auth-button google-button" 
                                onClick={() =>
                                    alert("Google signIn is yet to be developed")
                                }>
                                <img 
                                    src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" 
                                    alt="Google"
                                    className="w-5 h-5"
                                />
                                Sign in with Google
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;