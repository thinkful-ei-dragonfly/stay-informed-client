import React from 'react';
import UserContext from '../../contexts/UserContext';
import RepresentativeService from '../../services/representatives-service';
import RepresentativeList from '../../components/RepresentativeList/RepresentativeList.js';
import Spinner from '../Spinner/Spinner';
import { Link } from 'react-router-dom';
import NewsList from '../NewsList/NewsList';

export default class Dashboard extends React.Component {
  static defaultProps = {
    location: {},
    history: {
      push: () => {}
    }
  };

  static contextType = UserContext;

  componentDidMount() {
    if (this.context.user.address) {
      this.context.setFetching(true);

      RepresentativeService.getReps(this.context.user.address)
        .then(res => {
          if (res.state) {
            this.context.setUserState(res.state.toUpperCase());
          }
          if (res.district) {
            this.context.setUserDistrict(res.district);
          }
          if (res.representatives) {
            this.context.setRepresentatives(res.representatives);
          }
          this.context.setFetching(false);
        })
        .then(() => {
          RepresentativeService.getNews(
            this.context.representatives[0],
            this.context.representatives[1],
            this.context.representatives[2]
          )
            .then(news => this.context.setNews(news.articles))
            .catch(error => this.context.setError(error));
        });
    }
  }

  handleClickRepDetails = (e, repId) => {
    e.preventDefault();

    const { location, history } = this.props;
    const destination =
      (location.state || {}).from || `/representatives/${repId}`;
    history.push(destination);
  };

  data = {
    source: {
      id: null,
      name: 'Gizmodo.com'
    },
    author: 'Jennings Brown',
    title:
      "World's Dumbest Bitcoin Scammer Tries to Scam Bitcoin Educator, Gets Scammed in The Process",
    description:
      'Ben Perrin is a Canadian cryptocurrency enthusiast and educator who hosts a bitcoin show on YouTube. This is immediately apparent after a quick a look at all his social media. Ten seconds of viewing on of his videos will show that he is knowledgeable about di…',
    url:
      'https://gizmodo.com/worlds-dumbest-bitcoin-scammer-tries-to-scam-bitcoin-ed-1837032058',
    urlToImage:
      'https://i.kinja-img.com/gawker-media/image/upload/s--uLIW_Oxp--/c_fill,fl_progressive,g_center,h_900,q_80,w_1600/s4us4gembzxlsjrkmnbi.png',
    publishedAt: '2019-08-07T16:30:00Z',
    content:
      'Ben Perrin is a Canadian cryptocurrency enthusiast and educator who hosts a bitcoin show on YouTube. This is immediately apparent after a quick a look at all his social media. Ten seconds of viewing on of his videos will show that he is knowledgeable about di… [+2329 chars]'
  };

  render() {
    let myData = '';

    if (this.context.user.address) {
      myData = (
        <aside className="myData">
          <h1>My District</h1>
          <p>
            <span className="bold">State:</span> {this.context.state}
          </p>
          <p>
            <span className="bold">District:</span> {this.context.district}
          </p>
          <p>
            <Link to="/voter-registration">
              Not registered to vote? Register here.
            </Link>
          </p>
        </aside>
      );
    }
    return (
      <div>
        {this.context.fetching ? (
          <Spinner />
        ) : (
          <section className="dashboard">
            <header>Dashboard</header>
            {myData}
            <RepresentativeList
              handleClickRepDetails={this.handleClickRepDetails}
            />
            <NewsList />
          </section>
        )}
      </div>
    );
  }
}
