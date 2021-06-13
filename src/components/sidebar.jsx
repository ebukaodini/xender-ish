// import { faAd, faFile, faHome, faImage, faMusic, faPlane, faPlay } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import XenderLogo from '../assets/imgs/logo.png';
import '../scss/sidebar.scss';
import { HelpCircle, Upload, Download } from 'react-feather';

function Sidebar() {

  let pathname = window.location.pathname;

  return (
    <nav className='sidebar'>
      <ul>
        <div>
          <li>
            <Link className='brandlogo' to='/'>
              <img src={XenderLogo} alt="XenderIsh Logo" />
              <small className='label brandlabel'>Xender<i>-ish</i></small>
            </Link>
          </li>
          <div>
            <li>
              <Link to='/upload' className={`${(pathname === '/upload' || pathname === '/') && 'active'}`}>
                <Upload />
                <small className='label'>Upload</small>
              </Link>
            </li>
            <li>
              <Link to='/download' className={`${pathname === '/download' && 'active'}`}>
                <Download />
                <small className='label'>Download</small>
              </Link>
            </li>
          </div>
        </div>
        <li>
          <Link to='/help' className={`${pathname === '/help' && 'active'}`}>
            <HelpCircle />
            <small className='label'>Help</small>
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Sidebar;