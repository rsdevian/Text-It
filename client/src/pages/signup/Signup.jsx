import { useState } from 'react'
import { Link } from "react-router-dom";
import GenderCheckBox from "./GenderCheckBox";
import useSignup from '../../hooks/useSignup';
function Signup() {

    const [inputs, setInputs] = useState({
        fullName: '',
        username: '',
        password: '',
        confirmPassword: '',
        gender: ''
    })

    const {isLoading, signup} = useSignup()

    console.log(isLoading)
    function handleCheckboxChange (gender) {
        setInputs({...inputs, gender})
    }

    async function handleSubmit(e) {
        e.preventDefault();
        // console.log(inputs)
        await signup(inputs)
    }

  return (
    <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
        <div className="w-full p-6 rounder-lg shadow-md bg-grey-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
            <h1 className="text-3xl font-semibold text-center text-grey-300">
                Signup <span className="text-blue-500"> textIt</span>
            </h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label  className="label p-2">
                        <span className="text-base lebel-text">Full Name</span>
                    </label>
                    <input 
                        type="text" 
                        placeholder="John Doe"
                        className="w-full input input-bordered h-10"
                        value={inputs.fullName}
                        onChange={(e) => setInputs({ ...inputs, fullName: e.target.value})}
                    />
                </div>

                <div>
                    <label className="label p-2">
                        <span className="text-base label-text">Username</span>
                    </label>
                    <input 
                        type="text" 
                        placeholder="johndoe3" 
                        className="w-full input input-bordered h-10"
                        value={inputs.username}
                        onChange={(e) => setInputs({ ...inputs, username: e.target.value})}    
                    /> 
                </div>
                
                <div>
                    <label className="label p-2">
                        <span className="text-base label-text">Password</span>
                    </label>
                    <input 
                        type="password" 
                        placeholder="Enter Password" 
                        className="w-full input input-bordered h-10"
                        value={inputs.password}
                        onChange={(e) => setInputs({ ...inputs, password: e.target.value})}
                    /> 
                </div>

                <div>
                    <label className="label p-2">
                        <span className="text-base label-text">Confirm Password</span>
                    </label>
                    <input 
                        type="password" 
                        placeholder="Enter Password" 
                        className="w-full input input-bordered h-10"
                        value={inputs.confirmPassword}
                        onChange={(e) => setInputs({...inputs, confirmPassword: e.target.value})}
                    /> 
                </div>
            
                <GenderCheckBox onCheckboxChange={handleCheckboxChange} selectedGender={inputs.gender}/>

                <Link to={"/login"} className="text-sm hover:underline hover:text-blue-600 mt-2 inline-block"> Already Have an account?</Link>

                <div>
                      <button className="btn btn-block btn-sm mt-2" disabled={isLoading}>{isLoading ? <span className='laoding loading-spinner'></span>: "Signup"}</button>
                </div>
            </form>  
        </div>
    </div>
  )
}

export default Signup;


//starter code
/*function Signup() {
  return (
    <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
        <div className="w-full p-6 rounder-lg shadow-md bg-grey-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
            <h1 className="text-3xl font-semibold text-center text-grey-300">
                Signup <span className="text-blue-500"> textIt</span>
            </h1>
            <form>
                <div>
                    <label  className="label p-2">
                        <span className="text-base lebel-text">Full Name</span>
                    </label>
                    <input type="text" placeholder="John Doe" className="w-full input input-bordered h-10"/>
                </div>

                <div>
                    <label className="label p-2">
                        <span className="text-base label-text">Username</span>
                    </label>
                    <input type="text" placeholder="johndoe3" className="w-full input input-bordered h-10"/> 
                </div>
                
                <div>
                    <label className="label p-2">
                        <span className="text-base label-text">Password</span>
                    </label>
                    <input type="password" placeholder="Enter Password" className="w-full input input-bordered h-10"/> 
                </div>

                <div>
                    <label className="label p-2">
                        <span className="text-base label-text">Confirm Password</span>
                    </label>
                    <input type="password" placeholder="Enter Password" className="w-full input input-bordered h-10"/> 
                </div>
            
                <GenderCheckBox/>

                <a href="#" className="text-sm hover:underline hover:text-blue-600 mt-2 inline-block"> Already Have an account?</a>

                <div>
                      <button className="btn btn-block btn-sm mt-2">Signup</button>
                </div>
            </form> 
        </div>
    </div>
  )
}

export default Signup; */

