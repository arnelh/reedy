import React from "react";
import SessionErrorItem from "./session_error_item";
import { StyledErrorUl } from "../../styles/session_form";

const SessionErrorWrapper = ({ errors }) => (
  <StyledErrorUl>
    {errors.map((error, idx) => (
      <SessionErrorItem key={"error" + idx} error={error} />
    ))}
  </StyledErrorUl>
);

export default SessionErrorWrapper;
