import React from "react";
import Carousel from "react-bootstrap/Carousel";
const Carousels = () => {
  return (
    <div style={{ height: "30%", marginTop: "5rem" }}>
      <Carousel fade>
        <Carousel.Item>
          <img
            style={{ width: "100%", height: "50rem" }}
            className="d-block w-100  "
            src="https://th.bing.com/th/id/R.9446bad0ca0f133ee435665005cfdadf?rik=Vlm6B7tOD7yZEg&riu=http%3a%2f%2fwallpapersdsc.net%2fwp-content%2fuploads%2f2016%2f09%2fJunk-Food-Pictures.jpg&ehk=N0OhWBolCA9pmRKEGp5f4cR%2fVfFEZfqoP%2bAcEFPkPXo%3d&risl=&pid=ImgRaw&r=0"
            alt="First slide"
          />
          <Carousel.Caption>
            <div
              style={{ fontSize: "40px", fontFamily: "arial", color: "yellow" }}
            >
              Welcome to Epic Foods
            </div>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            style={{ width: "100%", height: "50rem" }}
            className="d-block w-100"
            src="https://leuragarage.com.au/wp-content/uploads/2016/12/food-CWP-IMG_9145Warm-copy.jpg"
            alt="Second slide"
          />

          <Carousel.Caption>
            <div
              style={{ fontSize: "40px", fontFamily: "arial", color: "yellow" }}
            >
              Welcome to Epic Foods
            </div>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            style={{ width: "100%", height: "50rem" }}
            className="d-block w-100"
            src="https://th.bing.com/th/id/R.ac9f117734f719ca044b312cf4732198?rik=r0lwawhSE0DNMA&riu=http%3a%2f%2fpavbca.com%2fwalldb%2foriginal%2f6%2f5%2f5%2f84015.jpg&ehk=PwZQ5fdCtPdEIX60Z8rHwdkVAoLftqBL489fRPUa3AY%3d&risl=&pid=ImgRaw&r=0"
            alt="Third slide"
          />

          <Carousel.Caption>
            <div
              style={{ fontSize: "40px", fontFamily: "arial", color: "yellow" }}
            >
              Welcome to Epic Foods
            </div>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            style={{ width: "100%", height: "50rem" }}
            className="d-block w-100"
            src="https://en.free-wallpapers.su/data/media/2319/big/fd0244.jpg"
            alt="Fourth slide"
          />

          <Carousel.Caption>
            <div
              style={{ fontSize: "40px", fontFamily: "arial", color: "yellow" }}
            >
              Welcome to Epic Foods
            </div>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            style={{ width: "100%", height: "50rem" }}
            className="d-block w-100"
            src="https://en.free-wallpapers.su/data/media/2319/big/fd0251.jpg"
            alt="Five slide"
          />

          <Carousel.Caption>
            <div
              style={{ fontSize: "40px", fontFamily: "arial", color: "yellow" }}
            >
              Welcome to Epic Foods
            </div>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </div>
  );
};

export default Carousels;
