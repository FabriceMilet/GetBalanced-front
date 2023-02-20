import './SignUp.scss';
import { useState } from "react";
import { useDispatch } from "react-redux";
// import { createUser } from "./user.slice";

// const SignupForm = () => {
//   const dispatch = useDispatch();
//   const [formData, setFormData] = useState({
//     username: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//   });
// }

//   const handleChange = (event) => {
//     const { name, value } = event.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     if (formData.password !== formData.confirmPassword) {
//       alert("Les mots de passe ne correspondent pas");
//     } else {
//       dispatch(createUser(formData));
//     }
//   };

function SignUp() {
    return (
      <form  className='SignUp' onSubmit={handleSubmit}>
        <label>
          Prénom :
          <input type="text" name="firstname" value={formData.firstname} onChange={handleChange} />
        </label>
        <label>
          Nom :
          <input type="text" name="lastname" value={formData.lastname} onChange={handleChange} />
        </label>
        <label>
          Email:
          <input type="email" name="email" value={formData.email} onChange={handleChange} />
        </label>
        <label>
          Mot de passe:
          <input type="password" name="password" value={formData.password} onChange={handleChange} />
        </label>
        <label>
          Confirmation du mot de passe :
          <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} />
        </label>
        <button type="submit">S'enregistrer</button>
      </form>
    );
}

export default SignUp;
