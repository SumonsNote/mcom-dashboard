import { useForm } from "react-hook-form";
import { AiOutlineClose } from "react-icons/ai";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function TransactionForm({ setShowForm }) {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      accountsId: "",
      accountsName: "",
      accountsType: "receipts",
    },
  });

  useEffect(() => {
    async function fetchData() {
      fetch(`${process.env.NEXT_PUBLIC_APP_URI}/api/accounts/account`)
        .then((res) => res.json())
        .then((data) => {
          const newId = data.accountsData.length + 1;
          setValue("accountsId", newId.toString().padStart(3, "0"));
        });
    }
    fetchData();
  }, [setValue]);
  const onSubmit = async (data) => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_APP_URI}/api/accounts/account`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    const newData = await res.json();
    router.refresh();
    if (res.statusCode === 200) {
      setShowForm(false);
    }
    //console.log(newData);
  };

  return (
    <div
      className="modal-content absolute top-0 right-0 left-0 z-50 w-full bg-black/20 h-full p-4 backdrop-blur-sm flex justify-center items-center animate-fade"
      onClick={() => setShowForm(false)}
    >
      <div
        className="w-[40rem] bg-background/50 animate-scale rounded-md shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <header className="modal-header flex justify-between rounded-md items-center p-4 bg-[#9096ff] text-white">
          <h5 className="text-lg font-semibold">Add Monthly Transactions</h5>
          <span
            className="cursor-pointer text-2xl"
            onClick={() => setShowForm(false)}
            aria-label="Close form"
          >
            <AiOutlineClose />
          </span>
        </header>

        <div className="modal-body p-6">
          <form
            autoComplete="off"
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-4"
          >
            {/* accountsId */}
            <div className="flex items-center">
              <label className="w-1/3 text-sm font-medium">
                accounts Id<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                disabled
                placeholder="Type min 3 characters (eg. 001)..."
                className="form-input w-2/3"
                {...register("accountsId", {
                  required: "accounts Id is required",
                })}
              />
            </div>
            {errors.accountsId && (
              <span className="text-red-500 text-sm pl-[12.5rem]">
                {errors.accountsId.message}
              </span>
            )}

            {/* accountsName */}
            <div className="flex items-center">
              <label className="w-1/3 text-sm font-medium">
                accounts Name<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                className="form-input w-2/3"
                placeholder="Type Accounts Name..."
                {...register("accountsName", {
                  required: "accounts Name is required",
                })}
              />{" "}
            </div>
            {errors.accountsName && (
              <span className="text-red-500 text-sm pl-[12.5rem]">
                {errors.accountsName.message}
              </span>
            )}
            {/* accountsType */}
            <div className="flex items-center">
              <label className="w-1/3 text-sm font-medium">
                accounts Type<span className="text-red-500">*</span>
              </label>

              <select
                className="form-select w-2/3 capitalize"
                {...register("accountsType", {
                  required: "Accounts Type is required",
                })}
              >
                <option value="receipts">receipts</option>
                <option value="payments">payments</option>
                <option value="assets">assets</option>
                <option value="liabilities">liabilities</option>
                <option value="others">others</option>
              </select>
            </div>

            {/* Buttons */}
            <div className="text-center mt-6 flex gap-5 justify-center">
              <button
                type="submit"
                className="bg-[#9096ff] rounded text-white px-4 py-2"
              >
                Save
              </button>

              <button
                type="button"
                className="bg-red-400 rounded text-white px-4 py-2"
                onClick={() => setShowForm(false)}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
