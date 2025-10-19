import React, { useEffect } from 'react';
import { Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Carousel } from 'react-bootstrap';

// Main Styles
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

// Component Imports
import Navbar from "./components/Navbar";
import CaseList from "./components/CaseList";
import AddCase from "./components/AddCase";
import CaseDetails from "./components/CaseDetails";
import EditCase from "./components/EditCase";
import { fetchCases } from "./caseSlice";
// --- Header Component ---
function Header() {
  return (
    <header className="app-header">
      <h1>LegalEase</h1>
      <p>Manage cases efficiently</p>
    </header>
  );
}

// --- Footer Component ---
function Footer() {
  return (
    <footer className="app-footer">
      <p>&copy; {new Date().getFullYear()} LegalEase - All Rights Reserved.</p>
    </footer>
  );
}

// --- Carousel Component ---
function CarouselComponent() {
  const featuredCases = [
    {
      title: "Client Management",
      description: "Track all your client information in one place.",
      image: "https://cdn-icons-png.flaticon.com/512/639/639365.png"
    },
    {
      title: "Document Handling",
      description: "Upload, view, and manage all case-related documents securely.",
      image: "https://cdn-icons-png.flaticon.com/512/2991/2991148.png"
    },
    {
      title: "Case Tracking",
      description: "Monitor the progress and status of each case efficiently.",
      image: "https://cdn-icons-png.flaticon.com/512/2972/2972185.png"
    }
  ];

  return (
    <Carousel className="case-carousel">
      {featuredCases.map((feature, index) => (
        <Carousel.Item key={index}>
          <img
            className="d-block w-75 mx-auto carousel-img"
            src={feature.image}
            alt={feature.title}
          />
          <Carousel.Caption>
            <h3>{feature.title}</h3>
            <p>{feature.description}</p>
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
  );
}

// --- Home Page Component ---
function Home() {
  return (
    <div>
      <CarouselComponent />
      <div className="mt-5">
        <CaseList />
      </div>
    </div>
  );
}

// --- Main App Component ---
export default function App() {
  const dispatch = useDispatch();
  useEffect(() => { dispatch(fetchCases()); }, [dispatch]);

  return (
    <div className="app-container">
      <Header />
      <Navbar />
      <main className="content-wrap">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cases" element={<CaseList />} />
          <Route path="/add-case" element={<AddCase />} />
          <Route path="/case/:id" element={<CaseDetails />} />
          <Route path="/edit-case/:id" element={<EditCase />} />
         
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
