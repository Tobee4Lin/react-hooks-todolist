import React, { useState } from 'react';
import { Tag } from 'antd';

const { CheckableTag } = Tag;

class MyTag extends React.Component {
  state = { checked: true };

  componentDidMount() {
    const { isChecked } = this.props;
    this.setState({
      checked: isChecked
    })
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const { isChecked } = nextProps;
    this.setState({
      checked: isChecked
    })
  }

  handleChange = checked => {
    this.setState({ checked });
  };

  render() {
    return (
      <CheckableTag {...this.props} checked={this.state.checked} onChange={this.handleChange} />
    );
  }
}

export default MyTag