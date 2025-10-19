import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteCase } from "../caseSlice";
import { Link } from "react-router-dom";

export default function CaseList() {
  const list = useSelector((state) => state.cases.list || []);
  const dispatch = useDispatch();

  return (
    <div style={{ padding: 16 }}>
      <h2>All Legal Cases</h2>
      {list.length === 0 && <p>No cases added yet.</p>}

      <ul style={{ listStyle: "none", padding: 0 }}>
        {list.map((c) => (
          <li
            key={c._id}
            style={{
              marginBottom: 12,
              border: "1px solid #eee",
              padding: 10,
              borderRadius: 6,
            }}
          >
            <strong>{c.title}</strong>
            <div style={{ fontSize: 14, color: "#555" }}>
              Client: {c.clientName || "-"} | Type: {c.caseType || "-"} | Hearing:{" "}
              {c.hearingDate || "-"}
            </div>

            <div style={{ marginTop: 8 }}>
              <Link to={`/case/${c._id}`} style={{ marginRight: 8 }}>
                View
              </Link>
              <Link to={`/edit-case/${c._id}`} style={{ marginRight: 8 }}>
                Edit
              </Link>
              <button
                onClick={() => {
                  if (window.confirm("Are you sure you want to delete this case?"))
                    dispatch(deleteCase(c._id));
                }}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
