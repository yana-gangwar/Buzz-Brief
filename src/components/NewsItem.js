import React, { Component } from "react";

export default class NewsItem extends Component {
    render() {
        const { title, description, imageUrl, newsUrl, author, date, source } = this.props;

        return (
            <div>
                <div className="card my-3" style={{ width: "18rem" ,
                display:"flex",
                justifyContent:'flex-end',
               
              





            }}>
                    <img
                        src={
                            !imageUrl
                                ? "https://a57.foxsports.com/statics.foxsports.com/www.foxsports.com/content/uploads/2024/02/1408/814/2024-02-29_College-Basketball-Roundtable_16x9.jpg?ve=1&tl=1"
                                : imageUrl
                        }
                        className="card-img-top"
                        alt={title} // Provide meaningful alt text
                    />

                    <div className="card-body">
                        <h5 className="card-title">
                            {title} 
                            <span 
                                className="position-absolute top-0 translate-middle badge rounded-pill bg-danger  badge" 
                                style={{ left: '90%', zIndex: '1' }}
                            >
                                {source}
                            </span>
                        </h5>
                        <p className="card-text">{description}</p>
                        <p className="card-text">
                            <small className="text-muted">
                                By {!author ? "Unknown" : author} | {new Date(date).toLocaleDateString()}
                            </small>
                        </p>
                        <a
                            href={newsUrl}
                            target="_blank"
                            className="btn btn-sm btn-primary btn-dark"
                            rel="noreferrer"
                        >
                            Read More
                        </a>
                    </div>
                </div>
            </div>
        );
    }
}
