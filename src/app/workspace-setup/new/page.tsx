"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import clsx from "clsx";
import Button from "@/components/button";
import { BUTTON_TYPES, baseThemes } from "@/configs/themes";
import MainLayout from "@/components/layouts/main-layout";
// import Projects from "@/app/(main-layout)/[ws-slug]/projects/page";
import useTheme from "@/hooks/useTheme";
import { useSelector } from "react-redux";
import { State } from "@/services/redux/store";
import { WorkspacesService } from "@/services/api/workspaces-service";
import { Router } from "next/router";
import { useRouter } from "next/navigation";

export default function WorkspaceSetup() {
  const router = useRouter();
  const userSlice = useSelector((state: State) => state.user);
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const { setTheme } = useTheme();
  const {
    register,
    handleSubmit,
    setError,
    getValues,
    setValue,
    formState: { errors },
  } = useForm<{
    name: string;
    logo: string;
  }>({ progressive: true });

  useEffect(() => {
    setTheme("LIGHT");
  }, []);

  const toNextStep: SubmitHandler<{ name: string }> = async (input) => {
    setStep(step + 1);
  };

  const createWorkspace: SubmitHandler<{
    name: string;
    logo: string;
  }> = async (input) => {
    setLoading(true);
    const bodyData = {
      name: input.name,
      logo: "default",
    };
    const response = await WorkspacesService.CreateWorkspace(bodyData);
    if (response.status === "success") {
      router.push("/");
    }
    setLoading(false);
  };

  const handleError = (error: string) => {};

  const renderStep1 = () => {
    return (
      <div className="w-[50%] h-full absolute top-0 left-0 flex ">
        <form
          onSubmit={handleSubmit(toNextStep)}
          className="w-full h-screen bg-[#ffffff] py-[40px] relative flex flex-col items-center"
        >
          <div className="w-[70%] flex flex-col items-center">
            <div className="w-full text-[1.6rem] font-bold text-center text-balance">{`What is your workspace's name?`}</div>
            <div
              className={clsx(
                {
                  "w-full flex justify-center border-b-[2px] border-solid":
                    true,
                },
                {
                  "border-b-[#000000]": !errors.name,
                },
                {
                  "border-b-[--btn-delete-bg]": errors.name,
                }
              )}
            >
              <input
                autoFocus
                defaultValue={`${
                  userSlice.user ? userSlice.user.email.split("@")[0] : ""
                }'s workspace`}
                placeholder="Enter your workspace name"
                className={clsx(
                  {
                    "outline-none border-none w-full text-left pb-[5px] font-semibold text-[1.1rem] pt-[20px]":
                      true,
                  },
                  {
                    "text-[#000000]": !errors.name,
                  },
                  {
                    "text-[--btn-delete-bg]": errors.name,
                  }
                )}
                {...register("name", {
                  required: {
                    value: true,
                    message: "Workspace name is missing",
                  },
                  maxLength: {
                    value: 40,
                    message:
                      "Your workspace name is too long (maxium 40 characters)",
                  },
                })}
              />
            </div>
            {errors.name && (
              <div className="w-[65%] text-[0.9rem] font-semibold text-[--btn-delete-bg] pt-[10px] pl-[2px]">
                {errors.name.message}
              </div>
            )}
          </div>
          <div className="w-[70%] py-[20px] flex items-center">
            <Button
              disabled={!!errors.name}
              type={BUTTON_TYPES.OK}
              onClick={() => setStep(step + 1)}
              style={{
                padding: "10px 40px",
                borderRadius: "6px",
                fontSize: "1rem",
                fontWeight: 600,
              }}
            >
              Continue
            </Button>
          </div>
        </form>
      </div>
    );
  };

  const renderStep2 = () => {
    return (
      <div className="w-[50%] h-full absolute top-0 left-0 flex">
        <form
          onSubmit={handleSubmit(createWorkspace)}
          className="w-full h-screen bg-[#ffffff] py-[40px] relative flex flex-col items-center"
        >
          <div className="w-[70%] flex flex-col items-center">
            <div className="w-full text-[1.6rem] font-bold text-center text-balance">{`Invite your teammate to your workspace`}</div>
            <div
              className={clsx(
                {
                  "w-full flex justify-center border-b-[2px] border-solid":
                    true,
                },
                {
                  "border-b-[#000000]": !errors.name,
                },
                {
                  "border-b-[--btn-delete-bg]": errors.name,
                }
              )}
            >
              <input
                autoFocus
                defaultValue={""}
                placeholder="Enter your teammate's email"
                className={clsx(
                  {
                    "outline-none border-none w-full text-left pb-[5px] font-semibold text-[1.1rem] pt-[20px]":
                      true,
                  },
                  {
                    "text-[#000000]": !errors.name,
                  },
                  {
                    "text-[--btn-delete-bg]": errors.name,
                  }
                )}
              />
            </div>
            {errors.name && (
              <div className="w-[65%] text-[0.9rem] font-semibold text-[--btn-delete-bg] pt-[10px] pl-[2px]">
                {errors.name.message}
              </div>
            )}
          </div>
          <div className="w-[70%] py-[20px] flex items-center">
            <Button
              disabled={!!errors.name}
              type={BUTTON_TYPES.OK}
              onClick={handleSubmit(createWorkspace)}
              style={{
                padding: "10px 40px",
                borderRadius: "6px",
                fontSize: "1rem",
                fontWeight: 600,
              }}
            >
              Continue
            </Button>
          </div>
        </form>
      </div>
    );
  };

  return (
    <div className="w-screen h-screen text-[#000000]">
      <div className="w-screen h-screen backdrop-blur-[2px] backdrop-brightness-90 flex items-center justify-center absolute z-[600]">
        {step === 1 && renderStep1()}
        {step === 2 && renderStep2()}
      </div>
    </div>
  );
}
