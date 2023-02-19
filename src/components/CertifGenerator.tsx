import jsPDF from "jspdf";
import React, { useCallback, useEffect, useState } from "react";

export default function CertifGenerator() {
  const [name, setName] = useState("");
  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      generatePDF();
    }
  };
  const generatePDF = useCallback(() => {
    const certificate = new jsPDF({
      orientation: "landscape",
    });
    const centerWidth = certificate.internal.pageSize.getWidth() / 2;
    const textWidth = certificate.getTextWidth(name);
    const x = 0;
    const y = 0;
    certificate.addImage("./certif-template.png", "JPEG", x, y, 300, 212);
    certificate.setTextColor(0, 0, 0);
    certificate.setFontSize(24);
    certificate.text(name, centerWidth - textWidth / 2, 88);
    const pdfDataUrl = certificate.output("dataurlstring");
    const pdfPreview = document.getElementById(
      "pdf-preview"
    ) as HTMLIFrameElement;
    pdfPreview.src = pdfDataUrl;
  }, [name]);

  return (
    <div>
      <h1>Certificate Generator</h1>
      <div>
        <label htmlFor="name-input">Name:</label>
        <input
          type="text"
          id="name-input"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            e.preventDefault();
          }}
          onKeyDown={handleKeyPress}
        />
      </div>
      <h2>PDF Preview</h2>
      <iframe id="pdf-preview" title="PDF Preview" width="100%" height="800" />
    </div>
  );
}
