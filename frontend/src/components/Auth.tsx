import { useState } from "react";
import { type SignUpType } from "@imran.techvoyager/common-package";
import { useNavigate, Link } from "react-router-dom"
import axios from "axios";
import { BACKEND_URL } from "../config";


const Auth = ({ type }: { type: "signup" | "signin" }) => {
    const navigate = useNavigate();
    const [postInput, setPostInput] = useState<SignUpType>({
        name: "",
        email: "",
        password: ""
    });

    async function sendRequest(){
        try {
         const response = await axios.post(`${BACKEND_URL}/api/v1/user/${type === "signup" ? "signup" : "signin"}`, postInput);
         const jwt = response.data;
         localStorage.setItem("token", jwt);
         navigate("/blogs");
        } catch (error) {
            alert("Error while signing up");  
        }
    }
  return <div className="h-screen flex justify-center flex-col">
    <div className="flex justify-center">
      <div>
        <div className="px-10">
           <div className="text-3xl font-extrabold">
               Create an account 
           </div>
           <div>
            {type === "signin" ? "dont have an account?" : "already have an account?"}
            <Link className="pl-2 underline" to={type === "signin" ? "/signup" : "/signin"}>
               {type === "signin" ? "Sign Up" : "Sign In"}
            </Link>
           </div>
        </div>
          <div className="pt-8">
              {type === "signup" ? <LabelledInput label="Name" placeholder="Enter your name" onChange={(e) => {
                 setPostInput({
                        ...postInput,
                        name: e.target.value
                 })
              }} /> : null}
              <LabelledInput label="Email" placeholder="Enter your email" onChange={(e) => {
                    setPostInput({
                        ...postInput,
                        email: e.target.value
                    })
              }} />
              <LabelledInput label="password" type={"password"} placeholder="Enter your password" onChange={(e) => {
                    setPostInput({
                        ...postInput,
                        password: e.target.value
                    })
              }} />
              <button onClick={sendRequest} type="button" className="mt-8 w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">{type === 'signup'? 'signup' : 'signin'}</button>
          </div>
       </div>
     </div>
  </div>
}

interface LabelledInputType {
    label: string;
    placeholder: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    type?: string;
}

function LabelledInput({label, placeholder, onChange, type}: LabelledInputType){
    return <div>
        <label className="block mb-2 text-sm text-black font-semibold pt-4">{label}</label>
        <input type={type || "text"} placeholder={placeholder} onChange={onChange} required 
               className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
    </div>
}

export default Auth;
