import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Button from "../components/common/Button";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import "../styles/home.css";

const HomePage = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentFeature, setCurrentFeature] = useState(0);

  const features = [
    {
      icon: "💰",
      title: "Track Expenses",
      description: "Monitor your daily expenses with ease"
    },
    {
      icon: "📊",
      title: "Visual Analytics",
      description: "Get insights with beautiful charts and graphs"
    },
    {
      icon: "🎯",
      title: "Budget Goals",
      description: "Set and achieve your financial targets"
    },
    {
      icon: "📱",
      title: "Mobile Friendly",
      description: "Access your data anywhere, anytime"
    }
  ];

  const stats = [
    { number: "10K+", label: "Active Users" },
    { number: "₹50L+", label: "Money Tracked" },
    { number: "24/7", label: "Support" }
  ];

  useEffect(() => {
    setIsVisible(true);
    
    const interval = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % features.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Navbar />
      
      {/* Hero Section */}
      <div className={`home-container ${isVisible ? 'fade-in' : ''}`}>
        <div className="hero-section">
          <div className="hero-content">
            <h1 className="home-title">
              Welcome to <span className="gradient-text">Expense Tracker</span>
            </h1>
            <p className="home-subtitle">
              Track your expenses easily and stay on top of your budget with our 
              <span className="highlight"> smart financial tools</span>.
            </p>

            <div className="home-buttons">
              <Link to="/login" className="btn-link">
                <Button text="Get Started" primary />
              </Link>
              <Link to="/signup" className="btn-link">
                <Button text="Sign Up Free" />
              </Link>
            </div>

            <div className="trust-indicators">
              <span className="trust-text">Trusted by 10,000+ users worldwide</span>
              <div className="trust-stars">⭐⭐⭐⭐⭐</div>
            </div>
          </div>

          <div className="hero-visual">
            <div className="floating-card">
              <div className="card-header">
                <span className="card-title">Monthly Budget</span>
                <span className="card-amount">₹25,000</span>
              </div>
              <div className="progress-bar">
                <div className="progress-fill"></div>
              </div>
              <span className="progress-text">68% used this month</span>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="features-section">
          <h2 className="section-title">Why Choose Our Expense Tracker?</h2>
          
          <div className="features-grid">
            {features.map((feature, index) => (
              <div 
                key={index}
                className={`feature-card ${index === currentFeature ? 'active' : ''}`}
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="feature-icon">{feature.icon}</div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <div className="stats-section">
          <div className="stats-grid">
            {stats.map((stat, index) => (
              <div key={index} className="stat-item">
                <div className="stat-number">{stat.number}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="cta-section">
          <h2 className="cta-title">Ready to Take Control of Your Finances?</h2>
          <p className="cta-subtitle">Join thousands of users who are already saving money</p>
          <Link to="/signup" className="cta-button">
            <Button text="Start Your Journey Today" primary />
          </Link>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default HomePage;