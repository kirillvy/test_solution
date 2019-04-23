const apiKey = 'api_key';

/**
 * Loads Google API client
 */
function loadClient() {
  gapi.client.setApiKey(apiKey);
  return gapi.client.load("https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest")
      .then(function() { console.log("GAPI client loaded for API"); },
            function(err) { console.error("Error loading GAPI client for API", err); });
}

gapi.load('client', loadClient)


/**
 * Access Google API for videos list 
 * @param {string} query
 * @param {number} [maxResults = 25] - Maximum results expected
 * @returns {Promise} Promise object of API response
 */
export default function execute(query, maxResults=25) {
  return new Promise((resolve, reject) => {
    gapi.client.youtube.search.list({
      "part": "snippet",
      "maxResults": maxResults,
      "q": `${query}`
    }).then(function(response) {
      // Handle the results here (response.result has the parsed body).
      console.log("Response", response);
      resolve(response);
    },
    function(err) {
      console.error("Execute error", err);
      reject(err);
    });
  })
}