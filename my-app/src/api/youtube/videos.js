const URL = 'https://www.googleapis.com/youtube/v3/videos';

const getVideos = async (pageToken, resultsCount) => {
    let url =
        `${URL}?key=AIzaSyB4aoIu0cWWAPQMzaFFIe0fJVInHRJES6M&part=snippet&maxResults=${resultsCount}&chart=mostPopular`;

    if (pageToken) {
        url += `&pageToken=${pageToken}`
    }

    let response = await fetch(url);

    if (response.ok) {
        let json = await response.json();

        return json;
    }

    return null;
}

export { getVideos }