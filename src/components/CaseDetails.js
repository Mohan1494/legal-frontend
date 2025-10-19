import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCaseById, clearSelected } from "../caseSlice";
import { useParams, Link } from "react-router-dom";

export default function CaseDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const caseData = useSelector((state) => state.cases.selected);

  useEffect(() => {
    dispatch(fetchCaseById(id));
    return () => dispatch(clearSelected());
  }, [dispatch, id]);

  if (!caseData) return <div style={{ padding: 16 }}>Loading...</div>;

  return (
    <div style={{ padding: 16 }}>
      <h2>{caseData.title}</h2>
      <p><strong>Client:</strong> {caseData.clientName || "-"}</p>
      <p><strong>Case Type:</strong> {caseData.caseType || "-"}</p>
      <p><strong>Hearing Date:</strong> {caseData.hearingDate || "-"}</p>

      <h4>Documents</h4>
      <ul>
        {caseData.documents && caseData.documents.length > 0 ? (
          caseData.documents.map((doc, i) => (
            <li key={i}>
              <a href={doc.url} target="_blank" rel="noreferrer">
                {doc.name}
              </a>
            </li>
          ))
        ) : (
          <li>No documents uploaded</li>
        )}
      </ul>

      <h4>Case Summary</h4>
      <pre style={{ whiteSpace: "pre-wrap" }}>{caseData.summary}</pre>

      <Link to={`/edit-case/${caseData._id}`}>Edit Case</Link>
    </div>
  );
}
