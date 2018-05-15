const apiKey = '7I9CMkdMFzD6bVQqwykpA6boMkDI3i7Zuijz-iqa8DC4ZGFp3lZls3lMFiZTqRhRVleAqAVDSCRruhXjaAK88aFdxPBIgb27HbvPlYWGekNZ3PSSqRmJ_1slffT5WnYx';
const url = 'https://api.yelp.com/v3/businesses/search';
const CORS = 'https://cors-anywhere.herokuapp.com/';

const Yelp = {
    search(term, location, sortBy) {
        return fetch(`${CORS}${url}?term=${term}&location=${location}&sort_by=${sortBy}`,{
            headers: {
                Authorization: `Bearer ${apiKey}`
            }
        }).then(response => {
            return response.json();
        }).then(jsonResponse => {
            if (jsonResponse.businesses) {
                return jsonResponse.businesses.map(business => {
                    return {
                        id: business.id,
                        url: business.url,
                        name: business.name,
                        imageSrc: business.image_url,
                        address: business.location.address1,
                        city: business.location.city,
                        state: business.location.state,
                        zipCode: business.location.zip_code,
                        category: business.categories[0].title,
                        rating: business.rating,
                        reviewCount: business.review_count,
                        distance: business.distance,
                        lat: business.coordinates.latitude,
                        log: business.coordinates.longitude
                    };
                });
            }
        });
    },
};

export default Yelp;