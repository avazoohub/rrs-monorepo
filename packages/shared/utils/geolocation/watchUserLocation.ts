/**
 * Continuously watches the user's geographical location and provides updates via callbacks.
 * 
 * @param {GeolocationPosition} successCallback The callback function that is called whenever the user's location is successfully obtained.
 *   This callback receives a GeolocationPosition object containing the current geographical location of the device.
 * @param {GeolocationPositionError | string} errorCallback The callback function that is called whenever there is an error in obtaining the user's location.
 *   This callback receives either a GeolocationPositionError object detailing the error or a string with an error message.
 * @returns {number | null} Returns a watch ID (number) that can be used to stop watching the user's location with clearWatch. 
 *   Returns null if the geolocation is not supported by the user's browser.
 * 
 * The options object passed to watchPosition allows for configuration of the location watching process:
 * - enableHighAccuracy: If true, requests the most precise location data available. This may use GPS, leading to higher power consumption.
 * - timeout: The maximum time (in milliseconds) the device is allowed to take in order to return a location. After this time, the errorCallback is triggered.
 * - maximumAge: The maximum age (in milliseconds) of a cached location that the application is willing to accept. A setting of 0 forces the device to get a fresh location.
 */

export const watchUserLocation = (successCallback: (position: GeolocationPosition) => void, errorCallback: (error: GeolocationPositionError | string) => void) => {
 
  if (!navigator.geolocation) {
    errorCallback(`Geolocation is not supported by your browser'`)
    return 0

  } else {
    const options = {
      // Requests high accuracy for location. May increase power consumption.
      enableHighAccuracy: true,
      // Sets the timeout for obtaining location to 5 seconds
      timeout: 500,
      // Does not accept cached locations; always seeks a fresh location
      maximumAge: 0
    };

    const watchId = navigator.geolocation.watchPosition(successCallback, errorCallback, options)
    
    return watchId
  }
};

// Function to clear the watch
export const clearWatch = (watchId: number) => {
  navigator.geolocation.clearWatch(watchId);
};