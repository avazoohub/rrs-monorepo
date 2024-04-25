// utils/localStorage.js

/**
 * Sets a value in localStorage.
 * 
 * @param {string} key - The key under which to store the value.
 * @param {*} value - The value to be stored. It will be stringified.
 */
export function setLocalStorageItem(key: string, value: object) {
    if (typeof window === 'undefined') return; // Ensure code runs in the browser
    try {
      const stringValue = JSON.stringify(value);
      window.localStorage.setItem(key, stringValue);
    } catch (error) {
      console.error(`Error saving to localStorage: ${error}`);
    }
  }
  


  /**
 * Retrieves a value from localStorage.
 * 
 * @param {string} key - The key of the item to retrieve.
 * @returns {*} The parsed value from localStorage, or undefined if not found or on error.
 */
export function getLocalStorageItem(key: string) {
    if (typeof window === 'undefined') return; // Ensure code runs in the browser
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : undefined;
    } catch (error) {
      console.error(`Error reading from localStorage: ${error}`);
      return undefined;
    }
  }

  
  /**
 * Removes a value from localStorage.
 * 
 * @param {string} key - The key of the item to remove.
 */
export function clearLocalStorageItem(key: string) {
    if (typeof window === 'undefined') return; // Ensure code runs in the browser
    try {
      window.localStorage.removeItem(key);
    } catch (error) {
      console.error(`Error removing from localStorage: ${error}`);
    }
  }
  
  /**
   * Clears all data from localStorage.
   */
  export function clearAllLocalStorage() {
    if (typeof window === 'undefined') return; // Ensure code runs in the browser
    try {
      window.localStorage.clear();
    } catch (error) {
      console.error(`Error clearing localStorage: ${error}`);
    }
  }
  