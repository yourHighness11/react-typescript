
import {
    Box,
    Button,
    FormControl,
    FormErrorMessage,
    Input,
} from '@chakra-ui/react'
import { Field, Form, Formik } from 'formik';
import React, { useState } from 'react';
interface FormValues {
    Task: string;
    length: number
}

const urlAddress: string = (import.meta.env.VITE_URL as string)

const AddTask: React.FC = () => {
    const [loading, setLoading] = useState(false);
    const initialValues = { Task: '', length: 0 };
    const currentDate = `${new Date()}`
    function validateName(value: FormValues) {
        let error: string | undefined;
        if (!value) {
            error = 'Required field'
        } else if (value.length < 6) {
            error = 'Minimum 6 characters.'
        } else if (value.length > 50) {
            error = 'Maximum 50 characters.'
        }
        return error
    }


    return (
        <div>
            <Box bg='' w='100%' p={4} pl={0} color=''>
                <Formik
                    initialValues={initialValues}
                    onSubmit={async (values) => {
                        try {
                            setLoading(true);
                            const response = await fetch(urlAddress, {
                                method: 'post',
                                body: JSON.stringify({ 'task': values.Task, 'createdAt': String(currentDate).substring(4, 15) }),
                                headers: {
                                    "Content-Type": "application/json"
                                }
                            })
                            values.Task = ''
                            console.log(await response.json());

                            setLoading(false);
                            window.location.reload();
                        } catch (error) {
                            console.log(error);

                        }

                    }}
                >
                    {() => (
                        <Form>
                            <Field name='Task' validate={validateName}>
                                {({ field, form }: { field: FormValues, form: any }) => (
                                    <FormControl isInvalid={form.errors.Task && form.touched.Task}>
                                        <Input {...field} placeholder='Enter a task.' isDisabled={loading} autoComplete='off' />
                                        <FormErrorMessage>{form.errors.Task}</FormErrorMessage>
                                    </FormControl>
                                )}
                            </Field>
                            <Button
                                mt={4}
                                colorScheme='blue'
                                variant={'outline'}
                                isLoading={loading}
                                isDisabled={loading}
                                type='submit'
                            >
                                Submit
                            </Button>
                        </Form>
                    )}
                </Formik>
            </Box>
        </div>
    )
}

export default AddTask
