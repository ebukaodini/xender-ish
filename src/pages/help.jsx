import React, { Component } from "react";
import Layout from "../components/layout";

class Help extends Component {
  state = {}

  render() {
    return (
      <Layout>
        <h1>Help</h1>
        <h2>Frequently Asked Questions</h2>
        <ul>
          <li>How does it work?</li>
          <li>Who can download my file?</li>
          <li>What about file security</li>
          <li>What is the max size of files that can be sent?</li>
        </ul>
      </Layout>
    );
  }
}

export default Help;