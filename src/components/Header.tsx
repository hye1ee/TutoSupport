import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { getCurrentUser, logOut, signInWithGoogle } from "../services/auth";
import { useEffect, useState } from "react";

interface UserInfo {
  name: string;
  profile: string | null;
}

export default function Header() {
  const navigate = useNavigate();
  const [user, setUser] = useState<UserInfo | null>(null);

  useEffect(() => {
    const prevUser = getCurrentUser();
    console.log("prevUser", prevUser);
    if (prevUser) {
      const name = prevUser.displayName;
      if (!name) logOut();
      else setUser({ name, profile: prevUser.photoURL });
    }
  }, []);

  return (
    <HeaderWrapper>
      <img
        style={{ width: "auto", height: "36px", cursor: "pointer" }}
        src="/images/Icon_logo.png"
        onClick={() => navigate("/")}
      />
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          gap: "8px",
          alignItems: "center",
        }}
      >
        <Bubble
          text={user ? `Welcome back, ${user.name}` : "Please Login First!"}
        />
        <img
          style={{ width: "auto", height: "40px" }}
          src={user?.profile ?? "/images/Icon_user.png"}
        />
        <BubbleBox
          style={{
            cursor: "pointer",
            marginLeft: "12px",
            backgroundColor: "#9D5C63",
            fontWeight: "bold",
          }}
          onClick={() => {
            if (user) {
              logOut();
              setUser(null);
            } else
              signInWithGoogle().then((newUser) => {
                if (newUser.displayName) {
                  setUser({
                    name: newUser.displayName,
                    profile: newUser.photoURL,
                  });
                }
              });
          }}
        >
          {user ? "Logout" : "Login"}
        </BubbleBox>
      </div>
    </HeaderWrapper>
  );
}

const Bubble = ({ text }: { text: string }) => {
  return (
    <BubbleWrapper>
      <BubbleBox className="gummy">{text}</BubbleBox>
      <img style={{ height: "14px" }} src="/images/bubble_tri.png" />
    </BubbleWrapper>
  );
};

const BubbleWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const BubbleBox = styled.div`
  width: fit-content;
  height: 34px;

  box-sizing: border-box;
  padding: 0px 16px;

  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;

  font-size: 15px;

  color: white;
  background-color: #584a54;
`;

const HeaderWrapper = styled.div`
  width: 100%;
  height: 60px;
  flex: 0 0 auto;

  box-sizing: border-box;
  padding: 0px 36px;

  /* border-bottom: 1px solid gray; */

  display: flex;
  flex-direction: row;
  align-items: flex-end;
  justify-content: space-between;
`;
