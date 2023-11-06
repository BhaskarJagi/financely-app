import React, { useState } from "react";
import "./styles.css";
import Input from "../Input";
import Button from "../Button";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { auth, db, provider } from "../../firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function SignupSignin() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [loginForm, setLoginForm] = useState(false);
  const navigate = useNavigate();

  function signupWithEmail() {
    //Authenticate the user or basically create a new account using email and password

    console.log(name);
    console.log(email);
    console.log(password);
    console.log(confirmPassword);

    setLoading(true);
    if (name != "" && email != "" && password != "" && confirmPassword != "") {
      if (password == confirmPassword) {
        createUserWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            console.log("User>>>", user);
            toast.success("User Created!");
            setLoading(false);
            setConfirmPassword("");
            setEmail("");
            setName("");
            setPassword("");
            // Create a doc with user id as the following id
            createDoc(user);
            navigate("/Dashboard");
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            toast.error(errorMessage);
            setLoading(false);
            // ..
          });
      } else {
        toast.error("Password and confirm Password doesn't match!");
        setLoading(false);
      }
    } else {
      toast.error("All fields are mandatory!");
      setLoading(false);
    }
  }

  function loginUsingEmail() {
    console.log(email);
    console.log(password);

    setLoading(true);
    if (email != "" && password != "") {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          console.log(user);
          toast.success("Login Successfull!");
          setLoading(false);
          setEmail("");
          setPassword("");
          navigate("/Dashboard");
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setLoading(false);

          toast.error(errorMessage);
        });
    } else {
      setLoading(false);
      toast.error("All fields are mandatory!");
    }
  }

  async function createDoc(user) {
    setLoading(true);
    //Make sure that doc with uid doesn't exist
    //Create a Doc
    if (!user) return;

    const userRef = doc(db, "users", user.uid);
    const userData = await getDoc(userRef);
    if (!userData.exists()) {
      try {
        await setDoc(doc(db, "users", user.uid), {
          name: user.displayName ? user.displayName : name,
          email,
          photoURL: user.photoURL ? user.photoURL : "",
          createdAt: new Date(),
        });
        toast.success("Doc created");
      } catch (e) {
        toast.error(e.message);
        setLoading(false);
      }
    } else {
      // console.log(userData)
      // toast.error("Doc already exists!");
      setLoading(false);
    }
  }

  function googleAuth() {
    setLoading(true);
    try {
      signInWithPopup(auth, provider)
        .then((result) => {
          // This gives you a Google Access Token. You can use it to access the Google API.
          const credential = GoogleAuthProvider.credentialFromResult(result);
          const token = credential.accessToken;
          // The signed-in user info.
          const user = result.user;
          toast.success("User Authenticated")
          createDoc(user)
          navigate("/dashboard")
          setLoading(false)
          // IdP data available using getAdditionalUserInfo(result)
          // ...
          console.log("user>>>", user);
        })
        .catch((error) => {
          // Handle Errors here.
          const errorCode = error.code;
          const errorMessage = error.message;
          toast.error(errorMessage)
          // The email of the user's account used.
          const email = error.customData.email;
          // The AuthCredential type that was used.
          const credential = GoogleAuthProvider.credentialFromError(error);
          // ...
          setLoading(false)
        });
    } catch (e) {
      toast.error(e.message);
      setLoading(false)
    }
  }

  return (
    <>
      {loginForm ? (
        <div className="signup-wrapper">
          <h2 className="title">
            Login on <span style={{ color: "var(--theme)" }}>Financely</span>
          </h2>
          <form>
            <Input
              label={"Email"}
              state={email}
              setState={setEmail}
              placeholder={"JohnDoe@gmail.com"}
            />
            <Input
              type={"password"}
              label={"Password"}
              state={password}
              setState={setPassword}
              placeholder={"Example@123"}
            />
            <Button
              disabled={loading}
              text={loading ? "Loading..." : "Login using Email and Password"}
              onClick={loginUsingEmail}
            />
            <p style={{ textAlign: "center", margin: 0 }}>or</p>
            <Button
              disabled={loading}
              text={loading ? "Loading..." : "Login using Google"}
              blue={true}
              onClick={googleAuth}
            />
            <p className="p-login" onClick={() => setLoginForm(!loginForm)}>
              Or Don't have an account? Click Here
            </p>
          </form>
        </div>
      ) : (
        <div className="signup-wrapper">
          <h2 className="title">
            Sign Up on <span style={{ color: "var(--theme)" }}>Financely</span>
          </h2>
          <form>
            <Input
              label={"full Name"}
              state={name}
              setState={setName}
              placeholder={"John Doe"}
            />
            <Input
              label={"Email"}
              state={email}
              setState={setEmail}
              placeholder={"JohnDoe@gmail.com"}
            />
            <Input
              type={"password"}
              label={"Password"}
              state={password}
              setState={setPassword}
              placeholder={"Example@123"}
            />
            <Input
              type={"password"}
              label={"Confirm Password"}
              state={confirmPassword}
              setState={setConfirmPassword}
              placeholder={"Example@123"}
            />
            <Button
              disabled={loading}
              text={loading ? "Loading..." : "Signup using Email and Password"}
              onClick={signupWithEmail}
            />
            <p style={{ textAlign: "center", margin: 0 }}>or</p>
            <Button
              disabled={loading}
              text={loading ? "Loading..." : "Signup using Google"}
              blue={true}
              onClick={googleAuth}
            />
            <p className="p-login" onClick={() => setLoginForm(!loginForm)}>
              Or Already have an account? Click Here
            </p>
          </form>
        </div>
      )}
    </>
  );
}

export default SignupSignin;
