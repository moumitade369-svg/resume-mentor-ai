import jsPDF from 'jspdf';
import html2pdf from 'html2pdf.js';

export const generatePDFReport = (candidateName, markdownText) => {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  const margin = 20;
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const maxLineWidth = pageWidth - margin * 2;
  
  let y = margin;

  const checkPageBreak = (addedHeight) => {
    if (y + addedHeight > pageHeight - margin) {
      doc.addPage();
      y = margin;
      return true;
    }
    return false;
  };

  // Title
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(22);
  doc.setTextColor(167, 139, 250); // #a78bfa
  doc.text('Resume Mentor AI', pageWidth / 2, y, { align: 'center' });
  y += 10;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(14);
  doc.setTextColor(50, 50, 50);
  doc.text('Resume Analysis Report', pageWidth / 2, y, { align: 'center' });
  y += 15;

  // Meta info
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.text(`Candidate Name: ${candidateName}`, margin, y);
  y += 6;
  doc.text(`Analysis Date & Time: ${new Date().toLocaleString()}`, margin, y);
  y += 15;

  doc.setLineWidth(0.5);
  doc.setDrawColor(200, 200, 200);
  doc.line(margin, y - 5, pageWidth - margin, y - 5);

  // Content Parse
  const sections = [];
  let currentSection = { heading: null, items: [] };

  const lines = markdownText.split('\n');
  lines.forEach(line => {
    let text = line.trim();
    if (!text) return;

    if (text.startsWith('#')) {
      if (currentSection.heading || currentSection.items.length > 0) sections.push(currentSection);
      currentSection = { heading: text.replace(/^#+\s/, '').toUpperCase(), items: [] };
    } else if (text.startsWith('- **') || text.startsWith('* **')) {
      if (currentSection.heading || currentSection.items.length > 0) sections.push(currentSection);
      const match = text.match(/^[-*]\s\*\*(.*?)\*\*(.*)/);
      if (match) {
        currentSection = { 
          heading: match[1].toUpperCase() + (match[2].startsWith(':') ? '' : ''), 
          items: [] 
        };
        let content = match[2].replace(/^:\s*/, '').trim();
        content = content.replace(/\*\*/g, '').replace(/\*/g, '').replace(/__/g, '').replace(/_/g, '');
        if (content) currentSection.items.push({ text: content, isBullet: false });
      }
    } else {
      let isBullet = false;
      if (text.startsWith('- ') || text.startsWith('* ')) {
        isBullet = true;
        text = text.substring(2).trim();
      } else if (text.startsWith('• ')) {
        isBullet = true;
        text = text.substring(2).trim();
      }
      text = text.replace(/\*\*/g, '').replace(/\*/g, '').replace(/__/g, '').replace(/_/g, '');
      if (text) {
        currentSection.items.push({ text, isBullet });
      }
    }
  });
  if (currentSection.heading || currentSection.items.length > 0) {
    sections.push(currentSection);
  }

  // Print Content
  sections.forEach((section, index) => {
    let estimatedHeight = 0;
    if (section.heading) estimatedHeight += 14;
    section.items.forEach(item => {
      const split = doc.splitTextToSize(item.text, maxLineWidth - (item.isBullet ? 6 : 0));
      estimatedHeight += (split.length * 5.5) + 2;
    });

    if (estimatedHeight < (pageHeight - margin * 2) && y + estimatedHeight > pageHeight - margin) {
      doc.addPage();
      y = margin;
    }

    if (section.heading) {
      if (index > 0 && y > margin) {
        y += 4;
        doc.setLineWidth(0.5);
        doc.setDrawColor(200, 220, 255); // Subtle blue separator
        doc.line(margin, y, pageWidth - margin, y);
        y += 8;
      }
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(14);
      doc.setTextColor(20, 20, 20); // Dark Black
      doc.text(section.heading, margin, y);
      y += 7;
    }

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(11);
    doc.setTextColor(40, 40, 40);

    section.items.forEach(item => {
      const textWidth = maxLineWidth - (item.isBullet ? 6 : 0);
      const xPos = item.isBullet ? margin + 6 : margin;
      const splitText = doc.splitTextToSize(item.text, textWidth);
      
      const itemHeight = (splitText.length * 5.5) + 2;
      if (itemHeight < (pageHeight - margin * 2) && y + itemHeight > pageHeight - margin) {
        doc.addPage();
        y = margin;
      }
      
      if (item.isBullet) {
        doc.setFontSize(14); // slightly bigger bullet
        doc.text('•', margin + 2, y + 1);
        doc.setFontSize(11);
      }
      
      splitText.forEach(tLine => {
        if (checkPageBreak(6)) {
          doc.setFont('helvetica', 'normal');
          doc.setFontSize(11);
          doc.setTextColor(40, 40, 40);
        }
        doc.text(tLine, xPos, y);
        y += 5.5;
      });
      y += 2; // tight spacing between items
    });
    
    y += 4; // reduced space after section
  });

  // Add Footer to all pages
  const pageCount = doc.internal.getNumberOfPages();
  doc.setFont('helvetica', 'italic');
  doc.setFontSize(9);
  doc.setTextColor(150, 150, 150);
  
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.text('Generated by Resume Mentor AI', pageWidth / 2, pageHeight - 10, { align: 'center' });
    doc.text(`Page ${i} of ${pageCount}`, pageWidth - margin, pageHeight - 10, { align: 'right' });
  }

  doc.save(`${candidateName.replace(/[^a-zA-Z0-9]/g, '_')}_Resume_Report.pdf`);
};



export const generateImprovedResumePDF = async (candidateName, elementId) => {
  const element = document.getElementById(elementId);
  if (!element) {
    throw new Error('Resume preview element not found.');
  }

  const opt = {
    margin:       [15, 15, 15, 15],
    filename:     `${candidateName.replace(/[^a-zA-Z0-9]/g, '_')}_Improved_Resume.pdf`,
    image:        { type: 'jpeg', quality: 1 },
    html2canvas:  { scale: 3, useCORS: true, letterRendering: true },
    jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' },
    pagebreak:    { mode: ['css', 'legacy'], avoid: ['.cv-section', '.cv-experience-item', '.cv-experience-header', '.cv-header', 'li', 'h1', 'h2', 'h3', 'p', 'table', '.cv-company'] }
  };

  return html2pdf().set(opt).from(element).save();
};
