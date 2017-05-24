import React from "react";
import {
  DropdownContent,
  StyledCreateInput,
  StyledDropdownSubmitButton,
  StyledDropdownCancelButton,
  ButtonContainer,
  DropdownEmptyItem,
} from "../../styles/dropdown";

class FollowFeedCreateCollection extends React.Component {
  constructor(props) {
    super(props);

    this.state = { inputVal: "" };
    this.update = this.update.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCancelClick = this.handleCancelClick.bind(this);
  }

  handleCancelClick(e) {
    const { cancelClick } = this.props;
    this.setState({ inputVal: "" });
    cancelClick();
  }

  handleSubmit(e) {
    const { feedId, createCollection } = this.props;
    const { inputVal } = this.state;
    e.preventDefault();
    createCollection(inputVal, feedId);
  }

  update(e) {
    e.preventDefault();
    this.setState({ inputVal: e.currentTarget.value });
  }

  render() {
    const { inputVal } = this.state;

    return (
      <DropdownContent>
        <form onSubmit={this.handleSubmit}>
          <DropdownEmptyItem>
            <StyledCreateInput value={inputVal} onChange={this.update} />
          </DropdownEmptyItem>
          <ButtonContainer>
            <StyledDropdownSubmitButton type="submit">
              CREATE
            </StyledDropdownSubmitButton>
            <StyledDropdownCancelButton
              onClick={this.handleCancelClick}
              type="button"
            >
              CANCEL
            </StyledDropdownCancelButton>
          </ButtonContainer>
        </form>
      </DropdownContent>
    );
  }
}

export default FollowFeedCreateCollection;