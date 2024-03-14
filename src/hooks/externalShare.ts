// type CardDetails = {
//     [key: string]: string | null | undefined; 
//     img_front_link?: string | null | undefined; 
//     img_back_link?: string | null | undefined; 
//   }

const formatCardDetails = (details: any) => {

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