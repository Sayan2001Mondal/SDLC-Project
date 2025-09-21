import React from "react";

const Home = () => {
  return (
    <>
      <header className="header">
        <div className="container">
          <nav className="navbar">
            <a href="#" className="logo">
              <img src="Logo (2).png" alt="logo" />
            </a>
            <ul className="navlist">
              <li>
                <a href="#">Home</a>
              </li>
              <li>
                <a href="#">About us</a>
              </li>
              <li>
                <a href="#">
                  <select name="select" className="features">
                    <option hidden value="" className="feature-option">
                      Features
                    </option>
                    <option value="Activity">Activity</option>
                    <option value="Workout">Workout</option>
                    <option value="Progress Report">Progress Report</option>
                    <option value="Workout History">Workout History</option>
                    <option value="Reset And Recoverylogs">
                      Reset And Recoverylogs
                    </option>
                  </select>
                </a>
              </li>
              <li>
                <a href="#">Plan & pricing</a>
              </li>
              <li>
                <a href="#">Trainers</a>
              </li>
              <li>
                <a href="#">Testimonials</a>
              </li>
              <li className="search-bar">
                <input type="text" placeholder="Search" className="search" />
                <i className="fa-solid fa-magnifying-glass"></i>
              </li>
              <li>
                <a href="#" className="cart">
                  <i className="fa-solid fa-bag-shopping"></i>
                </a>
              </li>
            </ul>
            <a href="#" className="create-account-button">
              <p>Login/Create Account</p>
              <div className="arrow">
                <i className="fa-solid fa-arrow-right"></i>
              </div>
            </a>
          </nav>
        </div>
      </header>

      <section className="banner">
        <div className="container">
          <h1>
            fuel your body,
            <br />
            transform your life.
          </h1>
          <a href="#" className="button-label-button">
            <p>Button Lable</p>
            <div className="arrow">
              <i className="fa-solid fa-arrow-right"></i>
            </div>
          </a>
          <div className="row">
            <div className="col50">
              <div className="card1">
                <div className="left1">
                  <figure>
                    <img src="Frame 45.png" alt="image" />
                  </figure>
                </div>
                <div className="right1">
                  <h3>
                    Smart Food <br />
                    Logging
                  </h3>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Mollitia distinctio laborum molestias officia nam!
                  </p>
                  <a href="#" className="explore">
                    <p>Explore More</p>
                  </a>
                </div>
              </div>
            </div>
            <div className="col50">
              <div className="card1">
                <div className="left1">
                  <figure>
                    <img src="Frame 45.png" alt="image" />
                  </figure>
                </div>
                <div className="right1">
                  <h3>
                    Smart Food <br />
                    Logging
                  </h3>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Mollitia distinctio laborum molestias officia nam!
                  </p>
                  <a href="#" className="explore">
                    <p>Explore More</p>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="about">
        <div className="container">
          <div className="row">
            <div className="col10">
              <div className="reverse">
                <span>
                  <b>Digital Agency</b>
                </span>
              </div>
            </div>
            <div className="col70">
              <div className="who">
                <h2>Who We Are</h2>
                <p>
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                  Maiores corrupti laudantium ex consequuntur atque sit ratione
                  optio consectetur aut, ipsam perspiciatis eius vitae magnam
                  eligendi modi asperiores? Enim id explicabo est dolores quia,
                  qui molestias sunt distinctio quos autem alias. Lorem, ipsum
                  dolor sit amet consectetur adipisicing elit. Harum facilis
                  veritatis officia illum error libero nihil exercitationem,
                  dolor dolorem! Corporis iste id mollitia natus accusantium
                  possimus delectus sapiente! Quam praesentium quisquam hic quia
                  dolorum natus odit corporis dolores, quae, placeat, odio
                  officia itaque animi possimus consectetur fugit. Iste amet,
                  sint laborum fuga veritatis repudiandae quod debitis nam
                  soluta numquam officiis illum. Magni doloremque repellendus
                  nisi aliquid iure cum consequatur at.
                </p>
              </div>
            </div>
            <div className="col20">
              <div className="achivments">
                <span>
                  <b>300+</b>
                </span>
                <p>Succesfull Projects</p>
                <a href="#" className="discuss">
                  <p>Let&apos;s Discuss</p>
                  <div className="arrow">
                    <i className="fa-solid fa-arrow-right"></i>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="journey">
        <div className="container">
          <div className="journey-up">
            <span>
              <img src="Frame 12.png" alt="" />
              <h2>Elevates</h2>
              <a href="#" className="diet-plans">
                <p>Explore Diet Plans</p>
              </a>
            </span>
            <span>
              <h2>your fitness journey</h2>
              <img src="Frame 10.png" alt="image" />
            </span>
            <span className="third">
              <h2>with smart tracking and expert tips</h2>
            </span>
          </div>
        </div>
      </section>

      <section className="expert">
        <div className="container">
          <div className="row">
            <div className="col50">
              <div className="exp-lft">
                <div className="choose">
                  <span>
                    <b>Why Choose US</b>
                  </span>
                  <h2>
                    our experts <br />
                    marketing solutions
                  </h2>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Provident at, harum eveniet omnis reprehenderit esse veniam
                    voluptatum consectetur voluptatibus nihil praesentium
                    debitis dolor illum ipsa. Ratione architecto cupiditate
                    excepturi facere. Lorem ipsum dolor sit amet consectetur
                    adipisicing elit. Quibusdam, ipsum perspiciatis sequi soluta
                    unde saepe dicta neque esse blanditiis quae iure quasi nulla
                    officia ratione nisi doloribus quam delectus! Aliquid?
                  </p>
                  <div className="tick">
                    <i className="fa-regular fa-circle-check"></i>
                    <p>marketing plans crafted to match your unique goals</p>
                  </div>
                  <div className="tick">
                    <i className="fa-regular fa-circle-check"></i>
                    <p>
                      creative solutions that set your brand apart in a fancy
                      market
                    </p>
                  </div>
                  <div className="tick">
                    <i className="fa-regular fa-circle-check"></i>
                    <p>
                      proven methodes that delivers consistent deliverable
                      results
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col50">
              <div className="exp-right">
                <div className="center-card">
                  <p>90%</p>
                  <h4>extra growth</h4>
                  <div className="lower">
                    <h5>grow revenue</h5>
                    <p>we will grow your buisness</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="trainer">
        <div className="container">
          <span>
            <b>Why Choose US</b>
          </span>
          <h2>most popular traners</h2>
          <p>
            train with world-class finess coaches,handpicked to guide you at
            every step
          </p>
          <div className="row">
            <div className="col20">
              <div className="trn-crd">
                <img src="Frame 23.png" alt="" />
                <h4>full name</h4>
                <p>designation</p>
              </div>
            </div>
            <div className="col20">
              <div className="trn-crd">
                <img src="Frame 23.png" alt="" />
                <h4>full name</h4>
                <p>designation</p>
              </div>
            </div>
            <div className="col20">
              <div className="trn-crd">
                <img src="Frame 23.png" alt="" />
                <h4>full name</h4>
                <p>designation</p>
              </div>
            </div>
            <div className="col20">
              <div className="trn-crd">
                <img src="Frame 23.png" alt="" />
                <h4>full name</h4>
                <p>designation</p>
              </div>
            </div>
            <div className="col20">
              <div className="trn-crd">
                <img src="Frame 23.png" alt="" />
                <h4>full name</h4>
                <p>designation</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
