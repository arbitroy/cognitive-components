'use client'
import { FormEvent, useState } from 'react'
import Header from '../components/Header'

type feedBack = {
    caseType?: string;
    title?: string;
    customer?: string;
    product?: string;
    satisfaction?: string;
};


export default function Page() {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [feedBack, setFeedBack] = useState<feedBack[]>([]);

   // Function to clear the form fields
    const clearForm = (form: HTMLFormElement) => {
        form.reset();
        setError(null);
    };

    async function onSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        setIsLoading(true)
        setError(null) // Clear previous errors when a new request starts

        try {
            const formData = new FormData(event.currentTarget)
            const response = await fetch('/api/customer-support', {
                method: 'POST',
                body: formData,
            })

            if (!response.ok) {
                throw new Error('Failed to submit the data. Please try again.')
            }

            // Handle response if necessary
            const data = await response.json()
            setFeedBack(data.feedBack || []);
        } catch (error) {
            // Capture the error message to display to the user
            if (error instanceof Error) {
                setError(error.message)
            } else {
                setError('An unknown error occurred.')
            }
            console.error(error)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="flex flex-col min-h-screen bg-gray-100">
            <Header />
            <div className="min-h-screen flex items-center
                        justify-around bg-gray-100">
                <form className="w-full max-w-lg bg-white p-5 rounded-lg shadow-md" onSubmit={onSubmit}>
                    <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-customer-name">
                                Customer Name
                            </label>
                            <input className="appearance-none block w-full bg-gray-200 text-gray-700 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-400" id="grid-customer-name" name="customer_name" type="text" placeholder="Jane" required />
                        </div>
                        <div className="w-full md:w-1/2 px-3">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-product">
                                Product
                            </label>
                            <div className="relative">
                                <select className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-blue-400" id="grid-product" name="product" required>
                                    <option>ES20 Bike Pro</option>
                                    <option>AirBuds 4 ENC True Wireless Earbuds</option>
                                    <option>oraimo SpaceBox 8W FM Wireless Speaker</option>
                                    <option>oraimo SmartBlender Go 500ML Portable Blender</option>
                                    <option>oraimo PowerJet 130 27600mAh 130W Power Bank</option>
                                </select>
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full px-3">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-comment">
                                Comment
                            </label>
                            <textarea className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-blue-400" id="grid-comment" name="comment" placeholder="Type in here" required />
                        </div>
                    </div>

                    {error && (
                        <div className="text-red-600 text-sm mb-4">{error}</div>
                    )}
                    <div className="flex justify-end space-x-4 mt-8">
                        <button
                            type="submit"
                            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-6 rounded focus:outline-none focus:ring-2 focus:ring-green-400 transition-colors duration-200"
                            disabled={isLoading}
                        >
                            Submit
                        </button>
                        <button
                            type="button"
                            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 transition-colors duration-200"
                            disabled={isLoading}
                            onClick={(event) => {
                                const form = event.currentTarget.form;
                                if (form) {
                                    clearForm(form);
                                }
                            }}
                        >
                            Clear
                        </button>
                    </div>
                </form>
                <div className="overflow-x-auto rounded border border-gray-300 shadow-lg">
                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">Case Type</th>
                                <th scope="col" className="px-6 py-3">Title</th>
                                <th scope="col" className="px-6 py-3">Customer</th>
                                <th scope="col" className="px-6 py-3">Product</th>
                                <th scope="col" className="px-6 py-3">Satisfaction</th>
                            </tr>
                        </thead>
                        <tbody>
                            {feedBack.map((feedBack, index) => (
                                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={index}>
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{feedBack.caseType}</th>
                                    <td className="px-6 py-4">{feedBack.title}</td>
                                    <td className="px-6 py-4">{feedBack.customer}</td>
                                    <td className="px-6 py-4">{feedBack.product}</td>
                                    <td className="px-6 py-4">{feedBack.satisfaction}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

            </div>
        </div>
    )
}