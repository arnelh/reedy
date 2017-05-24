import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { closeAllDropdowns } from "../../actions/dropdown_actions";
import { toggleArticleModal } from "../../actions/modal_actions";
import { anyDropdownActive } from "../../selectors/dropdown_selectors";
import { fetchAllCollections } from "../../actions/collection_actions";
import { allCollections } from "../../selectors/collection_selectors";

import MainPage from "./MainPage";

const mapStateToProps = state => ({
  anyDropdownActive: anyDropdownActive(state),
  loading: state.loading.loadingSession,
  articleModal: state.modal.articleModal,
  collections: allCollections(state),
});

const mapDispatchToProps = dispatch => ({
  closeAllDropdowns: () => dispatch(closeAllDropdowns()),
  toggleArticleModal: () => dispatch(toggleArticleModal()),
  fetchAllCollections: () => dispatch(fetchAllCollections()),
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(MainPage)
);
