import * as React from "react";
import _ from "lodash";
import "./App.css";
import {
  FormControl,
  Select,
  MenuItem,
  FormHelperText,
  Button,
  Pagination,
  Grid,
} from "@material-ui/core";

import {
  getAvailableCamerasForSpecificRover,
  getPhotos,
} from "./utilities/resources";
class App extends React.Component {
  constructor() {
    super();
    this.state = {
      rover: "",
      camera: "",
      sol: 0,
      availableCameras: [],
      displayPhotos: false,
      photos: [],
      page: 1,
    };
  }

  handleDropdownClick = (prop, event) => {
    const state = this.state;
    if (prop === "rover") {
      state["availableCameras"] = getAvailableCamerasForSpecificRover(
        event.target.value
      );
    }

    state[prop] = event.target.value;
    this.setState(state);
  };

  handlePageChange = (event, value) => {
    const { rover, camera, sol } = this.state;
    console.log(value);
    this.setState(
      {
        page: value,
      },
      () => {
        getPhotos(rover, camera, sol, value).then((data) => {
          this.setState({ photos: data.photos });
        });
      }
    );
  };
  loadPhotos = () => {
    const { rover, camera, sol, page } = this.state;
    if (rover === "" || camera === "") {
      alert("Specify fields please");
    } else {
      getPhotos(rover, camera, sol, page).then((data) => {
        this.setState({ photos: data.photos, displayPhotos: true });
      });
    }
  };

  backToInputs = () => {
    this.setState({ displayPhotos: false });
  };

  render() {
    const {
      rover,
      camera,
      sol,
      availableCameras,
      displayPhotos,
      photos,
      page,
    } = this.state;
    return (
      <div className="App">
        <header className="App-header">
          {displayPhotos ? (
            <div className="App-header">
              <Button
                color="primary"
                className="button"
                size="large"
                onClick={this.backToInputs}
                variant="outlined"
                style={{ marginTop: 70 }}
              >
                Back to rover selection
              </Button>

              <Pagination
                page={page}
                count={10}
                defaultPage={1}
                siblingCount={1}
                boundaryCount={1}
                onChange={this.handlePageChange}
              />

              <Grid>
                {photos.length === 0 ? (
                  <div>
                    <h3>No photos this sol... </h3>
                  </div>
                ) : (
                  photos.map((item) => (
                    <Grid container item xs={12} spacing={2} margin={2}>
                      <img srcSet={item.img_src} alt={item.title} />
                    </Grid>
                  ))
                )}
              </Grid>
            </div>
          ) : (
            <div>
              <p>Choose the place of travel</p>
              <div className="dropdowns">
                <FormControl>
                  <Select
                    value={rover}
                    onChange={(e) => this.handleDropdownClick("rover", e)}
                    displayEmpty
                    inputProps={{ "aria-label": "Without label" }}
                    className="form-control"
                  >
                    <MenuItem value="" disabled>
                      Rover
                    </MenuItem>
                    <MenuItem value={"Curiosity"}>Curiosity</MenuItem>
                    <MenuItem value={"Opportunity"}>Opportunity</MenuItem>
                    <MenuItem value={"Spirit"}>Spirit</MenuItem>
                  </Select>
                  <FormHelperText>Rover</FormHelperText>
                </FormControl>
                <FormControl>
                  <Select
                    value={camera}
                    onChange={(e) => this.handleDropdownClick("camera", e)}
                    displayEmpty
                    inputProps={{ "aria-label": "Without label" }}
                    className="form-control"
                  >
                    <MenuItem value="" disabled>
                      Camera
                    </MenuItem>
                    {availableCameras.map((cameraArray) => (
                      <MenuItem value={cameraArray[0]}>
                        {cameraArray[1]}
                      </MenuItem>
                    ))}
                  </Select>
                  <FormHelperText>Camera</FormHelperText>
                </FormControl>{" "}
                <FormControl>
                  <Select
                    value={sol}
                    onChange={(e) => this.handleDropdownClick("sol", e)}
                    displayEmpty
                    inputProps={{ "aria-label": "Without label" }}
                    className="form-control"
                  >
                    <MenuItem value="" disabled>
                      Sol
                    </MenuItem>
                    {_.times(1500, (number) => (
                      <MenuItem value={number}>{number}</MenuItem>
                    ))}
                  </Select>
                  <FormHelperText>Sol</FormHelperText>
                </FormControl>
              </div>
              <Button
                color="primary"
                className="button"
                size="large"
                onClick={this.loadPhotos}
                variant="outlined"
              >
                GO
              </Button>
            </div>
          )}
        </header>
      </div>
    );
  }
}

export default App;
