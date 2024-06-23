import { useRouter } from "next/navigation";

const useCustomRouter = () => {
  const router = useRouter();

  const shallowPush = (url: string) => {
    window.history.pushState({}, "", url);
  };

  return {
    shallowPush,
  };
};

export default useCustomRouter;
