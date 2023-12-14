import React, { useState, useRef, ChangeEvent } from "react";
import { LuCamera } from "react-icons/lu";
import { Link } from "react-router-dom";

type AuthenticationFormProps = {
  text: string;
  extraInput: boolean;
  buttonText: string;
  linkText: string;
  linkUrl: string;

  onSubmit: (
    email: string,
    password: string,
    fullName?: string,
    file?: File
  ) => void;
};

export default function AuthenticationForm(props: AuthenticationFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const filePickerRef = useRef<HTMLInputElement>(null);

  const { onSubmit, buttonText, extraInput, text, linkText, linkUrl } = props;

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const reader = new FileReader();
    const selectedFile = event.target.files?.[0];

    if (selectedFile) {
      reader.readAsDataURL(selectedFile);
      reader.onload = () => {
        setPreview(reader.result as string);
        setFile(selectedFile);
      };
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit(email, password, fullName, file ?? undefined);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>{text}</h1>

      {extraInput && (
        <>
          {preview ? (
            <button
              tabIndex={0}
              aria-label="Change your profile picture"
              className="mx-auto my-[30px] flex"
              onClick={() => setPreview(null)}
            >
              <img
                src={preview}
                alt="Profile Preview"
                className="rounded-[50%] mx-auto w-[100px]"
              />
            </button>
          ) : (
            <div
              tabIndex={0}
              role="button"
              aria-label="Select your profile picture"
              className="mx-auto my-[30px]"
              onClick={() => filePickerRef.current?.click()}
            >
              <label htmlFor="fileupload" aria-hidden="true">
                <LuCamera />
              </label>
              <input
                type="file"
                name="file"
                id="fileupload"
                ref={filePickerRef}
                accept="image/jpeg, image/png"
                aria-label="Choose File"
                onChange={handleFileChange}
                hidden
              />
            </div>
          )}
          <div>
            <label htmlFor="fullName">Full Name</label>
            <input
              type="text"
              id="fullName"
              placeholder="Full Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>
        </>
      )}

      <div>
        <label htmlFor="email">Email Address</label>
        <input
          type="email"
          id="email"
          name="Email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      {extraInput && (
        <div>
          <label htmlFor="repeatPassword">Repeat Password</label>
          <input
            type="password"
            id="repeatPassword"
            placeholder="Repeat Password"
          />
        </div>
      )}
      <button type="submit">{buttonText}</button>

      <Link to={linkUrl}>{linkText}</Link>
    </form>
  );
}
