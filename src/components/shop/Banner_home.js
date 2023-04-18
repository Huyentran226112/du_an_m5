import React from 'react';

function Banner_home(props) {
    return (
        <section className="banner-area1">
        <div className="container">
          <div className="row fullscreen align-items-center justify-content-start">
            <div className="col-lg-12">
              <div className="active-banner-slider owl-carousel">
                {/* single-slide */}
                <div className="row single-slide align-items-center d-flex">
                  <div className="col-lg-5 col-md-6">
                    <div className="banner-content">
                      <h1>
                       Car would!
                      </h1>
                      <h4>
                       Thương hiệu mang đến sự thành công 
                      </h4>
                      <div className="add-bag d-flex align-items-center">
                        <a className="add-btn" href="">
                          <span className="lnr lnr-cross" />
                        </a>
                        <span className="add-text text-uppercase">Add to Bag</span>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-7">
                    <div className="banner-img">
                      <img
                        className="img-fluid"
                        src="img/banner/anhbia.png"
                        alt=""
                      />
                    </div>
                  </div>
                </div>
           
              </div>
            </div>
          </div>
        </div>
      </section>
    );
}

export default Banner_home;