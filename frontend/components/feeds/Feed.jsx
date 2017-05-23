import React from "react";
import Transition from "../../utils/transition_util";
import { Route } from "react-router-dom";
import { fade } from "../../styles/transitions";
import ArticleList from "../articles/ArticleList";
import { scrollMainContentWrapperToTop } from "../../utils/scroll_util";
import { StyledFeedWrapper } from "../../styles/feed";
import FeedHeader from "./FeedHeader";
import ArticleDetailContainer from "../articles/ArticleDetailContainer";

class Feed extends React.Component {
  componentDidMount() {
    scrollMainContentWrapperToTop();
    const { feedId, fetchArticlesFromFeed, fetchFeed } = this.props;

    fetchFeed(feedId);
    fetchArticlesFromFeed(feedId);
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
  }

  render() {
    const { feed, articles, match } = this.props;
    console.log(feed);
    if (feed) {
      return (
        <Transition identifier={"article-list"} {...fade}>
          <StyledFeedWrapper>
            <FeedHeader feed={feed} />
            <ArticleList path="/feeds" articles={articles} />
          </StyledFeedWrapper>
          <Route
            path="/feeds/:feedId/articles/:articleId"
            render={() => (
              <ArticleDetailContainer redirectToParent={match.url} />
            )}
          />
        </Transition>
      );
    } else {
      return null;
    }
  }
}

export default Feed;