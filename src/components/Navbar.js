import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav style={{ padding: 12, borderBottom: "1px solid #ddd" }}>
      <Link to="/" style={{ marginRight: 12 }}>Dashboard</Link>
      <Link to="/add-case" style={{ marginRight: 12 }}>Add Case</Link>
      <Link to="/cases" style={{ marginRight: 12 }}>All Cases</Link>

      <Link to="/clients">Clients</Link>
    </nav>
  );
}
