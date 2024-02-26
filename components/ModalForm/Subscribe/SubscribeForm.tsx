import { subscribeUser } from '@/services/spot-prices';
import { FormEvent, useState } from 'react';
import FormWrapper from '../FormWrapper';
import Input from '../Input';
import { validateEmail, validateName } from '@/hooks/validators';

type SubscribeFormProps = {
  getSuccess: () => void;
  getError: () => void;
};

export default function SubscribeForm({
  getSuccess,
  getError
}: SubscribeFormProps) {
  const metals = [
    {
      id: 'meta1',
      name: 'silver',
      label: 'Silver'
    },
    {
      id: 'meta2',
      name: 'gold',
      label: 'Gold'
    }
  ];
  const products = [
    {
      id: 'pro1',
      name: 'bars',
      label: 'Bars'
    },
    {
      id: 'pro2',
      name: 'rounds',
      label: 'Rounds'
    },
    {
      id: 'pro3',
      name: 'coins',
      label: 'Coins'
    }
  ];
  const freq = [
    {
      id: 'fre1',
      name: 'daily',
      text: 'Daily'
    },
    {
      id: 'fre2',
      name: 'weekly',
      text: 'Weekly'
    }
  ];
  const [metalSelect, setMetalSelect] = useState<[{}]>([{}]);
  const [name, setName] = useState('');
  const [nameError, setNameError] = useState(false);
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState(false);
  const handleMetalChange = (value: string, checked: boolean) => {
    if (checked == true) {
      setMetalSelect([{ ...metalSelect, value }]);
    } else {
      setMetalSelect([metalSelect.filter((e) => e !== value)]);
    }
  };
  {
    /* ******************** SUBMIT HANDLER ******************** */
  }
  const handleSubscribeSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (
        validateName(name) === false ||
        validateEmail(email) === false ||
        validateEmail(email) === 0 ||
        validateName(name) === 0
      ) {
        setNameError(true);
        setEmailError(true);
      } else {
        const result = await subscribeUser(name, email);
        if (result === true) {
          getSuccess();
        } else if (result === false) {
          getError();
        }
      }
    } catch {
      (err: { message: any }) => alert(err.message);
    }
  };
  return (
    <div className='h-full w-full'>
      <FormWrapper title='Subscribe to Bullion Mentor' description='' footer=''>
        <form
          onSubmit={handleSubscribeSubmit}
          className='-mt-3 mb-2 flex flex-col gap-0.5'
        >
          {/******************* NAME INPUT *****************/}
          <div className='flex h-24 flex-col'>
            <Input
              label='Name'
              placeholder='eg: John Doe'
              onChange={(e) => {
                setName(e.target.value);
                setNameError(false);
              }}
            />
            <p
              className={`flex justify-end text-xs lg:text-sm ${
                nameError === true ? 'text-red-600' : 'hidden'
              }`}
            >
              {validateName(name) === 0
                ? 'Name is required'
                : validateName(name) === false
                ? 'Please enter a valid name'
                : null}
            </p>
          </div>
          {/******************* EMAIL INPUT *****************/}
          <div className='-mt-4 flex h-24 flex-col'>
            <Input
              label='Email'
              placeholder='eg: johndoe@gmail.com'
              onChange={(e) => {
                setEmail(e.target.value);
                setEmailError(false);
              }}
            />
            <p
              className={`flex justify-end text-xs lg:text-sm ${
                emailError === true ? 'text-red-600' : 'hidden'
              }`}
            >
              {validateEmail(email) === 0
                ? 'Email is required'
                : validateEmail(email) === false
                ? 'Please enter a valid email'
                : null}
            </p>
          </div>
          {/******************* PRODUCT TYPE AND METAL INPUT *****************/}
          <div className='mt-1 grid grid-cols-2 gap-2'>
            {/******************* METAL LIST *****************/}
            <div className='h-36 w-full border-2 border-gray-300 bg-white py-3'>
              <header className='pl-1 text-sm text-[#A4A3A3]'>
                Metal interested
              </header>
              <ul>
                {metals.map((metal: any, index: number) => (
                  <li
                    className='flex list-none flex-row items-center pt-2 pl-1 align-middle text-sm'
                    key={index}
                  >
                    <div>
                      <input
                        type='checkbox'
                        name={metal.name}
                        id={metal.id}
                        value={metal.name}
                        onChange={(e) => {
                          handleMetalChange(e.target.value, e.target.checked);
                        }}
                        className='mr-1 h-4 w-4 cursor-pointer border-2 text-white accent-primary'
                        aria-label={metal.name}
                      />
                    </div>
                    <label
                      className='-mt-1.5 text-dark-black'
                      htmlFor={metal.id}
                    >
                      {metal.label}
                    </label>
                  </li>
                ))}
              </ul>
            </div>
            {/******************* PRODUCT TYPE LIST *****************/}
            <div className='h-36 w-full border-2 border-gray-300 bg-white py-3'>
              <header className='pl-1 text-sm text-[#A4A3A3]'>
                Product type
              </header>
              <ul>
                {products.map((product: any, index: number) => (
                  <li
                    className='flex list-none flex-row items-center pt-2 pl-1 align-middle text-sm'
                    key={index}
                  >
                    <div>
                      <input
                        type='checkbox'
                        name={product.name}
                        id={product.id}
                        value={product.name}
                        onChange={(e) => {
                          handleMetalChange(e.target.value, e.target.checked);
                        }}
                        className='mr-1 h-4 w-4 cursor-pointer border-2 text-white accent-primary'
                        aria-label={product.name}
                      />
                    </div>
                    <label
                      className='-mt-1.5 text-dark-black'
                      htmlFor={product.id}
                    >
                      {product.label}
                    </label>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          {/******************* FREQUENCY RADIO BUTTONS *****************/}
          <div className='my-2 flex flex-col text-sm text-dark-black'>
            <label>Frequency to receive emails</label>
            <span className='flex flex-row'>
              {freq.map((frequency: any, index: number) => (
                <div key={index}>
                  <input
                    type='radio'
                    name='check'
                    value={frequency.name}
                    id={frequency.id}
                    className='mx-2 h-3 w-3 cursor-pointer appearance-none rounded-full border-2 border-[#555] checked:h-3 checked:w-3 checked:border-0 checked:bg-primary  checked:ring-2 checked:ring-primary checked:ring-offset-1'
                    aria-label={frequency.name}
                  />
                  <label
                    htmlFor={frequency.text}
                    className='mr-1.5 text-sm text-dark-black'
                  >
                    {frequency.text}
                  </label>
                </div>
              ))}
            </span>
          </div>
          <hr />
          <div className='my-2'>
            <button
              type='submit'
              className='group relative my-1 inline-block w-full overflow-hidden rounded-full bg-primary py-2 text-white '
            >
              <span className='absolute top-0 left-0  mb-0 flex h-0 w-full translate-y-0 transform bg-secondary opacity-90 transition-all duration-300 ease-out group-hover:h-full '></span>
              <span className='relative'>Submit</span>
            </button>
          </div>
        </form>
      </FormWrapper>
    </div>
  );
}
