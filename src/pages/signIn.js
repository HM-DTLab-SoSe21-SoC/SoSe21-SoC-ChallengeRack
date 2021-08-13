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

  </form>
</div>
);
}
export default CustomSignIn;