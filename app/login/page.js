'use client'
import Image from "next/image";
import loginImage from '../images/ubd-mosque.jpg'

const Login = () => {
  return (
    <main className="login">
      <div className="login-container">
        <div className="login-image">
            <Image src={loginImage} alt="UBD Mosque" quality={100} fill={true} style={{ objectFit: 'cover', objectPosition: '-115px' }}/>
        </div>
        <div></div>
        <div className="pe-16 pt-24 relative z-10 h-full">
          <h1 className="text-center pb-11">LOGIN</h1>
          <div className="pb-2">
            <input
            className="py-1 ps-1 rounded-sm border-1 border-gray-600"
              type="email"
              name="email"
              id="Email"
              placeholder="Email"
            />
          </div>
          <div className=" pt-2 pb-8">
            <input
            className="py-1 ps-1 rounded-sm border-1 border-gray-600"
              type="password"
              name="password"
              id="Password"
              placeholder="Password"
            />
          </div>
          <div className=" flex justify-center items-center">
            <button type="submit" className="w-2/3 "><p className="text-center bg-primary rounded-xl py-1">Login</p></button>
          </div>
          <div className="login-caption absolute bottom-0 right-0" >
            *only for UBD
          </div>
        </div>
        
      </div>
    </main>
  );
};

export default Login;
