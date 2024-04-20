import { zodResolver } from '@hookform/resolvers/zod';
import { Search } from 'lucide-react';
import { useForm } from 'react-hook-form';
import {z} from 'zod'
import { Form, FormField, FormItem } from './ui/form';
import { Input } from './ui/input';
import { Button } from './ui/button';

const formSchema = z.object({
  searchQuery: z.string({required_error:"Restaurant name is required"}),
})

export type SearchForm = z.infer<typeof formSchema>

type Props = {
    onSubmit: (formData: SearchForm) => void;
    placeHolder: string;
    onReset?: () => void;
}

function SearchBar({onSubmit, onReset, placeHolder}: Props) {
  
  const form = useForm<SearchForm>({
    resolver: zodResolver(formSchema),
  });

  const handleReset =  () => {
    form.reset({
      searchQuery: "",
    });
    if(onReset){
      onReset();
    }
  };

  return (
    <Form {...form}>
      <form 
        onSubmit={form.handleSubmit(onSubmit)} 
        className={`flex items-center flex-1 gap-3 justify-between flex-row rounded-full border-2 p-2 mx-5 ${
          form.formState.errors.searchQuery && "border-red-500"}`
        }
      >
        <Search 
          strokeWidth={2.5} 
          size={30} 
          className='hidden ml-1 text-orange-500 md:block' 
        />
        <FormField 
          control={form.control} 
          name='searchQuery'
          render={({field}) => 
            <FormItem className='flex-1' >
              <Input {...field} placeholder={placeHolder} className='text-xl border-none shadow-none focus-visible:ring-0'/>
            </FormItem> 
          }
        />
        {form.formState.isDirty && (
          <Button onClick={handleReset} type='button' variant={'outline'} className='rounded-full' >
            Clear
          </Button>
        )}
        <Button type='submit' className='bg-orange-500 rounded-full'>Search</Button>
      </form>
    </Form>
  )
}

export default SearchBar;