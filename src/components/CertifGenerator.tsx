import jsPDF from "jspdf";
import React, { useCallback, useEffect, useState } from "react";

export default function CertifGenerator() {
  const [name, setName] = useState("");
  const [nameClass, setNameClass] = useState("");
  const [date, setDate] = useState("");
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
    const centerWidth = 150;
    const textWidth = certificate.getTextWidth(name);
    const x = 0;
    const y = 0;
    const nameLength = name.length / 2;
    certificate.addImage("./certif.png", "JPEG", x, y, 300, 212);
    certificate.setTextColor(0, 0, 0);
    certificate.setFontSize(24);
    certificate.text(name, centerWidth - textWidth / 2 - nameLength, 88);
    certificate.setFontSize(22);
    certificate.setFont("helvetica", "bolditalic");
    certificate.setLineHeightFactor(1.2);
    console.log(certificate.getFontList());
    console.log(nameClass.length);
    if (nameClass.length <= 42) {
      certificate.text(nameClass, centerWidth, 133, {
        align: "center",
      });
    } else {
      const className = certificate.splitTextToSize(nameClass, 180);
      certificate.text(className, centerWidth, 129, {
        align: "center",
      });
    }
    certificate.setFontSize(12);
    certificate.setFont("helvetica", "normal");
    certificate.text(date, centerWidth + 20.8, 148);
    const pdfDataUrl = certificate.output("arraybuffer");
    console.log("pdfDataUrl: ", pdfDataUrl);
    const pdfUrl = URL.createObjectURL(
      new Blob([pdfDataUrl], { type: "application/pdf" })
    );
    const pdfPreview = document.getElementById(
      "pdf-preview"
    ) as HTMLIFrameElement;
    pdfPreview.src = pdfUrl;
  }, [name, nameClass, date]);

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
      <div>
        <label htmlFor="name-class-input">Class:</label>
        <input
          type="text"
          id="name-class-input"
          value={nameClass}
          onChange={(e) => {
            setNameClass(e.target.value);
            e.preventDefault();
          }}
          onKeyDown={handleKeyPress}
        />
      </div>
      <div>
        <label htmlFor="date-input">Date:</label>
        <input
          type="text"
          id="date-input"
          value={date}
          onChange={(e) => {
            setDate(e.target.value);
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
