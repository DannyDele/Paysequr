// Funtion to give table cells colors

const tableCellStyle = (isHeader, index) => ({
    backgroundColor: isHeader ? '#dcdcdc' : index % 2 === 0 ? '#f0f0f0' : '#ffffff',
    fontWeight: isHeader ? 'bold' : 'normal',
  });


export default tableCellStyle