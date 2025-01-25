import React from "react";

function About() {
  const handleEmailUsClick = () => {
    alert("Service is currently not available");
  };
  return (
    <div className="container ">
      <div className="w-50">
        <h1>About Us</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius nihil
          iure molestiae iusto quisquam a rerum minima, nam, illo at nemo error
          alias culpa tempore officiis architecto, exercitationem eos ducimus
          atque. Enim impedit aut perspiciatis! Nostrum, fugiat, tempora eum
          quis at similique maiores incidunt, omnis obcaecati accusamus dolorem
          ducimus minus molestias inventore enim. Nam officia dolores vel esse
          quasi facilis, libero quia accusamus error et, optio corporis mollitia
          deserunt qui modi animi, hic harum magni amet nihil maxime neque?
          Ipsum laudantium, molestias doloribus quia maiores placeat dignissimos
          qui rerum perferendis corrupti enim, at sunt saepe dolores! Earum
          nobis eum dolore!
        </p>
        <button className="btn btn-primary" onClick={handleEmailUsClick}>
          Email Us
        </button>
      </div>
    </div>
  );
}

export default About;
