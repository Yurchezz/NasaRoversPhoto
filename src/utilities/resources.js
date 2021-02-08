export const getAvailableCamerasForSpecificRover = (rover) => {
  switch (rover) {
    case "Curiosity":
      return [
        ["FHAZ", "Front Hazard Avoidance Camera"],
        ["RHAZ", "Rear Hazard Avoidance Camera"],
        ["MAST", "Mast Camera"],
        ["CHEMCAM", "Chemistry and Camera Complex"],
        ["MAHLI", "Mars Hand Lens Imager"],
        ["MARDI", "	Mars Descent Imager"],
        ["NAVCAM", "	Navigation Camera"],
      ];
    default:
      return [
        ["FHAZ", "Front Hazard Avoidance Camera"],
        ["RHAZ", "Rear Hazard Avoidance Camera"],
        ["NAVCAM", "	Navigation Camera"],
        ["PANCAM", "Panoramic Camera"],
        ["MINITES", "Miniature Thermal Emission Spectrometer (Mini-TES)"],
      ];
  }
};

export function getPhotos(rover, camera, sol, page) {
  return fetch(
    `https://api.nasa.gov/mars-photos/api/v1/rovers/${rover}/photos?sol=${sol}&camera=${camera}&page=${page}&api_key=${process.env.REACT_APP_API_KEY}`
  ).then((response) => response.json());
}
