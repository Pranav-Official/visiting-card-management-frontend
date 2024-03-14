

const formatCardDetails = (details: any) => {
   // let formattedDetails = 'You got a message:\n';
   const filteredDetails: any = {};
   for (const key in details) {
    if (key !== 'img_front_link' && key !== 'img_back_link' && details[key] !== null) {
      const formattedKey = key.replace(/_/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase());
      filteredDetails[formattedKey] = details[key];
    }
  }

  let formattedDetails = '';
  for (const key in filteredDetails) {
    formattedDetails += `${key}: ${filteredDetails[key]},\n`;
  }
   return formattedDetails;
  };
  
  export { formatCardDetails };