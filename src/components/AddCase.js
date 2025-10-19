import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addCase } from "../caseSlice";
import { useNavigate } from "react-router-dom";

export default function AddCase() {
  const [form, setForm] = useState({
    caseTitle: "",
    caseNumber: "",
    clientName: "",
    caseType: "",
    status: "Open",
    assignedLawyer: "",
    description: ""
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    const payload = {
      caseTitle: form.caseTitle,
      caseNumber: form.caseNumber,
      clientName: form.clientName,
      caseType: form.caseType,
      status: form.status,
      assignedLawyer: form.assignedLawyer,
      description: form.description
    };
    await dispatch(addCase(payload));
    navigate("/");
  };

  return (
    <div className="page-container">
      <h2>Add New Case</h2>
      <form onSubmit={submit} className="case-form">
        <input
          name="caseTitle"
          required
          placeholder="Case Title"
          value={form.caseTitle}
          onChange={handle}
        />
        <input
          name="caseNumber"
          required
          placeholder="Case Number (e.g., CIV-2025-001)"
          value={form.caseNumber}
          onChange={handle}
        />
        <input
          name="clientName"
          required
          placeholder="Client Name"
          value={form.clientName}
          onChange={handle}
        />
        <input
          name="caseType"
          placeholder="Case Type (Civil, Criminal, etc.)"
          value={form.caseType}
          onChange={handle}
        />
        <select
          name="status"
          value={form.status}
          onChange={handle}
        >
          <option value="Open">Open</option>
          <option value="Pending">Pending</option>
          <option value="Closed">Closed</option>
        </select>
        <input
          name="assignedLawyer"
          placeholder="Assigned Lawyer"
          value={form.assignedLawyer}
          onChange={handle}
        />
        <textarea
          name="description"
          placeholder="Case Description or Summary"
          value={form.description}
          onChange={handle}
        />
        <button type="submit" className="btn">Create Case</button>
      </form>
    </div>
  );
}
