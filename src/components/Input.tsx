import React, { forwardRef } from "react";
import PropTypes from "prop-types";

interface CustomInputProps {
  style?: React.CSSProperties;
  value?: string;
  placeholder?: string;
  suffix?: React.ReactNode;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  multiline?: boolean;
  autoSize?: boolean;
}

const CustomInput = forwardRef<HTMLTextAreaElement, CustomInputProps>(
  (
    { style, value, placeholder, suffix, onChange, multiline, autoSize },
    ref,
  ) => {
    const inputStyle: React.CSSProperties = {
      backgroundColor: "transparent",
      border: "1px solid #d9d9d9",
      borderRadius: "4px",
      padding: "8px",
      width: "100%",
      resize: "none",
      display: "flex",
      alignItems: "center",
      ...style,
    };

    return (
      <div
        style={{ position: "relative", display: "flex", alignItems: "center" }}
      >
        <textarea
          ref={ref}
          style={{ ...inputStyle, height: autoSize ? "auto" : "initial" }}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
          rows={autoSize ? undefined : 3}
        />
        {suffix && (
          <span style={{ position: "absolute", right: 8 }}>{suffix}</span>
        )}
      </div>
    );
  },
);

CustomInput.propTypes = {
  style: PropTypes.object,
  value: PropTypes.string,
  placeholder: PropTypes.string,
  suffix: PropTypes.node,
  onChange: PropTypes.func,
  multiline: PropTypes.bool,
  autoSize: PropTypes.bool,
};

CustomInput.defaultProps = {
  style: {},
  value: "",
  placeholder: "Enter text",
  suffix: null,
  onChange: () => {},
  multiline: false,
  autoSize: false,
};

export default CustomInput;
