import replicateApi from './replicateApi';

type responseType = {
  fullname: string | null;
  'job-title': string | null;
  email: string | null;
  website: string | null;
  company: string | null;
  phone: string | null;
};

const arrayToStringObject = async (arr: string[]) => {
  let result = arr.join('');
  //   result = result.trim();
  //   console.log('result', result);
  const newArray = result.split('\n');
  result = newArray.join('');

  result = result.replace(/,/g, '');
  function addCommaBetweenQuotes(inputString: string) {
    // Define the regular expression pattern
    const pattern = /"\s*"\s*/g;

    // Replace occurrences of the pattern with ", "
    const stringWithComma = inputString.replace(pattern, '", "');

    return stringWithComma;
  }
  let new_string = addCommaBetweenQuotes(result);
  function addCommaBetweenNullQuotes(inputString: string) {
    // Define the regular expression pattern
    const pattern = /null\s*"/g;

    // Replace occurrences of the pattern with ", "
    const stringWithComma = inputString.replace(pattern, 'null , "');

    return stringWithComma;
  }
  new_string = addCommaBetweenNullQuotes(new_string);
  //   console.log('new_string', new_string);
  try {
    return JSON.parse(new_string);
  } catch (err) {
    return {
      fullname: null,
      'job-title': null,
      email: null,
      website: null,
      company: null,
      phone: null,
    };
  }
};

const getFinalResponse = async (id: string) => {
  try {
    const ApiResponse = await replicateApi.get('/predictions/' + id);
    const response = await arrayToStringObject(ApiResponse.data.output);
    console.log('response', response);
    return response;
  } catch (err) {
    console.log(err.response.data);
    return {
      fullname: null,
      'job-title': null,
      email: null,
      website: null,
      company: null,
      phone: null,
    };
  }
};

const prompt =
  'You are an expert in extracting information from raw text. you are tasked to extract full-name, job-titile, email, company, phone number and website from the raw text of a Business card. You just return the data as a json eg{ fullname:"","job-title":"",email:"", website:"", company:"", phone }. the following is the text you have to do the details extraction, you must do it no matter what the language of the text is.... You must also have the ability to identify and remove any irrelevant letters and text from the output. you must make sure that a field will only have 1 item. You must correctly identity all the fields, without mistaking the data. The response must have all sixitems. if any item is missing from the input, you must put it as null. You just have to return the Json as a continuous string, no need of any explanation, and no notes, just the start brackets and end brackets and just the data and no extra brackets:- ';

export const aiDetailsExtraction = async (rawText: string) => {
  let response: responseType = {
    fullname: null,
    'job-title': null,
    email: null,
    website: null,
    company: null,
    phone: null,
  };
  try {
    const predictionPayload = {
      version:
        '5d78bcd7a992c4b793465bcdcf551dc2ab9668d12bb7aa714557a21c1e77041c',
      input: {
        top_k: 50,
        top_p: 0.9,
        prompt: prompt + rawText,
        temperature: 0.6,
        max_new_tokens: 1024,
        prompt_template: '<s>[INST] {prompt} [/INST] ',
        presence_penalty: 0,
        frequency_penalty: 0,
      },
    };
    const apiResponse = await replicateApi.post(
      '/predictions',
      predictionPayload,
    );
    const url = apiResponse.data['urls']['get'];
    const array = url.split('/');
    const id = array.slice(-1)[0];
    await new Promise((resolve) => setTimeout(resolve, 6000));
    // Now call getFinalResponse
    response = await getFinalResponse(id);
    if (
      response.fullname === null &&
      response['job-title'] === null &&
      response.email === null &&
      response.website === null &&
      response.company === null &&
      response.phone === null
    ) {
      return { status: false, data: response };
    }
    return { status: true, data: response };
  } catch (error) {
    console.log(error);
    return { status: false, data: response };
  }
};
