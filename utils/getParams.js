export async function getParams(headers) {
  try {
    const headersObject = headers(); // Call the function to obtain headers object
    const params = headersObject.get("x-params");
    if (!params) {
      throw new Error("x-params header not found");
    }
    const { lang, id } = JSON.parse(params);

    // Simulate an asynchronous operation (e.g., fetching from a database)
    return new Promise(
      (resolve) => resolve({ lang, id })
      // setTimeout(() => {
      // resolve({ lang, id });
      // }, 500)
    );
  } catch (error) {
    console.error("Error parsing x-params header:", error.message);
    return { lang: null, id: null }; // Return default values or handle the error accordingly
  }
}
