// Funtion to give table cells colors

// Function to give table cells colors
const tableCellStyle = (isHeader, index, status) => {
  let statusColor;
  switch (status) {
    case 'Completed':
      statusColor = 'green';
      break;
    case 'Pending':
      statusColor = 'blue';
      break;
    case 'Failed':
      statusColor = 'red';
      break;
    default:
      statusColor = 'inherit';
  }

  return {
    backgroundColor: isHeader ? '#dcdcdc' : index % 2 === 0 ? '#f0f0f0' : '#ffffff',
    fontWeight: isHeader ? 'bold' : 'normal',
    color: status && !isHeader ? statusColor : 'inherit'
  };
};

export default tableCellStyle;