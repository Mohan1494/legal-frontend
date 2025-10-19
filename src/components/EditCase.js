import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCaseById, updateCase, clearSelected } from "../caseSlice";
import { useParams, useNavigate } from "react-router-dom";

export default function EditCase() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const nav = useNavigate();
  const stored = useSelector((s) => s.cases.selected);

  const [form, setForm] = useState({
    caseTitle: "",
    caseNumber: "",
    clientName: "",
    caseType: "",
    status: "Open",
    assignedLawyer: "",
    description: ""
  });

  useEffect(() => {
    dispatch(fetchCaseById(id));
    return () => dispatch(clearSelected());
  }, [dispatch, id]);

  useEffect(() => {
    if (stored) {
      setForm({
        caseTitle: stored.caseTitle || "",
        caseNumber: stored.caseNumber || "",
        clientName: stored.clientName || "",
        caseType: stored.caseType || "",
        status: stored.status || "Open",
        assignedLawyer: stored.assignedLawyer || "",
        description: stored.description || ""
      });
    }
  }, [stored]);

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
    await dispatch(updateCase({ id, updated: payload }));
    nav("/");
  };

  return (
    <div style={{ padding: 16 }}>
      <h2>Edit Case</h2>
      <form onSubmit={submit} style={{ maxWidth: 700 }}>
        <div>
          <input
            name="caseTitle"
            required
            placeholder="Case Title"
            value={form.caseTitle}
            onChange={handle}
          />
        </div>
        <div>
          <input
            name="caseNumber"
            required
            placeholder="Case Number"
            value={form.caseNumber}
            onChange={handle}
          />
        </div>
        <div>
          <input
            name="clientName"
            required
            placeholder="Client Name"
            value={form.clientName}
            onChange={handle}
          />
        </div>
        <div>
          <input
            name="caseType"
            placeholder="Case Type"
            value={form.caseType}
            onChange={handle}
          />
        </div>
        <div>
          <select name="status" value={form.status} onChange={handle}>
            <option value="Open">Open</option>
            <option value="Pending">Pending</option>
            <option value="Closed">Closed</option>
          </select>
        </div>
        <div>
          <input
            name="assignedLawyer"
            placeholder="Assigned Lawyer"
            value={form.assignedLawyer}
            onChange={handle}
          />
        </div>
        <div>
          <textarea
            name="description"
            placeholder="Case Description"
            value={form.description}
            onChange={handle}
          />
        </div>
        <button type="submit">Update Case</button>
      </form>
    </div>
  );
}
