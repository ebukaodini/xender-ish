import { Component } from "react";
import Sidebar from "./sidebar";
import '../scss/layout.scss';

class Layout extends Component {
  state = {}
  render() {
    return (
      <div>
        <Sidebar></Sidebar>

        <main className='layout'>
          
          <div className='main'>
            {this.props.children}
          </div>

        </main>
      </div>
    );
  }
}

export default Layout;