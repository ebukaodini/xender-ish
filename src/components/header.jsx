import { faPowerOff, faWifi } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import '../scss/header.scss'

function Header(props) {

  return (
    <header className='header'>
      <div className='page_specific_buttons'>
        {props.pageButtons}
      </div>
      <div className='general_buttons'>
        <button className='btn_connection_mode' title='Connection Mode'>
          <FontAwesomeIcon size='lg' icon={faWifi}></FontAwesomeIcon>
        </button>
        <button className='btn_logout' title='Logout'>
          <FontAwesomeIcon size='lg'  icon={faPowerOff}></FontAwesomeIcon>
        </button>
      </div>
    </header>
  );
}

export default Header;