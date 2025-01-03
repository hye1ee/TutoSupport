import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import { ConfigProvider } from "antd";

export default function Root() {
  return (
    <ConfigProvider
      theme={{
        token: {
          // primary button
          colorPrimary: "#584A54",

          // default button
          colorBgContainer: "#FEF5EF",
          colorBorder: undefined,
          colorBorderSecondary: undefined,

          // text button
          colorFillTertiary: "#FEF5EF", // hover color
          colorFill: "#E3BB97", // press color

          // font
          fontFamily: "Nunito",
        },
        components: {
          Button: {
            // primary button
            primaryShadow: "none",
            fontSize: 11,
            fontWeight: 600,
            fontFamily: "Sour Gummy",
          },
          Input: {
            borderRadius: 20,
          },
          Select: {
            fontSize: 10,
            fontFamily: "Nunito",
            optionFontSize: 10,
            optionHeight: 20,
          },
        },
      }}
    >
      <div id="layout">
        <Header />

        <div id="detail">
          <Outlet />
        </div>
      </div>
    </ConfigProvider>
  );
}
