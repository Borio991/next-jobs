import AppTextInput from "@/components/ui/AppTextInput";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FieldValues, useForm } from "react-hook-form";

function SignInPage() {
  const router = useRouter();
  const {
    control,
    handleSubmit,
    setError,
    formState: { isValid },
  } = useForm<FieldValues>({
    mode: "all",
  });
  async function onSubmit(values: FieldValues, e: any) {
    e.preventDefault();
    try {
      const res = await signIn("credentials", {
        email: values.email,
        password: values.password,
        redirect: false,
      });
      if (res?.status === 401) {
        setError("password", { message: "email or password is not correct" });
      } else {
        router.replace("/dashboard");
      }
    } catch (error) {
      console.log("error happened", error);
    }
  }
  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Sign in to your account
            </h1>
            <form
              className="space-y-4 md:space-y-6"
              onSubmit={handleSubmit(onSubmit)}
            >
              <AppTextInput
                label="البريد الالكتروني"
                placeholder="email"
                id="email"
                type="email"
                control={control}
                name="email"
                rules={{
                  required: "البريد الالكتروني مطلوب",
                  pattern: {
                    value:
                      /^([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{2,5})$/,
                    message: "Not a valid email address",
                  },
                }}
              />
              <AppTextInput
                label="كلمة المرور"
                placeholder="password"
                id="password"
                type="password"
                control={control}
                name="password"
                rules={{
                  required: "كلمة المرور مطلوبة",
                }}
              />
              <button
                type="submit"
                className={`w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 
                text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800`}
              >
                Sign in
              </button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Don’t have an account yet?{" "}
                <Link
                  href="/authPages/RegisterPage"
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Sign up
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SignInPage;
