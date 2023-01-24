import React from "react";
import "./Auth.css";
import * as Yup from "yup";
import { useFormik } from "formik";
import Logo from "../../Image/11.png";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logIn, signUp } from "../../Actions/authAction";
import { useForm } from "react-hook-form";
import { toast, Toaster } from "react-hot-toast";
const Auth = () => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.authReducer.loading);
  const [isSignUp, setisSignUp] = useState(true);
  console.log(loading);
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    userName: "",
    password: "",
    confirmpassword: "",
  });
  const [confPass, setConfPass] = useState(true);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const ValidationObject = isSignUp
    ? Yup.object({
        firstname: Yup.string().required("firstname Required"),
        lastname: Yup.string().required("lastname required"),
        username: Yup.string().required("username required"),
        password: Yup.string()
          .required("please enter password")
          .min(6, "password atleast 6 numbers"),
        confirmpassword: Yup.string()
          .required("please confirm password")
          .oneOf(
            [Yup.ref("password"), null],
            "password must be same as abouve"
          ),
      })
    : Yup.object({
        username: Yup.string().required("This field is Required"),
        password: Yup.string()
          .required("Wrong password")
          .min(6, "password atleaste 6 numbers"),
      });
  const ValidationSchema = ValidationObject;
  const initalvalue = isSignUp
    ? {
        firstname: "",
        lastname: "",
        username: "",
        password: "",
        confirmpassword: "",
      }
    : { username: "", password: "" };
  const formik = useFormik({
    initialValues: initalvalue,
    onSubmit: async (values) => {
      console.log(values, "submitted");

      if (isSignUp) {
        values.password === values.confirmpassword
          ? dispatch(signUp(values))
          : setConfPass(false);
        toast.success("Account Created Sucessfully");
      } else {
        dispatch(logIn(values));
        toast.success("Logged In Sucessfully");
      }
    },
    validationSchema: ValidationSchema,
  });
  console.log("form values", formik.values);

  const resetFrom = () => {
    setConfPass(true);
    setData({
      firstname: "",
      lastname: "",
      username: "",
      password: "",
      confirmpassword: "",
    });
  };
  console.log(formik.errors);
  return (
    <div className="Auth">
      {/* Left Side */}

      <div className="a-left">
        <img src={Logo} alt="" />
        <div className="Webname">
          <h1>Whistle-Blower</h1>
          <h6>Connect, Maintain, Socialize</h6>
        </div>
      </div>

      {/* Right Side */}

      <div className="a-right">
        <form className="infoForm authForm" onSubmit={formik.handleSubmit}>
          <h3>{isSignUp ? "Sign Up" : "Sign in"}</h3>
          <Toaster />
          {isSignUp && (
            <>
              <div>
                <input
                  type="text"
                  placeholder="First Name"
                  className="infoInput"
                  name="firstname"
                  // onChange={handleChange}
                  // value={data.firstname}
                  onChange={formik.handleChange}
                  value={formik.values.firstname}
                  onBlur={formik.handleBlur}
                />

                <input
                  type="text"
                  placeholder="Last Name"
                  className="infoInput"
                  name="lastname"
                  onChange={formik.handleChange}
                  value={formik.values.lastname}
                  onBlur={formik.handleBlur}
                />
              </div>
              
                <div className="flex" style={{display:'flex',justifyContent:'space-around',height:'0.1rem'}}>
                  <label className="validate">
                    {formik.errors.firstname && formik.errors.firstname}
                  </label>
                  <label className="validate">
                    {formik.touched.lastname && formik.errors.lastname}
                  </label>
                </div>
       
            </>
          )}

          <div>
            <input
              type="text"
              placeholder="Username"
              className="infoInput"
              name="username"
              onChange={formik.handleChange}
              value={formik.values.username}
              onBlur={formik.handleBlur}
            />
          </div>
            <div  style={{display:'flex',justifyContent:'center',height:".1rem"}}>
                  <label className="validate">
                    {formik.touched.username && formik.errors.username}
                  </label>
                </div>

          <div>
            <input
              type="password"
              placeholder="Password"
              className="infoInput"
              name="password"
              onChange={formik.handleChange}
              value={formik.values.password}
              onBlur={formik.handleBlur}
            />
            {isSignUp && (
              <input
                type="password"
                placeholder="Confirm Password"
                className="infoInput"
                name="confirmpassword"
                onChange={formik.handleChange}
                value={formik.values.confirmpassword}
                onBlur={formik.handleBlur}
              />
            )}
            
          </div>
         
                <div className="flex" style={{display:'flex',justifyContent:'space-around',height:'0.1rem'}}>
                  <label className="validate">
                    {formik.errors.password && formik.errors.password}
                  </label>
                 
                </div>
           

          <span
            style={{
              display: confPass ? "none" : "block",
              color: "red",
              fontSize: "12px",
              alignSelf: "flex-end",
              marginRight: "5px",
            }}
          >
            Password not Matching..!
          </span>

          <div>
            <span
              style={{ fontSize: "12px", cursor: "pointer" }}
              onClick={() => {
                setisSignUp((prev) => !prev);
                resetFrom();
              }}
            >
              {isSignUp
                ? "Already have an Account..!   Login Now"
                : "Dont have an Account..!   SignUp Now"}
            </span>
          </div>
          <button className="button infoButton" type="submit">
            {isSignUp ? "Sign Up" : "Sign in"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Auth;
