import LoadingButton from '@/components/LoadingButton';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const formSchema = z.object({
    email: z.string().optional(),
    name: z.string().min(1, "name is required"),
    addressLine1: z.string().min(1, "addressLine1 is required"),
    city: z.string().min(1, "city is required"),
    country: z.string().min(1, "country is required"),
})

type UserFormData = z.infer<typeof formSchema>;

type props = {
    onSave: (userProfileData: UserFormData) => void;
    isLoading: boolean;
}

function UserProfileForm({onSave, isLoading}: props) {
    const form = useForm<UserFormData>({
        resolver: zodResolver(formSchema),
    })

  return (
    <Form {...form}>
        <form 
            onSubmit={form.handleSubmit(onSave)} 
            className='space-y-4 rounded-lg bg-gray-50 md:p-10'
        > 
           <div>
                <h2 className='font-bold text-2x'>User Profile Form</h2>
                <FormDescription>
                    View and change your profile information here
                </FormDescription>
            </div> 
            <FormField 
                control={form.control} 
                name="email" 
                render={({field}) => (
                    <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                            <Input {...field} disabled className='bg-white'/>
                        </FormControl>
                    </FormItem>
                )} 
            />
            <FormField 
                control={form.control} 
                name="name" 
                render={({field}) => (
                    <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                            <Input {...field} disabled className='bg-white'/>
                        </FormControl>
                    </FormItem>
                )} 
            />
            <div className='flex flex-col gap-4 md:flex-row'>
                <FormField 
                    control={form.control} 
                    name="addressLine1" 
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Address LIne 1</FormLabel>
                            <FormControl>
                                <Input {...field} disabled className='bg-white'/>
                            </FormControl>
                        </FormItem>
                    )} 
                />
                <FormField 
                    control={form.control} 
                    name="city" 
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>City</FormLabel>
                            <FormControl>
                                <Input {...field} disabled className='bg-white'/>
                            </FormControl>
                        </FormItem>
                    )} 
                />
                <FormField 
                    control={form.control} 
                    name="country" 
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Country</FormLabel>
                            <FormControl>
                                <Input {...field} disabled className='bg-white'/>
                            </FormControl>
                        </FormItem>
                    )} 
                />
            </div>
            {isLoading ? (
                <LoadingButton/> 
            ) : (
                <Button type='submit'>
                    Submit
                </Button>
            )}
        </form>
    </Form>
  )
}

export default UserProfileForm;