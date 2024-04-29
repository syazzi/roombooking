import Image from "next/image";
import loginImage from "../images/ubd-mosque.jpg";
import LoginForm from "../components/loginForm";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const Login = async () => {
  const session = await getServerSession();
  console.log(session);
  if(session){
    redirect("/");
  }
  return (
    <main className="login">
      <div className="login-container">
        <div className="flex-1">
          <div className="login-image">
            <Image
              src={loginImage}
              alt="UBD Mosque"
              quality={100}
              fill={true}
              sizes="50%"
              priority={false}
              style={{ objectFit: "cover"}}
            />
          </div>
        </div>
        <div className="flex-1">
          <h1 className="text-center">Login</h1>
          <LoginForm />
        </div>
        <p className="absolute z-10 login-caption">*Only For UBD</p>
      </div>
    </main>
  );
};

export default Login;
