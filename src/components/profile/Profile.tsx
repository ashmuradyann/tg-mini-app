import { useEffect, useState } from "react";
import WebApp from "@twa-dev/sdk";
import clsx from "clsx";

import styles from "./profile.module.scss";

const Profile = () => {
  const [userData, setUserData] = useState<any>({});

  useEffect(() => {
    setUserData(WebApp?.initDataUnsafe);
  }, []);

  const openShareFriends = () => {
    WebApp.openTelegramLink(
      "https://t.me/share/url?url=https://t.me/muradyan7777_bot/muradyan_app&text=Поделитесь с друзьями и получите БОНУС!!!"
    );
  };

  return (
    <div className={clsx(styles.profile, "flex-column")}>
      <img
        src={`https://t.me/i/userpic/320/${userData?.user?.username}.jpg`}
        alt=""
      />
      {/* <p>{userData?.user?.username}</p> */}
      <div className={clsx(styles.user__data, "flex-center")}>
        <p>{userData?.user?.username}</p>
        {userData?.user?.is_premium && (
          <img
            className={styles.premium__img}
            src="https://t4.ftcdn.net/jpg/05/33/75/35/360_F_533753588_1krxEE0SDZWl0ZKd9cUzCL6HaTRo9UxK.jpg"
            alt="premium"
          />
        )}
      </div>
      <button className={styles.share__with_friends} onClick={openShareFriends}>
        Поделиться с друзьями
      </button>
    </div>
  );
};

export default Profile;
