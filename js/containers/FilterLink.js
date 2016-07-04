import React from 'react';
import { connect } from 'react-redux';
import { setVisibilityFilter } from '../index';
import { Link } from './Link';



const mapStateToLinkProps = (state, ownProps) => ({
  active: ownProps.filter === state.visibilityFilter
});

const mapDispatchToLinkProps = (dispatch, ownProps) => ({
  onClick: () => {
    dispatch(setVisibilityFilter(ownProps.filter));
  }
});

export const FilterLink = connect(
  mapStateToLinkProps,
  mapDispatchToLinkProps
)(Link);
