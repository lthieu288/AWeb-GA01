import React, { useEffect, useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import { getListMeme } from "../service/imageService";

function Homepage() {
  const [listMeme, setListMeMe] = useState([]);
  useEffect(() => {
    getListMeme().then((data) => {
      setListMeMe(data.data.memes);
    });
  }, []);
  return (
    <div>
      <Carousel>
        {listMeme.map((obj) => (
          <Carousel.Item style={{ objectFit: "cover", height: "75vh" }}>
            <img
              className=" w-100 h-100"
              src={obj.url}
              alt="First slide"
              style={{
                objectFit: "contain"
              }}
            />
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
}

export default Homepage;
