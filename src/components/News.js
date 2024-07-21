import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroll-component';

export default class News extends Component {
  static defaultProps = {
    country: "in",
    pageSize: 8,
    category: 'general',
  }

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  }

  capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  constructor() {
    super();
    this.state = {
      articles: [],
      loading: true,
      page: 1,
      totalResults: 0
    };
    this.handleNextClick = this.handleNextClick.bind(this);
    this.handlePrevClick = this.handlePrevClick.bind(this);
  }

  async updateNews(pageNo) {
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apikey=b9603aef9886419d88c4e3335cd80267&page=${pageNo}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });

    try {
      let response = await fetch(url);
      if (response.status === 429) {
        console.warn("Too many requests. Retrying...");
        await new Promise(resolve => setTimeout(resolve, 5000)); // wait 5 seconds before retrying
        response = await fetch(url);
      }

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      let parsedData = await response.json();
      this.setState({
        articles: parsedData.articles || [],
        totalResults: parsedData.totalResults || 0,
        loading: false
      });
    } catch (error) {
      console.error("Failed to fetch articles", error);
      this.setState({ loading: false });
    }
  }

  fetchMoreData = async () => {
    this.setState({ page: this.state.page + 1 }, async () => {
      this.setState({ loading: true });
      try {
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apikey=b9603aef9886419d88c4e3335cd80267&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        let response = await fetch(url);
        if (response.status === 429) {
          console.warn("Too many requests. Retrying...");
          await new Promise(resolve => setTimeout(resolve, 5000)); // wait 5 seconds before retrying
          response = await fetch(url);
        }

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        let parsedData = await response.json();
        this.setState({
          articles: this.state.articles.concat(parsedData.articles || []),
          totalResults: parsedData.totalResults || 0,
          loading: false,
        });
      } catch (error) {
        console.error("Failed to fetch more articles", error);
        this.setState({ loading: false });
      }
    });
  };

  componentDidMount() {
    this.updateNews();
  }

  async handleNextClick() {
    this.setState({ page: this.state.page + 1 }, () => this.updateNews(this.state.page));
  }

  async handlePrevClick() {
    this.setState({ page: this.state.page - 1 }, () => this.updateNews(this.state.page));
  }

  render() {
    return (
      <div className="container " style={{ marginTop: '80px' }}       >
        <h1 className="text-center">Buzz Brief - Top {this.capitalizeFirstLetter(this.props.category)} Headlines!</h1>
        {this.state.loading && <Spinner />}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length < this.state.totalResults}
          loader={<Spinner />}
        >
          <div className="row">
            {this.state.articles.map((element) => (
              <div className="col-md-4" key={element.url}>
                <NewsItem
                  title={element.title ? element.title.slice(0, 48) : ""}
                  description={element.description ? element.description.slice(0, 88) : ""}
                  imageUrl={element.urlToImage}
                  newsUrl={element.url}
                  author={element.author}
                  date={element.publishedAt}
                  source={element.source.name}
                />
              </div>
            ))}
          </div>
        </InfiniteScroll>
      </div>
    );
  }
}
