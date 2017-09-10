const PDFDocument = require( "pdfkit");
const FileSaver = require("file-saver");

setTimeout(() => {

  try {
    Blob, Uint8Array;
  } catch (e) {
    console.error("Blob and Uint8Array not available");
    return;
  }

  const ChunkSize = 262144;
  const chunks = [];
  let chunk;

  const doc = new PDFDocument();

  doc.on("readable", () => {
    while(chunk = doc.read(ChunkSize)) chunks.push(chunk);
  });

  doc.on("end", () => {
    const blob = new Blob(chunks, { type: "application/pdf" });
    chunks.length = 0;
    FileSaver.saveAs(blob, "generated.pdf");
  });

  drawPdf(doc);
  doc.end();
}, 20e3);

/**
 * Draw something onto a PDFDocument.
 * Taken from PDFKit Browser Demo / http://pdfkit.org/demo/browser.html
 * @param {PDFDocument} doc
 */
function drawPdf(doc) {

  // draw some text
  doc.fontSize(25)
    .text('Here is some vector graphics...', 100, 80);

  // some vector graphics
  doc.save()
    .moveTo(100, 150)
    .lineTo(100, 250)
    .lineTo(200, 250)
    .fill("#FF3300");

  doc.circle(280, 200, 50)
    .fill("#6600FF");

  // an SVG path
  doc.scale(0.6)
    .translate(470, 130)
    .path('M 250,75 L 323,301 131,161 369,161 177,301 z')
    .fill('red', 'even-odd')
    .restore();

  // and some justified text wrapped into columns
  doc.text('And here is some wrapped text...', 100, 300)
    .font('Times-Roman', 13)
    .moveDown()
    .text("lorem ...", {
      width: 412,
      align: 'justify',
      indent: 30,
      columns: 2,
      height: 300,
      ellipsis: true
    });
}
