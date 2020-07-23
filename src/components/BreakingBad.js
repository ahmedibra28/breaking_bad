import React, { Component } from "react";
import axios from "axios";
import Spinner from "./Spinner";

export default class BreakingBad extends Component {
  state = { items: [], query: "", loading: true };

  componentDidMount() {
    axios.get(`http://localhost:1337/products`).then((res) => {
      this.setState({
        items: res.data,
      });
      console.log(res.data);
    });
    // this.fetchData();
  }

  fetchData = (e) => {
    axios
      .get(`https://www.breakingbadapi.com/api/characters?name=${e}`)
      .then((res) => {
        this.setState({
          items: res.data,
          loading: false,
        });
      });
  };

  handleChange = (e) => {
    this.fetchData(e);
    this.setState({ query: e });
  };

  render() {
    const { items } = this.state;

    return (
      <div className="my-3">
        <div className="card text-center">
          <div className="card-body">
            <div className="input-group ">
              <span className="input-group-text" id="basic-addon1">
                <i className="fas fa-search"></i>
              </span>
              <input
                type="text"
                className="form-control"
                placeholder="Search charecter"
                aria-describedby="basic-addon1"
                name="query"
                value={this.state.query}
                onChange={(e) => this.handleChange(e.target.value)}
                autoFocus
              />
            </div>
          </div>
        </div>

        <div className="row mt-2">
          {this.state.loading ? (
            <Spinner />
          ) : (
            items.map((item) => {
              return (
                <div
                  className="col-lg-3 col-md-6 col-sm-6 mt-3"
                  key={item.char_id}
                >
                  <div className="flip-card">
                    <div className="inner">
                      <div className="front">
                        <img
                          src={item.img}
                          alt="Daily Dev Tips"
                          style={{
                            width: "250px",
                            height: "290px",
                            borderRadius: "10px",
                          }}
                        />
                      </div>
                      <div className="back">
                        <div className="card">
                          <div className="card-header font-weight-bold text-uppercase text-center">
                            <i className="fas fa-user"></i> {item.name}
                          </div>
                          <ul className="list-group list-group-flush ">
                            <li className="list-group-item font-weight-bolder text-center">
                              {item.nickname}{" "}
                            </li>
                            <li className="list-group-item">
                              Occupation - {item.occupation}
                            </li>
                            <li className="list-group-item">
                              Seasons - {item.appearance}
                            </li>
                            <li className="list-group-item">
                              Status - {item.status}
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    );
  }
}
