import React, { useState } from "react";
import "./PasswordGenrator.css";

const checkBoxInputObj = [
  {
    lable: "A-Z",
    type: "upperCase",
  },
  {
    lable: "a-z",
    type: "lowerCase",
  },
  {
    lable: "0-9",
    type: "number",
  },
  {
    lable: "(!@#$%)",
    type: "specialChar",
  },
];

interface passwordTyps {
  upperCase: boolean;
  lowerCase: boolean;
  number: boolean;
  specialChar: boolean;
}

const Passwordgenrator = () => {
  const [passwordLength, setpasswordLength] = useState<number>(0);
  const [passWord, setPassWord] = useState("");
  const [passwordStrength, setPasswordStrength] = useState<
    "Weak" | "Medium" | "Strong" | ""
  >("");
  const [addInPassword, setaddInPassword] = useState<passwordTyps>({
    upperCase: false,
    lowerCase: false,
    number: false,
    specialChar: false,
  });

  const handleOnChange = (e: any) => {
    let { name, vlaue } = e.target;
    setaddInPassword((pre) => ({
      ...pre,
      [name as keyof passwordTyps]: !pre[name as keyof passwordTyps],
    }));
  };

  const genratePassword = () => {
    let upperCase = "AQWERTYUIOPSDFGHJKLZXCVBNM";
    let lowerCase = "zxcvbnmasdfghjklqwertyuiop";
    let number = "1234567890";
    let specialChar = "!@#$%^&*()";

    let charPool = "";
    if (addInPassword.upperCase) charPool += upperCase;
    if (addInPassword.lowerCase) charPool += lowerCase;
    if (addInPassword.number) charPool += number;
    if (addInPassword.specialChar) charPool += specialChar;

    if (charPool.length === 0) alert("Please select Passowrd Type");

    let tempPassword = "";
    for (let i = 0; i < passwordLength; i++) {
      let randomIndex = Math.floor(Math.random() * charPool.length);
      tempPassword += charPool[randomIndex];
    }
    setPassWord(tempPassword);
    calculateStrength(tempPassword);
  };

  const calculateStrength = (password: string) => {
    const length = password.length;
    const selectedTypes = Object.values(addInPassword).filter(Boolean).length;

    if (length === 0) setPasswordStrength("");
    else if (length < 8 || selectedTypes === 1) setPasswordStrength("Weak");
    else if (length >= 8 && selectedTypes === 2) setPasswordStrength("Medium");
    else if (length >= 10 && selectedTypes >= 3) setPasswordStrength("Strong");
    else setPasswordStrength("Medium");
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(passWord);
    alert("coped");
  };

  return (
    <div className="main_container">
      <div className="password_display_section">
        <div className="password_display">
          <label className="password_label">
            Password:
            <p
              className="generated_password"
              onCopy={(e) => {
                navigator.clipboard.writeText("fuck you bro");
              }}
            >
              {" "}
              {passWord || "password"}{" "}
            </p>
          </label>
        </div>
        <button
          disabled={passWord.length === 0}
          onClick={handleCopy}
          className="copy_btn"
        >
          Copy
        </button>
      </div>
      {passwordStrength && (
        <p
          className={`strength_label ${
            passwordStrength === "Weak"
              ? "weak"
              : passwordStrength === "Medium"
              ? "medium"
              : "strong"
          }`}
        >
          Strength: {passwordStrength}
        </p>
      )}

      <label className="slider_label">
        Password length: {passwordLength}
        <input
          value={passwordLength}
          onChange={(e) => setpasswordLength(+e.target.value)}
          type="range"
          min={4}
          max={18}
          className="slider_input"
        />
      </label>

      <div className="checkbox_section">
        {checkBoxInputObj?.map((labels, index) => {
          return (
            <label key={index} className="checkbox_label">
              <input
                type="checkbox"
                className="checkbox_input"
                checked={addInPassword[labels.type as keyof passwordTyps]}
                onChange={handleOnChange}
                name={labels.type}
              />
              {labels.lable}
            </label>
          );
        })}
      </div>

      <div className="generate_btn_container">
        <button
          disabled={passwordLength === 0}
          onClick={genratePassword}
          className="generate_btn"
        >
          Generate Password
        </button>
      </div>
    </div>
  );
};

export default Passwordgenrator;
