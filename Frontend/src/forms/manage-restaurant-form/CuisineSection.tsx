import { FormDescription, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { cuisineList } from "@/config/restaurant-options-config";
import { useFormContext } from "react-hook-form"
import CuisineCheckBox from "./CuisineCheckBox";

function CuisineSection() {
    const { control } = useFormContext();
  return (
    <div className="space-y-2">
        <div>
            <h2 className="text-2xl font-bold">Cuisines</h2>
            <FormDescription>
                Select the cuisines that your restaurant serves.
            </FormDescription>
        </div>
        <FormField
            control={control}
            name="cuisines"
            render={({ field }) => (
                <FormItem>
                    <div className="grid gap-1 md:grid-cols-5">
                        {cuisineList.map((cuisineItem)=> (
                            <CuisineCheckBox cuisine={cuisineItem} field={field}/>
                        ))}
                    </div>
                    <FormMessage/>
                </FormItem>
            )}
        />
    </div>
  )
}

export default CuisineSection