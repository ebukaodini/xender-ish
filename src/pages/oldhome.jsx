import React, { Component } from "react";
import Layout from "../components/layout";
import phoneImg from '../assets/imgs/phone_img.png';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFile, faImage, faMusic, faPlay } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import '../scss/oldhome.scss';
import { getDevice, getDeviceStorageDetails } from "../lib/device";

class Home extends Component {
  state = {
    deviceOS: '',
    totalStorageSpace: 262144,
    usedStorageSpace: 100024
  }

  async componentDidMount() {
    await getDevice().then(device => {
      this.setState({deviceOS: device});
    });
    
    getDeviceStorageDetails().then((details) => {
      // this.setState({ totalStorageSpace: (details.totalStorageSpace / 1048576), usedStorageSpace: (details.usedStorageSpace / 1048576) });
    })
  }

  render() {

    return (
      <Layout>
        <section className='home_page'>

          <div>

            <div className='device_img'>
              <img src={phoneImg} alt="Device_Image" />
            </div>

            <div className='device'>

              <div className='device_info'>
                <span className='device_name'>ebuka's pc</span>
                <span className='device_os'>{this.state.deviceOS}</span>
              </div>

              <div className='device_quicklinks'>
                <div className='device_quicklink'>
                  <Link to='/pictures' className='pictures_quicklink'>
                    <FontAwesomeIcon size={'3x'} icon={faImage}></FontAwesomeIcon>
                  </Link>
                  <span >91</span>
                </div>

                <div className='device_quicklink'>
                  <Link to='/videos' className='videos_quicklink'>
                    <FontAwesomeIcon size={'3x'} icon={faPlay}></FontAwesomeIcon>
                  </Link>
                  <span >91</span>
                </div>
              </div>

              <div className='device_quicklinks'>
                <div className='device_quicklink'>
                  <Link to='/audios' className='audios_quicklink'>
                    <FontAwesomeIcon size={'3x'} icon={faMusic}></FontAwesomeIcon>
                  </Link>
                  <span >91</span>
                </div>

                <div className='device_quicklink'>
                  <Link to='/documents' className='documents_quicklink'>
                    <FontAwesomeIcon size={'3x'} icon={faFile}></FontAwesomeIcon>
                  </Link>
                  <span >91</span>
                </div>
              </div>

              <div className='device_storage_details'>

                <div className='device_storage_progress_bar' title={`${Math.round((this.state.usedStorageSpace / this.state.totalStorageSpace) * 100)}%`}>

                  <div className='device_storage_progress' style={{
                    width: `${Math.round((this.state.usedStorageSpace / this.state.totalStorageSpace) * 100)}%`
                  }}>&nbsp;
                  </div>

                  <div className='device_used_percentage'>

                    {`Internal Storage: ${Math.round(this.state.usedStorageSpace / 1024)}GB / ${Math.round(this.state.totalStorageSpace / 1024)}GB`}

                  </div>

                </div>

              </div>
            </div>
          </div>

        </section>
      </Layout>
    );
  }
}

export default Home;