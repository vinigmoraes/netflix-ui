import { type } from "os";
import "./css/Header.css";

type HeaderProps = {
    isBlackHeaderActive: boolean
}


export function Header({isBlackHeaderActive}: HeaderProps) {
  return (
    <header className={isBlackHeaderActive ? 'black' : ''}>
      <div className="logo">
        <a href="">
          <img src="https://www.edigitalagency.com.au/wp-content/uploads/Netflix-logo-red-black-png.png" alt="Netflix"></img>
        </a>
      </div>
      <div className="user-profile">
        <a href="">
            <img src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png" alt="user-profile"></img>
        </a>
      </div>
    </header>
  );
}
