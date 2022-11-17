import React, { useEffect, useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import { getListMeme } from "../service/imageService";

function Homepage() {
  const [listMeme, setListMeMe] = useState([]);
  const [check, setCheck] = useState(true);
  useEffect(() => {
    if (check) {
      getListMeme().then((data) => {
        setListMeMe(data.data.memes);
      });
    } else {
      setListMeMe([]);
    }
  }, [check]);

  function checkClick() {
    if (check) setCheck(false);
    else setCheck(true);
  }
  return (
    <div>
      <Carousel>
        {listMeme.map((obj) => (
          <Carousel.Item
            style={{ objectFit: "cover", height: "75vh", paddingTop: "0px" }}
          >
            <img
              className=" w-100 h-100"
              src={obj.url}
              alt="First slide"
              style={{
                objectFit: "contain",
                paddingTop: "0px"
              }}
            />
          </Carousel.Item>
        ))}
      </Carousel>
      <button
        type="button"
        style={{ marginTop: "50px" }}
        onClick={checkClick}
        className="d-flex btn btn-primary"
      >
        OnClick
      </button>
    </div>
  );
}

export default Homepage;
