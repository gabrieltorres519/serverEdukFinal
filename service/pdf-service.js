PDFDocument = require('pdfkit')

function buildPDF(dataCallback,endCallcack,database){

    const doc = new PDFDocument();

    doc.on('data',dataCallback);
    doc.on('end',endCallcack);   
    doc.fontSize(25).text('Reporte de la base de Datos de Cursos\n')
    doc.fontSize(10).text(database)
    doc.end();
}

module.exports = {buildPDF}