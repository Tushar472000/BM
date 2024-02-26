import { requestProduct } from '@/services/spot-prices';
import { FormEvent, useEffect, useState } from 'react';
import FormWrapper from '../FormWrapper';
import Input from '../Input';
import { validateEmail, validateInput, validateName } from '@/hooks/validators';
import Button from '@/components/Button';
import { useSelector } from 'react-redux';
import { selectUser } from '@/features/userSlice';
import { RequestFormProps } from '@/interfaces/typeinterfaces';

export default function RequestProductForm({
  getSuccess,
  getError
}: RequestFormProps) {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [productName, setProductName] = useState('');
  const [productError, setProductError] = useState(false);
  const [metalName, setMetalName] = useState('');
  const [metalError, setMetalError] = useState(false);
  const [weight, setWeight] = useState('');
  const [weightError, setWeightError] = useState(false);
  const [customerId, setCustomerId] = useState(0);
  const user = useSelector(selectUser);
  useEffect(() => {
    if (user.isLoggedin === false) {
      setCustomerId(0);
    } else {
      setCustomerId(user.user.id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (
        validateInput(productName) === false ||
        validateEmail(email) === 0 ||
        validateEmail(email) === false ||
        validateInput(weight) === false ||
        validateName(metalName) === false ||
        validateName(metalName) === 0
      ) {
        setEmailError(true);
        setMetalError(true);
        setProductError(true);
        setWeightError(true);
      } else {
        const result = await requestProduct(
          email,
          productName,
          metalName,
          weight,
          customerId
        );
        if (result === true) {
          getSuccess();
        }
        if (result === false) {
          getError();
        }
      }
    } catch {
      getError();
    }
  };
  return (
    <div className='h-full w-full'>
      <FormWrapper
        title='Request a product'
        description='Fill in the following details to request a product'
        footer=''
      >
        <form
          onSubmit={submitHandler}
          className='-mt-4 mb-2 flex flex-col gap-0.5'
        >
          {/******************** PRODUCT NAME INPUT ********************/}
          <div className='flex h-24 flex-col'>
            <Input
              label='Product name'
              placeholder='eg: American eagle'
              onChange={(e) => {
                setProductName(e.target.value);
                setProductError(false);
              }}
            />
            <p
              className={`flex justify-end text-xs lg:text-sm ${
                productError === true ? 'text-red-600' : 'hidden'
              }`}
            >
              {validateInput(productName) === false
                ? 'Product name is required'
                : null}
            </p>
          </div>
          {/******************* METAL NAME INPUT *****************/}
          <div className='-mt-4 flex h-24 flex-col'>
            <Input
              label='Metal'
              placeholder='eg: Gold'
              onChange={(e) => {
                setMetalName(e.target.value);
                setMetalError(false);
              }}
            />
            <p
              className={`flex justify-end text-xs lg:text-sm ${
                metalError === true ? 'text-red-600' : 'hidden'
              }`}
            >
              {validateName(metalName) === 0
                ? 'Metal name is required'
                : validateName(metalName) === false
                ? 'Please enter a valid Metal name'
                : null}
            </p>
          </div>
          {/******************* WEIGHT INPUT *****************/}
          <div className='-mt-4 flex h-24 flex-col'>
            <Input
              label='Weight'
              placeholder='eg: 10g'
              onChange={(e) => {
                setWeight(e.target.value);
                setWeightError(false);
              }}
            />
            <p
              className={`flex justify-end text-xs lg:text-sm ${
                weightError === true ? 'text-red-600' : 'hidden'
              }`}
            >
              {validateInput(weight) === false ? 'Weight is required' : null}
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
          <Button label='Request product' click={() => submitHandler} />
        </form>
      </FormWrapper>
    </div>
  );
}
