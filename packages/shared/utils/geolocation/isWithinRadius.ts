/**
 * Determines if two geographical points are within a specified radius of each other.
 * 
 * @param {number} lat1 Latitude of the first point in decimal degrees.
 * @param {number} lon1 Longitude of the first point in decimal degrees.
 * @param {number} lat2 Latitude of the second point in decimal degrees.
 * @param {number} lon2 Longitude of the second point in decimal degrees.
 * @param {number} radius The radius within which to check if the second point is located from the first point, in kilometers. Defaults to 5 kilometers.
 * @returns {boolean} Returns true if the distance between the two points is less than or equal to the specified radius, otherwise false.
 * 
 * This function implements the Haversine formula to calculate the great-circle distance between two points on the Earth's surface, 
 * which is the shortest distance over the earth's surface giving an "as-the-crow-flies" distance between the points (ignoring any hills, 
 * valleys, or other potential obstacles).
 * 
 * The Haversine formula accounts for the spherical shape of the Earth, making it more accurate for small distances compared to 
 * simple Euclidean distance calculations on a flat plane. It is especially useful in navigation and geofencing applications where 
 * accuracy is crucial.
 */


export const isWithinRadius = (lat1: number | undefined | null, lon1: number | undefined | null, lat2: number | undefined | null, lon2: number | undefined | null, radius: number = 15): boolean | null => {
    
  if (lat1 && lon1 && lat2 && lon2) {
        // Radius of the Earth in kilometers. This value varies slightly depending on where you measure it on the Earth's surface.
        const R = 6371; 
  
        // Difference in latitude between the two points, converted to radians.
        const dLat = (lat2 - lat1) * (Math.PI / 180); 
      
        // Difference in longitude between the two points, converted to radians.
        const dLon = (lon2 - lon1) * (Math.PI / 180); 
        
        // Calculate the square of half the chord length between the points.
        const a =
          Math.sin(dLat / 2) * Math.sin(dLat / 2) +
          Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) * // cosines of the latitudes, converted to radians.
          Math.sin(dLon / 2) * Math.sin(dLon / 2); // Sine of half the difference in longitude.
        
        // Calculate the angular distance in radians
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        
        // Multiply the angular distance in radians by the Earth's radius to get the distance in kilometers.
        const distance = R * c; 
        
        // Check if the calculated distance is within the specified radius.
        return distance <= radius; 
  }
  
  return null
};
  