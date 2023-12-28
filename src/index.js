import html2canvas from "html2canvas";
import jsPDF from "jspdf";

function captureContentAndGeneratePDF(name)
{
  document.getElementById("content-name").innerText = name;

  html2canvas(document.getElementById("content-to-capture")).then(canvas =>
  {
    const imgData = canvas.toDataURL('image/jpeg');

    // Dimensions of an A4 page in mm
    const pageWidth = 210;
    const pageHeight = 297;

    // Calculate the scaling factor to fit the image inside A4 page
    let scale = Math.min(pageWidth / canvas.width, pageHeight / canvas.height);

    // Calculate the dimensions of the image to fit it within the A4 page
    let imgWidth = canvas.width * scale;
    let imgHeight = canvas.height * scale;

    // Calculate the position to center the image on the page
    let xPosition = (pageWidth - imgWidth) / 2;
    let yPosition = (pageHeight - imgHeight) / 2;

    let pdf = new jsPDF({ // Corrected initialization
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });
    pdf.addImage(imgData, 'JPEG', xPosition, yPosition, imgWidth, imgHeight);

    // Create a Blob from the PDF Stream
    const pdfBlob = pdf.output('blob');

    // Create a link element
    const link = document.createElement('a');

    // Set the link's href to point to the Blob URL
    link.href = URL.createObjectURL(pdfBlob);
    link.download = "certyfikat.pdf";

    // Append the link to the document body
    document.body.appendChild(link);

    // Programmatically click the link to trigger the download
    link.click();

    // Remove the link from the document
    setTimeout(() => document.body.removeChild(link), 100);
  });
}

export function checkPassword()
{
  var password = document.getElementById("password-input").value;

  if ( (password === "666") || (password === "2137"))
  {
    document.getElementById("password-page").style.display = "none";
    document.getElementById("congrats-page").style.display = "block";

    let name = document.getElementById("name-input").value;
    if(name==="")
      name = "Mleczne dziecię";

    captureContentAndGeneratePDF(name);
  }
  else
  {
    document.getElementById("password-error").innerText = "to hasło nie było prawilne!";
    setTimeout(() => {document.getElementById("password-error").innerText=""}, 3000);
  }
}


document.addEventListener('DOMContentLoaded', function()
{
  document.getElementById("submit-button").addEventListener("click", checkPassword);
});
