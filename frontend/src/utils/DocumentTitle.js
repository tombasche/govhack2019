import React, { Component } from "react";

class DocumentTitle extends Component {
  setDocumentTitle = title => {
    if (title) {
      document.title = title + " | " + window.appTitle;
    } else {
      document.title = window.appTitle;
    }
  };

  componentDidMount = () => {
    // Get the document title as found in the original page (i.e. as defined
    // in index.html) and cache it as a window property.
    // We cache against the window so that even if this component is destroyed
    // we can still use the original title.
    if (!window.appTitle) {
      window.appTitle = document.title;
    }
    this.setDocumentTitle(this.props.title);
  };

  componentWillReceiveProps = nextProps => {
    if (nextProps.title) {
      this.setDocumentTitle(nextProps.title);
    }
  };

  componentWillUnmount = () => {
    this.setDocumentTitle();
  };

  render() {
    return (
      <span>
        {this.props.children}
      </span>
    );
  }
}

export default DocumentTitle;
