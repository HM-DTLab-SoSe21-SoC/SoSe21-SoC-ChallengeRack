import React, { useState } from "react";
import {Auth} from 'aws-amplify';
const CustomSignIn = (props) => {
      const {authState, onStateChange} = props;
      const [formData, setFormData] = useState({
            username: '',
            password: '',
            code: ''
});
const handleInputChange = e => {
   const {value, dataset} = e.target;
   const {prop} = dataset;
   setFormData({
      ...formData,
     [prop]: value
  });
};
const signInClick = async () => {
      try{
         await Auth.signIn(formData.username, formData.password);
         onStateChange(authState);
      }
     catch(error){
        console.log(error);
     }
}
return (
  <div> 
    <form>
       <div>
         <label htmlFor="username"> Username</label>
         <input data-prop={'username'} onChange={handleInputChange} type="text" placeholder="Username"/>
      </div>
     <div>
        <label htmlFor="password">Password</label>
        <input data-prop={'password'} onChange={handleInputChange} type="password" placeholder="******************"/>
        <p> Forgot your password?{" "}<a onClick={() => onStateChange("forgotPassword")}>Reset Password</a></p>
    </div>
    <div>
      <button type="button" onClick={() => signInClick()}>Login</button>
      <p> No Account?{" "}<a onClick={() => onStateChange("signUp")}> Create account</a></p>
   </div>
  </form>
</div>
);
}
export default CustomSignIn;