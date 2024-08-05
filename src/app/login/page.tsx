"use client";

import { UsersService } from "@/services/api/users-service";
import { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { baseThemes } from "@/configs/themes";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import useAuth from "@/hooks/use-auth";
import Loading from "../loading";
import logo from "/public/images/logo.png";
import Image from "next/image";
import ThemeProvider from "../(layout)/theme-provider";
import { useUserStore } from "@/services/zustand/user-store";
import "./style.css";

export default function Login() {
  const { user, isAuthenticating } = useAuth();
  const router = useRouter();
  const { setUser } = useUserStore();
  const [isLoading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<{
    email: string;
    password: string;
  }>();

  useEffect(() => {
    if (user) {
      router.push("/");
    }
  }, [user, router]);

  const login: SubmitHandler<{ email: string; password: string }> = async (
    input
  ) => {
    setLoading(true);
    const response = await UsersService.Login(input.email, input.password);
    if (response.status === "fail") {
      handleError(response.error);
    }
    if (response.status === "success") {
      setUser(response.data);
      router.push("/");
      router.refresh();
    }
    setLoading(false);
  };

  const handleError = (error: string) => {
    if (error.includes("email")) {
      setError("email", {
        message: "Email not found",
      });
    }
    if (error.includes("password")) {
      setError("password", {
        message: "Password is incorrect",
      });
    }
  };

  if (isAuthenticating) return <Loading />;

  return (
    <ThemeProvider>
      <div id="slider">
        <div className="bolaMov1"></div>
        <div className="bolaMov2"></div>
        <div className="bolaMov3"></div>
        <div className="bolaMov4"></div>
        <div className="bolaMov5"></div>

        <Image
          src={logo.src}
          width={200}
          height={50}
          alt="logo"
          className="mt-[25px] ml-[40px]"
        />

        <form
          onSubmit={handleSubmit(login)}
          style={{
            marginLeft: "calc((100% - 450px)/2)",
            top: "50%",
            transform: "translateY(-50%)",
            color: baseThemes["LIGHT"].layoutColors.BASE,
          }}
          className="flex flex-col gap-[25px] items-center w-[450px] bg-[#272a33] m-auto absolute
                    rounded-lg shadow-2xl z-[100] px-[50px] pt-[40px] py-[100px]"
        >
          <div
            className={`w-full text-[2rem] font-semibold text-center text-[#fff] pb-[20px]`}
          >
            Welcome to Projectrol
          </div>
          <div className="w-full flex flex-col">
            <div className="w-full text-[#fff] text-[0.9rem] font-semibold mb-[10px]">
              Email address
            </div>
            <div className="w-full">
              <input
                defaultValue="hoangvule101@gmail.com"
                {...register("email", {
                  required: {
                    value: true,
                    message: "Email is missing",
                  },
                  pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: "Invalid email format",
                  },
                })}
                placeholder="abc@xyz.com"
                className={clsx(
                  {
                    "w-full border-solid border-[2px] outline-none rounded-md px-[10px] py-[8px] text-[0.85rem] ":
                      true,
                  },
                  {
                    "focus:border-[--btn-ok-bg]": !errors.email,
                  },
                  {
                    "border-[--btn-delete-bg]": errors.email,
                  }
                )}
              />
              {errors.email && (
                <div className="w-full text-[0.8rem] font-semibold text-[--btn-delete-bg] pt-[5px] pl-[2px]">
                  {errors.email.message}
                </div>
              )}
            </div>
          </div>
          <div className="w-full flex flex-col">
            <div className="w-full text-[#fff] text-[0.9rem] font-semibold mb-[10px]">
              Password
            </div>
            <div className="w-full">
              <input
                defaultValue="12345"
                {...register("password", {
                  required: {
                    value: true,
                    message: "Password is missing",
                  },
                })}
                placeholder="Enter your password"
                type="password"
                className={clsx(
                  {
                    "w-full border-solid border-[2px] outline-none rounded-md px-[10px] py-[8px] text-[0.85rem] ":
                      true,
                  },
                  {
                    "focus:border-[--btn-ok-bg]": !errors.password,
                  },
                  {
                    "border-[--btn-delete-bg]": errors.password,
                  }
                )}
              />
              {errors.password && (
                <div className="w-full text-[0.8rem] font-semibold text-[--btn-delete-bg] pt-[5px] pl-[2px]">
                  {errors.password.message}
                </div>
              )}
            </div>
          </div>
          <button
            disabled={isLoading}
            onClick={handleSubmit(login)}
            style={{
              width: "100%",
              borderRadius: "5px",
              padding: "12px 0px",
              marginTop: "20px",
              fontSize: "0.9rem",
              fontWeight: 700,
              background:
                "linear-gradient(300deg, #0eb9a8 0%, #077368 60%, #0eb9a8 100%)",
              color: baseThemes["LIGHT"].buttonColors.OK.color,
              backgroundSize: "300% 300%",
            }}
          >
            Log In
          </button>
        </form>
      </div>
    </ThemeProvider>
  );
}
