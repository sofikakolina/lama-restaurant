'use client'
import axios from "axios"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"

type Inputs = {
    title: string,
    description: string,
    price: number,
    catSlug: string,
    color: string
}

type Option = {
    title: string,
    additionalPrice: number
}

const page = () => {
    const { data: session, status } = useSession()
    const router = useRouter()
    const [inputs, setInputs] = useState<Inputs>({
        title: "",
        description: "",
        price: 0,
        catSlug: "",
        color: "white"
    })

    const [option, setOption] = useState<Option>({
        title: "",
        additionalPrice: 0,
    })

    const [file, setFile] = useState<File | null>(null)
    const [options, setOptions] = useState<Option[]>([])
    const [path, setPath] = useState("")
    console.log(path)
    if (status === "loading") {
        return <p>Loading...</p>
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setInputs(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    const handleOption = (e: React.ChangeEvent<HTMLInputElement>) => {
        setOption(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    const handleChangeImage = async(e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        const file = e.target.files?.[0]
        if (!file) return
        try{
            const data = new FormData()
            data.set("file", file)

            const res = await fetch("api/upload", {
                method:"POST",
                body: data
            })

            if (!res.ok){
                throw new Error(await res.text())
            }
            const resData = await res.json()
            console.log(resData)
            setPath(resData.imageUrl)

        } catch(error){
            console.error(error)
        }
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        console.log(path)
        try {
            const response = await axios.post("/api/products", { ...inputs, options, image: path })
            const data = response.data
            router.push(`/product/${data.id}`)
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div>
            <form className="shadow-lg flex flex-wrap gap-4 p-8" onSubmit={handleSubmit}>
                <h1>Add New Product</h1>
                <div className="w-full flex flex-col gap-2">
                    <label>Image</label>
                    <input type="file" name='image' className="ring-1 ring-red-200 p-2 rounded-sm" accept="image/png, image/gif, image/jpeg" onChange={handleChangeImage} />
                </div>
                <div className="w-full flex flex-col gap-2">
                    <label>Title</label>
                    <input type="text" name='title' className="ring-1 ring-red-200 p-2 rounded-sm" onChange={handleChange} />
                </div>
                <div className="w-full flex flex-col gap-2">
                    <label>Desc</label>
                    <input type="text" name='description' className="ring-1 ring-red-200 p-2 rounded-sm" onChange={handleChange} />
                </div>
                <div className="w-full flex flex-col gap-2">
                    <label>Price</label>
                    <input type="number" name='price' className="ring-1 ring-red-200 p-2 rounded-sm" onChange={handleChange} />
                </div>
                <div className="w-full flex flex-col gap-2">
                    <label>Category</label>
                    <input type="text" name='catSlug' className="ring-1 ring-red-200 p-2 rounded-sm" onChange={handleChange} />
                </div>
                <div className="w-full flex flex-col gap-2">
                    <label>Options</label>
                    <div className="flex gap-2">
                        <input onChange={handleOption} type="text" placeholder='Title' name='title' className="ring-1 ring-red-200 p-2 rounded-sm" />
                        <input onChange={handleOption} type="number" placeholder='Additional Price' name='additionalPrice' className="ring-1 ring-red-200 p-2 rounded-sm" />
                    </div>
                    <button type="button" className="bg-red-500 w-52 text-white p-2 text-center" onClick={() => setOptions([...options, option])}>Add Option</button>
                </div>
                <div className="flex flex-col gap-2">
                    {options.map((item, index) => (
                        <div key={index} className="ring-1 p-2 ring-red-300 rounded-md cursor-pointer" onClick={() => setOptions(options.filter(option => option.title !== item.title))}>
                            <span>{item.title}</span> - <span>${item.additionalPrice}</span>
                        </div>
                    ))}
                </div>
                <button type="submit" className="p-2 w-full rounded-sm bg-red-500 text-white">Submit</button>
            </form>
        </div>
    )
}

export default page
