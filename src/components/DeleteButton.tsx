"use client"
import axios from "axios"
import { useSession } from "next-auth/react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { toast } from "react-toastify"

interface Props{
    productId: string;
    slug: string | undefined;
}

const DeleteButton = ({productId, slug}: Props) => {
    const router = useRouter()
    const {data: session, status} = useSession()

    const handleDeleteProduct = async () => {
        console.log((productId))
        try{
            const response = await axios.delete(`/api/products/${productId}`)
            if (response.status===200) {
                toast.success("The product has been deleted")
                router.push(`/menu/${slug}`)
                router.refresh()
            }
        } catch(error){
            console.log(error)
        }
    }


    if (status === "loading"){
        return <p>Loading...</p>
    }

    if (status === "unauthenticated" || !session?.user.isAdmin){
        return
    }

    return (
        <button className="bg-red-500 p-2 rounded-full absolute top-4 right-4 text-white" onClick={handleDeleteProduct}>
            <Image src="/delete.svg" alt="" width={20} height={20}/>
        </button>
    )
}

export default DeleteButton