import React from "react";
import { Route } from "react-router-dom";
import Transition from "../../utils/transition_util";
import { ArticleLoader } from "../../utils/loader_util";
import {
  ShortFeed,
  ShortFeedWrapper,
  SubscribeWrapper,
  ShortLine,
  SubscribeHeader,
} from "../../styles/feed";
import { enterFade } from "../../styles/transitions";
import ArticleList from "../articles/ArticleList";
import ArticleDetailContainer from "../articles/ArticleDetailContainer";
import FeedHeader from "../feeds/FeedHeader";
import { initializeComponent } from "../../utils/initialize_util";
import ErrorPage from "../misc/ErrorPage";
import { PageHeaderIcon } from "../../styles/theme";

class Subscriptions extends React.Component {
  constructor(props) {
    super(props);
    this.state = { initialLoad: true };
    this.renderSubArticles = this.renderSubArticles.bind(this);
  }

  componentDidMount() {
    this.props.resetCurrentFeed();
    initializeComponent(this.props);
  }

  render() {
    const { loading } = this.props;
    if (this.props.feedsWithArticles.length) {
      return (
        <Transition identifier={"subscriptions"} {...enterFade}>
          <SubscribeWrapper>
            <SubscribeHeader>
              <PageHeaderIcon className="fa fa-list-ul" />Subscriptions
            </SubscribeHeader>
            {this.renderSubArticles()}
            <Route
              path="/subscriptions/:feedId/articles/:articleId"
              render={() => (
                <ArticleDetailContainer redirectToParent="/subscriptions" />
              )}
            />
          </SubscribeWrapper>
        </Transition>
      );
    } else if (loading || this.state.initialLoad) {
      return <ArticleLoader />;
    } else if (!this.props.feedsWithArticles.length) {
      return (
        <ErrorPage>
          Oops! Looks like you have no subscriptions!
          <br /><br />
          Click below to add feeds:
        </ErrorPage>
      );
    } else {
    }
  }

  renderSubArticles() {
    return this.props.feedsWithArticles.map((articles, idx) => {
      const feed = this.props.feeds[articles[0].feedId];

      return (
        <ShortFeedWrapper key={`sub-article-group-${idx}`}>
          <ShortFeed>
            <FeedHeader feed={feed} notFeed />
            <ShortLine />
            <ArticleList
              imageOverride
              path="/subscriptions"
              articles={articles}
            />
          </ShortFeed>
        </ShortFeedWrapper>
      );
    });
  }
}

export default Subscriptions;
