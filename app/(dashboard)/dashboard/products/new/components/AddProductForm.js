import { useFetchBrandsQuery } from "@/store/slices/brandApi";
import { useAddProductMutation } from "@/store/slices/productApi";
import { Blocks, Loader, ShieldX } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import {
  extractTableData,
  extractTableDataFromSimpleTable,
} from "./extracTableData";
import ImageUpload from "./ImageUpload";
import CodeEditor from "./RichTextEditor";
import { sampleTable } from "./sampleTable";

export default function AddProductForm() {
  const { register, handleSubmit, control, watch } = useForm();
  const { data } = useFetchBrandsQuery();
  //console.log(data);
  const [addProduct, { isLoading, isError, isSuccess }] =
    useAddProductMutation();
  const router = useRouter();
  const codeRef = useRef();
  const onSubmit = async (data) => {
    const extractedData = extractTableDataFromSimpleTable(
      codeRef.current.getContent()
    );
    addProduct({
      ...data,
      color: data.colors.split(","),
      specificationsHtml: codeRef.current.getContent(),
      specifications: extractedData,
    });
  };
  useEffect(() => {
    if (isSuccess) {
      toast.dismiss();
      toast.success("Product added successfully!");
      router.refresh();
      router.push("/dashboard/products");
    }
    if (isError) {
      toast.error("Error adding product");
    }
    if (isLoading) {
      toast.info("Updating product...");
    }
  }, [isSuccess, isError, isLoading]);

  // Watch the value of "isNew"
  const isUsed = watch("isUsed");
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid grid-cols-3 gap-4 w-full mx-auto relative"
    >
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-700 dark:text-gray-400"
        >
          Name
        </label>
        <input
          type="text"
          id="name"
          placeholder="iPhone 15 Pro Max 128GB Space Grey"
          className="mt-1 block w-full border border-gray-300 dark:text-gray-200 placeholder:dark:text-gray-500 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          {...register("name")}
        />
      </div>
      <div>
        <label
          htmlFor="model"
          className="block text-sm font-medium text-gray-700 dark:text-gray-400"
        >
          Model
        </label>
        <input
          type="text"
          id="model"
          placeholder="iPhone 15 Pro Max"
          className="mt-1 block w-full border border-gray-300 dark:text-gray-200 placeholder:dark:text-gray-500 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          {...register("model")}
        />
      </div>
      <div>
        <label
          htmlFor="purchase_price"
          className="block text-sm font-medium text-gray-700 dark:text-gray-400"
        >
          Purchase Price
        </label>
        <input
          type="number"
          id="purchase_price"
          min={0}
          placeholder="1200"
          step="0.01"
          className="mt-1 block w-full border border-gray-300 dark:text-gray-200 placeholder:dark:text-gray-500 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          {...register("purchase_price")}
        />
      </div>
      <div>
        <label
          htmlFor="original_price"
          className="block text-sm font-medium text-gray-700 dark:text-gray-400"
        >
          Original Price
        </label>
        <input
          type="number"
          min={0}
          id="original_price"
          step="0.01"
          placeholder="1200"
          className="mt-1 block w-full border border-gray-300 dark:text-gray-200 placeholder:dark:text-gray-500 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          {...register("original_price")}
        />
      </div>
      <div>
        <label
          htmlFor="discount_price"
          className="block text-sm font-medium text-gray-700 dark:text-gray-400"
        >
          Discount Price
        </label>
        <input
          min={0}
          type="number"
          step="0.01"
          id="discount_price"
          placeholder="1200"
          className="mt-1 block w-full border border-gray-300 dark:text-gray-200 placeholder:dark:text-gray-500 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          {...register("discount_price")}
        />
      </div>
      <div>
        <label
          htmlFor="brand"
          className="block text-sm font-medium text-gray-700 dark:text-gray-400"
        >
          Brand
        </label>
        <select
          className="mt-1 block w-full border capitalize border-gray-300 dark:text-gray-200 placeholder:dark:text-gray-500 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          {...register("brand")}
        >
          {data?.brands.map(
            (brand) =>
              brand.title && (
                <option
                  key={brand.id}
                  value={brand.title}
                  className="capitalize dark:bg-gray-900"
                >
                  {brand.title}
                </option>
              )
          )}
        </select>
      </div>
      <div>
        <label
          htmlFor="storage"
          className="block text-sm font-medium text-gray-700 dark:text-gray-400"
        >
          Storage
        </label>

        <select
          className="mt-1 block w-full border border-gray-300 dark:text-gray-200 placeholder:dark:text-gray-500 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          {...register("storage")}
        >
          <option className="dark:bg-gray-900" value="16GB">
            16GB
          </option>
          <option className="dark:bg-gray-900" value="32GB">
            32GB
          </option>
          <option className="dark:bg-gray-900" value="64GB">
            64GB
          </option>
          <option className="dark:bg-gray-900" value="128GB">
            128GB
          </option>
          <option className="dark:bg-gray-900" value="256GB">
            256GB
          </option>
          <option className="dark:bg-gray-900" value="512GB">
            512GB
          </option>
          <option className="dark:bg-gray-900" value="1TB">
            1TB
          </option>
          <option className="dark:bg-gray-900" value="2TB">
            2TB
          </option>
        </select>
      </div>
      <div>
        <label
          htmlFor="ram"
          className="block text-sm font-medium text-gray-700 dark:text-gray-400"
        >
          RAM
        </label>
        <select
          className="mt-1 block w-full border border-gray-300 dark:text-gray-200 placeholder:dark:text-gray-500 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          {...register("ram")}
        >
          <option className="dark:bg-gray-900" value="2GB">
            N/A
          </option>
          <option className="dark:bg-gray-900" value="2GB">
            2GB
          </option>
          <option className="dark:bg-gray-900" value="4GB">
            4GB
          </option>
          <option className="dark:bg-gray-900" value="6GB">
            6GB
          </option>
          <option className="dark:bg-gray-900" value="8GB">
            8GB
          </option>
          <option className="dark:bg-gray-900" value="12GB">
            12GB
          </option>
          <option className="dark:bg-gray-900" value="16GB">
            16GB
          </option>
          <option className="dark:bg-gray-900" value="24GB">
            24GB
          </option>
          <option className="dark:bg-gray-900" value="32GB">
            32GB
          </option>
        </select>
      </div>
      <div>
        <label
          htmlFor="colors"
          className="block text-sm font-medium text-gray-700 dark:text-gray-400"
        >
          Colors
        </label>
        <input
          {...register("colors")}
          type="text"
          placeholder="Black, White, Red, Blue"
          id="colors"
          className="mt-1 block w-full border border-gray-300 dark:text-gray-200 placeholder:dark:text-gray-500 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>

      <div>
        <label
          htmlFor="region"
          className="block text-sm font-medium text-gray-700 dark:text-gray-400"
        >
          Region
        </label>
        <input
          {...register("region")}
          type="text"
          placeholder="United States"
          id="region"
          className="mt-1 block w-full border border-gray-300 dark:text-gray-200 placeholder:dark:text-gray-500 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <div>
        <label
          htmlFor="isUsed"
          className="block text-sm font-medium text-gray-700 dark:text-gray-400"
        >
          Is Used
        </label>
        <select
          id="isUsed"
          defaultValue={false}
          className="mt-1 block w-full border border-gray-300 dark:text-gray-200 placeholder:dark:text-gray-500 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          {...register("isUsed")}
        >
          <option className="dark:bg-gray-900" value="true">
            Yes
          </option>
          <option className="dark:bg-gray-900" value="false">
            No
          </option>
        </select>
      </div>
      {/* Conditionally render "Used Duration" based on "isNew" */}
      {isUsed === "true" && (
        <>
          <div>
            <label
              htmlFor="used-duration"
              className="block text-sm font-medium text-gray-700 dark:text-gray-400"
            >
              Used Duration
            </label>
            <input
              type="text"
              id="used-duration"
              placeholder="1-3 Months"
              className="mt-1 block w-full border border-gray-300 dark:text-gray-200 placeholder:dark:text-gray-500 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              {...register("usedDuration")}
            />
          </div>
          <div>
            <label
              htmlFor="batteryHealth"
              className="block text-sm font-medium text-gray-700 dark:text-gray-400"
            >
              Battery Health
            </label>
            <input
              {...register("batteryHealth")}
              id="batteryHealth"
              placeholder="85 - 89%"
              className="mt-1 block w-full border border-gray-300 dark:text-gray-200 placeholder:dark:text-gray-500 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          <div>
            <label
              htmlFor="scratches"
              className="block text-sm font-medium text-gray-700 dark:text-gray-400"
            >
              Scratches
            </label>
            <select
              {...register("scratches")}
              id="scratches"
              className="mt-1 block w-full border border-gray-300 dark:text-gray-200 placeholder:dark:text-gray-500 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option className="dark:bg-gray-900" value="No Scratches">
                No Scratches
              </option>
              <option className="dark:bg-gray-900" value="Minor Scratches">
                Minor Scratches
              </option>
              <option className="dark:bg-gray-900" value="Visible Scratches">
                Visible Scratches
              </option>
            </select>
          </div>

          <div>
            <label
              htmlFor="dents"
              className="block text-sm font-medium text-gray-700 dark:text-gray-400"
            >
              Dents
            </label>
            <select
              {...register("dents")}
              id="dents"
              className="mt-1 block w-full border border-gray-300 dark:text-gray-200 placeholder:dark:text-gray-500 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option className="dark:bg-gray-900" value="No Dents">
                No Dents
              </option>
              <option className="dark:bg-gray-900" value="Minor Dents">
                Minor Dents
              </option>
              <option className="dark:bg-gray-900" value="Visible Dents">
                Visible Dents
              </option>
            </select>
          </div>

          <div>
            <label
              htmlFor="accessoriesWithDevice"
              className="block text-sm font-medium text-gray-700 dark:text-gray-400"
            >
              Accessories With Device
            </label>
            <input
              {...register("accessoriesWithDevice")}
              id="accessoriesWithDevice"
              defaultValue="Charger, Earphones, SIM Ejector Tool"
              className="mt-1 block w-full border border-gray-300 dark:text-gray-200 placeholder:dark:text-gray-500 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          <div>
            <label
              htmlFor="box"
              className="block text-sm font-medium text-gray-700 dark:text-gray-400"
            >
              Box
            </label>
            <select
              {...register("box")}
              id="box"
              className="mt-1 block w-full border border-gray-300 dark:text-gray-200 placeholder:dark:text-gray-500 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option className="dark:bg-gray-900" value="Without Box">
                Without Box
              </option>
              <option className="dark:bg-gray-900" value="With Box">
                With Box
              </option>
            </select>
          </div>
        </>
      )}
      <div>
        <label
          htmlFor="simVariant"
          className="block text-sm font-medium text-gray-700 dark:text-gray-400"
        >
          SIM Variant
        </label>
        <select
          {...register("simVariant")}
          id="simVariant"
          className="mt-1 block w-full border border-gray-300 dark:text-gray-200 placeholder:dark:text-gray-500 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        >
          <option className="dark:bg-gray-900" value="Dual SIM">
            Dual SIM
          </option>
          <option className="dark:bg-gray-900" value="Single SIM">
            Single SIM
          </option>
          <option className="dark:bg-gray-900" value="single  eSIM">
            Single + eSIM
          </option>
        </select>
      </div>
      <div>
        <label
          htmlFor="warrantyStatus"
          className="block text-sm font-medium text-gray-700 dark:text-gray-400"
        >
          Warranty Status
        </label>
        <input
          {...register("warrantyStatus")}
          id="warrantyStatus"
          placeholder="7 Days Replacement, 2 Years Service Warranty"
          className="mt-1 block w-full border border-gray-300 dark:text-gray-200 placeholder:dark:text-gray-500 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <div>
        <label
          htmlFor="stock"
          className="block text-sm font-medium text-gray-700 dark:text-gray-400"
        >
          Stock
        </label>
        <input
          {...register("stock", { valueAsNumber: true })}
          id="stock"
          type="number"
          defaultValue={1}
          className="mt-1 block w-full border border-gray-300 dark:text-gray-200 placeholder:dark:text-gray-500 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <div className="col-span-3">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-400">
          Images
        </label>
        <Controller
          name="images"
          control={control}
          defaultValue={[]}
          render={({ field }) => (
            <ImageUpload onImagesChange={field.onChange} />
          )}
        />
      </div>
      <div className="col-span-3">
        <label
          htmlFor="short_description"
          className="block text-sm font-medium text-gray-700 dark:text-gray-400"
        >
          Short Description
        </label>
        <textarea
          {...register("short_description")}
          id="short_description"
          className="mt-1 block w-full border border-gray-300 dark:text-gray-200 placeholder:dark:text-gray-500 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <div className="col-span-3">
        <label
          htmlFor="description"
          className="block text-sm font-medium text-gray-700 dark:text-gray-400"
        >
          specifications
        </label>
        <Controller
          name="specificationsHtml"
          control={control}
          defaultValue={sampleTable}
          render={({ field }) => (
            // <RichTextEditor content={field.value} onChange={field.onChange} />
            <CodeEditor content={field.value} ref={codeRef} />
          )}
        />
      </div>

      <div className="flex gap-4 col-span-3 justify-center items-center">
        <button
          type="submit"
          disabled={isLoading}
          className="w-36 flex justify-center gap-1 items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          {isLoading ? (
            <>
              <Loader className="animate-spin" /> adding ...
            </>
          ) : (
            <>
              <Blocks /> Add Product
            </>
          )}
        </button>

        <button
          type="button"
          onClick={router.back}
          className="w-36 flex justify-center items-center gap-1 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
        >
          <ShieldX /> Cancel
        </button>
      </div>
    </form>
  );
}
