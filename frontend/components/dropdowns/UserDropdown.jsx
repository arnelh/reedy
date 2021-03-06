import React from "react";
import {
  StyledDropdown,
  DropdownContent,
  DropdownButton,
  DropdownEmptyItem,
  Line,
  Bold,
} from "../../styles/dropdown";

class UserDropdown extends React.Component {
  handleClick(e) {
    e.stopPropagation();
  }

  render() {
    const { active, handleLogout, username } = this.props;

    return (
      <StyledDropdown active={active} onClick={this.handleClick}>
        <DropdownContent>
          <DropdownEmptyItem>
            Signed in as
            <br />
            <Bold>
              {username}
            </Bold>
          </DropdownEmptyItem>
          <Line />

          <DropdownButton onClick={handleLogout}>
            Log Out
          </DropdownButton>

        </DropdownContent>

      </StyledDropdown>
    );
  }
}

export default UserDropdown;
