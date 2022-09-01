import React from "react";
import Carousel from "react-bootstrap/Carousel";
const Carousels = () => {
  return (
    <div style={{ height: "30%" }}>
      <Carousel fade>
        <Carousel.Item>
          <img
            style={{ width: "100%", height: "35rem" }}
            className="d-block w-100  "
            src="https://th.bing.com/th/id/R.9446bad0ca0f133ee435665005cfdadf?rik=Vlm6B7tOD7yZEg&riu=http%3a%2f%2fwallpapersdsc.net%2fwp-content%2fuploads%2f2016%2f09%2fJunk-Food-Pictures.jpg&ehk=N0OhWBolCA9pmRKEGp5f4cR%2fVfFEZfqoP%2bAcEFPkPXo%3d&risl=&pid=ImgRaw&r=0"
            alt="First slide"
          />
          <Carousel.Caption>
            <h3>First slide label</h3>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            style={{ width: "100%", height: "35rem" }}
            className="d-block w-100"
            src="https://leuragarage.com.au/wp-content/uploads/2016/12/food-CWP-IMG_9145Warm-copy.jpg"
            alt="Second slide"
          />

          <Carousel.Caption>
            <h3>Second slide label</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            style={{ width: "100%", height: "35rem" }}
            className="d-block w-100"
            src="https://img.freepik.com/free-photo/pork-meatballs-dark-surface_1150-43612.jpg?w=740&t=st=1659072158~exp=1659072758~hmac=3640954fce4d5d63d4a3056148b6283b319f1d93f545d045eb62410698207e0b"
            alt="Third slide"
          />

          <Carousel.Caption>
            <h3>Third slide label</h3>
            <p>
              Praesent commodo cursus magna, vel scelerisque nisl consectetur.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            style={{ width: "100%", height: "35rem" }}
            className="d-block w-100"
            src="https://img.freepik.com/free-photo/papaya-salad-served-with-rice-noodles-vegetable-salad-decorated-with-thai-food-ingredients_1150-26501.jpg?w=740&t=st=1659072347~exp=1659072947~hmac=436b392797fd2640366834cc247d682cf283b267dcf5260d937440dde913dec5"
            alt="Fourth slide"
          />

          <Carousel.Caption>
            <h3>Fourth slide label</h3>
            <p>
              Praesent commodo cursus magna, vel scelerisque nisl consectetur.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            style={{ width: "100%", height: "35rem" }}
            className="d-block w-100"
            src="https://www.hdnicewallpapers.com/Walls/Big/Food%20and%20Drinks/Food_5K_Photography_Image.jpg"
            alt="Five slide"
          />

          <Carousel.Caption>
            <h3>Five slide label</h3>
            <p>
              Praesent commodo cursus magna, vel scelerisque nisl consectetur.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </div>
  );
};

export default Carousels;
