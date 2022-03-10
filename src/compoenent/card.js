import React, { Component } from "react";
import "./style.css";
class Cards extends Component {
  state = {
    data: []
  };

  loadData = () => {
    const {data} = this.state;
    const API = `https://raw.githubusercontent.com/srijanDubey/chitkara-test-api-mock/main/data.json`;
    fetch(API)
      .then(response => response.json())
      .then(json => {
        this.setState({
          data: [...data, ...json.results],
          scrolling: false,
          total_pages: json.info.results
        });
      });
  };

  loadMore = () => {
    this.setState(
      prevState => ({
        page: prevState.page + 1,
        scrolling: true
      }),
      this.loadData
    );
  };

  componentDidMount() {
    this.loadData();
  }

  render() {
    return (
      <div className="clearfix">
        <div className="row">
          {this.state.data.map(data => (
            <div className="col-md-4 animated fadeIn" key={data.id}>
              <div className="card">
                <div className="card-body">
                  <div className="avatar">
                    <img
                      src={data.avatar_url}
                      className="card-img-top"
                      alt=""
                    />
                  </div>
                  <h5 className="card-title">
                    {(data.login)}
                  </h5>
                  <p className="card-text">
                    <span className="phone">{data.type}</span>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* <button
          className="btn btn-light btn-block w-50 mx-auto"
          onClick={e => {
            this.loadMore();
          }}
        >
          Load More Users
        </button> */}
      </div>
    );
  }
}

export default Cards;
